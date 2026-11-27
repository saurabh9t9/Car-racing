export const VOLUME_STORAGE_KEY = 'slipstream_ram_volume_v1';
export const AUDIO_MIX_STORAGE_KEY = 'slipstream_ram_audio_mix_v1';
export const MAX_MASTER_GAIN = 0.42;

export type AudioChannelId = 'master' | 'engine' | 'sfx' | 'ambient';

export interface AudioMixSettings {
  master: number;
  engine: number;
  sfx: number;
  ambient: number;
}

export interface AudioChannelMeta {
  id: AudioChannelId;
  label: string;
  description: string;
}

export const AUDIO_CHANNELS: readonly AudioChannelMeta[] = [
  { id: 'master', label: 'Master Volume', description: 'Overall audio output level' },
  { id: 'engine', label: 'Engine Synth', description: 'Motor RPM, revs & turbo pitch' },
  { id: 'sfx', label: 'Race Effects', description: 'Dash, boost, collisions, countdown & laps' },
  { id: 'ambient', label: 'Weather & Ambient', description: 'Wind breeze, rain, thunder & crickets' },
];

export const DEFAULT_AUDIO_MIX: AudioMixSettings = {
  master: 1,
  engine: 1,
  sfx: 1,
  ambient: 1,
};

export function clampVolume(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.min(1, Math.round(value * 100) / 100));
}

export function volumeToMasterGain(volume: number, muted: boolean, maxGain = MAX_MASTER_GAIN): number {
  if (muted) return 0;
  return clampVolume(volume) * maxGain;
}

export function volumeToChannelGain(volume: number, muted: boolean): number {
  if (muted) return 0;
  return clampVolume(volume);
}

export function normalizeAudioMix(
  raw: Partial<AudioMixSettings> | null | undefined,
  fallbackMaster = 1,
): AudioMixSettings {
  return {
    master: clampVolume(raw?.master ?? fallbackMaster),
    engine: clampVolume(raw?.engine ?? DEFAULT_AUDIO_MIX.engine),
    sfx: clampVolume(raw?.sfx ?? DEFAULT_AUDIO_MIX.sfx),
    ambient: clampVolume(raw?.ambient ?? DEFAULT_AUDIO_MIX.ambient),
  };
}

export function loadSavedVolume(): number {
  try {
    const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (raw !== null) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) {
        return clampVolume(parsed);
      }
    }
  } catch {
    // Storage may be unavailable in private browsing.
  }
  return 1;
}

export function saveVolume(volume: number): void {
  try {
    localStorage.setItem(VOLUME_STORAGE_KEY, String(clampVolume(volume)));
  } catch {
    // Storage may be unavailable in private browsing.
  }
}

export function loadAudioMix(): AudioMixSettings {
  const savedMaster = loadSavedVolume();
  try {
    const raw = localStorage.getItem(AUDIO_MIX_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AudioMixSettings>;
      return normalizeAudioMix(parsed, savedMaster);
    }
  } catch {
    // Storage may be unavailable or malformed.
  }
  return normalizeAudioMix({ master: savedMaster }, savedMaster);
}

export function saveAudioMix(mix: AudioMixSettings): void {
  const normalized = normalizeAudioMix(mix, mix.master);
  saveVolume(normalized.master);
  try {
    localStorage.setItem(AUDIO_MIX_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Storage may be unavailable in private browsing.
  }
}
