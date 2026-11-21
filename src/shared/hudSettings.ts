export type HudElementId =
  | 'stats'
  | 'speedo'
  | 'settingsBtn'
  | 'muteBtn'
  | 'pauseBtn'
  | 'minimap'
  | 'throttleBtn'
  | 'brakeBtn'
  | 'ramLeftBtn'
  | 'ramRightBtn'
  | 'steerLeftBtn'
  | 'steerRightBtn';

export interface HudElementConfig {
  offsetX: number; // Percentage of viewport width (-75 .. 75)
  offsetY: number; // Percentage of viewport height (-75 .. 75)
  scale: number;   // Size multiplier (0.6 .. 1.5)
  opacity: number; // Opacity (0.2 .. 1.0)
}

export type HudSettings = Record<HudElementId, HudElementConfig>;

export const HUD_ELEMENT_IDS: HudElementId[] = [
  'stats',
  'speedo',
  'settingsBtn',
  'muteBtn',
  'pauseBtn',
  'minimap',
  'throttleBtn',
  'brakeBtn',
  'ramLeftBtn',
  'ramRightBtn',
  'steerLeftBtn',
  'steerRightBtn',
];

export const HUD_ELEMENT_LABELS: Record<HudElementId, string> = {
  stats: 'Telemetry',
  speedo: 'Speedometer',
  settingsBtn: 'HUD Gear',
  muteBtn: 'Audio',
  pauseBtn: 'Pause',
  minimap: 'Minimap',
  throttleBtn: 'Throttle',
  brakeBtn: 'Brake',
  ramLeftBtn: 'Ram Left',
  ramRightBtn: 'Ram Right',
  steerLeftBtn: 'Steer Left',
  steerRightBtn: 'Steer Right',
};

export const HUD_LIMITS = {
  offsetMin: -75,
  offsetMax: 75,
  scaleMin: 0.6,
  scaleMax: 1.5,
  opacityMin: 0.2,
  opacityMax: 1.0,
} as const;

export const HUD_SETTINGS_STORAGE_KEY = 'slipstream_ram_hud_settings_v1';

const DEFAULT_CFG: HudElementConfig = { offsetX: 0, offsetY: 0, scale: 1, opacity: 1 };

export function createDefaultHudSettings(): HudSettings {
  return {
    stats: { ...DEFAULT_CFG },
    speedo: { ...DEFAULT_CFG },
    settingsBtn: { ...DEFAULT_CFG },
    muteBtn: { ...DEFAULT_CFG },
    pauseBtn: { ...DEFAULT_CFG },
    minimap: { ...DEFAULT_CFG },
    throttleBtn: { ...DEFAULT_CFG },
    brakeBtn: { ...DEFAULT_CFG },
    ramLeftBtn: { ...DEFAULT_CFG },
    ramRightBtn: { ...DEFAULT_CFG },
    steerLeftBtn: { ...DEFAULT_CFG },
    steerRightBtn: { ...DEFAULT_CFG },
  };
}

function clamp(val: number, min: number, max: number): number {
  if (!Number.isFinite(val)) return min;
  return Math.max(min, Math.min(max, val));
}

export function clampHudElementConfig(
  raw: Partial<HudElementConfig> | undefined,
  fallback: HudElementConfig,
): HudElementConfig {
  if (!raw || typeof raw !== 'object') return { ...fallback };
  return {
    offsetX: Number(
      clamp(
        typeof raw.offsetX === 'number' ? raw.offsetX : fallback.offsetX,
        HUD_LIMITS.offsetMin,
        HUD_LIMITS.offsetMax,
      ).toFixed(1),
    ),
    offsetY: Number(
      clamp(
        typeof raw.offsetY === 'number' ? raw.offsetY : fallback.offsetY,
        HUD_LIMITS.offsetMin,
        HUD_LIMITS.offsetMax,
      ).toFixed(1),
    ),
    scale: Number(
      clamp(
        typeof raw.scale === 'number' ? raw.scale : fallback.scale,
        HUD_LIMITS.scaleMin,
        HUD_LIMITS.scaleMax,
      ).toFixed(2),
    ),
    opacity: Number(
      clamp(
        typeof raw.opacity === 'number' ? raw.opacity : fallback.opacity,
        HUD_LIMITS.opacityMin,
        HUD_LIMITS.opacityMax,
      ).toFixed(2),
    ),
  };
}

const LEGACY_GROUP_MAP: Partial<Record<HudElementId, string>> = {
  settingsBtn: 'utility',
  muteBtn: 'utility',
  pauseBtn: 'utility',
  throttleBtn: 'leftControls',
  brakeBtn: 'leftControls',
  ramLeftBtn: 'rightControls',
  ramRightBtn: 'rightControls',
  steerLeftBtn: 'rightControls',
  steerRightBtn: 'rightControls',
};

export function normalizeHudSettings(raw: unknown): HudSettings {
  const defaults = createDefaultHudSettings();
  if (!raw || typeof raw !== 'object') return defaults;
  const rec = raw as Record<string, Partial<HudElementConfig> | undefined>;
  for (const id of HUD_ELEMENT_IDS) {
    const legacyKey = LEGACY_GROUP_MAP[id];
    const source = rec[id] ?? (legacyKey ? rec[legacyKey] : undefined);
    defaults[id] = clampHudElementConfig(source, defaults[id]);
  }
  return defaults;
}

export function loadHudSettings(): HudSettings {
  try {
    const raw = localStorage.getItem(HUD_SETTINGS_STORAGE_KEY);
    if (!raw) return createDefaultHudSettings();
    return normalizeHudSettings(JSON.parse(raw));
  } catch {
    return createDefaultHudSettings();
  }
}

export function saveHudSettings(settings: HudSettings): void {
  try {
    localStorage.setItem(HUD_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

export function updateHudElement(
  settings: HudSettings,
  target: HudElementId | 'all',
  patch: Partial<HudElementConfig>,
): HudSettings {
  const next: HudSettings = { ...settings };
  const ids = target === 'all' ? HUD_ELEMENT_IDS : [target];
  for (const id of ids) {
    next[id] = clampHudElementConfig({ ...settings[id], ...patch }, settings[id]);
  }
  return next;
}

export function stepHudScale(
  settings: HudSettings,
  target: HudElementId | 'all',
  delta: number,
): HudSettings {
  const next: HudSettings = { ...settings };
  const ids = target === 'all' ? HUD_ELEMENT_IDS : [target];
  for (const id of ids) {
    next[id] = clampHudElementConfig(
      { scale: settings[id].scale + delta },
      settings[id],
    );
  }
  return next;
}

export function stepHudOpacity(
  settings: HudSettings,
  target: HudElementId | 'all',
  delta: number,
): HudSettings {
  const next: HudSettings = { ...settings };
  const ids = target === 'all' ? HUD_ELEMENT_IDS : [target];
  for (const id of ids) {
    next[id] = clampHudElementConfig(
      { opacity: settings[id].opacity + delta },
      settings[id],
    );
  }
  return next;
}
