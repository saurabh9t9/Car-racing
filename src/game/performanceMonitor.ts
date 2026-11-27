import * as THREE from 'three';
import { computeFpsFromFrameMs, type PerformanceTelemetrySnapshot } from '../shared/perfTelemetry';
import { getAssetPerformanceStats } from './performanceStats';

const PUBLISH_INTERVAL_MS = 500;
const OBJECT_SCAN_INTERVAL_MS = 1500;

/** Headless low-frequency sampling of renderer, scene, and GLB asset performance metrics. */
export class PerformanceMonitor {
  private readonly onSnapshot?: (snapshot: PerformanceTelemetrySnapshot) => void;
  private frameCount = 0;
  private frameTimeSum = 0;
  private cpuTimeSum = 0;
  private minFrameTime = Number.POSITIVE_INFINITY;
  private maxFrameTime = 0;
  private lastPublishAt = 0;
  private lastObjectScanAt = 0;
  private activeObjectCount = 0;

  constructor(onSnapshot?: (snapshot: PerformanceTelemetrySnapshot) => void) {
    this.onSnapshot = onSnapshot;
  }

  recordFrame(
    frameMs: number,
    cpuMs: number,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    now = performance.now(),
  ): void {
    if (this.lastPublishAt === 0) {
      this.lastPublishAt = now;
    }

    const safeFrameMs = Math.max(0.1, frameMs);
    this.frameCount++;
    this.frameTimeSum += safeFrameMs;
    this.cpuTimeSum += cpuMs;
    this.minFrameTime = Math.min(this.minFrameTime, safeFrameMs);
    this.maxFrameTime = Math.max(this.maxFrameTime, safeFrameMs);

    if (now - this.lastObjectScanAt >= OBJECT_SCAN_INTERVAL_MS) {
      let count = 0;
      scene.traverseVisible(() => {
        count++;
      });
      this.activeObjectCount = count;
      this.lastObjectScanAt = now;
    }

    if (now - this.lastPublishAt < PUBLISH_INTERVAL_MS) return;
    const assets = getAssetPerformanceStats();
    const avgFrameMs = this.frameTimeSum / Math.max(1, this.frameCount);

    const snapshot: PerformanceTelemetrySnapshot = {
      fps: computeFpsFromFrameMs(avgFrameMs),
      minFps: 1000 / Math.max(0.1, this.maxFrameTime),
      maxFps: 1000 / Math.max(0.1, this.minFrameTime),
      frameMs: avgFrameMs,
      cpuMs: this.cpuTimeSum / Math.max(1, this.frameCount),
      calls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      objects: this.activeObjectCount,
      loadedModels: assets.loadedModels,
      loadedCars: assets.loadedCars,
      loadedEnvironmentModels: assets.loadedEnvironmentModels,
      networkMb: assets.networkMb,
      averageLoadMs: assets.averageLoadMs,
    };

    this.frameCount = 0;
    this.frameTimeSum = 0;
    this.cpuTimeSum = 0;
    this.minFrameTime = Number.POSITIVE_INFINITY;
    this.maxFrameTime = 0;
    this.lastPublishAt = now;
    this.onSnapshot?.(snapshot);
  }

  dispose(): void {
    // No DOM listeners or elements are attached.
  }
}
