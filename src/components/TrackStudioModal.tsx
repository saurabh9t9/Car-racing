import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.js';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2.js';
import Eraser from 'lucide-react/dist/esm/icons/eraser.js';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert.js';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.js';
import Upload from 'lucide-react/dist/esm/icons/upload.js';
import Zap from 'lucide-react/dist/esm/icons/zap.js';
import {
  buildFreehandTrack,
  compileTrack,
  FREEHAND_WORLD_SPAN,
  generateAutoSketchLoop,
  sampleTrackAt,
} from '../shared/trackMath';
import type { ObstacleKind, ObstacleSpec, TrackDefinition, TrackPoint, TrackTheme } from '../shared/types';

interface TrackStudioModalProps {
  authorName: string;
  onTrackPublished: (track: TrackDefinition) => void;
  onClose: () => void;
}

const THEMES: Array<{ id: TrackTheme; label: string; bg: string; road: string }> = [
  { id: 'alpine', label: 'Alpine Day', bg: '#2c4932', road: '#334155' },
  { id: 'sunset', label: 'Sunset Canyon', bg: '#6c3e26', road: '#383034' },
  { id: 'midnight', label: 'Midnight Marina', bg: '#152033', road: '#1e293b' },
  { id: 'coastal', label: 'Pacific Coastline', bg: '#706246', road: '#2b3440' },
  { id: 'sakura', label: 'Sakura Pass', bg: '#4a3d4c', road: '#2b303a' },
];

export const TrackStudioModal: React.FC<TrackStudioModalProps> = ({
  authorName,
  onTrackPublished,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastSketchStyleRef = useRef<number | undefined>(undefined);
  const [drawing, setDrawing] = useState(false);
  const [rawPoints, setRawPoints] = useState<TrackPoint[]>([]);
  const [trackName, setTrackName] = useState('Apex Sketchway');
  const [theme, setTheme] = useState<TrackTheme>('alpine');
  const [roadWidth, setRoadWidth] = useState(18);
  const [boostPads, setBoostPads] = useState<number[]>([0.16, 0.52, 0.82]);
  const [obstacles, setObstacles] = useState<ObstacleSpec[]>([]);
  const [toolMode, setToolMode] = useState<'draw' | 'boost' | 'obstacle'>('draw');
  const [obstacleBrush, setObstacleBrush] = useState<ObstacleKind>('barricade');
  const [publishing, setPublishing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validation = useMemo(
    () => buildFreehandTrack(rawPoints, FREEHAND_WORLD_SPAN),
    [rawPoints],
  );

  const compiledPreview = useMemo(() => {
    if (!validation.valid) return null;
    return compileTrack(
      {
        id: 'preview',
        name: trackName,
        author: authorName,
        theme,
        roadWidth,
        controlPoints: validation.controlPoints,
        boostPads,
        obstacles,
        createdAt: 0,
      },
      180,
    );
  }, [validation, trackName, authorName, theme, roadWidth, boostPads, obstacles]);

  // Draw 2D track canvas whenever points or compiled preview update
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

    ctx.fillStyle = activeTheme.bg;
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const toCanvas = (wx: number, wz: number) => ({
      x: (wx / FREEHAND_WORLD_SPAN + 0.5) * w,
      y: (wz / FREEHAND_WORLD_SPAN + 0.5) * h,
    });

    // If valid compiled spline exists, draw smoothed 3D-scaled road ribbon
    if (compiledPreview && !drawing) {
      const roadPx = (roadWidth / FREEHAND_WORLD_SPAN) * w;

      // Curb outline
      ctx.beginPath();
      compiledPreview.samples.forEach((s, idx) => {
        const pt = toCanvas(s.x, s.z);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.strokeStyle = '#ff4d2e';
      ctx.lineWidth = roadPx + 5;
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Asphalt ribbon
      ctx.strokeStyle = activeTheme.road;
      ctx.lineWidth = roadPx;
      ctx.stroke();

      // Dashed centerline
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = 'rgba(248, 250, 252, 0.55)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Boost Pads
      for (const padT of boostPads) {
        const s = sampleTrackAt(compiledPreview, padT);
        const pt = toCanvas(s.x, s.z);
        ctx.fillStyle = '#0ea5e9';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Obstacles
      for (const obs of obstacles) {
        const s = sampleTrackAt(compiledPreview, obs.t);
        const pt = toCanvas(s.x + s.nx * obs.lateral, s.z + s.nz * obs.lateral);
        if (obs.kind === 'barricade') {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(pt.x - 5, pt.y - 5, 10, 10);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(pt.x - 5, pt.y - 5, 10, 10);
        } else if (obs.kind === 'tire_stack') {
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.fillStyle = '#ff6b1a';
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y - 6);
          ctx.lineTo(pt.x + 5, pt.y + 4);
          ctx.lineTo(pt.x - 5, pt.y + 4);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Start/Finish marker
      const s0 = compiledPreview.samples[0];
      const p0 = toCanvas(s0.x, s0.z);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p0.x, p0.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', p0.x, p0.y);
    } else if (rawPoints.length > 1) {
      // Draw freehand stroke in progress
      ctx.beginPath();
      rawPoints.forEach((p, idx) => {
        const cx = p.x * w;
        const cy = p.z * h;
        if (idx === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.strokeStyle = '#ff4d2e';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Origin indicator
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(rawPoints[0].x * w, rawPoints[0].z * h, 7, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click & drag to draw a closed racing circuit loop', w / 2, h / 2);
    }
  }, [rawPoints, compiledPreview, drawing, theme, roadWidth, boostPads, obstacles]);

  const getNormalizedPoint = (e: React.PointerEvent<HTMLCanvasElement>): TrackPoint => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0.06, Math.min(0.94, (e.clientX - rect.left) / rect.width));
    const z = Math.max(0.06, Math.min(0.94, (e.clientY - rect.top) / rect.height));
    return { x, z };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setErrorMsg(null);
    const pt = getNormalizedPoint(e);

    if ((toolMode === 'boost' || toolMode === 'obstacle') && compiledPreview) {
      const wx = (pt.x - 0.5) * FREEHAND_WORLD_SPAN;
      const wz = (pt.z - 0.5) * FREEHAND_WORLD_SPAN;
      let bestSample = compiledPreview.samples[0];
      let bestDist = Infinity;
      for (const s of compiledPreview.samples) {
        const d = Math.hypot(s.x - wx, s.z - wz);
        if (d < bestDist) {
          bestDist = d;
          bestSample = s;
        }
      }
      if (bestDist < 28) {
        if (toolMode === 'boost') {
          const existingIdx = boostPads.findIndex(
            (t) => Math.min(Math.abs(t - bestSample.t), 1 - Math.abs(t - bestSample.t)) < 0.045,
          );
          if (existingIdx >= 0) {
            setBoostPads(boostPads.filter((_, i) => i !== existingIdx));
          } else if (boostPads.length < 8) {
            setBoostPads([...boostPads, Number(bestSample.t.toFixed(3))]);
          }
        } else {
          const signedLat = (wx - bestSample.x) * bestSample.nx + (wz - bestSample.z) * bestSample.nz;
          const maxLat = roadWidth * 0.38;
          const lateral = Number(Math.max(-maxLat, Math.min(maxLat, signedLat)).toFixed(1));
          const existingIdx = obstacles.findIndex((o) => {
            const os = sampleTrackAt(compiledPreview, o.t);
            const ox = os.x + os.nx * o.lateral;
            const oz = os.z + os.nz * o.lateral;
            return Math.hypot(ox - wx, oz - wz) < 12;
          });
          if (existingIdx >= 0) {
            setObstacles(obstacles.filter((_, i) => i !== existingIdx));
          } else if (obstacles.length < 16) {
            setObstacles([
              ...obstacles,
              {
                id: `custom-obs-${Date.now().toString(36)}-${obstacles.length}`,
                t: Number(bestSample.t.toFixed(3)),
                lateral,
                kind: obstacleBrush,
              },
            ]);
          }
        }
      }
      return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    setDrawing(true);
    setToolMode('draw');
    setRawPoints([pt]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const pt = getNormalizedPoint(e);
    setRawPoints((prev) => {
      const last = prev[prev.length - 1];
      if (!last || Math.hypot(pt.x - last.x, pt.z - last.z) >= 0.015) {
        return [...prev, pt];
      }
      return prev;
    });
  };

  const handlePointerUp = () => {
    if (drawing) {
      setDrawing(false);
    }
  };

  const handleAutoSketchLoop = () => {
    const generated = generateAutoSketchLoop(Math.random, lastSketchStyleRef.current);
    lastSketchStyleRef.current = generated.archetype;
    setRawPoints(generated.points);
    setBoostPads(generated.boostPads);
    setObstacles(generated.obstacles);
    setToolMode('draw');
    setErrorMsg(null);
  };

  const handlePublish = async () => {
    if (!validation.valid) {
      setErrorMsg(validation.reason ?? 'Please draw a valid closed loop first.');
      return;
    }
    if (!trackName.trim()) {
      setErrorMsg('Enter a name for your community track.');
      return;
    }

    setPublishing(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trackName.trim(),
          author: authorName || 'Driver',
          theme,
          roadWidth,
          controlPoints: validation.controlPoints,
          boostPads,
          obstacles,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish track.');
      }
      onTrackPublished(data.track);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to publish track.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div
      data-testid="track-studio-modal"
      className="fixed inset-0 z-30 bg-[#11151c]/95 flex items-stretch lg:items-center justify-center p-0 sm:p-3 lg:p-8"
    >
      <div className="w-full max-w-5xl rounded-none sm:rounded-xl glass-panel border-0 sm:border border-white/15 p-3 sm:p-5 md:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6 h-full lg:h-auto lg:max-h-[92vh] overflow-y-auto overscroll-contain">
        {/* Left: Freehand Drawing Canvas */}
        <div className="flex-1 flex flex-col gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg glass-btn-subtle text-xs font-semibold text-white transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Back</span>
              </button>
              <div className="min-w-0">
                <h2 className="font-display text-base sm:text-xl font-bold text-white leading-tight truncate">
                  Freehand Track Studio
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-snug truncate">
                  Sketch a closed loop — scroll for circuit settings
                </p>
              </div>
            </div>
          </div>

          <div
            data-testid="track-canvas-frame"
            className="relative mx-auto w-full aspect-[4/3] max-h-[calc(100dvh-132px)] max-w-[calc((100dvh-132px)*4/3)] [@media(max-height:460px)]:max-h-[calc(100dvh-96px)] [@media(max-height:460px)]:max-w-[calc((100dvh-96px)*4/3)] lg:max-h-none lg:max-w-none rounded-xl overflow-hidden border border-white/15 bg-[#10141c]"
          >
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full block touch-none cursor-crosshair"
              data-testid="track-draw-canvas"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setRawPoints([]);
                  setObstacles([]);
                  setToolMode('draw');
                  setErrorMsg(null);
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg glass-btn-subtle text-[11px] sm:text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer active:scale-95"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
              <button
                type="button"
                onClick={handleAutoSketchLoop}
                data-testid="btn-auto-sketch"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg glass-btn-subtle text-[11px] sm:text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto-Sketch Loop</span>
              </button>
              {validation.valid && (
                <>
                  <button
                    type="button"
                    onClick={() => setToolMode((m) => (m === 'boost' ? 'draw' : 'boost'))}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                      toolMode === 'boost'
                        ? 'glass-btn-orange-soft text-white'
                        : 'glass-btn-subtle text-slate-200 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-[#ffb238]" />
                    <span>{toolMode === 'boost' ? 'Click Track: Boost' : `Boosts (${boostPads.length})`}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setToolMode((m) => (m === 'obstacle' ? 'draw' : 'obstacle'))}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                      toolMode === 'obstacle'
                        ? 'glass-btn-orange-soft text-white'
                        : 'glass-btn-subtle text-slate-200 hover:text-white'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-[#ff4d2e]" />
                    <span>{toolMode === 'obstacle' ? 'Click Track: Obstacle' : `Obstacles (${obstacles.length})`}</span>
                  </button>
                  {toolMode === 'obstacle' && (
                    <button
                      type="button"
                      onClick={() =>
                        setObstacleBrush((b) =>
                          b === 'barricade' ? 'tire_stack' : b === 'tire_stack' ? 'cone_cluster' : 'barricade',
                        )
                      }
                      className="px-2.5 py-1.5 sm:py-2 rounded-lg glass-btn-subtle border-amber-400/50 text-[11px] sm:text-xs font-semibold text-amber-300 transition-all cursor-pointer active:scale-95"
                    >
                      Type: {obstacleBrush === 'barricade' ? 'Barricade' : obstacleBrush === 'tire_stack' ? 'Tire Stack' : 'Cones'}
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="text-xs font-medium">
              {validation.valid ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Circuit Valid · <span className="font-mono-num">{Math.round(validation.estimatedLength)}m</span>
                </span>
              ) : (
                <span className="text-slate-400">
                  {rawPoints.length > 0 ? validation.reason : 'Draw a closed loop to validate'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right (Below on smaller devices): Track Properties & Publish */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-3.5 pb-2 lg:py-0 lg:pl-6">
          <div className="space-y-3.5 sm:space-y-4">
            <div>
              <label htmlFor="track-name-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Circuit Name
              </label>
              <input
                id="track-name-input"
                type="text"
                maxLength={36}
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#10141c]/90 border border-white/15 text-sm text-white focus:outline-none focus:border-[#ff4d2e]"
              />
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-300 mb-2">World Biome</span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center justify-between gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer active:scale-[0.98] ${
                      theme === t.id
                        ? 'glass-btn-orange-soft text-white'
                        : 'glass-btn-subtle text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{t.label}</span>
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border border-white/30 shrink-0" style={{ backgroundColor: t.bg }} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-300">Road Width</span>
                <span className="font-mono-num text-white">{roadWidth}m</span>
              </div>
              <input
                type="range"
                min={14}
                max={24}
                step={1}
                value={roadWidth}
                onChange={(e) => setRoadWidth(Number(e.target.value))}
                aria-label="Road Width"
                className="w-full apex-slider"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/40 text-xs text-red-200">
                {errorMsg}
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={publishing || !validation.valid}
            onClick={handlePublish}
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg glass-btn-primary disabled:opacity-45 disabled:cursor-not-allowed text-[#141414] font-display font-bold text-sm tracking-wide transition-all cursor-pointer active:scale-[0.98]"
          >
            <Upload className="w-4 h-4" />
            <span>{publishing ? 'Publishing...' : 'Publish to Community'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
