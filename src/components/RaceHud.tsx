import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js';
import Minus from 'lucide-react/dist/esm/icons/minus.js';
import Pause from 'lucide-react/dist/esm/icons/pause.js';
import Plus from 'lucide-react/dist/esm/icons/plus.js';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw.js';
import Settings from 'lucide-react/dist/esm/icons/settings.js';
import Sliders from 'lucide-react/dist/esm/icons/sliders.js';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2.js';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x.js';
import X from 'lucide-react/dist/esm/icons/x.js';
import type { AudioChannelId, AudioMixSettings } from '../shared/audioSettings';
import type { GraphicsQuality } from '../shared/graphicsQuality';
import {
  createDefaultHudSettings,
  HUD_ELEMENT_LABELS,
  HUD_LIMITS,
  stepHudOpacity,
  stepHudScale,
  updateHudElement,
  type HudElementId,
  type HudSettings,
} from '../shared/hudSettings';
import { formatFpsDisplay, type PerformanceTelemetrySnapshot } from '../shared/perfTelemetry';
import { compileTrack } from '../shared/trackMath';
import type { TrackDefinition } from '../shared/types';
import type { HudTelemetry } from '../game/RaceEngine';
import { GraphicsSettingsSection, MusicSettingsSection } from './SettingsModal';

export type VirtualControlKey = 'throttle' | 'brake' | 'steerLeft' | 'steerRight';

interface RaceHudProps {
  hud: HudTelemetry;
  track: TrackDefinition;
  fps: number;
  perfTelemetry: PerformanceTelemetrySnapshot;
  graphicsQuality: GraphicsQuality;
  volume?: number;
  audioMix: AudioMixSettings;
  muted: boolean;
  hudSettings: HudSettings;
  settingsOpen: boolean;
  onChangeGraphicsQuality: (quality: GraphicsQuality) => void;
  onChangeVolume?: (volume: number) => void;
  onChangeChannelVolume: (channel: AudioChannelId, volume: number) => void;
  onChangeHudSettings: (next: HudSettings) => void;
  onToggleSettings: (open: boolean) => void;
  onToggleMute: () => void;
  onPause: () => void;
  onMobileDash: (dir: -1 | 1) => void;
  onVirtualControl: (control: VirtualControlKey, pressed: boolean) => void;
}

export function formatRaceTime(ms: number): string {
  const totalSec = Math.max(0, ms) / 1000;
  const mins = Math.floor(totalSec / 60);
  const secs = Math.floor(totalSec % 60);
  const tenths = Math.floor((totalSec * 10) % 10);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
}

/** Crisp triple-chevron SVG matching the warm racing orange-amber capsule control style. */
const TripleChevron: React.FC<{ direction: 'up' | 'down' | 'left' | 'right' }> = ({
  direction,
}) => {
  const rot =
    direction === 'up'
      ? -90
      : direction === 'down'
        ? 90
        : direction === 'left'
          ? 180
          : 0;
  return (
    <svg
      viewBox="0 0 36 20"
      className="w-6 h-4 sm:w-7 sm:h-4 drop-shadow-[0_0_6px_rgba(255,110,28,0.8)]"
      style={{ transform: `rotate(${rot}deg)` }}
      fill="none"
    >
      <path
        d="M5 4L11 10L5 16"
        stroke="#ff5a00"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M14 4L20 10L14 16"
        stroke="#ff922e"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.86"
      />
      <path
        d="M23 4L29 10L23 16"
        stroke="#ffe0b2"
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SPEEDO_CX = 160;
const SPEEDO_CY = 2;
const SPEEDO_RADIUS = 108;
const SPEEDO_START_DEG = 14;
const SPEEDO_END_DEG = 166;
const SPEEDO_TOTAL_INTERVALS = 7;
const SPEEDO_SUB_PER_MAJOR = 5;
const SPEEDO_TICK_COUNT = SPEEDO_TOTAL_INTERVALS * SPEEDO_SUB_PER_MAJOR;
const SPEEDO_DEG_PER_MAJOR = (SPEEDO_END_DEG - SPEEDO_START_DEG) / SPEEDO_TOTAL_INTERVALS;
const SPEEDO_RED_SPLIT_DEG = SPEEDO_START_DEG + 5 * SPEEDO_DEG_PER_MAJOR;

function speedoPolar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: SPEEDO_CX + Math.cos(rad) * r,
    y: SPEEDO_CY + Math.sin(rad) * r,
  };
}

function speedoArcPath(fromDeg: number, toDeg: number, r: number) {
  const p1 = speedoPolar(fromDeg, r);
  const p2 = speedoPolar(toDeg, r);
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

const StaticSpeedoDial = React.memo(() => {
  const majorMarks = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <defs>
        <radialGradient
          id="speedo-backdrop"
          gradientUnits="userSpaceOnUse"
          cx={SPEEDO_CX}
          cy={0}
          r={SPEEDO_RADIUS + 22}
        >
          <stop offset="0%" stopColor="rgba(6, 13, 24, 0.72)" />
          <stop offset="68%" stopColor="rgba(6, 13, 24, 0.40)" />
          <stop offset="92%" stopColor="rgba(6, 13, 24, 0.10)" />
          <stop offset="100%" stopColor="rgba(6, 13, 24, 0)" />
        </radialGradient>
      </defs>

      <path
        d={`M ${SPEEDO_CX - (SPEEDO_RADIUS + 22)} 0 A ${SPEEDO_RADIUS + 22} ${SPEEDO_RADIUS + 22} 0 0 0 ${SPEEDO_CX + (SPEEDO_RADIUS + 22)} 0 Z`}
        fill="url(#speedo-backdrop)"
      />

      <path
        d={speedoArcPath(SPEEDO_START_DEG, SPEEDO_END_DEG, SPEEDO_RADIUS)}
        fill="none"
        stroke="rgba(15, 23, 42, 0.65)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d={speedoArcPath(SPEEDO_START_DEG, SPEEDO_END_DEG, SPEEDO_RADIUS - 18)}
        fill="none"
        stroke="rgba(148, 163, 184, 0.14)"
        strokeWidth="1"
      />

      {Array.from({ length: SPEEDO_TICK_COUNT + 1 }, (_, idx) => {
        const deg = SPEEDO_START_DEG + (idx / SPEEDO_TICK_COUNT) * (SPEEDO_END_DEG - SPEEDO_START_DEG);
        const isMajor = idx % SPEEDO_SUB_PER_MAJOR === 0;
        const isRed = deg >= SPEEDO_RED_SPLIT_DEG - 0.5;
        const pOuter = speedoPolar(deg, SPEEDO_RADIUS - 3.5);
        const pInner = speedoPolar(deg, isMajor ? SPEEDO_RADIUS - 14.5 : SPEEDO_RADIUS - 9);
        return (
          <line
            key={idx}
            x1={pOuter.x}
            y1={pOuter.y}
            x2={pInner.x}
            y2={pInner.y}
            stroke={isRed ? '#fca5a5' : '#e2e8f0'}
            strokeWidth={isMajor ? 1.8 : 0.9}
            opacity={isMajor ? 0.92 : 0.52}
          />
        );
      })}

      {majorMarks.map((label) => {
        const deg = SPEEDO_START_DEG + label * SPEEDO_DEG_PER_MAJOR;
        const pt = speedoPolar(deg, SPEEDO_RADIUS - 26);
        const isRed = deg >= SPEEDO_RED_SPLIT_DEG - 0.5;
        return (
          <text
            key={label}
            x={pt.x}
            y={pt.y}
            fill={isRed ? '#fecaca' : '#f1f5f9'}
            fontSize="10.5"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-mono-num"
            opacity="0.9"
          >
            {label}
          </text>
        );
      })}

      <path
        d={speedoArcPath(SPEEDO_START_DEG, SPEEDO_RED_SPLIT_DEG - 1.5, SPEEDO_RADIUS)}
        fill="none"
        stroke="#ff8a2b"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      <path
        d={speedoArcPath(SPEEDO_RED_SPLIT_DEG + 0.5, SPEEDO_END_DEG, SPEEDO_RADIUS)}
        fill="none"
        stroke="#ef4444"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      <text
        x={SPEEDO_CX}
        y="43"
        fill="#cbd5e1"
        fontSize="8"
        fontWeight="500"
        textAnchor="middle"
        letterSpacing="1.4"
        opacity="0.8"
      >
        KM/H
      </text>
    </>
  );
});

/** Refined top-center inverted semi-circular cyan/red tachometer & digital speed readout. */
const InvertedArcSpeedometer: React.FC<{ speedKmh: number }> = ({ speedKmh }) => {
  const norm = Math.max(0, Math.min(1, speedKmh / 260));
  const needleDeg = SPEEDO_START_DEG + norm * (SPEEDO_END_DEG - SPEEDO_START_DEG);
  const needleTip = speedoPolar(needleDeg, SPEEDO_RADIUS - 8);
  const baseHalfAngle = 2.4;
  const baseL = speedoPolar(needleDeg - baseHalfAngle, 42);
  const baseR = speedoPolar(needleDeg + baseHalfAngle, 42);
  const needlePoints = `${baseL.x.toFixed(1)},${baseL.y.toFixed(1)} ${needleTip.x.toFixed(1)},${needleTip.y.toFixed(1)} ${baseR.x.toFixed(1)},${baseR.y.toFixed(1)}`;

  return (
    <div className="relative w-[160px] min-[480px]:w-[216px] sm:w-[276px] [@media(max-height:540px)]:w-[186px] h-[68px] min-[480px]:h-[90px] sm:h-[116px] [@media(max-height:540px)]:h-[78px] select-none pointer-events-none">
      <svg viewBox="0 0 320 132" className="w-full h-full">
        <StaticSpeedoDial />
        <polygon points={needlePoints} fill="#f87171" opacity="0.96" />
        <text
          x={SPEEDO_CX}
          y="29"
          fill="#ffffff"
          fontSize="24"
          fontWeight="700"
          textAnchor="middle"
          className="font-display tabular-nums"
          data-testid="hud-speed"
        >
          {speedKmh}
        </text>
      </svg>
    </div>
  );
};

export const RaceHud: React.FC<RaceHudProps> = ({
  hud,
  track,
  fps,
  perfTelemetry,
  graphicsQuality,
  audioMix,
  muted,
  hudSettings,
  settingsOpen,
  onChangeGraphicsQuality,
  onChangeChannelVolume,
  onChangeHudSettings,
  onToggleSettings,
  onToggleMute,
  onPause,
  onMobileDash,
  onVirtualControl,
}) => {
  const [settingsTab, setSettingsTab] = useState<'hud' | 'music' | 'graphics'>('graphics');
  const [selectedElement, setSelectedElement] = useState<HudElementId | 'all'>('stats');
  const dragRef = useRef<{
    id: HudElementId;
    startX: number;
    startY: number;
    origOffsetX: number;
    origOffsetY: number;
  } | null>(null);
  const activePointersRef = useRef<Map<number, VirtualControlKey>>(new Map());
  const lastPointerTapAtRef = useRef<Record<string, number>>({});

  const hudEditingActive = settingsOpen && settingsTab === 'hud';
  const widgetLayerZ = hudEditingActive ? 'z-30' : 'z-10';

  const syncControlState = (control: VirtualControlKey) => {
    let stillHeld = false;
    for (const heldControl of activePointersRef.current.values()) {
      if (heldControl === control) {
        stillHeld = true;
        break;
      }
    }
    onVirtualControl(control, stillHeld);
  };

  // Default to the Graphics section each time Settings opens, and release held controls
  useEffect(() => {
    if (settingsOpen) {
      setSettingsTab('graphics');
      activePointersRef.current.clear();
      onVirtualControl('throttle', false);
      onVirtualControl('brake', false);
      onVirtualControl('steerLeft', false);
      onVirtualControl('steerRight', false);
    }
  }, [settingsOpen, onVirtualControl]);

  // Ensure any active touch pointer released anywhere on screen cleanly releases only its own control
  useEffect(() => {
    const releasePointer = (pointerId: number) => {
      const control = activePointersRef.current.get(pointerId);
      if (!control) return;
      activePointersRef.current.delete(pointerId);
      syncControlState(control);
    };

    const handleWindowPointerEnd = (e: PointerEvent) => {
      releasePointer(e.pointerId);
    };

    const handleWindowBlur = () => {
      if (activePointersRef.current.size === 0) return;
      activePointersRef.current.clear();
      onVirtualControl('throttle', false);
      onVirtualControl('brake', false);
      onVirtualControl('steerLeft', false);
      onVirtualControl('steerRight', false);
    };

    window.addEventListener('pointerup', handleWindowPointerEnd, true);
    window.addEventListener('pointercancel', handleWindowPointerEnd, true);
    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('pointerup', handleWindowPointerEnd, true);
      window.removeEventListener('pointercancel', handleWindowPointerEnd, true);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [onVirtualControl]);

  useEffect(() => {
    if (!hudEditingActive) {
      dragRef.current = null;
      return;
    }

    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const vw = Math.max(320, window.innerWidth);
      const vh = Math.max(240, window.innerHeight);
      const dxPct = ((e.clientX - drag.startX) / vw) * 100;
      const dyPct = ((e.clientY - drag.startY) / vh) * 100;
      onChangeHudSettings(
        updateHudElement(hudSettings, drag.id, {
          offsetX: drag.origOffsetX + dxPct,
          offsetY: drag.origOffsetY + dyPct,
        }),
      );
    };

    const onUp = () => {
      dragRef.current = null;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [hudEditingActive, hudSettings, onChangeHudSettings]);

  // Precompute normalized SVG path & bounding box for the track minimap
  const minimapData = useMemo(() => {
    const compiled = compileTrack(track, 90);
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (const s of compiled.samples) {
      if (s.x < minX) minX = s.x;
      if (s.x > maxX) maxX = s.x;
      if (s.z < minZ) minZ = s.z;
      if (s.z > maxZ) maxZ = s.z;
    }
    const span = Math.max(10, maxX - minX, maxZ - minZ);
    const pad = 11;
    const size = 104;
    const scale = (size - pad * 2) / span;
    const cx = (minX + maxX) * 0.5;
    const cz = (minZ + maxZ) * 0.5;

    const toSvg = (wx: number, wz: number) => ({
      x: size * 0.5 + (wx - cx) * scale,
      y: size * 0.5 + (wz - cz) * scale,
    });

    const d =
      compiled.samples
        .map((s, idx) => {
          const pt = toSvg(s.x, s.z);
          return `${idx === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
        })
        .join(' ') + ' Z';

    return { d, toSvg, size };
  }, [track]);

  const dashReady = hud.dashCooldownRatio <= 0.02;

  const startDragWidget = (id: HudElementId, e: React.PointerEvent) => {
    if (!hudEditingActive) return;
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(id);
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origOffsetX: hudSettings[id].offsetX,
      origOffsetY: hudSettings[id].offsetY,
    };
  };

  const widgetStyle = (
    id: HudElementId,
    origin: string,
    baseTranslateX = '0px',
  ): React.CSSProperties => {
    const cfg = hudSettings[id];
    return {
      transform: `translate(calc(${baseTranslateX} + ${cfg.offsetX}vw), ${cfg.offsetY}vh) scale(${cfg.scale})`,
      transformOrigin: origin,
      opacity: cfg.opacity,
    };
  };

  const editFrameClass = (id: HudElementId, shape = 'rounded-xl') => {
    if (!hudEditingActive) return '';
    const isSel = selectedElement === 'all' || selectedElement === id;
    return `pointer-events-auto cursor-move ${shape} ring-1 transition-all ${
      isSel
        ? 'ring-[#ff922e]/85 bg-[#ff5a00]/[0.08] shadow-[0_0_12px_rgba(255,90,0,0.25)]'
        : 'ring-white/25 hover:ring-[#ff922e]/65'
    }`;
  };

  const activeCfg =
    selectedElement === 'all' ? hudSettings.stats : hudSettings[selectedElement];
  const activeLabel =
    selectedElement === 'all' ? 'All HUD' : HUD_ELEMENT_LABELS[selectedElement];

  const bindHoldControl = (control: VirtualControlKey) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (settingsOpen) return;
      e.preventDefault();
      e.stopPropagation();
      activePointersRef.current.set(e.pointerId, control);
      onVirtualControl(control, true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unavailable
      }
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      const releasedControl = activePointersRef.current.get(e.pointerId);
      if (releasedControl) {
        activePointersRef.current.delete(e.pointerId);
        syncControlState(releasedControl);
      } else {
        onVirtualControl(control, false);
      }
    },
    onPointerCancel: (e: React.PointerEvent<HTMLButtonElement>) => {
      const releasedControl = activePointersRef.current.get(e.pointerId);
      if (releasedControl) {
        activePointersRef.current.delete(e.pointerId);
        syncControlState(releasedControl);
      } else {
        onVirtualControl(control, false);
      }
    },
    onLostPointerCapture: (e: React.PointerEvent<HTMLButtonElement>) => {
      const releasedControl = activePointersRef.current.get(e.pointerId);
      if (releasedControl) {
        activePointersRef.current.delete(e.pointerId);
        syncControlState(releasedControl);
      }
    },
  });

  const bindInstantAction = (actionKey: string, action: () => void) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (settingsOpen) return;
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.blur();
      lastPointerTapAtRef.current[actionKey] = performance.now();
      action();
    },
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (settingsOpen) return;
      e.currentTarget.blur();
      const lastTap = lastPointerTapAtRef.current[actionKey] ?? 0;
      if (e.detail !== 0 && performance.now() - lastTap < 450) return;
      action();
    },
  });

  return (
    <div
      data-testid="race-hud"
      className="fixed inset-0 z-10 pointer-events-none select-none overflow-hidden touch-none"
    >
      {/* 1. Top-Left Telemetry Bar */}
      <div
        data-testid="hud-widget-stats"
        onPointerDown={(e) => startDragWidget('stats', e)}
        style={widgetStyle('stats', 'top left')}
        className={`fixed top-[max(0.6rem,calc(var(--safe-top)+0.2rem))] left-[max(0.6rem,calc(var(--safe-left)+0.4rem))] min-[480px]:top-4 min-[480px]:left-[max(1rem,calc(var(--safe-left)+0.75rem))] ${widgetLayerZ} ${editFrameClass('stats', 'rounded-sm')}`}
      >
        <div
          className="flex items-center gap-1.5 min-[480px]:gap-2.5 sm:gap-3.5 px-2.5 min-[480px]:px-3.5 sm:px-4 py-1 min-[480px]:py-1.5 sm:py-2 pr-4 min-[480px]:pr-5 sm:pr-6 bg-[#100d11]/80 backdrop-blur-md border-t-2 border-l-2 border-[#ff6b1a] shadow-[0_0_14px_rgba(255,90,0,0.22)]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
          }}
        >
          <div className="font-display text-[11px] min-[480px]:text-xs sm:text-base font-extrabold text-white tabular-nums tracking-wide">
            {hud.position}/{hud.totalRacers}
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              LAP
            </span>
            <span className="font-display text-[10.5px] min-[480px]:text-[11px] sm:text-sm font-bold text-white tabular-nums mt-0.5">
              {hud.lap}/{hud.totalLaps}
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              TIME
            </span>
            <span className="font-mono-num text-[10.5px] min-[480px]:text-[11px] sm:text-sm font-bold text-white mt-0.5">
              {formatRaceTime(hud.elapsedMs)}
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              FPS
            </span>
            <span
              data-testid="hud-fps"
              className="font-mono-num text-[10.5px] min-[480px]:text-[11px] sm:text-sm font-bold text-white mt-0.5"
            >
              {formatFpsDisplay(fps)}
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              RAMS
            </span>
            <span className="font-mono-num text-[10.5px] min-[480px]:text-[11px] sm:text-sm font-bold text-white mt-0.5">
              {hud.ramHits}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top-Center Inverted Arc Tachometer & Speedometer */}
      <div
        data-testid="hud-widget-speedo"
        onPointerDown={(e) => startDragWidget('speedo', e)}
        style={widgetStyle('speedo', 'top center', '-50%')}
        className={`fixed top-[max(0px,var(--safe-top))] [@media(max-width:520px)]:top-[max(3.3rem,calc(var(--safe-top)+2.9rem))] left-1/2 ${widgetLayerZ} ${editFrameClass('speedo', 'rounded-b-full')}`}
      >
        <InvertedArcSpeedometer speedKmh={hud.speedKmh} />
      </div>

      {/* 3. Top-Right HUD Gear Settings Button (Independent — stacks under minimap on narrow <480px phones) */}
      <div
        data-testid="hud-widget-settingsBtn"
        onPointerDown={(e) => startDragWidget('settingsBtn', e)}
        style={widgetStyle('settingsBtn', 'top right')}
        className={`fixed top-[calc(max(0.6rem,var(--safe-top)+0.2rem)+66px)] right-[max(0.6rem,calc(var(--safe-right)+0.4rem))] min-[480px]:top-[max(0.65rem,calc(var(--safe-top)+0.25rem))] min-[480px]:right-[calc(max(0.75rem,var(--safe-right)+0.5rem)+138px)] sm:top-4 sm:right-[calc(max(1rem,var(--safe-right)+0.75rem)+164px)] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('settingsBtn', 'rounded-md') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          data-testid="btn-hud-settings"
          {...bindInstantAction('settings', () => onToggleSettings(true))}
          aria-label="HUD Settings"
          className={`flex items-center justify-center w-8 h-8 rounded-md glass-btn-hud text-white/95 hover:text-[#ffb238] touch-none transition-all active:scale-95 ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Top-Right Audio Mute Button (Independent) */}
      <div
        data-testid="hud-widget-muteBtn"
        onPointerDown={(e) => startDragWidget('muteBtn', e)}
        style={widgetStyle('muteBtn', 'top right')}
        className={`fixed top-[max(0.6rem,calc(var(--safe-top)+0.2rem))] right-[calc(max(0.6rem,var(--safe-right)+0.4rem)+82px)] min-[480px]:top-[max(0.65rem,calc(var(--safe-top)+0.25rem))] min-[480px]:right-[calc(max(0.75rem,var(--safe-right)+0.5rem)+98px)] sm:top-4 sm:right-[calc(max(1rem,var(--safe-right)+0.75rem)+122px)] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('muteBtn', 'rounded-md') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          {...bindInstantAction('mute', onToggleMute)}
          aria-label={muted ? 'Unmute audio (M)' : 'Mute audio (M)'}
          className={`flex items-center justify-center w-8 h-8 rounded-md glass-btn-hud text-white touch-none transition-all active:scale-95 ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          {muted ? <VolumeX className="w-4 h-4 text-[#FF5A00]" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 5. Top-Right Pause Button (Independent) */}
      <div
        data-testid="hud-widget-pauseBtn"
        onPointerDown={(e) => startDragWidget('pauseBtn', e)}
        style={widgetStyle('pauseBtn', 'top right')}
        className={`fixed top-[calc(max(0.6rem,var(--safe-top)+0.2rem)+38px)] right-[calc(max(0.6rem,var(--safe-right)+0.4rem)+82px)] min-[480px]:top-[calc(max(0.65rem,var(--safe-top)+0.25rem)+38px)] min-[480px]:right-[calc(max(0.75rem,var(--safe-right)+0.5rem)+98px)] sm:top-[54px] sm:right-[calc(max(1rem,var(--safe-right)+0.75rem)+122px)] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('pauseBtn', 'rounded-md') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          {...bindInstantAction('pause', onPause)}
          aria-label="Pause race (Esc)"
          className={`flex items-center justify-center w-8 h-8 rounded-md glass-btn-hud text-white touch-none transition-all active:scale-95 ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <Pause className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Top-Right Minimap (Independent) */}
      <div
        data-testid="hud-widget-minimap"
        onPointerDown={(e) => startDragWidget('minimap', e)}
        style={widgetStyle('minimap', 'top right')}
        className={`fixed top-[max(0.6rem,calc(var(--safe-top)+0.2rem))] right-[max(0.6rem,calc(var(--safe-right)+0.4rem))] min-[480px]:top-[max(0.65rem,calc(var(--safe-top)+0.25rem))] min-[480px]:right-[max(0.75rem,calc(var(--safe-right)+0.5rem))] sm:top-4 sm:right-[max(1rem,calc(var(--safe-right)+0.75rem))] ${widgetLayerZ} ${editFrameClass('minimap', 'rounded-md')}`}
      >
        <div className="p-1 min-[480px]:p-1.5 rounded-md glass-panel border border-[#ff6b1a]/60 shadow-[0_0_12px_rgba(255,90,0,0.22)]">
          <svg
            width={minimapData.size}
            height={minimapData.size}
            viewBox={`0 0 ${minimapData.size} ${minimapData.size}`}
            className="w-[64px] h-[50px] min-[480px]:w-[70px] min-[480px]:h-[56px] sm:w-[100px] sm:h-[78px]"
          >
            <path
              d={minimapData.d}
              fill="none"
              stroke="rgba(248,250,252,0.9)"
              strokeWidth="4.2"
              strokeLinejoin="round"
            />
            {hud.racersMinimap.map((r) => {
              const pt = minimapData.toSvg(r.x, r.z);
              return (
                <circle
                  key={r.id}
                  cx={pt.x}
                  cy={pt.y}
                  r={r.isLocal ? 4.4 : 3.1}
                  fill={r.isLocal ? '#ff7a18' : r.color}
                  stroke="#140c08"
                  strokeWidth="1.2"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Center Non-Blocking Countdown / Ram Banner */}
      {!settingsOpen && (
        <div className="fixed inset-x-0 top-[142px] min-[520px]:top-28 sm:top-32 [@media(max-height:540px)]:top-[92px] flex flex-col items-center justify-center pointer-events-none z-10">
          {hud.status === 'countdown' && (
            <div className="px-6 sm:px-7 py-2.5 sm:py-3 [@media(max-height:540px)]:py-1.5 rounded-xl glass-panel border border-[#ff6b1a]/60 shadow-[0_0_24px_rgba(255,90,0,0.25)] text-center">
              <div className="font-display text-4xl sm:text-6xl [@media(max-height:540px)]:text-4xl font-extrabold text-white tabular-nums">
                {hud.countdownSec > 0 ? hud.countdownSec : 'GO!'}
              </div>
            </div>
          )}
          {hud.recentRamBanner && hud.status === 'racing' && (
            <div className="px-4 py-1 rounded-md glass-panel border border-[#ff6b1a] text-[#ffe0b2] font-display font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_12px_rgba(255,90,0,0.3)]">
              {hud.recentRamBanner}
            </div>
          )}
        </div>
      )}

      {/* 7. Bottom-Left Throttle Button ^^^ (Independent) */}
      <div
        data-testid="hud-widget-throttleBtn"
        onPointerDown={(e) => startDragWidget('throttleBtn', e)}
        style={widgetStyle('throttleBtn', 'bottom left')}
        className={`fixed bottom-[calc(max(0.75rem,var(--safe-bottom)+0.35rem)+50px)] left-[max(0.75rem,calc(var(--safe-left)+0.45rem))] sm:bottom-[84px] sm:left-[max(1.5rem,calc(var(--safe-left)+0.75rem))] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('throttleBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Accelerate"
          {...bindHoldControl('throttle')}
          className={`w-14 h-10 min-[420px]:w-16 min-[420px]:h-11 sm:w-[70px] sm:h-11 rounded-xl glass-btn-hud active:scale-95 flex items-center justify-center touch-none transition-all ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <TripleChevron direction="up" />
        </button>
      </div>

      {/* 8. Bottom-Left Brake/Reverse Button vvv (Independent) */}
      <div
        data-testid="hud-widget-brakeBtn"
        onPointerDown={(e) => startDragWidget('brakeBtn', e)}
        style={widgetStyle('brakeBtn', 'bottom left')}
        className={`fixed bottom-[max(0.75rem,calc(var(--safe-bottom)+0.35rem))] left-[max(0.75rem,calc(var(--safe-left)+0.45rem))] sm:bottom-6 sm:left-[max(1.5rem,calc(var(--safe-left)+0.75rem))] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('brakeBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Brake or Reverse"
          {...bindHoldControl('brake')}
          className={`w-14 h-10 min-[420px]:w-16 min-[420px]:h-11 sm:w-[70px] sm:h-11 rounded-xl glass-btn-hud active:scale-95 flex items-center justify-center touch-none transition-all ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <TripleChevron direction="down" />
        </button>
      </div>

      {/* 9. Bottom-Right Lateral Ram Left Button (Independent) */}
      <div
        data-testid="hud-widget-ramLeftBtn"
        onPointerDown={(e) => startDragWidget('ramLeftBtn', e)}
        style={widgetStyle('ramLeftBtn', 'bottom right')}
        className={`fixed bottom-[calc(max(0.75rem,var(--safe-bottom)+0.35rem)+50px)] right-[calc(max(0.75rem,var(--safe-right)+0.45rem)+80px)] min-[420px]:right-[calc(max(0.75rem,var(--safe-right)+0.45rem)+92px)] sm:bottom-[82px] sm:right-[calc(max(1.5rem,var(--safe-right)+0.75rem)+102px)] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('ramLeftBtn', 'rounded-full') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Lateral Ram Left (Q)"
          data-testid="btn-ram-left"
          {...bindInstantAction('ramLeft', () => onMobileDash(-1))}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center glass-btn-primary text-[#141414] touch-none transition-all active:scale-95 ${
            dashReady ? 'opacity-100' : 'opacity-50'
          } ${settingsOpen ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.75]" />
        </button>
      </div>

      {/* 10. Bottom-Right Lateral Ram Right Button (Independent) */}
      <div
        data-testid="hud-widget-ramRightBtn"
        onPointerDown={(e) => startDragWidget('ramRightBtn', e)}
        style={widgetStyle('ramRightBtn', 'bottom right')}
        className={`fixed bottom-[calc(max(0.75rem,var(--safe-bottom)+0.35rem)+50px)] right-[calc(max(0.75rem,var(--safe-right)+0.45rem)+10px)] min-[420px]:right-[calc(max(0.75rem,var(--safe-right)+0.45rem)+14px)] sm:bottom-[82px] sm:right-[calc(max(1.5rem,var(--safe-right)+0.75rem)+16px)] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('ramRightBtn', 'rounded-full') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Lateral Ram Right (E)"
          data-testid="btn-ram-right"
          {...bindInstantAction('ramRight', () => onMobileDash(1))}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center glass-btn-primary text-[#141414] touch-none transition-all active:scale-95 ${
            dashReady ? 'opacity-100' : 'opacity-50'
          } ${settingsOpen ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
          <ArrowRight className="w-4 h-4 stroke-[2.75]" />
        </button>
      </div>

      {/* 11. Bottom-Right Steer Left Capsule (Independent) */}
      <div
        data-testid="hud-widget-steerLeftBtn"
        onPointerDown={(e) => startDragWidget('steerLeftBtn', e)}
        style={widgetStyle('steerLeftBtn', 'bottom right')}
        className={`fixed bottom-[max(0.75rem,calc(var(--safe-bottom)+0.35rem))] right-[calc(max(0.75rem,var(--safe-right)+0.45rem)+66px)] min-[420px]:right-[calc(max(0.75rem,var(--safe-right)+0.45rem)+76px)] sm:bottom-6 sm:right-[calc(max(1.5rem,var(--safe-right)+0.75rem)+84px)] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('steerLeftBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Steer Left"
          {...bindHoldControl('steerLeft')}
          className={`w-14 h-10 min-[420px]:w-16 min-[420px]:h-11 sm:w-[70px] sm:h-11 rounded-xl glass-btn-hud active:scale-95 flex items-center justify-center touch-none transition-all ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <TripleChevron direction="left" />
        </button>
      </div>

      {/* 12. Bottom-Right Steer Right Capsule (Independent) */}
      <div
        data-testid="hud-widget-steerRightBtn"
        onPointerDown={(e) => startDragWidget('steerRightBtn', e)}
        style={widgetStyle('steerRightBtn', 'bottom right')}
        className={`fixed bottom-[max(0.75rem,calc(var(--safe-bottom)+0.35rem))] right-[max(0.75rem,calc(var(--safe-right)+0.45rem))] sm:bottom-6 sm:right-[max(1.5rem,calc(var(--safe-right)+0.75rem))] ${widgetLayerZ} ${
          settingsOpen ? editFrameClass('steerRightBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Steer Right"
          {...bindHoldControl('steerRight')}
          className={`w-14 h-10 min-[420px]:w-16 min-[420px]:h-11 sm:w-[70px] sm:h-11 rounded-xl glass-btn-hud active:scale-95 flex items-center justify-center touch-none transition-all ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <TripleChevron direction="right" />
        </button>
      </div>

      {/* Full-Screen In-Match Settings (HUD Layout / Music / Graphics) — Zero Scrollbars */}
      {settingsOpen && settingsTab === 'hud' && (
        <div
          data-testid="hud-settings-modal"
          className="fixed inset-0 z-20 bg-[#0c0a0d]/45 backdrop-blur-sm flex items-center justify-center pointer-events-none p-2.5 overflow-hidden"
        >
          <div className="pointer-events-auto z-40 w-full max-w-[356px] rounded-2xl glass-panel border border-white/15 px-3.5 py-3 space-y-2.5 overflow-hidden">
            {/* Section Tabs + Close */}
            <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-white/10">
              <div
                className="flex items-center gap-1"
                role="tablist"
                aria-label="In-match settings sections"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected
                  data-testid="tab-hud-layout"
                  onClick={() => setSettingsTab('hud')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer glass-btn-orange-soft text-[#ffe8d6]"
                >
                  HUD Layout
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  data-testid="tab-music-settings"
                  onClick={() => setSettingsTab('music')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer glass-btn-subtle border-transparent text-slate-300 hover:text-white"
                >
                  Music
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  data-testid="tab-graphics-settings"
                  onClick={() => setSettingsTab('graphics')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer glass-btn-subtle border-transparent text-slate-300 hover:text-white"
                >
                  Graphics
                </button>
              </div>
              <button
                type="button"
                aria-label="Close Settings"
                onClick={() => onToggleSettings(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg glass-btn-subtle text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p
                className="text-[11px] text-slate-300 truncate"
                data-testid="hud-selected-label"
              >
                Tap or drag any control · <span className="text-[#ffb238]">{activeLabel}</span>
              </p>
              <button
                type="button"
                data-testid="btn-hud-select-all"
                onClick={() =>
                  setSelectedElement((prev) => (prev === 'all' ? 'stats' : 'all'))
                }
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer shrink-0 ${
                  selectedElement === 'all'
                    ? 'glass-btn-orange-soft text-[#ffe0b2]'
                    : 'glass-btn-subtle border-transparent text-slate-300 hover:text-white'
                }`}
              >
                All
              </button>
            </div>

            {/* Size & Opacity Sliders */}
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-normal">Size</span>
                  <span
                    className="font-mono-num text-[#ffb238] text-[11px]"
                    data-testid="hud-scale-value"
                  >
                    {Math.round(activeCfg.scale * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    data-testid="hud-scale-dec"
                    aria-label="Decrease HUD Size"
                    onClick={() =>
                      onChangeHudSettings(stepHudScale(hudSettings, selectedElement, -0.1))
                    }
                    className="w-6 h-6 flex items-center justify-center rounded-full glass-btn-subtle text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="range"
                    data-testid="hud-scale-slider"
                    min={HUD_LIMITS.scaleMin}
                    max={HUD_LIMITS.scaleMax}
                    step={0.05}
                    value={activeCfg.scale}
                    onChange={(e) =>
                      onChangeHudSettings(
                        updateHudElement(hudSettings, selectedElement, {
                          scale: Number(e.target.value),
                        }),
                      )
                    }
                    aria-label="HUD Size"
                    className="flex-1 hud-minimal-slider"
                  />
                  <button
                    type="button"
                    data-testid="hud-scale-inc"
                    aria-label="Increase HUD Size"
                    onClick={() =>
                      onChangeHudSettings(stepHudScale(hudSettings, selectedElement, 0.1))
                    }
                    className="w-6 h-6 flex items-center justify-center rounded-full glass-btn-subtle text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-normal">Opacity</span>
                  <span
                    className="font-mono-num text-[#ffb238] text-[11px]"
                    data-testid="hud-opacity-value"
                  >
                    {Math.round(activeCfg.opacity * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    data-testid="hud-opacity-dec"
                    aria-label="Decrease HUD Opacity"
                    onClick={() =>
                      onChangeHudSettings(stepHudOpacity(hudSettings, selectedElement, -0.1))
                    }
                    className="w-6 h-6 flex items-center justify-center rounded-full glass-btn-subtle text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="range"
                    data-testid="hud-opacity-slider"
                    min={HUD_LIMITS.opacityMin}
                    max={HUD_LIMITS.opacityMax}
                    step={0.05}
                    value={activeCfg.opacity}
                    onChange={(e) =>
                      onChangeHudSettings(
                        updateHudElement(hudSettings, selectedElement, {
                          opacity: Number(e.target.value),
                        }),
                      )
                    }
                    aria-label="HUD Opacity"
                    className="flex-1 hud-minimal-slider"
                  />
                  <button
                    type="button"
                    data-testid="hud-opacity-inc"
                    aria-label="Increase HUD Opacity"
                    onClick={() =>
                      onChangeHudSettings(stepHudOpacity(hudSettings, selectedElement, 0.1))
                    }
                    className="w-6 h-6 flex items-center justify-center rounded-full glass-btn-subtle text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
              <button
                type="button"
                data-testid="btn-hud-reset"
                onClick={() => onChangeHudSettings(createDefaultHudSettings())}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-btn-subtle text-[11px] font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                data-testid="btn-hud-done"
                onClick={() => onToggleSettings(false)}
                className="px-4 py-1 rounded-lg glass-btn-primary text-[#141414] font-display text-xs font-bold transition-all cursor-pointer active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && settingsTab !== 'hud' && (
        <div
          data-testid="hud-settings-modal"
          className="pointer-events-auto fixed inset-0 z-40 glass-fullscreen overflow-hidden flex flex-col px-[max(0.75rem,calc(var(--safe-left)+0.5rem))] pr-[max(0.75rem,calc(var(--safe-right)+0.5rem))] pt-[max(0.75rem,calc(var(--safe-top)+0.4rem))] pb-[max(0.75rem,calc(var(--safe-bottom)+0.4rem))] sm:p-6 short-landscape:py-2"
        >
          <div className="w-full max-w-3xl mx-auto h-full min-h-0 flex flex-col justify-between gap-2.5 sm:gap-4 short-landscape:gap-2 overflow-hidden">
            {/* Full-Screen Header + 3 Section Tabs */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/12 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="hidden min-[440px]:flex items-center gap-1.5 shrink-0">
                  <Sliders className="w-4 h-4 text-[#ff922e]" />
                  <h2 className="font-display text-base sm:text-xl font-bold text-white tracking-wide">
                    Settings
                  </h2>
                </div>

                <div
                  className="flex items-center gap-1 sm:gap-1.5"
                  role="tablist"
                  aria-label="In-match settings sections"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={false}
                    data-testid="tab-hud-layout"
                    onClick={() => setSettingsTab('hud')}
                    className="px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer glass-btn-subtle text-slate-300 hover:text-white whitespace-nowrap"
                  >
                    HUD Layout
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={settingsTab === 'music'}
                    data-testid="tab-music-settings"
                    onClick={() => setSettingsTab('music')}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      settingsTab === 'music'
                        ? 'glass-btn-orange-soft text-[#ffe8d6]'
                        : 'glass-btn-subtle text-slate-300 hover:text-white'
                    }`}
                  >
                    Music
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={settingsTab === 'graphics'}
                    data-testid="tab-graphics-settings"
                    onClick={() => setSettingsTab('graphics')}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      settingsTab === 'graphics'
                        ? 'glass-btn-orange-soft text-[#ffe8d6]'
                        : 'glass-btn-subtle text-slate-300 hover:text-white'
                    }`}
                  >
                    Graphics
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  data-testid="btn-hud-done-compact"
                  onClick={() => onToggleSettings(false)}
                  className="hidden short-landscape:inline-flex px-3.5 py-1 rounded-lg glass-btn-primary text-[#141414] font-display font-bold text-xs tracking-wide transition-all cursor-pointer active:scale-95"
                >
                  Done
                </button>
                <button
                  type="button"
                  aria-label="Close Settings"
                  onClick={() => onToggleSettings(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg glass-btn-subtle text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Full-Screen Section Content (Zero Scrollbars) */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {settingsTab === 'graphics' ? (
                <GraphicsSettingsSection
                  graphicsQuality={graphicsQuality}
                  onChangeGraphicsQuality={onChangeGraphicsQuality}
                  perfTelemetry={perfTelemetry}
                />
              ) : (
                <MusicSettingsSection
                  audioMix={audioMix}
                  muted={muted}
                  onChangeChannelVolume={onChangeChannelVolume}
                  onToggleMute={onToggleMute}
                />
              )}
            </div>

            {/* Footer Done (Portrait & Desktop) */}
            <div className="flex short-landscape:hidden justify-end pt-2 border-t border-white/10 shrink-0">
              <button
                type="button"
                data-testid="btn-hud-done"
                onClick={() => onToggleSettings(false)}
                className="px-6 py-2 rounded-lg glass-btn-primary text-[#141414] font-display font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
