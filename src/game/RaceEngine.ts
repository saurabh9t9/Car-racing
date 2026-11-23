import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  computeBotInput,
  createGridRacers,
  DEFAULT_CAR_CONFIG,
  reconcileRacerFromServer,
  resolveObstacleCollisions,
  resolveVehicleCollisions,
  stepVehicle,
  type OnlineInputFrame,
  type OnlineVisualCorrection,
  updateStandings,
} from '../shared/physics';
import { compileTrack, sampleTrackAt, STARTER_TRACKS } from '../shared/trackMath';
import type {
  CompiledTrack,
  HitEvent,
  RaceInput,
  RacerState,
  RoomSnapshot,
  TrackDefinition,
  VehicleConfig,
  WeatherPreset,
} from '../shared/types';
import { getDefaultWeatherForTheme } from '../shared/weather';
import { CAR_MODELS } from '../shared/carCatalog';
import { computeGarageCameraFraming, stepGarageTurntable } from '../shared/garageCamera';
import { soundEngine } from './audio';
import {
  attachGlbToCarRig,
  buildCarRig,
  clearGlbFromCarRig,
  setCarHitFlash,
  type CarRig,
} from './carBuilder';
import {
  getCachedCarModelById,
  getCachedCustomCar,
  preloadCarModelById,
  preloadRemainingFleetInBackground,
  preloadStartupAssets,
  warmUpModelTextures,
  type StartupLoadProgress,
} from './customModels';
import { getGaragePaddockTexture, warmUpEnvTextures } from './envAssets';
import { buildTrackScene, type BuiltTrackScene } from './trackBuilder';

export type EngineMode = 'title' | 'garage' | 'race';

export interface HudTelemetry {
  speedKmh: number;
  position: number;
  totalRacers: number;
  lap: number;
  totalLaps: number;
  elapsedMs: number;
  bestLapMs: number | null;
  dashCooldownRatio: number; // 0 = ready, 1 = just used
  dashDir: -1 | 0 | 1;
  ramHits: number;
  countdownSec: number;
  status: 'countdown' | 'racing' | 'finished';
  racersMinimap: Array<{ id: string; x: number; z: number; isLocal: boolean; color: string }>;
  standings: RacerState[];
  recentRamBanner: string | null;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  scale: number;
  color: THREE.Color;
}

const MAX_PARTICLES = 180;
const RAIN_DROP_COUNT = 260;
const BOT_NAMES = ['Vortex', 'Kestrel', 'Apex-9', 'Drifter', 'Torque'];
const BOT_FLEET_IDS = [
  'bmw_m3_gtr_e46',
  'mclaren_650s_gt3_2015',
  'cadillac_ctsv_2004',
  'panoz_gtr1_1997',
  'ferrari_sf26_2026',
  'audi_r8c_1999',
];

// Pre-allocated scratch math helpers (Zero GC inside render loop)
const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _dummy = new THREE.Object3D();

export class RaceEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private keyLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private isSoftwareGl: boolean;

  private mode: EngineMode = 'title';
  private paused = false;
  private disposed = false;
  private frameId = 0;
  private lastTime = performance.now();

  // Track & Car rigs
  private currentTrackDef: TrackDefinition = STARTER_TRACKS[0];
  private currentWeather: WeatherPreset = getDefaultWeatherForTheme(STARTER_TRACKS[0].theme);
  private compiledTrack: CompiledTrack = compileTrack(STARTER_TRACKS[0], 240);
  private builtTrack: BuiltTrackScene | null = null;
  private carRigs = new Map<string, CarRig>();
  private carFlashTimers = new Map<string, number>();

  // Garage Turntable state
  private garageGroup = new THREE.Group();
  private garageBackdropMesh: THREE.Mesh | null = null;
  private garageDriverText = 'APEX DRIVER';
  private garageCarRig: CarRig | null = null;
  private garageAngle = -Math.PI * 0.5 + 0.10;
  private garageTargetAngle = -Math.PI * 0.5 + 0.10;
  private garageAngularVel = 0;
  private garageDragging = false;
  private garagePointerId: number | null = null;
  private garageLastX = 0;
  private garageLastMoveTime = 0;
  private garageStatsRightPx = 0;
  private garageLastFrameKey = '';
  private carThumbnails: Record<string, string> = {};
  private thumbGenToken = 0;
  private thumbGenTimer = 0;
  private thumbGenCleanup: (() => void) | null = null;

  // Race state (solo or online interpolated)
  private isOnline = false;
  private localId = 'player';
  private totalLaps = 3;
  private localRacers: RacerState[] = [];
  private onlineTargetRacers = new Map<string, RacerState>();
  private onlineInputSequence = 0;
  private pendingOnlineInputs: OnlineInputFrame[] = [];
  private onlineVisualCorrection: OnlineVisualCorrection = { x: 0, z: 0, heading: 0 };
  private raceStatus: 'countdown' | 'racing' | 'finished' = 'countdown';
  private countdownMs = 3000;
  private lastCountdownBeep = 4;
  private elapsedMs = 0;
  private hitstopTimer = 0;
  private trauma = 0;
  private recentRamBanner: string | null = null;
  private ramBannerTimer = 0;
  private seenHitIds = new Set<string>();
  private brokenObstacleUntil = new Map<string, number>();

  // Camera smooth state
  private camPos = new THREE.Vector3(0, 12, -22);
  private camLook = new THREE.Vector3(0, 2, 0);
  private camFov = 65;

  // Input state
  private keysHeld = new Set<string>();
  private virtualInput = {
    throttle: false,
    brake: false,
    steerLeft: false,
    steerRight: false,
  };
  private bufferedDash: -1 | 0 | 1 = 0;
  private dashBufferTimer = 0;

  // Pooled particles & weather rain streaks
  private particles: Particle[] = [];
  private particleIdx = 0;
  private particleMesh: THREE.InstancedMesh;
  private rainMesh: THREE.InstancedMesh;
  private rainOffsets = new Float32Array(RAIN_DROP_COUNT * 4);

  // Callbacks
  private onHudUpdate: (hud: HudTelemetry) => void;
  private onSendOnlineInput?: (input: RaceInput, sequence: number) => void;
  private onModelLoadingChange?: (loading: boolean) => void;
  private lastHudEmitAt = 0;

  // Resize observer
  private resizeObserver: ResizeObserver;

  constructor(
    container: HTMLElement,
    onHudUpdate: (hud: HudTelemetry) => void,
    onSendOnlineInput?: (input: RaceInput, sequence: number) => void,
    onModelLoadingChange?: (loading: boolean) => void,
  ) {
    this.container = container;
    this.onHudUpdate = onHudUpdate;
    this.onSendOnlineInput = onSendOnlineInput;
    this.onModelLoadingChange = onModelLoadingChange;

    this.isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: this.isSoftwareGl,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setSize(container.clientWidth || 1280, container.clientHeight || 720);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.touchAction = 'none';
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      65,
      (container.clientWidth || 1280) / (container.clientHeight || 720),
      0.5,
      1500,
    );

    // Mandatory studio environment map
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    // Warm/cool 3-point outdoor lighting
    this.hemiLight = new THREE.HemisphereLight(0xaad4ff, 0x3b4d36, 0.85);
    this.scene.add(this.hemiLight);

    this.keyLight = new THREE.DirectionalLight(0xfff3dc, 1.85);
    this.keyLight.position.set(60, 95, 45);
    this.keyLight.castShadow = !this.isSoftwareGl;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.bias = -0.0005;
    this.keyLight.shadow.normalBias = 0.02;
    const d = 75;
    this.keyLight.shadow.camera.left = -d;
    this.keyLight.shadow.camera.right = d;
    this.keyLight.shadow.camera.top = d;
    this.keyLight.shadow.camera.bottom = -d;
    this.keyLight.shadow.camera.near = 10;
    this.keyLight.shadow.camera.far = 260;
    this.scene.add(this.keyLight);
    this.scene.add(this.keyLight.target);

    // Pooled InstancedMesh particles
    const pGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.particleMesh = new THREE.InstancedMesh(pGeo, pMat, MAX_PARTICLES);
    this.particleMesh.frustumCulled = false;
    this.scene.add(this.particleMesh);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.particles.push({
        active: false,
        x: 0,
        y: -999,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: 1,
        scale: 0,
        color: new THREE.Color(0xffffff),
      });
      _dummy.position.set(0, -999, 0);
      _dummy.scale.set(0, 0, 0);
      _dummy.updateMatrix();
      this.particleMesh.setMatrixAt(i, _dummy.matrix);
      this.particleMesh.setColorAt(i, this.particles[i].color);
    }

    // Pooled InstancedMesh rain streaks (toggled cleanly by weather preset)
    const rainGeo = new THREE.BoxGeometry(0.035, 1.05, 0.035);
    const rainMat = new THREE.MeshBasicMaterial({
      color: 0xcbe4ff,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    this.rainMesh = new THREE.InstancedMesh(rainGeo, rainMat, RAIN_DROP_COUNT);
    this.rainMesh.frustumCulled = false;
    this.rainMesh.visible = false;
    this.scene.add(this.rainMesh);
    for (let i = 0; i < RAIN_DROP_COUNT; i++) {
      this.rainOffsets[i * 4] = (Math.random() - 0.5) * 56;
      this.rainOffsets[i * 4 + 1] = Math.random() * 24;
      this.rainOffsets[i * 4 + 2] = (Math.random() - 0.5) * 56;
      this.rainOffsets[i * 4 + 3] = 28 + Math.random() * 14;
    }

    // Garage pedestal
    this.initGarageStage();

    // Load initial track & title demo cars
    this.loadTrack(STARTER_TRACKS[0], this.currentWeather);
    this.enterTitleMode(DEFAULT_CAR_CONFIG);

    // Bind window/canvas events
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.renderer.domElement.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    this.lastTime = performance.now();
    this.tick();
  }

  public async preloadInitialAssets(
    playerCar: VehicleConfig,
    onProgress: (info: StartupLoadProgress) => void,
  ): Promise<void> {
    const loadedIds = await preloadStartupAssets(
      playerCar.modelId,
      BOT_FLEET_IDS,
      this.isSoftwareGl,
      onProgress,
      (proto) => warmUpModelTextures(proto, this.renderer),
    );
    if (this.disposed) return;
    warmUpEnvTextures(this.renderer);
    if (this.mode === 'title') {
      this.loadTrack(this.currentTrackDef, this.currentWeather);
      this.enterTitleMode(playerCar);
    }
    // Silently warm-cache the rest of the 15-car Garage fleet in the background
    void preloadRemainingFleetInBackground(
      loadedIds,
      BOT_FLEET_IDS,
      this.isSoftwareGl,
      () => this.disposed,
      (proto) => warmUpModelTextures(proto, this.renderer),
    );
  }

  private createGarageHalftoneBackdrop(driverName: string): THREE.CanvasTexture {
    const label = (driverName || 'APEX DRIVER').trim().toUpperCase().slice(0, 18) || 'APEX DRIVER';
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 1024, 320);

    // Subtle dark studio ambient glow behind driver name lettering
    const bgGlow = ctx.createRadialGradient(512, 165, 24, 512, 165, 430);
    bgGlow.addColorStop(0, 'rgba(165, 180, 200, 0.14)');
    bgGlow.addColorStop(0.55, 'rgba(72, 85, 105, 0.06)');
    bgGlow.addColorStop(1, 'rgba(12, 15, 21, 0)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, 1024, 320);

    // Offscreen mask for dynamic driver name -> halftone dot grid
    const mask = document.createElement('canvas');
    mask.width = 1024;
    mask.height = 320;
    const mctx = mask.getContext('2d')!;
    mctx.fillStyle = '#ffffff';
    mctx.textAlign = 'center';
    mctx.textBaseline = 'middle';

    let fontSize = 158;
    while (fontSize > 66) {
      mctx.font = `900 ${fontSize}px "Oxanium", "Arial Black", sans-serif`;
      if (mctx.measureText(label).width <= 760) break;
      fontSize -= 8;
    }
    mctx.fillText(label, 512, 168, 780);
    const maskData = mctx.getImageData(0, 0, 1024, 320).data;

    const step = 7;
    for (let y = 4; y < 320; y += step) {
      for (let x = 4; x < 1024; x += step) {
        const idx = (y * 1024 + x) * 4 + 3;
        const alpha = maskData[idx] / 255;
        if (alpha > 0.12) {
          const r = 2.35 * (0.38 + alpha * 0.62);
          const dx = (x - 512) / 512;
          const dy = (y - 165) / 160;
          const falloff = Math.max(0.22, 1 - Math.sqrt(dx * dx + dy * dy) * 0.56);
          ctx.fillStyle = `rgba(218, 224, 232, ${(0.56 * falloff).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const dx = Math.abs(x - 512) / 512;
          const dy = Math.abs(y - 160) / 160;
          const edge = Math.max(0, 1 - Math.max(dx, dy));
          if (edge > 0.1) {
            ctx.fillStyle = `rgba(148, 163, 184, ${(0.045 * edge).toFixed(3)})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private createGarageUnderglowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 124);
    grad.addColorStop(0, 'rgba(180, 194, 214, 0.34)');
    grad.addColorStop(0.5, 'rgba(120, 134, 154, 0.14)');
    grad.addColorStop(1, 'rgba(18, 22, 28, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  public setGarageDriverName(name: string): void {
    const label = (name || 'APEX DRIVER').trim().toUpperCase().slice(0, 18) || 'APEX DRIVER';
    if (label === this.garageDriverText && this.garageBackdropMesh) return;
    this.garageDriverText = label;
    if (!this.garageBackdropMesh) return;
    const mat = this.garageBackdropMesh.material as THREE.MeshBasicMaterial;
    const prevMap = mat.map;
    mat.map = this.createGarageHalftoneBackdrop(label);
    mat.needsUpdate = true;
    prevMap?.dispose();
  }

  private initGarageStage(): void {
    this.garageGroup.visible = false;
    this.scene.add(this.garageGroup);

    const floorTex = getGaragePaddockTexture(this.renderer.capabilities.getMaxAnisotropy());
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(54, 54),
      new THREE.MeshStandardMaterial({
        map: floorTex,
        color: 0x3b4454,
        metalness: 0.28,
        roughness: 0.52,
      }),
    );
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = -0.005;
    floor.receiveShadow = true;
    this.garageGroup.add(floor);

    const underglow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 3.6),
      new THREE.MeshBasicMaterial({
        map: this.createGarageUnderglowTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    underglow.rotation.x = -Math.PI * 0.5;
    underglow.position.y = 0.012;
    this.garageGroup.add(underglow);

    this.garageBackdropMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16.5, 4.8),
      new THREE.MeshBasicMaterial({
        map: this.createGarageHalftoneBackdrop(this.garageDriverText),
        transparent: true,
        depthWrite: false,
      }),
    );
    this.garageBackdropMesh.position.set(-0.35, 1.95, -5.8);
    this.garageGroup.add(this.garageBackdropMesh);

    // Overhead white studio LED light tubes & matte dark ceiling frame beams
    const ledGeo = new THREE.BoxGeometry(5.6, 0.065, 0.11);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xeaf2ff });
    const housingGeo = new THREE.BoxGeometry(5.8, 0.095, 0.17);
    const housingMat = new THREE.MeshStandardMaterial({
      color: 0x161b24,
      roughness: 0.7,
      metalness: 0.4,
    });
    const ledConfigs: Array<{ pos: [number, number, number]; rotY: number }> = [
      { pos: [-2.8, 3.25, -4.6], rotY: 0.24 },
      { pos: [2.8, 3.25, -4.6], rotY: -0.24 },
      { pos: [0, 3.55, -2.4], rotY: 0 },
    ];
    for (const cfg of ledConfigs) {
      const housing = new THREE.Mesh(housingGeo, housingMat);
      housing.position.set(cfg.pos[0], cfg.pos[1] + 0.08, cfg.pos[2]);
      housing.rotation.y = cfg.rotY;
      this.garageGroup.add(housing);

      const tube = new THREE.Mesh(ledGeo, ledMat);
      tube.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      tube.rotation.y = cfg.rotY;
      this.garageGroup.add(tube);
    }
  }

  public setWeather(weather: WeatherPreset): void {
    if (this.currentWeather === weather && this.builtTrack) return;
    this.currentWeather = weather;
    this.loadTrack(this.currentTrackDef, weather);
    if (this.mode === 'garage' && this.builtTrack) {
      this.builtTrack.group.visible = false;
      this.rainMesh.visible = false;
      this.enterGarageStageLighting();
    }
  }

  public loadTrack(trackDef: TrackDefinition, weather?: WeatherPreset): void {
    this.currentTrackDef = trackDef;
    if (weather) this.currentWeather = weather;
    this.compiledTrack = compileTrack(trackDef, 240);

    if (this.builtTrack) {
      this.scene.remove(this.builtTrack.group);
      this.builtTrack.dispose();
      this.builtTrack = null;
    }

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.builtTrack = buildTrackScene(this.compiledTrack, maxAniso, this.currentWeather);
    this.scene.add(this.builtTrack.group);

    this.restoreTrackLighting();
  }

  private restoreTrackLighting(): void {
    if (!this.builtTrack) return;
    const pal = this.builtTrack.palette;
    this.scene.background = new THREE.Color(pal.skyColor);
    this.scene.fog = new THREE.Fog(pal.fogColor, pal.fogNear, pal.fogFar);
    this.hemiLight.color.setHex(pal.ambientSky);
    this.hemiLight.groundColor.setHex(pal.ambientGround);
    this.hemiLight.intensity = pal.hemiIntensity;
    this.keyLight.color.setHex(pal.sunColor);
    this.keyLight.intensity = pal.sunIntensity;
    this.renderer.toneMappingExposure = pal.toneMappingExposure;
    const [sx, sy, sz] = pal.sunDirection;
    this.keyLight.position.set(sx * 120, Math.max(25, sy * 140), sz * 120);
    this.keyLight.target.position.set(0, 0, 0);
    this.rainMesh.visible = pal.hasRain && this.mode !== 'garage';
    soundEngine.setWeatherAmbience(
      this.currentWeather,
      this.mode !== 'garage' && !this.paused && !this.disposed,
    );
  }

  private clearRaceCars(): void {
    for (const rig of this.carRigs.values()) {
      this.scene.remove(rig.root);
      rig.dispose();
    }
    this.carRigs.clear();
    this.carFlashTimers.clear();
  }

  private attachCarModelAsync(rig: CarRig, car: VehicleConfig, isLocalPlayer: boolean): void {
    const customCar = isLocalPlayer ? getCachedCustomCar().proto : null;
    if (customCar) {
      rig.root.userData.desiredModelKey = 'custom-glb';
      attachGlbToCarRig(rig, customCar, 'custom-glb');
      if (rig === this.garageCarRig) this.onModelLoadingChange?.(false);
      return;
    }

    const modelId = car.modelId;
    if (!modelId) {
      rig.root.userData.desiredModelKey = null;
      clearGlbFromCarRig(rig);
      if (rig === this.garageCarRig) this.onModelLoadingChange?.(false);
      return;
    }

    rig.root.userData.desiredModelKey = modelId;
    const cached = getCachedCarModelById(modelId);
    if (cached) {
      attachGlbToCarRig(rig, cached, modelId);
      if (rig === this.garageCarRig) this.onModelLoadingChange?.(false);
      return;
    }

    if (rig === this.garageCarRig) this.onModelLoadingChange?.(true);
    preloadCarModelById(modelId, this.isSoftwareGl).then((proto) => {
      if (this.disposed) return;
      const isGarage = rig === this.garageCarRig;
      if (isGarage) this.onModelLoadingChange?.(false);
      if (!proto) return;

      const stillActive = isGarage || Array.from(this.carRigs.values()).includes(rig);
      if (!stillActive) return;
      if (rig.root.userData.desiredModelKey !== modelId) return;

      warmUpModelTextures(proto, this.renderer);
      attachGlbToCarRig(rig, proto, modelId);
    });
  }

  private pickBotCar(idx: number, excludeModelId?: string): VehicleConfig {
    const pool = BOT_FLEET_IDS.filter((id) => id !== excludeModelId);
    const modelId = pool[idx % pool.length] ?? CAR_MODELS[idx % CAR_MODELS.length].id;
    const spec = CAR_MODELS.find((m) => m.id === modelId) ?? CAR_MODELS[0];
    return {
      modelId: spec.id,
      chassis: spec.chassis,
      wing: (['gt_wing', 'ducktail', 'twin_fin'] as const)[idx % 3],
      wheels: (['alloy_5', 'aero_disc', 'deep_dish'] as const)[idx % 3],
      primaryColor: spec.primaryColor,
      accentColor: spec.accentColor,
      finish: idx % 2 === 0 ? 'metallic' : 'matte',
      stats: { speed: 6, accel: 6, handling: 6, ram: 6 },
    };
  }

  public enterTitleMode(playerCar: VehicleConfig): void {
    this.stopGarageThumbnailGeneration();
    this.mode = 'title';
    this.paused = false;
    this.isOnline = false;
    this.garageGroup.visible = false;
    if (this.builtTrack) {
      this.builtTrack.group.visible = true;
      this.restoreTrackLighting();
    }
    soundEngine.stopEngine();
    soundEngine.setWeatherAmbience(this.currentWeather, true);

    this.clearRaceCars();
    this.localId = 'demo-0';
    const entries: Array<{ id: string; name: string; isBot: boolean; car: VehicleConfig }> = [
      { id: 'demo-0', name: 'Apex Lead', isBot: true, car: playerCar },
      { id: 'demo-1', name: 'Vortex', isBot: true, car: this.pickBotCar(0, playerCar.modelId) },
      { id: 'demo-2', name: 'Kestrel', isBot: true, car: this.pickBotCar(1, playerCar.modelId) },
      { id: 'demo-3', name: 'Drifter', isBot: true, car: this.pickBotCar(2, playerCar.modelId) },
    ];
    this.localRacers = createGridRacers(entries, this.compiledTrack);
    for (const r of this.localRacers) {
      const rig = buildCarRig(r.car);
      this.scene.add(rig.root);
      this.carRigs.set(r.id, rig);
      this.attachCarModelAsync(rig, r.car, r.id === this.localId);
    }

    const s0 = sampleTrackAt(this.compiledTrack, 0);
    this.camPos.set(s0.x - 24, 15, s0.z - 28);
    this.camLook.set(s0.x, 1.5, s0.z);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camLook);
    this.camFov = 65;
    if (this.camera.fov !== 65) {
      this.camera.fov = 65;
      this.camera.updateProjectionMatrix();
    }
    this.syncVisualCarRigs(0.016);
    this.renderer.render(this.scene, this.camera);
  }

  private enterGarageStageLighting(): void {
    this.scene.background = new THREE.Color(0x0c0f15);
    this.scene.fog = new THREE.Fog(0x0c0f15, 9, 23);
    this.hemiLight.color.setHex(0xdce8ff);
    this.hemiLight.groundColor.setHex(0x12161e);
    this.hemiLight.intensity = 0.85;
    this.keyLight.color.setHex(0xfff7eb);
    this.keyLight.intensity = 1.85;
    this.renderer.toneMappingExposure = 1.08;
    this.keyLight.position.set(12, 18, 16);
    this.keyLight.target.position.set(0, 0.5, 0);
  }

  public setGarageStatsRightPx(rightPx: number): void {
    const next = Number.isFinite(rightPx) && rightPx > 0 ? Math.round(rightPx) : 0;
    if (next === this.garageStatsRightPx) return;
    this.garageStatsRightPx = next;
    if (this.mode === 'garage') {
      this.applyGarageCameraFraming();
    }
  }

  private applyGarageCameraFraming(force = false): void {
    const width = this.container.clientWidth || window.innerWidth || 1280;
    const height = this.container.clientHeight || window.innerHeight || 720;
    const key = `${width}x${height}:${this.garageStatsRightPx}`;
    if (!force && key === this.garageLastFrameKey) return;
    this.garageLastFrameKey = key;

    const frame = computeGarageCameraFraming(
      width,
      height,
      this.garageStatsRightPx > 0 ? this.garageStatsRightPx : undefined,
    );
    this.camera.position.set(frame.shiftX, frame.camY, frame.distance);
    this.camera.lookAt(frame.shiftX, frame.lookY, 0);
    if (Math.abs(this.camera.fov - frame.fov) > 0.1) {
      this.camera.fov = frame.fov;
      this.camera.updateProjectionMatrix();
    }
    if (this.garageBackdropMesh) {
      this.garageBackdropMesh.position.x = frame.backdropX;
    }
  }

  public enterGarageMode(car: VehicleConfig, driverName?: string): void {
    this.mode = 'garage';
    this.paused = false;
    this.isOnline = false;
    soundEngine.stopEngine();
    soundEngine.stopWeatherAmbience();

    if (driverName !== undefined) {
      this.setGarageDriverName(driverName);
    }

    this.clearRaceCars();
    if (this.builtTrack) this.builtTrack.group.visible = false;
    this.rainMesh.visible = false;
    this.garageGroup.visible = true;
    this.enterGarageStageLighting();

    const startAngle = -Math.PI * 0.5 + 0.1;
    this.garageAngle = startAngle;
    this.garageTargetAngle = startAngle;
    this.garageAngularVel = 0;
    this.garageDragging = false;
    this.garagePointerId = null;
    this.garageLastFrameKey = '';
    this.updateGarageCar(car, true);
    this.applyGarageCameraFraming(true);
    this.renderer.render(this.scene, this.camera);
  }

  public stopGarageThumbnailGeneration(): void {
    this.thumbGenToken += 1;
    if (this.thumbGenTimer) {
      window.clearTimeout(this.thumbGenTimer);
      this.thumbGenTimer = 0;
    }
    if (this.thumbGenCleanup) {
      const cleanup = this.thumbGenCleanup;
      this.thumbGenCleanup = null;
      cleanup();
    }
  }

  /**
   * Generates car preview thumbnails incrementally (1 car per time slice) so opening
   * the Garage never blocks the main thread or freezes WebGL rendering.
   */
  public startGarageThumbnailGeneration(
    activeModelId: string | undefined,
    onUpdate: (thumbs: Record<string, string>) => void,
  ): void {
    this.stopGarageThumbnailGeneration();
    const token = ++this.thumbGenToken;

    if (Object.keys(this.carThumbnails).length > 0) {
      onUpdate({ ...this.carThumbnails });
    }

    const ordered = [...CAR_MODELS];
    if (activeModelId) {
      const idx = ordered.findIndex((m) => m.id === activeModelId);
      if (idx > 0) {
        const [active] = ordered.splice(idx, 1);
        ordered.unshift(active);
      }
    }

    const missing = ordered.filter((m) => !this.carThumbnails[m.id]);
    if (missing.length === 0) return;

    const width = 192;
    const height = 110;
    const rt = new THREE.WebGLRenderTarget(width, height, {
      type: THREE.UnsignedByteType,
      depthBuffer: true,
    });

    const thumbScene = new THREE.Scene();
    thumbScene.background = new THREE.Color(0x141820);
    thumbScene.environment = this.scene.environment;

    const hemi = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.25);
    const key = new THREE.DirectionalLight(0xfff4e0, 2.2);
    key.position.set(4, 8, 9);
    const rim = new THREE.DirectionalLight(0x94a3b8, 0.9);
    rim.position.set(-6, 4, -4);
    thumbScene.add(hemi, key, rim);

    const thumbCam = new THREE.PerspectiveCamera(27, width / height, 0.1, 40);
    thumbCam.position.set(0, 0.66, 6.45);
    thumbCam.lookAt(0, 0.34, 0);

    const gammaLut = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      gammaLut[i] = Math.min(255, Math.round(Math.pow(i / 255, 1 / 2.2) * 255));
    }

    const pixelBuf = new Uint8Array(width * height * 4);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imgData = ctx ? ctx.createImageData(width, height) : null;

    let disposedResources = false;
    const cleanup = () => {
      if (disposedResources) return;
      disposedResources = true;
      rt.dispose();
    };
    this.thumbGenCleanup = cleanup;

    let cursor = 0;
    let generatedSinceFlush = 0;
    let totalGenerated = 0;
    let hadUncached = false;

    const step = () => {
      this.thumbGenTimer = 0;
      if (this.disposed || token !== this.thumbGenToken || this.mode !== 'garage') {
        if (this.thumbGenCleanup === cleanup) this.thumbGenCleanup = null;
        cleanup();
        return;
      }

      // Defer GPU readPixels while the user is actively spinning or coasting the showroom car
      if (
        this.garageDragging ||
        Math.abs(this.garageAngularVel) > 0.08 ||
        Math.abs(this.garageTargetAngle - this.garageAngle) > 0.015
      ) {
        this.thumbGenTimer = window.setTimeout(step, 120);
        return;
      }

      // Advance past any already-generated or not-yet-downloaded models without blocking
      let renderedOne = false;
      while (cursor < missing.length && !renderedOne) {
        const spec = missing[cursor++];
        if (this.carThumbnails[spec.id]) continue;
        const proto = getCachedCarModelById(spec.id);
        if (!proto) {
          hadUncached = true;
          continue;
        }

        const prevTarget = this.renderer.getRenderTarget();
        const prevToneMapping = this.renderer.toneMapping;
        this.renderer.toneMapping = THREE.NoToneMapping;

        const prevPos = proto.position.clone();
        const prevRot = proto.rotation.clone();
        proto.position.set(0, 0, 0);
        proto.rotation.set(0, -Math.PI * 0.5 + 0.08, 0);
        thumbScene.add(proto);

        try {
          this.renderer.setRenderTarget(rt);
          this.renderer.render(thumbScene, thumbCam);
          this.renderer.readRenderTargetPixels(rt, 0, 0, width, height, pixelBuf);
        } finally {
          thumbScene.remove(proto);
          proto.position.copy(prevPos);
          proto.rotation.copy(prevRot);
          this.renderer.setRenderTarget(prevTarget);
          this.renderer.toneMapping = prevToneMapping;
        }

        if (ctx && imgData) {
          const dst = imgData.data;
          for (let row = 0; row < height; row++) {
            const srcRow = height - 1 - row;
            const srcOffset = srcRow * width * 4;
            const dstOffset = row * width * 4;
            for (let col = 0; col < width * 4; col += 4) {
              dst[dstOffset + col] = gammaLut[pixelBuf[srcOffset + col]];
              dst[dstOffset + col + 1] = gammaLut[pixelBuf[srcOffset + col + 1]];
              dst[dstOffset + col + 2] = gammaLut[pixelBuf[srcOffset + col + 2]];
              dst[dstOffset + col + 3] = 255;
            }
          }
          ctx.putImageData(imgData, 0, 0);
          this.carThumbnails[spec.id] = canvas.toDataURL('image/webp', 0.82);
          generatedSinceFlush += 1;
          totalGenerated += 1;
        }
        renderedOne = true;
      }

      const isDone = cursor >= missing.length;
      if (generatedSinceFlush > 0 && (totalGenerated === 1 || generatedSinceFlush >= 2 || isDone)) {
        generatedSinceFlush = 0;
        onUpdate({ ...this.carThumbnails });
      }

      if (!isDone) {
        // Yield between thumbnails so the UI and 3D turntable remain completely responsive
        const delayMs = this.isSoftwareGl ? 32 : 16;
        this.thumbGenTimer = window.setTimeout(step, delayMs);
      } else {
        if (this.thumbGenCleanup === cleanup) this.thumbGenCleanup = null;
        cleanup();
        // If some fleet models were still streaming in the background, retry once quietly
        if (hadUncached && !this.disposed && token === this.thumbGenToken && this.mode === 'garage') {
          this.thumbGenTimer = window.setTimeout(() => {
            if (!this.disposed && token === this.thumbGenToken && this.mode === 'garage') {
              this.startGarageThumbnailGeneration(activeModelId, onUpdate);
            }
          }, 1600);
        }
      }
    };

    // Defer the very first thumbnail slightly so the Garage modal & 3D car paint immediately on click
    this.thumbGenTimer = window.setTimeout(step, 40);
  }

  public updateGarageCar(car: VehicleConfig, forceRebuild = false): void {
    const hasCustomUpload = Boolean(getCachedCustomCar().proto);
    const desiredKey = hasCustomUpload ? 'custom-glb' : (car.modelId ?? null);

    // Avoid rebuilding when only stats sliders change on an active .glb model
    if (
      !forceRebuild &&
      this.garageCarRig &&
      desiredKey &&
      this.garageCarRig.root.userData.desiredModelKey === desiredKey
    ) {
      return;
    }

    if (this.garageCarRig) {
      this.garageGroup.remove(this.garageCarRig.root);
      this.garageCarRig.dispose();
    }
    this.garageCarRig = buildCarRig(car);
    this.garageGroup.add(this.garageCarRig.root);
    this.attachCarModelAsync(this.garageCarRig, car, true);
  }

  public refreshCustomAssets(trackDef?: TrackDefinition, playerCar?: VehicleConfig): void {
    if (trackDef) {
      this.loadTrack(trackDef);
      if (this.mode === 'garage' && this.builtTrack) {
        this.builtTrack.group.visible = false;
      }
    }
    if (this.mode === 'garage' && playerCar) {
      this.updateGarageCar(playerCar, true);
    } else if (this.mode === 'title' && playerCar) {
      this.enterTitleMode(playerCar);
    } else if (this.mode === 'title') {
      const lead = this.localRacers[0]?.car;
      if (lead) this.enterTitleMode(lead);
    }
  }

  public startSoloRace(
    playerName: string,
    playerCar: VehicleConfig,
    trackDef: TrackDefinition,
    laps = 3,
    aiCount = 5,
    weather?: WeatherPreset,
  ): void {
    this.stopGarageThumbnailGeneration();
    this.mode = 'race';
    this.paused = false;
    this.isOnline = false;
    this.localId = 'player';
    this.onlineInputSequence = 0;
    this.pendingOnlineInputs = [];
    this.onlineVisualCorrection = { x: 0, z: 0, heading: 0 };
    this.totalLaps = laps;
    this.garageGroup.visible = false;
    this.loadTrack(trackDef, weather);
    if (this.builtTrack) this.builtTrack.group.visible = true;

    this.clearRaceCars();
    this.onlineTargetRacers.clear();
    this.seenHitIds.clear();
    this.brokenObstacleUntil.clear();
    this.keysHeld.clear();
    this.bufferedDash = 0;

    const entries = [
      { id: 'player', name: playerName || 'You', isBot: false, car: playerCar },
    ];
    for (let i = 0; i < aiCount; i++) {
      entries.push({
        id: `bot-${i + 1}`,
        name: `${BOT_NAMES[i % BOT_NAMES.length]} (AI)`,
        isBot: true,
        car: this.pickBotCar(i, playerCar.modelId),
      });
    }

    this.localRacers = createGridRacers(entries, this.compiledTrack);
    for (const r of this.localRacers) {
      const rig = buildCarRig(r.car);
      this.scene.add(rig.root);
      this.carRigs.set(r.id, rig);
      this.attachCarModelAsync(rig, r.car, r.id === this.localId);
    }

    this.raceStatus = 'countdown';
    this.countdownMs = 3000;
    this.lastCountdownBeep = 4;
    this.elapsedMs = 0;
    this.hitstopTimer = 0;
    this.trauma = 0;
    this.recentRamBanner = null;
    this.snapCameraBehindLocal();
    this.renderer.render(this.scene, this.camera);
    soundEngine.startEngine();
  }

  public startOnlineRace(
    snapshot: RoomSnapshot,
    playerId: string,
    trackDef: TrackDefinition,
    weather?: WeatherPreset,
  ): void {
    this.stopGarageThumbnailGeneration();
    this.mode = 'race';
    this.paused = false;
    this.isOnline = true;
    this.localId = playerId;
    this.onlineInputSequence = 0;
    this.pendingOnlineInputs = [];
    this.onlineVisualCorrection = { x: 0, z: 0, heading: 0 };
    this.totalLaps = snapshot.config.laps;
    this.garageGroup.visible = false;
    this.loadTrack(trackDef, weather ?? snapshot.config.weather);
    if (this.builtTrack) this.builtTrack.group.visible = true;

    this.clearRaceCars();
    this.onlineTargetRacers.clear();
    this.seenHitIds.clear();
    this.brokenObstacleUntil.clear();
    this.keysHeld.clear();
    this.bufferedDash = 0;
    this.lastCountdownBeep = 4;
    this.recentRamBanner = null;

    this.localRacers = snapshot.racers.map((r) => ({ ...r }));
    for (const r of this.localRacers) {
      this.onlineTargetRacers.set(r.id, { ...r });
      const rig = buildCarRig(r.car);
      this.scene.add(rig.root);
      this.carRigs.set(r.id, rig);
      this.attachCarModelAsync(rig, r.car, r.id === this.localId);
    }

    this.raceStatus = snapshot.status === 'racing' ? 'racing' : snapshot.status === 'finished' ? 'finished' : 'countdown';
    this.elapsedMs = snapshot.elapsedMs;
    this.snapCameraBehindLocal();
    this.renderer.render(this.scene, this.camera);
    soundEngine.startEngine();
  }

  public applyOnlineSnapshot(snapshot: RoomSnapshot): void {
    if (!this.isOnline || this.mode !== 'race') return;

    const prevStatus = this.raceStatus;
    this.raceStatus =
      snapshot.status === 'finished'
        ? 'finished'
        : snapshot.status === 'racing'
          ? 'racing'
          : 'countdown';
    this.elapsedMs = snapshot.elapsedMs;

    if (this.raceStatus === 'countdown' && snapshot.countdownSec !== this.lastCountdownBeep) {
      this.lastCountdownBeep = snapshot.countdownSec;
      if (snapshot.countdownSec > 0) soundEngine.playCountdown(false);
    }
    if (prevStatus === 'countdown' && this.raceStatus === 'racing') {
      soundEngine.playCountdown(true);
    }

    for (const remote of snapshot.racers) {
      this.onlineTargetRacers.set(remote.id, remote);
      if (!this.carRigs.has(remote.id)) {
        const rig = buildCarRig(remote.car);
        this.scene.add(rig.root);
        this.carRigs.set(remote.id, rig);
        this.attachCarModelAsync(rig, remote.car, remote.id === this.localId);
        this.localRacers.push({ ...remote });
      }
      const localCopy = this.localRacers.find((r) => r.id === remote.id);
      if (localCopy) {
        if (localCopy.lap < remote.lap && remote.id === this.localId) {
          soundEngine.playLap(false);
        }
        if (!localCopy.finished && remote.finished && remote.id === this.localId) {
          soundEngine.playLap(true);
        }
        if (remote.id === this.localId) {
          const ack = snapshot.inputAcks?.[this.localId] ?? this.onlineInputSequence;
          const reconciliation = reconcileRacerFromServer(
            localCopy,
            remote,
            ack,
            this.raceStatus === 'racing' ? this.pendingOnlineInputs : [],
            this.compiledTrack,
            snapshot.elapsedMs,
            this.totalLaps,
            this.onlineVisualCorrection,
          );
          this.pendingOnlineInputs = reconciliation.pendingInputs;
          this.elapsedMs = reconciliation.elapsedMs;
          this.onlineVisualCorrection = reconciliation.visualCorrection;
        } else {
          localCopy.lap = remote.lap;
          localCopy.position = remote.position;
          localCopy.finished = remote.finished;
          localCopy.finishTimeMs = remote.finishTimeMs;
          localCopy.bestLapMs = remote.bestLapMs;
          localCopy.ramHits = remote.ramHits;
          localCopy.dashCooldown = remote.dashCooldown;
          localCopy.dashTimer = remote.dashTimer;
          localCopy.dashDir = remote.dashDir;
          localCopy.boostTimer = remote.boostTimer;
          localCopy.stunTimer = remote.stunTimer;
          localCopy.speed = remote.speed;
        }
      }
    }

    for (const hit of snapshot.hitEvents) {
      if (!this.seenHitIds.has(hit.id)) {
        this.seenHitIds.add(hit.id);
        this.triggerHitEffects(hit);
      }
    }

    if (this.builtTrack && snapshot.brokenObstacleIds) {
      const brokenSet = new Set(snapshot.brokenObstacleIds);
      for (const [obsId, mesh] of this.builtTrack.obstacleMeshes.entries()) {
        mesh.visible = !brokenSet.has(obsId);
      }
    }

    const now = performance.now();
    if (now - this.lastHudEmitAt >= 65 || this.raceStatus !== prevStatus) {
      this.lastHudEmitAt = now;
      this.emitHud(snapshot.countdownSec);
    }
  }

  public setPaused(paused: boolean): void {
    this.paused = paused;
    if (paused) {
      this.keysHeld.clear();
      this.clearVirtualControls();
      soundEngine.stopEngine();
      soundEngine.stopWeatherAmbience();
    } else {
      if (this.mode === 'race') {
        soundEngine.startEngine();
      }
      soundEngine.setWeatherAmbience(this.currentWeather, this.mode !== 'garage');
    }
  }

  public setInputHandler(fn?: (input: RaceInput) => void): void {
    this.onSendOnlineInput = fn;
  }

  public triggerMobileDash(dir: -1 | 1): void {
    this.bufferedDash = dir;
    this.dashBufferTimer = 0.14;
  }

  public setVirtualControl(
    control: 'throttle' | 'brake' | 'steerLeft' | 'steerRight',
    pressed: boolean,
  ): void {
    this.virtualInput[control] = pressed;
  }

  private clearVirtualControls(): void {
    this.virtualInput.throttle = false;
    this.virtualInput.brake = false;
    this.virtualInput.steerLeft = false;
    this.virtualInput.steerRight = false;
  }

  private snapCameraBehindLocal(): void {
    this.syncVisualCarRigs(0.016);
    const target = this.localRacers.find((r) => r.id === this.localId) ?? this.localRacers[0];
    if (!target) return;
    const fwdX = Math.sin(target.heading);
    const fwdZ = Math.cos(target.heading);
    this.camPos.set(target.x - fwdX * 11.5, 4.8, target.z - fwdZ * 11.5);
    this.camLook.set(target.x + fwdX * 6, 1.3, target.z + fwdZ * 6);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camLook);
    this.camFov = 64;
    if (Math.abs(this.camera.fov - 64) > 0.05) {
      this.camera.fov = 64;
      this.camera.updateProjectionMatrix();
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const code = e.code;
    this.keysHeld.add(code);

    if (this.mode === 'race' && !this.paused && !e.repeat) {
      if (code === 'KeyQ') {
        this.bufferedDash = -1;
        this.dashBufferTimer = 0.14;
      } else if (code === 'KeyE') {
        this.bufferedDash = 1;
        this.dashBufferTimer = 0.14;
      } else if (code === 'Space') {
        const steerLeft = this.keysHeld.has('KeyA') || this.keysHeld.has('ArrowLeft');
        const steerRight = this.keysHeld.has('KeyD') || this.keysHeld.has('ArrowRight');
        this.bufferedDash = steerLeft ? -1 : steerRight ? 1 : 1;
        this.dashBufferTimer = 0.14;
      }
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keysHeld.delete(e.code);
  };

  private handleBlur = () => {
    this.keysHeld.clear();
    this.clearVirtualControls();
    this.garageDragging = false;
    this.garagePointerId = null;
    this.garageAngularVel = 0;
  };

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.keysHeld.clear();
      this.clearVirtualControls();
      this.garageDragging = false;
      this.garagePointerId = null;
      this.garageAngularVel = 0;
    }
  };

  private handlePointerDown = (e: PointerEvent) => {
    if (this.mode !== 'garage') return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this.garageDragging = true;
    this.garagePointerId = e.pointerId;
    this.garageLastX = e.clientX;
    this.garageLastMoveTime = performance.now();
    this.garageAngularVel = 0;
    try {
      this.renderer.domElement.setPointerCapture(e.pointerId);
    } catch {
      // ignore synthetic pointer events
    }
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (this.mode !== 'garage' || !this.garageDragging) return;
    if (this.garagePointerId !== null && e.pointerId !== this.garagePointerId) return;
    const dx = e.clientX - this.garageLastX;
    if (Math.abs(dx) < 0.01) return;
    const now = performance.now();
    const dtMove = Math.max(0.004, (now - this.garageLastMoveTime) / 1000);
    const deltaAngle = dx * 0.011;
    this.garageTargetAngle += deltaAngle;
    const instVel = Math.max(-14, Math.min(14, deltaAngle / dtMove));
    this.garageAngularVel = this.garageAngularVel * 0.45 + instVel * 0.55;
    this.garageLastX = e.clientX;
    this.garageLastMoveTime = now;
  };

  private handlePointerUp = (e?: PointerEvent) => {
    if (!this.garageDragging) return;
    if (e && this.garagePointerId !== null && e.pointerId !== this.garagePointerId) return;
    if (e) {
      try {
        if (this.renderer.domElement.hasPointerCapture(e.pointerId)) {
          this.renderer.domElement.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    }
    if (performance.now() - this.garageLastMoveTime > 90) {
      this.garageAngularVel = 0;
    }
    this.garageDragging = false;
    this.garagePointerId = null;
  };

  private handleResize(): void {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private sampleLocalInput(): RaceInput {
    const up = this.keysHeld.has('KeyW') || this.keysHeld.has('ArrowUp') || this.virtualInput.throttle;
    const down = this.keysHeld.has('KeyS') || this.keysHeld.has('ArrowDown') || this.virtualInput.brake;
    const left = this.keysHeld.has('KeyA') || this.keysHeld.has('ArrowLeft') || this.virtualInput.steerLeft;
    const right = this.keysHeld.has('KeyD') || this.keysHeld.has('ArrowRight') || this.virtualInput.steerRight;

    const dash = this.dashBufferTimer > 0 ? this.bufferedDash : 0;
    if (dash !== 0) {
      this.bufferedDash = 0;
      this.dashBufferTimer = 0;
    }

    return {
      throttle: up ? 1 : 0,
      brake: down ? 1 : 0,
      steer: (right ? 1 : 0) - (left ? 1 : 0),
      dash,
    };
  }

  private spawnParticles(x: number, y: number, z: number, count: number, colorHex: number, speed = 8): void {
    for (let i = 0; i < count; i++) {
      const p = this.particles[this.particleIdx];
      this.particleIdx = (this.particleIdx + 1) % MAX_PARTICLES;
      p.active = true;
      p.x = x + (Math.random() - 0.5) * 0.8;
      p.y = y + Math.random() * 0.4;
      p.z = z + (Math.random() - 0.5) * 0.8;
      const a = Math.random() * Math.PI * 2;
      p.vx = Math.cos(a) * speed * (0.4 + Math.random() * 0.7);
      p.vy = 2 + Math.random() * speed * 0.6;
      p.vz = Math.sin(a) * speed * (0.4 + Math.random() * 0.7);
      p.life = 0.25 + Math.random() * 0.35;
      p.maxLife = p.life;
      p.scale = 0.4 + Math.random() * 0.55;
      p.color.setHex(colorHex);
    }
  }

  private triggerHitEffects(hit: HitEvent): void {
    if (hit.kind === 'cone') {
      this.spawnParticles(hit.x, 0.55, hit.z, 12, 0xff5a1f, 11);
      this.spawnParticles(hit.x, 0.6, hit.z, 6, 0xf8fafc, 9);
      if (hit.victimId === this.localId) {
        this.trauma = Math.min(1, this.trauma + 0.18);
        soundEngine.playRamImpact(0.35);
      }
      return;
    }

    if (hit.kind === 'obstacle') {
      this.spawnParticles(hit.x, 0.75, hit.z, 16, 0xfbbf24, 13);
      this.spawnParticles(hit.x, 0.65, hit.z, 10, 0x94a3b8, 9);
      this.carFlashTimers.set(hit.victimId, 0.08);
      if (hit.victimId === this.localId) {
        this.hitstopTimer = 0.04;
        this.trauma = Math.min(1, this.trauma + 0.55 * hit.intensity);
        soundEngine.playRamImpact(hit.intensity);
        this.recentRamBanner = 'OBSTACLE IMPACT!';
        this.ramBannerTimer = 1.1;
      }
      return;
    }

    this.spawnParticles(hit.x, 0.7, hit.z, 18, 0xfbbf24, 14);
    this.spawnParticles(hit.x, 0.8, hit.z, 8, 0xff4d2e, 10);
    this.carFlashTimers.set(hit.victimId, 0.065);

    if (hit.attackerId === this.localId || hit.victimId === this.localId) {
      this.hitstopTimer = 0.045;
      this.trauma = Math.min(1, this.trauma + 0.58 * hit.intensity);
      soundEngine.playRamImpact(hit.intensity);
      if (hit.attackerId === this.localId) {
        const victim = this.localRacers.find((r) => r.id === hit.victimId);
        this.recentRamBanner = victim ? `RAMMED ${victim.name.toUpperCase()}!` : 'RAM HIT!';
        this.ramBannerTimer = 1.35;
      }
    }
  }

  private updateParticles(dt: number): void {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = this.particles[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        _dummy.position.set(0, -999, 0);
        _dummy.scale.set(0, 0, 0);
        _dummy.updateMatrix();
        this.particleMesh.setMatrixAt(i, _dummy.matrix);
        continue;
      }
      p.vy -= 18 * dt;
      p.x += p.vx * dt;
      p.y = Math.max(0.08, p.y + p.vy * dt);
      p.z += p.vz * dt;
      const ratio = p.life / p.maxLife;
      const s = p.scale * ratio;
      _dummy.position.set(p.x, p.y, p.z);
      _dummy.rotation.set(p.life * 6, p.life * 4, 0);
      _dummy.scale.set(s, s, s);
      _dummy.updateMatrix();
      this.particleMesh.setMatrixAt(i, _dummy.matrix);
      this.particleMesh.setColorAt(i, p.color);
    }
    this.particleMesh.instanceMatrix.needsUpdate = true;
    if (this.particleMesh.instanceColor) this.particleMesh.instanceColor.needsUpdate = true;
  }

  private syncVisualCarRigs(dt: number): void {
    for (const racer of this.localRacers) {
      const rig = this.carRigs.get(racer.id);
      if (!rig) continue;

      const correction =
        this.isOnline && racer.id === this.localId ? this.onlineVisualCorrection : null;
      rig.root.position.set(racer.x + (correction?.x ?? 0), 0, racer.z + (correction?.z ?? 0));
      rig.root.rotation.y = racer.heading + (correction?.heading ?? 0);

      // Dynamic body roll on steering & lateral dash tilt
      const dashTilt = racer.dashTimer > 0 ? racer.dashDir * -0.22 : 0;
      const turnTilt = racer.steerAngle * Math.min(1, Math.abs(racer.speed) / 35) * 0.08;
      rig.bodyGroup.rotation.z += (dashTilt + turnTilt - rig.bodyGroup.rotation.z) * Math.min(1, 14 * dt);

      // Front wheel steering & tire rotation
      for (const pivot of rig.frontWheelPivots) {
        pivot.rotation.y = -racer.steerAngle * 0.45;
      }
      const spinDelta = (racer.speed / 0.37) * dt;
      for (const wheel of rig.wheelMeshes) {
        wheel.rotation.x += spinDelta;
      }

      // Hit flash decay
      const ft = this.carFlashTimers.get(racer.id) ?? 0;
      if (ft > 0) {
        const nextFt = ft - dt;
        this.carFlashTimers.set(racer.id, nextFt);
        setCarHitFlash(rig, nextFt > 0);
      }

      // Emit subtle boost/dash trails
      if (racer.dashTimer > 0 && Math.random() < 0.6) {
        this.spawnParticles(racer.x, 0.35, racer.z, 1, 0x38bdf8, 4);
      } else if (racer.boostTimer > 0 && Math.random() < 0.45) {
        this.spawnParticles(racer.x, 0.32, racer.z, 1, 0xff4d2e, 3);
      }
    }
  }

  private tick = () => {
    if (this.disposed) return;

    const now = performance.now();
    const rawDt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    const dt = Math.min(Math.max(rawDt, 0.001), 0.05);

    this.dashBufferTimer = Math.max(0, this.dashBufferTimer - dt);
    if (this.ramBannerTimer > 0) {
      this.ramBannerTimer -= dt;
      if (this.ramBannerTimer <= 0) this.recentRamBanner = null;
    }

    if (this.mode === 'title') {
      // Advance demo racers on title backdrop
      let botIdx = 0;
      for (const r of this.localRacers) {
        const inp = computeBotInput(r, this.localRacers, this.compiledTrack, botIdx++);
        stepVehicle(r, { ...inp, dash: 0 }, this.compiledTrack, dt, now, 99);
      }
      this.syncVisualCarRigs(dt);
      this.updateParticles(dt);

      // Smooth scenic camera ahead & right of the lead pack so cars & road frame the right 60%
      const lead = this.localRacers[0];
      const fwdX = Math.sin(lead.heading);
      const fwdZ = Math.cos(lead.heading);
      const rightX = -Math.cos(lead.heading);
      const rightZ = Math.sin(lead.heading);
      const sway = Math.sin(now * 0.00035) * 4.5;
      const targetX = lead.x + fwdX * 17 + rightX * (13 + sway);
      const targetZ = lead.z + fwdZ * 17 + rightZ * (13 + sway);
      const damp = 1 - Math.exp(-3.4 * dt);
      this.camPos.lerp(_v3A.set(targetX, 8.6, targetZ), damp);
      this.camLook.lerp(_v3B.set(lead.x - rightX * 3.5, 1.1, lead.z - rightZ * 3.5), damp);
      this.camera.position.copy(this.camPos);
      this.camera.lookAt(this.camLook);
    } else if (this.mode === 'garage') {
      const nextRot = stepGarageTurntable(
        {
          angle: this.garageAngle,
          targetAngle: this.garageTargetAngle,
          angularVel: this.garageAngularVel,
        },
        this.garageDragging,
        dt,
      );
      this.garageAngle = nextRot.angle;
      this.garageTargetAngle = nextRot.targetAngle;
      this.garageAngularVel = nextRot.angularVel;
      if (this.garageCarRig) {
        this.garageCarRig.root.rotation.y = this.garageAngle;
      }
      this.applyGarageCameraFraming();
    } else if (this.mode === 'race') {
      this.stepRaceMode(dt, now);
    }

    if (this.rainMesh.visible) {
      this.updateRainParticles(dt);
    }

    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      this.afterDraw(() => {
        if (!this.disposed) {
          this.frameId = requestAnimationFrame(this.tick);
        }
      });
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  private stepRaceMode(dt: number, now: number): void {
    if (!this.paused) {
      // Trauma & hitstop always decay in real dt
      this.trauma = Math.max(0, this.trauma - dt * 1.9);
      if (this.hitstopTimer > 0) {
        this.hitstopTimer = Math.max(0, this.hitstopTimer - dt);
      } else if (this.isOnline) {
        if (this.raceStatus === 'racing') {
          const input = this.sampleLocalInput();
          const sequence = ++this.onlineInputSequence;
          this.onSendOnlineInput?.(input, sequence);
          this.pendingOnlineInputs.push({ sequence, input, dt });
          if (this.pendingOnlineInputs.length > 600) this.pendingOnlineInputs.shift();

          this.elapsedMs += dt * 1000;
          const local = this.localRacers.find((r) => r.id === this.localId);
          if (local) {
            const result = stepVehicle(local, input, this.compiledTrack, dt, this.elapsedMs, this.totalLaps);
            if (result.dashed) soundEngine.playDash();
            if (result.boosted) soundEngine.playBoost();
          }
        }

        const interpAlpha = 1 - Math.exp(-16 * dt);
        for (const r of this.localRacers) {
          if (r.id === this.localId) continue;
          const target = this.onlineTargetRacers.get(r.id);
          if (!target) continue;
          r.x += (target.x - r.x) * interpAlpha;
          r.z += (target.z - r.z) * interpAlpha;
          let dh = target.heading - r.heading;
          while (dh > Math.PI) dh -= Math.PI * 2;
          while (dh < -Math.PI) dh += Math.PI * 2;
          r.heading += dh * interpAlpha;
          r.steerAngle += (target.steerAngle - r.steerAngle) * interpAlpha;
        }
      } else {
        // Local solo physics simulation
        if (this.raceStatus === 'countdown') {
          this.countdownMs -= dt * 1000;
          const sec = Math.ceil(Math.max(0, this.countdownMs) / 1000);
          if (sec !== this.lastCountdownBeep) {
            this.lastCountdownBeep = sec;
            soundEngine.playCountdown(sec <= 0);
          }
          if (this.countdownMs <= 0) {
            this.countdownMs = 0;
            this.raceStatus = 'racing';
          }
        } else if (this.raceStatus === 'racing') {
          this.elapsedMs += dt * 1000;
          const playerInput = this.sampleLocalInput();
          let botIdx = 0;
          for (const r of this.localRacers) {
            const inp = r.isBot
              ? computeBotInput(r, this.localRacers, this.compiledTrack, botIdx++)
              : playerInput;
            const res = stepVehicle(r, inp, this.compiledTrack, dt, this.elapsedMs, this.totalLaps);
            if (r.id === this.localId) {
              if (res.dashed) soundEngine.playDash();
              if (res.boosted) soundEngine.playBoost();
              if (res.lapCompleted) soundEngine.playLap(r.finished);
            }
          }

          const hits = resolveVehicleCollisions(this.localRacers, now);
          for (const h of hits) {
            this.triggerHitEffects(h);
          }

          const obsHits = resolveObstacleCollisions(
            this.localRacers,
            this.compiledTrack,
            this.brokenObstacleUntil,
            now,
          );
          for (const h of obsHits) {
            this.triggerHitEffects(h);
          }

          if (this.builtTrack) {
            for (const [obsId, mesh] of this.builtTrack.obstacleMeshes.entries()) {
              const until = this.brokenObstacleUntil.get(obsId) ?? 0;
              mesh.visible = now >= until;
            }
          }

          updateStandings(this.localRacers);

          const local = this.localRacers.find((r) => r.id === this.localId);
          if (local?.finished) {
            this.raceStatus = 'finished';
            soundEngine.stopEngine();
          }
        }
      }

      if (this.isOnline) {
        const decay = Math.exp(-10 * dt);
        this.onlineVisualCorrection.x *= decay;
        this.onlineVisualCorrection.z *= decay;
        this.onlineVisualCorrection.heading *= decay;
      }

      this.syncVisualCarRigs(dt);
      this.updateParticles(dt);
    }

    // Chase Camera following local car
    const local = this.localRacers.find((r) => r.id === this.localId) ?? this.localRacers[0];
    if (local) {
      const correction =
        this.isOnline && local.id === this.localId ? this.onlineVisualCorrection : null;
      const localX = local.x + (correction?.x ?? 0);
      const localZ = local.z + (correction?.z ?? 0);
      const localHeading = local.heading + (correction?.heading ?? 0);
      const fwdX = Math.sin(localHeading);
      const fwdZ = Math.cos(localHeading);
      const speedRatio = Math.max(0, local.speed) / 60;
      const desiredX = localX - fwdX * (10.8 + speedRatio * 1.8);
      const desiredZ = localZ - fwdZ * (10.8 + speedRatio * 1.8);
      const desiredY = 4.45 + speedRatio * 0.55;

      const camDamp = 1 - Math.exp(-9.5 * dt);
      this.camPos.lerp(_v3A.set(desiredX, desiredY, desiredZ), camDamp);
      this.camLook.lerp(_v3B.set(localX + fwdX * 7.5, 1.35, localZ + fwdZ * 7.5), 1 - Math.exp(-13 * dt));

      // Decaying trauma shake
      const shake = this.trauma * this.trauma;
      const shakeX = (Math.random() - 0.5) * shake * 1.1;
      const shakeY = (Math.random() - 0.5) * shake * 0.7;

      this.camera.position.set(this.camPos.x + shakeX, this.camPos.y + shakeY, this.camPos.z);
      this.camera.lookAt(this.camLook);

      const targetFov = 64 + speedRatio * 11 + (local.boostTimer > 0 ? 6 : 0);
      this.camFov += (targetFov - this.camFov) * Math.min(1, 6 * dt);
      if (Math.abs(this.camera.fov - this.camFov) > 0.05) {
        this.camera.fov = this.camFov;
        this.camera.updateProjectionMatrix();
      }

      // Move directional light shadow frustum with local car along biome sun direction
      const [sx, sy, sz] = this.builtTrack?.palette.sunDirection ?? [0.52, 0.62, 0.42];
      this.keyLight.position.set(local.x + sx * 100, Math.max(25, sy * 120), local.z + sz * 100);
      this.keyLight.target.position.set(local.x, 0, local.z);

      soundEngine.updateEngine(
        speedRatio,
        local.boostTimer > 0 || local.dashTimer > 0,
        !this.paused && this.raceStatus === 'racing',
      );
    }

    if (!this.isOnline && now - this.lastHudEmitAt >= 65) {
      this.lastHudEmitAt = now;
      this.emitHud(Math.ceil(Math.max(0, this.countdownMs) / 1000));
    }
  }

  private emitHud(countdownSec: number): void {
    const local = this.localRacers.find((r) => r.id === this.localId) ?? this.localRacers[0];
    if (!local) return;

    this.onHudUpdate({
      speedKmh: Math.max(0, Math.round(Math.abs(local.speed) * 3.6)),
      position: local.position,
      totalRacers: this.localRacers.length,
      lap: local.lap,
      totalLaps: this.totalLaps,
      elapsedMs: Math.round(this.elapsedMs),
      bestLapMs: local.bestLapMs,
      dashCooldownRatio: Math.max(0, Math.min(1, local.dashCooldown / 1.45)),
      dashDir: local.dashDir,
      ramHits: local.ramHits,
      countdownSec,
      status: this.raceStatus,
      racersMinimap: this.localRacers.map((r) => ({
        id: r.id,
        x: r.x,
        z: r.z,
        isLocal: r.id === this.localId,
        color: r.car.primaryColor,
      })),
      standings: [...this.localRacers].sort((a, b) => a.position - b.position),
      recentRamBanner: this.recentRamBanner,
    });
  }

  private afterDraw(cb: () => void): void {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    if (!gl || !gl.fenceSync) {
      this.frameId = window.setTimeout(cb, 20);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (this.disposed) {
        if (sync) gl.deleteSync(sync);
        return;
      }
      const state = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
      if (state === gl.UNSIGNALED) {
        this.frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        this.frameId = window.setTimeout(cb, 20);
      }
    };
    this.frameId = window.setTimeout(poll, 5);
  }

  private updateRainParticles(dt: number): void {
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    for (let i = 0; i < RAIN_DROP_COUNT; i++) {
      const base = i * 4;
      let y = this.rainOffsets[base + 1] - this.rainOffsets[base + 3] * dt;
      if (y < 0.2) y = 23 + (y % 23);
      this.rainOffsets[base + 1] = y;
      _dummy.position.set(cx + this.rainOffsets[base], y, cz + this.rainOffsets[base + 2]);
      _dummy.rotation.set(0, 0, 0.11);
      _dummy.scale.set(1, 1, 1);
      _dummy.updateMatrix();
      this.rainMesh.setMatrixAt(i, _dummy.matrix);
    }
    this.rainMesh.instanceMatrix.needsUpdate = true;
  }

  public dispose(): void {
    this.disposed = true;
    this.stopGarageThumbnailGeneration();
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.frameId);
    soundEngine.stopEngine();
    soundEngine.stopWeatherAmbience();

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.renderer.domElement.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
    this.resizeObserver.disconnect();

    this.clearRaceCars();
    if (this.garageCarRig) this.garageCarRig.dispose();
    const disposedGeos = new Set<THREE.BufferGeometry>();
    const disposedMats = new Set<THREE.Material>();
    this.garageGroup.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (!disposedGeos.has(mesh.geometry)) {
          disposedGeos.add(mesh.geometry);
          mesh.geometry.dispose();
        }
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          if (!disposedMats.has(m)) {
            disposedMats.add(m);
            const stdMat = m as THREE.MeshBasicMaterial;
            if (stdMat.map && stdMat.map === (this.garageBackdropMesh?.material as THREE.MeshBasicMaterial | undefined)?.map) {
              stdMat.map.dispose();
            }
            m.dispose();
          }
        }
      }
    });
    if (this.builtTrack) this.builtTrack.dispose();
    this.particleMesh.geometry.dispose();
    (this.particleMesh.material as THREE.Material).dispose();
    this.rainMesh.geometry.dispose();
    (this.rainMesh.material as THREE.Material).dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
