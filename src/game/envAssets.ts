import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import type { TrackTheme } from '../shared/types';

export type EnvModelId =
  | 'race_drag_start_and_finish_line'
  | 'grandstand_covered'
  | 'pits_garage'
  | 'pits_office'
  | 'banner_tower'
  | 'billboard'
  | 'flag_checkers'
  | 'light_post'
  | 'tent'
  | 'barrier_red'
  | 'barrier_white'
  | 'pylon'
  | 'pine_tall_a'
  | 'pine_tall_b'
  | 'pine_round'
  | 'rock_large'
  | 'canyon_tall'
  | 'canyon_rock'
  | 'canyon_cliff'
  | 'cactus_tall'
  | 'cactus_short'
  | 'skyscraper_a'
  | 'skyscraper_b'
  | 'skyscraper_c'
  | 'building_a'
  | 'env_spruce_trees'
  | 'env_lowpoly_tree'
  | 'env_cherry_blossom'
  | 'env_stylized_rocks'
  | 'env_palm_tree'
  | 'env_dry_tree'
  | 'env_dry_grass'
  | 'sakura_statue'
  | 'sakura_cherry_trees'
  | 'sakura_chinese_architecture'
  | 'sakura_fantasy_architecture'
  | 'sakura_chinese_hall'
  | 'sakura_japanese_temple'
  | 'sakura_lamp_pagoda'
  | 'sakura_drum';

interface EnvModelSpec {
  id: EnvModelId;
  file: string;
  targetHeight: number;
  variant?:
    | 'alpine_rock'
    | 'alpine_tree'
    | 'canyon_rock'
    | 'cactus'
    | 'night_city'
    | 'light_post'
    | 'gantry'
    | 'racing_prop'
    | 'barrier_white'
    | 'default';
}

const ENV_MODEL_SPECS: EnvModelSpec[] = [
  { id: 'race_drag_start_and_finish_line', file: '/models/env/race_drag_start_and_finish_line.glb', targetHeight: 11.5, variant: 'gantry' },
  { id: 'grandstand_covered', file: '/models/env/grandstand_covered.glb', targetHeight: 10.5, variant: 'racing_prop' },
  { id: 'pits_garage', file: '/models/env/pits_garage.glb', targetHeight: 7.2, variant: 'racing_prop' },
  { id: 'pits_office', file: '/models/env/pits_office.glb', targetHeight: 10.5, variant: 'racing_prop' },
  { id: 'banner_tower', file: '/models/env/banner_tower.glb', targetHeight: 12.0, variant: 'racing_prop' },
  { id: 'billboard', file: '/models/env/billboard.glb', targetHeight: 7.5, variant: 'racing_prop' },
  { id: 'flag_checkers', file: '/models/env/flag_checkers.glb', targetHeight: 6.5, variant: 'racing_prop' },
  { id: 'light_post', file: '/models/env/light_post.glb', targetHeight: 12.0, variant: 'light_post' },
  { id: 'tent', file: '/models/env/tent.glb', targetHeight: 4.8, variant: 'racing_prop' },
  { id: 'barrier_red', file: '/models/env/barrier_red.glb', targetHeight: 1.1, variant: 'racing_prop' },
  { id: 'barrier_white', file: '/models/env/barrier_white.glb', targetHeight: 1.1, variant: 'barrier_white' },
  { id: 'pylon', file: '/models/env/pylon.glb', targetHeight: 0.95, variant: 'racing_prop' },
  { id: 'pine_tall_a', file: '/models/env/pine_tall_a.glb', targetHeight: 14.0, variant: 'alpine_tree' },
  { id: 'pine_tall_b', file: '/models/env/pine_tall_b.glb', targetHeight: 16.0, variant: 'alpine_tree' },
  { id: 'pine_round', file: '/models/env/pine_round.glb', targetHeight: 11.5, variant: 'alpine_tree' },
  { id: 'rock_large', file: '/models/env/rock_large.glb', targetHeight: 2.8, variant: 'alpine_rock' },
  { id: 'canyon_tall', file: '/models/env/canyon_tall.glb', targetHeight: 18.0, variant: 'canyon_rock' },
  { id: 'canyon_rock', file: '/models/env/canyon_rock.glb', targetHeight: 7.0, variant: 'canyon_rock' },
  { id: 'canyon_cliff', file: '/models/env/canyon_cliff.glb', targetHeight: 15.0, variant: 'canyon_rock' },
  { id: 'cactus_tall', file: '/models/env/cactus_tall.glb', targetHeight: 4.8, variant: 'cactus' },
  { id: 'cactus_short', file: '/models/env/cactus_short.glb', targetHeight: 3.2, variant: 'cactus' },
  { id: 'skyscraper_a', file: '/models/env/skyscraper_a.glb', targetHeight: 34.0, variant: 'night_city' },
  { id: 'skyscraper_b', file: '/models/env/skyscraper_b.glb', targetHeight: 48.0, variant: 'night_city' },
  { id: 'skyscraper_c', file: '/models/env/skyscraper_c.glb', targetHeight: 42.0, variant: 'night_city' },
  { id: 'building_a', file: '/models/env/building_a.glb', targetHeight: 19.0, variant: 'night_city' },
  { id: 'env_spruce_trees', file: '/models/env/trees/spruce_trees.glb', targetHeight: 12, variant: 'alpine_tree',},
  { id: 'env_lowpoly_tree', file: '/models/env/trees/tree_low_poly_lowpoly.glb', targetHeight: 9, variant: 'alpine_tree',},
  { id: 'env_cherry_blossom', file: '/models/env/trees/cherry_blossom_trees.glb', targetHeight: 10, variant: 'default',},
  { id: 'env_stylized_rocks', file: '/models/env/rocks/stylized_rocks.glb', targetHeight: 4, variant: 'alpine_rock',},
  { id: 'env_palm_tree', file: '/models/env/trees/palm_tree_tall.glb', targetHeight: 11, variant: 'default',},
  { id: 'env_dry_tree', file: '/models/env/trees/dry_tree_vurvur_house_5.glb', targetHeight: 8, variant: 'default',},
  { id: 'env_dry_grass', file: '/models/env/trees/dry_realistic_grass_lods_1.glb', targetHeight: 2, variant: 'default',},

  // Sakura Pass assets: exact folder/file names from the supplied asset browser.
  { id: 'sakura_statue', file: '/models/env/sakura%20pass/2ff77d68adf6448a936fa1b1575133cb.glb', targetHeight: 3.2, variant: 'default' },
  { id: 'sakura_cherry_trees', file: '/models/env/sakura%20pass/cherry_blossom_trees.glb', targetHeight: 12.0, variant: 'default' },
  { id: 'sakura_chinese_architecture', file: '/models/env/sakura%20pass/chinese_architecture.glb', targetHeight: 11.0, variant: 'racing_prop' },
  { id: 'sakura_fantasy_architecture', file: '/models/env/sakura%20pass/chinese_fantasy_03_-_revisited.glb', targetHeight: 18.0, variant: 'racing_prop' },
  { id: 'sakura_chinese_hall', file: '/models/env/sakura%20pass/chinese_hall.glb', targetHeight: 15.0, variant: 'racing_prop' },
  { id: 'sakura_japanese_temple', file: '/models/env/sakura%20pass/japanese_lowpoly_temple.glb', targetHeight: 18.0, variant: 'racing_prop' },
  { id: 'sakura_lamp_pagoda', file: '/models/env/sakura%20pass/japanese_wooden_lamp_pagoda.glb', targetHeight: 6.5, variant: 'racing_prop' },
  { id: 'sakura_drum', file: '/models/env/sakura%20pass/maybe_ip_drum.glb', targetHeight: 5.0, variant: 'racing_prop' },
];

export interface EnvMeshPart {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  localMatrix: THREE.Matrix4;
}

export interface NormalizedEnvAsset {
  id: EnvModelId;
  group: THREE.Group;
  parts: EnvMeshPart[];
  size: THREE.Vector3;
}

const TEX_URLS = {
  alpineTerrain: '/src/assets/images/tex_terrain_ground_1795081123641.jpg',
  sunsetTerrain: '/src/assets/images/tex_desert_canyon_1795336527588.jpg',
  midnightTerrain: '/src/assets/images/tex_marina_paddock_1795336527488.jpg',
  coastalTerrain: '/src/assets/images/tex_coastal_cliffs_1795339852571.jpg',
  sakuraTerrain: '/src/assets/images/tex_sakura_pass_1795339853478.jpg',
  asphalt: '/src/assets/images/tex_asphalt_road_1795336563322.jpg',
  concrete: '/src/assets/images/tex_concrete_barrier_1795081122985.jpg',
} as const;

const textureLoader = new THREE.TextureLoader();
const cachedTextures = new Map<string, THREE.Texture>();
const envAssetCache = new Map<EnvModelId, NormalizedEnvAsset>();
let envPreloadPromise: Promise<void> | null = null;
let envLoader: GLTFLoader | null = null;

function getEnvGltfLoader(): GLTFLoader {
  if (!envLoader) {
    const loader = new GLTFLoader();
    loader.setResourcePath('/models/env/');
    loader.setMeshoptDecoder(MeshoptDecoder);
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(draco);
    envLoader = loader;
  }
  return envLoader;
}

function configureTexture(
  tex: THREE.Texture,
  repeatX: number,
  repeatY: number,
  isColor = true,
): THREE.Texture {
  if (isColor) {
    tex.colorSpace = THREE.SRGBColorSpace;
  }
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  if (tex.image) {
    tex.needsUpdate = true;
  }
  return tex;
}

async function loadTextureCached(
  key: string,
  url: string,
  repeatX: number,
  repeatY: number,
): Promise<THREE.Texture | null> {
  const existing = cachedTextures.get(key);
  if (existing) {
    configureTexture(existing, repeatX, repeatY, true);
    return existing;
  }
  try {
    const tex = await textureLoader.loadAsync(url);
    configureTexture(tex, repeatX, repeatY, true);
    cachedTextures.set(key, tex);
    return tex;
  } catch (err) {
    console.warn(`Failed to load environment texture ${url}:`, err);
    return null;
  }
}

function getOrStartSyncTexture(
  key: string,
  url: string,
  repeatX: number,
  repeatY: number,
  maxAnisotropy: number,
): THREE.Texture {
  let tex = cachedTextures.get(key);
  if (!tex) {
    tex = textureLoader.load(url, (loaded) => {
      loaded.needsUpdate = true;
    });
    configureTexture(tex, repeatX, repeatY, true);
    cachedTextures.set(key, tex);
  }
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function getBiomeTerrainTexture(theme: TrackTheme, maxAnisotropy: number): THREE.Texture {
  if (theme === 'sunset') {
    return getOrStartSyncTexture('sunsetTerrain', TEX_URLS.sunsetTerrain, 105, 105, maxAnisotropy);
  }
  if (theme === 'midnight') {
    return getOrStartSyncTexture('midnightTerrain', TEX_URLS.midnightTerrain, 115, 115, maxAnisotropy);
  }
  if (theme === 'coastal') {
    return getOrStartSyncTexture('coastalTerrain', TEX_URLS.coastalTerrain, 105, 105, maxAnisotropy);
  }
  if (theme === 'sakura') {
    return getOrStartSyncTexture('sakuraTerrain', TEX_URLS.sakuraTerrain, 100, 100, maxAnisotropy);
  }
  return getOrStartSyncTexture('alpineTerrain', TEX_URLS.alpineTerrain, 100, 100, maxAnisotropy);
}

export function getAsphaltRoadTexture(maxAnisotropy: number): THREE.Texture {
  return getOrStartSyncTexture('asphalt', TEX_URLS.asphalt, 2, 1, maxAnisotropy);
}

export function getConcreteBarrierTexture(maxAnisotropy: number): THREE.Texture {
  return getOrStartSyncTexture('concrete', TEX_URLS.concrete, 2, 1, maxAnisotropy);
}

export function getGaragePaddockTexture(maxAnisotropy: number): THREE.Texture {
  return getOrStartSyncTexture('garageFloor', TEX_URLS.midnightTerrain, 12, 12, maxAnisotropy);
}

function upgradeMaterialForPbr(
  origMat: THREE.Material,
  variant: EnvModelSpec['variant'],
): THREE.Material {
  const name = (origMat.name || '').toLowerCase();
  const baseColor =
    'color' in origMat && origMat.color instanceof THREE.Color
      ? origMat.color.clone()
      : new THREE.Color(0xffffff);
  const map = 'map' in origMat && origMat.map ? (origMat.map as THREE.Texture) : null;
  if (map) {
    map.colorSpace = THREE.SRGBColorSpace;
  }

  let roughness = 0.78;
  let metalness = 0.08;
  let emissiveHex = 0x000000;
  let emissiveIntensity = 0;
  let envMapIntensity = 0.55;

  // Natural PBR palettes so foliage, rocks, and racing structures look grounded instead of pastel
  if (variant === 'alpine_tree') {
    envMapIntensity = 0.14;
    if (name.includes('leaf')) {
      baseColor.setHex(0x215231);
      roughness = 0.92;
      metalness = 0.0;
    } else if (name.includes('bark')) {
      baseColor.setHex(0x4a3222);
      roughness = 0.95;
      metalness = 0.0;
    }
  } else if (variant === 'alpine_rock') {
    envMapIntensity = 0.18;
    if (name.includes('grass')) {
      baseColor.setHex(0x3f6137);
      roughness = 0.92;
      metalness = 0.02;
    } else {
      baseColor.setHex(0x636c7a);
      roughness = 0.88;
      metalness = 0.04;
    }
  } else if (variant === 'canyon_rock') {
    envMapIntensity = 0.16;
    if (name.includes('grass')) baseColor.setHex(0xb3643b);
    else if (name.includes('dirt')) baseColor.setHex(0x94482a);
    else baseColor.setHex(0x6e3622);
    roughness = 0.92;
    metalness = 0.02;
  } else if (variant === 'cactus') {
    envMapIntensity = 0.18;
    baseColor.setHex(0x3a6e35);
    roughness = 0.84;
    metalness = 0.02;
  } else if (variant === 'gantry') {
    if (name.includes('grey') || name.includes('default')) {
      baseColor.setHex(0x2d3748);
      roughness = 0.36;
      metalness = 0.72;
      envMapIntensity = 0.85;
    } else if (name.includes('road')) {
      baseColor.setHex(0x161c26);
      roughness = 0.55;
      metalness = 0.4;
    } else if (name.includes('red')) {
      baseColor.setHex(0xef4444);
      emissiveHex = 0xff2e1f;
      emissiveIntensity = 1.5;
      roughness = 0.25;
    }
  } else if (variant === 'light_post') {
    if (name.includes('grey')) {
      baseColor.setHex(0x334155);
      roughness = 0.38;
      metalness = 0.68;
    } else if (name.includes('default')) {
      baseColor.setHex(0x64748b);
      roughness = 0.45;
      metalness = 0.55;
    } else if (name.includes('pylon')) {
      baseColor.setHex(0xfffbeb);
      emissiveHex = 0xfff3cf;
      emissiveIntensity = 2.1;
      roughness = 0.18;
    }
  } else if (variant === 'racing_prop' || variant === 'barrier_white') {
    if (name.includes('glass')) {
      baseColor.setHex(0x1e293b);
      roughness = 0.12;
      metalness = 0.85;
      envMapIntensity = 1.0;
    } else if (name.includes('red')) {
      baseColor.setHex(0xd62828);
      roughness = 0.48;
      metalness = 0.14;
    } else if (name.includes('pylon')) {
      baseColor.setHex(0xf97316);
      roughness = 0.42;
      metalness = 0.08;
    } else if (name.includes('grey')) {
      baseColor.setHex(variant === 'barrier_white' ? 0xe2e8f0 : 0x64748b);
      roughness = 0.52;
      metalness = variant === 'barrier_white' ? 0.12 : 0.35;
    } else if (name.includes('default')) {
      baseColor.setHex(0xcbd5e1);
      roughness = 0.62;
      metalness = 0.18;
    } else if (name.includes('road')) {
      baseColor.setHex(0x272e3a);
      roughness = 0.72;
      metalness = 0.15;
    }
  } else if (variant === 'night_city') {
    roughness = 0.48;
    metalness = 0.32;
    envMapIntensity = 0.85;
    if (map) {
      baseColor.setHex(0xcbd5e1);
      emissiveHex = 0x5ec2f5;
      emissiveIntensity = 0.2;
    }
  }

  const std = new THREE.MeshStandardMaterial({
    name: origMat.name,
    color: map && variant !== 'night_city' ? 0xffffff : baseColor,
    map: map ?? null,
    roughness,
    metalness,
    emissive: emissiveHex,
    emissiveIntensity,
    emissiveMap: variant === 'night_city' && map ? map : null,
    envMapIntensity,
  });
  std.userData.sharedEnvMat = true;
  return std;
}

function normalizeEnvModel(
  spec: EnvModelSpec,
  sceneRoot: THREE.Group,
): NormalizedEnvAsset {
  const wrapper = new THREE.Group();
  const inner = sceneRoot;

  if (spec.id === 'race_drag_start_and_finish_line') {
  inner.rotation.y = Math.PI / 2;
}

  inner.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      if (Array.isArray(m.material)) {
        m.material = m.material.map((mat) => upgradeMaterialForPbr(mat, spec.variant));
      } else if (m.material) {
        m.material = upgradeMaterialForPbr(m.material, spec.variant);
      }
      m.castShadow = true;
      m.receiveShadow = true;
    }
  });

  inner.updateMatrixWorld(true);
  const rawBox = new THREE.Box3().setFromObject(inner);
  const rawSize = new THREE.Vector3();
  rawBox.getSize(rawSize);

  const scale = spec.targetHeight / Math.max(rawSize.y, 0.01);
  inner.scale.setScalar(scale);
  inner.updateMatrixWorld(true);

  const scaledBox = new THREE.Box3().setFromObject(inner);
  const center = new THREE.Vector3();
  scaledBox.getCenter(center);

  // Center X/Z at 0 and sit bottom flush at Y = 0
  inner.position.x -= center.x;
  inner.position.z -= center.z;
  inner.position.y -= scaledBox.min.y;

  wrapper.add(inner);
  wrapper.updateMatrixWorld(true);

  const finalBox = new THREE.Box3().setFromObject(wrapper);
  const finalSize = new THREE.Vector3();
  finalBox.getSize(finalSize);

  // Extract geometry + material + localMatrix relative to wrapper for InstancedMesh rendering
  const parts: EnvMeshPart[] = [];
  wrapper.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      if (!m.geometry.attributes.normal) {
        m.geometry.computeVertexNormals();
      }
      if (Array.isArray(m.material)) {
        const groups = m.geometry.groups;
        if (groups && groups.length > 0) {
          // Keep full multi-material mesh via clone when instantiated individually;
          // for InstancedMesh, create one part per geometry group if multi-material
          for (let gIdx = 0; gIdx < groups.length; gIdx++) {
            const grp = groups[gIdx];
            const mat = m.material[grp.materialIndex ?? 0];
            if (!mat) continue;
            const subGeo = m.geometry.clone();
            subGeo.clearGroups();
            subGeo.addGroup(grp.start, grp.count, 0);
            subGeo.setDrawRange(grp.start, grp.count);
            parts.push({
              geometry: subGeo,
              material: mat,
              localMatrix: m.matrixWorld.clone(),
            });
          }
        } else if (m.material[0]) {
          parts.push({
            geometry: m.geometry,
            material: m.material[0],
            localMatrix: m.matrixWorld.clone(),
          });
        }
      } else if (m.material) {
        parts.push({
          geometry: m.geometry,
          material: m.material,
          localMatrix: m.matrixWorld.clone(),
        });
      }
    }
  });

  return {
    id: spec.id,
    group: wrapper,
    parts,
    size: finalSize,
  };
}

export async function preloadEnvironmentAssets(onStep?: () => void): Promise<void> {
  if (envPreloadPromise) return envPreloadPromise;

  const loader = getEnvGltfLoader();

  envPreloadPromise = (async () => {
    const texTasks: Array<Promise<unknown>> = [
      loadTextureCached('alpineTerrain', TEX_URLS.alpineTerrain, 100, 105).then(() => onStep?.()),
      loadTextureCached('sunsetTerrain', TEX_URLS.sunsetTerrain, 105, 105).then(() => onStep?.()),
      loadTextureCached('midnightTerrain', TEX_URLS.midnightTerrain, 115, 115).then(() => onStep?.()),
      loadTextureCached('coastalTerrain', TEX_URLS.coastalTerrain, 105, 105).then(() => onStep?.()),
      loadTextureCached('sakuraTerrain', TEX_URLS.sakuraTerrain, 100, 100).then(() => onStep?.()),
      loadTextureCached('garageFloor', TEX_URLS.midnightTerrain, 12, 12).then(() => onStep?.()),
      loadTextureCached('asphalt', TEX_URLS.asphalt, 2, 1).then(() => onStep?.()),
      loadTextureCached('concrete', TEX_URLS.concrete, 2, 1).then(() => onStep?.()),
    ];

    const glbTasks = ENV_MODEL_SPECS.map(async (spec) => {
      if (envAssetCache.has(spec.id)) {
        onStep?.();
        return;
      }
      try {
        const res = await fetch(spec.file, { credentials: 'same-origin' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
          loader.parse(buffer, '/models/env/', (parsed) => resolve(parsed), reject);
        });
        const normalized = normalizeEnvModel(spec, gltf.scene);
        envAssetCache.set(spec.id, normalized);
      } catch (err) {
        console.warn(`Failed to preload env GLB ${spec.file}:`, err);
      } finally {
        onStep?.();
      }
    });

    await Promise.all([...texTasks, ...glbTasks]);
  })();

  return envPreloadPromise;
}

export const TOTAL_ENV_PRELOAD_STEPS = 8 + ENV_MODEL_SPECS.length;

export function getEnvAsset(id: EnvModelId): NormalizedEnvAsset | null {
  return envAssetCache.get(id) ?? null;
}

export function cloneEnvAssetGroup(id: EnvModelId): THREE.Group | null {
  const asset = envAssetCache.get(id);
  if (!asset) return null;
  const clone = asset.group.clone(true);
  clone.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      m.userData.sharedEnvGeo = true;
    }
  });
  return clone;
}

export function warmUpEnvTextures(renderer: THREE.WebGLRenderer): void {
  for (const tex of cachedTextures.values()) {
    if (!tex.userData._gpuInited) {
      tex.userData._gpuInited = true;
      renderer.initTexture(tex);
    }
  }
  for (const asset of envAssetCache.values()) {
    asset.group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        const mats = Array.isArray(m.material) ? m.material : [m.material];
        for (const mat of mats) {
          const std = mat as THREE.MeshStandardMaterial;
          if (std.map && !std.map.userData._gpuInited) {
            std.map.userData._gpuInited = true;
            renderer.initTexture(std.map);
          }
        }
      }
    });
  }
}
