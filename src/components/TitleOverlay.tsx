
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

      {/* Dark Smoky Racing Background Gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(5, 7, 10, 0.94) 0%,
              rgba(8, 10, 14, 0.86) 25%,
              rgba(9, 11, 15, 0.58) 45%,
              rgba(8, 10, 14, 0.22) 67%,
              rgba(5, 7, 10, 0.04) 100%
            ),
            linear-gradient(
              0deg,
              rgba(90, 13, 10, 0.18) 0%,
              rgba(20, 10, 12, 0.08) 30%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Top-Right Mute Button */}
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => {
          e.currentTarget.blur();
          onToggleMute();
        }}
        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        className="pointer-events-auto fixed top-[max(1rem,calc(var(--safe-top)+0.5rem))] right-[max(1rem,calc(var(--safe-right)+0.75rem))] sm:top-6 sm:right-8 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#101317]/95 hover:bg-[#1D2025] border border-[#FF321E]/40 hover:border-[#FF5A00]/80 flex items-center justify-center text-[#F5F5F5] transition-colors cursor-pointer shadow-[0_3px_15px_rgba(0,0,0,0.5)]"
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-[#FF5A00]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#F5F5F5]" />
        )}
      </button>

      {/* Left-Aligned Title & Action Stack */}
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
              <polygon
                points="4,10 56,10 44,28 0,28"
                fill="#FF321E"
              />
              <polygon
                points="64,10 92,10 80,28 52,28"
                fill="#079FE0"
              />
              <polygon
                points="100,10 112,10 100,28 88,28"
                fill="#F5F5F5"
                opacity="0.95"
              />

              <text
                x="2"
                y="66"
                fill="#F5F5F5"
                fontFamily="'Oxanium', sans-serif"
                fontWeight="800"
                fontSize="40"
                letterSpacing="1.2"
              >
                Turbo <tspan fill="#FF321E">Drifter</tspan>
              </text>

              <line
                x1="2"
                y1="78"
                x2="352"
                y2="78"
                stroke="rgba(255,90,0,0.48)"
                strokeWidth="1.5"
              />
            </svg>

            <p className="mt-2.5 [@media(max-height:460px)]:mt-1.5 text-xs sm:text-[13px] [@media(max-height:460px)]:text-[11px] leading-relaxed [@media(max-height:460px)]:leading-snug text-[#D5D9DF] max-w-[320px]">
              Build custom racers, sketch freehand circuits, join friends, and bash rivals off the apex.
            </p>
          </div>

          {/* Menu Action Buttons */}
          <div className="space-y-2 [@media(max-height:460px)]:space-y-1.5">

            {/* Quick Race */}
            <button
              type="button"
              data-start="true"
              onClick={(e) => {
                e.currentTarget.blur();
                onQuickRace();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 [@media(max-height:460px)]:py-2 rounded-lg bg-gradient-to-r from-[#FF5A00] via-[#FF7820] to-[#FFC247] hover:from-[#FF7424] hover:via-[#FF8B32] hover:to-[#FFD16B] text-[#141414] font-display font-bold text-sm sm:text-[15px] [@media(max-height:460px)]:text-xs tracking-wide shadow-[0_4px_18px_rgba(255,90,0,0.22)] transition-all cursor-pointer whitespace-nowrap"
            >
              <Flag className="w-4 h-4 [@media(max-height:460px)]:w-3.5 [@media(max-height:460px)]:h-3.5 shrink-0" />
              <span>Race (Solo + AI)</span>
            </button>

            {/* Multiplayer */}
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenMultiplayer();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#101317]/95 hover:bg-[#1B1E23] border border-[#FF321E]/40 hover:border-[#FF5A00]/80 text-[#F5F5F5] font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap"
            >
              <Users className="w-3.5 h-3.5 text-[#079FE0] shrink-0" />
              <span>Multiplayer</span>
            </button>

            {/* Garage + Map */}
            <div className="grid grid-cols-2 gap-2 [@media(max-height:460px)]:gap-1.5">

              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenGarage();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#101317]/95 hover:bg-[#1B1E23] border border-[#FF321E]/40 hover:border-[#FF5A00]/80 text-[#F5F5F5] font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Paintbrush className="w-3.5 h-3.5 text-[#FF5A00] shrink-0" />
                <span>Garage</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.blur();
                  onOpenMap();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#101317]/95 hover:bg-[#1B1E23] border border-[#FF321E]/40 hover:border-[#FF5A00]/80 text-[#F5F5F5] font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#079FE0] shrink-0" />
                <span>Map</span>
              </button>
            </div>

            {/* Track Studio */}
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenStudio();
              }}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 [@media(max-height:460px)]:py-1.5 rounded-lg bg-[#101317]/95 hover:bg-[#1B1E23] border border-[#FF321E]/40 hover:border-[#FF5A00]/80 text-[#F5F5F5] font-semibold text-xs sm:text-[13px] [@media(max-height:460px)]:text-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <PenTool className="w-3.5 h-3.5 text-[#FF5A00] shrink-0" />
              <span>Track Studio</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
