import { sampleTrackAt } from './trackMath';
import type { CompiledTrack } from './types';

export type SakuraModelKey =
  | 'sakura_cherry_trees'
  | 'sakura_japanese_temple'
  | 'sakura_chinese_hall'
  | 'sakura_fantasy_architecture'
  | 'sakura_chinese_architecture'
  | 'sakura_lamp_pagoda'
  | 'sakura_drum'
  | 'sakura_statue'
  | 'env_spruce_trees'
  | 'env_stylized_rocks';

export interface PropFootprint {
  sizeX: number;
  sizeZ: number;
}

export interface SakuraPlacementItem {
  modelId: SakuraModelKey;
  x: number;
  z: number;
  scale: number;
  rotY: number;
  footprintRadius: number;
}

/**
 * Default normalized horizontal footprints (meters) matching envAssets targetHeight specs.
 * Runtime callers can pass measured Box3 sizes to override these.
 */
export const DEFAULT_SAKURA_FOOTPRINTS: Record<SakuraModelKey, PropFootprint> = {
  sakura_cherry_trees: { sizeX: 25.5, sizeZ: 10.9 },
  sakura_japanese_temple: { sizeX: 40.9, sizeZ: 28.2 },
  sakura_chinese_hall: { sizeX: 36.2, sizeZ: 25.0 },
  sakura_fantasy_architecture: { sizeX: 31.3, sizeZ: 17.4 },
  sakura_chinese_architecture: { sizeX: 13.8, sizeZ: 4.3 },
  sakura_lamp_pagoda: { sizeX: 2.8, sizeZ: 2.8 },
  sakura_drum: { sizeX: 2.8, sizeZ: 4.7 },
  sakura_statue: { sizeX: 4.2, sizeZ: 3.7 },
  env_spruce_trees: { sizeX: 7.5, sizeZ: 7.5 },
  env_stylized_rocks: { sizeX: 5.5, sizeZ: 5.5 },
};

const LANDMARK_MODELS = new Set<SakuraModelKey>([
  'sakura_japanese_temple',
  'sakura_chinese_hall',
  'sakura_fantasy_architecture',
]);

const ARCHITECTURAL_MODELS = new Set<SakuraModelKey>([
  'sakura_japanese_temple',
  'sakura_chinese_hall',
  'sakura_fantasy_architecture',
  'sakura_chinese_architecture',
  'sakura_lamp_pagoda',
  'sakura_drum',
  'sakura_statue',
]);

export function computePropFootprintRadius(footprint: PropFootprint, scale: number): number {
  return 0.5 * Math.hypot(footprint.sizeX, footprint.sizeZ) * scale;
}

export function generateSakuraSceneryPlacements(
  track: CompiledTrack,
  footprints: Partial<Record<SakuraModelKey, PropFootprint>> = DEFAULT_SAKURA_FOOTPRINTS,
): SakuraPlacementItem[] {
  const halfW = track.def.roadWidth * 0.5;
  const accepted: SakuraPlacementItem[] = [];
  const counts: Record<SakuraModelKey, number> = {
    sakura_cherry_trees: 0,
    sakura_japanese_temple: 0,
    sakura_chinese_hall: 0,
    sakura_fantasy_architecture: 0,
    sakura_chinese_architecture: 0,
    sakura_lamp_pagoda: 0,
    sakura_drum: 0,
    sakura_statue: 0,
    env_spruce_trees: 0,
    env_stylized_rocks: 0,
  };

  const maxCounts: Record<SakuraModelKey, number> = {
    sakura_cherry_trees: 18,
    sakura_japanese_temple: 2,
    sakura_chinese_hall: 3,
    sakura_fantasy_architecture: 2,
    sakura_chinese_architecture: 5,
    sakura_lamp_pagoda: 14,
    sakura_drum: 4,
    sakura_statue: 5,
    env_spruce_trees: 10,
    env_stylized_rocks: 8,
  };

  const getFootprint = (modelId: SakuraModelKey): PropFootprint =>
    footprints[modelId] ?? DEFAULT_SAKURA_FOOTPRINTS[modelId];

  const findNearestSample = (x: number, z: number) => {
    let minDistSq = Infinity;
    let nearest = track.samples[0];
    for (let k = 0; k < track.samples.length; k++) {
      const s = track.samples[k];
      const dx = x - s.x;
      const dz = z - s.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < minDistSq) {
        minDistSq = d2;
        nearest = s;
      }
    }
    return { minDist: Math.sqrt(minDistSq), nearest };
  };

  const tryPlace = (
    modelId: SakuraModelKey,
    x: number,
    z: number,
    scale: number,
    rotOffset = 0,
  ): boolean => {
    if (counts[modelId] >= maxCounts[modelId]) return false;

    const fp = getFootprint(modelId);
    const propRadius = computePropFootprintRadius(fp, scale);
    const { minDist, nearest } = findNearestSample(x, z);

    // Keep concrete barrier + signage corridor strictly clear on EVERY bend of the circuit
    const barrierClearance = LANDMARK_MODELS.has(modelId) ? 14.5 : 9.5;
    const isPaddockZone = nearest.t < 0.095 || nearest.t > 0.905;
    const minRequired = halfW + (isPaddockZone ? Math.max(barrierClearance, 25.0) : barrierClearance) + propRadius;
    if (minDist < minRequired) return false;

    // Prevent large clusters and buildings from clipping into each other
    for (const existing of accepted) {
      const minSep = Math.max(4.5, (propRadius + existing.footprintRadius) * 0.78);
      const dx = x - existing.x;
      const dz = z - existing.z;
      if (dx * dx + dz * dz < minSep * minSep) return false;
    }

    const tangentYaw = Math.atan2(nearest.tx, nearest.tz);
    const toRoadX = nearest.x - x;
    const toRoadZ = nearest.z - z;
    const facingRoadYaw = Math.atan2(toRoadX, toRoadZ);
    const rotY = ARCHITECTURAL_MODELS.has(modelId)
      ? LANDMARK_MODELS.has(modelId) || modelId === 'sakura_chinese_architecture'
        ? facingRoadYaw + rotOffset
        : tangentYaw + rotOffset
      : rotOffset;

    accepted.push({
      modelId,
      x,
      z,
      scale,
      rotY,
      footprintRadius: propRadius,
    });
    counts[modelId]++;
    return true;
  };

  // Phase 1: Iconic outer landmarks in wide open valleys & outer perimeter pockets
  const landmarkOrder: SakuraModelKey[] = [
    'sakura_fantasy_architecture',
    'sakura_japanese_temple',
    'sakura_chinese_hall',
    'sakura_chinese_hall',
    'sakura_japanese_temple',
    'sakura_fantasy_architecture',
    'sakura_chinese_hall',
  ];
  const landmarkStations = [0.16, 0.28, 0.41, 0.54, 0.67, 0.78, 0.88, 0.08, 0.34, 0.61, 0.73, 0.48];
  const landmarkOffsets = [62, -62, 78, -78, 48, -48, 95, -95];
  let lmIdx = 0;
  for (let sIdx = 0; sIdx < landmarkStations.length && lmIdx < landmarkOrder.length; sIdx++) {
    const t = landmarkStations[sIdx];
    const s = sampleTrackAt(track, t);
    for (const offset of landmarkOffsets) {
      if (lmIdx >= landmarkOrder.length) break;
      const modelId = landmarkOrder[lmIdx];
      const lat = offset + Math.sign(offset) * halfW;
      if (tryPlace(modelId, s.x + s.nx * lat, s.z + s.nz * lat, 0.96, 0)) {
        lmIdx++;
        break;
      }
    }
  }

  // Phase 2: Mid-distance architectural gates & cherry blossom groves
  const groveStations = 28;
  for (let i = 0; i < groveStations; i++) {
    const t = (i + 0.35) / groveStations;
    const s = sampleTrackAt(track, t);
    const side = i % 2 === 0 ? 1 : -1;

    if (i % 5 === 1 && counts.sakura_chinese_architecture < maxCounts.sakura_chinese_architecture) {
      for (const dist of [20, 28, 38]) {
        if (tryPlace('sakura_chinese_architecture', s.x + s.nx * side * (halfW + dist), s.z + s.nz * side * (halfW + dist), 0.94, 0)) {
          break;
        }
      }
    }

    for (const candidateSide of [side, -side]) {
      for (const dist of [26, 36, 50, 66]) {
        const px = s.x + s.nx * candidateSide * (halfW + dist);
        const pz = s.z + s.nz * candidateSide * (halfW + dist);
        const rot = ((i * 2.39996 + dist) % (Math.PI * 2));
        if (tryPlace('sakura_cherry_trees', px, pz, 0.84 + ((i * 0.13) % 0.18), rot)) {
          break;
        }
      }
    }
  }

  // Phase 3: Crisp roadside lanterns, statues, drums, spruce trees & rocks
  const detailStations = 36;
  const roadsideCycle: SakuraModelKey[] = [
    'sakura_lamp_pagoda',
    'env_stylized_rocks',
    'sakura_statue',
    'sakura_lamp_pagoda',
    'sakura_drum',
    'env_spruce_trees',
  ];
  for (let i = 0; i < detailStations; i++) {
    const t = (i + 0.15) / detailStations;
    const s = sampleTrackAt(track, t);
    const primarySide = i % 2 === 0 ? 1 : -1;
    const modelId = roadsideCycle[i % roadsideCycle.length];
    const scale =
      modelId === 'sakura_lamp_pagoda'
        ? 0.92
        : modelId === 'sakura_statue'
          ? 0.95
          : modelId === 'sakura_drum'
            ? 0.92
            : 0.88 + ((i * 0.17) % 0.24);

    for (const side of [primarySide, -primarySide]) {
      let placed = false;
      for (const dist of [13.5, 19.5, 28.0]) {
        const px = s.x + s.nx * side * (halfW + dist);
        const pz = s.z + s.nz * side * (halfW + dist);
        const rot = ARCHITECTURAL_MODELS.has(modelId)
          ? (side > 0 ? Math.PI * 0.5 : -Math.PI * 0.5)
          : (i * 1.71) % (Math.PI * 2);
        if (tryPlace(modelId, px, pz, scale, rot)) {
          placed = true;
          break;
        }
      }
      if (placed) break;
    }

    // Add outer spruce filler where cherry groves didn't occupy
    if (i % 3 === 0) {
      const side = -primarySide;
      for (const dist of [24, 34, 48]) {
        const px = s.x + s.nx * side * (halfW + dist);
        const pz = s.z + s.nz * side * (halfW + dist);
        if (tryPlace('env_spruce_trees', px, pz, 0.88 + ((i * 0.11) % 0.22), (i * 2.1) % (Math.PI * 2))) {
          break;
        }
      }
    }
  }

  return accepted;
}
