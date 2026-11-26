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
  LOW: { pixelRatioCap: 1, shadowMapSize: 0, shadows: false, sceneryDistance: 260, opponentDistance: 100, particleCount: 90 },
  MEDIUM: { pixelRatioCap: 1.25, shadowMapSize: 512, shadows: true, sceneryDistance: 340, opponentDistance: 125, particleCount: 130 },
  HIGH: { pixelRatioCap: 1.5, shadowMapSize: 1024, shadows: true, sceneryDistance: 430, opponentDistance: 150, particleCount: 180 },
  ULTRA: { pixelRatioCap: 2, shadowMapSize: 2048, shadows: true, sceneryDistance: 600, opponentDistance: 180, particleCount: 180 },
};

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
