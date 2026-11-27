export interface PerformanceTelemetrySnapshot {
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
  loadedModels: number;
  loadedCars: number;
  loadedEnvironmentModels: number;
  networkMb: number;
  averageLoadMs: number;
}

export const INITIAL_PERF_TELEMETRY: PerformanceTelemetrySnapshot = {
  fps: 0,
  minFps: 0,
  maxFps: 0,
  frameMs: 0,
  cpuMs: 0,
  calls: 0,
  triangles: 0,
  geometries: 0,
  textures: 0,
  objects: 0,
  loadedModels: 0,
  loadedCars: 0,
  loadedEnvironmentModels: 0,
  networkMb: 0,
  averageLoadMs: 0,
};

export interface PerfDetailRow {
  label: string;
  value: string;
}

/** Derives FPS directly from average Frame time (ms) so screen FPS matches System Details Frame value 1:1. */
export function computeFpsFromFrameMs(frameMs: number): number {
  if (!Number.isFinite(frameMs) || frameMs <= 0) return 0;
  return 1000 / Math.max(0.1, frameMs);
}

/** Formats FPS consistently across Home, In-Race HUD, and telemetry displays. */
export function formatFpsDisplay(fps: number): string {
  if (!Number.isFinite(fps) || fps <= 0) return '--';
  return fps >= 1 ? String(Math.round(fps)) : fps.toFixed(1);
}

/** Builds complete renderer/asset diagnostic rows excluding FPS (shown separately on screen). */
export function formatPerfDetailRows(s: PerformanceTelemetrySnapshot): PerfDetailRow[] {
  return [
    { label: 'Frame', value: `${s.frameMs.toFixed(2)} ms` },
    { label: 'CPU', value: `${s.cpuMs.toFixed(2)} ms (JS + render submit)` },
    { label: 'Draws', value: `${s.calls} calls · ${s.triangles.toLocaleString()} triangles` },
    { label: 'Scene', value: `${s.objects} visible objects` },
    { label: 'Renderer', value: `${s.geometries} geometries · ${s.textures} textures` },
    {
      label: 'Models',
      value: `${s.loadedModels} (${s.loadedCars} cars · ${s.loadedEnvironmentModels} env)`,
    },
    {
      label: 'Network',
      value: `${s.networkMb.toFixed(2)} MB GLB · avg ${s.averageLoadMs.toFixed(0)} ms/load`,
    },
  ];
}
