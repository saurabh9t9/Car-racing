export interface GarageCameraFraming {
  fov: number;
  distance: number;
  shiftX: number;
  camY: number;
  lookY: number;
  backdropX: number;
  backdropY: number;
  backdropScale: number;
  statsRightFrac: number;
  projectedCarLeftU: number;
  projectedCarRightU: number;
}

const DEFAULT_CAR_HALF_SPAN = 2.38;
const PORTRAIT_HERO_HALF_SPAN = 2.16;
const DEFAULT_CAR_HALF_DEPTH = 1.08;

/**
 * Computes exact perspective camera framing for the 3D garage showcase so the
 * turntable car sits grounded on the warehouse concrete floor, cleanly to the right
 * of the left-hand stats block on landscape screens, and zoomed-in & grounded below
 * the stacked details on portrait screens without overlapping UI or clipping edges.
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

  const halfDepth = DEFAULT_CAR_HALF_DEPTH;

  if (isPortrait) {
    const halfSpan = PORTRAIT_HERO_HALF_SPAN;
    const fov = 45;
    const tanHalfV = Math.tan((fov * Math.PI) / 360);
    const k = 2 * tanHalfV * aspect;
    const targetHalfAvail = 0.452;
    const distance = Math.max(
      6.0,
      Math.min(16.0, (halfSpan + targetHalfAvail * k * halfDepth) / (targetHalfAvail * k)),
    );
    const shiftX = 0;
    const distNear = Math.max(2.0, distance - halfDepth);
    const projectedCarLeftU = 0.5 + (-halfSpan - shiftX) / (k * distNear);
    const projectedCarRightU = 0.5 + (halfSpan - shiftX) / (k * distNear);

    // Anchor ground plane (y=0) at ~64.5% from top so tires sit squarely on the concrete floor
    // below the upper-left stacked details and above the bottom carousel dock
    const groundScreenV = 0.645;
    const halfScreenH = distance * tanHalfV;
    const lookY = (groundScreenV - 0.5) * 2 * halfScreenH;
    const camY = lookY + distance * 0.195;

    const backdropDist = distance + 5.8;
    const centerYAtBackdrop = camY + (lookY - camY) * (backdropDist / distance);
    const halfHAtBackdrop = backdropDist * tanHalfV;
    const backdropY = centerYAtBackdrop + 0.04 * halfHAtBackdrop;
    const visibleWAtBackdrop = 2 * halfHAtBackdrop * aspect;
    const backdropScale = Math.min(1.0, Math.max(0.42, (visibleWAtBackdrop * 0.92) / 14.5));

    return {
      fov,
      distance,
      shiftX,
      camY,
      lookY,
      backdropX: 0,
      backdropY,
      backdropScale,
      statsRightFrac: 0,
      projectedCarLeftU,
      projectedCarRightU,
    };
  }

  const halfSpan = DEFAULT_CAR_HALF_SPAN;

  // Landscape framing: left panel is always stacked vertically, leaving generous showcase room
  const isStackedTall = height > 540;
  const fallbackStatsRightPx = isStackedTall
    ? Math.min(315, Math.max(236, Math.round(width * 0.23)))
    : Math.min(252, Math.max(196, Math.round(width * 0.28)));
  const effectiveStatsRightPx =
    typeof statsRightPx === 'number' && Number.isFinite(statsRightPx) && statsRightPx > 0
      ? statsRightPx
      : fallbackStatsRightPx;

  const statsRightFrac = Math.max(0.15, Math.min(0.54, effectiveStatsRightPx / width));
  const clearanceMargin = isStackedTall ? 0.024 : 0.02;
  const uMin = Math.min(0.57, statsRightFrac + clearanceMargin);
  const uMax = 0.968;
  const halfAvail = Math.max(0.18, (uMax - uMin) * 0.5);
  const uCenter = (uMin + uMax) * 0.5;

  const fov = aspect > 1.95 ? 36 : 38;
  const tanHalfV = Math.tan((fov * Math.PI) / 360);
  const k = 2 * tanHalfV * aspect;

  // Solve for distance so both near (z = +halfDepth) and far (z = -halfDepth) car corners stay within [uMin, uMax]
  const distRight = (halfSpan + (uMax - 0.5) * k * halfDepth) / (halfAvail * k);
  const distLeftNear = (halfSpan - (uMin - 0.5) * k * halfDepth) / (halfAvail * k);
  const distLeftFar = (halfSpan + (uMin - 0.5) * k * halfDepth) / (halfAvail * k);
  const minDist = aspect > 1.95 ? 5.35 : width <= 960 ? 5.2 : 5.75;

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

  // Pitch camera down (~11 deg) and place y=0 squarely onto the warehouse concrete floor zone
  const isShortLandscape = height <= 540;
  const groundScreenV = isShortLandscape ? 0.635 : 0.655;
  const halfScreenH = distance * tanHalfV;
  const lookY = (groundScreenV - 0.5) * 2 * halfScreenH;
  const camY = lookY + distance * 0.195;

  const backdropDist = distance + 5.8;
  const centerYAtBackdrop = camY + (lookY - camY) * (backdropDist / distance);
  const halfHAtBackdrop = backdropDist * tanHalfV;
  const backdropY = centerYAtBackdrop + 0.34 * halfHAtBackdrop;
  const visibleWAtBackdrop = 2 * halfHAtBackdrop * aspect;
  const backdropScale = Math.min(1.06, Math.max(0.65, (visibleWAtBackdrop * 0.88) / 16.5));
  const backdropX = shiftX * 0.38;

  return {
    fov,
    distance,
    shiftX,
    camY,
    lookY,
    backdropX,
    backdropY,
    backdropScale,
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

