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
  onClose,
}) => {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [cardPage, setCardPage] = useState<'specs' | 'tune'>('specs');
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const activeModelId = car.modelId ?? DEFAULT_MODEL_ID;
  const activeSpec = getCarModelSpec(activeModelId) ?? CAR_MODELS[0];

  const activeSummary = useMemo(
    () => getCarPerformanceSummary(buildModelConfig(car, activeSpec)),
    [car, activeSpec],
  );

  const filteredModels = useMemo(() => {
    const base =
      category === 'All' ? [...CAR_MODELS] : CAR_MODELS.filter((m) => m.category === category);

    base.sort((a, b) => {
      const ra = getCarPerformanceSummary(buildModelConfig(car, a)).rating;
      const rb = getCarPerformanceSummary(buildModelConfig(car, b)).rating;
      return rb - ra;
    });
    return base;
  }, [category, car]);

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
  });

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
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between px-4 sm:px-6 md:px-8 py-2.5 sm:py-4 md:py-5 [@media(max-height:540px)]:px-3 [@media(max-height:540px)]:py-1.5 overflow-hidden select-none"
    >
      {/* Subtle left-edge readability scrim behind all left-side details */}
      <div
        className="fixed inset-y-0 left-0 w-[44%] max-w-lg pointer-events-none -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,13,18,0.86) 0%, rgba(10,13,18,0.48) 62%, rgba(10,13,18,0) 100%)',
        }}
      />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg sm:text-xl md:text-2xl [@media(max-height:540px)]:text-base font-bold tracking-wider uppercase text-white drop-shadow">
            GARAGE
          </h2>
          {modelLoading && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#141820]/90 border border-white/15 text-[11px] font-medium text-white">
              <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
              <span>Downloading resources...</span>
            </span>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 [@media(max-height:540px)]:px-2.5 [@media(max-height:540px)]:py-0.5 rounded-sm bg-[#141820]/80 border border-white/15 backdrop-blur-sm">
            <label
              htmlFor="garage-driver-name"
              className="text-[10px] sm:text-[11px] [@media(max-height:540px)]:text-[9px] uppercase tracking-wider font-semibold text-slate-400"
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
              className="w-24 sm:w-36 [@media(max-height:540px)]:w-24 bg-transparent text-xs sm:text-sm [@media(max-height:540px)]:text-[11px] font-semibold text-white focus:outline-none border-b border-transparent focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Middle Hero Stage: Unified Left-Side Details (Cardless) | Open 3D Car & Driver Backdrop */}
      <div className="flex-1 min-h-0 flex items-center justify-start py-1 sm:py-2 [@media(max-height:540px)]:items-center [@media(max-height:540px)]:py-0.5">
        <div
          data-testid="garage-left-details"
          className="pointer-events-auto flex flex-col gap-3 w-[clamp(220px,24vw,280px)] max-h-full overflow-y-auto no-scrollbar [@media(max-height:540px)]:flex-row [@media(max-height:540px)]:items-start [@media(max-height:540px)]:gap-2.5 [@media(max-height:540px)]:w-auto [@media(max-height:540px)]:max-w-[376px]"
        >
          {/* Present Left Details (Preserved) */}
          <div className="space-y-2 [@media(max-height:540px)]:space-y-1 [@media(max-height:540px)]:w-[158px] shrink-0">
            <div className="space-y-1 [@media(max-height:540px)]:space-y-0.5">
              <div className="text-[10px] [@media(max-height:540px)]:text-[9px] font-display font-bold tracking-widest uppercase text-slate-400">
                {activeSpec.brand}
              </div>
              <div className="font-display text-sm sm:text-base md:text-lg [@media(max-height:540px)]:text-[11px] font-bold text-white leading-tight drop-shadow">
                {activeSpec.name} &apos;{shortYear}
              </div>
              <div className="pt-0.5 [@media(max-height:540px)]:pt-0">
                <span className="inline-flex items-center px-2.5 py-0.5 [@media(max-height:540px)]:px-2 [@media(max-height:540px)]:py-0 rounded-full border border-white/35 bg-black/40 font-mono-num text-[11px] [@media(max-height:540px)]:text-[9px] font-semibold text-white">
                  PR {activeSummary.rating}.00
                </span>
              </div>
            </div>

            <dl className="pt-1 [@media(max-height:540px)]:pt-0.5 space-y-1 [@media(max-height:540px)]:space-y-0.5 text-[11px] sm:text-xs [@media(max-height:540px)]:text-[9px] [@media(max-height:540px)]:leading-tight">
              <div className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] [@media(max-height:540px)]:grid-cols-[50px_1fr] gap-2 [@media(max-height:540px)]:gap-1.5 items-baseline">
                <dt className="text-right text-slate-400">Class</dt>
                <dd className="font-semibold text-white truncate">{activeSpec.category}</dd>
              </div>
              <div className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] [@media(max-height:540px)]:grid-cols-[50px_1fr] gap-2 [@media(max-height:540px)]:gap-1.5 items-baseline">
                <dt className="text-right text-slate-400">Drivetrain</dt>
                <dd className="font-semibold text-white truncate">{activeSpec.drivetrain}</dd>
              </div>
              <div className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] [@media(max-height:540px)]:grid-cols-[50px_1fr] gap-2 [@media(max-height:540px)]:gap-1.5 items-baseline">
                <dt className="text-right text-slate-400">Max Power</dt>
                <dd className="font-semibold text-white truncate">{activeSpec.power}</dd>
              </div>
              <div className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] [@media(max-height:540px)]:grid-cols-[50px_1fr] gap-2 [@media(max-height:540px)]:gap-1.5 items-baseline">
                <dt className="text-right text-slate-400">Weight</dt>
                <dd className="font-semibold text-white truncate">
                  {activeSpec.weightKg.toLocaleString()} kg
                </dd>
              </div>
            </dl>
          </div>

          {/* Added Performance & Tuning Details (Cardless, directly on the left alongside present details) */}
          <div className="pt-2.5 border-t border-white/15 [@media(max-height:540px)]:pt-0 [@media(max-height:540px)]:border-t-0 [@media(max-height:540px)]:border-l [@media(max-height:540px)]:pl-2.5 [@media(max-height:540px)]:w-[198px] space-y-2.5 [@media(max-height:540px)]:space-y-1">
            {cardPage === 'specs' ? (
              <div className="space-y-2.5 [@media(max-height:540px)]:space-y-1.5">
                {/* Performance Tier Strip */}
                <div className="grid grid-cols-5 gap-1">
                  {TIER_ORDER.map((tier) => {
                    const isActive = activeSummary.tier === tier;
                    return (
                      <div
                        key={tier}
                        className={`h-6 [@media(max-height:540px)]:h-5 flex items-center justify-center rounded-xs font-display text-[11px] font-extrabold border transition-colors ${
                          isActive
                            ? 'bg-white/15 border-white text-white shadow-sm'
                            : 'bg-black/25 border-white/15 text-slate-400'
                        }`}
                      >
                        {tier}
                      </div>
                    );
                  })}
                </div>

                {/* Handling Grip <-> Drift Scale */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
                    <span className="text-slate-300">Handling</span>
                    <span className="font-mono-num text-white">
                      {Math.round(activeSummary.handlingRatio * 100)}% AGILE
                    </span>
                  </div>
                  <div className="relative h-2.5 flex items-center">
                    <div className="w-full h-[2px] bg-white/20" />
                    <div
                      className="h-[2px] bg-emerald-400 absolute left-0"
                      style={{ width: `${10 + activeSummary.handlingRatio * 80}%` }}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-2.5 bg-white/40" />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow"
                      style={{ left: `${10 + activeSummary.handlingRatio * 80}%` }}
                    />
                  </div>
                </div>

                {/* Side-by-side Boxed Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-2 [@media(max-height:540px)]:gap-1.5 pt-0.5">
                  <div className="flex items-center justify-between gap-1 text-[10px] [@media(max-height:540px)]:text-[9px] font-semibold uppercase tracking-wider text-slate-300">
                    <span className="whitespace-nowrap">Top Spd</span>
                    <span className="min-w-[38px] [@media(max-height:540px)]:min-w-[30px] px-1.5 [@media(max-height:540px)]:px-1 py-0.5 rounded-xs bg-white text-slate-950 font-mono-num font-bold text-center text-[11px] [@media(max-height:540px)]:text-[9.5px]">
                      {activeSummary.topSpeedKmh}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 text-[10px] [@media(max-height:540px)]:text-[9px] font-semibold uppercase tracking-wider text-slate-300">
                    <span className="whitespace-nowrap">0–100 [s]</span>
                    <span className="min-w-[34px] [@media(max-height:540px)]:min-w-[28px] px-1.5 [@media(max-height:540px)]:px-1 py-0.5 rounded-xs bg-white text-slate-950 font-mono-num font-bold text-center text-[11px] [@media(max-height:540px)]:text-[9.5px]">
                      {activeSummary.zeroToHundredSec.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 [@media(max-height:540px)]:space-y-1">
                <div className="flex items-center justify-between text-[10px] [@media(max-height:540px)]:text-[9px] uppercase tracking-wider">
                  <span className="font-semibold text-slate-300">
                    Tuning ({remaining} pts left)
                  </span>
                  <button
                    type="button"
                    onClick={() => onChangeCar(buildModelConfig(DEFAULT_CAR_CONFIG, activeSpec))}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
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
                          <span className="uppercase tracking-wider text-slate-300">{label}</span>
                          <span className="font-mono-num font-bold text-white">
                            {val}
                            {mod !== 0 && (
                              <span className={mod > 0 ? 'text-emerald-400 ml-1' : 'text-amber-400 ml-1'}>
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
              className="w-full flex items-center justify-between px-3 py-1.5 [@media(max-height:540px)]:px-2 [@media(max-height:540px)]:py-1 rounded-sm border border-white/15 bg-white/[0.06] hover:bg-white/[0.14] text-[10px] [@media(max-height:540px)]:text-[9px] font-display font-bold uppercase tracking-wider text-slate-100 transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5">
                {cardPage === 'specs' ? (
                  <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
                ) : (
                  <BarChart3 className="w-3 h-3 text-emerald-400" />
                )}
                <span>{cardPage === 'specs' ? 'Tune Setup' : 'View Specs'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    cardPage === 'specs' ? 'bg-emerald-400' : 'bg-white/30'
                  }`}
                />
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    cardPage === 'tune' ? 'bg-emerald-400' : 'bg-white/30'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Carousel Dock */}
      <div className="shrink-0 space-y-1.5 sm:space-y-2 [@media(max-height:540px)]:space-y-1">
        {/* Category Tabs + Prev/Next Controls */}
        <div className="pointer-events-auto flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1 p-1 [@media(max-height:540px)]:p-0.5 rounded-sm bg-[#12161f]/85 border border-white/12 backdrop-blur-md overflow-x-auto no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const active = category === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategory(tab)}
                  className={`px-3 sm:px-3.5 py-1 [@media(max-height:540px)]:px-2.5 [@media(max-height:540px)]:py-0.5 rounded-xs text-[10px] sm:text-xs [@media(max-height:540px)]:text-[9.5px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                    active
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
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
              className="w-8 h-8 [@media(max-height:540px)]:w-6 [@media(max-height:540px)]:h-6 flex items-center justify-center rounded-sm bg-[#141820]/90 hover:bg-white/15 border border-white/15 hover:border-white/35 text-slate-200 hover:text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 [@media(max-height:540px)]:w-3.5 [@media(max-height:540px)]:h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next car"
              onClick={() => nudgeCarousel(1)}
              className="w-8 h-8 [@media(max-height:540px)]:w-6 [@media(max-height:540px)]:h-6 flex items-center justify-center rounded-sm bg-[#141820]/90 hover:bg-white/15 border border-white/15 hover:border-white/35 text-slate-200 hover:text-white shadow-sm transition-all cursor-pointer active:scale-95"
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
            const summary = getCarPerformanceSummary(buildModelConfig(car, m));
            const thumb = thumbnails[m.id];

            return (
              <button
                key={m.id}
                type="button"
                data-model-id={m.id}
                aria-label={`Select ${m.name}`}
                aria-pressed={selected}
                onClick={() => selectModel(m)}
                className={`relative w-[clamp(124px,14.5vw,196px)] h-[clamp(64px,13vh,108px)] [@media(max-height:540px)]:w-[112px] [@media(max-height:540px)]:h-[52px] shrink-0 rounded-sm overflow-hidden text-left transition-all cursor-pointer bg-[#141820] ${
                  selected
                    ? 'border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.18)]'
                    : 'border border-white/15 hover:border-white/45 opacity-90 hover:opacity-100'
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
                      background: `radial-gradient(circle at 50% 45%, ${m.primaryColor}33, #111620 75%)`,
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
                    className="absolute top-0 left-0 w-3 h-3 bg-emerald-400 pointer-events-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                  />
                )}

                {/* Compact Tier Badge */}
                <div className="absolute top-1.5 left-1.5 inline-flex items-center px-1.5 py-0.5 rounded-xs bg-black/70 border border-white/15 font-display text-[10px] font-extrabold leading-none">
                  <span className={`px-1 py-0.5 rounded-xs leading-none ${TIER_COLORS[summary.tier]}`}>
                    {summary.tier}
                  </span>
                </div>

                {/* Bottom Label */}
                <div className="absolute inset-x-0 bottom-0 px-2 py-1 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex items-end justify-between gap-1">
                  <span className="font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-white truncate">
                    {m.name}
                  </span>
                  {selected && (
                    <span className="text-[9px] font-bold uppercase tracking-wider shrink-0 text-emerald-400">
                      ACTIVE
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="pointer-events-auto flex items-center justify-between gap-3 pt-0.5 [@media(max-height:540px)]:pt-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 [@media(max-height:540px)]:px-3 [@media(max-height:540px)]:py-1 rounded-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display text-xs [@media(max-height:540px)]:text-[10.5px] font-extrabold uppercase tracking-wider shadow-[0_4px_16px_rgba(52,211,153,0.28)] transition-all cursor-pointer active:scale-[0.98]"
            >
              <Check className="w-3.5 h-3.5 [@media(max-height:540px)]:w-3 [@media(max-height:540px)]:h-3 stroke-[2.75]" />
              <span>Select Ride</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 [@media(max-height:540px)]:px-2.5 [@media(max-height:540px)]:py-1 rounded-sm bg-[#161b24]/90 hover:bg-[#222936] border border-white/20 hover:border-white/40 text-xs [@media(max-height:540px)]:text-[10.5px] font-display font-bold uppercase tracking-wider text-slate-100 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <ArrowLeft className="w-3.5 h-3.5 [@media(max-height:540px)]:w-3 [@media(max-height:540px)]:h-3" />
              <span>Back</span>
            </button>
          </div>

          <div
            data-testid="garage-counter"
            className="font-mono-num text-[11px] sm:text-xs font-semibold tracking-wider text-slate-300"
          >
            {selectedIndex + 1} OF {filteredModels.length}
          </div>
        </div>
      </div>
    </div>
  );
};
