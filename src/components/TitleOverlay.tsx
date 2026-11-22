import React, { useMemo } from 'react';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import CloudRain from 'lucide-react/dist/esm/icons/cloud-rain.js';
import Flag from 'lucide-react/dist/esm/icons/flag.js';
import Moon from 'lucide-react/dist/esm/icons/moon.js';
import Paintbrush from 'lucide-react/dist/esm/icons/paintbrush.js';
import PenTool from 'lucide-react/dist/esm/icons/pen-tool.js';
import Sun from 'lucide-react/dist/esm/icons/sun.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2.js';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x.js';
import { buildTrackPreviewSummary } from '../shared/trackMath';
import type { TrackDefinition, WeatherPreset } from '../shared/types';
import { WEATHER_PRESETS } from '../shared/weather';

interface TitleOverlayProps {
  tracks: TrackDefinition[];
  selectedTrackId: string;
  onSelectTrack: (id: string) => void;
  weather: WeatherPreset;
  onSelectWeather: (weather: WeatherPreset) => void;
  onQuickRace: () => void;
  onOpenMultiplayer: () => void;
  onOpenGarage: () => void;
  onOpenStudio: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

const THEME_LABELS: Record<TrackDefinition['theme'], string> = {
  alpine: 'Alpine Horizon',
  sunset: 'Sunset Canyon',
  midnight: 'Midnight Marina',
  coastal: 'Pacific Coastline',
  sakura: 'Sakura Pass',
};

export const TitleOverlay: React.FC<TitleOverlayProps> = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
  weather,
  onSelectWeather,
  onQuickRace,
  onOpenMultiplayer,
  onOpenGarage,
  onOpenStudio,
  muted,
  onToggleMute,
}) => {
  const activeIdx = Math.max(
    0,
    tracks.findIndex((t) => t.id === selectedTrackId),
  );
  const activeTrack = tracks[activeIdx] ?? tracks[0];

  const preview = useMemo(
    () => (activeTrack ? buildTrackPreviewSummary(activeTrack, 128, 14) : null),
    [activeTrack],
  );

  const cycleTrack = (dir: -1 | 1) => {
    if (tracks.length <= 1) return;
    const nextIdx = (activeIdx + dir + tracks.length) % tracks.length;
    onSelectTrack(tracks[nextIdx].id);
  };

  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-between pointer-events-none overflow-y-auto overflow-x-hidden no-scrollbar select-none">
      {/* Perimeter gradient scrims keeping the center-viewport 3D hero car completely open */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,14,22,0.88) 0%, rgba(10,14,22,0.44) 16%, rgba(10,14,22,0.06) 36%, rgba(10,14,22,0.08) 54%, rgba(10,14,22,0.88) 100%)',
        }}
      />

      {/* Top Header Bar: Brand Lockup on Left, Mute Control on Right */}
      <header className="relative z-10 flex items-start justify-between gap-4 px-5 md:px-10 pt-4 md:pt-6 [@media(max-height:540px)]:px-4 [@media(max-height:540px)]:pt-2 shrink-0">
        <div className="flex flex-col">
          <svg
            viewBox="0 0 380 86"
            className="w-[240px] sm:w-[320px] [@media(max-height:540px)]:w-[190px] h-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
            role="img"
            aria-label="Turbo Drifter"
          >
            <polygon points="4,10 56,10 44,28 0,28" fill="#ff4d2e" />
            <polygon points="64,10 92,10 80,28 52,28" fill="#0ea5e9" />
            <polygon points="100,10 112,10 100,28 88,28" fill="#f8fafc" opacity="0.88" />
            <text
              x="2"
              y="66"
              fill="#f8fafc"
              fontFamily="'Oxanium', sans-serif"
              fontWeight="800"
              fontSize="40"
              letterSpacing="1.2"
            >
              Turbo <tspan fill="#ff4d2e">Drifter</tspan>
            </text>
            <line x1="2" y1="78" x2="368" y2="78" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          </svg>
          <p className="mt-1.5 text-xs md:text-sm text-slate-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] max-w-md hidden sm:block [@media(max-height:540px)]:hidden">
            Tune custom racers, sketch community circuits, and bash rivals off the apex.
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            onToggleMute();
          }}
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          className="pointer-events-auto shrink-0 inline-flex items-center gap-2 px-3 py-2 [@media(max-height:540px)]:px-2.5 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#141820]/95 border border-white/15 text-xs font-semibold text-slate-200 hover:bg-[#1f2634] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          {muted ? (
            <VolumeX className="w-4 h-4 text-slate-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
          <span className="hidden sm:inline">{muted ? 'Sound Off' : 'Sound On'}</span>
        </button>
      </header>

      {/* Bottom Stage: Left Primary/Secondary Actions + Right Circuit & Weather Preview Dock */}
      <div className="relative z-10 mt-auto px-5 md:px-10 pb-4 md:pb-6 [@media(max-height:540px)]:px-4 [@media(max-height:540px)]:pb-2 space-y-3 [@media(max-height:540px)]:space-y-1.5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 [@media(max-height:540px)]:gap-2">
          {/* Action Deck */}
          <div className="pointer-events-auto flex flex-col gap-2.5 [@media(max-height:540px)]:gap-1.5 w-full lg:w-auto lg:min-w-[440px] max-w-xl">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 [@media(max-height:540px)]:gap-1.5">
              <button
                type="button"
                data-start="true"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onQuickRace();
                }}
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 [@media(max-height:540px)]:py-2 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-base md:text-lg [@media(max-height:540px)]:text-sm tracking-wide shadow-[0_8px_24px_rgba(255,77,46,0.3)] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Flag className="w-5 h-5 [@media(max-height:540px)]:w-4 [@media(max-height:540px)]:h-4" />
                <span>Race Now (Solo + AI)</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenMultiplayer();
                }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 [@media(max-height:540px)]:py-2 rounded-lg bg-[#161c26]/95 hover:bg-[#202938] border border-white/15 text-white font-display font-bold text-sm [@media(max-height:540px)]:text-xs tracking-wide transition-colors cursor-pointer whitespace-nowrap"
              >
                <Users className="w-4 h-4 text-[#0ea5e9]" />
                <span>Multiplayer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 [@media(max-height:540px)]:gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenGarage();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#141820]/95 hover:bg-[#202736] border border-white/15 text-slate-100 font-semibold text-sm [@media(max-height:540px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Paintbrush className="w-4 h-4 text-[#f59e0b]" />
                <span>Garage</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenStudio();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#141820]/95 hover:bg-[#202736] border border-white/15 text-slate-100 font-semibold text-sm [@media(max-height:540px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <PenTool className="w-4 h-4 text-emerald-400" />
                <span>Track Studio</span>
              </button>
            </div>
          </div>

          {/* Right-Side Circuit Preview + Weather Dock */}
          <div className="pointer-events-auto w-full lg:w-[440px] rounded-xl bg-[#121722]/95 border border-white/15 p-3.5 md:p-4 [@media(max-height:540px)]:p-2.5 space-y-3 [@media(max-height:540px)]:space-y-1.5 shadow-2xl">
            <div className="flex items-center gap-3">
              {/* Live SVG Circuit Silhouette */}
              {preview && (
                <div className="w-20 h-20 [@media(max-height:540px)]:w-14 [@media(max-height:540px)]:h-14 shrink-0 rounded-lg bg-[#0b0f17] border border-white/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 128 128"
                    className="w-full h-full"
                    role="img"
                    aria-label={`${activeTrack.name} layout`}
                  >
                    <path
                      d={preview.svgPath}
                      fill="none"
                      stroke="rgba(14,165,233,0.3)"
                      strokeWidth="9"
                      strokeLinejoin="round"
                    />
                    <path
                      d={preview.svgPath}
                      fill="none"
                      stroke="#f8fafc"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="title-track-select"
                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                  >
                    Active Circuit ({tracks.length})
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous circuit"
                      onClick={() => cycleTrack(-1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-[#1b2230] border border-white/15 text-slate-200 hover:text-white hover:bg-[#273145] cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next circuit"
                      onClick={() => cycleTrack(1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-[#1b2230] border border-white/15 text-slate-200 hover:text-white hover:bg-[#273145] cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <select
                  id="title-track-select"
                  value={selectedTrackId}
                  onChange={(e) => onSelectTrack(e.target.value)}
                  className="w-full px-3 py-2 [@media(max-height:540px)]:py-1 rounded-lg bg-[#0b0f17] border border-white/15 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#ff4d2e] cursor-pointer"
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.isBuiltIn ? 'Official' : `by ${t.author}`})
                    </option>
                  ))}
                </select>

                {preview && (
                  <p className="font-mono-num text-[11px] text-slate-300 truncate">
                    {THEME_LABELS[activeTrack.theme] ?? activeTrack.theme} · {preview.lengthMeters}m · {preview.cornerCount} corners · {preview.boostCount} boosts
                  </p>
                )}
              </div>
            </div>

            {/* Weather Preset Controls */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
              <span
                id="title-weather-label"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0"
              >
                Weather
              </span>
              <div
                role="group"
                aria-labelledby="title-weather-label"
                className="grid grid-cols-3 gap-1.5 flex-1 max-w-[300px]"
              >
                {WEATHER_PRESETS.map((preset) => {
                  const active = weather === preset.id;
                  const Icon = preset.id === 'sunny' ? Sun : preset.id === 'rainy' ? CloudRain : Moon;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={active}
                      onClick={(e) => {
                        e.currentTarget.blur();
                        onSelectWeather(preset.id);
                      }}
                      className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 [@media(max-height:540px)]:py-1 rounded-md border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#ff4d2e]/20 border-[#ff4d2e] text-white'
                          : 'bg-[#0b0f17] border-white/12 text-slate-300 hover:bg-[#1b2230] hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          preset.id === 'sunny'
                            ? 'text-amber-400'
                            : preset.id === 'rainy'
                              ? 'text-sky-400'
                              : 'text-indigo-300'
                        }`}
                      />
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Single flat control hint line in bottom safe margin */}
        <div className="flex items-center justify-between text-[11px] [@media(max-height:540px)]:text-[10px] text-slate-400 pt-0.5">
          <span>WASD / Arrows Drive · Q / E Lateral Ram Dash · Space Quick Dash · Esc Pause</span>
        </div>
      </div>
    </div>
  );
};
