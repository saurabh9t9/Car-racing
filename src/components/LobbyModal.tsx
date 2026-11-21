import React, { useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import Copy from 'lucide-react/dist/esm/icons/copy.js';
import Play from 'lucide-react/dist/esm/icons/play.js';
import Plus from 'lucide-react/dist/esm/icons/plus.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import type { RoomSnapshot, TrackDefinition } from '../shared/types';

interface LobbyModalProps {
  room: RoomSnapshot | null;
  playerId: string | null;
  playerName: string;
  tracks: TrackDefinition[];
  error: string | null;
  connected: boolean;
  onChangeName: (name: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
  onLeaveRoom: () => void;
  onUpdateConfig: (patch: { trackId?: string; laps?: number; aiCount?: number }) => void;
  onToggleReady: (ready: boolean) => void;
  onStartRace: () => void;
  onClose: () => void;
}

export const LobbyModal: React.FC<LobbyModalProps> = ({
  room,
  playerId,
  playerName,
  tracks,
  error,
  connected,
  onChangeName,
  onCreateRoom,
  onJoinRoom,
  onLeaveRoom,
  onUpdateConfig,
  onToggleReady,
  onStartRace,
  onClose,
}) => {
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);

  const isHost = room && playerId ? room.hostId === playerId : false;
  const localRacer = room && playerId ? room.racers.find((r) => r.id === playerId) : undefined;
  const selectedTrack = room ? tracks.find((t) => t.id === room.config.trackId) ?? tracks[0] : tracks[0];

  const handleCopyCode = () => {
    if (!room) return;
    navigator.clipboard?.writeText(room.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-30 bg-[#11151c]/95 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl rounded-xl bg-[#161c26] border border-white/15 p-6 md:p-7 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (room) onLeaveRoom();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#10141c] border border-white/15 text-xs font-semibold text-white hover:bg-[#232b38] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                {room ? `Room ${room.code}` : 'Multiplayer Room'}
              </h2>
              <p className="text-xs text-slate-400">
                {connected ? 'Live WebSocket server connected' : 'Connecting to race server...'}
              </p>
            </div>
          </div>

          {room && (
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#10141c] border border-white/15 text-xs font-mono-num font-bold text-white hover:border-[#ff4d2e] cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied!' : room.code}</span>
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/40 text-xs text-red-200">
            {error}
          </div>
        )}

        {!room ? (
          /* Entry: Create or Join by Room Code */
          <div className="space-y-6">
            <div>
              <label htmlFor="lobby-driver-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Driver Callsign
              </label>
              <input
                id="lobby-driver-name"
                type="text"
                maxLength={18}
                value={playerName}
                onChange={(e) => onChangeName(e.target.value)}
                placeholder="Apex Driver"
                className="w-full max-w-sm px-3.5 py-2.5 rounded-lg bg-[#10141c] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ff4d2e]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Create Room */}
              <div className="rounded-xl bg-[#10141c] border border-white/10 p-5 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Host a New Room</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Generate a 6-character room code, choose any community circuit, and configure AI fill racers.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!connected}
                  onClick={onCreateRoom}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] disabled:opacity-45 text-white font-display font-bold text-sm tracking-wide cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Room Code</span>
                </button>
              </div>

              {/* Join Room */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (joinCode.trim().length >= 4) {
                    onJoinRoom(joinCode.trim().toUpperCase());
                  }
                }}
                className="rounded-xl bg-[#10141c] border border-white/10 p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Join with Room Code</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Enter your friend&apos;s 6-character code to join their grid immediately.
                  </p>
                  <input
                    type="text"
                    maxLength={8}
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="e.g. APEX7K"
                    aria-label="Room Code"
                    className="mt-3 w-full px-3.5 py-2.5 rounded-lg bg-[#161c26] border border-white/15 font-mono-num text-base tracking-widest uppercase text-white focus:outline-none focus:border-[#0ea5e9]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!connected || joinCode.trim().length < 4}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] disabled:opacity-45 text-white font-display font-bold text-sm tracking-wide cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Join Room</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Inside Room Lobby */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Race Settings */}
            <div className="md:col-span-5 space-y-4">
              <div>
                <label htmlFor="room-track-select" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Circuit
                </label>
                <select
                  id="room-track-select"
                  disabled={!isHost}
                  value={room.config.trackId}
                  onChange={(e) => onUpdateConfig({ trackId: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#10141c] border border-white/15 text-xs font-medium text-white disabled:opacity-65 cursor-pointer"
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} · {t.isBuiltIn ? 'Official' : `by ${t.author}`}
                    </option>
                  ))}
                </select>
                {selectedTrack && (
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Theme: {selectedTrack.theme} · Road Width: {selectedTrack.roadWidth}m
                  </p>
                )}
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-300 mb-1.5">Laps</span>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 5].map((lapOpt) => (
                    <button
                      key={lapOpt}
                      type="button"
                      disabled={!isHost}
                      onClick={() => onUpdateConfig({ laps: lapOpt })}
                      className={`py-2 rounded-lg border text-xs font-mono-num font-bold cursor-pointer disabled:cursor-default ${
                        room.config.laps === lapOpt
                          ? 'bg-[#ff4d2e]/20 border-[#ff4d2e] text-white'
                          : 'bg-[#10141c] border-white/10 text-slate-300'
                      }`}
                    >
                      {lapOpt} Laps
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-300">AI Fill Racers</span>
                  <span className="font-mono-num text-white">{room.config.aiCount} Bots</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  disabled={!isHost}
                  value={room.config.aiCount}
                  onChange={(e) => onUpdateConfig({ aiCount: Number(e.target.value) })}
                  aria-label="AI Fill Racers"
                  className="w-full apex-slider disabled:opacity-50"
                />
              </div>

              <button
                type="button"
                onClick={onLeaveRoom}
                className="w-full py-2.5 rounded-lg bg-[#10141c] border border-white/15 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#1f2735] cursor-pointer"
              >
                Leave Room
              </button>
            </div>

            {/* Right: Connected Grid Roster */}
            <div className="md:col-span-7 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Connected Racers ({room.racers.length}/6)</span>
                  <span>+ {room.config.aiCount} AI Fill</span>
                </div>

                <div className="space-y-2">
                  {room.racers.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#10141c] border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-sm border border-white/25 shrink-0"
                          style={{ backgroundColor: r.car.primaryColor }}
                        />
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {r.name} {r.id === playerId && <span className="text-xs text-slate-400">(You)</span>}
                          </div>
                          <div className="text-[11px] text-slate-400 capitalize">
                            {r.car.chassis} · {r.car.wing.replace('_', ' ')}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-semibold">
                        {r.id === room.hostId ? (
                          <span className="text-[#f59e0b]">Host</span>
                        ) : r.ready ? (
                          <span className="text-emerald-400">Ready</span>
                        ) : (
                          <span className="text-slate-400">Waiting</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isHost ? (
                <button
                  type="button"
                  onClick={onStartRace}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#ff4d2e] hover:bg-[#e83f22] text-white font-display font-bold text-base tracking-wide cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Race</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onToggleReady(!(localRacer?.ready ?? true))}
                  className={`w-full py-3.5 rounded-lg font-display font-bold text-base tracking-wide cursor-pointer ${
                    localRacer?.ready
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white'
                  }`}
                >
                  {localRacer?.ready ? 'Ready for Grid (Click to Unready)' : 'Ready Up'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
