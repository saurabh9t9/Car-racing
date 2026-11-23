import React from 'react';
import type { StartupLoadProgress } from '../game/customModels';

interface LoadingScreenProps {
  progress: StartupLoadProgress;
}

const LOADING_BG_URL = '/assets/aistudio/image_575c520e.png';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const pct = Math.max(1, Math.min(100, Math.round(progress.percent)));

  return (
    <div
      data-testid="startup-loading-screen"
      className="fixed inset-0 z-30 bg-[#050608] overflow-hidden select-none"
    >
      {/* Full-Screen Background Sports Car Artwork */}
      <img
        src={LOADING_BG_URL}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-[76%_50%] sm:object-right pointer-events-none"
      />

      {/* Directional Contrast Scrim (obsidian fade from left for crisp typography, clear car showcase on right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.80) 34%, rgba(6,7,10,0.46) 56%, rgba(6,7,10,0.10) 80%, rgba(6,7,10,0.04) 100%)',
        }}
      />

      {/* Left-Aligned Brand Emblem & Progress Stack */}
      <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="w-full max-w-[330px] sm:max-w-[500px] md:max-w-[600px] space-y-6 sm:space-y-9 [@media(max-height:460px)]:space-y-4">
          {/* Three-Stripe Emblem + Italic Wordmark */}
          <div className="space-y-2.5 sm:space-y-3 [@media(max-height:460px)]:space-y-1.5">
            <svg
              viewBox="0 0 210 26"
              className="w-[140px] sm:w-[190px] md:w-[215px] [@media(max-height:460px)]:w-[130px] h-auto"
              aria-hidden="true"
            >
              <polygon points="16,2 78,2 64,24 2,24" fill="#ff2e17" />
              <polygon points="88,2 138,2 124,24 74,24" fill="#0ea5e9" />
              <polygon points="148,2 198,2 184,24 134,24" fill="#f8fafc" />
            </svg>

            <h1 className="font-display italic font-extrabold tracking-tight text-[36px] sm:text-[54px] md:text-[66px] [@media(max-height:460px)]:text-[34px] leading-none text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
              Turbo <span className="text-[#ff3b1a]">Drifter</span>
            </h1>
          </div>

          {/* Minimal 1% - 100% Progress Bar */}
          <div className="w-full max-w-[310px] sm:max-w-[460px] md:max-w-[540px] space-y-2 sm:space-y-2.5">
            <div className="flex items-end justify-between gap-4">
              <span
                data-testid="startup-loading-label"
                className="text-[11px] sm:text-sm md:text-base [@media(max-height:460px)]:text-xs uppercase tracking-[0.08em] font-medium text-slate-200 whitespace-nowrap"
              >
                Downloading resources...
              </span>
              <span
                data-testid="startup-loading-percent"
                className="font-sans tabular-nums text-sm sm:text-lg md:text-xl [@media(max-height:460px)]:text-sm font-medium text-white shrink-0 leading-none"
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
              className="w-full h-3 sm:h-3.5 md:h-4 rounded-full bg-black/60 border border-white/25 overflow-hidden p-[1px]"
            >
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #ff5100 0%, #ff8c1a 58%, #ffd154 100%)',
                  boxShadow: '0 0 18px rgba(255, 115, 24, 0.55)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

