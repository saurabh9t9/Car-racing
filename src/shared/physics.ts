import { DEFAULT_MODEL_ID, getCarModelSpec } from './carCatalog';
import { projectOntoTrack, sampleTrackAt } from './trackMath';
import type {
  ChassisId,
  CompiledTrack,
  HitEvent,
  RaceInput,
  RacerState,
  VehicleConfig,
  VehicleStats,
} from './types';

export const STAT_BUDGET = 24;
export const CAR_RADIUS = 1.45;
export const DASH_DURATION = 0.22;
export const DASH_COOLDOWN = 1.45;
export const BOOST_DURATION = 1.15;

export interface OnlineInputFrame {
  sequence: number;
  input: RaceInput;
  dt: number;
}

export interface OnlineVisualCorrection {
  x: number;
  z: number;
  heading: number;
}

export const DEFAULT_CAR_CONFIG: VehicleConfig = {
  modelId: DEFAULT_MODEL_ID,
  chassis: 'coupe',
  wing: 'gt_wing',
  wheels: 'alloy_5',
  primaryColor: '#e2e8f0',
  accentColor: '#ef4444',
  finish: 'metallic',
  stats: {
    speed: 6,
    accel: 6,
    handling: 6,
    ram: 6,
  },
};

export const CHASSIS_MODIFIERS: Record<ChassisId, Partial<VehicleStats>> = {
  coupe: { speed: 0, accel: 1, handling: 1, ram: 0 },
  bruiser: { speed: -1, accel: 0, handling: -1, ram: 3 },
  wedge: { speed: 2, accel: 1, handling: 0, ram: -1 },
};

export function getEffectiveStats(car: VehicleConfig): {
  maxSpeed: number;     // m/s
  accelForce: number;   // m/s^2
  turnRate: number;     // rad/s
  ramForce: number;     // impulse m/s
  lateralGrip: number;
} {
  const modelSpec = getCarModelSpec(car.modelId);
  const mod = modelSpec ? modelSpec.modifiers : CHASSIS_MODIFIERS[car.chassis];
  const spd = Math.max(1, Math.min(13, car.stats.speed + (mod.speed ?? 0)));
  const acc = Math.max(1, Math.min(13, car.stats.accel + (mod.accel ?? 0)));
  const hnd = Math.max(1, Math.min(13, car.stats.handling + (mod.handling ?? 0)));
  const ram = Math.max(1, Math.min(14, car.stats.ram + (mod.ram ?? 0)));
  const dashBonus = modelSpec?.dashPowerBonus ?? 0;

  return {
    maxSpeed: 42 + spd * 2.4,         // 44.4 .. 73.2 m/s (~160 .. 264 km/h)
    accelForce: 20 + acc * 2.2,       // 22.2 .. 48.6 m/s^2
    turnRate: 2.0 + hnd * 0.16,       // 2.16 .. 4.08 rad/s
    ramForce: 16 + ram * 1.9 + dashBonus, // distinct per-model ram knockback
    lateralGrip: 6.2 + hnd * 0.55,
  };
}

export type CarTier = 'B' | 'A' | 'A+' | 'S' | 'S+';

export interface CarPerformanceSummary {
  tier: CarTier;
  rating: number;
  topSpeedKmh: number;
  zeroToHundredSec: number;
  handlingRatio: number; // 0 (grip) .. 1 (agile/drift)
  ramKn: number;
}

export function getCarPerformanceSummary(car: VehicleConfig): CarPerformanceSummary {
  const eff = getEffectiveStats(car);
  const speedNorm = Math.max(0, Math.min(1, (eff.maxSpeed - 44.4) / 28.8));
  const accelNorm = Math.max(0, Math.min(1, (eff.accelForce - 22.2) / 26.4));
  const handleNorm = Math.max(0, Math.min(1, (eff.turnRate - 2.16) / 1.92));
  const ramNorm = Math.max(0, Math.min(1, (eff.ramForce - 17.9) / 28.0));

  const rating = Math.round(
    240 + (speedNorm * 0.40 + accelNorm * 0.28 + handleNorm * 0.22 + ramNorm * 0.14) * 165,
  );

  let tier: CarTier = 'B';
  if (rating >= 332) tier = 'S+';
  else if (rating >= 324) tier = 'S';
  else if (rating >= 316) tier = 'A+';
  else if (rating >= 295) tier = 'A';

  return {
    tier,
    rating,
    topSpeedKmh: Math.round(eff.maxSpeed * 3.6),
    zeroToHundredSec: Number(((100 / 3.6 / eff.accelForce) * 3.2).toFixed(1)),
    handlingRatio: Math.max(0, Math.min(1, handleNorm)),
    ramKn: Number(eff.ramForce.toFixed(1)),
  };
}

export function createGridRacers(
  entries: Array<{ id: string; name: string; isBot: boolean; car: VehicleConfig; ready?: boolean }>,
  track: CompiledTrack,
): RacerState[] {
  const startT = 0.985; // Just behind start/finish line
  return entries.map((entry, idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2 === 0 ? -1 : 1;
    const t = ((startT - row * 0.012) % 1 + 1) % 1;
    const sample = sampleTrackAt(track, t);
    const lateral = col * Math.min(3.4, track.def.roadWidth * 0.22);
    const heading = Math.atan2(sample.tx, sample.tz);

    return {
      id: entry.id,
      name: entry.name,
      isBot: entry.isBot,
      isConnected: true,
      ready: entry.ready ?? true,
      car: entry.car,
      x: sample.x + sample.nx * lateral,
      z: sample.z + sample.nz * lateral,
      vx: 0,
      vz: 0,
      heading,
      speed: 0,
      steerAngle: 0,
      dashTimer: 0,
      dashCooldown: 0,
      dashDir: 0,
      stunTimer: 0,
      boostTimer: 0,
      lap: 1,
      checkpoint: 0,
      trackT: t,
      totalProgress: t - 1, // slightly negative before crossing start line
      finished: false,
      finishTimeMs: null,
      bestLapMs: null,
      lapStartMs: 0,
      ramHits: 0,
      position: idx + 1,
    };
  });
}

/**
 * Advances a single vehicle by dt seconds, updating kinematics, lateral dash,
 * boost pads, road boundaries, and lap/checkpoint state.
 */
export function stepVehicle(
  racer: RacerState,
  input: RaceInput,
  track: CompiledTrack,
  dt: number,
  elapsedMs: number,
  totalLaps: number,
): { dashed: boolean; boosted: boolean; lapCompleted: boolean } {
  const clampedDt = Math.min(Math.max(dt, 0), 0.05);
  if (clampedDt <= 0) return { dashed: false, boosted: false, lapCompleted: false };

  const stats = getEffectiveStats(racer.car);
  let dashed = false;
  let boosted = false;
  let lapCompleted = false;

  // Cooldowns & timers
  racer.dashTimer = Math.max(0, racer.dashTimer - clampedDt);
  racer.dashCooldown = Math.max(0, racer.dashCooldown - clampedDt);
  racer.stunTimer = Math.max(0, racer.stunTimer - clampedDt);
  racer.boostTimer = Math.max(0, racer.boostTimer - clampedDt);

  if (racer.dashTimer <= 0) {
    racer.dashDir = 0;
  }

  // Trigger lateral ram dash
  if (input.dash !== 0 && racer.dashCooldown <= 0 && racer.dashTimer <= 0 && !racer.finished) {
    racer.dashDir = input.dash;
    racer.dashTimer = DASH_DURATION;
    racer.dashCooldown = DASH_COOLDOWN;
    dashed = true;

    const rightX = -Math.cos(racer.heading);
    const rightZ = Math.sin(racer.heading);
    const fwdX = Math.sin(racer.heading);
    const fwdZ = Math.cos(racer.heading);

    // Apply crisp lateral surge + slight forward kick
    const lateralPulse = 24 + racer.car.stats.ram * 0.9;
    racer.vx += rightX * input.dash * lateralPulse + fwdX * 5.5;
    racer.vz += rightZ * input.dash * lateralPulse + fwdZ * 5.5;
  }

  // Heading & steering
  const fwdX = Math.sin(racer.heading);
  const fwdZ = Math.cos(racer.heading);
  const rightX = -Math.cos(racer.heading);
  const rightZ = Math.sin(racer.heading);

  const forwardSpeed = racer.vx * fwdX + racer.vz * fwdZ;
  const lateralSpeed = racer.vx * rightX + racer.vz * rightZ;

  // Steering authority scales with speed (reverse flips steering)
  const speedFactor = Math.min(1, Math.abs(forwardSpeed) / 10);
  const stunMult = racer.stunTimer > 0 ? 0.35 : 1.0;
  const reverseSign = forwardSpeed >= -1 ? 1 : -1;
  // Note: steer = -1 (left) increases heading (+yaw in right-hand Y-up where +Z is 0 and +X is +PI/2)
  const targetSteer = input.steer;
  racer.steerAngle += (targetSteer - racer.steerAngle) * Math.min(1, 14 * clampedDt);
  racer.heading += -racer.steerAngle * stats.turnRate * speedFactor * reverseSign * stunMult * clampedDt;

  // Recompute basis after yaw
  const nFwdX = Math.sin(racer.heading);
  const nFwdZ = Math.cos(racer.heading);
  const nRightX = -Math.cos(racer.heading);
  const nRightZ = Math.sin(racer.heading);

  // Track surface & road width check
  const proj = projectOntoTrack(racer.x, racer.z, track, racer.trackT);
  const halfRoad = track.def.roadWidth * 0.5;
  const absLat = Math.abs(proj.lateralOffset);
  const offRoad = absLat > halfRoad;

  // Boost pad detection
  if (!offRoad && !racer.finished) {
    for (const padT of track.def.boostPads) {
      const diff = Math.abs(proj.t - padT);
      const wrapDiff = Math.min(diff, 1 - diff);
      if (wrapDiff * track.totalLength < 6.5 && absLat < halfRoad * 0.65) {
        if (racer.boostTimer < BOOST_DURATION * 0.7) {
          boosted = true;
        }
        racer.boostTimer = BOOST_DURATION;
      }
    }
  }

  const boostMult = racer.boostTimer > 0 ? 1.28 : 1.0;
  const surfaceMaxSpeed = (offRoad ? stats.maxSpeed * 0.68 : stats.maxSpeed) * boostMult;
  const surfaceDrag = offRoad ? 1.85 : 0.48;

  // Forward acceleration & braking
  let nextFwd = forwardSpeed;
  if (!racer.finished) {
    if (input.throttle > 0) {
      nextFwd += input.throttle * stats.accelForce * (racer.boostTimer > 0 ? 1.45 : 1.0) * clampedDt;
    }
    if (input.brake > 0) {
      if (nextFwd > 1) {
        nextFwd -= input.brake * stats.accelForce * 1.65 * clampedDt;
      } else {
        nextFwd -= input.brake * stats.accelForce * 0.65 * clampedDt; // Reverse
      }
    }
  }

  // Rolling drag + top speed soft cap
  nextFwd *= Math.exp(-surfaceDrag * clampedDt);
  if (nextFwd > surfaceMaxSpeed) {
    nextFwd += (surfaceMaxSpeed - nextFwd) * Math.min(1, 4.5 * clampedDt);
  }
  if (nextFwd < -18) nextFwd = -18;

  // Lateral tire grip (reduced while actively dashing or stunned so ram slides cleanly)
  const grip = racer.dashTimer > 0 ? 1.8 : racer.stunTimer > 0 ? 2.2 : stats.lateralGrip;
  const nextLat = lateralSpeed * Math.exp(-grip * clampedDt);

  racer.vx = nFwdX * nextFwd + nRightX * nextLat;
  racer.vz = nFwdZ * nextFwd + nRightZ * nextLat;

  racer.x += racer.vx * clampedDt;
  racer.z += racer.vz * clampedDt;
  racer.speed = nextFwd;

  // Outer barrier containment (soft wall bounce beyond shoulder)
  const postProj = projectOntoTrack(racer.x, racer.z, track, proj.t);
  const barrierLimit = halfRoad + 4.2;
  if (Math.abs(postProj.lateralOffset) > barrierLimit) {
    const sign = Math.sign(postProj.lateralOffset);
    racer.x = postProj.sample.x + postProj.sample.nx * sign * barrierLimit;
    racer.z = postProj.sample.z + postProj.sample.nz * sign * barrierLimit;
    // Reflect outward velocity component
    const vn = racer.vx * postProj.sample.nx + racer.vz * postProj.sample.nz;
    if (vn * sign > 0) {
      racer.vx -= postProj.sample.nx * vn * 1.35;
      racer.vz -= postProj.sample.nz * vn * 1.35;
      racer.vx *= 0.88;
      racer.vz *= 0.88;
    }
  }

  // Checkpoint & Lap Progression
  const prevT = racer.trackT;
  const currT = postProj.t;
  racer.trackT = currT;

  // Checkpoints at 0.25, 0.50, 0.75
  if (racer.checkpoint === 0 && currT >= 0.20 && currT < 0.45) {
    racer.checkpoint = 1;
  } else if (racer.checkpoint === 1 && currT >= 0.45 && currT < 0.70) {
    racer.checkpoint = 2;
  } else if (racer.checkpoint === 2 && currT >= 0.70 && currT < 0.95) {
    racer.checkpoint = 3;
  }

  // Crossing start/finish line forward (from >0.82 to <0.18)
  if (prevT > 0.82 && currT < 0.18) {
    if (racer.checkpoint >= 3) {
      const lapDuration = Math.max(1000, elapsedMs - racer.lapStartMs);
      if (racer.bestLapMs === null || lapDuration < racer.bestLapMs) {
        racer.bestLapMs = lapDuration;
      }
      racer.lapStartMs = elapsedMs;
      racer.checkpoint = 0;
      lapCompleted = true;

      if (racer.lap >= totalLaps && !racer.finished) {
        racer.finished = true;
        racer.finishTimeMs = elapsedMs;
      } else if (!racer.finished) {
        racer.lap += 1;
      }
    } else if (racer.totalProgress < 0) {
      // Initial start-line crossing right after launch
      racer.lapStartMs = elapsedMs;
    }
  }

  // Continuous progress for ranking
  if (racer.finished) {
    racer.totalProgress = totalLaps + 100 - (racer.finishTimeMs ?? elapsedMs) * 1e-6;
  } else {
    // Handle pre-start behind line (lap=1, checkpoint=0, currT > 0.82 -> slightly negative)
    const effectiveT = racer.checkpoint === 0 && currT > 0.82 ? currT - 1 : currT;
    racer.totalProgress = (racer.lap - 1) + effectiveT;
  }

  return { dashed, boosted, lapCompleted };
}

export function reconcileRacerFromServer(
  predictedRacer: RacerState,
  authoritativeRacer: RacerState,
  acknowledgedSequence: number,
  pendingInputs: OnlineInputFrame[],
  track: CompiledTrack,
  elapsedMs: number,
  totalLaps: number,
  visualCorrection: OnlineVisualCorrection,
): {
  pendingInputs: OnlineInputFrame[];
  elapsedMs: number;
  visualCorrection: OnlineVisualCorrection;
} {
  const unacknowledgedInputs = pendingInputs.filter(
    (frame) => frame.sequence > acknowledgedSequence,
  );
  const renderedX = predictedRacer.x + visualCorrection.x;
  const renderedZ = predictedRacer.z + visualCorrection.z;
  const renderedHeading = predictedRacer.heading + visualCorrection.heading;
  Object.assign(predictedRacer, authoritativeRacer);

  let replayElapsedMs = elapsedMs;
  for (const frame of unacknowledgedInputs) {
    replayElapsedMs += frame.dt * 1000;
    stepVehicle(predictedRacer, frame.input, track, frame.dt, replayElapsedMs, totalLaps);
  }

  const headingDelta = renderedHeading - predictedRacer.heading;
  return {
    pendingInputs: unacknowledgedInputs,
    elapsedMs: replayElapsedMs,
    visualCorrection: {
      x: renderedX - predictedRacer.x,
      z: renderedZ - predictedRacer.z,
      heading: Math.atan2(Math.sin(headingDelta), Math.cos(headingDelta)),
    },
  };
}

/**
 * Resolves car-to-car collisions and applies heavy lateral ram knockback
 * when an attacker collides while dashing.
 */
export function resolveVehicleCollisions(racers: RacerState[], timestamp: number): HitEvent[] {
  const hits: HitEvent[] = [];
  const minDist = CAR_RADIUS * 2;
  const minDistSq = minDist * minDist;

  for (let i = 0; i < racers.length; i++) {
    for (let j = i + 1; j < racers.length; j++) {
      const a = racers[i];
      const b = racers[j];
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const distSq = dx * dx + dz * dz;
      if (distSq >= minDistSq || distSq < 1e-6) continue;

      const dist = Math.sqrt(distSq);
      const nx = dx / dist;
      const nz = dz / dist;
      const overlap = minDist - dist;

      // Separate cars evenly
      a.x -= nx * overlap * 0.52;
      a.z -= nz * overlap * 0.52;
      b.x += nx * overlap * 0.52;
      b.z += nz * overlap * 0.52;

      const aDashing = a.dashTimer > 0;
      const bDashing = b.dashTimer > 0;

      if (aDashing && !bDashing) {
        const force = getEffectiveStats(a.car).ramForce;
        b.vx += nx * force;
        b.vz += nz * force;
        b.stunTimer = 0.28;
        a.vx -= nx * 3.5;
        a.vz -= nz * 3.5;
        a.ramHits += 1;
        hits.push({
          id: `${a.id}-${b.id}-${timestamp}`,
          attackerId: a.id,
          victimId: b.id,
          x: (a.x + b.x) * 0.5,
          z: (a.z + b.z) * 0.5,
          intensity: Math.min(1.5, force / 22),
          timestamp,
        });
      } else if (bDashing && !aDashing) {
        const force = getEffectiveStats(b.car).ramForce;
        a.vx -= nx * force;
        a.vz -= nz * force;
        a.stunTimer = 0.28;
        b.vx += nx * 3.5;
        b.vz += nz * 3.5;
        b.ramHits += 1;
        hits.push({
          id: `${b.id}-${a.id}-${timestamp}`,
          attackerId: b.id,
          victimId: a.id,
          x: (a.x + b.x) * 0.5,
          z: (a.z + b.z) * 0.5,
          intensity: Math.min(1.5, force / 22),
          timestamp,
        });
      } else {
        // Mutual elastic bump (both dashing or neither dashing)
        const rvx = b.vx - a.vx;
        const rvz = b.vz - a.vz;
        const velAlongNormal = rvx * nx + rvz * nz;
        if (velAlongNormal < 0) {
          const impulse = -(1 + 0.55) * velAlongNormal * 0.5;
          a.vx -= nx * impulse;
          a.vz -= nz * impulse;
          b.vx += nx * impulse;
          b.vz += nz * impulse;
          if (Math.abs(velAlongNormal) > 8 || (aDashing && bDashing)) {
            hits.push({
              id: `bump-${a.id}-${b.id}-${timestamp}`,
              attackerId: aDashing ? a.id : b.id,
              victimId: aDashing ? b.id : a.id,
              x: (a.x + b.x) * 0.5,
              z: (a.z + b.z) * 0.5,
              intensity: Math.min(1.2, Math.abs(velAlongNormal) / 14 + 0.35),
              timestamp,
            });
          }
        }
      }
    }
  }

  return hits;
}

export function updateStandings(racers: RacerState[]): void {
  const sorted = [...racers].sort((a, b) => b.totalProgress - a.totalProgress);
  sorted.forEach((r, index) => {
    r.position = index + 1;
  });
}

/**
 * Resolves racer collisions against track obstacles (solid barricades, tire stacks,
 * and breakable traffic cone clusters).
 */
export function resolveObstacleCollisions(
  racers: RacerState[],
  track: CompiledTrack,
  brokenUntilMap: Map<string, number>,
  nowMs: number,
): HitEvent[] {
  const obstacles = track.def.obstacles;
  if (!obstacles || obstacles.length === 0) return [];

  const hits: HitEvent[] = [];
  for (const obs of obstacles) {
    const brokenUntil = brokenUntilMap.get(obs.id) ?? 0;
    if (obs.kind === 'cone_cluster' && nowMs < brokenUntil) continue;

    const sample = sampleTrackAt(track, obs.t);
    const ox = sample.x + sample.nx * obs.lateral;
    const oz = sample.z + sample.nz * obs.lateral;
    const obsRadius = obs.kind === 'barricade' ? 1.55 : obs.kind === 'tire_stack' ? 1.35 : 1.15;
    const minDist = CAR_RADIUS + obsRadius;
    const minDistSq = minDist * minDist;

    for (const r of racers) {
      const dx = r.x - ox;
      const dz = r.z - oz;
      const distSq = dx * dx + dz * dz;
      if (distSq >= minDistSq) continue;

      if (obs.kind === 'cone_cluster') {
        brokenUntilMap.set(obs.id, nowMs + 6000);
        r.vx *= 0.94;
        r.vz *= 0.94;
        hits.push({
          id: `cone-${obs.id}-${r.id}-${nowMs}`,
          attackerId: 'obstacle',
          victimId: r.id,
          x: ox,
          z: oz,
          intensity: 0.45,
          kind: 'cone',
          obstacleId: obs.id,
          timestamp: nowMs,
        });
        break;
      }

      // Solid barrier / tire stack bounce
      const dist = Math.sqrt(distSq);
      const nx = dist > 1e-4 ? dx / dist : -sample.tx;
      const nz = dist > 1e-4 ? dz / dist : -sample.tz;
      const overlap = minDist - dist;
      r.x += nx * (overlap + 0.08);
      r.z += nz * (overlap + 0.08);

      const vn = r.vx * nx + r.vz * nz;
      const impactSpeed = Math.abs(vn);
      if (vn < 0) {
        const bounce = obs.kind === 'tire_stack' ? 1.55 : 1.4;
        r.vx -= nx * vn * bounce;
        r.vz -= nz * vn * bounce;
      }
      const scrub = obs.kind === 'tire_stack' ? 0.72 : 0.58;
      r.vx *= scrub;
      r.vz *= scrub;
      r.stunTimer = Math.max(r.stunTimer, 0.22);

      hits.push({
        id: `obs-${obs.id}-${r.id}-${nowMs}`,
        attackerId: 'obstacle',
        victimId: r.id,
        x: ox,
        z: oz,
        intensity: Math.max(0.55, Math.min(1.4, impactSpeed / 18)),
        kind: 'obstacle',
        obstacleId: obs.id,
        timestamp: nowMs,
      });
    }
  }

  return hits;
}

/**
 * Computes steering, throttle, and opportunistic lateral ram dash for AI racers,
 * including obstacle avoidance around solid barricades and tire stacks.
 */
export function computeBotInput(
  bot: RacerState,
  allRacers: RacerState[],
  track: CompiledTrack,
  botIndex: number,
): RaceInput {
  if (bot.finished) {
    return { throttle: 0, brake: 1, steer: 0, dash: 0 };
  }

  // Look ahead along the spline based on current speed
  const lookAheadMeters = 18 + Math.max(0, bot.speed) * 0.45;
  const lookT = (bot.trackT + lookAheadMeters / track.totalLength) % 1;
  const targetSample = sampleTrackAt(track, lookT);

  // Subtle racing line lateral preference per bot, shifting away from solid obstacles ahead
  const laneSign = (botIndex % 3) - 1; // -1, 0, +1
  let laneOffset = laneSign * Math.min(2.6, track.def.roadWidth * 0.16);

  const obstacles = track.def.obstacles;
  if (obstacles && obstacles.length > 0) {
    const scanSpanT = 42 / track.totalLength;
    for (const obs of obstacles) {
      if (obs.kind === 'cone_cluster') continue;
      let dtAhead = obs.t - bot.trackT;
      if (dtAhead < 0) dtAhead += 1;
      if (dtAhead > 0 && dtAhead < scanSpanT && Math.abs(obs.lateral - laneOffset) < 3.6) {
        // Steer to the clearer side of the road
        laneOffset = obs.lateral >= 0
          ? -Math.min(4.8, track.def.roadWidth * 0.28)
          : Math.min(4.8, track.def.roadWidth * 0.28);
        break;
      }
    }
  }

  const tx = targetSample.x + targetSample.nx * laneOffset;
  const tz = targetSample.z + targetSample.nz * laneOffset;

  const desiredHeading = Math.atan2(tx - bot.x, tz - bot.z);
  let angleDiff = desiredHeading - bot.heading;
  while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
  while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

  // Remember: steer = -1 turns left (+angleDiff), steer = +1 turns right (-angleDiff)
  const steer = Math.max(-1, Math.min(1, -angleDiff * 1.9));
  const sharpCorner = Math.abs(angleDiff) > 0.65 && bot.speed > 38;

  // Opportunistic lateral ram when a rival is beside the bot within 4.5m
  let dash: -1 | 0 | 1 = 0;
  if (bot.dashCooldown <= 0 && bot.speed > 18) {
    const rightX = -Math.cos(bot.heading);
    const rightZ = Math.sin(bot.heading);
    for (const other of allRacers) {
      if (other.id === bot.id) continue;
      const dx = other.x - bot.x;
      const dz = other.z - bot.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 1.8 && dist < 4.6) {
        const sideDot = dx * rightX + dz * rightZ;
        if (Math.abs(sideDot) > 1.3) {
          dash = sideDot > 0 ? 1 : -1;
          break;
        }
      }
    }
  }

  return {
    throttle: sharpCorner ? 0.55 : 0.96,
    brake: sharpCorner ? 0.25 : 0,
    steer,
    dash,
  };
}
