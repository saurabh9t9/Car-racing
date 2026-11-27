import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2.js';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw.js';
import SlidersHorizontal from 'lucide-react/dist/esm/icons/sliders-horizontal.js';
import {
  CAR_MODELS,
  DEFAULT_MODEL_ID,
  getCarModelSpec,
  type CarCategory,
  type CarModelSpec,
} from '../shared/carCatalog';
import {
  DEFAULT_CAR_CONFIG,
  getCarPerformanceSummary,
  STAT_BUDGET,
  type CarTier,
} from '../shared/physics';
import type { VehicleConfig, VehicleStats } from '../shared/types';

interface GarageModalProps {
  car: VehicleConfig;
  playerName: string;
  modelLoading?: boolean;
  thumbnails?: Record<string, string>;
  onChangeName: (name: string) => void;
  onChangeCar: (car: VehicleConfig) => void;
  onStatsBoundsChange?: (rightPx: number) => void;
  onClose: () => void;
}

type CategoryFilter = 'All' | CarCategory;

const CATEGORY_TABS: CategoryFilter[] = ['All', 'GT3', 'GT1', 'Formula', 'Touring'];
const TIER_ORDER: CarTier[] = ['B', 'A', 'A+', 'S', 'S+'];

const TIER_COLORS: Record<CarTier, string> = {
  B: 'bg-sky-500 text-slate-950',
  A: 'bg-amber-400 text-slate-950',
  'A+': 'bg-orange-500 text-white',
  S: 'bg-emerald-500 text-slate-950',
  'S+': 'bg-rose-500 text-white',
};

const STAT_META: Array<{ key: keyof VehicleStats; label: string }> = [
  { key: 'speed', label: 'Top Speed' },
  { key: 'accel', label: 'Acceleration' },
  { key: 'handling', label: 'Handling' },
  { key: 'ram', label: 'Ram Impact' },
];

function buildModelConfig(baseCar: VehicleConfig, spec: CarModelSpec): VehicleConfig {
  return {
    ...baseCar,
    modelId: spec.id,
    chassis: spec.chassis,
    primaryColor: spec.primaryColor,
    accentColor: spec.accentColor,
  };
}

export const GarageModal: React.FC<GarageModalProps> = ({
  car,
  playerName,
  modelLoading = false,
  thumbnails = {},
  onChangeName,
  onChangeCar,
  onStatsBoundsChange,
  onClose,
}) => {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [cardPage, setCardPage] = useState<'specs' | 'tune'>('specs');
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const leftDetailsRef = useRef<HTMLDivElement | null>(null);
  const onStatsBoundsChangeRef = useRef(onStatsBoundsChange);
  onStatsBoundsChangeRef.current = onStatsBoundsChange;

  useEffect(() => {
    const el = leftDetailsRef.current;
    if (!el) return;
    const report = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        onStatsBoundsChangeRef.current?.(Math.ceil(rect.right));
      }
    };
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    window.addEventListener('resize', report);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', report);
      onStatsBoundsChangeRef.current?.(0);
    };
  }, []);

  const activeModelId = car.modelId ?? DEFAULT_MODEL_ID;
  const activeSpec = getCarModelSpec(activeModelId) ?? CAR_MODELS[0];

  const summariesById = useMemo(() => {
    const map: Record<string, ReturnType<typeof getCarPerformanceSummary>> = {};
    for (const m of CAR_MODELS) {
      map[m.id] = getCarPerformanceSummary(buildModelConfig(car, m));
    }
    return map;
  }, [car.stats.speed, car.stats.accel, car.stats.handling, car.stats.ram, car.modelId]);

  const activeSummary =
    summariesById[activeSpec.id] ?? getCarPerformanceSummary(buildModelConfig(car, activeSpec));

  const filteredModels = useMemo(() => {
    const base =
      category === 'All' ? [...CAR_MODELS] : CAR_MODELS.filter((m) => m.category === category);

    base.sort((a, b) => (summariesById[b.id]?.rating ?? 0) - (summariesById[a.id]?.rating ?? 0));
    return base;
  }, [category, summariesById]);

  const selectedIndex = Math.max(
    0,
    filteredModels.findIndex((m) => m.id === activeSpec.id),
  );

  const selectModel = (spec: CarModelSpec) => {
    onChangeCar(buildModelConfig(car, spec));
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(`[data-model-id="${activeSpec.id}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeSpec.id, category]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        e.preventDefault();
        if (filteredModels.length === 0) return;
        const prevIdx = (selectedIndex - 1 + filteredModels.length) % filteredModels.length;
        selectModel(filteredModels[prevIdx]);
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        e.preventDefault();
        if (filteredModels.length === 0) return;
        const nextIdx = (selectedIndex + 1) % filteredModels.length;
        selectModel(filteredModels[nextIdx]);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredModels, selectedIndex, onClose]);

  const usedPoints = car.stats.speed + car.stats.accel + car.stats.handling + car.stats.ram;
  const remaining = STAT_BUDGET - usedPoints;

  const handleStatChange = (key: keyof VehicleStats, nextVal: number) => {
    const clamped = Math.max(2, Math.min(10, nextVal));
    const currentVal = car.stats[key];
    const delta = clamped - currentVal;
    if (delta > remaining) {
      const capped = currentVal + remaining;
      if (capped === currentVal) return;
      onChangeCar({ ...car, stats: { ...car.stats, [key]: capped } });
      return;
    }
    onChangeCar({ ...car, stats: { ...car.stats, [key]: clamped } });
  };

  const nudgeCarousel = (dir: -1 | 1) => {
    if (filteredModels.length === 0) return;
    const nextIdx = (selectedIndex + dir + filteredModels.length) % filteredModels.length;
    selectModel(filteredModels[nextIdx]);
  };

  const shortYear = activeSpec.year.slice(-2);

  return (
    <div
      data-testid="garage-modal"
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between px-[max(1rem,calc(var(--safe-left)+0.75rem))] sm:px-[max(1.5rem,calc(var(--safe-left)+1.25rem))] md:px-8 pt-[max(0.625rem,calc(var(--safe-top)+0.25rem))] pb-[max(0.625rem,calc(var(--safe-bottom)+0.25rem))] sm:py-4 md:py-5 [@media(max-height:540px)]:px-[max(0.75rem,calc(var(--safe-left)+0.5rem))] [@media(max-height:540px)]:pt-[max(0.3rem,calc(var(--safe-top)+0.15rem))] [@media(max-height:540px)]:pb-[max(0.3rem,calc(var(--safe-bottom)+0.15rem))] overflow-hidden select-none"
    >
      {/* Subtle left-edge readability scrim behind all left-side details */}
      <div
        className="fixed inset-y-0 left-0 w-[clamp(220px,36vw,420px)] max-w-lg pointer-events-none -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(12,9,8,0.88) 0%, rgba(12,9,8,0.52) 62%, rgba(12,9,8,0) 100%)',
        }}
      />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <h2 className="font-display text-base sm:text-xl md:text-2xl [@media(max-height:540px)]:text-base font-bold tracking-wider uppercase text-stone-100 drop-shadow shrink-0">
            GARAGE
          </h2>
          {modelLoading && (
            <span className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-sm glass-btn-subtle text-[10px] sm:text-[11px] font-medium text-stone-100 truncate max-w-[140px] sm:max-w-none">
              <Loader2 className="w-3 h-3 animate-spin text-orange-400 shrink-0" />
              <span className="truncate">Loading...</span>
            </span>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 [@media(max-height:540px)]:px-2.5 [@media(max-height:540px)]:py-0.5 rounded-sm glass-btn-dark">
            <label
              htmlFor="garage-driver-name"
              className="text-[9.5px] sm:text-[11px] [@media(max-height:540px)]:text-[9px] uppercase tracking-wider font-semibold text-stone-400"
            >
              DRIVER
            </label>
            <input
              id="garage-driver-name"
              type="text"
              maxLength={18}
              value={playerName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Apex Driver"
              className="w-20 min-[400px]:w-24 sm:w-36 [@media(max-height:540px)]:w-24 bg-transparent text-xs sm:text-sm [@media(max-height:540px)]:text-[11px] font-semibold text-stone-100 focus:outline-none border-b border-transparent focus:border-orange-400"
            />
          </div>
        </div>
      </div>

      {/* Middle Hero Stage: Always Vertically Stacked Car Info (Top) + Car Stats & Tune Setup (Bottom) */}
      <div className="flex-1 min-h-0 flex items-start pt-1.5 [@media(min-aspect-ratio:105/100)]:items-center [@media(min-aspect-ratio:105/100)]:pt-0 justify-start py-1 sm:py-2 [@media(max-height:540px)]:py-0">
        <div
          ref={leftDetailsRef}
          data-testid="garage-left-details"
          className="pointer-events-auto flex flex-col items-stretch w-[min(100%,clamp(196px,56vw,256px))] min-[560px]:[@media(min-aspect-ratio:105/100)]:w-[clamp(212px,22vw,292px)] [@media(max-height:540px)]:w-[clamp(182px,27vw,224px)] gap-[clamp(0.45rem,1.5vh,0.9rem)] [@media(max-height:540px)]:gap-0.5 max-h-full overflow-y-auto no-scrollbar"
        >
          {/* Top Block: Brand, Model, PR Pill, Core Spec Table */}
          <div className="w-full min-w-0 space-y-[clamp(0.3rem,1vh,0.6rem)] [@media(max-height:540px)]:space-y-0.5">
            <div className="space-y-0.5 [@media(max-height:540px)]:space-y-0">
              <div className="text-[clamp(8.5px,0.8vw,10.5px)] [@media(max-height:540px)]:text-[7.5px] font-display font-bold tracking-widest uppercase text-orange-300/80 leading-none">
                {activeSpec.brand}
              </div>
              <div className="font-display text-[clamp(0.85rem,1.35vw,1.15rem)] [@media(max-height:540px)]:text-[10.5px] font-bold text-stone-50 leading-tight drop-shadow">
                {activeSpec.name} &apos;{shortYear}
              </div>
              <div className="pt-0.5 [@media(max-height:540px)]:pt-0">
                <span className="inline-flex items-center px-2.5 [@media(max-height:540px)]:px-1.5 py-0.5 [@media(max-height:540px)]:py-0 rounded-full border border-orange-300/35 bg-[#120d0b]/65 font-mono-num text-[clamp(9px,0.85vw,11px)] [@media(max-height:540px)]:text-[8px] font-semibold text-orange-100">
                  PR {activeSummary.rating}.00
                </span>
              </div>
            </div>

            <dl className="pt-0.5 [@media(max-height:540px)]:pt-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-2.5 gap-y-1 [@media(max-height:540px)]:gap-x-1.5 [@media(max-height:540px)]:gap-y-0 text-[clamp(10px,0.9vw,12px)] [@media(max-height:540px)]:text-[8.5px] leading-tight items-baseline">
              <dt className="text-right text-stone-400">Class</dt>
              <dd className="font-semibold text-stone-100 truncate">{activeSpec.category}</dd>

              <dt className="text-right text-stone-400">Drivetrain</dt>
              <dd className="font-semibold text-stone-100 truncate">{activeSpec.drivetrain}</dd>

              <dt className="text-right text-stone-400">Max Power</dt>
              <dd className="font-semibold text-stone-100 truncate">{activeSpec.power}</dd>

              <dt className="text-right text-stone-400">Weight</dt>
              <dd className="font-semibold text-stone-100 truncate">
                {activeSpec.weightKg.toLocaleString()} kg
              </dd>
            </dl>
          </div>

          {/* Bottom Block: Tier Strip, Handling Bar, Top Spd / 0-100, Tune Setup Toggle */}
          <div className="w-full min-w-0 pt-[clamp(0.45rem,1.5vh,0.85rem)] [@media(max-height:540px)]:pt-0.5 border-t border-orange-200/15 space-y-[clamp(0.4rem,1.2vh,0.7rem)] [@media(max-height:540px)]:space-y-0.5">
            {cardPage === 'specs' ? (
              <div className="space-y-[clamp(0.4rem,1.2vh,0.7rem)] [@media(max-height:540px)]:space-y-0.5">
                {/* Performance Tier Strip */}
                <div className="grid grid-cols-5 gap-1">
                  {TIER_ORDER.map((tier) => {
                    const isActive = activeSummary.tier === tier;
                    return (
                      <div
                        key={tier}
                        className={`h-6 [@media(max-height:540px)]:h-3.5 flex items-center justify-center rounded-xs font-display text-[11px] [@media(max-height:540px)]:text-[8.5px] font-extrabold border transition-colors ${
                          isActive
                            ? 'bg-orange-500/20 border-orange-400 text-orange-100 shadow-[0_0_12px_rgba(249,115,22,0.22)]'
                            : 'bg-[#120d0b]/55 border-white/12 text-stone-400'
                        }`}
                      >
                        {tier}
                      </div>
                    );
                  })}
                </div>

                {/* Handling Grip <-> Drift Scale */}
                <div className="space-y-1 [@media(max-height:540px)]:space-y-0.5">
                  <div className="flex items-center justify-between text-[clamp(9px,0.85vw,10.5px)] [@media(max-height:540px)]:text-[8.5px] font-semibold uppercase tracking-wider">
                    <span className="text-stone-300">Handling</span>
                    <span className="font-mono-num text-stone-100">
                      {Math.round(activeSummary.handlingRatio * 100)}% AGILE
                    </span>
                  </div>
                  <div className="relative h-2.5 [@media(max-height:540px)]:h-2 flex items-center">
                    <div className="w-full h-[2px] bg-white/15" />
                    <div
                      className="h-[2px] bg-gradient-to-r from-amber-500 to-orange-400 absolute left-0"
                      style={{ width: `${10 + activeSummary.handlingRatio * 80}%` }}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-2.5 [@media(max-height:540px)]:h-2 bg-orange-200/40" />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 [@media(max-height:540px)]:w-2 [@media(max-height:540px)]:h-2 rounded-full bg-orange-100 shadow-[0_0_8px_rgba(251,146,60,0.6)]"
                      style={{ left: `${10 + activeSummary.handlingRatio * 80}%` }}
                    />
                  </div>
                </div>

                {/* Side-by-side Boxed Telemetry Metrics */}
                <div className="flex items-center justify-between gap-2 [@media(max-height:540px)]:gap-1 pt-0.5 [@media(max-height:540px)]:pt-0">
                  <div className="flex items-center gap-1 text-[clamp(8.5px,0.82vw,10px)] [@media(max-height:540px)]:text-[8px] font-semibold uppercase tracking-wider text-stone-300 whitespace-nowrap">
                    <span>Top Spd</span>
                    <span className="min-w-[32px] [@media(max-height:540px)]:min-w-[26px] px-1.5 [@media(max-height:540px)]:px-1 py-0.5 rounded-xs bg-orange-50 text-stone-950 font-mono-num font-bold text-center text-[10.5px] [@media(max-height:540px)]:text-[9px] leading-none">
                      {activeSummary.topSpeedKmh}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[clamp(8.5px,0.82vw,10px)] [@media(max-height:540px)]:text-[8px] font-semibold uppercase tracking-wider text-stone-300 whitespace-nowrap">
                    <span>0–100 [s]</span>
                    <span className="min-w-[30px] [@media(max-height:540px)]:min-w-[24px] px-1.5 [@media(max-height:540px)]:px-1 py-0.5 rounded-xs bg-orange-50 text-stone-950 font-mono-num font-bold text-center text-[10.5px] [@media(max-height:540px)]:text-[9px] leading-none">
                      {activeSummary.zeroToHundredSec.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 [@media(max-height:540px)]:space-y-1">
                <div className="flex items-center justify-between text-[10px] [@media(max-height:540px)]:text-[8.5px] uppercase tracking-wider">
                  <span className="font-semibold text-stone-300">
                    Tuning ({remaining} pts left)
                  </span>
                  <button
                    type="button"
                    onClick={() => onChangeCar(buildModelConfig(DEFAULT_CAR_CONFIG, activeSpec))}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs glass-btn-subtle text-stone-200 hover:text-white transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
                <div className="space-y-1.5 [@media(max-height:540px)]:space-y-1">
                  {STAT_META.map(({ key, label }) => {
                    const val = car.stats[key];
                    const mod = activeSpec.modifiers[key] ?? 0;
                    return (
                      <div key={key} className="space-y-0.5 [@media(max-height:540px)]:space-y-1">
                        <div className="flex items-center justify-between text-[10px] [@media(max-height:540px)]:text-[9px] leading-none">
                          <span className="uppercase tracking-wider text-stone-300">{label}</span>
                          <span className="font-mono-num font-bold text-stone-100">
                            {val}
                            {mod !== 0 && (
                              <span className={mod > 0 ? 'text-orange-400 ml-1' : 'text-amber-300 ml-1'}>
                                ({mod > 0 ? `+${mod}` : mod})
                              </span>
                            )}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={10}
                          step={1}
                          value={val}
                          onChange={(e) => handleStatChange(key, Number(e.target.value))}
                          aria-label={label}
                          className="block w-full apex-slider"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inline Specs <-> Tune Setup Toggle Button */}
            <button
              type="button"
              onClick={() => setCardPage((p) => (p === 'specs' ? 'tune' : 'specs'))}
              className="w-full flex items-center justify-between px-3 py-1.5 [@media(max-height:540px)]:px-2 [@media(max-height:540px)]:py-0.5 rounded-sm glass-btn-dark text-[10px] [@media(max-height:540px)]:text-[8.5px] font-display font-bold uppercase tracking-wider text-stone-100 transition-all cursor-pointer active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-1.5">
                {cardPage === 'specs' ? (
                  <SlidersHorizontal className="w-3 h-3 text-orange-400" />
                ) : (
                  <BarChart3 className="w-3 h-3 text-orange-400" />
                )}
                <span>{cardPage === 'specs' ? 'Tune Setup' : 'View Specs'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    cardPage === 'specs' ? 'bg-orange-400' : 'bg-white/25'
                  }`}
                />
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    cardPage === 'tune' ? 'bg-orange-400' : 'bg-white/25'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

        {/* Bottom Carousel Dock */}
      <div className="shrink-0 space-y-1.5 sm:space-y-2 [@media(max-height:540px)]:space-y-0.5">
        {/* Category Tabs + Prev/Next Controls */}
        <div className="pointer-events-auto flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1 p-1 [@media(max-height:540px)]:p-0.5 rounded-sm bg-[#16110e]/75 backdrop-blur-md border border-orange-200/15 overflow-x-auto no-scrollbar min-w-0">
            {CATEGORY_TABS.map((tab) => {
              const active = category === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategory(tab)}
                  className={`px-2.5 sm:px-3.5 py-1 [@media(max-height:540px)]:px-2 [@media(max-height:540px)]:py-0.5 rounded-xs text-[10px] sm:text-xs [@media(max-height:540px)]:text-[9px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 active:scale-95 ${
                    active
                      ? 'glass-btn-primary text-stone-950'
                      : 'glass-btn-subtle border-transparent text-stone-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              aria-label="Previous car"
              onClick={() => nudgeCarousel(-1)}
              className="w-8 h-8 [@media(max-height:540px)]:w-6 [@media(max-height:540px)]:h-6 flex items-center justify-center rounded-sm glass-btn-dark text-stone-200 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 [@media(max-height:540px)]:w-3.5 [@media(max-height:540px)]:h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next car"
              onClick={() => nudgeCarousel(1)}
              className="w-8 h-8 [@media(max-height:540px)]:w-6 [@media(max-height:540px)]:h-6 flex items-center justify-center rounded-sm glass-btn-dark text-stone-200 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4 [@media(max-height:540px)]:w-3.5 [@media(max-height:540px)]:h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Car Cards Strip */}
        <div
          ref={carouselRef}
          data-testid="garage-car-list"
          className="pointer-events-auto flex items-stretch gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5 [@media(max-height:540px)]:py-0"
        >
          {filteredModels.map((m) => {
            const selected = activeSpec.id === m.id;
            const summary =
              summariesById[m.id] ?? getCarPerformanceSummary(buildModelConfig(car, m));
            const thumb = thumbnails[m.id];

            return (
              <button
                key={m.id}
                type="button"
                data-model-id={m.id}
                aria-label={`Select ${m.name}`}
                aria-pressed={selected}
                onClick={() => selectModel(m)}
                className={`relative w-[clamp(116px,32vw,196px)] sm:w-[clamp(124px,14.5vw,196px)] h-[clamp(62px,13vh,108px)] [@media(max-height:540px)]:w-[108px] [@media(max-height:540px)]:h-[44px] shrink-0 rounded-sm overflow-hidden text-left transition-all cursor-pointer bg-[#161210]/90 ${
                  selected
                    ? 'border-2 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.28)]'
                    : 'border border-white/15 hover:border-orange-300/45 opacity-90 hover:opacity-100'
                }`}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={m.name}
                    draggable={false}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, ${m.primaryColor}33, #161210 75%)`,
                    }}
                  >
                    <span
                      className="w-12 h-3 rounded-full opacity-75"
                      style={{
                        background: `linear-gradient(90deg, ${m.primaryColor}, ${m.accentColor})`,
                      }}
                    />
                  </div>
                )}

                {selected && (
                  <span
                    className="absolute top-0 left-0 w-3 h-3 bg-orange-400 pointer-events-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                  />
                )}

                {/* Compact Tier Badge */}
                <div className="absolute top-1.5 left-1.5 inline-flex items-center px-1.5 py-0.5 rounded-xs bg-black/75 border border-orange-200/15 font-display text-[10px] font-extrabold leading-none">
                  <span className={`px-1 py-0.5 rounded-xs leading-none ${TIER_COLORS[summary.tier]}`}>
                    {summary.tier}
                  </span>
                </div>

                {/* Bottom Label */}
                <div className="absolute inset-x-0 bottom-0 px-2 py-1 bg-gradient-to-t from-black/92 via-black/60 to-transparent flex items-end justify-between gap-1">
                  <span className="font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-stone-100 truncate">
                    {m.name}
                  </span>
                  {selected && (
                    <span className="text-[9px] font-bold uppercase tracking-wider shrink-0 text-orange-400">
                      ACTIVE
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="pointer-events-auto flex items-center justify-between gap-2.5 sm:gap-3 pt-0.5 [@media(max-height:540px)]:pt-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 [@media(max-height:540px)]:px-3 [@media(max-height:540px)]:py-1 rounded-sm glass-btn-primary text-stone-950 font-display text-xs [@media(max-height:540px)]:text-[10.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5 [@media(max-height:540px)]:w-3 [@media(max-height:540px)]:h-3 stroke-[2.75]" />
              <span>Select Ride</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 [@media(max-height:540px)]:px-2.5 [@media(max-height:540px)]:py-1 rounded-sm glass-btn-dark text-xs [@media(max-height:540px)]:text-[10.5px] font-display font-bold uppercase tracking-wider text-stone-100 transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 [@media(max-height:540px)]:w-3 [@media(max-height:540px)]:h-3" />
              <span>Back</span>
            </button>
          </div>

          <div
            data-testid="garage-counter"
            className="font-mono-num text-[10.5px] sm:text-xs font-semibold tracking-wider text-stone-300 shrink-0"
          >
            {selectedIndex + 1} OF {filteredModels.length}
          </div>
        </div>
      </div>
    </div>
  );
};
