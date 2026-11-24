import React from 'react';
import Flag from 'lucide-react/dist/esm/icons/flag.js';
import MapIcon from 'lucide-react/dist/esm/icons/map.js';
import Paintbrush from 'lucide-react/dist/esm/icons/paintbrush.js';
import PenTool from 'lucide-react/dist/esm/icons/pen-tool.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2.js';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x.js';

interface TitleOverlayProps {
  onQuickRace: () => void;
  onOpenMultiplayer: () => void;
  onOpenGarage: () => void;
  onOpenMap: () => void;
  onOpenStudio: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export const TitleOverlay: React.FC<TitleOverlayProps> = ({
  onQuickRace,
  onOpenMultiplayer,
  onOpenGarage,
  onOpenMap,
  onOpenStudio,
  muted,
  onToggleMute,
}) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center pointer-events-none overflow-y-auto overflow-x-hidden no-scrollbar select-none">
      {/* Left-third readability scrim keeping the live 3D circuit and hero racers unobstructed */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,14,22,0.94) 0%, rgba(10,14,22,0.82) 28%, rgba(10,14,22,0.42) 48%, rgba(10,14,22,0.04) 68%, rgba(10,14,22,0) 100%)',
        }}
      />

      {/* Top-Right Compact Mute Button */}
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => {
          e.currentTarget.blur();
          onToggleMute();
        }}
        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        className="pointer-events-auto fixed top-[max(1rem,calc(var(--safe-top)+0.5rem))] right-[max(1rem,calc(var(--safe-right)+0.75rem))] sm:top-6 sm:right-8 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#141820]/90 hover:bg-[#1f2634] border border-white/15 flex items-center justify-center text-slate-100 transition-colors cursor-pointer"
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-slate-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-slate-100" />
        )}
      </button>

      {/* Left-Aligned Title & Compact Action Stack (consistent across all screen sizes) */}
      <div className="relative z-10 w-full px-[max(1.25rem,calc(var(--safe-left)+1rem))] sm:px-8 md:px-10 py-4 [@media(max-height:460px)]:py-2">
        <div className="pointer-events-auto w-full max-w-[332px] [@media(max-height:460px)]:max-w-[292px] space-y-4 [@media(max-height:460px)]:space-y-2.5">
          {/* Brand Emblem + Tagline */}
          <div>
            <svg
              viewBox="0 0 380 86"
              className="w-[235px] sm:w-[275px] [@media(max-height:460px)]:w-[195px] h-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
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
              <line x1="2" y1="78" x2="352" y2="78" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
            </svg>
            <p className="mt-2.5 [@media(max-height:460px)]:mt-1.5 text-xs sm:text-[13px] [@media(max-height:460px)]:text-[11px] leading-relaxed [@media(max-height:460px)]:leading-snug text-slate-200 max-w-[320px]">
              Build custom racers, sketch freehand circuits, join friends, and bash rivals off the apex.
            </p>
          </div>

          {/* Compact Menu Action Buttons */}
          <div className="space-y-2 [@media(max-height:460px)]:space-y-1.5">
            <button
              type="button"
              data-start="true"
              onClick={(e) => {
                e.currentTarget.blur();
                onQuickRace();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 [@media(max-height:460px)]:py-2 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-sm sm:text-[15px] [@media(max-height:460px)]:text-xs tracking-wide shadow-[0_8px_24px_rgba(255,77,46,0.3)] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Flag className="w-4 h-4 [@media(max-height:460px)]:w-3.5 [@media(max-height:460px)]:h-3.5 shrink-0" />
              <span>Race (Solo + AI)</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenMultiplayer();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#111824]/92 hover:bg-[#192334] border border-[#0ea5e9]/45 hover:border-[#0ea5e9]/80 text-white font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs tracking-wide transition-colors cursor-pointer whitespace-nowrap"
            >
              <Users className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              <span>Multiplayer</span>
            </button>

            <div className="grid grid-cols-2 gap-2 [@media(max-height:460px)]:gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenGarage();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#141820]/92 hover:bg-[#1f2634] border border-white/15 text-slate-100 font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Paintbrush className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                <span>Garage</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenMap();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#141820]/92 hover:bg-[#1f2634] border border-white/15 text-slate-100 font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                <span>Map</span>
              </button>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenStudio();
              }}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#141820]/92 hover:bg-[#1f2634] border border-white/15 text-slate-100 font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <PenTool className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Track Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
