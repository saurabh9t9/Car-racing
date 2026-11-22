import type { CompiledTrack, TrackDefinition, TrackPoint, TrackSample } from './types';

export const STARTER_TRACKS: TrackDefinition[] = [
  {
    id: 'alpine-apex',
    name: 'Alpine Apex',
    author: 'Apex Works',
    theme: 'alpine',
    roadWidth: 18,
    controlPoints: [
      { x: 0, z: -120 },
      { x: 95, z: -115 },
      { x: 145, z: -45 },
      { x: 115, z: 45 },
      { x: 150, z: 120 },
      { x: 45, z: 145 },
      { x: -45, z: 95 },
      { x: -125, z: 115 },
      { x: -155, z: 25 },
      { x: -110, z: -60 },
      { x: -120, z: -125 },
    ],
    boostPads: [0.06, 0.34, 0.62, 0.86],
    obstacles: [
      { id: 'alp-obs-0', t: 0.038, lateral: 3.4, kind: 'cone_cluster' },
      { id: 'alp-obs-1', t: 0.085, lateral: -3.6, kind: 'barricade' },
      { id: 'alp-obs-2', t: 0.22, lateral: 4.4, kind: 'tire_stack' },
      { id: 'alp-obs-3', t: 0.44, lateral: 0.5, kind: 'cone_cluster' },
      { id: 'alp-obs-4', t: 0.55, lateral: 4.2, kind: 'barricade' },
      { id: 'alp-obs-5', t: 0.74, lateral: -4.5, kind: 'tire_stack' },
      { id: 'alp-obs-6', t: 0.90, lateral: -2.2, kind: 'cone_cluster' },
    ],
    isBuiltIn: true,
    createdAt: 1700000000000,
  },
  {
    id: 'canyon-switchback',
    name: 'Canyon Switchback',
    author: 'Apex Works',
    theme: 'sunset',
    roadWidth: 17,
    controlPoints: [
      { x: 0, z: -135 },
      { x: 125, z: -125 },
      { x: 155, z: -20 },
      { x: 75, z: 25 },
      { x: 135, z: 105 },
      { x: 40, z: 145 },
      { x: -60, z: 125 },
      { x: -40, z: 35 },
      { x: -135, z: 5 },
      { x: -145, z: -95 },
    ],
    boostPads: [0.08, 0.42, 0.78],
    obstacles: [
      { id: 'can-obs-1', t: 0.16, lateral: 3.8, kind: 'tire_stack' },
      { id: 'can-obs-2', t: 0.30, lateral: -3.5, kind: 'barricade' },
      { id: 'can-obs-3', t: 0.50, lateral: 1.5, kind: 'cone_cluster' },
      { id: 'can-obs-4', t: 0.68, lateral: 3.9, kind: 'barricade' },
      { id: 'can-obs-5', t: 0.88, lateral: -3.8, kind: 'tire_stack' },
    ],
    isBuiltIn: true,
    createdAt: 1700000001000,
  },
  {
    id: 'midnight-marina',
    name: 'Midnight Marina',
    author: 'Apex Works',
    theme: 'midnight',
    roadWidth: 20,
    controlPoints: [
      { x: 0, z: -110 },
      { x: 130, z: -105 },
      { x: 165, z: 0 },
      { x: 125, z: 110 },
      { x: 0, z: 135 },
      { x: -125, z: 110 },
      { x: -165, z: 0 },
      { x: -130, z: -105 },
    ],
    boostPads: [0.12, 0.37, 0.62, 0.87],
    obstacles: [
      { id: 'mar-obs-1', t: 0.20, lateral: -4.8, kind: 'barricade' },
      { id: 'mar-obs-2', t: 0.28, lateral: 4.8, kind: 'barricade' },
      { id: 'mar-obs-3', t: 0.48, lateral: -1.8, kind: 'cone_cluster' },
      { id: 'mar-obs-4', t: 0.70, lateral: 4.5, kind: 'tire_stack' },
      { id: 'mar-obs-5', t: 0.82, lateral: -4.2, kind: 'cone_cluster' },
    ],
    isBuiltIn: true,
    createdAt: 1700000002000,
  },
  {
    id: 'pacific-coastline',
    name: 'Pacific Coastline',
    author: 'Apex Works',
    theme: 'coastal',
    roadWidth: 19,
    controlPoints: [
      { x: 0, z: -145 },
      { x: 115, z: -135 },
      { x: 185, z: -65 },
      { x: 165, z: 35 },
      { x: 95, z: 75 },
      { x: 135, z: 155 },
      { x: 15, z: 165 },
      { x: -115, z: 135 },
      { x: -175, z: 45 },
      { x: -120, z: -45 },
      { x: -145, z: -125 },
    ],
    boostPads: [0.09, 0.36, 0.61, 0.84],
    obstacles: [
      { id: 'pac-obs-1', t: 0.14, lateral: 4.1, kind: 'cone_cluster' },
      { id: 'pac-obs-2', t: 0.28, lateral: -3.8, kind: 'barricade' },
      { id: 'pac-obs-3', t: 0.48, lateral: 3.6, kind: 'tire_stack' },
      { id: 'pac-obs-4', t: 0.69, lateral: -4.2, kind: 'barricade' },
      { id: 'pac-obs-5', t: 0.79, lateral: 2.2, kind: 'cone_cluster' },
      { id: 'pac-obs-6', t: 0.91, lateral: -3.5, kind: 'tire_stack' },
    ],
    isBuiltIn: true,
    createdAt: 1700000003000,
  },
  {
    id: 'sakura-pass',
    name: 'Sakura Mountain Pass',
    author: 'Apex Works',
    theme: 'sakura',
    roadWidth: 17,
    controlPoints: [
      { x: 0, z: -130 },
      { x: 110, z: -120 },
      { x: 155, z: -30 },
      { x: 80, z: 15 },
      { x: 145, z: 95 },
      { x: 55, z: 155 },
      { x: -20, z: 95 },
      { x: -105, z: 140 },
      { x: -160, z: 55 },
      { x: -85, z: -10 },
      { x: -145, z: -90 },
    ],
    boostPads: [0.11, 0.45, 0.81],
    obstacles: [
      { id: 'sak-obs-1', t: 0.19, lateral: -3.4, kind: 'tire_stack' },
      { id: 'sak-obs-2', t: 0.34, lateral: 3.2, kind: 'barricade' },
      { id: 'sak-obs-3', t: 0.56, lateral: -1.6, kind: 'cone_cluster' },
      { id: 'sak-obs-4', t: 0.72, lateral: 3.6, kind: 'tire_stack' },
      { id: 'sak-obs-5', t: 0.89, lateral: -3.2, kind: 'cone_cluster' },
    ],
    isBuiltIn: true,
    createdAt: 1700000004000,
  },
  {
    id: 'apex-endurance',
    name: 'Apex Endurance GP',
    author: 'Apex Works',
    theme: 'alpine',
    roadWidth: 21,
    controlPoints: [
      { x: 0, z: -155 },
      { x: 155, z: -150 },
      { x: 195, z: -55 },
      { x: 120, z: 0 },
      { x: 185, z: 95 },
      { x: 95, z: 165 },
      { x: -15, z: 130 },
      { x: -125, z: 155 },
      { x: -185, z: 60 },
      { x: -135, z: -25 },
      { x: -175, z: -115 },
      { x: -90, z: -155 },
    ],
    boostPads: [0.06, 0.31, 0.58, 0.85],
    obstacles: [
      { id: 'gp-obs-1', t: 0.15, lateral: 4.8, kind: 'barricade' },
      { id: 'gp-obs-2', t: 0.25, lateral: -4.5, kind: 'cone_cluster' },
      { id: 'gp-obs-3', t: 0.43, lateral: 4.4, kind: 'tire_stack' },
      { id: 'gp-obs-4', t: 0.65, lateral: -4.6, kind: 'barricade' },
      { id: 'gp-obs-5', t: 0.76, lateral: 1.5, kind: 'cone_cluster' },
      { id: 'gp-obs-6', t: 0.91, lateral: -4.2, kind: 'tire_stack' },
    ],
    isBuiltIn: true,
    createdAt: 1700000005000,
  },
];

/** Evaluates closed Catmull-Rom spline at local parameter u in [0, 1) between p1 and p2. */
function catmullRom(p0: number, p1: number, p2: number, p3: number, u: number): number {
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * u +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
  );
}

/**
 * Compiles a TrackDefinition into uniformly arc-length-sampled TrackSample points.
 */
export function compileTrack(def: TrackDefinition, targetSamples = 240): CompiledTrack {
  const pts = def.controlPoints;
  const n = pts.length;
  if (n < 3) {
    throw new Error('Track requires at least 3 control points.');
  }

  // Dense raw pass to measure cumulative arc length
  const rawCount = n * 24;
  const rawPts: TrackPoint[] = [];
  const cumLen: number[] = [0];

  for (let i = 0; i < rawCount; i++) {
    const globalT = (i / rawCount) * n;
    const seg = Math.floor(globalT) % n;
    const u = globalT - Math.floor(globalT);
    const p0 = pts[(seg - 1 + n) % n];
    const p1 = pts[seg];
    const p2 = pts[(seg + 1) % n];
    const p3 = pts[(seg + 2) % n];

    const x = catmullRom(p0.x, p1.x, p2.x, p3.x, u);
    const z = catmullRom(p0.z, p1.z, p2.z, p3.z, u);
    rawPts.push({ x, z });
    if (i > 0) {
      const dx = x - rawPts[i - 1].x;
      const dz = z - rawPts[i - 1].z;
      cumLen.push(cumLen[i - 1] + Math.hypot(dx, dz));
    }
  }

  // Close back to rawPts[0]
  const closeDx = rawPts[0].x - rawPts[rawCount - 1].x;
  const closeDz = rawPts[0].z - rawPts[rawCount - 1].z;
  const totalLength = cumLen[rawCount - 1] + Math.hypot(closeDx, closeDz);

  // Resample uniformly by arc length
  const resampled: TrackPoint[] = [];
  let rawIdx = 0;
  for (let k = 0; k < targetSamples; k++) {
    const targetS = (k / targetSamples) * totalLength;
    while (rawIdx < rawCount - 1 && cumLen[rawIdx + 1] < targetS) {
      rawIdx++;
    }
    const s0 = cumLen[rawIdx];
    const s1 = rawIdx < rawCount - 1 ? cumLen[rawIdx + 1] : totalLength;
    const nextIdx = (rawIdx + 1) % rawCount;
    const span = Math.max(1e-6, s1 - s0);
    const alpha = Math.max(0, Math.min(1, (targetS - s0) / span));
    resampled.push({
      x: rawPts[rawIdx].x + (rawPts[nextIdx].x - rawPts[rawIdx].x) * alpha,
      z: rawPts[rawIdx].z + (rawPts[nextIdx].z - rawPts[rawIdx].z) * alpha,
    });
  }

  // Compute smooth tangents and right-hand normals
  const samples: TrackSample[] = [];
  for (let k = 0; k < targetSamples; k++) {
    const prev = resampled[(k - 1 + targetSamples) % targetSamples];
    const curr = resampled[k];
    const next = resampled[(k + 1) % targetSamples];
    let tx = next.x - prev.x;
    let tz = next.z - prev.z;
    const len = Math.hypot(tx, tz) || 1;
    tx /= len;
    tz /= len;
    // Right-hand normal when looking down (+Y up, forward = (tx, tz)):
    // Forward rotated -90deg around Y: (tz, -tx) or (-tz, tx).
    // Let's make heading = atan2(tx, tz): forward = (sin(h), cos(h)).
    // Right vector = (cos(h), -sin(h)) = (tz, -tx) when +Y is up? Wait:
    // If forward = (0, 1) (+Z), right in Three.js (-X is right when looking +Z? No, +X is right when looking -Z, -X is right when looking +Z!).
    // Right = forward x up = (tx, 0, tz) x (0, 1, 0) = (-tz, 0, tx).
    const nx = -tz;
    const nz = tx;
    samples.push({
      x: curr.x,
      z: curr.z,
      tx,
      tz,
      nx,
      nz,
      t: k / targetSamples,
      s: (k / targetSamples) * totalLength,
    });
  }

  return { def, samples, totalLength };
}

export function sampleTrackAt(track: CompiledTrack, t: number): TrackSample {
  const wrapped = ((t % 1) + 1) % 1;
  const n = track.samples.length;
  const fIdx = wrapped * n;
  const i0 = Math.floor(fIdx) % n;
  const i1 = (i0 + 1) % n;
  const alpha = fIdx - Math.floor(fIdx);
  const a = track.samples[i0];
  const b = track.samples[i1];

  let tx = a.tx + (b.tx - a.tx) * alpha;
  let tz = a.tz + (b.tz - a.tz) * alpha;
  const len = Math.hypot(tx, tz) || 1;
  tx /= len;
  tz /= len;

  return {
    x: a.x + (b.x - a.x) * alpha,
    z: a.z + (b.z - a.z) * alpha,
    tx,
    tz,
    nx: -tz,
    nz: tx,
    t: wrapped,
    s: wrapped * track.totalLength,
  };
}

export interface TrackProjection {
  sample: TrackSample;
  t: number;
  lateralOffset: number; // Signed offset along right normal (nx, nz)
  distSq: number;
}

export function projectOntoTrack(
  x: number,
  z: number,
  track: CompiledTrack,
  hintT?: number,
): TrackProjection {
  const samples = track.samples;
  const n = samples.length;
  let bestIdx = 0;
  let bestDistSq = Infinity;

  if (hintT !== undefined) {
    // Search +/- 35 samples first; fallback to full search if too far
    const center = Math.floor((((hintT % 1) + 1) % 1) * n);
    for (let offset = -35; offset <= 35; offset++) {
      const idx = (center + offset + n) % n;
      const dx = x - samples[idx].x;
      const dz = z - samples[idx].z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bestDistSq) {
        bestDistSq = d2;
        bestIdx = idx;
      }
    }
  }

  if (hintT === undefined || bestDistSq > 900) {
    bestDistSq = Infinity;
    for (let i = 0; i < n; i++) {
      const dx = x - samples[i].x;
      const dz = z - samples[i].z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bestDistSq) {
        bestDistSq = d2;
        bestIdx = i;
      }
    }
  }

  // Refine along adjacent segment
  const sCurr = samples[bestIdx];
  const sNext = samples[(bestIdx + 1) % n];
  const sPrev = samples[(bestIdx - 1 + n) % n];

  const segDx = sNext.x - sPrev.x;
  const segDz = sNext.z - sPrev.z;
  const segLenSq = segDx * segDx + segDz * segDz || 1;
  const relX = x - sCurr.x;
  const relZ = z - sCurr.z;
  const projSteps = Math.max(-0.5, Math.min(0.5, (relX * segDx + relZ * segDz) / (segLenSq * 0.5)));

  const refinedT = (((bestIdx + projSteps) / n) % 1 + 1) % 1;
  const sample = sampleTrackAt(track, refinedT);
  const dx = x - sample.x;
  const dz = z - sample.z;
  const lateralOffset = dx * sample.nx + dz * sample.nz;

  return {
    sample,
    t: refinedT,
    lateralOffset,
    distSq: dx * dx + dz * dz,
  };
}

/** Ramer-Douglas-Peucker simplification for freehand drawn track points. */
function perpendicularDistance(pt: TrackPoint, a: TrackPoint, b: TrackPoint): number {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-6) return Math.hypot(pt.x - a.x, pt.z - a.z);
  const t = Math.max(0, Math.min(1, ((pt.x - a.x) * dx + (pt.z - a.z) * dz) / lenSq));
  return Math.hypot(pt.x - (a.x + t * dx), pt.z - (a.z + t * dz));
}

function rdpSimplify(points: TrackPoint[], epsilon: number): TrackPoint[] {
  if (points.length < 3) return points;
  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;
  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = rdpSimplify(points.slice(0, index + 1), epsilon);
    const right = rdpSimplify(points.slice(index), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [points[0], points[end]];
}

function segmentsIntersect(a: TrackPoint, b: TrackPoint, c: TrackPoint, d: TrackPoint): boolean {
  const ccw = (p1: TrackPoint, p2: TrackPoint, p3: TrackPoint) =>
    (p3.z - p1.z) * (p2.x - p1.x) > (p2.z - p1.z) * (p3.x - p1.x);
  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

export const FREEHAND_WORLD_SPAN = 480;
export const MIN_TRACK_LENGTH = 1000;

export interface FreehandValidation {
  valid: boolean;
  reason?: string;
  controlPoints: TrackPoint[];
  estimatedLength: number;
}

/**
 * Normalizes raw 2D canvas coordinates (in [0, 1] x [0, 1]) into world-scale
 * closed-loop Catmull-Rom control points and validates loop integrity.
 */
export function buildFreehandTrack(
  normalizedPoints: TrackPoint[],
  worldSpan = FREEHAND_WORLD_SPAN,
): FreehandValidation {
  if (normalizedPoints.length < 8) {
    return {
      valid: false,
      reason: 'Draw a larger continuous loop on the canvas.',
      controlPoints: [],
      estimatedLength: 0,
    };
  }

  // Convert [0..1] canvas coordinates into centered [-worldSpan/2, +worldSpan/2] meters
  const worldRaw = normalizedPoints.map((p) => ({
    x: (p.x - 0.5) * worldSpan,
    z: (p.z - 0.5) * worldSpan,
  }));

  // Drop trailing point if very close to start to avoid a kink when closing
  const first = worldRaw[0];
  while (
    worldRaw.length > 6 &&
    Math.hypot(worldRaw[worldRaw.length - 1].x - first.x, worldRaw[worldRaw.length - 1].z - first.z) < 18
  ) {
    worldRaw.pop();
  }

  // Simplify using RDP then enforce minimum spacing of 24m
  const rdp = rdpSimplify(worldRaw, 10);
  const spaced: TrackPoint[] = [];
  for (const pt of rdp) {
    if (
      spaced.length === 0 ||
      Math.hypot(pt.x - spaced[spaced.length - 1].x, pt.z - spaced[spaced.length - 1].z) >= 24
    ) {
      spaced.push(pt);
    }
  }

  if (spaced.length < 5) {
    return {
      valid: false,
      reason: 'Loop is too small. Draw a wider circuit around the canvas.',
      controlPoints: spaced,
      estimatedLength: 0,
    };
  }

  // Check self-intersections across non-adjacent polygon edges
  const m = spaced.length;
  for (let i = 0; i < m; i++) {
    const a = spaced[i];
    const b = spaced[(i + 1) % m];
    for (let j = i + 2; j < m; j++) {
      if (i === 0 && j === m - 1) continue; // adjacent across wrap
      const c = spaced[j];
      const d = spaced[(j + 1) % m];
      if (segmentsIntersect(a, b, c, d)) {
        return {
          valid: false,
          reason: 'Track edges cross each other. Draw a non-intersecting closed loop.',
          controlPoints: spaced,
          estimatedLength: 0,
        };
      }
    }
  }

  // Compile and measure total length
  const compiled = compileTrack(
    {
      id: 'preview',
      name: 'Preview',
      author: 'You',
      theme: 'alpine',
      roadWidth: 18,
      controlPoints: spaced,
      boostPads: [],
      createdAt: 0,
    },
    120,
  );

  if (compiled.totalLength < MIN_TRACK_LENGTH) {
    return {
      valid: false,
      reason: `Track is too short (${Math.round(compiled.totalLength)}m). Minimum is ${MIN_TRACK_LENGTH}m.`,
      controlPoints: spaced,
      estimatedLength: compiled.totalLength,
    };
  }

  return {
    valid: true,
    controlPoints: spaced,
    estimatedLength: compiled.totalLength,
  };
}

export interface AutoSketchResult {
  points: TrackPoint[];
  boostPads: number[];
  obstacles: Array<{ id: string; t: number; lateral: number; kind: 'barricade' | 'tire_stack' | 'cone_cluster' }>;
  estimatedLength: number;
  archetype: number;
}

function hasCleanRoadClearance(compiled: CompiledTrack, minGapMeters = 34): boolean {
  const n = compiled.samples.length;
  const skipSamples = Math.max(8, Math.floor(n * 0.1));
  const minGapSq = minGapMeters * minGapMeters;
  for (let i = 0; i < n; i++) {
    const a = compiled.samples[i];
    for (let j = i + skipSamples; j < n; j++) {
      if (i + n - j < skipSamples) continue;
      const b = compiled.samples[j];
      const dx = a.x - b.x;
      const dz = a.z - b.z;
      if (dx * dx + dz * dz < minGapSq) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Generates a varied, valid closed racing loop (>= 1000m) across 5 distinct
 * geometric circuit archetypes so repeated Auto-Sketch clicks create fresh tracks.
 */
export function generateAutoSketchLoop(
  rng: () => number = Math.random,
  prevArchetype?: number,
): AutoSketchResult {
  const archetypeCount = 5;
  let archetype = Math.floor(rng() * archetypeCount);
  if (prevArchetype !== undefined && archetype === prevArchetype) {
    archetype = (archetype + 1 + Math.floor(rng() * (archetypeCount - 1))) % archetypeCount;
  }

  const randRange = (min: number, max: number) => min + rng() * (max - min);

  for (let attempt = 0; attempt < 36; attempt++) {
    const style = attempt < 24 ? archetype : (archetype + attempt) % archetypeCount;
    const rot = randRange(0, Math.PI * 2);
    const flip = rng() < 0.5 ? 1 : -1;
    const p1 = randRange(0, Math.PI * 2);
    const p2 = randRange(0, Math.PI * 2);
    const p3 = randRange(0, Math.PI * 2);
    const p4 = randRange(0, Math.PI * 2);
    const p5 = randRange(0, Math.PI * 2);

    let baseR = 0.34;
    let a1 = 0;
    let a2 = 0;
    let a3 = 0;
    let a4 = 0;
    let a5 = 0;
    let stretchX = 1;
    let stretchZ = 1;

    if (style === 0) {
      // Twin-hairpin speedway / kidney loop
      baseR = randRange(0.32, 0.36);
      a1 = randRange(0.01, 0.04);
      a2 = randRange(0.08, 0.13);
      a3 = randRange(0.02, 0.06);
      a4 = randRange(0.01, 0.04);
      stretchX = randRange(1.02, 1.18);
      stretchZ = randRange(0.84, 0.98);
    } else if (style === 1) {
      // Tri-lobe GP circuit
      baseR = randRange(0.32, 0.35);
      a1 = randRange(0.01, 0.04);
      a2 = randRange(0.02, 0.06);
      a3 = randRange(0.08, 0.125);
      a4 = randRange(0.01, 0.04);
      a5 = randRange(0.01, 0.035);
      stretchX = randRange(0.92, 1.1);
      stretchZ = randRange(0.92, 1.1);
    } else if (style === 2) {
      // Technical quad-apex endurance loop
      baseR = randRange(0.31, 0.34);
      a2 = randRange(0.02, 0.05);
      a3 = randRange(0.02, 0.05);
      a4 = randRange(0.07, 0.105);
      a5 = randRange(0.01, 0.035);
      stretchX = randRange(0.95, 1.12);
      stretchZ = randRange(0.9, 1.06);
    } else if (style === 3) {
      // Asymmetric serpentine switchback
      baseR = randRange(0.30, 0.335);
      a1 = randRange(0.02, 0.05);
      a2 = randRange(0.06, 0.10);
      a3 = randRange(0.06, 0.095);
      a4 = randRange(0.03, 0.06);
      a5 = randRange(0.03, 0.05);
      stretchX = randRange(0.95, 1.14);
      stretchZ = randRange(0.88, 1.05);
    } else {
      // Broad sweeping speed bowl + chicane
      baseR = randRange(0.34, 0.38);
      a1 = randRange(0.01, 0.035);
      a2 = randRange(0.04, 0.085);
      a3 = randRange(0.03, 0.06);
      a5 = randRange(0.02, 0.045);
      stretchX = randRange(1.06, 1.2);
      stretchZ = randRange(0.82, 0.96);
    }

    const sampleCount = 36;
    const rawPts: TrackPoint[] = [];
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;

    for (let i = 0; i < sampleCount; i++) {
      const a = (i / sampleCount) * Math.PI * 2 * flip;
      const r = Math.max(
        0.15,
        baseR +
          a1 * Math.cos(a - p1) +
          a2 * Math.cos(2 * a - p2) +
          a3 * Math.cos(3 * a - p3) +
          a4 * Math.cos(4 * a - p4) +
          a5 * Math.cos(5 * a - p5),
      );
      const lx = Math.cos(a) * r * stretchX;
      const lz = Math.sin(a) * r * stretchZ;
      const rx = lx * Math.cos(rot) - lz * Math.sin(rot);
      const rz = lx * Math.sin(rot) + lz * Math.cos(rot);
      minX = Math.min(minX, rx);
      maxX = Math.max(maxX, rx);
      minZ = Math.min(minZ, rz);
      maxZ = Math.max(maxZ, rz);
      rawPts.push({ x: rx, z: rz });
    }

    // Center inside [0.08..0.92] canvas box, expanding moderately if compact
    const spanX = Math.max(1e-4, maxX - minX);
    const spanZ = Math.max(1e-4, maxZ - minZ);
    const maxSpan = Math.max(spanX, spanZ);
    const targetSpan = randRange(0.74, 0.84);
    const normScale = maxSpan > 0.84 || maxSpan < 0.72 ? targetSpan / maxSpan : 1;
    const cx = (minX + maxX) * 0.5;
    const cz = (minZ + maxZ) * 0.5;

    const points = rawPts.map((p) => ({
      x: Math.max(0.07, Math.min(0.93, 0.5 + (p.x - cx) * normScale)),
      z: Math.max(0.07, Math.min(0.93, 0.5 + (p.z - cz) * normScale)),
    }));

    const validation = buildFreehandTrack(points, FREEHAND_WORLD_SPAN);
    if (!validation.valid || validation.estimatedLength < MIN_TRACK_LENGTH) continue;

    const compiled = compileTrack(
      {
        id: 'auto-sketch-check',
        name: 'Auto Sketch',
        author: 'Driver',
        theme: 'alpine',
        roadWidth: 18,
        controlPoints: validation.controlPoints,
        boostPads: [],
        createdAt: 0,
      },
      120,
    );

    if (!hasCleanRoadClearance(compiled, 34)) continue;

    // Place 3-4 boost pads & 4-5 varied obstacles cleanly away from start/finish line and each other
    const padCount = rng() < 0.5 ? 3 : 4;
    const boostPads = Array.from({ length: padCount }, (_, idx) =>
      Number((0.12 + (idx / padCount) * 0.76 + randRange(-0.02, 0.02)).toFixed(3)),
    );
    const kinds: Array<'barricade' | 'tire_stack' | 'cone_cluster'> = [
      'barricade',
      'tire_stack',
      'cone_cluster',
    ];
    const obsCount = 4 + Math.floor(rng() * 2);
    const obstacles = Array.from({ length: obsCount }, (_, idx) => {
      let t = Number((0.17 + (idx / obsCount) * 0.7 + randRange(-0.015, 0.015)).toFixed(3));
      const tooClose = boostPads.some(
        (pt) => Math.min(Math.abs(pt - t), 1 - Math.abs(pt - t)) < 0.055,
      );
      if (tooClose) {
        t = Number((((t + 0.065) % 0.86) + 0.08).toFixed(3));
      }
      return {
        id: `sketch-obs-${Date.now().toString(36)}-${idx}`,
        t,
        lateral: Number(((idx % 2 === 0 ? -1 : 1) * randRange(2.2, 4.2)).toFixed(1)),
        kind: kinds[(idx + style) % kinds.length],
      };
    });

    return {
      points,
      boostPads,
      obstacles,
      estimatedLength: validation.estimatedLength,
      archetype: style,
    };
  }

  // Deterministic fallback guaranteed >= 1000m
  const fallbackPts: TrackPoint[] = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2;
    const r = 0.37 + Math.sin(a * 2) * 0.05;
    return {
      x: 0.5 + Math.cos(a) * r,
      z: 0.5 + Math.sin(a) * (0.35 + Math.cos(a * 3) * 0.04),
    };
  });
  const fallbackVal = buildFreehandTrack(fallbackPts, FREEHAND_WORLD_SPAN);
  return {
    points: fallbackPts,
    boostPads: [0.16, 0.5, 0.82],
    obstacles: [
      { id: 'sketch-obs-1', t: 0.22, lateral: -3.5, kind: 'barricade' },
      { id: 'sketch-obs-2', t: 0.44, lateral: 3.2, kind: 'tire_stack' },
      { id: 'sketch-obs-3', t: 0.66, lateral: 0.4, kind: 'cone_cluster' },
      { id: 'sketch-obs-4', t: 0.84, lateral: -3.2, kind: 'barricade' },
    ],
    estimatedLength: fallbackVal.estimatedLength,
    archetype: 0,
  };
}

export interface TrackPreviewSummary {
  svgPath: string;
  lengthMeters: number;
  boostCount: number;
  obstacleCount: number;
  cornerCount: number;
}

export interface TrackTurnSignage {
  apexChevrons: Array<{
    t: number;
    side: -1 | 1;
    x: number;
    z: number;
    yaw: number;
  }>;
  brakingBoards: Array<{
    distanceLabel: '150' | '100' | '50';
    side: -1 | 1;
    x: number;
    z: number;
    yaw: number;
  }>;
}

/**
 * Identifies sharp corners along a compiled circuit to place realistic apex chevron boards
 * and 150m / 100m / 50m braking distance markers on outer shoulders.
 */
export function computeTrackTurnSignage(track: CompiledTrack): TrackTurnSignage {
  const samples = track.samples;
  const n = samples.length;
  const stepDist = track.totalLength / Math.max(1, n);
  const windowStep = Math.max(2, Math.round(14 / Math.max(1, stepDist)));

  const curvatures: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const prev = samples[(i - windowStep + n) % n];
    const next = samples[(i + windowStep) % n];
    // Signed turn deflection using right normal · delta tangent
    const dtx = next.tx - prev.tx;
    const dtz = next.tz - prev.tz;
    const curr = samples[i];
    const signed = dtx * curr.nx + dtz * curr.nz;
    curvatures[i] = signed;
  }

  // Pick local maxima of curvature separated by at least 10% of the lap and away from start gantry
  const peakIndices: number[] = [];
  const minSep = Math.max(8, Math.floor(n * 0.11));
  for (let i = 0; i < n; i++) {
    const t = i / n;
    if (t < 0.08 || t > 0.92) continue;
    const mag = Math.abs(curvatures[i]);
    if (mag < 0.42) continue;

    let isLocalPeak = true;
    for (let k = -4; k <= 4; k++) {
      if (k !== 0 && Math.abs(curvatures[(i + k + n) % n]) > mag) {
        isLocalPeak = false;
        break;
      }
    }
    if (!isLocalPeak) continue;

    const tooClose = peakIndices.some((p) => {
      const diff = Math.abs(p - i);
      return Math.min(diff, n - diff) < minSep;
    });
    if (!tooClose) peakIndices.push(i);
  }

  const apexChevrons: TrackTurnSignage['apexChevrons'] = [];
  const brakingBoards: TrackTurnSignage['brakingBoards'] = [];
  const halfW = track.def.roadWidth * 0.5;
  const outerShoulderDist = halfW + 4.95;

  for (const peakIdx of peakIndices) {
    const turningRight = curvatures[peakIdx] > 0;
    // Outer wall of a right turn is the left shoulder (-1); outer wall of a left turn is right (+1)
    const outerSide: -1 | 1 = turningRight ? -1 : 1;

    // Place 2 sequential apex chevrons along the outer apex
    for (const deltaIdx of [-3, 1]) {
      const idx = (peakIdx + deltaIdx + n) % n;
      const s = samples[idx];
      const yaw = Math.atan2(s.tx, s.tz) + (outerSide === 1 ? Math.PI : 0);
      apexChevrons.push({
        t: s.t,
        side: outerSide,
        x: s.x + s.nx * (outerSide * outerShoulderDist),
        z: s.z + s.nz * (outerSide * outerShoulderDist),
        yaw,
      });
    }

    // Place 150m, 100m, 50m braking markers ahead of strong corners
    const distances: Array<{ meters: number; label: '150' | '100' | '50' }> = [
      { meters: 64, label: '150' },
      { meters: 44, label: '100' },
      { meters: 24, label: '50' },
    ];
    for (const d of distances) {
      const backIdx = (peakIdx - Math.round(d.meters / Math.max(1, stepDist)) + n) % n;
      const bt = backIdx / n;
      if (bt < 0.05 || bt > 0.94) continue;
      const bs = samples[backIdx];
      brakingBoards.push({
        distanceLabel: d.label,
        side: outerSide,
        x: bs.x + bs.nx * (outerSide * (outerShoulderDist + 0.35)),
        z: bs.z + bs.nz * (outerSide * (outerShoulderDist + 0.35)),
        yaw: Math.atan2(bs.tx, bs.tz),
      });
    }
  }

  return { apexChevrons, brakingBoards };
}

export function buildTrackPreviewSummary(
  def: TrackDefinition,
  size = 120,
  pad = 12,
): TrackPreviewSummary {
  const compiled = compileTrack(def, 120);
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const s of compiled.samples) {
    if (s.x < minX) minX = s.x;
    if (s.x > maxX) maxX = s.x;
    if (s.z < minZ) minZ = s.z;
    if (s.z > maxZ) maxZ = s.z;
  }
  const span = Math.max(10, maxX - minX, maxZ - minZ);
  const scale = (size - pad * 2) / span;
  const cx = (minX + maxX) * 0.5;
  const cz = (minZ + maxZ) * 0.5;
  const svgPath =
    compiled.samples
      .map((s, idx) => {
        const px = size * 0.5 + (s.x - cx) * scale;
        const py = size * 0.5 + (s.z - cz) * scale;
        return `${idx === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`;
      })
      .join(' ') + ' Z';

  const signage = computeTrackTurnSignage(compiled);
  return {
    svgPath,
    lengthMeters: Math.round(compiled.totalLength),
    boostCount: def.boostPads.length,
    obstacleCount: def.obstacles?.length ?? 0,
    cornerCount: Math.max(4, Math.round(signage.apexChevrons.length / 2)),
  };
}

export interface TrackCardMetrics {
  svgPath: string;
  areaWidthMeters: number;
  areaDepthMeters: number;
  lengthMeters: number;
  lapKmLabel: string;
  roadWidth: number;
  boostCount: number;
  hazardCount: number;
}

/**
 * Computes map carousel card metrics (rounded arena footprint, lap length in km,
 * boost/hazard counts) and a clean closed SVG path fitted to a rectangular preview card.
 */
export function buildTrackCardMetrics(
  def: TrackDefinition,
  width = 360,
  height = 175,
  padX = 24,
  padY = 18,
): TrackCardMetrics {
  const compiled = compileTrack(def, 160);
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const s of compiled.samples) {
    if (s.x < minX) minX = s.x;
    if (s.x > maxX) maxX = s.x;
    if (s.z < minZ) minZ = s.z;
    if (s.z > maxZ) maxZ = s.z;
  }

  const spanX = Math.max(10, maxX - minX);
  const spanZ = Math.max(10, maxZ - minZ);
  const usableW = Math.max(20, width - padX * 2);
  const usableH = Math.max(20, height - padY * 2);
  const cx = (minX + maxX) * 0.5;
  const cz = (minZ + maxZ) * 0.5;

  // Fill the rectangular card cleanly while keeping road proportions legible
  const scaleX = usableW / spanX;
  const scaleZ = usableH / spanZ;

  const svgPath =
    compiled.samples
      .map((s, idx) => {
        const px = width * 0.5 + (s.x - cx) * scaleX;
        const py = height * 0.5 + (s.z - cz) * scaleZ;
        return `${idx === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`;
      })
      .join(' ') + ' Z';

  const areaWidthMeters = Math.max(10, Math.round(spanX / 10) * 10);
  const areaDepthMeters = Math.max(10, Math.round(spanZ / 10) * 10);
  const lengthMeters = Math.round(compiled.totalLength);
  const lapKmLabel = `${(compiled.totalLength / 1000).toFixed(1)} km`;

  return {
    svgPath,
    areaWidthMeters,
    areaDepthMeters,
    lengthMeters,
    lapKmLabel,
    roadWidth: def.roadWidth,
    boostCount: def.boostPads.length,
    hazardCount: def.obstacles?.length ?? 0,
  };
}


