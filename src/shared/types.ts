export type ChassisId = 'coupe' | 'bruiser' | 'wedge';
export type WingId = 'none' | 'ducktail' | 'gt_wing' | 'twin_fin';
export type WheelId = 'alloy_5' | 'aero_disc' | 'deep_dish';
export type PaintFinish = 'metallic' | 'matte';

export interface VehicleStats {
  speed: number;    // 1..10
  accel: number;    // 1..10
  handling: number; // 1..10
  ram: number;      // 1..10
}

export interface VehicleConfig {
  modelId?: string;
  chassis: ChassisId;
  wing: WingId;
  wheels: WheelId;
  primaryColor: string;
  accentColor: string;
  finish: PaintFinish;
  stats: VehicleStats;
}

export type TrackTheme = 'alpine' | 'sunset' | 'midnight';

export type ObstacleKind = 'barricade' | 'tire_stack' | 'cone_cluster';

export interface ObstacleSpec {
  id: string;
  t: number;       // Normalized spline t in [0, 1)
  lateral: number; // Offset from road center in meters
  kind: ObstacleKind;
}

export interface TrackPoint {
  x: number;
  z: number;
}

export interface TrackDefinition {
  id: string;
  name: string;
  author: string;
  theme: TrackTheme;
  roadWidth: number;
  controlPoints: TrackPoint[];
  boostPads: number[]; // Normalized spline t values in [0, 1)
  obstacles?: ObstacleSpec[];
  isBuiltIn?: boolean;
  createdAt: number;
}

export interface TrackSample {
  x: number;
  z: number;
  tx: number; // Unit forward tangent X
  tz: number; // Unit forward tangent Z
  nx: number; // Unit right-hand normal X (perpendicular to tangent)
  nz: number; // Unit right-hand normal Z
  t: number;  // Normalized [0, 1)
  s: number;  // Cumulative arc length in meters
}

export interface CompiledTrack {
  def: TrackDefinition;
  samples: TrackSample[];
  totalLength: number;
}

export interface RaceInput {
  throttle: number; // 0..1
  brake: number;    // 0..1
  steer: number;    // -1 (left) .. +1 (right)
  dash: -1 | 0 | 1; // -1 left ram, +1 right ram
}

export interface RacerState {
  id: string;
  name: string;
  isBot: boolean;
  isConnected: boolean;
  ready: boolean;
  car: VehicleConfig;
  // Kinematic pose
  x: number;
  z: number;
  vx: number;
  vz: number;
  heading: number; // Radians, 0 = +Z, yaw around +Y: forward = (sin(h), cos(h))
  speed: number;   // Scalar forward/signed speed m/s
  steerAngle: number;
  // Dash state
  dashTimer: number;     // >0 while active ram dash
  dashCooldown: number;  // >0 while recharging
  dashDir: -1 | 0 | 1;
  stunTimer: number;     // >0 after getting rammed
  boostTimer: number;    // >0 after hitting a boost pad
  // Race progress
  lap: number;           // 1-based current lap
  checkpoint: number;    // 0, 1, 2, 3 passed in current lap
  trackT: number;        // Current normalized spline position [0, 1)
  totalProgress: number; // Continuous sortable progress = (lap - 1) + trackT_wrapped
  finished: boolean;
  finishTimeMs: number | null;
  bestLapMs: number | null;
  lapStartMs: number;
  ramHits: number;
  position: number;      // 1-based rank
}

export interface HitEvent {
  id: string;
  attackerId: string;
  victimId: string;
  x: number;
  z: number;
  intensity: number; // 0.5..1.5
  kind?: 'ram' | 'obstacle' | 'cone';
  obstacleId?: string;
  timestamp: number;
}

export type RoomStatus = 'waiting' | 'countdown' | 'racing' | 'finished';

export interface RoomConfig {
  trackId: string;
  laps: number;
  aiCount: number;
}

export interface RoomSnapshot {
  code: string;
  hostId: string;
  status: RoomStatus;
  countdownSec: number;
  elapsedMs: number;
  config: RoomConfig;
  racers: RacerState[];
  inputAcks?: Record<string, number>;
  hitEvents: HitEvent[];
  brokenObstacleIds?: string[];
}

export type ClientMessage =
  | { type: 'room:create'; name: string; car: VehicleConfig; trackId?: string }
  | { type: 'room:join'; code: string; name: string; car: VehicleConfig }
  | { type: 'room:leave' }
  | { type: 'room:update_car'; name: string; car: VehicleConfig }
  | { type: 'room:update_config'; config: Partial<RoomConfig> }
  | { type: 'room:ready'; ready: boolean }
  | { type: 'room:start' }
  | { type: 'room:rematch' }
  | { type: 'race:input'; input: RaceInput; sequence: number };

export type ServerMessage =
  | { type: 'welcome'; playerId: string }
  | { type: 'room:joined'; room: RoomSnapshot; playerId: string }
  | { type: 'room:state'; room: RoomSnapshot }
  | { type: 'room:error'; message: string };
