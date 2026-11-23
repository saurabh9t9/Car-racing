export interface GarageCameraFraming {
  fov: number;
  distance: number;
  shiftX: number;
  camY: number;
  lookY: number;
  backdropX: number;
  statsRightFrac: number;
  projectedCarLeftU: number;
  projectedCarRightU: number;
}

const DEFAULT_CAR_HALF_SPAN = 2.38;
const DEFAULT_CAR_HALF_DEPTH = 1.08;

/**
 * Computes exact perspective camera framing for the 3D garage showcase so the
 * turntable car sits cleanly to the right of the left-hand stats block on
 * landscape screens (from compact mobile landscape to ultrawide desktop) and
 * centers cleanly on portrait screens without overlapping UI or clipping edges.
 */
export function computeGarageCameraFraming(
  viewportWidth: number,
  viewportHeight: number,
  statsRightPx?: number,
): GarageCameraFraming {
  const width = Math.max(320, viewportWidth || 1280);
  const height = Math.max(240, viewportHeight || 720);
  const aspect = width / height;
  const isPortrait = aspect < 1.05;

  const halfSpan = DEFAULT_CAR_HALF_SPAN;
  const halfDepth = DEFAULT_CAR_HALF_DEPTH;

  if (isPortrait) {
    const fov = 42;
    const tanHalfV = Math.tan((fov * Math.PI) / 360);
    const k = 2 * tanHalfV * aspect;
    const targetHalfAvail = 0.44;
    const distance = Math.max(
      8.2,
      Math.min(16.5, (halfSpan + 0.44 * k * halfDepth) / (targetHalfAvail * k)),
    );
    const shiftX = 0;
    const distNear = Math.max(2.0, distance - halfDepth);
    const projectedCarLeftU = 0.5 + (-halfSpan - shiftX) / (k * distNear);
    const projectedCarRightU = 0.5 + (halfSpan - shiftX) / (k * distNear);

    return {
      fov,
      distance,
      shiftX,
      camY: 1.08,
      lookY: 0.16,
      backdropX: 0,
      statsRightFrac: 0,
      projectedCarLeftU,
      projectedCarRightU,
    };
  }

  // Landscape framing: reserve left zone for the 2-column stats panel and place car cleanly to its right
  const fallbackStatsRightPx =
    width <= 740 ? 326 : width <= 960 || height <= 540 ? 378 : 458;
  const effectiveStatsRightPx =
    typeof statsRightPx === 'number' && Number.isFinite(statsRightPx) && statsRightPx > 0
      ? statsRightPx
      : fallbackStatsRightPx;

  const statsRightFrac = Math.max(0.2, Math.min(0.54, effectiveStatsRightPx / width));
  const clearanceMargin = width <= 860 ? 0.025 : 0.035;
  const uMin = Math.min(0.57, statsRightFrac + clearanceMargin);
  const uMax = 0.965;
  const halfAvail = Math.max(0.18, (uMax - uMin) * 0.5);
  const uCenter = (uMin + uMax) * 0.5;

  const fov = aspect > 1.95 ? 36 : 38;
  const tanHalfV = Math.tan((fov * Math.PI) / 360);
  const k = 2 * tanHalfV * aspect;

  // Solve for distance so both near (z = +halfDepth) and far (z = -halfDepth) car corners stay within [uMin, uMax]
  const distRight = (halfSpan + (uMax - 0.5) * k * halfDepth) / (halfAvail * k);
  const distLeftNear = (halfSpan - (uMin - 0.5) * k * halfDepth) / (halfAvail * k);
  const distLeftFar = (halfSpan + (uMin - 0.5) * k * halfDepth) / (halfAvail * k);
  const minDist = aspect > 1.95 ? 7.6 : 7.4;

  const distance = Math.max(minDist, distRight, distLeftNear, distLeftFar);
  const shiftX = -(uCenter - 0.5) * k * distance;

  const distNear = Math.max(2.0, distance - halfDepth);
  const distFar = distance + halfDepth;
  const uNearLeft = 0.5 + (-halfSpan - shiftX) / (k * distNear);
  const uFarLeft = 0.5 + (-halfSpan - shiftX) / (k * distFar);
  const uNearRight = 0.5 + (halfSpan - shiftX) / (k * distNear);
  const uFarRight = 0.5 + (halfSpan - shiftX) / (k * distFar);

  const projectedCarLeftU = Math.min(uNearLeft, uFarLeft);
  const projectedCarRightU = Math.max(uNearRight, uFarRight);

  // Lift the car gently above the bottom dock on short landscape viewports
  const isShortLandscape = height <= 480;
  const lookY = isShortLandscape ? -0.06 : 0.08;
  const camY = lookY + (isShortLandscape ? 0.82 : 0.88);
  const backdropX = shiftX * 0.35;

  return {
    fov,
    distance,
    shiftX,
    camY,
    lookY,
    backdropX,
    statsRightFrac,
    projectedCarLeftU,
    projectedCarRightU,
  };
}

export interface GarageRotationState {
  angle: number;
  targetAngle: number;
  angularVel: number;
}

/**
 * Advances garage car turntable angle with coasting inertia on pointer release
 * and exponential smoothing toward the target angle for jitter-free rotation.
 */
export function stepGarageTurntable(
  state: GarageRotationState,
  dragging: boolean,
  dt: number,
): GarageRotationState {
  const safeDt = Math.max(0.001, Math.min(0.05, dt));
  let targetAngle = state.targetAngle;
  let angularVel = state.angularVel;

  if (!dragging && Math.abs(angularVel) > 0.005) {
    targetAngle += angularVel * safeDt;
    angularVel *= Math.exp(-5.5 * safeDt);
  } else if (!dragging) {
    angularVel = 0;
  }

  const damp = 1 - Math.exp(-22 * safeDt);
  const angle = state.angle + (targetAngle - state.angle) * damp;

  return { angle, targetAngle, angularVel };
}

