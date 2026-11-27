
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import CloudRain from 'lucide-react/dist/esm/icons/cloud-rain.js';
import MapIcon from 'lucide-react/dist/esm/icons/map.js';
import Moon from 'lucide-react/dist/esm/icons/moon.js';
import Sun from 'lucide-react/dist/esm/icons/sun.js';

import { buildTrackCardMetrics } from '../shared/trackMath';
import type { TrackDefinition, TrackTheme, WeatherPreset } from '../shared/types';
import { WEATHER_PRESETS } from '../shared/weather';

const MAP_SELECTION_BG_URL = '/assets/aistudio/mapselectionbg.png';

interface MapSelectModalProps {
  tracks: TrackDefinition[];
  selectedTrackId: string;
  onSelectTrack: (id: string) => void;
  weather: WeatherPreset;
  onSelectWeather: (weather: WeatherPreset) => void;
  onClose: () => void;
}

interface ThemeCardPalette {
  label: string;
  bg: string;
  roadOuter: string;
  roadInner: string;
  dashStroke: string;
  dotColor: string;
}

const THEME_PALETTES: Record<TrackTheme, ThemeCardPalette> = {
  midnight: {
    label: 'Midnight',
    bg: '#162438',
    roadOuter: '#9aa8bc',
    roadInner: '#636f82',
    dashStroke: '#38bdf8',
    dotColor: '#ff4d2e',
  },
  sunset: {
    label: 'Sunset',
    bg: '#52341f',
    roadOuter: '#bfa898',
    roadInner: '#78665a',
    dashStroke: '#fb923c',
    dotColor: '#ff4d2e',
  },
  alpine: {
    label: 'Alpine',
    bg: '#27402a',
    roadOuter: '#b4c2b8',
    roadInner: '#68746c',
    dashStroke: '#38bdf8',
    dotColor: '#ff4d2e',
  },
  coastal: {
    label: 'Coastal',
    bg: '#183a4a',
    roadOuter: '#a6c0cc',
    roadInner: '#5e7480',
    dashStroke: '#22d3ee',
    dotColor: '#ff4d2e',
  },
  sakura: {
    label: 'Sakura',
    bg: '#382238',
    roadOuter: '#c2aebf',
    roadInner: '#756374',
    dashStroke: '#f472b6',
    dotColor: '#ff4d2e',
  },
};

export const MapSelectModal: React.FC<MapSelectModalProps> = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
  weather,
  onSelectWeather,
  onClose,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const dragStateRef = useRef<{
    active: boolean;
    startX: number;
    scrollLeft: number;
    moved: boolean;
  }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const activeIndex = Math.max(
    0,
    tracks.findIndex((t) => t.id === selectedTrackId),
  );

  const activeTrack = tracks[activeIndex] ?? tracks[0];

  const cardEntries = useMemo(
    () =>
      tracks.map((track) => ({
        track,
        metrics: buildTrackCardMetrics(track, 360, 175, 22, 18),
        palette: THEME_PALETTES[track.theme] ?? THEME_PALETTES.alpine,
      })),
    [tracks],
  );

  const scrollToIndex = useCallback(
    (idx: number, behavior: ScrollBehavior = 'smooth') => {
      const card = cardRefs.current[idx];

      if (card) {
        card.scrollIntoView({
          behavior,
          block: 'nearest',
          inline: 'start',
        });
      }
    },
    [],
  );

  // Scroll active track card into view on mount
  useEffect(() => {
    scrollToIndex(activeIndex, 'auto');
  }, [activeIndex, scrollToIndex]);

  const selectByIndex = useCallback(
    (nextIdx: number) => {
      if (tracks.length === 0) return;

      const wrapped =
        ((nextIdx % tracks.length) + tracks.length) % tracks.length;

      onSelectTrack(tracks[wrapped].id);
      scrollToIndex(wrapped, 'smooth');
    },
    [tracks, onSelectTrack, scrollToIndex],
  );

  // Keyboard arrow navigation inside the map carousel
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        selectByIndex(activeIndex - 1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        selectByIndex(activeIndex + 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, selectByIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;

    const el = scrollerRef.current;
    if (!el) return;

    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    const el = scrollerRef.current;

    if (!drag.active || !el) return;

    const dx = e.clientX - drag.startX;

    if (Math.abs(dx) > 6) {
      drag.moved = true;
      el.scrollLeft = drag.scrollLeft - dx;
    }
  };

  const handlePointerUp = () => {
    dragStateRef.current.active = false;
  };

  const indicatorCount = Math.min(tracks.length, 6);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="select-map-title"
      className="fixed inset-0 z-30 flex items-center justify-center px-[max(0.75rem,calc(var(--safe-left)+0.5rem))] py-[max(0.5rem,calc(var(--safe-top)+0.25rem))] sm:p-6 bg-[#080c13]/85"
    >
      {/* INNER MODAL PANEL - BACKGROUND IMAGE ONLY INSIDE THIS DIV */}
      <div
        className="relative w-full max-w-[920px] max-h-[calc(100dvh-1rem)] flex flex-col rounded-2xl border border-orange-500/30 shadow-[0_0_25px_rgba(255,77,46,0.18),0_24px_80px_rgba(0,0,0,0.75)] overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8, 12, 19, 0.48),
              rgba(8, 12, 19, 0.72)
            ),
            url("${MAP_SELECTION_BG_URL}")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-6 py-2.5 sm:py-4 [@media(max-height:540px)]:py-2 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 [@media(max-height:540px)]:py-1 rounded-lg glass-btn-dark text-xs sm:text-sm font-medium text-slate-100 transition-all duration-300 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Back</span>
            </button>

            <div className="min-w-0">
              <div className="font-display text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff4d2e] leading-none">
                Turbo Drifter
              </div>

              <h2
                id="select-map-title"
                className="mt-0.5 font-display text-base sm:text-2xl [@media(max-height:540px)]:text-base font-bold text-white leading-none truncate"
              >
                Select Map
              </h2>
            </div>
          </div>

          {/* Top-right progress indicator: compact counter on narrow phones, dashes on wider viewports */}
          <div className="flex items-center gap-1.5 shrink-0" aria-label="Circuit progress">
            <span className="min-[460px]:hidden px-2 py-0.5 rounded-full glass-btn-subtle font-mono-num text-[11px] font-semibold text-slate-100">
              {activeIndex + 1}/{tracks.length}
            </span>
            <div className="hidden min-[460px]:flex items-center gap-1.5">
              {Array.from({ length: indicatorCount }, (_, idx) => {
                const mappedIdx =
                  tracks.length <= indicatorCount
                    ? idx
                    : Math.round(
                        (idx / Math.max(1, indicatorCount - 1)) *
                          (tracks.length - 1),
                      );

                const isCurrent =
                  tracks.length <= indicatorCount
                    ? idx === activeIndex
                    : Math.round(
                        (activeIndex / Math.max(1, tracks.length - 1)) *
                          (indicatorCount - 1),
                      ) === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Select circuit ${mappedIdx + 1}`}
                    onClick={() => selectByIndex(mappedIdx)}
                    className={`h-1.5 w-5 sm:w-7 rounded-full transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#ff4d2e] shadow-[0_0_12px_rgba(255,77,46,0.9)]'
                        : 'bg-white/20 hover:bg-orange-400/70'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Carousel Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 pt-2.5 sm:pt-5 pb-2.5 sm:pb-4 [@media(max-height:540px)]:pt-2 [@media(max-height:540px)]:pb-2 space-y-2.5 sm:space-y-4 [@media(max-height:540px)]:space-y-2">
          <p className="text-xs sm:text-sm [@media(max-height:540px)]:hidden text-slate-200">
            Swipe through the maps and choose your active circuit.
          </p>

          {/* Horizontal Scrollable Carousel */}
          <div
            ref={scrollerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1 cursor-grab active:cursor-grabbing"
          >
            {cardEntries.map(({ track, metrics, palette }, idx) => {
              const isSelected = track.id === activeTrack?.id;

              return (
                <button
                  key={track.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    if (dragStateRef.current.moved) {
                      dragStateRef.current.moved = false;
                      return;
                    }

                    onSelectTrack(track.id);
                    scrollToIndex(idx, 'smooth');
                  }}
                  className={`group text-left w-[272px] min-[400px]:w-[296px] sm:w-[356px] [@media(max-height:540px)]:w-[248px] shrink-0 snap-start rounded-xl overflow-hidden bg-[#0e131d]/90 border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d2e] ${
                    isSelected
                      ? 'border-[#ff4d2e] shadow-[0_0_0_1px_rgba(255,77,46,0.45),0_0_20px_rgba(255,77,46,0.16)]'
                      : 'border-white/12 hover:border-orange-400/60'
                  }`}
                >
                  {/* Top-Down Circuit Illustration */}
                  <div
                    className="relative h-[126px] sm:h-[176px] [@media(max-height:540px)]:h-[96px] w-full overflow-hidden border-b border-white/10"
                    style={{ backgroundColor: palette.bg }}
                  >
                    <svg
                      viewBox="0 0 360 175"
                      className="w-full h-full block"
                      role="img"
                      aria-label={`${track.name} top-down circuit preview`}
                    >
                      <path
                        d={metrics.svgPath}
                        fill="none"
                        stroke={palette.roadOuter}
                        strokeWidth={22}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />

                      <path
                        d={metrics.svgPath}
                        fill="none"
                        stroke={palette.roadInner}
                        strokeWidth={16.5}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />

                      <path
                        d={metrics.svgPath}
                        fill="none"
                        stroke={palette.dashStroke}
                        strokeWidth={2.5}
                        strokeDasharray="6 6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* BUILT-IN / CUSTOM badge */}
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/65 border border-white/15 font-display text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-white">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: track.isBuiltIn
                            ? palette.dotColor
                            : '#38bdf8',
                        }}
                      />
                      <span>
                        {track.isBuiltIn ? 'Built-In' : 'Custom'}
                      </span>
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white truncate">
                        {track.name}
                      </h3>

                      <MapIcon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isSelected
                            ? 'text-[#ff4d2e]'
                            : 'text-[#38bdf8]'
                        }`}
                      />
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                      {palette.label} · By {track.author}
                    </p>

                    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-1.5 pt-0.5 sm:pt-1 text-[10.5px] sm:text-xs">
                      <div className="flex items-baseline gap-1 sm:gap-1.5 min-w-0">
                        <span className="text-slate-400 shrink-0">
                          Area
                        </span>

                        <span className="font-mono-num font-bold text-slate-100 truncate">
                          {metrics.areaWidthMeters} × {metrics.areaDepthMeters} m
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 sm:gap-1.5 min-w-0">
                        <span className="text-slate-400 shrink-0">
                          Lap
                        </span>

                        <span className="font-mono-num font-bold text-slate-100 truncate">
                          {metrics.lapKmLabel}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 sm:gap-1.5 min-w-0">
                        <span className="text-slate-400 shrink-0">
                          Road
                        </span>

                        <span className="font-mono-num font-bold text-slate-100">
                          {metrics.roadWidth} m
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 sm:gap-1.5 min-w-0">
                        <span className="text-slate-400 shrink-0">
                          <span className="sm:hidden">Boost / Haz</span>
                          <span className="hidden sm:inline">Boosts / hazards</span>
                        </span>

                        <span className="font-mono-num font-bold text-slate-100 whitespace-nowrap">
                          {metrics.boostCount} / {metrics.hazardCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Previous / Active Label / Next Controls */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-0.5 sm:pt-1">
            <button
              type="button"
              aria-label="Previous map"
              onClick={() => selectByIndex(activeIndex - 1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg glass-btn-dark flex items-center justify-center text-slate-200 hover:text-white transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-xs sm:text-sm text-center truncate">
              <span className="font-semibold text-white">
                {activeTrack?.name ?? 'Circuit'}
              </span>

              <span className="text-slate-300">
                {' '}· {tracks.length} maps
              </span>
            </div>

            <button
              type="button"
              aria-label="Next map"
              onClick={() => selectByIndex(activeIndex + 1)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg glass-btn-dark flex items-center justify-center text-slate-200 hover:text-white transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="flex flex-col min-[520px]:flex-row min-[520px]:items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-6 py-2.5 sm:py-4 [@media(max-height:540px)]:py-2 border-t border-white/10 bg-[#0d111a]/75 backdrop-blur-md shrink-0">

          {/* Weather Selector */}
          <div className="flex items-center justify-between min-[520px]:justify-start gap-2">
            <span
              id="map-weather-label"
              className="text-xs font-medium text-slate-300 shrink-0"
            >
              Weather
            </span>

            <div
              role="group"
              aria-labelledby="map-weather-label"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#141925]/80 border border-white/10"
            >
              {WEATHER_PRESETS.map((preset) => {
                const active = weather === preset.id;

                const Icon =
                  preset.id === 'sunny'
                    ? Sun
                    : preset.id === 'rainy'
                      ? CloudRain
                      : Moon;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelectWeather(preset.id)}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 [@media(max-height:540px)]:py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 ${
                      active
                        ? 'glass-btn-orange-soft text-white'
                        : 'glass-btn-subtle border-transparent text-slate-300 hover:text-white'
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

          {/* Return to Main Menu */}
          <button
            type="button"
            onClick={onClose}
            className="w-full min-[520px]:w-auto px-5 sm:px-6 py-2 sm:py-3 [@media(max-height:540px)]:py-1.5 rounded-lg glass-btn-primary text-[#141414] font-display font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.98] whitespace-nowrap"
          >
            Return to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};
