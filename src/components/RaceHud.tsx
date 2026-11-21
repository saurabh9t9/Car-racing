import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js';
import Minus from 'lucide-react/dist/esm/icons/minus.js';
import Pause from 'lucide-react/dist/esm/icons/pause.js';
import Plus from 'lucide-react/dist/esm/icons/plus.js';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw.js';
import Settings from 'lucide-react/dist/esm/icons/settings.js';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2.js';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x.js';
import X from 'lucide-react/dist/esm/icons/x.js';
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
import { compileTrack } from '../shared/trackMath';
import type { TrackDefinition } from '../shared/types';
import type { HudTelemetry } from '../game/RaceEngine';

export type VirtualControlKey = 'throttle' | 'brake' | 'steerLeft' | 'steerRight';

interface RaceHudProps {
  hud: HudTelemetry;
  track: TrackDefinition;
  muted: boolean;
  hudSettings: HudSettings;
  settingsOpen: boolean;
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

/** Crisp triple-chevron SVG matching the cyan glowing capsule control style. */
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
      className="w-6 h-4 sm:w-7 sm:h-4 drop-shadow-[0_0_6px_rgba(34,211,238,0.85)]"
      style={{ transform: `rotate(${rot}deg)` }}
      fill="none"
    >
      <path
        d="M5 4L11 10L5 16"
        stroke="#67e8f9"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.48"
      />
      <path
        d="M14 4L20 10L14 16"
        stroke="#38bdf8"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.82"
      />
      <path
        d="M23 4L29 10L23 16"
        stroke="#cffafe"
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Refined top-center inverted semi-circular cyan/red tachometer & digital speed readout. */
const InvertedArcSpeedometer: React.FC<{ speedKmh: number }> = ({ speedKmh }) => {
  const cx = 160;
  const cy = 2;
  const radius = 108;

  // Symmetric 152° sweep: 14° (upper right) -> 90° (bottom) -> 166° (upper left)
  const startDeg = 14;
  const endDeg = 166;
  const totalIntervals = 7; // 0 (idle), 1, 2, 3, 4, 5, 6, 7
  const subPerMajor = 5;
  const tickCount = totalIntervals * subPerMajor; // 35 intervals -> major ticks at 5, 10, ..., 35
  const degPerMajor = (endDeg - startDeg) / totalIntervals;
  const redSplitDeg = startDeg + 5 * degPerMajor; // Redline starts right at mark 5

  const polar = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * r,
      y: cy + Math.sin(rad) * r,
    };
  };

  const arcPath = (fromDeg: number, toDeg: number, r: number) => {
    const p1 = polar(fromDeg, r);
    const p2 = polar(toDeg, r);
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  };

  const norm = Math.max(0, Math.min(1, speedKmh / 260));
  const needleDeg = startDeg + norm * (endDeg - startDeg);
  const needleTip = polar(needleDeg, radius - 8);
  const baseHalfAngle = 2.4;
  const baseL = polar(needleDeg - baseHalfAngle, 42);
  const baseR = polar(needleDeg + baseHalfAngle, 42);
  const needlePoints = `${baseL.x.toFixed(1)},${baseL.y.toFixed(1)} ${needleTip.x.toFixed(1)},${needleTip.y.toFixed(1)} ${baseR.x.toFixed(1)},${baseR.y.toFixed(1)}`;

  const majorMarks = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="relative w-[224px] sm:w-[276px] h-[94px] sm:h-[116px] select-none pointer-events-none">
      <svg viewBox="0 0 320 132" className="w-full h-full">
        <defs>
          <radialGradient
            id="speedo-backdrop"
            gradientUnits="userSpaceOnUse"
            cx={cx}
            cy={0}
            r={radius + 22}
          >
            <stop offset="0%" stopColor="rgba(6, 13, 24, 0.72)" />
            <stop offset="68%" stopColor="rgba(6, 13, 24, 0.40)" />
            <stop offset="92%" stopColor="rgba(6, 13, 24, 0.10)" />
            <stop offset="100%" stopColor="rgba(6, 13, 24, 0)" />
          </radialGradient>
          <filter id="cyan-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Seamless radial smoke backdrop reaching full 0% alpha before SVG edge */}
        <path
          d={`M ${cx - (radius + 22)} 0 A ${radius + 22} ${radius + 22} 0 0 0 ${cx + (radius + 22)} 0 Z`}
          fill="url(#speedo-backdrop)"
        />

        {/* Subtle recessed track behind outer arc & inner hairline ring */}
        <path
          d={arcPath(startDeg, endDeg, radius)}
          fill="none"
          stroke="rgba(15, 23, 42, 0.65)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d={arcPath(startDeg, endDeg, radius - 18)}
          fill="none"
          stroke="rgba(148, 163, 184, 0.14)"
          strokeWidth="1"
        />

        {/* Minor & major radial tick marks */}
        {Array.from({ length: tickCount + 1 }, (_, idx) => {
          const deg = startDeg + (idx / tickCount) * (endDeg - startDeg);
          const isMajor = idx % subPerMajor === 0;
          const isRed = deg >= redSplitDeg - 0.5;
          const pOuter = polar(deg, radius - 3.5);
          const pInner = polar(deg, isMajor ? radius - 14.5 : radius - 9);
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

        {/* Dial numerals (1..7 aligned radially inside each corresponding major tick) */}
        {majorMarks.map((label) => {
          const deg = startDeg + label * degPerMajor;
          const pt = polar(deg, radius - 26);
          const isRed = deg >= redSplitDeg - 0.5;
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

        {/* Cyan outer arc with clean 1.5° separation before redline */}
        <path
          d={arcPath(startDeg, redSplitDeg - 1.5, radius)}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#cyan-glow)"
        />

        {/* Redline outer arc */}
        <path
          d={arcPath(redSplitDeg + 0.5, endDeg, radius)}
          fill="none"
          stroke="#ef4444"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#cyan-glow)"
        />

        {/* Tapered vector needle starting cleanly outside center digital readout */}
        <polygon points={needlePoints} fill="#f87171" opacity="0.96" />

        {/* Centered digital speed & KM/H */}
        <text
          x={cx}
          y="29"
          fill="#ffffff"
          fontSize="24"
          fontWeight="700"
          textAnchor="middle"
          className="font-display tabular-nums"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.65)' }}
          data-testid="hud-speed"
        >
          {speedKmh}
        </text>
        <text
          x={cx}
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
      </svg>
    </div>
  );
};

export const RaceHud: React.FC<RaceHudProps> = ({
  hud,
  track,
  muted,
  hudSettings,
  settingsOpen,
  onChangeHudSettings,
  onToggleSettings,
  onToggleMute,
  onPause,
  onMobileDash,
  onVirtualControl,
}) => {
  const [selectedElement, setSelectedElement] = useState<HudElementId | 'all'>('stats');
  const dragRef = useRef<{
    id: HudElementId;
    startX: number;
    startY: number;
    origOffsetX: number;
    origOffsetY: number;
  } | null>(null);

  // Release any held touch/mouse controls when settings modal opens or unmounts
  useEffect(() => {
    if (settingsOpen) {
      onVirtualControl('throttle', false);
      onVirtualControl('brake', false);
      onVirtualControl('steerLeft', false);
      onVirtualControl('steerRight', false);
    }
  }, [settingsOpen, onVirtualControl]);

  useEffect(() => {
    if (!settingsOpen) {
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
  }, [settingsOpen, hudSettings, onChangeHudSettings]);

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
    if (!settingsOpen) return;
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
    if (!settingsOpen) return '';
    const isSel = selectedElement === 'all' || selectedElement === id;
    return `pointer-events-auto cursor-move ${shape} ring-1 transition-all ${
      isSel
        ? 'ring-[#67e8f9]/85 bg-cyan-400/[0.06] shadow-[0_0_12px_rgba(34,211,238,0.22)]'
        : 'ring-white/25 hover:ring-[#67e8f9]/65'
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
      e.currentTarget.setPointerCapture(e.pointerId);
      onVirtualControl(control, true);
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      onVirtualControl(control, false);
    },
    onPointerCancel: () => onVirtualControl(control, false),
    onLostPointerCapture: () => onVirtualControl(control, false),
  });

  return (
    <div
      data-testid="race-hud"
      className="fixed inset-0 z-10 pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Top-Left Telemetry Bar */}
      <div
        data-testid="hud-widget-stats"
        onPointerDown={(e) => startDragWidget('stats', e)}
        style={widgetStyle('stats', 'top left')}
        className={`fixed top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 ${editFrameClass('stats', 'rounded-sm')}`}
      >
        <div
          className="flex items-center gap-3 sm:gap-4 px-3.5 sm:px-4 py-1.5 sm:py-2 pr-6 bg-[#070f1b]/75 border-t-2 border-l-2 border-[#22d3ee] shadow-[0_0_14px_rgba(34,211,238,0.22)] backdrop-blur-[2px]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
          }}
        >
          <div className="font-display text-sm sm:text-base font-extrabold text-white tabular-nums tracking-wide">
            {hud.position}/{hud.totalRacers}
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              LAP
            </span>
            <span className="font-display text-xs sm:text-sm font-bold text-white tabular-nums mt-0.5">
              {hud.lap}/{hud.totalLaps}
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              TIME
            </span>
            <span className="font-mono-num text-xs sm:text-sm font-bold text-white mt-0.5">
              {formatRaceTime(hud.elapsedMs)}
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
              RAMS
            </span>
            <span className="font-mono-num text-xs sm:text-sm font-bold text-white mt-0.5">
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
        className={`fixed top-0 left-1/2 z-10 ${editFrameClass('speedo', 'rounded-b-full')}`}
      >
        <InvertedArcSpeedometer speedKmh={hud.speedKmh} />
      </div>

      {/* 3. Top-Right HUD Gear Settings Button (Independent) */}
      <div
        data-testid="hud-widget-settingsBtn"
        onPointerDown={(e) => startDragWidget('settingsBtn', e)}
        style={widgetStyle('settingsBtn', 'top right')}
        className={`fixed top-3 right-[150px] sm:top-4 sm:right-[180px] z-10 ${
          settingsOpen ? editFrameClass('settingsBtn', 'rounded-full') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          data-testid="btn-hud-settings"
          onClick={(e) => {
            if (settingsOpen) return;
            e.currentTarget.blur();
            onToggleSettings(true);
          }}
          aria-label="HUD Settings"
          className={`flex items-center justify-center w-8 h-8 rounded-full text-white/95 hover:text-[#22d3ee] drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] transition-colors ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* 4. Top-Right Audio Mute Button (Independent) */}
      <div
        data-testid="hud-widget-muteBtn"
        onPointerDown={(e) => startDragWidget('muteBtn', e)}
        style={widgetStyle('muteBtn', 'top right')}
        className={`fixed top-3 right-[112px] sm:top-4 sm:right-[138px] z-10 ${
          settingsOpen ? editFrameClass('muteBtn', 'rounded-md') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            if (settingsOpen) return;
            e.currentTarget.blur();
            onToggleMute();
          }}
          aria-label={muted ? 'Unmute audio (M)' : 'Mute audio (M)'}
          className={`flex items-center justify-center w-8 h-8 rounded-md bg-[#08101c]/75 border border-[#22d3ee]/65 text-white hover:bg-[#102036] hover:border-[#22d3ee] shadow-[0_0_8px_rgba(34,211,238,0.18)] ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 5. Top-Right Pause Button (Independent) */}
      <div
        data-testid="hud-widget-pauseBtn"
        onPointerDown={(e) => startDragWidget('pauseBtn', e)}
        style={widgetStyle('pauseBtn', 'top right')}
        className={`fixed top-[50px] right-[112px] sm:top-[54px] sm:right-[138px] z-10 ${
          settingsOpen ? editFrameClass('pauseBtn', 'rounded-md') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            if (settingsOpen) return;
            e.currentTarget.blur();
            onPause();
          }}
          aria-label="Pause race (Esc)"
          className={`flex items-center justify-center w-8 h-8 rounded-md bg-[#08101c]/75 border border-[#22d3ee]/65 text-white hover:bg-[#102036] hover:border-[#22d3ee] shadow-[0_0_8px_rgba(34,211,238,0.18)] ${
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
        className={`fixed top-3 right-3 sm:top-4 sm:right-4 z-10 ${editFrameClass('minimap', 'rounded-md')}`}
      >
        <div className="p-1.5 rounded-md bg-[#070f1b]/75 border border-[#22d3ee]/60 shadow-[0_0_12px_rgba(34,211,238,0.2)] backdrop-blur-[2px]">
          <svg
            width={minimapData.size}
            height={minimapData.size}
            viewBox={`0 0 ${minimapData.size} ${minimapData.size}`}
            className="w-[74px] h-[58px] sm:w-[100px] sm:h-[78px]"
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
                  fill={r.isLocal ? '#38bdf8' : r.color}
                  stroke="#09111e"
                  strokeWidth="1.2"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Center Non-Blocking Countdown / Ram Banner */}
      {!settingsOpen && (
        <div className="fixed inset-x-0 top-28 sm:top-32 flex flex-col items-center justify-center pointer-events-none z-10">
          {hud.status === 'countdown' && (
            <div className="px-7 py-3 rounded-xl bg-[#070f1b]/80 border border-[#22d3ee]/60 shadow-[0_0_24px_rgba(34,211,238,0.25)] text-center">
              <div className="font-display text-5xl sm:text-6xl font-extrabold text-white tabular-nums">
                {hud.countdownSec > 0 ? hud.countdownSec : 'GO!'}
              </div>
            </div>
          )}
          {hud.recentRamBanner && hud.status === 'racing' && (
            <div className="px-4 py-1 rounded-md bg-[#070f1b]/85 border border-[#22d3ee] text-[#67e8f9] font-display font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_12px_rgba(34,211,238,0.3)]">
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
        className={`fixed bottom-[64px] left-4 sm:bottom-[80px] sm:left-6 z-10 ${
          settingsOpen ? editFrameClass('throttleBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Accelerate"
          {...bindHoldControl('throttle')}
          className={`w-14 h-9 sm:w-16 sm:h-10 rounded-xl bg-[#07111e]/60 border-[1.5px] border-[#22d3ee] hover:bg-[#0e2238]/75 active:scale-95 shadow-[0_0_12px_rgba(34,211,238,0.28)] flex items-center justify-center touch-none ${
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
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 ${
          settingsOpen ? editFrameClass('brakeBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Brake or Reverse"
          {...bindHoldControl('brake')}
          className={`w-14 h-9 sm:w-16 sm:h-10 rounded-xl bg-[#07111e]/60 border-[1.5px] border-[#22d3ee] hover:bg-[#0e2238]/75 active:scale-95 shadow-[0_0_12px_rgba(34,211,238,0.28)] flex items-center justify-center touch-none ${
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
        className={`fixed bottom-[62px] right-[96px] sm:bottom-[76px] sm:right-[118px] z-10 ${
          settingsOpen ? editFrameClass('ramLeftBtn', 'rounded-full') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Lateral Ram Left (Q)"
          onClick={(e) => {
            if (settingsOpen) return;
            e.currentTarget.blur();
            onMobileDash(-1);
          }}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
            dashReady
              ? 'border-[#a5f3fc]/80 text-[#06101c] shadow-[0_0_12px_rgba(34,211,238,0.5)]'
              : 'border-white/25 text-[#06101c]/70 opacity-50'
          } ${settingsOpen ? 'pointer-events-none' : 'cursor-pointer'}`}
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #cffafe 0%, #38bdf8 62%, #0284c7 100%)',
          }}
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.75]" />
        </button>
      </div>

      {/* 10. Bottom-Right Lateral Ram Right Button (Independent) */}
      <div
        data-testid="hud-widget-ramRightBtn"
        onPointerDown={(e) => startDragWidget('ramRightBtn', e)}
        style={widgetStyle('ramRightBtn', 'bottom right')}
        className={`fixed bottom-[62px] right-[28px] sm:bottom-[76px] sm:right-[38px] z-10 ${
          settingsOpen ? editFrameClass('ramRightBtn', 'rounded-full') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Lateral Ram Right (E)"
          onClick={(e) => {
            if (settingsOpen) return;
            e.currentTarget.blur();
            onMobileDash(1);
          }}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
            dashReady
              ? 'border-[#a5f3fc]/80 text-[#06101c] shadow-[0_0_12px_rgba(34,211,238,0.5)]'
              : 'border-white/25 text-[#06101c]/70 opacity-50'
          } ${settingsOpen ? 'pointer-events-none' : 'cursor-pointer'}`}
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #cffafe 0%, #38bdf8 62%, #0284c7 100%)',
          }}
        >
          <ArrowRight className="w-4 h-4 stroke-[2.75]" />
        </button>
      </div>

      {/* 11. Bottom-Right Steer Left Capsule (Independent) */}
      <div
        data-testid="hud-widget-steerLeftBtn"
        onPointerDown={(e) => startDragWidget('steerLeftBtn', e)}
        style={widgetStyle('steerLeftBtn', 'bottom right')}
        className={`fixed bottom-4 right-[84px] sm:bottom-6 sm:right-[104px] z-10 ${
          settingsOpen ? editFrameClass('steerLeftBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Steer Left"
          {...bindHoldControl('steerLeft')}
          className={`w-14 h-9 sm:w-16 sm:h-10 rounded-xl bg-[#07111e]/60 border-[1.5px] border-[#22d3ee] hover:bg-[#0e2238]/75 active:scale-95 shadow-[0_0_12px_rgba(34,211,238,0.28)] flex items-center justify-center touch-none ${
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
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 ${
          settingsOpen ? editFrameClass('steerRightBtn', 'rounded-xl') : 'pointer-events-auto'
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Steer Right"
          {...bindHoldControl('steerRight')}
          className={`w-14 h-9 sm:w-16 sm:h-10 rounded-xl bg-[#07111e]/60 border-[1.5px] border-[#22d3ee] hover:bg-[#0e2238]/75 active:scale-95 shadow-[0_0_12px_rgba(34,211,238,0.28)] flex items-center justify-center touch-none ${
            settingsOpen ? 'pointer-events-none' : 'cursor-pointer'
          }`}
        >
          <TripleChevron direction="right" />
        </button>
      </div>

      {/* Minimal Floating HUD Customization Panel (No batch button bar, no heavy nested boxes) */}
      {settingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 p-3">
          <div
            data-testid="hud-settings-modal"
            className="pointer-events-auto w-full max-w-[332px] [@media(max-height:540px)]:max-w-[320px] rounded-2xl bg-[#060d18]/68 border border-white/12 backdrop-blur-md px-4 py-3.5 [@media(max-height:540px)]:px-3.5 [@media(max-height:540px)]:py-2.5 space-y-2.5 [@media(max-height:540px)]:space-y-1.5"
          >
            {/* Minimal Header: Title + Selected Item indicator + inline All toggle & Close */}
            <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-white/10">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-white tracking-wide">
                  HUD Layout
                </h3>
                <p
                  className="text-[11px] text-slate-400 truncate"
                  data-testid="hud-selected-label"
                >
                  Tap or drag any control · <span className="text-cyan-300">{activeLabel}</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  data-testid="btn-hud-select-all"
                  onClick={() =>
                    setSelectedElement((prev) => (prev === 'all' ? 'stats' : 'all'))
                  }
                  className={`px-2 py-0.5 rounded-full text-[11px] font-normal transition-colors cursor-pointer ${
                    selectedElement === 'all'
                      ? 'bg-cyan-300/20 text-cyan-200'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  aria-label="Close HUD Settings"
                  onClick={() => onToggleSettings(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Minimal Unboxed Sliders: Size & Opacity (positioning via direct drag) */}
            <div className="space-y-2.5 [@media(max-height:540px)]:space-y-2">
              {/* Size */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-normal">Size</span>
                  <span className="font-mono-num text-cyan-200/90 text-[11px]" data-testid="hud-scale-value">
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
                    className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
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
                    className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Opacity */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-normal">Opacity</span>
                  <span className="font-mono-num text-cyan-200/90 text-[11px]" data-testid="hud-opacity-value">
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
                    className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
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
                    className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Minimal Footer */}
            <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
              <button
                type="button"
                data-testid="btn-hud-reset"
                onClick={() => onChangeHudSettings(createDefaultHudSettings())}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-normal text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                data-testid="btn-hud-done"
                onClick={() => onToggleSettings(false)}
                className="px-4 py-1 rounded-full bg-[#22d3ee]/90 hover:bg-[#67e8f9] text-slate-950 text-[11px] font-medium transition-colors cursor-pointer"
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
