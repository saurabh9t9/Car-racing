import * as THREE from 'three';
import { sampleTrackAt } from '../shared/trackMath';
import type { CompiledTrack, ObstacleKind, TrackTheme } from '../shared/types';
import { getCachedCustomEnv } from './customModels';

export interface ThemePalette {
  skyColor: number;
  fogColor: number;
  terrainColor: number;
  asphaltTint: string;
  curbPrimary: string;
  curbSecondary: string;
  propPrimary: number;
  propSecondary: number;
  ambientSky: number;
  ambientGround: number;
  sunColor: number;
}

export const TRACK_THEMES: Record<TrackTheme, ThemePalette> = {
  alpine: {
    skyColor: 0x8fb8de,
    fogColor: 0x9ec0de,
    terrainColor: 0xffffff,
    asphaltTint: '#252a33',
    curbPrimary: '#e63928',
    curbSecondary: '#f4f6f8',
    propPrimary: 0x244c2d,
    propSecondary: 0x35693d,
    ambientSky: 0xaad4ff,
    ambientGround: 0x3b4d36,
    sunColor: 0xfff3dc,
  },
  sunset: {
    skyColor: 0xd98a5f,
    fogColor: 0xdca077,
    terrainColor: 0xe8a47c,
    asphaltTint: '#2b272c',
    curbPrimary: '#f59e0b',
    curbSecondary: '#f8fafc',
    propPrimary: 0x8f4929,
    propSecondary: 0xb86d42,
    ambientSky: 0xffb380,
    ambientGround: 0x6b3e26,
    sunColor: 0xffd7a8,
  },
  midnight: {
    skyColor: 0x162238,
    fogColor: 0x1a2840,
    terrainColor: 0x5c728f,
    asphaltTint: '#1a202c',
    curbPrimary: '#0ea5e9',
    curbSecondary: '#e2e8f0',
    propPrimary: 0x263854,
    propSecondary: 0x38bdf8,
    ambientSky: 0x4b6a9b,
    ambientGround: 0x141a24,
    sunColor: 0xcbe0ff,
  },
};

const textureLoader = new THREE.TextureLoader();
let cachedTerrainTex: THREE.Texture | null = null;
let cachedConcreteTex: THREE.Texture | null = null;

function configureTerrainTex(tex: THREE.Texture): THREE.Texture {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(95, 95);
  return tex;
}

function configureConcreteTex(tex: THREE.Texture): THREE.Texture {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  return tex;
}

export async function preloadEnvironmentTextures(onStep?: () => void): Promise<void> {
  await Promise.all([
    (async () => {
      try {
        if (!cachedTerrainTex) {
          cachedTerrainTex = configureTerrainTex(
            await textureLoader.loadAsync('/src/assets/images/tex_terrain_ground_1795081123641.jpg'),
          );
        }
      } catch {
        // ignore load failure
      }
      onStep?.();
    })(),
    (async () => {
      try {
        if (!cachedConcreteTex) {
          cachedConcreteTex = configureConcreteTex(
            await textureLoader.loadAsync('/src/assets/images/tex_concrete_barrier_1795081122985.jpg'),
          );
        }
      } catch {
        // ignore load failure
      }
      onStep?.();
    })(),
  ]);
}

function getSharedTerrainTexture(maxAnisotropy: number): THREE.Texture {
  if (!cachedTerrainTex) {
    cachedTerrainTex = configureTerrainTex(
      textureLoader.load('/src/assets/images/tex_terrain_ground_1795081123641.jpg'),
    );
  }
  cachedTerrainTex.anisotropy = maxAnisotropy;
  return cachedTerrainTex;
}

function getSharedConcreteTexture(maxAnisotropy: number): THREE.Texture {
  if (!cachedConcreteTex) {
    cachedConcreteTex = configureConcreteTex(
      textureLoader.load('/src/assets/images/tex_concrete_barrier_1795081122985.jpg'),
    );
  }
  cachedConcreteTex.anisotropy = maxAnisotropy;
  return cachedConcreteTex;
}

function createAsphaltTextures(
  asphaltHex: string,
  maxAnisotropy: number,
): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256;
  bumpCanvas.height = 256;
  const bCtx = bumpCanvas.getContext('2d')!;

  ctx.fillStyle = asphaltHex;
  ctx.fillRect(0, 0, 256, 256);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 256, 256);

  // Subtle tire rubber wear lanes
  const gradLeft = ctx.createLinearGradient(38, 0, 98, 0);
  gradLeft.addColorStop(0, 'rgba(10, 12, 16, 0)');
  gradLeft.addColorStop(0.5, 'rgba(10, 12, 16, 0.28)');
  gradLeft.addColorStop(1, 'rgba(10, 12, 16, 0)');
  ctx.fillStyle = gradLeft;
  ctx.fillRect(38, 0, 60, 256);

  const gradRight = ctx.createLinearGradient(158, 0, 218, 0);
  gradRight.addColorStop(0, 'rgba(10, 12, 16, 0)');
  gradRight.addColorStop(0.5, 'rgba(10, 12, 16, 0.28)');
  gradRight.addColorStop(1, 'rgba(10, 12, 16, 0)');
  ctx.fillStyle = gradRight;
  ctx.fillRect(158, 0, 60, 256);

  // Aggregate mineral speckle + matching tactile bump relief
  for (let i = 0; i < 3200; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const bright = Math.random() > 0.5;
    ctx.fillStyle = bright ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.1)';
    ctx.fillRect(x, y, 2, 2);

    bCtx.fillStyle = bright ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';
    bCtx.fillRect(x, y, 2, 2);
  }

  // Crisp white edge lines
  ctx.fillStyle = 'rgba(245, 248, 252, 0.88)';
  ctx.fillRect(8, 0, 6, 256);
  ctx.fillRect(242, 0, 6, 256);

  // Dashed center line
  ctx.fillStyle = 'rgba(245, 248, 252, 0.55)';
  ctx.fillRect(125, 16, 6, 96);
  ctx.fillRect(125, 144, 6, 96);

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = maxAnisotropy;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.anisotropy = maxAnisotropy;

  return { map, bumpMap };
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
  tex.anisotropy = maxAnisotropy;
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

function createHazardChevronTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 128, 64);
  ctx.fillStyle = '#ef4444';
  for (let x = -64; x < 192; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 64);
    ctx.lineTo(x + 16, 64);
    ctx.lineTo(x + 48, 0);
    ctx.lineTo(x + 32, 0);
    ctx.closePath();
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function buildRibbonGeometry(
  track: CompiledTrack,
  leftOffset: number,
  rightOffset: number,
  yHeight: number,
  vRepeatPerMeter: number,
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
    uvs[uvBase + 2] = 1;
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

/**
 * Builds a vertical guardrail / concrete barrier wall ribbon along a lateral track offset.
 */
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

function buildObstacleMesh(
  kind: ObstacleKind,
  concreteTex: THREE.Texture,
  hazardTex: THREE.Texture,
): THREE.Group {
  const obsGroup = new THREE.Group();

  if (kind === 'barricade') {
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: concreteTex,
      roughness: 0.78,
      metalness: 0.08,
    });
    const baseWall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.55, 1.05), concreteMat);
    baseWall.position.y = 0.275;
    baseWall.castShadow = true;
    baseWall.receiveShadow = true;
    obsGroup.add(baseWall);

    const upperWall = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.65, 0.62), concreteMat);
    upperWall.position.y = 0.85;
    upperWall.castShadow = true;
    upperWall.receiveShadow = true;
    obsGroup.add(upperWall);

    const chevronMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: hazardTex,
      roughness: 0.42,
    });
    const chevronBoard = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.44, 0.68), chevronMat);
    chevronBoard.position.y = 1.02;
    obsGroup.add(chevronBoard);

    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });
    for (const bx of [-1.1, 1.1]) {
      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.22, 10), beaconMat);
      beacon.position.set(bx, 1.32, 0);
      obsGroup.add(beacon);
    }
  } else if (kind === 'tire_stack') {
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
  } else {
    // cone_cluster: 3 detailed weighted traffic cones with white reflective collars
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x181c24, roughness: 0.85 });
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      emissive: 0xff3b00,
      emissiveIntensity: 0.15,
      roughness: 0.4,
    });
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
      roughness: 0.3,
    });

    const offsets = [
      { x: 0, z: 0.52 },
      { x: -0.55, z: -0.38 },
      { x: 0.55, z: -0.38 },
    ];
    for (const off of offsets) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.09, 0.62), baseMat);
      base.position.set(off.x, 0.045, off.z);
      base.castShadow = true;
      obsGroup.add(base);

      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.92, 12), orangeMat);
      cone.position.set(off.x, 0.52, off.z);
      cone.castShadow = true;
      obsGroup.add(cone);

      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.185, 0.22, 12), collarMat);
      collar.position.set(off.x, 0.55, off.z);
      obsGroup.add(collar);
    }
  }

  return obsGroup;
}

export interface BuiltTrackScene {
  group: THREE.Group;
  palette: ThemePalette;
  obstacleMeshes: Map<string, THREE.Group>;
  dispose: () => void;
}

export function buildTrackScene(track: CompiledTrack, maxAnisotropy: number): BuiltTrackScene {
  const group = new THREE.Group();
  const palette = TRACK_THEMES[track.def.theme] ?? TRACK_THEMES.alpine;
  const halfW = track.def.roadWidth * 0.5;
  const obstacleMeshes = new Map<string, THREE.Group>();

  const terrainTex = getSharedTerrainTexture(maxAnisotropy);
  const concreteTex = getSharedConcreteTexture(maxAnisotropy);

  // 1. Extended Ground Terrain with real tiled ground texture
  const terrainGeo = new THREE.CircleGeometry(750, 56);
  terrainGeo.rotateX(-Math.PI * 0.5);
  const terrainMat = new THREE.MeshStandardMaterial({
    color: palette.terrainColor,
    map: terrainTex,
    roughness: 0.94,
    metalness: 0.02,
  });
  const terrain = new THREE.Mesh(terrainGeo, terrainMat);
  terrain.position.y = 0;
  terrain.receiveShadow = true;
  group.add(terrain);

  // 2. Main Asphalt Road Ribbon with rubber wear lanes & micro-relief bump map
  const { map: asphaltTex, bumpMap: asphaltBump } = createAsphaltTextures(
    palette.asphaltTint,
    maxAnisotropy,
  );
  const roadGeo = buildRibbonGeometry(track, -halfW, halfW, 0.025, 0.085);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: asphaltTex,
    bumpMap: asphaltBump,
    bumpScale: 0.045,
    roughness: 0.8,
    metalness: 0.06,
  });
  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.receiveShadow = true;
  group.add(roadMesh);

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

  // 5. Start / Finish Checkered Line & Overhead Gantry Landmark
  const startSample = sampleTrackAt(track, 0);
  const startAngle = Math.atan2(startSample.tx, startSample.tz);

  const checkerTex = createCheckerTexture();
  checkerTex.repeat.set(Math.max(2, Math.round(track.def.roadWidth / 4)), 1);
  const checkerStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(track.def.roadWidth, 3.4),
    new THREE.MeshStandardMaterial({ map: checkerTex, roughness: 0.6 }),
  );
  checkerStrip.rotation.x = -Math.PI * 0.5;
  checkerStrip.rotation.z = startAngle;
  checkerStrip.position.set(startSample.x, 0.07, startSample.z);
  checkerStrip.receiveShadow = true;
  group.add(checkerStrip);

  const gantry = new THREE.Group();
  gantry.position.set(startSample.x, 0, startSample.z);
  gantry.rotation.y = startAngle;

  const steelMat = new THREE.MeshStandardMaterial({ color: 0x2a313d, metalness: 0.72, roughness: 0.32 });
  const concreteGantryMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: concreteTex,
    roughness: 0.7,
  });
  const bannerMat = new THREE.MeshStandardMaterial({
    color: 0xff4d2e,
    emissive: 0xff4d2e,
    emissiveIntensity: 0.45,
    roughness: 0.35,
  });
  const span = track.def.roadWidth + 4.4;
  for (const sx of [-span * 0.5, span * 0.5]) {
    const footing = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.4, 1.5), concreteGantryMat);
    footing.position.set(sx, 0.7, 0);
    gantry.add(footing);

    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.85, 8.2, 0.85), steelMat);
    pillar.position.set(sx, 4.1, 0);
    pillar.castShadow = true;
    gantry.add(pillar);
  }
  const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(span + 1.4, 1.6, 1.15), steelMat);
  crossBeam.position.set(0, 7.6, 0);
  crossBeam.castShadow = true;
  gantry.add(crossBeam);

  const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(span * 0.74, 0.38, 1.22), bannerMat);
  lightStrip.position.set(0, 7.6, 0);
  gantry.add(lightStrip);
  group.add(gantry);

  // 6. Boost Pads along track (multi-part chevron pad frame + glowing core)
  const boostMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    emissive: 0x0ea5e9,
    emissiveIntensity: 1.15,
    roughness: 0.25,
  });
  const padFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.4 });
  for (const padT of track.def.boostPads) {
    const ps = sampleTrackAt(track, padT);
    const padGroup = new THREE.Group();
    padGroup.position.set(ps.x, 0.055, ps.z);
    padGroup.rotation.y = Math.atan2(ps.tx, ps.tz);

    const frame = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.06, 7.6), padFrameMat);
    const core = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.09, 6.8), boostMat);
    padGroup.add(frame, core);
    group.add(padGroup);
  }

  // 7. Interactive Track Obstacles (Barricades, Tire Stacks, Breakable Cone Clusters)
  const hazardTex = createHazardChevronTexture();
  for (const obs of track.def.obstacles ?? []) {
    const s = sampleTrackAt(track, obs.t);
    const mesh = buildObstacleMesh(obs.kind, concreteTex, hazardTex);
    mesh.position.set(s.x + s.nx * obs.lateral, 0, s.z + s.nz * obs.lateral);
    mesh.rotation.y = Math.atan2(s.tx, s.tz);
    group.add(mesh);
    obstacleMeshes.set(obs.id, mesh);
  }

  // 8. Composite Multi-Part Trackside Biome Scenery (Safe outside road corridor)
  const placements: Array<{ x: number; z: number; scale: number; rot: number; seed: number }> = [];
  let attempt = 0;
  while (placements.length < 78 && attempt < 720) {
    attempt++;
    const angle = (attempt * 2.39996) % (Math.PI * 2);
    const radius = 32 + ((attempt * 19.7) % 230);
    const px = Math.cos(angle) * radius;
    const pz = Math.sin(angle) * radius;

    let minDistSq = Infinity;
    for (let k = 0; k < track.samples.length; k += 2) {
      const s = track.samples[k];
      const dx = px - s.x;
      const dz = pz - s.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < minDistSq) minDistSq = d2;
    }
    const safeDist = halfW + 14.5;
    if (minDistSq < safeDist * safeDist) continue;

    placements.push({
      x: px,
      z: pz,
      scale: 0.85 + ((attempt * 0.37) % 0.65),
      rot: attempt * 0.7,
      seed: attempt,
    });
  }

  const pCount = placements.length;
  if (pCount > 0) {
    if (track.def.theme === 'alpine') {
      // Multi-part pine trees: bark trunk + 3 stacked conical foliage tiers + base boulders
      const trunkMesh = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(0.36, 0.56, 3.6, 7),
        new THREE.MeshStandardMaterial({ color: 0x5c3e2a, roughness: 0.9 }),
        pCount,
      );
      const tier1 = new THREE.InstancedMesh(
        new THREE.ConeGeometry(3.2, 5.0, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 }),
        pCount,
      );
      const tier2 = new THREE.InstancedMesh(
        new THREE.ConeGeometry(2.5, 4.4, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 }),
        pCount,
      );
      const tier3 = new THREE.InstancedMesh(
        new THREE.ConeGeometry(1.75, 3.8, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 }),
        pCount,
      );
      const rockCount = Math.floor(pCount / 2);
      const rocks = new THREE.InstancedMesh(
        new THREE.DodecahedronGeometry(1.5, 0),
        new THREE.MeshStandardMaterial({ color: 0x737d89, roughness: 0.92 }),
        rockCount,
      );

      placements.forEach((pl, idx) => {
        const s = pl.scale;
        dummy.rotation.set(0, pl.rot, 0);

        dummy.position.set(pl.x, 1.8 * s, pl.z);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        trunkMesh.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x, 4.6 * s, pl.z);
        dummy.updateMatrix();
        tier1.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x, 7.2 * s, pl.z);
        dummy.updateMatrix();
        tier2.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x, 9.6 * s, pl.z);
        dummy.updateMatrix();
        tier3.setMatrixAt(idx, dummy.matrix);

        const col = new THREE.Color(idx % 2 === 0 ? palette.propPrimary : palette.propSecondary);
        col.offsetHSL(0, 0, ((idx % 4) - 1.5) * 0.025);
        tier1.setColorAt(idx, col);
        tier2.setColorAt(idx, col.clone().offsetHSL(0, 0, 0.03));
        tier3.setColorAt(idx, col.clone().offsetHSL(0, 0, 0.06));

        if (idx % 2 === 0 && idx / 2 < rockCount) {
          dummy.position.set(pl.x + Math.cos(pl.rot) * 2.8, 0.55 * s, pl.z + Math.sin(pl.rot) * 2.8);
          dummy.scale.set(s * 1.1, s * 0.65, s * 0.9);
          dummy.updateMatrix();
          rocks.setMatrixAt(idx / 2, dummy.matrix);
        }
      });

      for (const m of [trunkMesh, tier1, tier2, tier3, rocks]) {
        m.instanceMatrix.needsUpdate = true;
        if (m.instanceColor) m.instanceColor.needsUpdate = true;
        m.computeBoundingSphere();
        group.add(m);
      }
    } else if (track.def.theme === 'sunset') {
      // Multi-part stepped sandstone canyon mesas + desert boulders
      const baseMesa = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(4.8, 6.6, 6.5, 7),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
        pCount,
      );
      const midMesa = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(3.2, 4.4, 6.2, 7),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88 }),
        pCount,
      );
      const capMesa = new THREE.InstancedMesh(
        new THREE.DodecahedronGeometry(2.4, 0),
        new THREE.MeshStandardMaterial({ color: 0xb97045, roughness: 0.9 }),
        pCount,
      );

      placements.forEach((pl, idx) => {
        const s = pl.scale;
        dummy.rotation.set(0, pl.rot, 0);

        dummy.position.set(pl.x, 3.2 * s, pl.z);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        baseMesa.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x + 0.4 * s, 9.0 * s, pl.z - 0.3 * s);
        dummy.scale.set(s * 0.92, s * 1.05, s * 0.92);
        dummy.updateMatrix();
        midMesa.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x + 0.4 * s, 12.6 * s, pl.z - 0.3 * s);
        dummy.scale.set(s * 1.15, s * 0.55, s * 1.05);
        dummy.updateMatrix();
        capMesa.setMatrixAt(idx, dummy.matrix);

        const col = new THREE.Color(idx % 3 === 0 ? palette.propSecondary : palette.propPrimary);
        col.offsetHSL(0, 0, ((idx % 5) - 2) * 0.02);
        baseMesa.setColorAt(idx, col);
        midMesa.setColorAt(idx, col.clone().offsetHSL(0, 0, 0.04));
      });

      for (const m of [baseMesa, midMesa, capMesa]) {
        m.instanceMatrix.needsUpdate = true;
        if (m.instanceColor) m.instanceColor.needsUpdate = true;
        m.computeBoundingSphere();
        group.add(m);
      }
    } else {
      // Midnight Marina: Stepped skyscraper towers + illuminated neon trim crowns + roadside floodlight poles
      const towerBase = new THREE.InstancedMesh(
        new THREE.BoxGeometry(7.8, 12, 7.8),
        new THREE.MeshStandardMaterial({ color: 0x1c273b, roughness: 0.42, metalness: 0.6 }),
        pCount,
      );
      const towerUpper = new THREE.InstancedMesh(
        new THREE.BoxGeometry(5.6, 15, 5.6),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.65 }),
        pCount,
      );
      const towerCrown = new THREE.InstancedMesh(
        new THREE.BoxGeometry(5.9, 1.1, 5.9),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.85,
          roughness: 0.2,
        }),
        pCount,
      );

      placements.forEach((pl, idx) => {
        const s = pl.scale;
        const hMod = 0.85 + (idx % 4) * 0.22;
        dummy.rotation.set(0, pl.rot, 0);

        dummy.position.set(pl.x, 6 * s, pl.z);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        towerBase.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x, (12 + 7.5 * hMod) * s, pl.z);
        dummy.scale.set(s, s * hMod, s);
        dummy.updateMatrix();
        towerUpper.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(pl.x, (12 + 15 * hMod + 0.5) * s, pl.z);
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        towerCrown.setMatrixAt(idx, dummy.matrix);

        const col = new THREE.Color(idx % 3 === 0 ? 0x2d4366 : 0x22324d);
        towerUpper.setColorAt(idx, col);
        towerCrown.setColorAt(idx, new THREE.Color(idx % 3 === 0 ? 0xf43f5e : 0x38bdf8));
      });

      for (const m of [towerBase, towerUpper, towerCrown]) {
        m.instanceMatrix.needsUpdate = true;
        if (m.instanceColor) m.instanceColor.needsUpdate = true;
        m.computeBoundingSphere();
        group.add(m);
      }
    }

    // Place user-imported CGTrader / .GLB environment props around outer perimeter if loaded
    const { proto: customEnvProto } = getCachedCustomEnv();
    if (customEnvProto) {
      const maxCustom = Math.min(24, Math.floor(placements.length / 3));
      for (let i = 0; i < maxCustom; i++) {
        const pl = placements[i * 3];
        const envObj = customEnvProto.clone(true);
        envObj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.userData.sharedCustomEnv = true;
          }
        });
        envObj.position.set(pl.x + 6.5, 0, pl.z - 5.5);
        envObj.rotation.y = pl.rot;
        envObj.scale.setScalar(pl.scale);
        group.add(envObj);
      }
    }
  }

  // 9. Multi-Part Grandstand & Race Control Pit Complex near Start/Finish
  const grandstand = new THREE.Group();
  const standOffset = halfW + 11.2;
  grandstand.position.set(
    startSample.x + startSample.nx * standOffset,
    0,
    startSample.z + startSample.nz * standOffset,
  );
  grandstand.rotation.y = startAngle;

  const masonryMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: concreteTex,
    roughness: 0.72,
  });
  const basePodium = new THREE.Mesh(new THREE.BoxGeometry(7.6, 1.6, 23), masonryMat);
  basePodium.position.y = 0.8;
  basePodium.castShadow = true;
  basePodium.receiveShadow = true;
  grandstand.add(basePodium);

  // 4 tiered bleacher steps facing inward toward the track (-X in grandstand local space)
  const bleacherMat = new THREE.MeshStandardMaterial({ color: 0x3b475c, roughness: 0.55 });
  for (let tier = 0; tier < 4; tier++) {
    const depth = 6.4 - tier * 1.15;
    const stepMesh = new THREE.Mesh(
      new THREE.BoxGeometry(depth, 0.9, 21.5),
      bleacherMat,
    );
    stepMesh.position.set((6.4 - depth) * 0.5, 2.0 + tier * 0.9, 0);
    stepMesh.castShadow = true;
    grandstand.add(stepMesh);
  }

  // Steel roof columns & cantilevered roof canopy
  for (const cz of [-9.5, 0, 9.5]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 7.6, 8), steelMat);
    col.position.set(2.4, 3.8, cz);
    grandstand.add(col);
  }
  const canopyRoof = new THREE.Mesh(
    new THREE.BoxGeometry(9.8, 0.55, 24),
    new THREE.MeshStandardMaterial({ color: 0xff4d2e, roughness: 0.35 }),
  );
  canopyRoof.position.set(-0.6, 7.8, 0);
  canopyRoof.rotation.z = -0.08;
  grandstand.add(canopyRoof);

  // Stepped Race Control Tower with glass deck & antenna
  const towerBase = new THREE.Mesh(new THREE.BoxGeometry(4.8, 11.5, 4.8), masonryMat);
  towerBase.position.set(1.6, 5.75, -14.8);
  towerBase.castShadow = true;
  grandstand.add(towerBase);

  const glassDeck = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 3.2, 5.6),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.16 }),
  );
  glassDeck.position.set(1.6, 13.0, -14.8);
  grandstand.add(glassDeck);

  const towerCap = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.8, 6.0), steelMat);
  towerCap.position.set(1.6, 15.0, -14.8);
  grandstand.add(towerCap);

  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.25, 4.5, 8), steelMat);
  spire.position.set(1.6, 17.5, -14.8);
  grandstand.add(spire);

  group.add(grandstand);

  const dispose = () => {
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.InstancedMesh).isInstancedMesh) {
        const m = obj as THREE.Mesh;
        if (m.userData.sharedCustomEnv) return;
        m.geometry?.dispose();
        if (Array.isArray(m.material)) {
          m.material.forEach((mat) => mat.dispose());
        } else {
          m.material?.dispose();
        }
      }
    });
    asphaltTex.dispose();
    asphaltBump.dispose();
    curbTex.dispose();
    checkerTex.dispose();
    hazardTex.dispose();
  };

  return { group, palette, obstacleMeshes, dispose };
}
