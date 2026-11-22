import type { TrackTheme, WeatherPreset } from './types';

export interface WeatherPresetOption {
  id: WeatherPreset;
  label: string;
}

export const WEATHER_PRESETS: readonly WeatherPresetOption[] = [
  { id: 'sunny', label: 'Sunny' },
  { id: 'rainy', label: 'Rainy' },
  { id: 'night', label: 'Night' },
] as const;

export interface EnvironmentLightingProfile {
  theme: TrackTheme;
  weather: WeatherPreset;
  skyMode: 'sky' | 'overcast' | 'night';
  skyColor: number;
  skyZenithColor: number;
  fogColor: number;
  fogNear: number;
  fogFar: number;
  terrainColor: number;
  curbPrimary: string;
  curbSecondary: string;
  ambientSky: number;
  ambientGround: number;
  hemiIntensity: number;
  sunColor: number;
  sunIntensity: number;
  sunDirection: [number, number, number];
  toneMappingExposure: number;
  roadColor: number;
  roadRoughness: number;
  roadMetalness: number;
  hasRain: boolean;
  showStars: boolean;
  lightPostCount: number;
  skyTurbidity: number;
  skyRayleigh: number;
  skyMieCoefficient: number;
  skyMieDirectionalG: number;
}

export function isWeatherPreset(value: unknown): value is WeatherPreset {
  return value === 'sunny' || value === 'rainy' || value === 'night';
}

export function isTrackTheme(value: unknown): value is TrackTheme {
  return (
    value === 'alpine' ||
    value === 'sunset' ||
    value === 'midnight' ||
    value === 'coastal' ||
    value === 'sakura'
  );
}

export function getDefaultWeatherForTheme(theme: TrackTheme): WeatherPreset {
  return theme === 'midnight' ? 'night' : 'sunny';
}

export function resolveEnvironmentLighting(
  theme: TrackTheme,
  weather: WeatherPreset,
): EnvironmentLightingProfile {
  const isSunset = theme === 'sunset';
  const isMidnight = theme === 'midnight';
  const isCoastal = theme === 'coastal';
  const isSakura = theme === 'sakura';

  const curbPrimary = isSunset
    ? '#f59e0b'
    : isMidnight
      ? '#0ea5e9'
      : isCoastal
        ? '#0284c7'
        : isSakura
          ? '#ec4899'
          : '#e63928';
  const curbSecondary = isMidnight ? '#e2e8f0' : '#f8fafc';

  if (weather === 'rainy') {
    return {
      theme,
      weather,
      skyMode: 'overcast',
      skyColor: isSunset ? 0x5c5356 : isMidnight ? 0x293548 : isCoastal ? 0x455f73 : isSakura ? 0x525266 : 0x4b5c70,
      skyZenithColor: isSunset ? 0x3b353c : isMidnight ? 0x161f2e : isCoastal ? 0x243847 : isSakura ? 0x2e2e3d : 0x2b394a,
      fogColor: isSunset ? 0x695f61 : isMidnight ? 0x324054 : isCoastal ? 0x587285 : isSakura ? 0x666478 : 0x5c6f82,
      fogNear: 70,
      fogFar: 320,
      terrainColor: isSunset ? 0xc2b0a3 : isMidnight ? 0x94a3b8 : isCoastal ? 0xb4c2cc : isSakura ? 0xc2b5c4 : 0xb8c7ba,
      curbPrimary,
      curbSecondary,
      ambientSky: isSunset ? 0x8ea0b5 : isSakura ? 0x9fa3bd : 0x7b93ad,
      ambientGround: isSunset ? 0x3b2a24 : isCoastal ? 0x28333a : 0x202936,
      hemiIntensity: 0.72,
      sunColor: 0xcbd8e8,
      sunIntensity: 0.92,
      sunDirection: [0.35, 0.58, 0.42],
      toneMappingExposure: 0.96,
      roadColor: 0x9aa6b5,
      roadRoughness: 0.22,
      roadMetalness: 0.34,
      hasRain: true,
      showStars: false,
      lightPostCount: 24,
      skyTurbidity: 8,
      skyRayleigh: 1.2,
      skyMieCoefficient: 0.01,
      skyMieDirectionalG: 0.7,
    };
  }

  if (weather === 'night') {
    return {
      theme,
      weather,
      skyMode: 'night',
      skyColor: isSunset ? 0x161224 : isSakura ? 0x151326 : isCoastal ? 0x0b1829 : 0x0d1629,
      skyZenithColor: 0x050914,
      fogColor: isSunset ? 0x1e1930 : isSakura ? 0x1c1933 : isCoastal ? 0x102238 : 0x142036,
      fogNear: 120,
      fogFar: 460,
      terrainColor: isSunset ? 0x94828f : isMidnight ? 0xc2d4eb : isSakura ? 0xab9bb8 : isCoastal ? 0x9cb8cf : 0x8ea3bd,
      curbPrimary,
      curbSecondary,
      ambientSky: isSunset ? 0x626ca8 : isSakura ? 0x7a6ea8 : 0x5d82ba,
      ambientGround: isSunset ? 0x1b1521 : isSakura ? 0x1c1724 : 0x141a24,
      hemiIntensity: 0.68,
      sunColor: isSunset ? 0xc4cbff : isSakura ? 0xd8ccff : 0xcbe0ff,
      sunIntensity: 1.15,
      sunDirection: [-0.45, 0.72, 0.35],
      toneMappingExposure: 0.98,
      roadColor: 0xb8c4d4,
      roadRoughness: 0.56,
      roadMetalness: 0.14,
      hasRain: false,
      showStars: true,
      lightPostCount: 28,
      skyTurbidity: 2,
      skyRayleigh: 1,
      skyMieCoefficient: 0.003,
      skyMieDirectionalG: 0.75,
    };
  }

  // weather === 'sunny'
  if (isSunset) {
    return {
      theme,
      weather,
      skyMode: 'sky',
      skyColor: 0xd98a5f,
      skyZenithColor: 0x5c7ca8,
      fogColor: 0xd89368,
      fogNear: 175,
      fogFar: 560,
      terrainColor: 0xffffff,
      curbPrimary,
      curbSecondary,
      ambientSky: 0xffb380,
      ambientGround: 0x6b3e26,
      hemiIntensity: 0.88,
      sunColor: 0xffcf96,
      sunIntensity: 2.0,
      sunDirection: [0.68, 0.16, 0.46],
      toneMappingExposure: 1.1,
      roadColor: 0xffffff,
      roadRoughness: 0.82,
      roadMetalness: 0.08,
      hasRain: false,
      showStars: false,
      lightPostCount: 10,
      skyTurbidity: 6.2,
      skyRayleigh: 2.4,
      skyMieCoefficient: 0.006,
      skyMieDirectionalG: 0.84,
    };
  }

  if (isCoastal) {
    return {
      theme,
      weather,
      skyMode: 'sky',
      skyColor: 0x8cc9f0,
      skyZenithColor: 0x1d70b8,
      fogColor: 0xb8dff5,
      fogNear: 185,
      fogFar: 580,
      terrainColor: 0xffffff,
      curbPrimary,
      curbSecondary,
      ambientSky: 0xd4f0ff,
      ambientGround: 0x5c5342,
      hemiIntensity: 0.94,
      sunColor: 0xfff5de,
      sunIntensity: 2.05,
      sunDirection: [0.48, 0.46, -0.45],
      toneMappingExposure: 1.09,
      roadColor: 0xffffff,
      roadRoughness: 0.8,
      roadMetalness: 0.08,
      hasRain: false,
      showStars: false,
      lightPostCount: 12,
      skyTurbidity: 1.9,
      skyRayleigh: 0.92,
      skyMieCoefficient: 0.0028,
      skyMieDirectionalG: 0.74,
    };
  }

  if (isSakura) {
    return {
      theme,
      weather,
      skyMode: 'sky',
      skyColor: 0xf0c2d8,
      skyZenithColor: 0x5378b5,
      fogColor: 0xe6cad8,
      fogNear: 170,
      fogFar: 540,
      terrainColor: 0xffffff,
      curbPrimary,
      curbSecondary,
      ambientSky: 0xfadce9,
      ambientGround: 0x3b353e,
      hemiIntensity: 0.9,
      sunColor: 0xffe9dc,
      sunIntensity: 1.9,
      sunDirection: [0.62, 0.24, 0.44],
      toneMappingExposure: 1.07,
      roadColor: 0xffffff,
      roadRoughness: 0.82,
      roadMetalness: 0.08,
      hasRain: false,
      showStars: false,
      lightPostCount: 12,
      skyTurbidity: 4.1,
      skyRayleigh: 1.65,
      skyMieCoefficient: 0.0045,
      skyMieDirectionalG: 0.8,
    };
  }

  // Alpine or Midnight Track under Sunny preset
  return {
    theme,
    weather,
    skyMode: 'sky',
    skyColor: 0x7cb3e6,
    skyZenithColor: 0x2e6eb8,
    fogColor: 0xaad0f0,
    fogNear: 175,
    fogFar: 560,
    terrainColor: 0xffffff,
    curbPrimary,
    curbSecondary,
    ambientSky: 0xc2e2ff,
    ambientGround: isMidnight ? 0x334155 : 0x3b4d36,
    hemiIntensity: 0.9,
    sunColor: 0xfff3dc,
    sunIntensity: 1.95,
    sunDirection: [0.55, 0.42, 0.45],
    toneMappingExposure: 1.08,
    roadColor: 0xffffff,
    roadRoughness: 0.82,
    roadMetalness: 0.08,
    hasRain: false,
    showStars: false,
    lightPostCount: 10,
    skyTurbidity: 2.2,
    skyRayleigh: 1.05,
    skyMieCoefficient: 0.003,
    skyMieDirectionalG: 0.76,
  };
}

export type AmbientAudioMode = 'breeze' | 'rain_storm' | 'night_crickets';
export type AmbientEventKind = 'none' | 'thunder' | 'crickets';

export interface AmbientAudioProfile {
  weather: WeatherPreset;
  mode: AmbientAudioMode;
  bedVolume: number;
  bedFilterType: 'bandpass' | 'lowpass';
  bedFilterFreq: number;
  bedFilterQ: number;
  eventKind: AmbientEventKind;
  eventMinIntervalMs: number;
  eventMaxIntervalMs: number;
}

export function resolveAmbientAudioProfile(weather: WeatherPreset): AmbientAudioProfile {
  if (weather === 'rainy') {
    return {
      weather,
      mode: 'rain_storm',
      bedVolume: 0.095,
      bedFilterType: 'lowpass',
      bedFilterFreq: 1450,
      bedFilterQ: 0.55,
      eventKind: 'thunder',
      eventMinIntervalMs: 7000,
      eventMaxIntervalMs: 14000,
    };
  }
  if (weather === 'night') {
    return {
      weather,
      mode: 'night_crickets',
      bedVolume: 0.03,
      bedFilterType: 'lowpass',
      bedFilterFreq: 380,
      bedFilterQ: 0.7,
      eventKind: 'crickets',
      eventMinIntervalMs: 1800,
      eventMaxIntervalMs: 4200,
    };
  }
  return {
    weather: 'sunny',
    mode: 'breeze',
    bedVolume: 0.024,
    bedFilterType: 'bandpass',
    bedFilterFreq: 480,
    bedFilterQ: 0.85,
    eventKind: 'none',
    eventMinIntervalMs: 0,
    eventMaxIntervalMs: 0,
  };
}

export function computeNextAmbientDelayMs(
  profile: AmbientAudioProfile,
  rand = Math.random(),
): number {
  if (profile.eventKind === 'none' || profile.eventMaxIntervalMs <= 0) {
    return 0;
  }
  const r = Math.max(0, Math.min(1, Number.isFinite(rand) ? rand : 0.5));
  const min = Math.max(250, profile.eventMinIntervalMs);
  const max = Math.max(min, profile.eventMaxIntervalMs);
  return Math.round(min + (max - min) * r);
}

