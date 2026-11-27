import React, { useCallback, useEffect, useState } from 'react';
import Box from 'lucide-react/dist/esm/icons/box.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import Monitor from 'lucide-react/dist/esm/icons/monitor.js';
import Music from 'lucide-react/dist/esm/icons/music.js';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2.js';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2.js';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x.js';
import X from 'lucide-react/dist/esm/icons/x.js';
import {
  deleteCustomGlbModel,
  listCustomGlbModels,
  type ImportedCustomGlbItem,
} from '../game/customModels';
import {
  AUDIO_CHANNELS,
  type AudioChannelId,
  type AudioMixSettings,
} from '../shared/audioSettings';
import {
  GRAPHICS_QUALITY_SPECS,
  type GraphicsQuality,
} from '../shared/graphicsQuality';
import {
  formatPerfDetailRows,
  type PerformanceTelemetrySnapshot,
} from '../shared/perfTelemetry';

interface GraphicsSettingsSectionProps {
  graphicsQuality: GraphicsQuality;
  onChangeGraphicsQuality: (quality: GraphicsQuality) => void;
  perfTelemetry: PerformanceTelemetrySnapshot;
}

export const GraphicsSettingsSection: React.FC<GraphicsSettingsSectionProps> = ({
  graphicsQuality,
  onChangeGraphicsQuality,
  perfTelemetry,
}) => {
  const detailRows = formatPerfDetailRows(perfTelemetry);
  const activeSpec =
    GRAPHICS_QUALITY_SPECS.find((s) => s.id === graphicsQuality) ?? GRAPHICS_QUALITY_SPECS[0];

  return (
    <div className="h-full min-h-0 flex flex-col justify-start gap-2.5 sm:gap-3.5 md:grid md:grid-cols-12 md:gap-4 md:items-stretch short-landscape:grid short-landscape:grid-cols-12 short-landscape:gap-3 short-landscape:items-stretch">
      {/* Graphics Quality Presets + Specifications */}
      <div className="md:col-span-7 short-landscape:col-span-7 flex flex-col gap-1.5 sm:gap-2 min-h-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-[#ff922e]" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-200">
              Graphics Quality &amp; Specs
            </span>
          </div>
          <span className="text-[11px] font-mono-num text-[#ffb238] font-semibold">
            {activeSpec.label}
          </span>
        </div>

        <div
          className="grid grid-cols-1 gap-1.5 short-landscape:gap-1"
          role="group"
          aria-label="Graphics Quality"
        >
          {GRAPHICS_QUALITY_SPECS.map((spec) => {
            const active = graphicsQuality === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                data-testid={`graphics-option-${spec.id.toLowerCase()}`}
                aria-pressed={active}
                onClick={() => onChangeGraphicsQuality(spec.id)}
                className={`w-full text-left rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 short-landscape:py-1 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between gap-2 ${
                  active
                    ? 'glass-btn-orange-soft text-white'
                    : 'glass-btn-subtle text-slate-300 hover:text-white'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-display text-xs sm:text-[13px] short-landscape:text-[11px] font-bold tracking-wide ${
                        active ? 'text-[#ffe8d6]' : 'text-white'
                      }`}
                    >
                      {spec.label}
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] short-landscape:text-[9.5px] font-mono-num text-[#ffb238]/90 truncate">
                      {spec.resolution} · {spec.shadows}
                    </span>
                  </div>
                  <div className="text-[9.5px] sm:text-[10.5px] short-landscape:text-[9px] text-slate-300/90 truncate mt-0.5 short-landscape:mt-0">
                    {spec.scenery} · {spec.opponents} · {spec.particles}
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                    active
                      ? 'bg-[#ff5a00]/25 border-[#ff922e] text-[#ffe8d6]'
                      : 'border-white/15 bg-white/5 text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Details anchored cleanly beside options on desktop/landscape and below on portrait */}
      <div className="md:col-span-5 short-landscape:col-span-5 flex flex-col justify-start md:justify-between short-landscape:justify-between min-h-0">
        <div className="space-y-1.5 md:h-full md:flex md:flex-col short-landscape:h-full short-landscape:flex short-landscape:flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-200">
              System Details
            </span>
            <span className="text-[10px] font-mono-num text-slate-400">Live Telemetry</span>
          </div>
          <div
            data-testid="settings-perf-details"
            className="rounded-xl glass-panel border border-white/12 px-2.5 sm:px-3.5 py-2 sm:py-2.5 short-landscape:py-2 md:flex-1 short-landscape:flex-1 flex flex-col justify-between font-mono-num text-[10px] sm:text-[11px] short-landscape:text-[9.5px] leading-snug space-y-1 short-landscape:space-y-0.5"
          >
            {detailRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-2">
                <span className="text-slate-400 shrink-0">{row.label}</span>
                <span className="text-slate-100 text-right truncate">{row.value}</span>
              </div>
            ))}
            <p className="pt-1 text-[9.5px] short-landscape:text-[9px] text-slate-400 border-t border-white/10">
              GPU memory is not exposed by renderer.info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MusicSettingsSectionProps {
  audioMix: AudioMixSettings;
  muted: boolean;
  onChangeChannelVolume: (channel: AudioChannelId, volume: number) => void;
  onToggleMute: () => void;
}

export const MusicSettingsSection: React.FC<MusicSettingsSectionProps> = ({
  audioMix,
  muted,
  onChangeChannelVolume,
  onToggleMute,
}) => {
  return (
    <div className="h-full min-h-0 flex flex-col gap-2.5 sm:gap-3.5">
      {/* Audio Overview + Global Mute Toggle */}
      <div className="flex items-center justify-between gap-3 rounded-xl glass-panel border border-white/12 px-3 py-2 sm:px-4 sm:py-2.5 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Music className="w-4 h-4 text-[#ff922e] shrink-0" />
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-white truncate">
              Audio Channels &amp; Sound Mix
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
              Fine-tune master, engine, effects, and weather soundscape
            </div>
          </div>
        </div>

        <button
          type="button"
          data-testid="settings-mute-toggle"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95 shrink-0 ${
            muted ? 'glass-btn-dark text-slate-300' : 'glass-btn-orange-soft text-[#ffe8d6]'
          }`}
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#ff4d2e]" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#ffb238]" />
              <span>Active</span>
            </>
          )}
        </button>
      </div>

      {/* All 4 Sound Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 short-landscape:grid-cols-2 gap-2 sm:gap-3">
        {AUDIO_CHANNELS.map((ch) => {
          const rawValue = audioMix[ch.id];
          const effectiveValue = muted ? 0 : ch.id === 'master' ? rawValue : rawValue;
          const displayValue = ch.id === 'master' && muted ? 0 : rawValue;
          const pct = Math.round(displayValue * 100);
          const sliderTestId =
            ch.id === 'master' ? 'settings-volume-slider' : `settings-channel-slider-${ch.id}`;
          const valueTestId =
            ch.id === 'master' ? 'settings-volume-value' : `settings-channel-value-${ch.id}`;

          return (
            <div
              key={ch.id}
              className="rounded-xl glass-panel border border-white/12 px-3 py-2 sm:px-3.5 sm:py-3 short-landscape:py-2 flex flex-col justify-between gap-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs sm:text-[13px] font-semibold text-white truncate">
                    {ch.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                    {ch.description}
                  </div>
                </div>
                <span
                  data-testid={valueTestId}
                  className="text-xs font-mono-num font-bold text-[#ffb238] tabular-nums shrink-0"
                >
                  {pct}%
                </span>
              </div>

              <div className="relative h-6 flex items-center">
                <div className="absolute inset-x-0 h-2 rounded-full bg-white/12 overflow-hidden pointer-events-none">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ff4d2e] via-[#ff7a18] to-[#ffb238]"
                    style={{ width: `${Math.round(effectiveValue * 100)}%` }}
                  />
                </div>
                <input
                  type="range"
                  data-testid={sliderTestId}
                  min={0}
                  max={1}
                  step={0.01}
                  value={displayValue}
                  onChange={(e) => onChangeChannelVolume(ch.id, Number(e.target.value))}
                  aria-label={ch.label}
                  className="relative z-10 w-full smooth-volume-slider cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function formatByteSize(bytes: number): string {
  if (!bytes || bytes <= 0) return 'GLB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export const CustomGlbModelsSection: React.FC = () => {
  const [models, setModels] = useState<ImportedCustomGlbItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const loadModels = useCallback(async () => {
    setLoading(true);
    try {
      const list = await listCustomGlbModels();
      setModels(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadModels();
    const handleChange = () => {
      void loadModels();
    };
    window.addEventListener('turbo-drifter:custom-glb-changed', handleChange);
    return () => {
      window.removeEventListener('turbo-drifter:custom-glb-changed', handleChange);
    };
  }, [loadModels]);

  const handleDelete = async (key: string) => {
    setDeletingKey(key);
    try {
      await deleteCustomGlbModel(key);
      setModels((prev) => prev.filter((item) => item.key !== key));
      window.dispatchEvent(new CustomEvent('turbo-drifter:custom-glb-changed'));
    } finally {
      setDeletingKey(null);
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col gap-2.5 sm:gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <Box className="w-3.5 h-3.5 text-[#ff922e] shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-200 truncate">
            Imported Models
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono-num text-[#ffb238] shrink-0">
          {models.length} {models.length === 1 ? 'model' : 'models'}
        </span>
      </div>

      {loading ? (
        <div className="flex-1 min-h-0 rounded-xl glass-panel border border-white/12 flex items-center justify-center p-4 text-center">
          <span className="text-xs text-slate-300">Loading imported GLB models...</span>
        </div>
      ) : models.length === 0 ? (
        <div
          data-testid="custom-glb-empty"
          className="flex-1 min-h-0 rounded-xl glass-panel border border-white/12 flex flex-col items-center justify-center gap-2.5 p-4 text-center"
        >
          <div className="w-11 h-11 rounded-xl bg-[#ff7a18]/15 border border-[#ff922e]/30 flex items-center justify-center text-[#ffb238]">
            <Box className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white">
            No custom GLB models imported
          </p>
          <p className="text-[10px] sm:text-xs text-slate-400 max-w-xs leading-relaxed">
            Imported GLB thumbnails will appear here in a grid and can be deleted anytime.
          </p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <div
            data-testid="custom-glb-grid"
            className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 short-landscape:grid-cols-3 gap-2 sm:gap-3 short-landscape:gap-2 items-stretch content-start overflow-hidden"
          >
            {models.map((item) => {
              const isDeleting = deletingKey === item.key;
              return (
                <div
                  key={item.key}
                  data-testid={`custom-glb-card-${item.key}`}
                  className="h-full rounded-xl glass-panel border border-white/12 p-2 sm:p-2.5 short-landscape:p-1.5 flex flex-col gap-1.5 sm:gap-2 min-w-0"
                >
                  <div className="relative aspect-[16/10] w-full rounded-lg bg-gradient-to-b from-black/45 to-black/25 border border-white/10 overflow-hidden flex items-center justify-center p-1.5">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.fileName}
                        className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
                      />
                    ) : (
                      <Box className="w-7 h-7 text-[#ff922e]/70" />
                    )}
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/65 border border-white/12 text-[9px] font-mono-num uppercase tracking-wide text-[#ffb238]">
                      {item.slot}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 min-w-0 pt-0.5">
                    <div className="min-w-0 flex-1">
                      <div
                        title={item.fileName}
                        className="text-[11px] sm:text-xs font-semibold text-white truncate"
                      >
                        {item.fileName}
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] font-mono-num text-slate-400 truncate">
                        {formatByteSize(item.byteLength)}
                      </div>
                    </div>
                    <button
                      type="button"
                      data-testid={`btn-delete-glb-${item.key}`}
                      disabled={isDeleting}
                      onClick={() => handleDelete(item.key)}
                      aria-label={`Delete ${item.fileName}`}
                      title={`Delete ${item.fileName}`}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg glass-btn-subtle text-slate-300 hover:text-[#ff6b4a] hover:border-[#ff4d2e]/40 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface TitleSettingsModalProps {
  graphicsQuality: GraphicsQuality;
  onChangeGraphicsQuality: (quality: GraphicsQuality) => void;
  volume?: number;
  audioMix: AudioMixSettings;
  muted: boolean;
  onChangeVolume?: (volume: number) => void;
  onChangeChannelVolume: (channel: AudioChannelId, volume: number) => void;
  onToggleMute: () => void;
  perfTelemetry: PerformanceTelemetrySnapshot;
  onClose: () => void;
}

export const TitleSettingsModal: React.FC<TitleSettingsModalProps> = ({
  graphicsQuality,
  onChangeGraphicsQuality,
  audioMix,
  muted,
  onChangeChannelVolume,
  onToggleMute,
  perfTelemetry,
  onClose,
}) => {
  const [section, setSection] = useState<'graphics' | 'music' | 'custom-glb'>('graphics');

  const sectionTitle =
    section === 'graphics'
      ? 'Graphics'
      : section === 'music'
        ? 'Music'
        : 'Custom GLB Models';

  return (
    <div
      data-testid="title-settings-modal"
      className="fixed inset-0 z-40 glass-fullscreen overflow-hidden flex items-center justify-center px-[max(0.75rem,calc(var(--safe-left)+0.5rem))] pr-[max(0.75rem,calc(var(--safe-right)+0.5rem))] pt-[max(0.75rem,calc(var(--safe-top)+0.4rem))] pb-[max(0.75rem,calc(var(--safe-bottom)+0.4rem))] sm:p-6 short-landscape:py-2"
    >
      <div className="w-full max-w-4xl h-full md:h-[500px] md:max-h-[calc(100dvh-3rem)] short-landscape:h-full short-landscape:max-h-full rounded-2xl glass-panel border border-white/12 p-2.5 sm:p-4 short-landscape:p-2.5 flex flex-row items-stretch gap-2.5 sm:gap-4 short-landscape:gap-3 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        {/* Vertical Section Sidebar */}
        <nav
          className="w-[98px] min-[480px]:w-[126px] sm:w-[164px] shrink-0 flex flex-col gap-1.5 sm:gap-2 pr-2 sm:pr-3.5 border-r border-white/12"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Home settings sections"
        >
          <button
            type="button"
            role="tab"
            aria-selected={section === 'graphics'}
            data-testid="tab-title-graphics"
            onClick={() => setSection('graphics')}
            className={`w-full text-left px-2.5 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
              section === 'graphics'
                ? 'glass-btn-orange-soft text-[#ffe8d6]'
                : 'glass-btn-subtle text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 shrink-0 text-[#ff922e]" />
            <span className="truncate">Graphics</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={section === 'music'}
            data-testid="tab-title-music"
            onClick={() => setSection('music')}
            className={`w-full text-left px-2.5 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
              section === 'music'
                ? 'glass-btn-orange-soft text-[#ffe8d6]'
                : 'glass-btn-subtle text-slate-300 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5 shrink-0 text-[#ff922e]" />
            <span className="truncate">Music</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={section === 'custom-glb'}
            data-testid="tab-title-custom-glb"
            onClick={() => setSection('custom-glb')}
            className={`w-full text-left px-2.5 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
              section === 'custom-glb'
                ? 'glass-btn-orange-soft text-[#ffe8d6]'
                : 'glass-btn-subtle text-slate-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5 shrink-0 text-[#ff922e]" />
            <span className="leading-tight">Custom GLB Models</span>
          </button>
        </nav>

        {/* Right Column: Aligned Section Bar + Close Button + Active Section Content */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-2 short-landscape:gap-1.5 overflow-hidden">
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10 shrink-0 min-h-[34px]">
            <span className="font-display text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-200 truncate">
              {sectionTitle}
            </span>
            <button
              type="button"
              data-testid="btn-close-title-settings"
              aria-label="Close settings"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg glass-btn-subtle text-slate-200 hover:text-white transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            {section === 'graphics' ? (
              <GraphicsSettingsSection
                graphicsQuality={graphicsQuality}
                onChangeGraphicsQuality={onChangeGraphicsQuality}
                perfTelemetry={perfTelemetry}
              />
            ) : section === 'music' ? (
              <MusicSettingsSection
                audioMix={audioMix}
                muted={muted}
                onChangeChannelVolume={onChangeChannelVolume}
                onToggleMute={onToggleMute}
              />
            ) : (
              <CustomGlbModelsSection />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
