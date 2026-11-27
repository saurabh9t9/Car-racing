import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CAR_MODELS, DEFAULT_MODEL_ID, getCarModelSpec } from '../shared/carCatalog';
import { isValidGlbBuffer } from '../shared/glbValidation';
import type { TrackTheme } from '../shared/types';
import { getEnvironmentPreloadStepCount, preloadEnvironmentAssets } from './envAssets';
import {
  isBackgroundStreamingPaused,
  isBackgroundStreamingThrottled,
  recordGlbDownload,
  recordGlbLoaded,
  reportBackgroundFrameMs,
  setBackgroundStreamingPaused,
} from './performanceStats';
export {
  isBackgroundStreamingPaused,
  isBackgroundStreamingThrottled,
  reportBackgroundFrameMs,
  setBackgroundStreamingPaused,
};

export type CustomAssetSlot = 'car' | 'env';

export interface StartupLoadProgress {
  percent: number;
}

export type NetworkTier = 'fast' | 'medium' | 'slow';

export interface NetworkProfile {
  tier: NetworkTier;
  saveData: boolean;
  measuredMbps: number | null;
}

interface NetworkInfoLike {
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
}

interface StoredAssetRecord {
  slot: CustomAssetSlot;
  fileName: string;
  buffer: ArrayBuffer;
  updatedAt: number;
}

const DB_NAME = 'slipstream_custom_models_v1';
const DB_VERSION = 6;
const STORE_NAME = 'assets';
const FLEET_STORE_NAME = 'fleet_models';
const MODEL_CACHE_NAME = 'turbo-drifter-models-v7';
const LEGACY_CACHE_NAMES = [
  'turbo-drifter-models-v1',
  'turbo-drifter-models-v2',
  'turbo-drifter-models-v3',
  'turbo-drifter-models-v4',
  'turbo-drifter-models-v5',
  'turbo-drifter-models-v6',
];

let legacyCachesPurged = false;
function purgeLegacyModelCaches(): void {
  if (legacyCachesPurged || typeof caches === 'undefined') return;
  legacyCachesPurged = true;
  for (const name of LEGACY_CACHE_NAMES) {
    void caches.delete(name).catch(() => {
      // ignore
    });
  }
}

let persistentStorageRequested = false;
function ensurePersistentStorage(): void {
  if (persistentStorageRequested) return;
  persistentStorageRequested = true;
  try {
    const storage = typeof navigator !== 'undefined' ? navigator.storage : undefined;
    if (storage && typeof storage.persist === 'function') {
      void storage.persist().catch(() => {
        // ignore if browser denies or doesn't support persist()
      });
    }
  } catch {
    // ignore
  }
}

let cachedCarProto: THREE.Group | null = null;
let cachedCarName: string | null = null;
let cachedEnvProto: THREE.Group | null = null;
let cachedEnvName: string | null = null;

// Cache for the built-in 15 race car .glb models keyed by modelId
const modelProtoCache = new Map<string, THREE.Group>();
const pendingModelLoads = new Map<string, Promise<THREE.Group | null>>();
const pendingProgressListeners = new Map<string, Set<(ratio: number) => void>>();

let sharedLoader: GLTFLoader | null = null;
let measuredNetworkMbps: number | null = null;

function getNavigatorConnection(): NetworkInfoLike | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { connection?: NetworkInfoLike }).connection;
}

function recordThroughputSample(bytes: number, elapsedMs: number): void {
  if (bytes < 40_000 || elapsedMs < 12) return;
  const mbps = (bytes * 8) / (elapsedMs * 1000);
  if (!Number.isFinite(mbps) || mbps <= 0) return;
  measuredNetworkMbps =
    measuredNetworkMbps === null ? mbps : measuredNetworkMbps * 0.4 + mbps * 0.6;
}

export function getNetworkProfile(): NetworkProfile {
  const conn = getNavigatorConnection();
  const saveData = Boolean(conn?.saveData);
  const eff = conn?.effectiveType;
  const downlink = typeof conn?.downlink === 'number' ? conn.downlink : null;

  if (saveData || eff === 'slow-2g' || eff === '2g' || eff === '3g') {
    return { tier: 'slow', saveData, measuredMbps: measuredNetworkMbps ?? downlink };
  }

  const effectiveMbps = measuredNetworkMbps ?? downlink;
  if (effectiveMbps !== null) {
    if (effectiveMbps < 2.5) return { tier: 'slow', saveData, measuredMbps: effectiveMbps };
    if (effectiveMbps < 6.5) return { tier: 'medium', saveData, measuredMbps: effectiveMbps };
    return { tier: 'fast', saveData, measuredMbps: effectiveMbps };
  }

  return { tier: 'medium', saveData, measuredMbps: null };
}

function getSharedLoader(): GLTFLoader {
  if (!sharedLoader) {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(draco);
    sharedLoader = loader;
  }
  return sharedLoader;
}

async function deleteFleetModelFromIdb(url: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(FLEET_STORE_NAME, 'readwrite');
      tx.objectStore(FLEET_STORE_NAME).delete(url);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

async function readFleetModelFromIdb(url: string): Promise<ArrayBuffer | null> {
  try {
    const db = await openDb();
    const buf = await new Promise<ArrayBuffer | null>((resolve) => {
      const tx = db.transaction(FLEET_STORE_NAME, 'readonly');
      const req = tx.objectStore(FLEET_STORE_NAME).get(url);
      req.onsuccess = () => {
        const record = req.result as { url: string; buffer?: ArrayBuffer } | undefined;
        resolve(record?.buffer instanceof ArrayBuffer ? record.buffer : null);
      };
      req.onerror = () => resolve(null);
    });
    if (buf && !isValidGlbBuffer(buf)) {
      await deleteFleetModelFromIdb(url);
      return null;
    }
    return buf;
  } catch {
    return null;
  }
}

function saveFleetModelToIdb(url: string, buffer: ArrayBuffer): Promise<void> {
  if (!isValidGlbBuffer(buffer)) return Promise.resolve();
  ensurePersistentStorage();
  return openDb()
    .then(
      (db) =>
        new Promise<void>((resolve, reject) => {
          const tx = db.transaction(FLEET_STORE_NAME, 'readwrite');
          tx.objectStore(FLEET_STORE_NAME).put({
            url,
            buffer: buffer.slice(0),
            savedAt: Date.now(),
          });
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        }),
    )
    .catch(() => {
      // ignore IndexedDB write errors (e.g., private browsing)
    });
}

function saveFleetModelToCacheStorage(url: string, buffer: ArrayBuffer): Promise<void> {
  if (!isValidGlbBuffer(buffer) || typeof caches === 'undefined') return Promise.resolve();
  return caches
    .open(MODEL_CACHE_NAME)
    .then((cache) =>
      cache.put(
        url,
        new Response(buffer.slice(0), {
          headers: {
            'Content-Type': 'model/gltf-binary',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }),
      ),
    )
    .catch(() => {
      // ignore quota errors
    });
}

async function streamGlbResponse(
  url: string,
  cacheMode: RequestCache,
  onProgress: (ratio: number) => void,
): Promise<ArrayBuffer> {
  const t0 = performance.now();
  const res = await fetch(url, { cache: cacheMode, credentials: 'same-origin' });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} fetching ${url}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html') || contentType.includes('application/xhtml')) {
    throw new Error(`Unexpected HTML response (${contentType}) fetching ${url}`);
  }

  const headerLen = Number(res.headers.get('content-length') || '0');
  const expectedBytes = headerLen > 0 ? headerLen : 1_350_000;
  let buffer: ArrayBuffer;

  if (res.body && typeof res.body.getReader === 'function') {
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.byteLength;
        onProgress(Math.min(0.92, (received / Math.max(expectedBytes, received)) * 0.92));
      }
    }

    const merged = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.byteLength;
    }
    buffer = merged.buffer;
  } else {
    buffer = await res.arrayBuffer();
  }

  if (!isValidGlbBuffer(buffer)) {
    throw new Error(`Invalid binary GLB header received from ${url}`);
  }

  const elapsedMs = performance.now() - t0;
  recordThroughputSample(buffer.byteLength, elapsedMs);
  recordGlbDownload(url, buffer.byteLength, elapsedMs);
  return buffer;
}

async function fetchModelBufferWithCache(
  url: string,
  onProgress: (ratio: number) => void,
): Promise<ArrayBuffer> {
  ensurePersistentStorage();
  purgeLegacyModelCaches();
  const optimizedUrl = url.replace(/^\/models\//, '/optimized-models/');
  const cacheKey = optimizedUrl;

  // 1. Try permanent IndexedDB storage first (works across all origins & survives cache eviction)
  const idbBuffer = await readFleetModelFromIdb(cacheKey);
  if (idbBuffer) {
    recordGlbLoaded(cacheKey);
    onProgress(0.95);
    return idbBuffer;
  }

  // 2. Try persistent Cache Storage second (0ms network on repeat visits)
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(MODEL_CACHE_NAME);
      const cached = await cache.match(cacheKey);
      if (cached) {
        onProgress(0.85);
        const buf = await cached.arrayBuffer();
        if (isValidGlbBuffer(buf)) {
          recordGlbLoaded(cacheKey);
          onProgress(0.95);
          void saveFleetModelToIdb(cacheKey, buf);
          return buf;
        }
        await cache.delete(cacheKey);
      }
    } catch {
      // Cache Storage blocked (e.g., strict private mode); proceed with network
    }
  }

  // 3. Stream over HTTP; if browser HTTP cache returns stale HTML/non-GLB, retry with cache: 'reload'
  let buffer: ArrayBuffer | null = null;
  let lastError: unknown = null;
  const candidates = optimizedUrl === url ? [url] : [optimizedUrl, url];
  const cacheModes: RequestCache[] = ['default', 'reload', 'reload'];

  for (const candidate of candidates) {
    for (let attempt = 0; attempt < cacheModes.length; attempt++) {
      if (attempt > 0) {
        await new Promise((r) => window.setTimeout(r, attempt * 350));
      }
      try {
        buffer = await streamGlbResponse(candidate, cacheModes[attempt], onProgress);
        break;
      } catch (err) {
        lastError = err;
        // Never retry 404 Not Found; immediately fall back to the next candidate URL
        if ((err as { status?: number })?.status === 404) {
          break;
        }
      }
    }
    if (buffer) break;
  }

  if (!buffer) {
    throw lastError instanceof Error ? lastError : new Error(`Failed to fetch valid GLB from ${url}`);
  }

  onProgress(0.95);

  // Persist permanently in both IndexedDB and Cache Storage before completing
  await Promise.all([
    saveFleetModelToIdb(cacheKey, buffer),
    saveFleetModelToCacheStorage(cacheKey, buffer),
  ]);

  return buffer;
}

let openDbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (openDbPromise) return openDbPromise;
  openDbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (event) => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'slot' });
      }
      if (!db.objectStoreNames.contains(FLEET_STORE_NAME)) {
        db.createObjectStore(FLEET_STORE_NAME, { keyPath: 'url' });
      } else if (event.oldVersion < 6) {
        const store = req.transaction?.objectStore(FLEET_STORE_NAME);
        store?.clear();
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => {
        db.close();
        openDbPromise = null;
      };
      db.onclose = () => {
        openDbPromise = null;
      };
      resolve(db);
    };
    req.onerror = () => {
      openDbPromise = null;
      reject(req.error ?? new Error('Failed to open IndexedDB'));
    };
  });
  return openDbPromise;
}

const _boundCorner = new THREE.Vector3();

function computeExactMeshWorldBounds(mesh: THREE.Mesh, out: THREE.Box3): void {
  out.makeEmpty();
  const geo = mesh.geometry;
  if (!geo) return;
  if (!geo.boundingBox) geo.computeBoundingBox();
  const bb = geo.boundingBox;
  if (!bb || bb.isEmpty()) return;
  const min = bb.min;
  const max = bb.max;
  for (let ix = 0; ix < 2; ix++) {
    const x = ix === 0 ? min.x : max.x;
    for (let iy = 0; iy < 2; iy++) {
      const y = iy === 0 ? min.y : max.y;
      for (let iz = 0; iz < 2; iz++) {
        const z = iz === 0 ? min.z : max.z;
        _boundCorner.set(x, y, z).applyMatrix4(mesh.matrixWorld);
        out.expandByPoint(_boundCorner);
      }
    }
  }
}

function stripFloorPlanesAndTuneMaterials(model: THREE.Object3D, isSoftwareGl: boolean): void {
  model.updateMatrixWorld(true);
  const meshBox = new THREE.Box3();
  const meshSize = new THREE.Vector3();
  const toStrip: THREE.Mesh[] = [];

  model.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
      const matNames = mats.map((mat) => mat?.name ?? '').join(' ');

      // Strip oversized diorama rings/backdrops/shadow planes embedded in Sketchfab exports
      if (
        /^(bkgr|floor|flogo|carshadow|ground|backdrop)/i.test(matNames.trim()) ||
        /\b(bkgr|floor|flogo1|flogo2|carshadow|shadow_plane|ground_plane)\b/i.test(
          `${m.name} ${matNames}`,
        )
      ) {
        m.visible = false;
        m.userData.strippedFloor = true;
        toStrip.push(m);
        return;
      }

      if (m.geometry) {
        computeExactMeshWorldBounds(m, meshBox);
        if (!meshBox.isEmpty()) {
          meshBox.getSize(meshSize);
          const maxHorizontal = Math.max(meshSize.x, meshSize.z);
          if (
            maxHorizontal > 6.2 ||
            (meshSize.y < 0.14 && maxHorizontal > 5.2) ||
            (/shadow|ground|floor|backdrop/i.test(`${m.name} ${matNames}`) &&
              meshSize.y < 0.25 &&
              maxHorizontal > 4.2)
          ) {
            m.visible = false;
            m.userData.strippedFloor = true;
            toStrip.push(m);
            return;
          }
        }
      }

      const scaledRadius = meshBox.isEmpty()
        ? 1.0
        : meshSize.length() * 0.5;
      m.userData.rawBoundRadius = scaledRadius;
      m.castShadow = !isSoftwareGl && scaledRadius >= 0.25;
      m.receiveShadow = true;

      for (const mat of mats) {
        if (!mat) continue;
        mat.userData.sharedCustomMat = true;
        const std = mat as THREE.MeshPhysicalMaterial;
        if ('envMapIntensity' in std) {
          std.envMapIntensity = 1.05;
        }
        // Disable expensive extra transmission scene render pass on racing cars everywhere
        if ('transmission' in std && std.transmission > 0) {
          std.transmission = 0;
          std.transparent = true;
          std.opacity = Math.min(std.opacity ?? 1, 0.42);
        }
      }
    }
  });

  for (const m of toStrip) {
    m.removeFromParent();
    m.geometry?.dispose();
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    for (const mat of mats) mat?.dispose();
  }
}

function computeVisibleBounds(root: THREE.Object3D): THREE.Box3 {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3();
  const tempBox = new THREE.Box3();
  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh && obj.visible) {
      const m = obj as THREE.Mesh;
      if (m.geometry) {
        computeExactMeshWorldBounds(m, tempBox);
        if (!tempBox.isEmpty()) {
          box.union(tempBox);
        }
      }
    }
  });
  return box;
}

function normalizeModelGroup(
  sceneRoot: THREE.Object3D,
  targetLength: number,
  maxWidth: number,
  yawOffset = 0,
  isSoftwareGl = false,
): THREE.Group {
  const wrapper = new THREE.Group();
  const model = sceneRoot;

  stripFloorPlanesAndTuneMaterials(model, isSoftwareGl);

  if (yawOffset !== 0) {
    model.rotation.y += yawOffset;
  }

  let box = computeVisibleBounds(model);
  if (box.isEmpty()) {
    box = new THREE.Box3().setFromObject(model);
  }
  const size = new THREE.Vector3();
  box.getSize(size);

  // If car was exported along X rather than Z, rotate 90 degrees so longest horizontal axis aligns with Z
  if (size.x > size.z * 1.25) {
    model.rotation.y += Math.PI * 0.5;
    box = computeVisibleBounds(model);
    box.getSize(size);
  }

  const longestZ = Math.max(size.z, 0.001);
  const longestX = Math.max(size.x, 0.001);
  const scale = Math.min(targetLength / longestZ, maxWidth / longestX);

  model.scale.multiplyScalar(scale);

  let scaledBox = computeVisibleBounds(model);
  if (scaledBox.isEmpty()) {
    scaledBox = new THREE.Box3().setFromObject(model);
  }
  const scaledCenter = new THREE.Vector3();
  scaledBox.getCenter(scaledCenter);

  model.position.x -= scaledCenter.x;
  model.position.z -= scaledCenter.z;
  model.position.y -= scaledBox.min.y;

  model.updateMatrixWorld(true);
  model.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      const rawR = typeof m.userData.rawBoundRadius === 'number' ? m.userData.rawBoundRadius : 1.0;
      m.userData.boundRadius = rawR * scale;
      if (!isSoftwareGl) {
        m.castShadow = m.userData.boundRadius >= 0.22;
      }
    }
  });

  wrapper.add(model);
  batchCarStaticMeshes(wrapper, isSoftwareGl);
  return wrapper;
}

function toFloat32Attr(attr: THREE.BufferAttribute | THREE.InterleavedBufferAttribute): THREE.BufferAttribute {
  const count = attr.count;
  const itemSize = attr.itemSize;
  const out = new Float32Array(count * itemSize);
  for (let i = 0; i < count; i++) {
    const base = i * itemSize;
    out[base] = attr.getX(i);
    if (itemSize > 1) out[base + 1] = attr.getY(i);
    if (itemSize > 2) out[base + 2] = attr.getZ(i);
    if (itemSize > 3) out[base + 3] = attr.getW(i);
  }
  return new THREE.BufferAttribute(out, itemSize, false);
}

function normalizeCarGeometryForMerge(
  sourceGeo: THREE.BufferGeometry,
  worldMatrix: THREE.Matrix4,
  includeUv: boolean,
  includeUv1: boolean,
  includeColor: boolean,
): THREE.BufferGeometry | null {
  if (!sourceGeo.attributes?.position || sourceGeo.attributes.position.count === 0) return null;
  const geo = sourceGeo.index ? sourceGeo.toNonIndexed() : sourceGeo.clone();
  geo.applyMatrix4(worldMatrix);
  const posCount = geo.attributes.position.count;
  if (!geo.attributes.normal) {
    geo.computeVertexNormals();
  }
  if (includeUv && !geo.attributes.uv) {
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(posCount * 2), 2));
  }
  if (includeUv1 && !geo.attributes.uv1) {
    geo.setAttribute('uv1', new THREE.BufferAttribute(new Float32Array(posCount * 2), 2));
  }
  if (includeColor && !geo.attributes.color) {
    const white = new Float32Array(posCount * 3);
    white.fill(1);
    geo.setAttribute('color', new THREE.BufferAttribute(white, 3));
  }
  for (const attrName of Object.keys(geo.attributes)) {
    const keep =
      attrName === 'position' ||
      attrName === 'normal' ||
      (includeUv && attrName === 'uv') ||
      (includeUv1 && attrName === 'uv1') ||
      (includeColor && attrName === 'color');
    if (!keep) {
      geo.deleteAttribute(attrName);
      continue;
    }
    const attr = geo.attributes[attrName];
    if (
      !(attr.array instanceof Float32Array) ||
      attr.normalized ||
      (attr as THREE.InterleavedBufferAttribute).isInterleavedBufferAttribute
    ) {
      geo.setAttribute(attrName, toFloat32Attr(attr));
    }
  }
  geo.clearGroups();
  return geo;
}

function batchCarStaticMeshes(wrapper: THREE.Group, isSoftwareGl: boolean): void {
  wrapper.updateMatrixWorld(true);
  const buckets = new Map<
    string,
    { material: THREE.Material; isSmall: boolean; meshes: THREE.Mesh[]; maxRadius: number }
  >();

  wrapper.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh || !obj.visible) return;
    const m = obj as THREE.Mesh;
    if (/wheel|tire|rim|tyre/i.test(m.name)) return;
    if (Array.isArray(m.material) || !m.material) return;
    if (m.geometry?.drawRange && m.geometry.drawRange.count !== Infinity) return;
    const radius = typeof m.userData.boundRadius === 'number' ? m.userData.boundRadius : 1.0;
    const isSmall = radius < 0.28;
    const key = `${m.material.uuid}:${isSmall ? 'S' : 'L'}`;
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { material: m.material, isSmall, meshes: [], maxRadius: radius };
      buckets.set(key, bucket);
    }
    bucket.meshes.push(m);
    if (radius > bucket.maxRadius) bucket.maxRadius = radius;
  });

  for (const bucket of buckets.values()) {
    if (bucket.meshes.length <= 1) continue;
    const mat = bucket.material as THREE.MeshPhysicalMaterial;
    const includeUv = bucket.meshes.some((m) => Boolean(m.geometry.attributes.uv));
    const includeUv1 = Boolean(
      mat.aoMap && bucket.meshes.some((m) => Boolean(m.geometry.attributes.uv1)),
    );
    const includeColor = Boolean(mat.vertexColors);
    const prepared: THREE.BufferGeometry[] = [];
    for (const m of bucket.meshes) {
      const g = normalizeCarGeometryForMerge(
        m.geometry,
        m.matrixWorld,
        includeUv,
        includeUv1,
        includeColor,
      );
      if (g) prepared.push(g);
    }
    if (prepared.length !== bucket.meshes.length) {
      for (const g of prepared) g.dispose();
      continue;
    }
    const merged = mergeGeometries(prepared, false);
    for (const g of prepared) g.dispose();
    if (!merged) continue;

    merged.computeBoundingBox();
    merged.computeBoundingSphere();
    const mergedMesh = new THREE.Mesh(merged, bucket.material);
    mergedMesh.userData.boundRadius = bucket.isSmall ? 0.2 : Math.max(0.32, bucket.maxRadius);
    mergedMesh.castShadow = !isSoftwareGl && mergedMesh.userData.boundRadius >= 0.22;
    mergedMesh.receiveShadow = true;
    wrapper.add(mergedMesh);

    for (const oldMesh of bucket.meshes) {
      oldMesh.removeFromParent();
      oldMesh.geometry?.dispose();
    }
  }
}

export async function parseGlbAsset(
  slot: CustomAssetSlot,
  buffer: ArrayBuffer,
  isSoftwareGl = false,
): Promise<THREE.Group> {
  const loader = getSharedLoader();
  const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
    loader.parse(buffer.slice(0), '', (res) => resolve(res), (err) => reject(err));
  });

  if (slot === 'car') {
    return normalizeModelGroup(gltf.scene, 4.6, 2.08, 0, isSoftwareGl);
  }
  return normalizeModelGroup(gltf.scene, 11.0, 11.0, 0, isSoftwareGl);
}

export function getCachedCarModelById(modelId?: string): THREE.Group | null {
  if (!modelId) return null;
  return modelProtoCache.get(modelId) ?? null;
}

export function preloadCarModelById(
  modelId: string,
  isSoftwareGl = false,
  onProgress?: (ratio: number) => void,
): Promise<THREE.Group | null> {
  const cached = modelProtoCache.get(modelId);
  if (cached) {
    onProgress?.(1);
    return Promise.resolve(cached);
  }

  if (onProgress) {
    let set = pendingProgressListeners.get(modelId);
    if (!set) {
      set = new Set();
      pendingProgressListeners.set(modelId, set);
    }
    set.add(onProgress);
  }

  const inFlight = pendingModelLoads.get(modelId);
  if (inFlight) return inFlight;

  const spec = getCarModelSpec(modelId);
  if (!spec) {
    onProgress?.(1);
    return Promise.resolve(null);
  }

  const notifyProgress = (ratio: number) => {
    const listeners = pendingProgressListeners.get(modelId);
    if (!listeners) return;
    for (const cb of listeners) cb(ratio);
  };

  const loader = getSharedLoader();
  const promise = (async (): Promise<THREE.Group | null> => {
    try {
      const buffer = await fetchModelBufferWithCache(spec.file, notifyProgress);
      const gltf = await new Promise<{ scene: THREE.Group }>((resolve, reject) => {
        loader.parse(buffer, '', (res) => resolve(res), (err) => reject(err));
      });
      const normalized = normalizeModelGroup(
        gltf.scene,
        4.6,
        2.08,
        spec.yawOffset ?? 0,
        isSoftwareGl,
      );
      modelProtoCache.set(modelId, normalized);
      notifyProgress(1);
      return normalized;
    } catch (err) {
      console.warn(`Failed to load car model ${spec.file}:`, err);
      notifyProgress(1);
      return null;
    } finally {
      pendingProgressListeners.delete(modelId);
      pendingModelLoads.delete(modelId);
    }
  })();

  pendingModelLoads.set(modelId, promise);
  return promise;
}

const TEXTURE_SLOTS = [
  'map',
  'normalMap',
  'roughnessMap',
  'metalnessMap',
  'emissiveMap',
  'aoMap',
  'clearcoatMap',
  'clearcoatNormalMap',
  'clearcoatRoughnessMap',
  'specularIntensityMap',
  'specularColorMap',
] as const;

export function warmUpModelTextures(proto: THREE.Object3D, renderer: THREE.WebGLRenderer): void {
  proto.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh && obj.visible) {
      const m = obj as THREE.Mesh;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      for (const mat of mats) {
        if (!mat) continue;
        const record = mat as unknown as Record<string, unknown>;
        for (const slot of TEXTURE_SLOTS) {
          const tex = record[slot] as THREE.Texture | undefined;
          if (tex && tex.isTexture && !tex.userData._gpuInited) {
            tex.userData._gpuInited = true;
            renderer.initTexture(tex);
          }
        }
      }
    }
  });
}

export async function preloadStartupAssets(
  playerModelId: string | undefined,
  botFleetIds: readonly string[],
  isSoftwareGl: boolean,
  trackTheme: TrackTheme,
  onProgress: (info: StartupLoadProgress) => void,
  onModelReady?: (proto: THREE.Group) => void,
): Promise<string[]> {
  ensurePersistentStorage();
  const primaryId =
    playerModelId && getCarModelSpec(playerModelId) ? playerModelId : DEFAULT_MODEL_ID;
  const loadedIds: string[] = [];

  // Load the player car and initial opponents before gameplay; Garage models stream in later.
  const allModelIds: string[] = [primaryId];
  for (const id of botFleetIds) {
    if (getCarModelSpec(id) && !allModelIds.includes(id)) allModelIds.push(id);
  }

  let envRatio = 0;
  let idbRatio = 0;
  const modelRatios = new Map<string, number>();
  let maxPct = 1;

  const emitPercent = (overridePct?: number) => {
    let modelsSum = 0;
    for (const id of allModelIds) {
      modelsSum += modelRatios.get(id) ?? 0;
    }
    const modelsRatio = allModelIds.length > 0 ? modelsSum / allModelIds.length : 1;
    const raw =
      overridePct ?? 1 + (envRatio * 0.06 + idbRatio * 0.04 + modelsRatio * 0.9) * 99;
    maxPct = Math.max(maxPct, Math.min(100, Math.round(raw)));
    onProgress({ percent: maxPct });
  };

  emitPercent(1);

  const loadAllCarModels = async () => {
    const concurrency = isSoftwareGl ? 2 : 4;
    let cursor = 0;

    const worker = async () => {
      while (cursor < allModelIds.length) {
        const id = allModelIds[cursor++];
        const proto = await preloadCarModelById(id, isSoftwareGl, (ratio) => {
          modelRatios.set(id, ratio);
          emitPercent();
        });
        modelRatios.set(id, 1);
        if (proto) {
          onModelReady?.(proto);
          loadedIds.push(id);
        }
        emitPercent();
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(concurrency, allModelIds.length) }, () => worker()),
    );
  };

  await Promise.all([
    (async () => {
      let done = 0;
      await preloadEnvironmentAssets(trackTheme, () => {
        done += 1;
        envRatio = Math.min(1, done / getEnvironmentPreloadStepCount(trackTheme));
        emitPercent();
      });
      envRatio = 1;
      emitPercent();
    })(),
    (async () => {
      await hydrateCustomGlbAssets();
      if (cachedCarProto) onModelReady?.(cachedCarProto);
      idbRatio = 1;
      emitPercent();
    })(),
    loadAllCarModels(),
  ]);

  emitPercent(100);
  return loadedIds;
}

function yieldForFrame(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    window.setTimeout(() => {
      if (typeof win.requestIdleCallback === 'function') {
        win.requestIdleCallback(() => resolve(), { timeout: 350 });
      } else {
        resolve();
      }
    }, ms);
  });
}

export async function preloadRemainingFleetInBackground(
  alreadyLoadedIds: readonly string[],
  botFleetIds: readonly string[],
  isSoftwareGl: boolean,
  isDisposed: () => boolean,
  onModelReady?: (proto: THREE.Group, modelId: string) => void,
): Promise<void> {
  // Prioritize active race/title bot models first, then remaining Garage cars
  const orderedIds: string[] = [];
  for (const id of botFleetIds) {
    if (!alreadyLoadedIds.includes(id) && !orderedIds.includes(id)) orderedIds.push(id);
  }
  for (const spec of CAR_MODELS) {
    if (!alreadyLoadedIds.includes(spec.id) && !orderedIds.includes(spec.id)) {
      orderedIds.push(spec.id);
    }
  }

  let cursor = 0;
  while (cursor < orderedIds.length) {
    if (isDisposed()) return;
    const net = getNetworkProfile();

    // Pause background downloads during race or whenever recent frame time spiked above budget
    if (isBackgroundStreamingThrottled()) {
      await new Promise((r) => window.setTimeout(r, 320));
      continue;
    }

    const id = orderedIds[cursor++];
    const proto = await preloadCarModelById(id, isSoftwareGl);
    if (isDisposed()) return;
    if (proto) onModelReady?.(proto, id);

    if (isDisposed()) return;
    const delayMs = net.tier === 'slow' ? 500 : isSoftwareGl ? 220 : 240;
    await yieldForFrame(delayMs);
  }
}

export async function importCustomGlbFile(slot: CustomAssetSlot, file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const normalized = await parseGlbAsset(slot, buffer);

  if (slot === 'car') {
    cachedCarProto = normalized;
    cachedCarName = file.name;
  } else {
    cachedEnvProto = normalized;
    cachedEnvName = file.name;
  }

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({
        slot,
        fileName: file.name,
        buffer,
        updatedAt: Date.now(),
      } satisfies StoredAssetRecord);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Keep in-memory even if IndexedDB is blocked
  }

  return file.name;
}

export async function removeCustomGlbAsset(slot: CustomAssetSlot): Promise<void> {
  if (slot === 'car') {
    cachedCarProto = null;
    cachedCarName = null;
  } else {
    cachedEnvProto = null;
    cachedEnvName = null;
  }

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(slot);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // ignore
  }
}

export async function hydrateCustomGlbAssets(): Promise<{ carName: string | null; envName: string | null }> {
  try {
    const db = await openDb();
    const records = await new Promise<StoredAssetRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAll();
      req.onsuccess = () => resolve((req.result as StoredAssetRecord[]) ?? []);
      req.onerror = () => reject(req.error);
    });

    for (const rec of records) {
      if (!rec?.buffer) continue;
      const normalized = await parseGlbAsset(rec.slot, rec.buffer);
      if (rec.slot === 'car') {
        cachedCarProto = normalized;
        cachedCarName = rec.fileName;
      } else if (rec.slot === 'env') {
        cachedEnvProto = normalized;
        cachedEnvName = rec.fileName;
      }
    }
  } catch {
    // ignore hydration errors
  }

  return { carName: cachedCarName, envName: cachedEnvName };
}

export function getCachedCustomCar(): { proto: THREE.Group | null; name: string | null } {
  return { proto: cachedCarProto, name: cachedCarName };
}

export function getCachedCustomEnv(): { proto: THREE.Group | null; name: string | null } {
  return { proto: cachedEnvProto, name: cachedEnvName };
}

export interface ImportedCustomGlbItem {
  key: string;
  slot: CustomAssetSlot;
  fileName: string;
  byteLength: number;
  updatedAt: number;
  thumbnailUrl: string | null;
}

const customThumbnailCache = new Map<string, string>();

function renderGlbThumbnailDataUrl(proto: THREE.Object3D, width = 220, height = 148): string | null {
  if (typeof document === 'undefined') return null;
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const hemi = new THREE.HemisphereLight(0xfff4e6, 0x1e293b, 1.45);
    const key = new THREE.DirectionalLight(0xffd6a5, 1.85);
    key.position.set(5, 7, 6);
    const rim = new THREE.DirectionalLight(0xff7a18, 0.9);
    rim.position.set(-5, 3, -4);
    scene.add(hemi, key, rim);

    const previewObj = proto.clone(true);
    scene.add(previewObj);
    previewObj.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(previewObj);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const radius = Math.max(0.5, size.length() * 0.5);
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.05, Math.max(100, radius * 20));
    const dist = radius / Math.sin((36 * Math.PI) / 360);
    camera.position.set(center.x + dist * 0.72, center.y + dist * 0.42, center.z + dist * 0.78);
    camera.lookAt(center);

    renderer.render(scene, camera);
    const url = canvas.toDataURL('image/png');
    scene.remove(previewObj);
    return url;
  } catch {
    return null;
  } finally {
    if (renderer) {
      try {
        renderer.forceContextLoss();
      } catch {
        // ignore
      }
      renderer.dispose();
    }
  }
}

export async function listCustomGlbModels(): Promise<ImportedCustomGlbItem[]> {
  const items: ImportedCustomGlbItem[] = [];
  const seenKeys = new Set<string>();

  try {
    const db = await openDb();
    const records = await new Promise<Array<StoredAssetRecord & { key?: string }>>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as Array<StoredAssetRecord & { key?: string }>) ?? []);
      req.onerror = () => reject(req.error);
    });

    for (const rec of records) {
      if (!rec?.buffer) continue;
      const key = String(rec.slot ?? rec.key ?? rec.fileName);
      const slot: CustomAssetSlot = rec.slot === 'env' ? 'env' : 'car';
      seenKeys.add(key);

      let proto: THREE.Group | null =
        slot === 'car' && cachedCarName === rec.fileName && cachedCarProto
          ? cachedCarProto
          : slot === 'env' && cachedEnvName === rec.fileName && cachedEnvProto
            ? cachedEnvProto
            : null;

      if (!proto) {
        try {
          proto = await parseGlbAsset(slot, rec.buffer);
        } catch {
          proto = null;
        }
      }

      const cacheKey = `${key}:${rec.fileName}:${rec.updatedAt ?? 0}`;
      let thumbnailUrl = customThumbnailCache.get(cacheKey) ?? null;
      if (!thumbnailUrl && proto) {
        thumbnailUrl = renderGlbThumbnailDataUrl(proto);
        if (thumbnailUrl) {
          customThumbnailCache.set(cacheKey, thumbnailUrl);
        }
      }

      items.push({
        key,
        slot,
        fileName: rec.fileName || `${key}.glb`,
        byteLength: rec.buffer.byteLength,
        updatedAt: rec.updatedAt ?? 0,
        thumbnailUrl,
      });
    }
  } catch {
    // Fallback to in-memory cached assets if IndexedDB is unavailable
  }

  if (!seenKeys.has('car') && cachedCarProto && cachedCarName) {
    const cacheKey = `car:${cachedCarName}:mem`;
    let thumbnailUrl = customThumbnailCache.get(cacheKey) ?? null;
    if (!thumbnailUrl) {
      thumbnailUrl = renderGlbThumbnailDataUrl(cachedCarProto);
      if (thumbnailUrl) customThumbnailCache.set(cacheKey, thumbnailUrl);
    }
    items.push({
      key: 'car',
      slot: 'car',
      fileName: cachedCarName,
      byteLength: 0,
      updatedAt: 0,
      thumbnailUrl,
    });
  }

  if (!seenKeys.has('env') && cachedEnvProto && cachedEnvName) {
    const cacheKey = `env:${cachedEnvName}:mem`;
    let thumbnailUrl = customThumbnailCache.get(cacheKey) ?? null;
    if (!thumbnailUrl) {
      thumbnailUrl = renderGlbThumbnailDataUrl(cachedEnvProto);
      if (thumbnailUrl) customThumbnailCache.set(cacheKey, thumbnailUrl);
    }
    items.push({
      key: 'env',
      slot: 'env',
      fileName: cachedEnvName,
      byteLength: 0,
      updatedAt: 0,
      thumbnailUrl,
    });
  }

  return items;
}

export async function deleteCustomGlbModel(key: string): Promise<void> {
  if (key === 'car' || key === 'env') {
    await removeCustomGlbAsset(key);
  } else {
    try {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      // ignore
    }
  }

  for (const cacheKey of Array.from(customThumbnailCache.keys())) {
    if (cacheKey.startsWith(`${key}:`)) {
      customThumbnailCache.delete(cacheKey);
    }
  }
}
