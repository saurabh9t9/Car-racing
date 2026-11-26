import * as THREE from 'three';
import { getAssetPerformanceStats } from './performanceStats';

interface PerformanceSnapshot {
  fps: number;
  minFps: number;
  maxFps: number;
  frameMs: number;
  cpuMs: number;
  calls: number;
  triangles: number;
  geometries: number;
  textures: number;
  objects: number;
}

const STORAGE_KEY = 'turbo-racing-perf-overlay';
const PUBLISH_INTERVAL_MS = 500;
const OBJECT_SCAN_INTERVAL_MS = 1500;

/** Development-only, low-frequency sampling of renderer and main-thread frame data. */
export class PerformanceMonitor {
  private readonly root: HTMLDivElement | null;
  private readonly panel: HTMLDivElement | null;
  private readonly toggle: HTMLButtonElement | null;
  private visible = false;
  private frameCount = 0;
  private frameTimeSum = 0;
  private cpuTimeSum = 0;
  private minFrameTime = Number.POSITIVE_INFINITY;
  private maxFrameTime = 0;
  private lastPublishAt = performance.now();
  private lastObjectScanAt = 0;
  private activeObjectCount = 0;
  private snapshot: PerformanceSnapshot | null = null;

  constructor(container: HTMLElement, enabled: boolean) {
    if (!enabled) {
      this.root = null;
      this.panel = null;
      this.toggle = null;
      return;
    }

    this.root = document.createElement('div');
    Object.assign(this.root.style, {
      position: 'fixed',
      top: '8px',
      right: '8px',
      zIndex: '10000',
      color: '#e2e8f0',
      font: '12px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace',
      pointerEvents: 'none',
    });

    this.toggle = document.createElement('button');
    this.toggle.type = 'button';
    this.toggle.textContent = 'Perf · F3';
    Object.assign(this.toggle.style, {
      display: 'block',
      marginLeft: 'auto',
      padding: '5px 8px',
      border: '1px solid #64748b',
      borderRadius: '5px',
      background: 'rgba(15, 23, 42, .88)',
      color: 'inherit',
      cursor: 'pointer',
      pointerEvents: 'auto',
    });
    this.toggle.addEventListener('click', this.toggleVisible);

    this.panel = document.createElement('div');
    Object.assign(this.panel.style, {
      display: 'none',
      minWidth: '245px',
      marginTop: '5px',
      padding: '9px 11px',
      border: '1px solid rgba(148, 163, 184, .55)',
      borderRadius: '6px',
      background: 'rgba(2, 6, 23, .9)',
      whiteSpace: 'pre',
      pointerEvents: 'none',
    });

    this.root.append(this.toggle, this.panel);
    (container.ownerDocument.body ?? document.body).appendChild(this.root);
    this.visible = this.readInitialVisibility();
    this.setVisible(this.visible);
    window.addEventListener('keydown', this.onKeyDown);
  }

  recordFrame(
    frameMs: number,
    cpuMs: number,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    now = performance.now(),
  ): void {
    if (!this.panel) return;

    const safeFrameMs = Math.max(0.1, frameMs);
    this.frameCount++;
    this.frameTimeSum += safeFrameMs;
    this.cpuTimeSum += cpuMs;
    this.minFrameTime = Math.min(this.minFrameTime, safeFrameMs);
    this.maxFrameTime = Math.max(this.maxFrameTime, safeFrameMs);

    if (now - this.lastObjectScanAt >= OBJECT_SCAN_INTERVAL_MS) {
      this.activeObjectCount = 0;
      scene.traverse((object) => {
        if (object.visible) this.activeObjectCount++;
      });
      this.lastObjectScanAt = now;
    }

    if (now - this.lastPublishAt < PUBLISH_INTERVAL_MS) return;
    const elapsed = Math.max(1, now - this.lastPublishAt);
    this.snapshot = {
      fps: (this.frameCount * 1000) / elapsed,
      minFps: 1000 / Math.max(0.1, this.maxFrameTime),
      maxFps: 1000 / Math.max(0.1, this.minFrameTime),
      frameMs: this.frameTimeSum / Math.max(1, this.frameCount),
      cpuMs: this.cpuTimeSum / Math.max(1, this.frameCount),
      calls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      objects: this.activeObjectCount,
    };

    this.frameCount = 0;
    this.frameTimeSum = 0;
    this.cpuTimeSum = 0;
    this.minFrameTime = Number.POSITIVE_INFINITY;
    this.maxFrameTime = 0;
    this.lastPublishAt = now;
    this.renderSnapshot();
  }

  dispose(): void {
    if (!this.root) return;
    window.removeEventListener('keydown', this.onKeyDown);
    this.toggle?.removeEventListener('click', this.toggleVisible);
    this.root.remove();
  }

  private readonly toggleVisible = (): void => {
    this.setVisible(!this.visible);
    try {
      localStorage.setItem(STORAGE_KEY, this.visible ? '1' : '0');
    } catch {
      // Storage can be unavailable in private browsing.
    }
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.code !== 'F3' || event.repeat) return;
    event.preventDefault();
    this.toggleVisible();
  };

  private readInitialVisibility(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  private setVisible(visible: boolean): void {
    if (!this.panel || !this.toggle) return;
    this.visible = visible;
    this.panel.style.display = visible ? 'block' : 'none';
    this.toggle.textContent = visible ? 'Hide perf · F3' : 'Perf · F3';
    this.renderSnapshot();
  }

  private renderSnapshot(): void {
    if (!this.panel || !this.visible || !this.snapshot) return;
    const s = this.snapshot;
    const assets = getAssetPerformanceStats();
    this.panel.textContent = [
      `FPS      ${s.fps.toFixed(1)}  (min ${s.minFps.toFixed(0)} / max ${s.maxFps.toFixed(0)})`,
      `Frame    ${s.frameMs.toFixed(2)} ms`,
      `CPU      ${s.cpuMs.toFixed(2)} ms (JS + render submit)`,
      `Draws    ${s.calls} calls · ${s.triangles.toLocaleString()} triangles`,
      `Scene    ${s.objects} visible objects`,
      `Renderer ${s.geometries} geometries · ${s.textures} textures`,
      `Models   ${assets.loadedModels} (${assets.loadedCars} cars · ${assets.loadedEnvironmentModels} env)`,
      `Network  ${assets.networkMb.toFixed(2)} MB GLB · avg ${assets.averageLoadMs.toFixed(0)} ms/load`,
      'GPU memory is not exposed by renderer.info.',
    ].join('\n');
  }
}
