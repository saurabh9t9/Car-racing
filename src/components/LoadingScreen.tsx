import React from 'react';
import type { StartupLoadProgress } from '../game/customModels';

interface LoadingScreenProps {
  progress: StartupLoadProgress;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const pct = Math.max(1, Math.min(100, Math.round(progress.percent)));

  return (
    <div
      data-testid="startup-loading-screen"
      className="fixed inset-0 z-30 flex items-center justify-center bg-[#11151c] p-6"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(255, 77, 46, 0.16), transparent 58%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-[#161c26] border border-white/15 p-7 shadow-2xl space-y-6">
        {/* Emblem matching Title Screen */}
        <svg
          viewBox="0 0 420 96"
          className="w-full max-w-[300px] h-auto"
          role="img"
          aria-label="Turbo Drifter"
        >
          <polygon points="8,12 68,12 52,36 0,36" fill="#ff4d2e" />
          <polygon points="78,12 106,12 90,36 62,36" fill="#0ea5e9" />
          <polygon points="116,12 130,12 114,36 100,36" fill="#f8fafc" opacity="0.85" />
          <text
            x="4"
            y="78"
            fill="#f8fafc"
            fontFamily="'Oxanium', sans-serif"
            fontWeight="800"
            fontSize="44"
            letterSpacing="1.5"
          >
            Turbo <tspan fill="#ff4d2e">Drifter</tspan>
          </text>
        </svg>

        {/* Minimal 1% - 100% Progress Bar */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span
              data-testid="startup-loading-label"
              className="text-slate-200 font-medium tracking-wide"
            >
              Downloading resources...
            </span>
            <span
              data-testid="startup-loading-percent"
              className="font-mono-num font-bold text-white shrink-0"
            >
              {pct}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Downloading resources"
            className="w-full h-3 rounded-sm bg-[#0c1016] border border-white/10 overflow-hidden"
          >
            <div
              className="h-full transition-[width] duration-150 ease-out"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #ff4d2e 0%, #f59e0b 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
