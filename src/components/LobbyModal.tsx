import React, { useMemo, useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import CloudRain from 'lucide-react/dist/esm/icons/cloud-rain.js';
import Copy from 'lucide-react/dist/esm/icons/copy.js';
import Moon from 'lucide-react/dist/esm/icons/moon.js';
import Play from 'lucide-react/dist/esm/icons/play.js';
import Plus from 'lucide-react/dist/esm/icons/plus.js';
import Sun from 'lucide-react/dist/esm/icons/sun.js';
import Users from 'lucide-react/dist/esm/icons/users.js';
import { buildTrackPreviewSummary } from '../shared/trackMath';
import type { RoomSnapshot, TrackDefinition, WeatherPreset } from '../shared/types';
import { getDefaultWeatherForTheme, WEATHER_PRESETS } from '../shared/weather';

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
  onUpdateConfig: (patch: {
    trackId?: string;
    laps?: number;
    aiCount?: number;
    weather?: WeatherPreset;
  }) => void;
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
  const selectedTrack = room
    ? tracks.find((t) => t.id === room.config.trackId) ?? tracks[0]
    : tracks[0];

  const trackPreview = useMemo(
    () => (selectedTrack ? buildTrackPreviewSummary(selectedTrack, 108, 12) : null),
    [selectedTrack],
  );

  const handleCopyCode = () => {
    if (!room) return;
    navigator.clipboard?.writeText(room.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      data-testid="lobby-modal"
      className="fixed inset-0 z-30 glass-fullscreen overflow-hidden flex items-center justify-center px-[max(0.65rem,calc(var(--safe-left)+0.4rem))] pr-[max(0.65rem,calc(var(--safe-right)+0.4rem))] pt-[max(0.65rem,calc(var(--safe-top)+0.35rem))] pb-[max(0.65rem,calc(var(--safe-bottom)+0.35rem))] sm:p-5 short-landscape:py-2"
    >
      <div
        data-testid="lobby-panel"
        className="w-full max-w-4xl h-auto max-h-[calc(100dvh-1.1rem)] sm:max-h-[calc(100dvh-2.5rem)] overflow-hidden rounded-2xl glass-panel border border-white/15 p-3 sm:p-5 md:p-6 short-landscape:p-2.5 flex flex-col justify-between gap-2.5 sm:gap-4 short-landscape:gap-2"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 sm:pb-3 short-landscape:pb-1.5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              data-testid="btn-lobby-back"
              onClick={() => {
                if (room) onLeaveRoom();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 short-landscape:py-1 rounded-lg glass-btn-subtle text-xs font-semibold text-white transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Back</span>
            </button>
            <div className="min-w-0">
              <h2 className="font-display text-sm sm:text-xl short-landscape:text-sm font-bold uppercase tracking-wide text-white leading-tight truncate">
                {room ? `Room ${room.code}` : 'Multiplayer Hub'}
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 truncate">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    connected ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span className="truncate">
                  {connected ? 'Live race server connected' : 'Connecting to server...'}
                </span>
              </div>
            </div>
          </div>

          {room && (
            <button
              type="button"
              data-testid="btn-copy-room-code"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg glass-btn-subtle text-xs font-mono-num font-bold text-white transition-all cursor-pointer active:scale-95 shrink-0"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-300" />
              )}
              <span>{copied ? 'Copied' : room.code}</span>
            </button>
          )}
        </div>

        {error && (
          <div className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/40 text-xs text-red-200 shrink-0 truncate">
            {error}
          </div>
        )}

        {!room ? (
          /* Pre-Room Hub: Callsign + Host / Join Cards — Strictly Zero Scrollbars */
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5 sm:gap-4 short-landscape:gap-2 overflow-hidden">
            <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center gap-1.5 min-[480px]:gap-3 shrink-0">
              <label
                htmlFor="lobby-driver-name"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 shrink-0"
              >
                Driver Callsign
              </label>
              <input
                id="lobby-driver-name"
                type="text"
                maxLength={18}
                value={playerName}
                onChange={(e) => onChangeName(e.target.value)}
                placeholder="Apex Driver"
                className="w-full min-[480px]:max-w-[260px] px-3 py-1.5 sm:py-2 short-landscape:py-1 rounded-lg bg-[#0b1019]/80 border border-white/15 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#ff4d2e]"
              />
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 min-[560px]:grid-cols-2 gap-2.5 sm:gap-4 short-landscape:gap-2.5">
              {/* Host a New Room */}
              <div className="rounded-xl glass-panel border border-white/12 p-3 sm:p-5 short-landscape:p-3 flex flex-col justify-between gap-2.5 sm:gap-4 min-h-0">
                <div className="space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-display font-bold uppercase tracking-widest text-[#ff4d2e]">
                    Private Grid
                  </span>
                  <h3 className="font-display text-sm sm:text-lg short-landscape:text-sm font-bold text-white">
                    Host a New Room
                  </h3>
                  <p className="text-[11px] sm:text-xs short-landscape:text-[10.5px] text-slate-400 leading-snug">
                    Create a 6-character code, pick any circuit and weather, and fill open slots with AI.
                  </p>
                </div>

                <button
                  type="button"
                  data-testid="btn-create-room"
                  disabled={!connected}
                  onClick={onCreateRoom}
                  className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 short-landscape:py-1.5 px-4 rounded-lg glass-btn-primary disabled:opacity-45 text-[#141414] font-display font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Room Code</span>
                </button>
              </div>

              {/* Join with Room Code */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (joinCode.trim().length >= 4) {
                    onJoinRoom(joinCode.trim().toUpperCase());
                  }
                }}
                className="rounded-xl glass-panel border border-white/12 p-3 sm:p-5 short-landscape:p-3 flex flex-col justify-between gap-2.5 sm:gap-4 min-h-0"
              >
                <div className="space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-display font-bold uppercase tracking-widest text-[#ffb238]">
                    Direct Invite
                  </span>
                  <h3 className="font-display text-sm sm:text-lg short-landscape:text-sm font-bold text-white">
                    Join with Room Code
                  </h3>
                  <p className="text-[11px] sm:text-xs short-landscape:text-[10.5px] text-slate-400 leading-snug">
                    Enter your friend&apos;s room code to join their grid immediately.
                  </p>
                  <input
                    type="text"
                    maxLength={8}
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="e.g. APEX7K"
                    aria-label="Room Code"
                    className="mt-1.5 w-full px-3 py-1.5 sm:py-2 short-landscape:py-1 rounded-lg bg-[#0b1019]/85 border border-white/15 font-mono-num text-xs sm:text-sm tracking-widest uppercase text-white focus:outline-none focus:border-[#ff5a00]"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="btn-join-room"
                  disabled={!connected || joinCode.trim().length < 4}
                  className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 short-landscape:py-1.5 px-4 rounded-lg glass-btn-primary disabled:opacity-45 text-[#141414] font-display font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Users className="w-4 h-4" />
                  <span>Join Room</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Inside Room Lobby — Zero Scrollbars across Portrait, Landscape & Desktop */
          <div className="flex-1 min-h-0 grid grid-cols-1 min-[560px]:grid-cols-12 gap-2.5 sm:gap-5 short-landscape:gap-3 overflow-hidden">
            {/* Left: Circuit, Weather, Laps & AI Fill */}
            <div className="min-[560px]:col-span-5 flex flex-col justify-start gap-2.5 sm:gap-3.5 short-landscape:gap-2 min-h-0">
              {/* Circuit Card */}
              <div className="rounded-xl glass-panel border border-white/10 p-2 sm:p-3 flex items-center gap-2.5">
                {trackPreview && (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 short-landscape:w-11 short-landscape:h-11 shrink-0 rounded-lg bg-[#0c1320] border border-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 108 108" className="w-full h-full" aria-hidden="true">
                      <path
                        d={trackPreview.svgPath}
                        fill="none"
                        stroke="rgba(255,90,0,0.38)"
                        strokeWidth="8"
                        strokeLinejoin="round"
                      />
                      <path
                        d={trackPreview.svgPath}
                        fill="none"
                        stroke="#f8fafc"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="room-track-select"
                    className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5"
                  >
                    Circuit
                  </label>
                  <select
                    id="room-track-select"
                    disabled={!isHost}
                    value={room.config.trackId}
                    onChange={(e) => onUpdateConfig({ trackId: e.target.value })}
                    className="w-full px-2 py-1.5 short-landscape:py-1 rounded-lg bg-[#101724] border border-white/15 text-[11px] sm:text-xs font-medium text-white disabled:opacity-65 cursor-pointer"
                  >
                    {tracks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} · {t.isBuiltIn ? 'Official' : `by ${t.author}`}
                      </option>
                    ))}
                  </select>
                  {selectedTrack && trackPreview && (
                    <p className="mt-1 font-mono-num text-[10px] text-slate-400 truncate">
                      {trackPreview.lengthMeters}m · {selectedTrack.roadWidth}m wide · {selectedTrack.theme}
                    </p>
                  )}
                </div>
              </div>

              {/* Weather Preset */}
              <div>
                <span
                  id="room-weather-label"
                  className="block text-[10.5px] sm:text-xs font-medium text-slate-300 mb-1"
                >
                  Weather Preset
                </span>
                <div
                  role="group"
                  aria-labelledby="room-weather-label"
                  className="grid grid-cols-3 gap-1.5"
                >
                  {WEATHER_PRESETS.map((preset) => {
                    const activeWeather =
                      room.config.weather ??
                      getDefaultWeatherForTheme(selectedTrack?.theme ?? 'alpine');
                    const active = activeWeather === preset.id;
                    const Icon =
                      preset.id === 'sunny' ? Sun : preset.id === 'rainy' ? CloudRain : Moon;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        disabled={!isHost}
                        aria-pressed={active}
                        onClick={() => onUpdateConfig({ weather: preset.id })}
                        className={`flex items-center justify-center gap-1 py-1.5 short-landscape:py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer disabled:cursor-default active:scale-95 ${
                          active
                            ? 'glass-btn-orange-soft text-white'
                            : 'glass-btn-subtle text-slate-300'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Laps + AI Fill side-by-side on mobile to stay vertical-compact */}
              <div className="grid grid-cols-2 min-[560px]:grid-cols-1 gap-2 sm:gap-2.5 short-landscape:grid-cols-2 short-landscape:gap-2">
                <div>
                  <span className="block text-[10.5px] sm:text-xs font-medium text-slate-300 mb-1">
                    Laps
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {[2, 3, 5].map((lapOpt) => (
                      <button
                        key={lapOpt}
                        type="button"
                        disabled={!isHost}
                        onClick={() => onUpdateConfig({ laps: lapOpt })}
                        className={`py-1.5 short-landscape:py-1 rounded-lg text-[11px] font-mono-num font-bold transition-all cursor-pointer disabled:cursor-default active:scale-95 ${
                          room.config.laps === lapOpt
                            ? 'glass-btn-orange-soft text-white'
                            : 'glass-btn-subtle text-slate-300'
                        }`}
                      >
                        {lapOpt}L
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10.5px] sm:text-xs mb-1">
                    <span className="font-medium text-slate-300">AI Fill</span>
                    <span className="font-mono-num text-white">{room.config.aiCount} Bots</span>
                  </div>
                  <div className="h-[30px] flex items-center">
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
                </div>
              </div>
            </div>

            {/* Right: 2-Column Connected Racers Grid + Action Footer */}
            <div className="min-[560px]:col-span-7 flex flex-col justify-between gap-2 sm:gap-3 min-h-0 overflow-hidden">
              <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-300 shrink-0">
                  <span className="font-medium">
                    Connected Racers ({room.racers.length}/6)
                  </span>
                  <span className="font-mono-num text-slate-400">
                    + {room.config.aiCount} AI Fill
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 overflow-hidden">
                  {room.racers.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg glass-panel border border-white/10 min-w-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border border-white/25 shrink-0"
                          style={{ backgroundColor: r.car.primaryColor }}
                        />
                        <div className="min-w-0">
                          <div className="text-[11px] sm:text-xs font-semibold text-white truncate">
                            {r.name}
                            {r.id === playerId && (
                              <span className="text-[10px] text-slate-400 ml-1">(You)</span>
                            )}
                          </div>
                          <div className="hidden sm:block short-landscape:hidden text-[10px] text-slate-400 capitalize truncate">
                            {r.car.chassis} · {r.car.wing.replace('_', ' ')}
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] sm:text-[11px] font-semibold shrink-0">
                        {r.id === room.hostId ? (
                          <span className="text-[#f59e0b]">Host</span>
                        ) : r.ready ? (
                          <span className="text-emerald-400">Ready</span>
                        ) : (
                          <span className="text-slate-400">Wait</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave + Start/Ready Action Row */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 shrink-0">
                <button
                  type="button"
                  data-testid="btn-leave-room"
                  onClick={onLeaveRoom}
                  className="py-2 sm:py-2.5 short-landscape:py-1.5 px-3 rounded-lg glass-btn-subtle text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer active:scale-[0.98]"
                >
                  Leave Room
                </button>

                {isHost ? (
                  <button
                    type="button"
                    data-testid="btn-start-room-race"
                    onClick={onStartRace}
                    className="flex items-center justify-center gap-1.5 py-2 sm:py-2.5 short-landscape:py-1.5 px-3 rounded-lg glass-btn-primary text-[#141414] font-display font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Race</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onToggleReady(!(localRacer?.ready ?? true))}
                    className={`py-2 sm:py-2.5 short-landscape:py-1.5 px-3 rounded-lg font-display font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer active:scale-[0.98] ${
                      localRacer?.ready
                        ? 'glass-btn-emerald text-white'
                        : 'glass-btn-primary text-[#141414]'
                    }`}
                  >
                    {localRacer?.ready ? 'Ready' : 'Ready Up'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
