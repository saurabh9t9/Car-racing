export type GraphicsQuality = 'LOW' | 'MEDIUM' | 'HIGH' | 'ULTRA' | 'AUTO';
export type GraphicsLevel = Exclude<GraphicsQuality, 'AUTO'>;

export interface GraphicsProfile {
  pixelRatioCap: number;
  shadowMapSize: number;
  shadows: boolean;
  sceneryDistance: number;
  opponentDistance: number;
  particleCount: number;
}

export const GRAPHICS_PROFILES: Record<GraphicsLevel, GraphicsProfile> = {
  LOW: {
    pixelRatioCap: 1.0,
    shadowMapSize: 0,
    shadows: false,
    sceneryDistance: 95,
    opponentDistance: 80,
    particleCount: 60,
  },
  MEDIUM: {
    pixelRatioCap: 1.0,
    shadowMapSize: 0,
    shadows: false,
    sceneryDistance: 130,
    opponentDistance: 105,
    particleCount: 95,
  },
  HIGH: {
    pixelRatioCap: 1.15,
    shadowMapSize: 512,
    shadows: true,
    sceneryDistance: 175,
    opponentDistance: 140,
    particleCount: 140,
  },
  ULTRA: {
    pixelRatioCap: 1.5,
    shadowMapSize: 1024,
    shadows: true,
    sceneryDistance: 240,
    opponentDistance: 180,
    particleCount: 180,
  },
};

export interface GraphicsQualitySpec {
  id: GraphicsQuality;
  label: string;
  resolution: string;
  shadows: string;
  scenery: string;
  opponents: string;
  particles: string;
  summary: string;
}

export const GRAPHICS_QUALITY_SPECS: readonly GraphicsQualitySpec[] = [
  {
    id: 'AUTO',
    label: 'Auto',
    resolution: 'Adaptive 0.75–1.15x',
    shadows: 'Dynamic (Off–512px)',
    scenery: '95–175m LOD',
    opponents: '80–140m',
    particles: '60–140 FX',
    summary: 'Adaptive scale · Targets 60+ FPS · Dynamic LOD & shadows',
  },
  {
    id: 'LOW',
    label: 'Low',
    resolution: `${GRAPHICS_PROFILES.LOW.pixelRatioCap.toFixed(1)}x DPR`,
    shadows: 'Shadows Off',
    scenery: `${GRAPHICS_PROFILES.LOW.sceneryDistance}m Scenery`,
    opponents: `${GRAPHICS_PROFILES.LOW.opponentDistance}m Rivals`,
    particles: `${GRAPHICS_PROFILES.LOW.particleCount} FX`,
    summary: `${GRAPHICS_PROFILES.LOW.pixelRatioCap.toFixed(1)}x DPR · Shadows Off · ${GRAPHICS_PROFILES.LOW.sceneryDistance}m View · ${GRAPHICS_PROFILES.LOW.opponentDistance}m Rivals · ${GRAPHICS_PROFILES.LOW.particleCount} FX`,
  },
  {
    id: 'MEDIUM',
    label: 'Medium',
    resolution: `${GRAPHICS_PROFILES.MEDIUM.pixelRatioCap.toFixed(1)}x DPR`,
    shadows: 'Shadows Off',
    scenery: `${GRAPHICS_PROFILES.MEDIUM.sceneryDistance}m Scenery`,
    opponents: `${GRAPHICS_PROFILES.MEDIUM.opponentDistance}m Rivals`,
    particles: `${GRAPHICS_PROFILES.MEDIUM.particleCount} FX`,
    summary: `${GRAPHICS_PROFILES.MEDIUM.pixelRatioCap.toFixed(1)}x DPR · Shadows Off · ${GRAPHICS_PROFILES.MEDIUM.sceneryDistance}m View · ${GRAPHICS_PROFILES.MEDIUM.opponentDistance}m Rivals · ${GRAPHICS_PROFILES.MEDIUM.particleCount} FX`,
  },
  {
    id: 'HIGH',
    label: 'High',
    resolution: `${GRAPHICS_PROFILES.HIGH.pixelRatioCap}x DPR`,
    shadows: `${GRAPHICS_PROFILES.HIGH.shadowMapSize}px Shadows`,
    scenery: `${GRAPHICS_PROFILES.HIGH.sceneryDistance}m Scenery`,
    opponents: `${GRAPHICS_PROFILES.HIGH.opponentDistance}m Rivals`,
    particles: `${GRAPHICS_PROFILES.HIGH.particleCount} FX`,
    summary: `${GRAPHICS_PROFILES.HIGH.pixelRatioCap}x DPR · ${GRAPHICS_PROFILES.HIGH.shadowMapSize}px Shadows · ${GRAPHICS_PROFILES.HIGH.sceneryDistance}m View · ${GRAPHICS_PROFILES.HIGH.opponentDistance}m Rivals · ${GRAPHICS_PROFILES.HIGH.particleCount} FX`,
  },
  {
    id: 'ULTRA',
    label: 'Ultra',
    resolution: `${GRAPHICS_PROFILES.ULTRA.pixelRatioCap.toFixed(1)}x DPR`,
    shadows: `${GRAPHICS_PROFILES.ULTRA.shadowMapSize}px Shadows`,
    scenery: `${GRAPHICS_PROFILES.ULTRA.sceneryDistance}m Scenery`,
    opponents: `${GRAPHICS_PROFILES.ULTRA.opponentDistance}m Rivals`,
    particles: `${GRAPHICS_PROFILES.ULTRA.particleCount} FX`,
    summary: `${GRAPHICS_PROFILES.ULTRA.pixelRatioCap.toFixed(1)}x DPR · ${GRAPHICS_PROFILES.ULTRA.shadowMapSize}px Shadows · ${GRAPHICS_PROFILES.ULTRA.sceneryDistance}m View · ${GRAPHICS_PROFILES.ULTRA.opponentDistance}m Rivals · ${GRAPHICS_PROFILES.ULTRA.particleCount} FX`,
  },
];

export const RESOLUTION_SCALE_STEPS = [0.75, 0.85, 1.0] as const;

export interface AdaptiveQualityState {
  level: GraphicsLevel;
  resolutionScale: number;
  lowFpsWindows: number;
  highFpsWindows: number;
  nextChangeAt: number;
}

const LEVELS: readonly GraphicsLevel[] = ['LOW', 'MEDIUM', 'HIGH', 'ULTRA'];

export function stepAdaptiveQualityState(
  state: AdaptiveQualityState,
  fps: number,
  now: number,
  maxAutoLevel: GraphicsLevel = 'HIGH',
): { state: AdaptiveQualityState; changed: boolean } {
  const isLow = fps < 58;
  const isHigh = fps >= 61;

  const lowFpsWindows = isLow ? state.lowFpsWindows + 1 : 0;
  const highFpsWindows = isHigh ? state.highFpsWindows + 1 : 0;

  if (now < state.nextChangeAt) {
    return {
      state: { ...state, lowFpsWindows, highFpsWindows },
      changed: false,
    };
  }

  const levelIdx = LEVELS.indexOf(state.level);
  const maxIdx = Math.max(0, LEVELS.indexOf(maxAutoLevel));
  const resIdx = RESOLUTION_SCALE_STEPS.indexOf(
    state.resolutionScale as (typeof RESOLUTION_SCALE_STEPS)[number],
  );
  const currentResIdx = resIdx >= 0 ? resIdx : RESOLUTION_SCALE_STEPS.length - 1;

  // Step down aggressively after 1 low window (< 58 FPS) to keep 60+ FPS minimum
  if (lowFpsWindows >= 1) {
    if (levelIdx > 0) {
      return {
        state: {
          level: LEVELS[levelIdx - 1],
          resolutionScale: state.resolutionScale,
          lowFpsWindows: 0,
          highFpsWindows: 0,
          nextChangeAt: now + 2200,
        },
        changed: true,
      };
    }
    if (currentResIdx > 0) {
      return {
        state: {
          level: state.level,
          resolutionScale: RESOLUTION_SCALE_STEPS[currentResIdx - 1],
          lowFpsWindows: 0,
          highFpsWindows: 0,
          nextChangeAt: now + 2200,
        },
        changed: true,
      };
    }
  }

  // Only step back up after sustained 61+ FPS headroom across 4 windows
  if (highFpsWindows >= 4) {
    if (currentResIdx < RESOLUTION_SCALE_STEPS.length - 1) {
      return {
        state: {
          level: state.level,
          resolutionScale: RESOLUTION_SCALE_STEPS[currentResIdx + 1],
          lowFpsWindows: 0,
          highFpsWindows: 0,
          nextChangeAt: now + 6500,
        },
        changed: true,
      };
    }
    if (levelIdx < maxIdx) {
      return {
        state: {
          level: LEVELS[levelIdx + 1],
          resolutionScale: state.resolutionScale,
          lowFpsWindows: 0,
          highFpsWindows: 0,
          nextChangeAt: now + 6500,
        },
        changed: true,
      };
    }
  }

  return {
    state: { ...state, lowFpsWindows, highFpsWindows },
    changed: false,
  };
}

export function computeEffectivePixelRatio(
  devicePixelRatio: number,
  pixelRatioCap: number,
  resolutionScale: number,
  isSoftwareGl: boolean,
): number {
  if (isSoftwareGl) return 1;
  const dpr = Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1;
  const clampedScale = Math.max(0.65, Math.min(1, resolutionScale));
  return Math.max(0.75, Math.min(dpr, pixelRatioCap) * clampedScale);
}

const STORAGE_KEY = 'turbo-racing-graphics-quality';

export function loadGraphicsQuality(): GraphicsQuality {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'LOW' || stored === 'MEDIUM' || stored === 'HIGH' || stored === 'ULTRA' || stored === 'AUTO') {
      return stored;
    }
  } catch {
    // Storage may be unavailable in private browsing.
  }
  return 'AUTO';
}

export function saveGraphicsQuality(quality: GraphicsQuality): void {
  try {
    localStorage.setItem(STORAGE_KEY, quality);
  } catch {
    // Storage may be unavailable in private browsing.
  }
}
