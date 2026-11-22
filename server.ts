import http from 'http';
import path from 'path';
import compression from 'compression';
import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { createServer as createViteServer } from 'vite';
import { createCommunityTrack, getTrackById, listTracks } from './server/store';
import { compileTrack, STARTER_TRACKS } from './src/shared/trackMath';
import { getDefaultWeatherForTheme, isTrackTheme, isWeatherPreset } from './src/shared/weather';
import { CAR_MODELS } from './src/shared/carCatalog';
import {
  computeBotInput,
  createGridRacers,
  DEFAULT_CAR_CONFIG,
  resolveObstacleCollisions,
  resolveVehicleCollisions,
  stepVehicle,
  updateStandings,
} from './src/shared/physics';
import type {
  ClientMessage,
  CompiledTrack,
  HitEvent,
  RaceInput,
  RacerState,
  RoomConfig,
  RoomSnapshot,
  RoomStatus,
  ServerMessage,
  VehicleConfig,
  WheelId,
  WingId,
} from './src/shared/types';

const PORT = Number(process.env.PORT) || 3000;
const SERVER_TICK_MS = 1000 / 30;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const BOT_NAMES = ['Vortex', 'Kestrel', 'Apex-9', 'Drifter', 'Torque', 'Camber'];
const BOT_FLEET_IDS = [
  'bmw_m3_gtr_e46',
  'mclaren_650s_gt3_2015',
  'cadillac_ctsv_2004',
  'panoz_gtr1_1997',
  'ferrari_sf26_2026',
  'audi_r8c_1999',
];
const BOT_WINGS: WingId[] = ['gt_wing', 'ducktail', 'twin_fin'];
const BOT_WHEELS: WheelId[] = ['alloy_5', 'aero_disc', 'deep_dish'];

interface ConnectedPlayer {
  id: string;
  ws: WebSocket;
  name: string;
  car: VehicleConfig;
  ready: boolean;
  input: RaceInput;
  inputSequence: number;
  inputAck: number;
}

interface Room {
  code: string;
  hostId: string;
  status: RoomStatus;
  countdownMs: number;
  elapsedMs: number;
  config: RoomConfig;
  players: Map<string, ConnectedPlayer>;
  racers: RacerState[];
  compiledTrack: CompiledTrack | null;
  pendingHits: HitEvent[];
  brokenObstacleUntil: Map<string, number>;
  lastTickAt: number;
}

const rooms = new Map<string, Room>();

function makeRoomCode(): string {
  for (let attempt = 0; attempt < 20; attempt++) {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    }
    if (!rooms.has(code)) return code;
  }
  return `RM${Date.now().toString(36).toUpperCase().slice(-4)}`;
}

function makeBotCar(idx: number): VehicleConfig {
  const modelId = BOT_FLEET_IDS[idx % BOT_FLEET_IDS.length];
  const spec = CAR_MODELS.find((m) => m.id === modelId) ?? CAR_MODELS[0];
  return {
    modelId: spec.id,
    chassis: spec.chassis,
    wing: BOT_WINGS[idx % BOT_WINGS.length],
    wheels: BOT_WHEELS[idx % BOT_WHEELS.length],
    primaryColor: spec.primaryColor,
    accentColor: spec.accentColor,
    finish: idx % 2 === 0 ? 'metallic' : 'matte',
    stats: {
      speed: 6,
      accel: 6,
      handling: 6,
      ram: 6,
    },
  };
}

function sendTo(ws: WebSocket, msg: ServerMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

function buildSnapshot(room: Room): RoomSnapshot {
  const racers: RacerState[] =
    room.status === 'waiting'
      ? Array.from(room.players.values()).map((p, idx) => ({
          id: p.id,
          name: p.name,
          isBot: false,
          isConnected: true,
          ready: p.ready,
          car: p.car,
          x: 0,
          z: 0,
          vx: 0,
          vz: 0,
          heading: 0,
          speed: 0,
          steerAngle: 0,
          dashTimer: 0,
          dashCooldown: 0,
          dashDir: 0,
          stunTimer: 0,
          boostTimer: 0,
          lap: 1,
          checkpoint: 0,
          trackT: 0,
          totalProgress: 0,
          finished: false,
          finishTimeMs: null,
          bestLapMs: null,
          lapStartMs: 0,
          ramHits: 0,
          position: idx + 1,
        }))
      : room.racers;

  const now = Date.now();
  const brokenObstacleIds: string[] = [];
  for (const [id, until] of room.brokenObstacleUntil.entries()) {
    if (now < until) brokenObstacleIds.push(id);
  }

  return {
    code: room.code,
    hostId: room.hostId,
    status: room.status,
    countdownSec: Math.ceil(Math.max(0, room.countdownMs) / 1000),
    elapsedMs: Math.round(room.elapsedMs),
    config: room.config,
    racers,
    inputAcks: Object.fromEntries(
      Array.from(room.players.values(), (player) => [player.id, player.inputAck]),
    ),
    hitEvents: room.pendingHits,
    brokenObstacleIds,
  };
}

function broadcastRoom(room: Room): void {
  const snapshot = buildSnapshot(room);
  const payload = JSON.stringify({ type: 'room:state', room: snapshot } satisfies ServerMessage);
  for (const player of room.players.values()) {
    if (player.ws.readyState === WebSocket.OPEN) {
      player.ws.send(payload);
    }
  }
  room.pendingHits = [];
}

function startRaceInRoom(room: Room): void {
  for (const player of room.players.values()) {
    player.input = { throttle: 0, brake: 0, steer: 0, dash: 0 };
    player.inputSequence = 0;
    player.inputAck = 0;
  }

  const trackDef = getTrackById(room.config.trackId) ?? STARTER_TRACKS[0];
  const compiled = compileTrack(trackDef, 240);
  room.compiledTrack = compiled;

  const entries: Array<{ id: string; name: string; isBot: boolean; car: VehicleConfig; ready: boolean }> = [];
  for (const p of room.players.values()) {
    entries.push({
      id: p.id,
      name: p.name,
      isBot: false,
      car: p.car,
      ready: true,
    });
  }

  const maxRacers = 6;
  const botsToAdd = Math.max(0, Math.min(room.config.aiCount, maxRacers - entries.length));
  for (let i = 0; i < botsToAdd; i++) {
    entries.push({
      id: `bot-${i + 1}`,
      name: `${BOT_NAMES[i % BOT_NAMES.length]} (AI)`,
      isBot: true,
      car: makeBotCar(i),
      ready: true,
    });
  }

  room.racers = createGridRacers(entries, compiled);
  room.status = 'countdown';
  room.countdownMs = 3000;
  room.elapsedMs = 0;
  room.pendingHits = [];
  room.brokenObstacleUntil.clear();
  room.lastTickAt = Date.now();
  broadcastRoom(room);
}

// Simulate and broadcast online rooms together at 30Hz.
setInterval(() => {
  const now = Date.now();
  for (const room of rooms.values()) {
    if (room.status !== 'countdown' && room.status !== 'racing') continue;
    const rawDt = (now - room.lastTickAt) / 1000;
    room.lastTickAt = now;
    const dt = Math.min(Math.max(rawDt, 0.001), 0.05);

    if (room.status === 'countdown') {
      room.countdownMs -= dt * 1000;
      if (room.countdownMs <= 0) {
        room.countdownMs = 0;
        room.status = 'racing';
      }
    } else if (room.status === 'racing' && room.compiledTrack) {
      room.elapsedMs += dt * 1000;
      let botCounter = 0;

      for (const racer of room.racers) {
        let input: RaceInput = { throttle: 0, brake: 0, steer: 0, dash: 0 };
        if (racer.isBot) {
          input = computeBotInput(racer, room.racers, room.compiledTrack, botCounter++);
        } else {
          const p = room.players.get(racer.id);
          if (p) {
            input = p.input;
            p.inputAck = p.inputSequence;
            // Consume edge dash trigger once processed
            p.input = { ...p.input, dash: 0 };
          }
        }
        stepVehicle(racer, input, room.compiledTrack, dt, room.elapsedMs, room.config.laps);
      }

      const hits = resolveVehicleCollisions(room.racers, now);
      if (hits.length > 0) {
        room.pendingHits.push(...hits);
      }
      const obsHits = resolveObstacleCollisions(
        room.racers,
        room.compiledTrack,
        room.brokenObstacleUntil,
        now,
      );
      if (obsHits.length > 0) {
        room.pendingHits.push(...obsHits);
      }
      updateStandings(room.racers);

      // End race when all human players have finished
      const humanRacers = room.racers.filter((r) => !r.isBot);
      const allHumansFinished = humanRacers.length > 0 && humanRacers.every((r) => r.finished);
      if (allHumansFinished) {
        room.status = 'finished';
        broadcastRoom(room);
        continue;
      }
    }

    broadcastRoom(room);
  }
}, SERVER_TICK_MS);

async function bootstrap() {
  const app = express();
  app.use(
    compression({
      threshold: 512,
      filter: (req, res) => {
        if (req.path.endsWith('.glb')) return true;
        return compression.filter(req, res);
      },
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, rooms: rooms.size, tracks: listTracks().length });
  });

  app.get('/api/tracks', (_req, res) => {
    res.json({ tracks: listTracks() });
  });

  app.post('/api/tracks', (req, res) => {
    const body = req.body ?? {};
    if (!Array.isArray(body.controlPoints) || body.controlPoints.length < 5) {
      res.status(400).json({ error: 'Track must have at least 5 control points.' });
      return;
    }
    const created = createCommunityTrack({
      name: String(body.name ?? 'Custom Circuit'),
      author: String(body.author ?? 'Driver'),
      theme: isTrackTheme(body.theme) ? body.theme : 'alpine',
      roadWidth: Number(body.roadWidth ?? 18),
      controlPoints: body.controlPoints,
      boostPads: Array.isArray(body.boostPads) ? body.boostPads : [0.15, 0.55],
      obstacles: Array.isArray(body.obstacles) ? body.obstacles : [],
    });
    res.status(201).json({ track: created });
  });

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    const playerId = `ply-${Math.random().toString(36).slice(2, 8)}`;
    let currentRoomCode: string | null = null;

    sendTo(ws, { type: 'welcome', playerId });

    const leaveCurrentRoom = () => {
      if (!currentRoomCode) return;
      const room = rooms.get(currentRoomCode);
      currentRoomCode = null;
      if (!room) return;
      room.players.delete(playerId);
      if (room.players.size === 0) {
        rooms.delete(room.code);
        return;
      }
      if (room.hostId === playerId) {
        const nextHost = room.players.keys().next().value;
        if (nextHost) room.hostId = nextHost;
      }
      broadcastRoom(room);
    };

    ws.on('message', (raw) => {
      let msg: ClientMessage;
      try {
        msg = JSON.parse(raw.toString()) as ClientMessage;
      } catch {
        return;
      }

      if (msg.type === 'room:create') {
        leaveCurrentRoom();
        const code = makeRoomCode();
        const player: ConnectedPlayer = {
          id: playerId,
          ws,
          name: (msg.name || 'Host').trim().slice(0, 18),
          car: msg.car || DEFAULT_CAR_CONFIG,
          ready: true,
          input: { throttle: 0, brake: 0, steer: 0, dash: 0 },
          inputSequence: 0,
          inputAck: 0,
        };
        const initialTrack = (msg.trackId && getTrackById(msg.trackId)) || STARTER_TRACKS[0];
        const room: Room = {
          code,
          hostId: playerId,
          status: 'waiting',
          countdownMs: 0,
          elapsedMs: 0,
          config: {
            trackId: initialTrack.id,
            laps: 3,
            aiCount: 3,
            weather: isWeatherPreset(msg.weather)
              ? msg.weather
              : getDefaultWeatherForTheme(initialTrack.theme),
          },
          players: new Map([[playerId, player]]),
          racers: [],
          compiledTrack: null,
          pendingHits: [],
          brokenObstacleUntil: new Map(),
          lastTickAt: Date.now(),
        };
        rooms.set(code, room);
        currentRoomCode = code;
        sendTo(ws, { type: 'room:joined', room: buildSnapshot(room), playerId });
        return;
      }

      if (msg.type === 'room:join') {
        const code = String(msg.code || '').trim().toUpperCase();
        const room = rooms.get(code);
        if (!room) {
          sendTo(ws, { type: 'room:error', message: `Room "${code}" not found.` });
          return;
        }
        if (room.status !== 'waiting') {
          sendTo(ws, { type: 'room:error', message: 'Race already in progress in that room.' });
          return;
        }
        if (room.players.size >= 6) {
          sendTo(ws, { type: 'room:error', message: 'Room is full (max 6 players).' });
          return;
        }
        leaveCurrentRoom();
        const player: ConnectedPlayer = {
          id: playerId,
          ws,
          name: (msg.name || 'Driver').trim().slice(0, 18),
          car: msg.car || DEFAULT_CAR_CONFIG,
          ready: true,
          input: { throttle: 0, brake: 0, steer: 0, dash: 0 },
          inputSequence: 0,
          inputAck: 0,
        };
        room.players.set(playerId, player);
        currentRoomCode = code;
        sendTo(ws, { type: 'room:joined', room: buildSnapshot(room), playerId });
        broadcastRoom(room);
        return;
      }

      if (!currentRoomCode) return;
      const room = rooms.get(currentRoomCode);
      if (!room) return;
      const player = room.players.get(playerId);
      if (!player) return;

      if (msg.type === 'room:leave') {
        leaveCurrentRoom();
      } else if (msg.type === 'room:update_car') {
        player.name = (msg.name || player.name).trim().slice(0, 18);
        player.car = msg.car;
        broadcastRoom(room);
      } else if (msg.type === 'room:ready') {
        player.ready = Boolean(msg.ready);
        broadcastRoom(room);
      } else if (msg.type === 'room:update_config' && room.hostId === playerId && room.status === 'waiting') {
        if (msg.config.trackId) room.config.trackId = msg.config.trackId;
        if (isWeatherPreset(msg.config.weather)) {
          room.config.weather = msg.config.weather;
        }
        if (typeof msg.config.laps === 'number') {
          room.config.laps = Math.max(1, Math.min(5, Math.round(msg.config.laps)));
        }
        if (typeof msg.config.aiCount === 'number') {
          room.config.aiCount = Math.max(0, Math.min(5, Math.round(msg.config.aiCount)));
        }
        broadcastRoom(room);
      } else if (msg.type === 'room:start' && room.hostId === playerId && room.status === 'waiting') {
        startRaceInRoom(room);
      } else if (msg.type === 'room:rematch' && room.hostId === playerId) {
        room.status = 'waiting';
        room.racers = [];
        room.brokenObstacleUntil.clear();
        broadcastRoom(room);
      } else if (msg.type === 'race:input') {
        if (!Number.isSafeInteger(msg.sequence) || msg.sequence <= player.inputSequence) return;
        player.inputSequence = msg.sequence;
        player.input = {
          throttle: Math.max(0, Math.min(1, Number(msg.input.throttle) || 0)),
          brake: Math.max(0, Math.min(1, Number(msg.input.brake) || 0)),
          steer: Math.max(-1, Math.min(1, Number(msg.input.steer) || 0)),
          dash: msg.input.dash === -1 || msg.input.dash === 1 ? msg.input.dash : (player.input.dash || 0),
        };
      }
    });

    ws.on('close', () => {
      leaveCurrentRoom();
    });
  });

  // Serve optimized 3D car models and textures with long-lived immutable HTTP cache headers
  app.use(
    '/models',
    express.static(path.resolve(process.cwd(), 'public/models'), {
      maxAge: '365d',
      immutable: true,
    }),
  );
  app.use('/models', (_req, res) => {
    res.status(404).end();
  });
  app.use(
    '/src/assets/images',
    express.static(path.resolve(process.cwd(), 'src/assets/images'), {
      maxAge: '365d',
      immutable: true,
    }),
  );
  app.use('/src/assets/images', (_req, res) => {
    res.status(404).end();
  });

  if (process.env.NODE_ENV !== 'production') {
    process.env.DISABLE_HMR = 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use((req, res, next) => {
      if (req.path !== '/@vite/client') {
        next();
        return;
      }
      delete req.headers['if-none-match'];
      const chunks: Buffer[] = [];
      const origWrite = res.write.bind(res);
      const origEnd = res.end.bind(res);
      res.write = ((chunk: unknown, encoding?: BufferEncoding) => {
        if (chunk !== undefined && chunk !== null) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), encoding));
        }
        return true;
      }) as typeof res.write;
      res.end = ((chunk?: unknown, encodingOrCb?: BufferEncoding | (() => void), cb?: () => void) => {
        if (typeof chunk === 'string' || Buffer.isBuffer(chunk)) {
          chunks.push(
            Buffer.isBuffer(chunk)
              ? chunk
              : Buffer.from(chunk, typeof encodingOrCb === 'string' ? encodingOrCb : 'utf8'),
          );
        }
        const callback = typeof encodingOrCb === 'function' ? encodingOrCb : cb;
        const body = Buffer.concat(chunks)
          .toString('utf8')
          .replace('transport.connect(createHMRHandler(handleMessage));', '/* HMR WebSocket disabled */');
        res.removeHeader('Content-Length');
        res.write = origWrite;
        res.end = origEnd;
        return origEnd(body, 'utf8', callback);
      }) as typeof res.end;
      next();
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(
      '/assets',
      express.static(path.join(distDir, 'assets'), {
        maxAge: '30d',
        immutable: true,
      }),
    );
    app.use(express.static(distDir, { maxAge: '1h' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Slipstream Ram server running on http://localhost:${PORT}`);
  });
}

bootstrap();
