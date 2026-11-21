import fs from 'fs';
import path from 'path';
import { STARTER_TRACKS } from '../src/shared/trackMath';
import type { ObstacleSpec, TrackDefinition, TrackTheme } from '../src/shared/types';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const TRACKS_FILE = path.join(DATA_DIR, 'tracks.json');

let cachedTracks: TrackDefinition[] | null = null;

function ensureStore(): TrackDefinition[] {
  if (cachedTracks) return cachedTracks;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(TRACKS_FILE)) {
      const raw = fs.readFileSync(TRACKS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Always keep fresh built-in starter tracks (including updated obstacles) and preserve community tracks
        const byId = new Map<string, TrackDefinition>();
        for (const t of STARTER_TRACKS) byId.set(t.id, t);
        for (const t of parsed) {
          if (t && !t.isBuiltIn && !byId.has(t.id)) {
            byId.set(t.id, t);
          }
        }
        cachedTracks = Array.from(byId.values());
        return cachedTracks;
      }
    }
  } catch (err) {
    console.warn('Track store load fallback:', err);
  }

  cachedTracks = [...STARTER_TRACKS];
  saveToDisk(cachedTracks);
  return cachedTracks;
}

function saveToDisk(tracks: TrackDefinition[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(TRACKS_FILE, JSON.stringify(tracks, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist tracks:', err);
  }
}

export function listTracks(): TrackDefinition[] {
  const tracks = ensureStore();
  return [...tracks].sort((a, b) => {
    if (a.isBuiltIn && !b.isBuiltIn) return -1;
    if (!a.isBuiltIn && b.isBuiltIn) return 1;
    return b.createdAt - a.createdAt;
  });
}

export function getTrackById(id: string): TrackDefinition | undefined {
  return ensureStore().find((t) => t.id === id);
}

export function createCommunityTrack(input: {
  name: string;
  author: string;
  theme: TrackTheme;
  roadWidth: number;
  controlPoints: Array<{ x: number; z: number }>;
  boostPads: number[];
  obstacles?: ObstacleSpec[];
}): TrackDefinition {
  const tracks = ensureStore();
  const cleanName = input.name.trim().slice(0, 36) || 'Untitled Circuit';
  const cleanAuthor = input.author.trim().slice(0, 24) || 'Community Driver';
  const id = `trk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const roadWidth = Math.max(13, Math.min(24, Number(input.roadWidth) || 18));
  const maxLat = roadWidth * 0.42;

  const cleanObstacles: ObstacleSpec[] = Array.isArray(input.obstacles)
    ? input.obstacles
        .slice(0, 16)
        .filter((o) => o && typeof o.t === 'number' && typeof o.lateral === 'number')
        .map((o, idx) => ({
          id: typeof o.id === 'string' && o.id ? o.id.slice(0, 32) : `${id}-obs-${idx}`,
          t: Math.max(0.05, Math.min(0.95, Number(o.t))),
          lateral: Math.max(-maxLat, Math.min(maxLat, Number(o.lateral))),
          kind:
            o.kind === 'barricade' || o.kind === 'tire_stack' || o.kind === 'cone_cluster'
              ? o.kind
              : 'barricade',
        }))
    : [];

  const newTrack: TrackDefinition = {
    id,
    name: cleanName,
    author: cleanAuthor,
    theme: input.theme,
    roadWidth,
    controlPoints: input.controlPoints.map((p) => ({
      x: Number(p.x),
      z: Number(p.z),
    })),
    boostPads: Array.isArray(input.boostPads)
      ? input.boostPads.filter((t) => typeof t === 'number' && t >= 0 && t < 1).slice(0, 8)
      : [0.15, 0.55],
    obstacles: cleanObstacles,
    isBuiltIn: false,
    createdAt: Date.now(),
  };

  tracks.push(newTrack);
  saveToDisk(tracks);
  return newTrack;
}
