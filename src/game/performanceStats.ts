export interface AssetPerformanceStats {
  loadedModels: number;
  loadedCars: number;
  loadedEnvironmentModels: number;
  networkLoads: number;
  networkMb: number;
  averageLoadMs: number;
}

const loadedModels = new Map<string, 'car' | 'environment'>();
let networkBytes = 0;
let networkLoadMs = 0;
let networkLoads = 0;

function getKind(url: string): 'car' | 'environment' {
  return /\/env\//i.test(url) ? 'environment' : 'car';
}

export function recordGlbLoaded(url: string): void {
  loadedModels.set(url, getKind(url));
}

export function recordGlbDownload(url: string, bytes: number, durationMs: number): void {
  recordGlbLoaded(url);
  networkBytes += bytes;
  networkLoadMs += Math.max(0, durationMs);
  networkLoads++;
}

export function getAssetPerformanceStats(): AssetPerformanceStats {
  let loadedCars = 0;
  let loadedEnvironmentModels = 0;
  for (const kind of loadedModels.values()) {
    if (kind === 'car') loadedCars++;
    else loadedEnvironmentModels++;
  }
  return {
    loadedModels: loadedModels.size,
    loadedCars,
    loadedEnvironmentModels,
    networkLoads,
    networkMb: networkBytes / 1_048_576,
    averageLoadMs: networkLoads ? networkLoadMs / networkLoads : 0,
  };
}

let backgroundPaused = false;
let backgroundThrottleUntil = 0;

export function setBackgroundStreamingPaused(paused: boolean): void {
  backgroundPaused = paused;
}

export function isBackgroundStreamingPaused(): boolean {
  return backgroundPaused;
}

export function reportBackgroundFrameMs(frameMs: number): void {
  if (frameMs > 28) {
    backgroundThrottleUntil = performance.now() + 1400;
  }
}

export function isBackgroundStreamingThrottled(): boolean {
  return backgroundPaused || performance.now() < backgroundThrottleUntil;
}
