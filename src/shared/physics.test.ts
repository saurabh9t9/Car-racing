import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFreehandTrack,
  compileTrack,
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

test('starter tracks compile cleanly with uniform arc-length samples', () => {
  for (const def of STARTER_TRACKS) {
    const compiled = compileTrack(def, 200);
    assert.equal(compiled.samples.length, 200);
    assert.ok(compiled.totalLength > 500, `${def.name} length should exceed 500m`);
    const p0 = compiled.samples[0];
    assert.ok(Math.abs(Math.hypot(p0.tx, p0.tz) - 1) < 1e-4);
    assert.ok(Math.abs(Math.hypot(p0.nx, p0.nz) - 1) < 1e-4);
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


