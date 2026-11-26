import React from 'react';
import Home from 'lucide-react/dist/esm/icons/home.js';
import Play from 'lucide-react/dist/esm/icons/play.js';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw.js';
import Trophy from 'lucide-react/dist/esm/icons/trophy.js';
import type { RacerState } from '../shared/types';
import type { GraphicsQuality } from '../shared/graphicsQuality';
import { formatRaceTime } from './RaceHud';

interface PauseModalProps {
  isOnline: boolean;
  graphicsQuality: GraphicsQuality;
  onChangeGraphicsQuality: (quality: GraphicsQuality) => void;
  onResume: () => void;
  onRestart: () => void;
  onExitToTitle: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOnline,
  graphicsQuality,
  onChangeGraphicsQuality,
  onResume,
  onRestart,
  onExitToTitle,
}) => {
  return (
    <div className="fixed inset-0 z-30 bg-black/65 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-xl bg-[#161c26] border border-white/15 p-5 sm:p-6 [@media(max-height:540px)]:p-4 space-y-4 sm:space-y-5 [@media(max-height:540px)]:space-y-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Race Paused</h2>
          <p className="text-xs text-slate-400 mt-1">
            {isOnline ? 'Online room race continues on server' : 'Simulation paused'}
          </p>
        </div>

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Graphics quality</span>
          <select
            value={graphicsQuality}
            onChange={(event) => onChangeGraphicsQuality(event.target.value as GraphicsQuality)}
            className="w-full rounded-lg border border-white/15 bg-[#10141c] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ff4d2e]"
          >
            {(['AUTO', 'LOW', 'MEDIUM', 'HIGH', 'ULTRA'] as const).map((quality) => (
              <option key={quality} value={quality}>
                {quality === 'AUTO' ? 'Auto' : `${quality[0]}${quality.slice(1).toLowerCase()}`}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onResume}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-sm tracking-wide cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>Resume Race</span>
          </button>

          {!isOnline && (
            <button
              type="button"
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#10141c] border border-white/15 hover:bg-[#222b3a] text-white font-semibold text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Race</span>
            </button>
          )}

          <button
            type="button"
            onClick={onExitToTitle}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#10141c] border border-white/15 hover:bg-[#222b3a] text-slate-300 hover:text-white font-semibold text-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Exit to Title</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ResultsModalProps {
  standings: RacerState[];
  localId: string;
  isOnline: boolean;
  isHost: boolean;
  onPlayAgain: () => void;
  onReturnToLobby: () => void;
  onExitToTitle: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  standings,
  localId,
  isOnline,
  isHost,
  onPlayAgain,
  onReturnToLobby,
  onExitToTitle,
}) => {
  const local = standings.find((r) => r.id === localId) ?? standings[0];
  const won = local?.position === 1;

  return (
    <div className="fixed inset-0 z-30 bg-black/75 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-xl bg-[#161c26] border border-white/15 p-4 sm:p-6 [@media(max-height:540px)]:p-3.5 space-y-4 sm:space-y-5 [@media(max-height:540px)]:space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#ff4d2e]/15 border border-[#ff4d2e]/40 flex items-center justify-center shrink-0">
              <Trophy className={`w-5 h-5 sm:w-6 sm:h-6 ${won ? 'text-[#f59e0b]' : 'text-[#ff4d2e]'}`} />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl [@media(max-height:540px)]:text-lg font-bold text-white">
                {won ? '1st Place Victory!' : `Finished P${local?.position ?? '-'}`}
              </h2>
              <p className="text-xs text-slate-400">
                Best Lap: {local?.bestLapMs ? formatRaceTime(local.bestLapMs) : '--:--.-'} · Rams Landed: {local?.ramHits ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 max-h-64 [@media(max-height:540px)]:max-h-36 overflow-y-auto">
          {standings.map((r) => {
            const isSelf = r.id === localId;
            return (
              <div
                key={r.id}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border ${
                  isSelf
                    ? 'bg-[#ff4d2e]/15 border-[#ff4d2e]/60'
                    : 'bg-[#10141c] border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-sm w-6 text-slate-300 tabular-nums">
                    P{r.position}
                  </span>
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: r.car.primaryColor }}
                  />
                  <span className="text-sm font-semibold text-white">{r.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono-num text-slate-300">
                  <span>{r.ramHits} rams</span>
                  <span className="text-white font-bold">
                    {r.finishTimeMs ? formatRaceTime(r.finishTimeMs) : 'Racing'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {isOnline ? (
            isHost ? (
              <button
                type="button"
                data-start="true"
                onClick={onReturnToLobby}
                className="flex-1 py-3 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-sm tracking-wide cursor-pointer"
              >
                Back to Room Lobby
              </button>
            ) : (
              <div className="flex-1 py-3 text-center text-xs text-slate-300 bg-[#10141c] rounded-lg border border-white/10">
                Waiting for host to return to lobby...
              </div>
            )
          ) : (
            <button
              type="button"
              data-start="true"
              onClick={onPlayAgain}
              className="flex-1 py-3 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-sm tracking-wide cursor-pointer"
            >
              Race Again
            </button>
          )}
          <button
            type="button"
            onClick={onExitToTitle}
            className="px-5 py-3 rounded-lg bg-[#10141c] border border-white/15 hover:bg-[#222b3a] text-slate-200 font-semibold text-sm cursor-pointer"
          >
            Title
          </button>
        </div>
      </div>
    </div>
  );
};
