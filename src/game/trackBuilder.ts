import * as THREE from 'three';
import {
  DEFAULT_SAKURA_FOOTPRINTS,
  generateSakuraSceneryPlacements,
  type PropFootprint,
  type SakuraModelKey,
} from '../shared/sceneryPlacement';
import { computeTrackTurnSignage, sampleTrackAt } from '../shared/trackMath';
import type { CompiledTrack, ObstacleKind, TrackTheme, WeatherPreset } from '../shared/types';
import {
  resolveEnvironmentLighting,
  type EnvironmentLightingProfile,
} from '../shared/weather';
import { getCachedCustomEnv } from './customModels';
import {
  cloneEnvAssetGroup,
  getAsphaltRoadTexture,
  getBiomeTerrainTexture,
  getConcreteBarrierTexture,
  getEnvAsset,
  type EnvModelId,
} from './envAssets';

export type { EnvironmentLightingProfile as ThemePalette };

export const TRACK_THEMES: Record<TrackTheme, EnvironmentLightingProfile> = {
  alpine: resolveEnvironmentLighting('alpine', 'sunny'),
  sunset: resolveEnvironmentLighting('sunset', 'sunny'),
  midnight: resolveEnvironmentLighting('midnight', 'night'),
  coastal: resolveEnvironmentLighting('coastal', 'sunny'),
  sakura: resolveEnvironmentLighting('sakura', 'sunny'),
};

function createAsphaltMicroBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 1100; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const bright = Math.random() > 0.5;
    ctx.fillStyle = bright ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';
    ctx.fillRect(x, y, 2, 2);
  }

  const bumpMap = new THREE.CanvasTexture(canvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.anisotropy = Math.max(1, Math.min(4, maxAnisotropy));
  return bumpMap;
}

function createDashedCenterTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 32, 128);
  ctx.fillStyle = 'rgba(245, 248, 252, 0.68)';
  ctx.fillRect(6, 12, 20, 68);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = Math.max(1, Math.min(4, maxAnisotropy));
  return tex;
}

function createCurbTexture(primary: string, secondary: string, maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = secondary;
  ctx.fillRect(0, 64, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = Math.max(1, Math.min(4, maxAnisotropy));
  return tex;
}

function createCheckerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const sq = 16;
  for (let y = 0; y < 64; y += sq) {
    for (let x = 0; x < 128; x += sq) {
      ctx.fillStyle = (x / sq + y / sq) % 2 === 0 ? '#f8fafc' : '#111827';
      ctx.fillRect(x, y, sq, sq);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createBrakingBoardTexture(distanceLabel: '150' | '100' | '50'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 192;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 128, 192);
  ctx.strokeStyle = '#ff4d2e';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 116, 180);

  // Diagonal hazard header bar
  ctx.fillStyle = '#ff4d2e';
  ctx.fillRect(14, 16, 100, 22);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 54px "Oxanium", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(distanceLabel, 64, 108);
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('METERS', 64, 156);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createApexChevronTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 120);

  for (let i = 0; i < 3; i++) {
    const ox = 28 + i * 74;
    ctx.fillStyle = i % 2 === 0 ? '#ff4d2e' : '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(ox, 20);
    ctx.lineTo(ox + 34, 20);
    ctx.lineTo(ox + 60, 64);
    ctx.lineTo(ox + 34, 108);
    ctx.lineTo(ox, 108);
    ctx.lineTo(ox + 26, 64);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildRibbonGeometry(
  track: CompiledTrack,
  leftOffset: number,
  rightOffset: number,
  yHeight: number,
  vRepeatPerMeter: number,
  uRepeat = 1,
): THREE.BufferGeometry {
  const samples = track.samples;
  const n = samples.length;
  const positions = new Float32Array((n + 1) * 2 * 3);
  const normals = new Float32Array((n + 1) * 2 * 3);
  const uvs = new Float32Array((n + 1) * 2 * 2);
  const indices: number[] = [];

  for (let i = 0; i <= n; i++) {
    const s = samples[i % n];
    const dist = i === n ? track.totalLength : s.s;
    const v = dist * vRepeatPerMeter;

    const lx = s.x + s.nx * leftOffset;
    const lz = s.z + s.nz * leftOffset;
    const rx = s.x + s.nx * rightOffset;
    const rz = s.z + s.nz * rightOffset;

    const base = i * 6;
    positions[base] = lx;
    positions[base + 1] = yHeight;
    positions[base + 2] = lz;
    positions[base + 3] = rx;
    positions[base + 4] = yHeight;
    positions[base + 5] = rz;

    normals[base] = 0;
    normals[base + 1] = 1;
    normals[base + 2] = 0;
    normals[base + 3] = 0;
    normals[base + 4] = 1;
    normals[base + 5] = 0;

    const uvBase = i * 4;
    uvs[uvBase] = 0;
    uvs[uvBase + 1] = v;
    uvs[uvBase + 2] = uRepeat;
    uvs[uvBase + 3] = v;

    if (i < n) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

function buildBarrierWallGeometry(
  track: CompiledTrack,
  offset: number,
  yBottom: number,
  yTop: number,
  faceOutwardSign: number,
  uRepeatPerMeter: number,
): THREE.BufferGeometry {
  const samples = track.samples;
  const n = samples.length;
  const positions = new Float32Array((n + 1) * 2 * 3);
  const normals = new Float32Array((n + 1) * 2 * 3);
  const uvs = new Float32Array((n + 1) * 2 * 2);
  const indices: number[] = [];

  for (let i = 0; i <= n; i++) {
    const s = samples[i % n];
    const dist = i === n ? track.totalLength : s.s;
    const u = dist * uRepeatPerMeter;

    const wx = s.x + s.nx * offset;
    const wz = s.z + s.nz * offset;

    const base = i * 6;
    positions[base] = wx;
    positions[base + 1] = yBottom;
    positions[base + 2] = wz;
    positions[base + 3] = wx;
    positions[base + 4] = yTop;
    positions[base + 5] = wz;

    normals[base] = s.nx * faceOutwardSign;
    normals[base + 1] = 0;
    normals[base + 2] = s.nz * faceOutwardSign;
    normals[base + 3] = s.nx * faceOutwardSign;
    normals[base + 4] = 0;
    normals[base + 5] = s.nz * faceOutwardSign;

    const uvBase = i * 4;
    uvs[uvBase] = u;
    uvs[uvBase + 1] = 0;
    uvs[uvBase + 2] = u;
    uvs[uvBase + 3] = 1;

    if (i < n) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      if (faceOutwardSign < 0) {
        indices.push(a, c, b, b, c, d);
      } else {
        indices.push(a, b, c, b, d, c);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

function addSkyEnvironment(group: THREE.Group, palette: EnvironmentLightingProfile): void {
  // Fast vertex-colored atmospheric dome across all presets (avoids expensive per-pixel Sky.js scattering shader)
  const domeGeo = new THREE.SphereGeometry(520, 20, 14);
  const posAttr = domeGeo.attributes.position;
  const colors = new Float32Array(posAttr.count * 3);
  const zenithColor = new THREE.Color(palette.skyZenithColor);
  const midColor = new THREE.Color(palette.skyColor);
  const horizonColor = new THREE.Color(palette.fogColor);
  const sunDir = new THREE.Vector3(...palette.sunDirection).normalize();
  const sunGlow = new THREE.Color(palette.sunColor);
  const vDir = new THREE.Vector3();
  const cTmp = new THREE.Color();

  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    const yNorm = Math.max(0, Math.min(1, vy / 520));
    if (yNorm < 0.28) {
      cTmp.copy(horizonColor).lerp(midColor, yNorm / 0.28);
    } else {
      cTmp.copy(midColor).lerp(zenithColor, (yNorm - 0.28) / 0.72);
    }
    if (palette.skyMode === 'sky' && vy > -20) {
      vDir.set(vx, vy, vz).normalize();
      const align = Math.max(0, vDir.dot(sunDir));
      const halo = Math.pow(align, 14) * 0.42;
      cTmp.lerp(sunGlow, halo);
    }
    colors[i * 3] = cTmp.r;
    colors[i * 3 + 1] = cTmp.g;
    colors[i * 3 + 2] = cTmp.b;
  }
  domeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const domeMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  group.add(new THREE.Mesh(domeGeo, domeMat));

  if (palette.skyMode === 'sky') {
    const sunDisc = new THREE.Mesh(
      new THREE.CircleGeometry(22, 16),
      new THREE.MeshBasicMaterial({
        color: palette.sunColor,
        fog: false,
        depthWrite: false,
      }),
    );
    sunDisc.position.copy(sunDir).multiplyScalar(470);
    sunDisc.lookAt(0, 0, 0);
    group.add(sunDisc);
    return;
  }

  if (!palette.showStars) return;

  // Crisp overhead starfield on clear night sky
  const starCount = 360;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const hash1 = ((Math.sin(i * 12.9898 + 1.23) * 43758.5453) % 1 + 1) % 1;
    const hash2 = ((Math.sin(i * 78.233 + 4.56) * 19341.123) % 1 + 1) % 1;
    const theta = hash1 * Math.PI * 2;
    const phi = 0.16 + hash2 * (Math.PI * 0.44);
    const r = 480;
    starPos[i * 3] = r * Math.cos(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi);
    starPos[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xe2e8f0,
    size: 2.2,
    sizeAttenuation: true,
    fog: false,
  });
  group.add(new THREE.Points(starGeo, starMat));
}

let sharedBeaconMat: THREE.MeshStandardMaterial | null = null;
function getSharedBeaconMat(): THREE.MeshStandardMaterial {
  if (!sharedBeaconMat) {
    sharedBeaconMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });
    sharedBeaconMat.userData.sharedEnvMat = true;
  }
  return sharedBeaconMat;
}

function buildObstacleMesh(
  kind: ObstacleKind,
  concreteTex: THREE.Texture,
): THREE.Group {
  const obsGroup = new THREE.Group();

  if (kind === 'barricade') {
    const redBarrier = cloneEnvAssetGroup('barrier_red');
    const whiteBarrier = cloneEnvAssetGroup('barrier_white');
    if (redBarrier && whiteBarrier) {
      redBarrier.scale.setScalar(1.35);
      whiteBarrier.scale.setScalar(1.35);
      redBarrier.position.set(-1.1, 0, 0);
      whiteBarrier.position.set(1.1, 0, 0);
      obsGroup.add(redBarrier, whiteBarrier);

      const beaconMat = getSharedBeaconMat();
      for (const bx of [-1.1, 1.1]) {
        const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.2, 8), beaconMat);
        beacon.position.set(bx, 1.56, 0);
        obsGroup.add(beacon);
      }
      return obsGroup;
    }

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: concreteTex,
      roughness: 0.78,
      metalness: 0.08,
    });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 0.9), concreteMat);
    wall.position.y = 0.55;
    wall.castShadow = true;
    wall.receiveShadow = true;
    obsGroup.add(wall);
    return obsGroup;
  }

  if (kind === 'tire_stack') {
    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e26,
      roughness: 0.86,
      metalness: 0.08,
    });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe63928, roughness: 0.5 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });

    const ringPositions = [
      { x: -0.58, y: 0.28, z: 0.25, mat: redMat },
      { x: 0.58, y: 0.28, z: 0.25, mat: whiteMat },
      { x: 0, y: 0.28, z: -0.52, mat: redMat },
      { x: -0.35, y: 0.72, z: -0.1, mat: whiteMat },
      { x: 0.35, y: 0.72, z: -0.1, mat: redMat },
      { x: 0, y: 1.16, z: -0.08, mat: whiteMat },
    ];
    for (const rp of ringPositions) {
      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.22, 10, 18), rubberMat);
      tire.rotation.x = Math.PI * 0.5;
      tire.position.set(rp.x, rp.y, rp.z);
      tire.castShadow = true;
      tire.receiveShadow = true;
      obsGroup.add(tire);

      const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.09, 16, 1, true), rp.mat);
      stripe.position.set(rp.x, rp.y, rp.z);
      obsGroup.add(stripe);
    }
    return obsGroup;
  }

  // cone_cluster: 3 real GLB pylons
  const offsets = [
    { x: 0, z: 0.52 },
    { x: -0.55, z: -0.38 },
    { x: 0.55, z: -0.38 },
  ];
  for (const off of offsets) {
    const pylon = cloneEnvAssetGroup('pylon');
    if (pylon) {
      pylon.position.set(off.x, 0, off.z);
      pylon.scale.setScalar(1.05);
      obsGroup.add(pylon);
    } else {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.24, 0.92, 10),
        new THREE.MeshStandardMaterial({ color: 0xff5a1f, roughness: 0.4 }),
      );
      cone.position.set(off.x, 0.46, off.z);
      obsGroup.add(cone);
    }
  }
  return obsGroup;
}

interface SceneryPlacement {
  x: number;
  z: number;
  scale: number;
  rotY: number;
}

interface SceneryLodChunk {
  group: THREE.Group;
  centerX: number;
  centerZ: number;
  radius: number;
}

function addInstancedGlbProps(
  group: THREE.Group,
  modelId: EnvModelId,
  placements: SceneryPlacement[],
  castShadows = false,
  lodChunks?: SceneryLodChunk[],
): boolean {
  if (placements.length === 0) return true;
  lodChunks ??= group.userData.sceneryLodChunks as SceneryLodChunk[] | undefined;
  const asset = getEnvAsset(modelId);
  if (!asset || asset.parts.length === 0) return false;

  const buckets = new Map<string, { placements: SceneryPlacement[]; x: number; z: number; radius: number }>();
  const chunkSize = 50;
  const assetHorizRadius = Math.hypot(asset.size.x, asset.size.z) * 0.5;
  if (!lodChunks || placements.length <= 2) {
    let sx = 0;
    let sz = 0;
    for (const p of placements) {
      sx += p.x;
      sz += p.z;
    }
    const cx = sx / placements.length;
    const cz = sz / placements.length;
    let maxR = 0;
    for (const p of placements) {
      const r = Math.hypot(p.x - cx, p.z - cz);
      if (r > maxR) maxR = r;
    }
    buckets.set('all', { placements, x: cx, z: cz, radius: maxR + assetHorizRadius });
  } else {
    for (const placement of placements) {
      const cellX = Math.floor(placement.x / chunkSize);
      const cellZ = Math.floor(placement.z / chunkSize);
      const key = `${cellX}:${cellZ}`;
      let bucket = buckets.get(key);
      if (!bucket) {
        bucket = {
          placements: [],
          x: 0,
          z: 0,
          radius: 0,
        };
        buckets.set(key, bucket);
      }
      bucket.placements.push(placement);
    }
    for (const bucket of buckets.values()) {
      let sx = 0;
      let sz = 0;
      for (const p of bucket.placements) {
        sx += p.x;
        sz += p.z;
      }
      bucket.x = sx / bucket.placements.length;
      bucket.z = sz / bucket.placements.length;
      let maxR = 0;
      for (const p of bucket.placements) {
        const r = Math.hypot(p.x - bucket.x, p.z - bucket.z);
        if (r > maxR) maxR = r;
      }
      bucket.radius = maxR + assetHorizRadius;
    }
  }

  const dummy = new THREE.Object3D();
  const finalMat = new THREE.Matrix4();
  for (const bucket of buckets.values()) {
    const batchRoot = lodChunks ? new THREE.Group() : group;
    if (lodChunks) {
      batchRoot.name = `scenery-${modelId}`;
      group.add(batchRoot);
      lodChunks.push({ group: batchRoot, centerX: bucket.x, centerZ: bucket.z, radius: bucket.radius });
    }

    for (const part of asset.parts) {
      const inst = new THREE.InstancedMesh(part.geometry, part.material, bucket.placements.length);
      inst.userData.sharedEnvGeo = true;
      inst.userData.sharedEnvMat = true;
      inst.castShadow = castShadows;
      inst.receiveShadow = castShadows;

      for (let i = 0; i < bucket.placements.length; i++) {
        const pl = bucket.placements[i];
        dummy.position.set(pl.x, 0, pl.z);
        dummy.rotation.set(0, pl.rotY, 0);
        dummy.scale.setScalar(pl.scale);
        dummy.updateMatrix();
        finalMat.multiplyMatrices(dummy.matrix, part.localMatrix);
        inst.setMatrixAt(i, finalMat);
      }

      inst.instanceMatrix.needsUpdate = true;
      inst.computeBoundingSphere();
      batchRoot.add(inst);
    }
  }
  return true;
}

export interface BuiltTrackScene {
  group: THREE.Group;
  palette: EnvironmentLightingProfile;
  obstacleMeshes: Map<string, THREE.Group>;
  updateLod: (x: number, z: number, maxDistance: number) => void;
  setLowDetailMode: (lowDetail: boolean) => void;
  dispose: () => void;
}

export function buildTrackScene(
  track: CompiledTrack,
  maxAnisotropy: number,
  weather: WeatherPreset = track.def.theme === 'midnight' ? 'night' : 'sunny',
): BuiltTrackScene {
  const group = new THREE.Group();
  const palette = resolveEnvironmentLighting(track.def.theme, weather);
  const halfW = track.def.roadWidth * 0.5;
  const obstacleMeshes = new Map<string, THREE.Group>();
  const sceneryLodChunks: SceneryLodChunk[] = [];
  group.userData.sceneryLodChunks = sceneryLodChunks;

  const terrainTex = getBiomeTerrainTexture(track.def.theme, maxAnisotropy);
  const asphaltTex = getAsphaltRoadTexture(maxAnisotropy);
  const concreteTex = getConcreteBarrierTexture(maxAnisotropy);

  // 0. Real Atmospheric Sky Dome (Sky.js for Sunny, Overcast storm dome for Rainy, Starfield dome for Night)
  addSkyEnvironment(group, palette);

  // 1. Extended Ground Terrain with biome-matched real photorealistic surface texture
  const terrainGeo = new THREE.CircleGeometry(750, 36);
  terrainGeo.rotateX(-Math.PI * 0.5);
  const terrainMat = new THREE.MeshStandardMaterial({
    color: palette.terrainColor,
    map: terrainTex,
    roughness: palette.hasRain ? 0.65 : 0.94,
    metalness: palette.hasRain ? 0.08 : 0.02,
  });
  terrainMat.userData.sharedEnvTex = true;
  const terrain = new THREE.Mesh(terrainGeo, terrainMat);
  terrain.position.y = 0;
  terrain.receiveShadow = true;
  group.add(terrain);

  // Coastal Ocean Rim: expansive reflective turquoise sea encircling coastal highway cliffs
  if (track.def.theme === 'coastal') {
    const oceanGeo = new THREE.RingGeometry(245, 760, 40);
    oceanGeo.rotateX(-Math.PI * 0.5);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: palette.weather === 'night' ? 0x0c3454 : palette.weather === 'rainy' ? 0x2c5670 : 0x0c7fa8,
      roughness: 0.16,
      metalness: 0.42,
      envMapIntensity: 1.15,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.position.y = 0.014;
    ocean.receiveShadow = true;
    group.add(ocean);
  }

  // 2. Main Asphalt Road Ribbon with real motorsport tarmac texture + micro-relief bump + wet/dry surface roughness
  const asphaltBump = createAsphaltMicroBumpTexture(maxAnisotropy);
  const roadGeo = buildRibbonGeometry(track, -halfW, halfW, 0.025, 0.14, Math.max(2, Math.round(track.def.roadWidth / 7)));
  const roadMat = new THREE.MeshStandardMaterial({
    color: palette.roadColor,
    map: asphaltTex,
    bumpMap: asphaltBump,
    bumpScale: palette.hasRain ? 0.02 : 0.035,
    roughness: palette.roadRoughness,
    metalness: palette.roadMetalness,
  });
  roadMat.userData.sharedEnvTex = true;
  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.receiveShadow = true;
  group.add(roadMesh);

  // Crisp white shoulder lines & dashed centerline (disjoint Y + polygonOffset)
  const edgeLineMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.55,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const leftLineGeo = buildRibbonGeometry(track, -halfW + 0.25, -halfW + 0.52, 0.036, 0.1);
  const rightLineGeo = buildRibbonGeometry(track, halfW - 0.52, halfW - 0.25, 0.036, 0.1);
  group.add(new THREE.Mesh(leftLineGeo, edgeLineMat), new THREE.Mesh(rightLineGeo, edgeLineMat));

  const centerDashTex = createDashedCenterTexture(maxAnisotropy);
  const centerLineMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: centerDashTex,
    transparent: true,
    roughness: 0.55,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const centerLineGeo = buildRibbonGeometry(track, -0.14, 0.14, 0.038, 0.09);
  group.add(new THREE.Mesh(centerLineGeo, centerLineMat));

  // 3. Painted Apex Curbs on both shoulders (y = 0.05)
  const curbTex = createCurbTexture(palette.curbPrimary, palette.curbSecondary, maxAnisotropy);
  const curbMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: curbTex,
    roughness: 0.65,
    metalness: 0.08,
  });
  const leftCurbGeo = buildRibbonGeometry(track, -halfW - 1.35, -halfW + 0.05, 0.05, 0.22);
  const rightCurbGeo = buildRibbonGeometry(track, halfW - 0.05, halfW + 1.35, 0.05, 0.22);
  const leftCurb = new THREE.Mesh(leftCurbGeo, curbMat);
  const rightCurb = new THREE.Mesh(rightCurbGeo, curbMat);
  leftCurb.receiveShadow = true;
  rightCurb.receiveShadow = true;
  group.add(leftCurb, rightCurb);

  // 4. Continuous Concrete & Armco Guardrail Barriers along outer boundaries
  const barrierOffset = halfW + 4.35;
  const barrierMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: concreteTex,
    roughness: 0.62,
    metalness: 0.22,
    side: THREE.DoubleSide,
  });
  barrierMat.userData.sharedEnvTex = true;
  const leftWallGeo = buildBarrierWallGeometry(track, -barrierOffset, 0.0, 1.15, 1, 0.18);
  const rightWallGeo = buildBarrierWallGeometry(track, barrierOffset, 0.0, 1.15, -1, 0.18);
  const leftWall = new THREE.Mesh(leftWallGeo, barrierMat);
  const rightWall = new THREE.Mesh(rightWallGeo, barrierMat);
  leftWall.receiveShadow = true;
  rightWall.receiveShadow = true;
  group.add(leftWall, rightWall);

  // Steel Barrier Posts + Reflector Caps along the continuous wall
  const postCount = Math.min(180, Math.floor(track.samples.length / 2));
  const postGeo = new THREE.BoxGeometry(0.28, 1.32, 0.34);
  const postMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.65, roughness: 0.35 });
  const capGeo = new THREE.BoxGeometry(0.32, 0.18, 0.42);
  const capMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.15 });
  const posts = new THREE.InstancedMesh(postGeo, postMat, postCount * 2);
  const caps = new THREE.InstancedMesh(capGeo, capMat, postCount * 2);
  const dummy = new THREE.Object3D();
  const colorHelper = new THREE.Color();

  let bIdx = 0;
  for (let i = 0; i < postCount; i++) {
    const s = track.samples[Math.floor((i / postCount) * track.samples.length)];
    const yaw = Math.atan2(s.tx, s.tz);
    for (const side of [-1, 1]) {
      const offset = side * (barrierOffset + 0.12);
      dummy.position.set(s.x + s.nx * offset, 0.66, s.z + s.nz * offset);
      dummy.rotation.set(0, yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      posts.setMatrixAt(bIdx, dummy.matrix);

      dummy.position.set(s.x + s.nx * (side * (barrierOffset - 0.05)), 1.24, s.z + s.nz * (side * (barrierOffset - 0.05)));
      dummy.updateMatrix();
      caps.setMatrixAt(bIdx, dummy.matrix);
      colorHelper.setHex(i % 2 === 0 ? 0xf8fafc : 0xff4d2e);
      caps.setColorAt(bIdx, colorHelper);
      bIdx++;
    }
  }
  posts.instanceMatrix.needsUpdate = true;
  caps.instanceMatrix.needsUpdate = true;
  if (caps.instanceColor) caps.instanceColor.needsUpdate = true;
  posts.computeBoundingSphere();
  caps.computeBoundingSphere();
  group.add(posts, caps);

  // 5. Start / Finish Checkered Line & Real .GLB Overhead Gantry + Paddock Complex
  const startSample = sampleTrackAt(track, 0);
  const startAngle = Math.atan2(startSample.tx, startSample.tz);

  const checkerTex = createCheckerTexture();
  checkerTex.repeat.set(Math.max(2, Math.round(track.def.roadWidth / 4)), 1);
  const checkerStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(track.def.roadWidth, 3.4),
    new THREE.MeshStandardMaterial({
      map: checkerTex,
      roughness: 0.6,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
  );
  checkerStrip.rotation.x = -Math.PI * 0.5;
  checkerStrip.rotation.z = startAngle;
  checkerStrip.position.set(startSample.x, 0.07, startSample.z);
  checkerStrip.receiveShadow = true;
  group.add(checkerStrip);

  const gantryAsset = getEnvAsset('race_drag_start_and_finish_line');
  const gantryModel = cloneEnvAssetGroup('race_drag_start_and_finish_line');
  if (gantryModel && gantryAsset) {
    const desiredSpan = track.def.roadWidth + 7.2;
    const xScale = desiredSpan / Math.max(gantryAsset.size.x, 1);
    gantryModel.scale.set(xScale, 1.0, 1.15);
    gantryModel.position.set(startSample.x, 0, startSample.z);
    gantryModel.rotation.y = startAngle;
    group.add(gantryModel);
  } else {
    // Graceful minimal fallback only before preload completes
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x2a313d, metalness: 0.72, roughness: 0.32 });
    const gantry = new THREE.Group();
    gantry.position.set(startSample.x, 0, startSample.z);
    gantry.rotation.y = startAngle;
    const span = track.def.roadWidth + 4.4;
    for (const sx of [-span * 0.5, span * 0.5]) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.85, 8.2, 0.85), steelMat);
      pillar.position.set(sx, 4.1, 0);
      gantry.add(pillar);
    }
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(span + 1.4, 1.6, 1.15), steelMat);
    crossBeam.position.set(0, 7.6, 0);
    gantry.add(crossBeam);
    group.add(gantry);
  }

  // Real .GLB Grandstand & Pit Complex near Start/Finish (batched via InstancedMesh + LOD chunks)
  const tracksideBatches = new Map<EnvModelId, SceneryPlacement[]>();
  const queueTracksideProp = (
    modelId: EnvModelId,
    t: number,
    lateralOffset: number,
    faceInward: boolean,
    scale = 1,
    extraYaw = 0,
  ) => {
    const s = sampleTrackAt(track, t);
    const yaw = Math.atan2(s.tx, s.tz);
    const inwardRot = faceInward ? (lateralOffset >= 0 ? Math.PI * 0.5 : -Math.PI * 0.5) : 0;
    let list = tracksideBatches.get(modelId);
    if (!list) {
      list = [];
      tracksideBatches.set(modelId, list);
    }
    list.push({
      x: s.x + s.nx * lateralOffset,
      z: s.z + s.nz * lateralOffset,
      scale,
      rotY: yaw + inwardRot + extraYaw,
    });
  };

  // Covered Grandstands + Race Control Pit Office + Pit Garages + Team Tents around Start Straight
  const paddockLateral = halfW + 14.5;
  queueTracksideProp('grandstand_covered', 0.975, paddockLateral, true, 1.25);
  queueTracksideProp('grandstand_covered', 0.028, paddockLateral, true, 1.25);
  queueTracksideProp('pits_office', 0.942, paddockLateral + 1.5, true, 1.15);
  queueTracksideProp('pits_garage', 0.96, -paddockLateral, true, 1.1);
  queueTracksideProp('pits_garage', 0.005, -paddockLateral, true, 1.1);
  queueTracksideProp('tent', 0.048, -paddockLateral, true, 1.15);
  queueTracksideProp('tent', 0.07, -paddockLateral, true, 1.15);
  queueTracksideProp('flag_checkers', 0.012, halfW + 6.4, true, 1.0);

  // Trackside Billboards, Banner Towers & Floodlight Posts along the circuit
  const circuitMarkers = [0.14, 0.28, 0.42, 0.56, 0.70, 0.84];
  circuitMarkers.forEach((mt, idx) => {
    const side = idx % 2 === 0 ? 1 : -1;
    queueTracksideProp(idx % 3 === 0 ? 'banner_tower' : 'billboard', mt, side * (halfW + 8.6), true, 1.0);
  });

  for (const [modelId, list] of tracksideBatches.entries()) {
    addInstancedGlbProps(group, modelId, list, false, sceneryLodChunks);
  }

  // Stadium Light Posts via InstancedMesh along the track (dense in Night & Rainy weather or Midnight track)
  const lightPostCount = palette.lightPostCount;
  const lightPostPlacements: SceneryPlacement[] = [];
  for (let i = 0; i < lightPostCount; i++) {
    const t = i / lightPostCount;
    const s = sampleTrackAt(track, t);
    const side = i % 2 === 0 ? 1 : -1;
    const yaw = Math.atan2(s.tx, s.tz) + (side >= 0 ? Math.PI * 0.5 : -Math.PI * 0.5);
    const lat = side * (halfW + 5.9);
    lightPostPlacements.push({
      x: s.x + s.nx * lat,
      z: s.z + s.nz * lat,
      scale: 1,
      rotY: yaw,
    });
  }
  addInstancedGlbProps(group, 'light_post', lightPostPlacements, false, sceneryLodChunks);

  // 6. Boost Pads along track (2 InstancedMeshes total)
  if (track.def.boostPads.length > 0) {
    const boostMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.15,
      roughness: 0.25,
    });
    const padFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.4 });
    const frameGeo = new THREE.BoxGeometry(4.7, 0.06, 7.6);
    const coreGeo = new THREE.BoxGeometry(4.0, 0.09, 6.8);
    const framesInst = new THREE.InstancedMesh(frameGeo, padFrameMat, track.def.boostPads.length);
    const coresInst = new THREE.InstancedMesh(coreGeo, boostMat, track.def.boostPads.length);

    track.def.boostPads.forEach((padT, idx) => {
      const ps = sampleTrackAt(track, padT);
      dummy.position.set(ps.x, 0.055, ps.z);
      dummy.rotation.set(0, Math.atan2(ps.tx, ps.tz), 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      framesInst.setMatrixAt(idx, dummy.matrix);
      coresInst.setMatrixAt(idx, dummy.matrix);
    });
    framesInst.instanceMatrix.needsUpdate = true;
    coresInst.instanceMatrix.needsUpdate = true;
    framesInst.computeBoundingSphere();
    coresInst.computeBoundingSphere();
    group.add(framesInst, coresInst);
  }

  // 7. Interactive Track Obstacles (Real .GLB Barricades & Pylons + Tire Stacks)
  for (const obs of track.def.obstacles ?? []) {
    const s = sampleTrackAt(track, obs.t);
    const mesh = buildObstacleMesh(obs.kind, concreteTex);
    mesh.position.set(s.x + s.nx * obs.lateral, 0, s.z + s.nz * obs.lateral);
    mesh.rotation.y = Math.atan2(s.tx, s.tz);
    group.add(mesh);
    obstacleMeshes.set(obs.id, mesh);
  }

  // 8. Real .GLB Trackside Biome Scenery
  const placements: Array<{
    x: number;
    z: number;
    scale: number;
    rot: number;
    seed: number;
  }> = [];

  const isSakura = track.def.theme === 'sakura';

  if (isSakura) {
    const liveFootprints: Partial<Record<SakuraModelKey, PropFootprint>> = {
      ...DEFAULT_SAKURA_FOOTPRINTS,
    };
    for (const key of Object.keys(DEFAULT_SAKURA_FOOTPRINTS) as SakuraModelKey[]) {
      const asset = getEnvAsset(key);
      if (asset) {
        liveFootprints[key] = { sizeX: asset.size.x, sizeZ: asset.size.z };
      }
    }

    const sakuraItems = generateSakuraSceneryPlacements(track, liveFootprints);
    const byModel = new Map<SakuraModelKey, SceneryPlacement[]>();
    for (const item of sakuraItems) {
      let list = byModel.get(item.modelId);
      if (!list) {
        list = [];
        byModel.set(item.modelId, list);
      }
      list.push({
        x: item.x,
        z: item.z,
        scale: item.scale,
        rotY: item.rotY,
      });
    }

    for (const [modelId, list] of byModel.entries()) {
      const added = addInstancedGlbProps(group, modelId, list, false, sceneryLodChunks);
      if (!added) {
        const fallbackId: EnvModelId =
          modelId === 'sakura_cherry_trees' || modelId === 'sakura_japanese_temple' || modelId === 'sakura_chinese_hall'
            ? 'env_spruce_trees'
            : 'env_stylized_rocks';
        addInstancedGlbProps(group, fallbackId, list, false, sceneryLodChunks);
      }
    }
  } else {
    // Original general scenery placement pattern.
    let attempt = 0;

    while (placements.length < 96 && attempt < 950) {
      attempt++;

      const angle = (attempt * 2.39996) % (Math.PI * 2);
      const radius = 34 + ((attempt * 23.7) % 245);

      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius;

      let minDistSq = Infinity;

      for (let k = 0; k < track.samples.length; k += 2) {
        const s = track.samples[k];

        const dx = px - s.x;
        const dz = pz - s.z;
        const d2 = dx * dx + dz * dz;

        if (d2 < minDistSq) {
          minDistSq = d2;
        }
      }

      const safeDist = halfW + 17.5;

      if (minDistSq < safeDist * safeDist) continue;

      placements.push({
        x: px,
        z: pz,
        scale: 0.85 + ((attempt * 0.37) % 0.65),
        rot: (attempt * 1.13) % (Math.PI * 2),
        seed: attempt,
      });
    }
  }

  if (placements.length > 0) {
    // ---------------------------------------------------------
    // ALPINE
    // ---------------------------------------------------------
    if (track.def.theme === 'alpine') {
      const spruceTrees: SceneryPlacement[] = [];
      const lowPolyTrees: SceneryPlacement[] = [];
      const rocks: SceneryPlacement[] = [];

      placements.forEach((pl, idx) => {
        const mod = idx % 5;

        if (mod === 0 || mod === 2 || mod === 4) {
          spruceTrees.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale,
            rotY: pl.rot,
          });
        } else if (mod === 1) {
          lowPolyTrees.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale * 0.92,
            rotY: pl.rot,
          });
        } else {
          rocks.push({
            x: pl.x + Math.cos(pl.rot) * 2.8,
            z: pl.z + Math.sin(pl.rot) * 2.8,
            scale: pl.scale * 1.1,
            rotY: pl.rot * 0.7,
          });
        }
      });

      const hasSpruce = addInstancedGlbProps(
        group,
        'env_spruce_trees',
        spruceTrees,
      );

      const hasLowPoly = addInstancedGlbProps(
        group,
        'env_lowpoly_tree',
        lowPolyTrees,
      );

      const hasRocks = addInstancedGlbProps(
        group,
        'env_stylized_rocks',
        rocks,
      );

      if (!hasSpruce) {
        addInstancedGlbProps(group, 'pine_tall_a', spruceTrees);
      }

      if (!hasLowPoly) {
        addInstancedGlbProps(group, 'pine_round', lowPolyTrees);
      }

      if (!hasRocks) {
        addInstancedGlbProps(group, 'rock_large', rocks);
      }
    }

    // ---------------------------------------------------------
    // SUNSET
    // ---------------------------------------------------------
    else if (track.def.theme === 'sunset') {
      const dryTrees: SceneryPlacement[] = [];
      const dryGrass: SceneryPlacement[] = [];
      const canyonRocks: SceneryPlacement[] = [];

      placements.forEach((pl, idx) => {
        const mod = idx % 5;

        if (mod === 0 || mod === 2) {
          dryTrees.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale * 0.95,
            rotY: pl.rot,
          });
        } else if (mod === 1 || mod === 4) {
          dryGrass.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale * 0.85,
            rotY: pl.rot,
          });
        } else {
          canyonRocks.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale * 1.1,
            rotY: pl.rot,
          });
        }
      });

      const hasDryTrees = addInstancedGlbProps(
        group,
        'env_dry_tree',
        dryTrees,
      );

      const hasDryGrass = addInstancedGlbProps(
        group,
        'env_dry_grass',
        dryGrass,
      );

      const hasCanyonRocks = addInstancedGlbProps(
        group,
        'canyon_rock',
        canyonRocks,
      );

      if (!hasDryTrees) {
        addInstancedGlbProps(group, 'cactus_tall', dryTrees);
      }

      if (!hasDryGrass) {
        addInstancedGlbProps(group, 'cactus_short', dryGrass);
      }

      if (!hasCanyonRocks) {
        addInstancedGlbProps(group, 'canyon_cliff', canyonRocks);
      }
    }

    // ---------------------------------------------------------
    // COASTAL
    // ---------------------------------------------------------
    else if (track.def.theme === 'coastal') {
      const palms: SceneryPlacement[] = [];
      const rocks: SceneryPlacement[] = [];

      placements.forEach((pl, idx) => {
        if (idx % 4 === 0) {
          rocks.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale * 1.15,
            rotY: pl.rot,
          });
        } else {
          palms.push({
            x: pl.x,
            z: pl.z,
            scale: pl.scale * 0.95,
            rotY: pl.rot,
          });
        }
      });

      const hasPalms = addInstancedGlbProps(
        group,
        'env_palm_tree',
        palms,
      );

      const hasRocks = addInstancedGlbProps(
        group,
        'env_stylized_rocks',
        rocks,
      );

      if (!hasPalms) {
        addInstancedGlbProps(group, 'pine_tall_a', palms);
      }

      if (!hasRocks) {
        addInstancedGlbProps(group, 'rock_large', rocks);
      }
    }

    // ---------------------------------------------------------
    // MIDNIGHT MARINA
    // Original assets ONLY. No new Marine GLBs.
    // ---------------------------------------------------------
    else if (track.def.theme === 'midnight') {
      const skyscraperA: SceneryPlacement[] = [];
      const skyscraperB: SceneryPlacement[] = [];
      const skyscraperC: SceneryPlacement[] = [];
      const buildings: SceneryPlacement[] = [];

      placements.forEach((pl, idx) => {
        const item: SceneryPlacement = {
          x: pl.x,
          z: pl.z,
          scale: pl.scale,
          rotY: pl.rot,
        };

        const mod = idx % 10;

        if (mod < 3) {
          skyscraperA.push(item);
        } else if (mod < 6) {
          skyscraperB.push(item);
        } else if (mod < 8) {
          skyscraperC.push(item);
        } else {
          buildings.push(item);
        }
      });

      addInstancedGlbProps(
        group,
        'skyscraper_a',
        skyscraperA,
      );

      addInstancedGlbProps(
        group,
        'skyscraper_b',
        skyscraperB,
      );

      addInstancedGlbProps(
        group,
        'skyscraper_c',
        skyscraperC,
      );

      addInstancedGlbProps(
        group,
        'building_a',
        buildings,
      );
    }

    // ---------------------------------------------------------
    // USER-IMPORTED CUSTOM ENVIRONMENT MODELS
    // ---------------------------------------------------------
    const { proto: customEnvProto } = getCachedCustomEnv();

    if (customEnvProto) {
      const maxCustom = Math.min(
        24,
        Math.floor(placements.length / 3),
      );

      for (let i = 0; i < maxCustom; i++) {
        const pl = placements[i * 3];

        const envObj = customEnvProto.clone(true);

        envObj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.userData.sharedCustomEnv = true;
          }
        });

        envObj.position.set(
          pl.x + 6.5,
          0,
          pl.z - 5.5,
        );

        envObj.rotation.y = pl.rot;
        envObj.scale.setScalar(pl.scale);

        const customChunk = new THREE.Group();
        customChunk.add(envObj);
        group.add(customChunk);
        sceneryLodChunks.push({
          group: customChunk,
          centerX: envObj.position.x,
          centerZ: envObj.position.z,
          radius: 9,
        });
      }
    }
  }

  // 9. Curvature-Driven Motorsport Signage (Instanced Apex Chevrons + 150m / 100m / 50m Braking Boards)
  const signage = computeTrackTurnSignage(track);
  const chevronTex = createApexChevronTexture();
  const boardTex150 = createBrakingBoardTexture('150');
  const boardTex100 = createBrakingBoardTexture('100');
  const boardTex50 = createBrakingBoardTexture('50');
  const signPostMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.35 });
  const signPostGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.9, 6);

  const postTransforms: THREE.Matrix4[] = [];
  const signDummy = new THREE.Object3D();
  const postOffsetObj = new THREE.Object3D();

  const pushPostAt = (x: number, z: number, yaw: number, localX: number) => {
    signDummy.position.set(x, 0, z);
    signDummy.rotation.set(0, yaw, 0);
    signDummy.scale.set(1, 1, 1);
    signDummy.updateMatrix();
    postOffsetObj.position.set(localX, 0.95, 0);
    postOffsetObj.rotation.set(0, 0, 0);
    postOffsetObj.scale.set(1, 1, 1);
    postOffsetObj.updateMatrix();
    const m = new THREE.Matrix4().multiplyMatrices(signDummy.matrix, postOffsetObj.matrix);
    postTransforms.push(m);
  };

  if (signage.apexChevrons.length > 0) {
    const chevronMat = new THREE.MeshStandardMaterial({
      map: chevronTex,
      roughness: 0.42,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });
    const chevronGeo = new THREE.BoxGeometry(2.9, 1.15, 0.12);
    const chevronInst = new THREE.InstancedMesh(chevronGeo, chevronMat, signage.apexChevrons.length);
    signage.apexChevrons.forEach((c, idx) => {
      pushPostAt(c.x, c.z, c.yaw, -0.95);
      pushPostAt(c.x, c.z, c.yaw, 0.95);
      signDummy.position.set(c.x, 1.55, c.z);
      signDummy.rotation.set(0, c.yaw, 0);
      signDummy.scale.set(1, 1, 1);
      signDummy.updateMatrix();
      chevronInst.setMatrixAt(idx, signDummy.matrix);
    });
    chevronInst.instanceMatrix.needsUpdate = true;
    chevronInst.computeBoundingSphere();
    group.add(chevronInst);
  }

  if (signage.brakingBoards.length > 0) {
    const boardGeo = new THREE.BoxGeometry(1.15, 1.7, 0.1);
    const boardMats = {
      '150': new THREE.MeshStandardMaterial({ map: boardTex150, roughness: 0.4, side: THREE.DoubleSide }),
      '100': new THREE.MeshStandardMaterial({ map: boardTex100, roughness: 0.4, side: THREE.DoubleSide }),
      '50': new THREE.MeshStandardMaterial({ map: boardTex50, roughness: 0.4, side: THREE.DoubleSide }),
    };
    const groupedBoards: Record<'150' | '100' | '50', typeof signage.brakingBoards> = {
      '150': [],
      '100': [],
      '50': [],
    };
    for (const b of signage.brakingBoards) {
      pushPostAt(b.x, b.z, b.yaw, 0);
      groupedBoards[b.distanceLabel].push(b);
    }
    for (const label of ['150', '100', '50'] as const) {
      const list = groupedBoards[label];
      if (list.length === 0) continue;
      const inst = new THREE.InstancedMesh(boardGeo, boardMats[label], list.length);
      list.forEach((b, idx) => {
        signDummy.position.set(b.x, 1.85, b.z);
        signDummy.rotation.set(0, b.yaw, 0);
        signDummy.scale.set(1, 1, 1);
        signDummy.updateMatrix();
        inst.setMatrixAt(idx, signDummy.matrix);
      });
      inst.instanceMatrix.needsUpdate = true;
      inst.computeBoundingSphere();
      group.add(inst);
    }
  }

  if (postTransforms.length > 0) {
    const postsInst = new THREE.InstancedMesh(signPostGeo, signPostMat, postTransforms.length);
    for (let i = 0; i < postTransforms.length; i++) {
      postsInst.setMatrixAt(i, postTransforms[i]);
    }
    postsInst.instanceMatrix.needsUpdate = true;
    postsInst.computeBoundingSphere();
    group.add(postsInst);
  } else {
    signPostGeo.dispose();
    signPostMat.dispose();
  }

  const dispose = () => {
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.InstancedMesh).isInstancedMesh || (obj as THREE.Points).isPoints) {
        const m = obj as THREE.Mesh;
        if (m.userData.sharedCustomEnv) return;
        if (!m.userData.sharedEnvGeo) {
          m.geometry?.dispose();
        }
        const disposeMat = (mat: THREE.Material | undefined) => {
          if (!mat || mat.userData.sharedEnvMat) return;
          mat.dispose();
        };
        if (Array.isArray(m.material)) {
          m.material.forEach(disposeMat);
        } else {
          disposeMat(m.material);
        }
      }
    });
    asphaltBump.dispose();
    centerDashTex.dispose();
    curbTex.dispose();
    checkerTex.dispose();
    chevronTex.dispose();
    boardTex150.dispose();
    boardTex100.dispose();
    boardTex50.dispose();
  };

  let lastLodX = Number.NaN;
  let lastLodZ = Number.NaN;
  let lastLodDistance = Number.NaN;
  const updateLod = (x: number, z: number, maxDistance: number) => {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return;
    if (
      Math.abs(x - lastLodX) < 8 &&
      Math.abs(z - lastLodZ) < 8 &&
      maxDistance === lastLodDistance
    ) return;
    lastLodX = x;
    lastLodZ = z;
    lastLodDistance = maxDistance;
    for (const chunk of sceneryLodChunks) {
      const dx = chunk.centerX - x;
      const dz = chunk.centerZ - z;
      const paddedDist = maxDistance + chunk.radius + 6;
      chunk.group.visible = dx * dx + dz * dz <= paddedDist * paddedDist;
    }
  };

  let currentLowDetail: boolean | null = null;
  const setLowDetailMode = (lowDetail: boolean) => {
    if (currentLowDetail === lowDetail) return;
    currentLowDetail = lowDetail;
    const targetBump = lowDetail ? null : asphaltBump;
    if (roadMat.bumpMap !== targetBump) {
      roadMat.bumpMap = targetBump;
      roadMat.needsUpdate = true;
    }
  };

  return { group, palette, obstacleMeshes, updateLod, setLowDetailMode, dispose };
}
