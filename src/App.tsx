import { useCallback, useEffect, useRef, useState } from 'react';
import { GarageModal } from './components/GarageModal';
import { LoadingScreen } from './components/LoadingScreen';
import { LobbyModal } from './components/LobbyModal';
import { MapSelectModal } from './components/MapSelectModal';
import { PauseModal, ResultsModal } from './components/PauseResultsModal';
import { RaceHud, type VirtualControlKey } from './components/RaceHud';
import { TitleSettingsModal } from './components/SettingsModal';
import { TitleOverlay } from './components/TitleOverlay';
import { TrackStudioModal } from './components/TrackStudioModal';
import { soundEngine } from './game/audio';
import type { StartupLoadProgress } from './game/customModels';
import { RaceEngine, type HudTelemetry } from './game/RaceEngine';
import type { AudioChannelId, AudioMixSettings } from './shared/audioSettings';
import {
  loadHudSettings,
  saveHudSettings,
  type HudSettings,
} from './shared/hudSettings';
import { loadGraphicsQuality, type GraphicsQuality } from './shared/graphicsQuality';
import {
  INITIAL_PERF_TELEMETRY,
  type PerformanceTelemetrySnapshot,
} from './shared/perfTelemetry';
import { DEFAULT_CAR_CONFIG } from './shared/physics';
import { STARTER_TRACKS } from './shared/trackMath';
import type {
  ClientMessage,
  RaceInput,
  RoomSnapshot,
  ServerMessage,
  TrackDefinition,
  VehicleConfig,
  WeatherPreset,
} from './shared/types';
import { getDefaultWeatherForTheme, isWeatherPreset } from './shared/weather';

type ActiveScreen = 'loading' | 'title' | 'map' | 'garage' | 'studio' | 'lobby' | 'playing' | 'paused' | 'gameover';

const CAR_STORAGE_KEY = 'slipstream_ram_car_v2';
const NAME_STORAGE_KEY = 'slipstream_ram_name_v1';

function loadSavedCar(): VehicleConfig {
  try {
    const raw = localStorage.getItem(CAR_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.chassis && parsed.stats) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_CAR_CONFIG;
}

function loadSavedName(): string {
  try {
    return localStorage.getItem(NAME_STORAGE_KEY) || 'Apex Driver';
  } catch {
    return 'Apex Driver';
  }
}

const INITIAL_HUD: HudTelemetry = {
  speedKmh: 0,
  position: 1,
  totalRacers: 6,
  lap: 1,
  totalLaps: 3,
  elapsedMs: 0,
  bestLapMs: null,
  dashCooldownRatio: 0,
  dashDir: 0,
  ramHits: 0,
  countdownSec: 3,
  status: 'countdown',
  racersMinimap: [],
  standings: [],
  recentRamBanner: null,
};

export default function App() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<RaceEngine | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [screen, setScreen] = useState<ActiveScreen>('loading');
  const [loadProgress, setLoadProgress] = useState<StartupLoadProgress>({
    percent: 0,
  });
  const [tracks, setTracks] = useState<TrackDefinition[]>(STARTER_TRACKS);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(STARTER_TRACKS[0].id);
  const [weather, setWeather] = useState<WeatherPreset>(() =>
    getDefaultWeatherForTheme(STARTER_TRACKS[0].theme),
  );
  const [playerName, setPlayerName] = useState<string>(loadSavedName);
  const [car, setCar] = useState<VehicleConfig>(loadSavedCar);
  const [carThumbnails, setCarThumbnails] = useState<Record<string, string>>({});
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(() => soundEngine.getVolume());
  const [audioMix, setAudioMix] = useState<AudioMixSettings>(() => soundEngine.getMix());
  const [muted, setMuted] = useState<boolean>(() => soundEngine.isMuted());
  const [hud, setHud] = useState<HudTelemetry>(INITIAL_HUD);
  const [perfTelemetry, setPerfTelemetry] = useState<PerformanceTelemetrySnapshot>(
    INITIAL_PERF_TELEMETRY,
  );
  const [hudSettings, setHudSettings] = useState<HudSettings>(loadHudSettings);
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(loadGraphicsQuality);
  const [hudSettingsOpen, setHudSettingsOpen] = useState<boolean>(false);
  const [titleSettingsOpen, setTitleSettingsOpen] = useState<boolean>(false);

  // Multiplayer WebSocket state
  const [wsConnected, setWsConnected] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [room, setRoom] = useState<RoomSnapshot | null>(null);
  const [lobbyError, setLobbyError] = useState<string | null>(null);
  const [isOnlineRace, setIsOnlineRace] = useState(false);

  // Refs for stable access inside WebSocket & keyboard callbacks
  const screenRef = useRef(screen);
  screenRef.current = screen;
  const tracksRef = useRef(tracks);
  tracksRef.current = tracks;
  const selectedTrackIdRef = useRef(selectedTrackId);
  selectedTrackIdRef.current = selectedTrackId;
  const weatherRef = useRef(weather);
  weatherRef.current = weather;
  const weatherLockedRef = useRef(false);
  const carRef = useRef(car);
  carRef.current = car;
  const playerNameRef = useRef(playerName);
  playerNameRef.current = playerName;
  const roomRef = useRef(room);
  const playerIdRef = useRef(playerId);
  playerIdRef.current = playerId;
  const titleSettingsOpenRef = useRef(titleSettingsOpen);
  titleSettingsOpenRef.current = titleSettingsOpen;
  const hudSettingsOpenRef = useRef(hudSettingsOpen);
  hudSettingsOpenRef.current = hudSettingsOpen;

  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) ?? tracks[0];

  // Mirror game state & active weather to document.body.dataset
  useEffect(() => {
    if (screen === 'loading') document.body.dataset.state = 'loading';
    else if (screen === 'playing') document.body.dataset.state = 'playing';
    else if (screen === 'paused') document.body.dataset.state = 'paused';
    else if (screen === 'gameover') document.body.dataset.state = 'gameover';
    else document.body.dataset.state = 'title';
  }, [screen]);

  useEffect(() => {
    document.body.dataset.weather = weather;
  }, [weather]);

  // Persist car & callsign
  useEffect(() => {
    try {
      localStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(car));
    } catch {
      // ignore
    }
  }, [car]);

  useEffect(() => {
    try {
      localStorage.setItem(NAME_STORAGE_KEY, playerName);
    } catch {
      // ignore
    }
  }, [playerName]);

  useEffect(() => {
    saveHudSettings(hudSettings);
  }, [hudSettings]);

  const sendWs = useCallback((msg: ClientMessage) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  }, []);

  const fetchTracks = useCallback(async () => {
    try {
      const res = await fetch('/api/tracks');
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.tracks) && data.tracks.length > 0) {
        setTracks(data.tracks);
      }
    } catch {
      // fallback to starter tracks
    }
  }, []);

  // Fetch community tracks on mount
  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  // Connect WebSocket once on mount with auto-reconnect
  useEffect(() => {
    let closedByUnmount = false;
    let reconnectTimer: number | null = null;

    const connect = () => {
      if (closedByUnmount) return;
      const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${proto}//${window.location.host}/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
      };

      ws.onclose = () => {
        setWsConnected(false);
        if (!closedByUnmount) {
          reconnectTimer = window.setTimeout(connect, 1800);
        }
      };

      ws.onmessage = (event) => {
        let msg: ServerMessage;
        try {
          msg = JSON.parse(event.data) as ServerMessage;
        } catch {
          return;
        }

        if (msg.type === 'welcome') {
          setPlayerId(msg.playerId);
        } else if (msg.type === 'room:error') {
          setLobbyError(msg.message);
        } else if (msg.type === 'room:joined') {
          setLobbyError(null);
          setPlayerId(msg.playerId);
          setRoom(msg.room);
          roomRef.current = msg.room;
          // Refresh tracks in case host picked a newly published community track
          fetchTracks();
        } else if (msg.type === 'room:state') {
          const prevRoom = roomRef.current;
          roomRef.current = msg.room;
          const raceActive = screenRef.current === 'playing' || screenRef.current === 'paused';
          if (!raceActive || msg.room.status === 'finished') {
            setRoom(msg.room);
          }

          // If host changed track to one we don't have locally yet, refresh tracks
          if (!tracksRef.current.some((t) => t.id === msg.room.config.trackId)) {
            fetchTracks();
          }

          // Transition from waiting -> countdown/racing
          if (
            (msg.room.status === 'countdown' || msg.room.status === 'racing') &&
            (!prevRoom || prevRoom.status === 'waiting')
          ) {
            const trackDef =
              tracksRef.current.find((t) => t.id === msg.room.config.trackId) ?? STARTER_TRACKS[0];
            const roomWeather = isWeatherPreset(msg.room.config.weather)
              ? msg.room.config.weather
              : getDefaultWeatherForTheme(trackDef.theme);
            setSelectedTrackId(trackDef.id);
            setWeather(roomWeather);
            setIsOnlineRace(true);
            setScreen('playing');
            engineRef.current?.startOnlineRace(
              msg.room,
              playerIdRef.current ?? '',
              trackDef,
              roomWeather,
            );
          } else if (
            (msg.room.status === 'countdown' || msg.room.status === 'racing') &&
            (screenRef.current === 'playing' || screenRef.current === 'paused')
          ) {
            engineRef.current?.applyOnlineSnapshot(msg.room);
          } else if (msg.room.status === 'finished') {
            engineRef.current?.applyOnlineSnapshot(msg.room);
            setScreen('gameover');
          } else if (msg.room.status === 'waiting' && screenRef.current === 'gameover') {
            setIsOnlineRace(false);
            setScreen('lobby');
            engineRef.current?.enterTitleMode(carRef.current);
          }
        }
      };
    };

    connect();
    return () => {
      closedByUnmount = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      wsRef.current?.close();
    };
  }, [fetchTracks]);

  const startSoloRace = useCallback(
    (trackToUse?: TrackDefinition) => {
      const trk =
        trackToUse ??
        tracksRef.current.find((t) => t.id === selectedTrackIdRef.current) ??
        STARTER_TRACKS[0];
      setIsOnlineRace(false);
      setHudSettingsOpen(false);
      setScreen('playing');
      engineRef.current?.startSoloRace(
        playerNameRef.current,
        carRef.current,
        trk,
        3,
        5,
        weatherRef.current,
      );
    },
    [],
  );

  // Mount Three.js RaceEngine once inside isolated sibling container
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const engine = new RaceEngine(
      mount,
      (nextHud) => {
        setHud(nextHud);
        if (nextHud.status === 'finished' && screenRef.current === 'playing') {
          setScreen('gameover');
        }
      },
      (input: RaceInput, sequence: number) => {
        sendWs({ type: 'race:input', input, sequence });
      },
      (loading: boolean) => {
        setModelLoading(loading);
      },
      (perf: PerformanceTelemetrySnapshot) => {
        setPerfTelemetry(perf);
      },
    );
    engineRef.current = engine;

    let cancelled = false;
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart') === '1';

    Promise.all([
      fetchTracks(),
      engine.preloadInitialAssets(carRef.current, (info) => {
        if (!cancelled) setLoadProgress(info);
      }),
    ]).then(() => {
      if (cancelled) return;
      window.setTimeout(() => {
        if (cancelled) return;
        if (autostart) {
          const paramWeather = params.get('weather');
          const startWeather = isWeatherPreset(paramWeather) ? paramWeather : weatherRef.current;
          if (isWeatherPreset(paramWeather)) {
            weatherLockedRef.current = true;
            setWeather(startWeather);
          }
          setIsOnlineRace(false);
          setScreen('playing');
          engine.startSoloRace(
            playerNameRef.current,
            carRef.current,
            STARTER_TRACKS[0],
            3,
            5,
            startWeather,
          );
        } else {
          setScreen('title');
        }
      }, 220);
    });

    return () => {
      cancelled = true;
      engine.dispose();
      engineRef.current = null;
    };
  }, [fetchTracks, sendWs]);

  // Global keyboard shortcuts (Title Enter/Space start, Esc/P Pause, M Mute)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if (typing) return;

      if (screenRef.current === 'title' && titleSettingsOpenRef.current) {
        if (e.code === 'Escape') {
          e.preventDefault();
          setTitleSettingsOpen(false);
        } else if (e.code === 'KeyM') {
          const nextMuted = !soundEngine.isMuted();
          soundEngine.setMuted(nextMuted);
          setMuted(nextMuted);
          setVolume(soundEngine.getVolume());
          setAudioMix(soundEngine.getMix());
        }
        return;
      }

      if (screenRef.current === 'playing' && hudSettingsOpenRef.current && e.code === 'Escape') {
        e.preventDefault();
        setHudSettingsOpen(false);
        engineRef.current?.setPaused(false);
        return;
      }

      if (screenRef.current === 'title' && (e.code === 'Enter' || e.code === 'Space')) {
        e.preventDefault();
        startSoloRace();
      } else if (screenRef.current === 'map' && e.code === 'Escape') {
        e.preventDefault();
        setScreen('title');
      } else if (screenRef.current === 'playing' && (e.code === 'Escape' || e.code === 'KeyP')) {
        e.preventDefault();
        setScreen('paused');
        engineRef.current?.setPaused(true);
      } else if (screenRef.current === 'paused' && (e.code === 'Escape' || e.code === 'KeyP')) {
        e.preventDefault();
        setScreen('playing');
        engineRef.current?.setPaused(false);
      } else if (e.code === 'KeyM') {
        const nextMuted = !soundEngine.isMuted();
        soundEngine.setMuted(nextMuted);
        setMuted(nextMuted);
        setVolume(soundEngine.getVolume());
        setAudioMix(soundEngine.getMix());
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [startSoloRace]);

  const handleToggleMute = useCallback(() => {
    const next = !soundEngine.isMuted();
    soundEngine.setMuted(next);
    setMuted(next);
    setVolume(soundEngine.getVolume());
    setAudioMix(soundEngine.getMix());
  }, []);

  const handleChangeVolume = useCallback((nextVolume: number) => {
    soundEngine.setVolume(nextVolume);
    setVolume(soundEngine.getVolume());
    setAudioMix(soundEngine.getMix());
    setMuted(soundEngine.isMuted());
  }, []);

  const handleChangeChannelVolume = useCallback((channel: AudioChannelId, nextVolume: number) => {
    soundEngine.setChannelVolume(channel, nextVolume);
    setAudioMix(soundEngine.getMix());
    setVolume(soundEngine.getVolume());
    setMuted(soundEngine.isMuted());
  }, []);

  const handleChangeGraphicsQuality = useCallback((quality: GraphicsQuality) => {
    setGraphicsQuality(quality);
    engineRef.current?.setGraphicsQuality(quality);
  }, []);

  const handleToggleHudSettings = useCallback((open: boolean) => {
    setHudSettingsOpen(open);
    if (screenRef.current === 'playing') {
      engineRef.current?.setPaused(open);
    }
  }, []);

  const handleVirtualControl = useCallback((control: VirtualControlKey, pressed: boolean) => {
    engineRef.current?.setVirtualControl(control, pressed);
  }, []);

  const handleSelectTrack = (id: string) => {
    setSelectedTrackId(id);
    const trk = tracks.find((t) => t.id === id);
    if (!trk) return;
    const nextWeather = weatherLockedRef.current
      ? weather
      : getDefaultWeatherForTheme(trk.theme);
    if (!weatherLockedRef.current) {
      setWeather(nextWeather);
    }
    if (screen === 'title' || screen === 'map') {
      engineRef.current?.loadTrack(trk, nextWeather);
      engineRef.current?.enterTitleMode(car);
    }
  };

  const handleSelectWeather = (nextWeather: WeatherPreset) => {
    weatherLockedRef.current = true;
    setWeather(nextWeather);
    engineRef.current?.setWeather(nextWeather);
  };

  const handleChangeCar = (nextCar: VehicleConfig) => {
    setCar(nextCar);
    if (screen === 'garage') {
      engineRef.current?.updateGarageCar(nextCar);
    }
    if (room) {
      sendWs({ type: 'room:update_car', name: playerName, car: nextCar });
    }
  };

  const handleExitToTitle = () => {
    if (room) {
      sendWs({ type: 'room:leave' });
      setRoom(null);
      roomRef.current = null;
    }
    setIsOnlineRace(false);
    setScreen('title');
    engineRef.current?.loadTrack(selectedTrack, weather);
    engineRef.current?.enterTitleMode(car);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#11151c]">
      {/* Isolated WebGL Viewport Container */}
      <div
        ref={canvasMountRef}
        data-testid="race-canvas-container"
        className="absolute inset-0 w-full h-full"
      />

      {screen === 'loading' && <LoadingScreen progress={loadProgress} />}

      {screen === 'title' && (
        <TitleOverlay
          onQuickRace={() => {
            setTitleSettingsOpen(false);
            startSoloRace();
          }}
          onOpenMultiplayer={() => {
            setTitleSettingsOpen(false);
            setLobbyError(null);
            setScreen('lobby');
          }}
          onOpenGarage={() => {
            setTitleSettingsOpen(false);
            setScreen('garage');
            engineRef.current?.enterGarageMode(car, playerName);
            engineRef.current?.startGarageThumbnailGeneration(car.modelId, setCarThumbnails);
          }}
          onOpenMap={() => {
            setTitleSettingsOpen(false);
            setScreen('map');
          }}
          onOpenStudio={() => {
            setTitleSettingsOpen(false);
            setScreen('studio');
          }}
          onOpenSettings={() => setTitleSettingsOpen(true)}
          muted={muted}
          onToggleMute={handleToggleMute}
          fps={perfTelemetry.fps}
        />
      )}

      {screen === 'title' && titleSettingsOpen && (
        <TitleSettingsModal
          graphicsQuality={graphicsQuality}
          onChangeGraphicsQuality={handleChangeGraphicsQuality}
          volume={volume}
          audioMix={audioMix}
          muted={muted}
          onChangeVolume={handleChangeVolume}
          onChangeChannelVolume={handleChangeChannelVolume}
          onToggleMute={handleToggleMute}
          perfTelemetry={perfTelemetry}
          onClose={() => setTitleSettingsOpen(false)}
        />
      )}

      {screen === 'map' && (
        <MapSelectModal
          tracks={tracks}
          selectedTrackId={selectedTrackId}
          onSelectTrack={handleSelectTrack}
          weather={weather}
          onSelectWeather={handleSelectWeather}
          onClose={() => setScreen('title')}
        />
      )}

      {screen === 'garage' && (
        <GarageModal
          car={car}
          playerName={playerName}
          modelLoading={modelLoading}
          thumbnails={carThumbnails}
          onChangeName={(name) => {
            setPlayerName(name);
            engineRef.current?.setGarageDriverName(name);
            if (room) sendWs({ type: 'room:update_car', name, car });
          }}
          onChangeCar={handleChangeCar}
          onStatsBoundsChange={(rightPx) => {
            engineRef.current?.setGarageStatsRightPx(rightPx);
          }}
          onClose={() => {
            engineRef.current?.stopGarageThumbnailGeneration();
            setScreen('title');
            engineRef.current?.enterTitleMode(car);
          }}
        />
      )}

      {screen === 'studio' && (
        <TrackStudioModal
          authorName={playerName}
          onTrackPublished={(newTrack) => {
            const nextWeather = weatherLockedRef.current
              ? weather
              : getDefaultWeatherForTheme(newTrack.theme);
            if (!weatherLockedRef.current) {
              setWeather(nextWeather);
            }
            setTracks((prev) => [newTrack, ...prev]);
            setSelectedTrackId(newTrack.id);
            setScreen('title');
            engineRef.current?.loadTrack(newTrack, nextWeather);
            engineRef.current?.enterTitleMode(car);
          }}
          onClose={() => setScreen('title')}
        />
      )}

      {screen === 'lobby' && (
        <LobbyModal
          room={room}
          playerId={playerId}
          playerName={playerName}
          tracks={tracks}
          error={lobbyError}
          connected={wsConnected}
          onChangeName={(name) => {
            setPlayerName(name);
            if (room) sendWs({ type: 'room:update_car', name, car });
          }}
          onCreateRoom={() => {
            setLobbyError(null);
            sendWs({
              type: 'room:create',
              name: playerName,
              car,
              trackId: selectedTrackId,
              weather,
            });
          }}
          onJoinRoom={(code) => {
            setLobbyError(null);
            sendWs({ type: 'room:join', code, name: playerName, car });
          }}
          onLeaveRoom={() => {
            sendWs({ type: 'room:leave' });
            setRoom(null);
            roomRef.current = null;
          }}
          onUpdateConfig={(patch) => sendWs({ type: 'room:update_config', config: patch })}
          onToggleReady={(ready) => sendWs({ type: 'room:ready', ready })}
          onStartRace={() => sendWs({ type: 'room:start' })}
          onClose={() => setScreen('title')}
        />
      )}

      {(screen === 'playing' || screen === 'paused') && (
        <RaceHud
          hud={hud}
          track={selectedTrack}
          fps={perfTelemetry.fps}
          perfTelemetry={perfTelemetry}
          graphicsQuality={graphicsQuality}
          volume={volume}
          audioMix={audioMix}
          muted={muted}
          hudSettings={hudSettings}
          settingsOpen={hudSettingsOpen}
          onChangeGraphicsQuality={handleChangeGraphicsQuality}
          onChangeVolume={handleChangeVolume}
          onChangeChannelVolume={handleChangeChannelVolume}
          onChangeHudSettings={setHudSettings}
          onToggleSettings={handleToggleHudSettings}
          onToggleMute={handleToggleMute}
          onPause={() => {
            setHudSettingsOpen(false);
            setScreen('paused');
            engineRef.current?.setPaused(true);
          }}
          onMobileDash={(dir) => engineRef.current?.triggerMobileDash(dir)}
          onVirtualControl={handleVirtualControl}
        />
      )}

      {screen === 'paused' && (
        <PauseModal
          isOnline={isOnlineRace}
          onResume={() => {
            setScreen('playing');
            engineRef.current?.setPaused(false);
          }}
          onRestart={() => startSoloRace()}
          onExitToTitle={handleExitToTitle}
        />
      )}

      {screen === 'gameover' && (
        <ResultsModal
          standings={hud.standings}
          localId={isOnlineRace && playerId ? playerId : 'player'}
          isOnline={isOnlineRace}
          isHost={Boolean(room && playerId && room.hostId === playerId)}
          onPlayAgain={() => startSoloRace()}
          onReturnToLobby={() => sendWs({ type: 'room:rematch' })}
          onExitToTitle={handleExitToTitle}
        />
      )}
    </div>
  );
}
