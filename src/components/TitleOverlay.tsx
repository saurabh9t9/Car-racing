import React from 'react';
import Flag from 'lucide-react/dist/esm/icons/flag.js';
import Paintbrush from 'lucide-react/dist/esm/icons/paintbrush.js';
import PenTool from 'lucide-react/dist/esm/icons/pen-tool.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2.js';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x.js';
import type { TrackDefinition } from '../shared/types';

interface TitleOverlayProps {
  tracks: TrackDefinition[];
  selectedTrackId: string;
  onSelectTrack: (id: string) => void;
  onQuickRace: () => void;
  onOpenMultiplayer: () => void;
  onOpenGarage: () => void;
  onOpenStudio: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export const TitleOverlay: React.FC<TitleOverlayProps> = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
  onQuickRace,
  onOpenMultiplayer,
  onOpenGarage,
  onOpenStudio,
  muted,
  onToggleMute,
}) => {
  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-between pointer-events-none overflow-y-auto no-scrollbar">
      {/* Left-third calm atmospheric gradient scrim so title text always hits >4.5:1 contrast */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[56%] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.72) 60%, rgba(13,17,23,0) 100%)',
        }}
      />

      {/* Top-right sound button */}
      <div className="relative z-10 flex items-center justify-end p-5 md:p-7 [@media(max-height:540px)]:p-2.5 [@media(max-height:540px)]:pb-0">
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            onToggleMute();
          }}
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          className="pointer-events-auto flex items-center justify-center w-10 h-10 [@media(max-height:540px)]:w-8 [@media(max-height:540px)]:h-8 rounded-lg bg-[#181e28]/90 border border-white/15 text-slate-200 hover:bg-[#232b38] hover:text-white transition-colors cursor-pointer"
        >
          {muted ? <VolumeX className="w-5 h-5 [@media(max-height:540px)]:w-4 [@media(max-height:540px)]:h-4" /> : <Volume2 className="w-5 h-5 [@media(max-height:540px)]:w-4 [@media(max-height:540px)]:h-4" />}
        </button>
      </div>

      {/* Left-third Main Lockup & Menu Actions */}
      <div className="relative z-10 px-6 md:px-14 [@media(max-height:540px)]:px-6 max-w-xl my-auto">
        {/* Bespoke SVG Title Emblem */}
        <div className="mb-6 [@media(max-height:540px)]:mb-2.5">
          <svg
            viewBox="0 0 420 112"
            className="w-full max-w-[390px] [@media(max-height:540px)]:max-w-[230px] h-auto"
            role="img"
            aria-label="Slipstream Ram"
          >
            {/* Angled speed wing accent */}
            <polygon points="8,18 68,18 52,44 0,44" fill="#ff4d2e" />
            <polygon points="78,18 106,18 90,44 62,44" fill="#0ea5e9" />
            <polygon points="116,18 130,18 114,44 100,44" fill="#f8fafc" opacity="0.85" />
            <text
              x="4"
              y="84"
              fill="#f8fafc"
              fontFamily="'Oxanium', sans-serif"
              fontWeight="800"
              fontSize="44"
              letterSpacing="1.5"
            >
              Turbo <tspan fill="#ff4d2e">Drifter</tspan>
            </text>
            <line x1="4" y1="98" x2="404" y2="98" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
          </svg>
          <p className="mt-2 text-sm md:text-base text-slate-300 leading-relaxed max-w-md [@media(max-height:540px)]:hidden">
            Build custom racers, sketch freehand circuits, join friends by room code, and bash rivals off the apex.
          </p>
        </div>

        {/* Circuit Selector */}
        <div className="mb-5 [@media(max-height:540px)]:mb-2.5 pointer-events-auto">
          <label
            htmlFor="title-track-select"
            className="block text-xs [@media(max-height:540px)]:text-[10px] font-medium text-slate-400 mb-1.5 [@media(max-height:540px)]:mb-1"
          >
            Active Circuit ({tracks.length} available)
          </label>
          <select
            id="title-track-select"
            value={selectedTrackId}
            onChange={(e) => onSelectTrack(e.target.value)}
            className="w-full max-w-sm px-3.5 py-2.5 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#181e28]/95 border border-white/15 text-sm [@media(max-height:540px)]:text-xs font-medium text-white focus:outline-none focus:border-[#ff4d2e] cursor-pointer"
          >
            {tracks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} · {t.theme.charAt(0).toUpperCase() + t.theme.slice(1)} ({t.isBuiltIn ? 'Official' : `by ${t.author}`})
              </option>
            ))}
          </select>
        </div>

        {/* Primary & Secondary Menu Actions */}
        <div className="flex flex-col gap-3 [@media(max-height:540px)]:gap-1.5 max-w-sm pointer-events-auto">
          <button
            type="button"
            data-start="true"
            onClick={(e) => {
              e.currentTarget.blur();
              onQuickRace();
            }}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 [@media(max-height:540px)]:py-2 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-lg [@media(max-height:540px)]:text-sm tracking-wide transition-colors cursor-pointer"
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
            className="flex items-center justify-center gap-2.5 px-5 py-3 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#1c2330]/95 hover:bg-[#252f40] border border-white/15 text-white font-semibold text-sm [@media(max-height:540px)]:text-xs transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#0ea5e9]" />
            <span>Multiplayer Room Code</span>
          </button>

          <div className="grid grid-cols-2 gap-3 [@media(max-height:540px)]:gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onOpenGarage();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#181e28]/95 hover:bg-[#232b38] border border-white/15 text-slate-100 font-semibold text-sm [@media(max-height:540px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
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
              className="flex items-center justify-center gap-2 px-4 py-2.5 [@media(max-height:540px)]:py-1.5 rounded-lg bg-[#181e28]/95 hover:bg-[#232b38] border border-white/15 text-slate-100 font-semibold text-sm [@media(max-height:540px)]:text-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <PenTool className="w-4 h-4 text-emerald-400" />
              <span>Track Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Single flat control hint line in bottom safe margin */}
      <div className="relative z-10 px-6 md:px-14 pb-5 [@media(max-height:540px)]:pb-2 [@media(max-height:540px)]:pt-1 flex items-center justify-between text-xs [@media(max-height:540px)]:text-[10px] text-slate-400">
        <span>WASD / Arrows Drive · Q / E Lateral Ram Dash · Space Quick Dash · Esc Pause</span>
      </div>
    </div>
  );
};
