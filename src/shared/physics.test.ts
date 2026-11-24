import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFreehandTrack,
  buildTrackPreviewSummary,
  compileTrack,
  computeTrackTurnSignage,
  FREEHAND_WORLD_SPAN,
  generateAutoSketchLoop,
  MIN_TRACK_LENGTH,
  projectOntoTrack,
  sampleTrackAt,
  STARTER_TRACKS,
} from './trackMath';
import {
  computeBotInput,
  createGridRacers,
  DASH_COOLDOWN,
  DASH_DURATION,
  DEFAULT_CAR_CONFIG,
  getEffectiveStats,
  reconcileRacerFromServer,
  resolveObstacleCollisions,
  resolveVehicleCollisions,
  stepVehicle,
  updateStandings,
} from './physics';

test('starter tracks compile cleanly with uniform arc-length samples and turn signage', () => {
  assert.equal(STARTER_TRACKS.length, 6);
  const longTrackIds = new Set(['pacific-coastline', 'sakura-pass', 'apex-endurance']);
  for (const def of STARTER_TRACKS) {
    const compiled = compileTrack(def, 200);
    assert.equal(compiled.samples.length, 200);
    const minLen = longTrackIds.has(def.id) ? 1000 : 500;
    assert.ok(compiled.totalLength > minLen, `${def.name} length should exceed ${minLen}m`);
    const p0 = compiled.samples[0];
    assert.ok(Math.abs(Math.hypot(p0.tx, p0.tz) - 1) < 1e-4);
    assert.ok(Math.abs(Math.hypot(p0.nx, p0.nz) - 1) < 1e-4);

    const signage = computeTrackTurnSignage(compiled);
    assert.ok(signage.apexChevrons.length >= 2, `${def.name} should detect apex chevrons`);
    assert.ok(signage.brakingBoards.length >= 3, `${def.name} should place 150/100/50 braking boards`);

    const summary = buildTrackPreviewSummary(def);
    assert.ok(summary.svgPath.startsWith('M') && summary.svgPath.endsWith('Z'));
    assert.ok(summary.lengthMeters > minLen);
    assert.ok(summary.cornerCount >= 4);
  }
});

test('freehand track validator accepts clean loops and rejects self-intersecting figure-8s', () => {
  // Clean circle in [0..1]
  const circle = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return { x: 0.5 + Math.cos(a) * 0.35, z: 0.5 + Math.sin(a) * 0.35 };
  });
  const ok = buildFreehandTrack(circle);
  assert.equal(ok.valid, true);
  assert.ok(ok.estimatedLength >= MIN_TRACK_LENGTH);

  // Small loop under 1000m is rejected with minimum length message
  const tinyCircle = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return { x: 0.5 + Math.cos(a) * 0.2, z: 0.5 + Math.sin(a) * 0.2 };
  });
  const tooShort = buildFreehandTrack(tinyCircle);
  assert.equal(tooShort.valid, false);
  assert.match(tooShort.reason ?? '', /1000m/);

  // Self-intersecting bowtie
  const bowtie = [
    { x: 0.2, z: 0.2 },
    { x: 0.8, z: 0.8 },
    { x: 0.8, z: 0.2 },
    { x: 0.2, z: 0.8 },
    { x: 0.2, z: 0.5 },
    { x: 0.5, z: 0.5 },
    { x: 0.8, z: 0.5 },
    { x: 0.5, z: 0.2 },
  ];
  const bad = buildFreehandTrack(bowtie);
  assert.equal(bad.valid, false);
});

test('generateAutoSketchLoop produces diverse valid random circuits all >= 1000m', () => {
  let seed = 1337;
  const seededRng = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x100000000;
  };

  let prevArch: number | undefined;
  const lengths = new Set<number>();
  const archetypes = new Set<number>();

  for (let i = 0; i < 20; i++) {
    const res = generateAutoSketchLoop(seededRng, prevArch);
    const val = buildFreehandTrack(res.points, FREEHAND_WORLD_SPAN);
    assert.equal(val.valid, true, `Auto-sketch iteration ${i} should be valid: ${val.reason}`);
    assert.ok(res.estimatedLength >= MIN_TRACK_LENGTH, `Length ${res.estimatedLength} must be >= 1000m`);
    assert.ok(val.estimatedLength >= MIN_TRACK_LENGTH);
    if (prevArch !== undefined) {
      assert.notEqual(res.archetype, prevArch, 'Consecutive clicks should vary circuit archetype');
    }
    prevArch = res.archetype;
    archetypes.add(res.archetype);
    lengths.add(Math.round(res.estimatedLength));
  }

  assert.ok(archetypes.size >= 4, `Expected >= 4 distinct archetypes, got ${archetypes.size}`);
  assert.ok(lengths.size >= 12, `Expected varied loop lengths across runs, got ${lengths.size}`);
});

test('lateral ram dash activates, enters cooldown, and knocks rival car sideways', () => {
  const track = compileTrack(STARTER_TRACKS[0], 200);
  const racers = createGridRacers(
    [
      { id: 'p1', name: 'Attacker', isBot: false, car: DEFAULT_CAR_CONFIG },
      {
        id: 'p2',
        name: 'Victim',
        isBot: true,
        car: { ...DEFAULT_CAR_CONFIG, chassis: 'wedge' },
      },
    ],
    track,
  );

  // Place Victim directly to the right of Attacker
  const attacker = racers[0];
  const victim = racers[1];
  attacker.x = 0;
  attacker.z = 0;
  attacker.heading = 0; // forward = +Z, right = (-1, 0)
  victim.x = -2.2;
  victim.z = 0;
  victim.heading = 0;

  const stepRes = stepVehicle(
    attacker,
    { throttle: 1, brake: 0, steer: 0, dash: 1 },
    track,
    0.016,
    1000,
    3,
  );
  assert.equal(stepRes.dashed, true);
  assert.ok(attacker.dashTimer > 0 && attacker.dashTimer <= DASH_DURATION);
  assert.ok(attacker.dashCooldown > 0 && attacker.dashCooldown <= DASH_COOLDOWN);

  // Move closer to overlap and resolve collision
  victim.x = attacker.x - 1.8;
  victim.z = attacker.z;
  const hits = resolveVehicleCollisions(racers, 1016);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].attackerId, 'p1');
  assert.equal(attacker.ramHits, 1);
  assert.ok(victim.stunTimer > 0);
  assert.ok(Math.hypot(victim.vx, victim.vz) > 15);
});

test('online reconciliation replays only inputs not yet applied by the server', () => {
  const track = compileTrack(STARTER_TRACKS[0], 200);
  const authoritative = createGridRacers(
    [{ id: 'p1', name: 'Driver', isBot: false, car: DEFAULT_CAR_CONFIG }],
    track,
  )[0];
  const predicted = { ...authoritative, x: 100, z: 100 };
  const acknowledgedFrame = {
    sequence: 1,
    input: { throttle: 1, brake: 0, steer: 0, dash: 0 as const },
    dt: 0.05,
  };
  const pendingFrame = { ...acknowledgedFrame, sequence: 2 };
  const expected = { ...authoritative };
  stepVehicle(expected, pendingFrame.input, track, pendingFrame.dt, 50, 3);

  const visualCorrection = { x: 2, z: -1, heading: Math.PI * 1.9 };
  const renderedBefore = {
    x: predicted.x + visualCorrection.x,
    z: predicted.z + visualCorrection.z,
    heading: predicted.heading + visualCorrection.heading,
  };
  const result = reconcileRacerFromServer(
    predicted,
    authoritative,
    1,
    [acknowledgedFrame, pendingFrame],
    track,
    0,
    3,
    visualCorrection,
  );

  assert.deepEqual(result.pendingInputs, [pendingFrame]);
  assert.equal(result.elapsedMs, 50);
  assert.equal(predicted.x, expected.x);
  assert.equal(predicted.z, expected.z);
  assert.ok(Math.abs(predicted.x + result.visualCorrection.x - renderedBefore.x) < 1e-9);
  assert.ok(Math.abs(predicted.z + result.visualCorrection.z - renderedBefore.z) < 1e-9);
  assert.ok(
    Math.abs(
      Math.atan2(
        Math.sin(predicted.heading + result.visualCorrection.heading - renderedBefore.heading),
        Math.cos(predicted.heading + result.visualCorrection.heading - renderedBefore.heading),
      ),
    ) < 1e-9,
  );
});

test('chassis modifiers and 15-car catalog specs produce distinct effective capabilities', () => {
  const bruiserStats = getEffectiveStats({ ...DEFAULT_CAR_CONFIG, modelId: undefined, chassis: 'bruiser' });
  const wedgeStats = getEffectiveStats({ ...DEFAULT_CAR_CONFIG, modelId: undefined, chassis: 'wedge' });
  assert.ok(bruiserStats.ramForce > wedgeStats.ramForce);
  assert.ok(wedgeStats.maxSpeed > bruiserStats.maxSpeed);

  const ferrariStats = getEffectiveStats({ ...DEFAULT_CAR_CONFIG, modelId: 'ferrari_sf26_2026' });
  const cadillacStats = getEffectiveStats({ ...DEFAULT_CAR_CONFIG, modelId: 'cadillac_ctsv_2004' });
  const mclarenStats = getEffectiveStats({ ...DEFAULT_CAR_CONFIG, modelId: 'mclaren_mcl40_2026' });
  assert.ok(ferrariStats.maxSpeed > cadillacStats.maxSpeed);
  assert.ok(cadillacStats.ramForce > ferrariStats.ramForce);
  assert.ok(mclarenStats.turnRate > cadillacStats.turnRate);
});

test('checkpoint and lap progression advances sequentially and updates standings', () => {
  const track = compileTrack(STARTER_TRACKS[0], 200);
  const racers = createGridRacers(
    [
      { id: 'r1', name: 'Lead', isBot: false, car: DEFAULT_CAR_CONFIG },
      { id: 'r2', name: 'Trail', isBot: true, car: DEFAULT_CAR_CONFIG },
    ],
    track,
  );

  const r1 = racers[0];
  // Simulate stepping through checkpoints 1 -> 2 -> 3 -> start/finish
  const checkpointsT = [0.25, 0.52, 0.78, 0.90, 0.04];
  let elapsed = 5000;
  for (const t of checkpointsT) {
    const s = projectOntoTrack(
      track.samples[Math.floor(t * 200)].x,
      track.samples[Math.floor(t * 200)].z,
      track,
    );
    r1.x = s.sample.x;
    r1.z = s.sample.z;
    elapsed += 4000;
    stepVehicle(r1, { throttle: 0, brake: 0, steer: 0, dash: 0 }, track, 0.016, elapsed, 2);
  }

  assert.equal(r1.lap, 2);
  assert.ok(r1.bestLapMs !== null && r1.bestLapMs > 0);
  updateStandings(racers);
  assert.equal(r1.position, 1);
});

test('obstacle collisions bounce off solid barricades and scatter breakable cone clusters on cooldown', () => {
  const track = compileTrack(STARTER_TRACKS[0], 200);
  const racers = createGridRacers(
    [{ id: 'p1', name: 'Tester', isBot: false, car: DEFAULT_CAR_CONFIG }],
    track,
  );
  const player = racers[0];
  const brokenMap = new Map<string, number>();

  // Test solid barricade collision
  const barricade = track.def.obstacles!.find((o) => o.kind === 'barricade')!;
  const bSample = sampleTrackAt(track, barricade.t);
  player.x = bSample.x + bSample.nx * barricade.lateral - bSample.tx * 1.5;
  player.z = bSample.z + bSample.nz * barricade.lateral - bSample.tz * 1.5;
  player.vx = bSample.tx * 30;
  player.vz = bSample.tz * 30;

  const obsHits = resolveObstacleCollisions(racers, track, brokenMap, 10_000);
  assert.equal(obsHits.length, 1);
  assert.equal(obsHits[0].kind, 'obstacle');
  assert.ok(player.stunTimer > 0);

  // Test breakable cone cluster collision + 6s cooldown
  const cone = track.def.obstacles!.find((o) => o.kind === 'cone_cluster')!;
  const cSample = sampleTrackAt(track, cone.t);
  player.x = cSample.x + cSample.nx * cone.lateral;
  player.z = cSample.z + cSample.nz * cone.lateral;
  player.vx = cSample.tx * 20;
  player.vz = cSample.tz * 20;

  const coneHits1 = resolveObstacleCollisions(racers, track, brokenMap, 10_500);
  assert.equal(coneHits1.length, 1);
  assert.equal(coneHits1[0].kind, 'cone');
  assert.ok((brokenMap.get(cone.id) ?? 0) > 10_500);

  // While broken, second pass does not collide again
  const coneHits2 = resolveObstacleCollisions(racers, track, brokenMap, 12_000);
  assert.equal(coneHits2.length, 0);

  // After 6s cooldown expires, cone respawns
  const coneHits3 = resolveObstacleCollisions(racers, track, brokenMap, 17_000);
  assert.equal(coneHits3.length, 1);
});

test('AI computeBotInput steers away from solid obstacles ahead', () => {
  const track = compileTrack(STARTER_TRACKS[0], 200);
  const barricade = track.def.obstacles!.find((o) => o.kind === 'barricade')!;
  const aheadSample = sampleTrackAt(track, ((barricade.t - 0.03) % 1 + 1) % 1);
  const racers = createGridRacers(
    [{ id: 'bot-0', name: 'Bot', isBot: true, car: DEFAULT_CAR_CONFIG }],
    track,
  );
  const bot = racers[0];
  bot.x = aheadSample.x + aheadSample.nx * barricade.lateral;
  bot.z = aheadSample.z + aheadSample.nz * barricade.lateral;
  bot.heading = Math.atan2(aheadSample.tx, aheadSample.tz);
  bot.speed = 35;
  bot.trackT = aheadSample.t;

  const inp = computeBotInput(bot, racers, track, 1); // botIndex 1 prefers lane 0, obstacle at -4.2 -> steers clear
  assert.ok(Math.abs(inp.steer) > 0.05);
});

test('isValidGlbBuffer accepts binary glTF headers and rejects HTML fallback responses', async () => {
  const { isValidGlbBuffer } = await import('./glbValidation');
  const htmlBytes = new TextEncoder().encode('<!doctype html><html></html>').buffer;
  assert.equal(isValidGlbBuffer(htmlBytes), false);

  const shortBuf = new Uint8Array([0x67, 0x6c, 0x54, 0x46]).buffer;
  assert.equal(isValidGlbBuffer(shortBuf), false);

  const validGlb = new Uint8Array([0x67, 0x6c, 0x54, 0x46, 2, 0, 0, 0, 12, 0, 0, 0]).buffer;
  assert.equal(isValidGlbBuffer(validGlb), true);
});

test('getCarPerformanceSummary computes valid tier, rating, and telemetry metrics', async () => {
  const { getCarPerformanceSummary } = await import('./physics');
  const stock = getCarPerformanceSummary(DEFAULT_CAR_CONFIG);
  assert.ok(stock.rating >= 220 && stock.rating <= 410);
  assert.ok(['B', 'A', 'A+', 'S', 'S+'].includes(stock.tier));
  assert.ok(stock.topSpeedKmh > 160);
  assert.ok(stock.zeroToHundredSec > 1.0 && stock.zeroToHundredSec < 10.0);

  const tunedUp = getCarPerformanceSummary({
    ...DEFAULT_CAR_CONFIG,
    modelId: 'ferrari_sf26_2026',
    stats: { speed: 10, accel: 10, handling: 2, ram: 2 },
  });
  assert.ok(tunedUp.rating > stock.rating);
});

test('hudSettings supports individual per-element positioning, scale, opacity clamping, and normalization', async () => {
  const {
    createDefaultHudSettings,
    HUD_ELEMENT_IDS,
    HUD_LIMITS,
    normalizeHudSettings,
    stepHudOpacity,
    stepHudScale,
    updateHudElement,
  } = await import('./hudSettings');

  const defaults = createDefaultHudSettings();
  assert.equal(HUD_ELEMENT_IDS.length, 12);
  assert.equal(defaults.stats.scale, 1);
  assert.equal(defaults.throttleBtn.opacity, 1);

  // Moving one individual button does not move its neighbors
  const movedThrottle = updateHudElement(defaults, 'throttleBtn', { offsetX: 18, offsetY: -12 });
  assert.equal(movedThrottle.throttleBtn.offsetX, 18);
  assert.equal(movedThrottle.throttleBtn.offsetY, -12);
  assert.equal(movedThrottle.brakeBtn.offsetX, 0);
  assert.equal(movedThrottle.brakeBtn.offsetY, 0);

  const movedPause = updateHudElement(movedThrottle, 'pauseBtn', { offsetX: -120, offsetY: 99 });
  assert.equal(movedPause.pauseBtn.offsetX, HUD_LIMITS.offsetMin);
  assert.equal(movedPause.pauseBtn.offsetY, HUD_LIMITS.offsetMax);
  assert.equal(movedPause.muteBtn.offsetX, 0);
  assert.equal(movedPause.settingsBtn.offsetX, 0);

  // Scale increase / decrease globally & per-element
  const scaledUp = stepHudScale(defaults, 'all', 0.25);
  assert.equal(scaledUp.speedo.scale, 1.25);
  assert.equal(scaledUp.steerLeftBtn.scale, 1.25);
  const scaledDown = stepHudScale(defaults, 'speedo', -1.0);
  assert.equal(scaledDown.speedo.scale, HUD_LIMITS.scaleMin);

  // Opacity decrease / increase with clamping
  const faded = stepHudOpacity(defaults, 'all', -0.45);
  assert.equal(faded.ramRightBtn.opacity, 0.55);
  const minFaded = stepHudOpacity(defaults, 'muteBtn', -5);
  assert.equal(minFaded.muteBtn.opacity, HUD_LIMITS.opacityMin);

  // Normalization recovers safely from partial/corrupt data & legacy batch keys
  const normalized = normalizeHudSettings({
    stats: { offsetX: 12, scale: 99, opacity: -2 },
    leftControls: { offsetX: 8, offsetY: -5, scale: 1.1, opacity: 0.8 },
  });
  assert.equal(normalized.stats.offsetX, 12);
  assert.equal(normalized.stats.scale, HUD_LIMITS.scaleMax);
  assert.equal(normalized.stats.opacity, HUD_LIMITS.opacityMin);
  assert.equal(normalized.throttleBtn.offsetX, 8);
  assert.equal(normalized.brakeBtn.offsetY, -5);
  assert.equal(normalized.minimap.scale, 1);
});

test('all starter track themes and referenced environment GLB and texture assets exist cleanly', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { isValidGlbBuffer } = await import('./glbValidation');

  const themes = new Set(STARTER_TRACKS.map((t) => t.theme));
  assert.equal(themes.has('alpine'), true);
  assert.equal(themes.has('sunset'), true);
  assert.equal(themes.has('midnight'), true);
  assert.equal(themes.has('coastal'), true);
  assert.equal(themes.has('sakura'), true);

  const envSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/game/envAssets.ts'), 'utf8');
  const glbMatches = [...envSrc.matchAll(/file:\s*'(\/models\/env\/[^']+\.glb)'/g)].map((m) => m[1]);
  assert.ok(glbMatches.length >= 25, `Expected >= 25 environment GLB paths, got ${glbMatches.length}`);

  for (const rel of glbMatches) {
    const abs = path.resolve(process.cwd(), 'public', rel.replace(/^\//, ''));
    assert.equal(fs.existsSync(abs), true, `Missing env GLB: ${rel}`);
    const bytes = fs.readFileSync(abs);
    const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    assert.equal(isValidGlbBuffer(buf), true, `Invalid GLB header in ${rel}`);
  }

  const colormapAbs = path.resolve(process.cwd(), 'public/models/env/Textures/colormap.png');
  assert.equal(fs.existsSync(colormapAbs), true, 'Missing city GLB colormap.png');

  const texMatches = [...envSrc.matchAll(/'(\/src\/assets\/images\/[^']+)'/g)].map((m) => m[1]);
  assert.ok(texMatches.length >= 7, `Expected >= 7 environment textures, got ${texMatches.length}`);
  for (const rel of texMatches) {
    const abs = path.resolve(process.cwd(), rel.replace(/^\//, ''));
    assert.equal(fs.existsSync(abs), true, `Missing env texture: ${rel}`);
    assert.ok(fs.statSync(abs).size > 10_000, `Env texture looks empty: ${rel}`);
  }
});

test('weather presets resolve distinct RaceEngine lighting, sky, road surface, and particle profiles', async () => {
  const {
    WEATHER_PRESETS,
    getDefaultWeatherForTheme,
    isTrackTheme,
    isWeatherPreset,
    resolveEnvironmentLighting,
  } = await import('./weather');

  assert.deepEqual(
    WEATHER_PRESETS.map((p) => p.id),
    ['sunny', 'rainy', 'night'],
  );
  assert.equal(isWeatherPreset('sunny'), true);
  assert.equal(isWeatherPreset('rainy'), true);
  assert.equal(isWeatherPreset('night'), true);
  assert.equal(isWeatherPreset('blizzard'), false);

  assert.equal(isTrackTheme('coastal'), true);
  assert.equal(isTrackTheme('sakura'), true);
  assert.equal(isTrackTheme('volcano'), false);

  assert.equal(getDefaultWeatherForTheme('alpine'), 'sunny');
  assert.equal(getDefaultWeatherForTheme('sunset'), 'sunny');
  assert.equal(getDefaultWeatherForTheme('midnight'), 'night');
  assert.equal(getDefaultWeatherForTheme('coastal'), 'sunny');
  assert.equal(getDefaultWeatherForTheme('sakura'), 'sunny');

  for (const theme of ['alpine', 'sunset', 'midnight', 'coastal', 'sakura'] as const) {
    const sunny = resolveEnvironmentLighting(theme, 'sunny');
    const rainy = resolveEnvironmentLighting(theme, 'rainy');
    const night = resolveEnvironmentLighting(theme, 'night');

    assert.equal(sunny.skyMode, 'sky');
    assert.equal(sunny.hasRain, false);
    assert.equal(sunny.showStars, false);
    assert.ok(sunny.sunIntensity >= 1.9);
    assert.ok(sunny.roadRoughness >= 0.8);

    assert.equal(rainy.skyMode, 'overcast');
    assert.equal(rainy.hasRain, true);
    assert.equal(rainy.showStars, false);
    assert.ok(rainy.fogFar < sunny.fogFar, 'Rainy fog should reduce visibility compared to sunny');
    assert.ok(rainy.roadRoughness <= 0.25, 'Rainy asphalt should be wet and reflective');
    assert.ok(rainy.roadMetalness >= 0.3);
    assert.ok(rainy.lightPostCount >= 20);

    assert.equal(night.skyMode, 'night');
    assert.equal(night.hasRain, false);
    assert.equal(night.showStars, true);
    assert.ok(night.lightPostCount >= 24);
    assert.notEqual(night.fogColor, sunny.fogColor);
  }

  const { computeNextAmbientDelayMs, resolveAmbientAudioProfile } = await import('./weather');
  const sunnyAudio = resolveAmbientAudioProfile('sunny');
  const rainyAudio = resolveAmbientAudioProfile('rainy');
  const nightAudio = resolveAmbientAudioProfile('night');

  assert.equal(sunnyAudio.mode, 'breeze');
  assert.equal(sunnyAudio.eventKind, 'none');
  assert.equal(computeNextAmbientDelayMs(sunnyAudio, 0.5), 0);

  assert.equal(rainyAudio.mode, 'rain_storm');
  assert.equal(rainyAudio.eventKind, 'thunder');
  assert.ok(rainyAudio.bedVolume > sunnyAudio.bedVolume);
  assert.equal(computeNextAmbientDelayMs(rainyAudio, 0), rainyAudio.eventMinIntervalMs);
  assert.equal(computeNextAmbientDelayMs(rainyAudio, 1), rainyAudio.eventMaxIntervalMs);

  assert.equal(nightAudio.mode, 'night_crickets');
  assert.equal(nightAudio.eventKind, 'crickets');
  assert.equal(computeNextAmbientDelayMs(nightAudio, 0), nightAudio.eventMinIntervalMs);
  assert.equal(computeNextAmbientDelayMs(nightAudio, 1), nightAudio.eventMaxIntervalMs);
  assert.ok(nightAudio.eventMaxIntervalMs < rainyAudio.eventMinIntervalMs);
});

test('buildTrackCardMetrics computes rounded arena area, km lap length, counts, and SVG path', async () => {
  const { buildTrackCardMetrics } = await import('./trackMath');
  const marina = STARTER_TRACKS.find((t) => t.id === 'midnight-marina')!;
  const canyon = STARTER_TRACKS.find((t) => t.id === 'canyon-switchback')!;

  const marinaMetrics = buildTrackCardMetrics(marina);
  assert.ok(marinaMetrics.svgPath.startsWith('M') && marinaMetrics.svgPath.endsWith('Z'));
  assert.equal(marinaMetrics.areaWidthMeters, 330);
  assert.equal(marinaMetrics.areaDepthMeters, 250);
  assert.equal(marinaMetrics.lapKmLabel, '1.0 km');
  assert.equal(marinaMetrics.roadWidth, 20);
  assert.equal(marinaMetrics.boostCount, 4);
  assert.equal(marinaMetrics.hazardCount, 5);

  const canyonMetrics = buildTrackCardMetrics(canyon);
  assert.ok(canyonMetrics.svgPath.startsWith('M') && canyonMetrics.svgPath.endsWith('Z'));
  assert.equal(canyonMetrics.areaWidthMeters, 310);
  assert.equal(canyonMetrics.areaDepthMeters, 290);
  assert.equal(canyonMetrics.lapKmLabel, '1.1 km');
  assert.equal(canyonMetrics.roadWidth, 17);
  assert.equal(canyonMetrics.boostCount, 3);
  assert.equal(canyonMetrics.hazardCount, 5);
});

test('computeGarageCameraFraming prevents 3D car from overlapping left stats panel across viewports', async () => {
  const { computeGarageCameraFraming } = await import('./garageCamera');

  const landscapeCases: Array<{ label: string; w: number; h: number; statsRightPx: number }> = [
    { label: 'desktop 1920x1080 stacked', w: 1920, h: 1080, statsRightPx: 320 },
    { label: 'desktop 1440x900 stacked', w: 1440, h: 900, statsRightPx: 318 },
    { label: 'laptop 1280x720 stacked', w: 1280, h: 720, statsRightPx: 304 },
    { label: 'preview 1000x800 stacked', w: 1000, h: 800, statsRightPx: 260 },
    { label: 'tablet 1024x576 stacked', w: 1024, h: 576, statsRightPx: 260 },
    { label: 'phone landscape 844x390', w: 844, h: 390, statsRightPx: 360 },
    { label: 'compact landscape 740x390', w: 740, h: 390, statsRightPx: 332 },
    { label: 'small phone landscape 667x375', w: 667, h: 375, statsRightPx: 318 },
  ];

  for (const c of landscapeCases) {
    const frame = computeGarageCameraFraming(c.w, c.h, c.statsRightPx);
    assert.ok(
      frame.projectedCarLeftU > frame.statsRightFrac + 0.015,
      `${c.label}: car left (${frame.projectedCarLeftU.toFixed(3)}) must stay right of stats (${frame.statsRightFrac.toFixed(3)})`,
    );
    assert.ok(
      frame.projectedCarRightU <= 0.975,
      `${c.label}: car right (${frame.projectedCarRightU.toFixed(3)}) must not clip right viewport edge`,
    );
    assert.ok(frame.shiftX < 0, `${c.label}: camera must shift left so car moves into right showcase zone`);
    assert.ok(
      frame.camY > frame.lookY + 0.85 && frame.lookY >= 0.15,
      `${c.label}: camera must pitch downward onto floor (camY=${frame.camY.toFixed(2)}, lookY=${frame.lookY.toFixed(2)})`,
    );
  }

  // Stacked left panel on taller screens allows a meaningfully closer camera (~15-20% closer)
  const stackedDesktop = computeGarageCameraFraming(1280, 720, 304);
  const wideTwoColDesktop = computeGarageCameraFraming(1280, 720, 440);
  assert.ok(
    stackedDesktop.distance <= wideTwoColDesktop.distance * 0.87,
    `Stacked panel (${stackedDesktop.distance.toFixed(2)}) should bring car noticeably closer than 2-col (${wideTwoColDesktop.distance.toFixed(2)})`,
  );

  const portrait = computeGarageCameraFraming(390, 844);
  assert.equal(portrait.shiftX, 0);
  assert.ok(portrait.projectedCarLeftU >= 0.04 && portrait.projectedCarRightU <= 0.96);
  assert.ok(
    portrait.distance <= 13.0,
    `Portrait car should zoom closer (distance=${portrait.distance.toFixed(2)})`,
  );
  assert.ok(
    portrait.camY > portrait.lookY && portrait.lookY >= 1.2,
    `Portrait camera must ground tires onto lower floor zone (camY=${portrait.camY.toFixed(2)}, lookY=${portrait.lookY.toFixed(2)})`,
  );
});

test('stepGarageTurntable smoothly damps toward target and coasts with decaying inertia', async () => {
  const { stepGarageTurntable } = await import('./garageCamera');

  // While dragging, angle approaches targetAngle smoothly without overshooting
  const dragged = stepGarageTurntable(
    { angle: 0, targetAngle: 1.0, angularVel: 3.0 },
    true,
    0.016,
  );
  assert.ok(dragged.angle > 0.2 && dragged.angle < 1.0);
  assert.equal(dragged.targetAngle, 1.0);

  // After release, angularVel advances targetAngle and decays toward 0
  let s = { angle: 1.0, targetAngle: 1.0, angularVel: 6.0 };
  for (let i = 0; i < 60; i++) {
    s = stepGarageTurntable(s, false, 0.016);
  }
  assert.ok(s.targetAngle > 1.5, 'Turntable should coast smoothly after release');
  assert.ok(Math.abs(s.angularVel) < 0.2, 'Angular velocity should decay cleanly');
});




