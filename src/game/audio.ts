import type { WeatherPreset } from '../shared/types';
import {
  computeNextAmbientDelayMs,
  resolveAmbientAudioProfile,
  type AmbientAudioMode,
  type AmbientEventKind,
} from '../shared/weather';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;

  // Weather ambient soundscape state
  private noiseBuffer: AudioBuffer | null = null;
  private ambientBedSource: AudioBufferSourceNode | null = null;
  private ambientBedFilter: BiquadFilterNode | null = null;
  private ambientBedGain: GainNode | null = null;
  private ambientWeather: WeatherPreset = 'sunny';
  private ambientActive = false;
  private ambientEventTimer: number | null = null;
  private ambientTriggerCount = 0;
  private gestureUnlockBound = false;

  private muted = false;

  private canStartContextWithoutWarning(): boolean {
    if (typeof window === 'undefined') return false;
    if (this.ctx) return true;
    const nav = navigator as Navigator & { userActivation?: { hasBeenActive: boolean } };
    return Boolean(nav.userActivation?.hasBeenActive);
  }

  private bindGestureUnlock(): void {
    if (this.gestureUnlockBound || typeof window === 'undefined') return;
    this.gestureUnlockBound = true;
    const unlock = () => {
      this.gestureUnlockBound = false;
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('keydown', unlock, true);
      if (this.ambientActive && !this.muted) {
        this.applyWeatherAmbience(false);
      }
    };
    window.addEventListener('pointerdown', unlock, { capture: true, once: true });
    window.addEventListener('keydown', unlock, { capture: true, once: true });
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.42;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const length = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Soft pink-ish filtered noise for rain, thunder, and wind beds
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.950 * b2 + white * 0.048;
      data[i] = Math.max(-1, Math.min(1, (b0 + b1 + b2 + white * 0.14) * 0.65));
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  private syncBodyDataset(lastCue?: 'thunder' | 'crickets'): void {
    if (typeof document === 'undefined' || !document.body) return;
    const profile = resolveAmbientAudioProfile(this.ambientWeather);
    document.body.dataset.ambient = this.ambientActive && !this.muted ? profile.mode : 'off';
    if (lastCue) {
      document.body.dataset.ambientCue = `${lastCue}:${this.ambientTriggerCount}`;
    }
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.42, this.ctx.currentTime, 0.03);
    }
    if (muted) {
      this.clearAmbientEventTimer();
      if (this.ambientBedGain && this.ctx) {
        this.ambientBedGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.04);
      }
      this.syncBodyDataset();
    } else if (this.ambientActive) {
      this.applyWeatherAmbience(false);
      this.syncBodyDataset();
    } else {
      this.syncBodyDataset();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public startEngine(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master || this.engineOsc1) return;

    this.engineFilter = ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 180;

    this.engineGain = ctx.createGain();
    this.engineGain.gain.value = 0;

    this.engineOsc1 = ctx.createOscillator();
    this.engineOsc1.type = 'sawtooth';
    this.engineOsc1.frequency.value = 55;

    this.engineOsc2 = ctx.createOscillator();
    this.engineOsc2.type = 'triangle';
    this.engineOsc2.frequency.value = 110;

    this.engineOsc1.connect(this.engineFilter);
    this.engineOsc2.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.master);

    this.engineOsc1.start();
    this.engineOsc2.start();
  }

  public updateEngine(speedRatio: number, isBoosting: boolean, active: boolean): void {
    if (!this.ctx || !this.engineGain || !this.engineOsc1 || !this.engineOsc2 || !this.engineFilter) return;
    const now = this.ctx.currentTime;
    if (!active || this.muted) {
      this.engineGain.gain.setTargetAtTime(0, now, 0.06);
      return;
    }
    const clamped = Math.max(0, Math.min(1.4, speedRatio));
    const baseFreq = 48 + clamped * 115 + (isBoosting ? 24 : 0);
    this.engineOsc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.engineOsc2.frequency.setTargetAtTime(baseFreq * 1.98, now, 0.05);
    this.engineFilter.frequency.setTargetAtTime(190 + clamped * 680 + (isBoosting ? 320 : 0), now, 0.05);
    this.engineGain.gain.setTargetAtTime(0.08 + clamped * 0.06, now, 0.06);
  }

  public stopEngine(): void {
    if (this.engineGain && this.ctx) {
      this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.04);
    }
  }

  public playDash(): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const jitter = 0.94 + Math.random() * 0.12;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(340 * jitter, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.19);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.21);

    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  public playRamImpact(intensity = 1): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;

    const now = ctx.currentTime;
    const vol = Math.min(0.55, 0.28 * intensity);

    // Metallic crunch + sub thump
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(150, now);
    sub.frequency.exponentialRampToValueAtTime(38, now + 0.22);
    subGain.gain.setValueAtTime(vol, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    sub.connect(subGain);
    subGain.connect(this.master);
    sub.start(now);
    sub.stop(now + 0.25);

    const clang = ctx.createOscillator();
    const clangGain = ctx.createGain();
    clang.type = 'square';
    clang.frequency.setValueAtTime(520 + Math.random() * 140, now);
    clang.frequency.exponentialRampToValueAtTime(160, now + 0.14);
    clangGain.gain.setValueAtTime(vol * 0.45, now);
    clangGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    clang.connect(clangGain);
    clangGain.connect(this.master);
    clang.start(now);
    clang.stop(now + 0.16);
  }

  public playBoost(): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.26);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.29);
  }

  public playCountdown(isGo: boolean): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isGo ? 880 : 440, now);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.35 : 0.18));
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + (isGo ? 0.36 : 0.19));
  }

  public playLap(finished: boolean): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;
    const notes = finished ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 783.99];
    notes.forEach((freq, idx) => {
      const start = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
      osc.connect(gain);
      gain.connect(this.master!);
      osc.start(start);
      osc.stop(start + 0.25);
    });
  }

  private clearAmbientEventTimer(): void {
    if (this.ambientEventTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.ambientEventTimer);
      this.ambientEventTimer = null;
    }
  }

  private ensureAmbientBed(ctx: AudioContext): void {
    if (!this.master || this.ambientBedSource) return;

    this.ambientBedFilter = ctx.createBiquadFilter();
    this.ambientBedGain = ctx.createGain();
    this.ambientBedGain.gain.value = 0;

    const src = ctx.createBufferSource();
    src.buffer = this.getNoiseBuffer(ctx);
    src.loop = true;

    src.connect(this.ambientBedFilter);
    this.ambientBedFilter.connect(this.ambientBedGain);
    this.ambientBedGain.connect(this.master);
    src.start();
    this.ambientBedSource = src;
  }

  private scheduleNextAmbientEvent(immediateCue: boolean): void {
    this.clearAmbientEventTimer();
    if (!this.ambientActive || this.muted || typeof window === 'undefined') return;

    const profile = resolveAmbientAudioProfile(this.ambientWeather);
    if (profile.eventKind === 'none') return;

    const delayMs = immediateCue ? 180 : computeNextAmbientDelayMs(profile);
    this.ambientEventTimer = window.setTimeout(() => {
      this.ambientEventTimer = null;
      if (!this.ambientActive || this.muted) return;
      if (profile.eventKind === 'thunder') {
        this.playThunder();
      } else if (profile.eventKind === 'crickets') {
        this.playCricketChirp();
      }
      this.scheduleNextAmbientEvent(false);
    }, delayMs);
  }

  private applyWeatherAmbience(triggerCue: boolean): void {
    const profile = resolveAmbientAudioProfile(this.ambientWeather);
    if (!this.ambientActive || this.muted) {
      this.clearAmbientEventTimer();
      if (this.ambientBedGain && this.ctx) {
        this.ambientBedGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      }
      return;
    }

    if (!this.canStartContextWithoutWarning()) {
      this.bindGestureUnlock();
      return;
    }

    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;
    this.ensureAmbientBed(ctx);

    if (this.ambientBedFilter && this.ambientBedGain) {
      const now = ctx.currentTime;
      this.ambientBedFilter.type = profile.bedFilterType;
      this.ambientBedFilter.frequency.setTargetAtTime(profile.bedFilterFreq, now, 0.14);
      this.ambientBedFilter.Q.setTargetAtTime(profile.bedFilterQ, now, 0.14);
      this.ambientBedGain.gain.setTargetAtTime(profile.bedVolume, now, 0.22);
    }

    this.scheduleNextAmbientEvent(triggerCue);
  }

  public setWeatherAmbience(weather: WeatherPreset, active = true): void {
    const changed = this.ambientWeather !== weather || this.ambientActive !== active;
    const weatherChanged = this.ambientWeather !== weather;
    this.ambientWeather = weather;
    this.ambientActive = active;

    if (!active) {
      this.clearAmbientEventTimer();
      if (this.ambientBedGain && this.ctx) {
        this.ambientBedGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      }
      this.syncBodyDataset();
      return;
    }

    if (changed || this.ambientEventTimer === null) {
      this.applyWeatherAmbience(weatherChanged || changed);
    }
    this.syncBodyDataset();
  }

  public stopWeatherAmbience(): void {
    this.setWeatherAmbience(this.ambientWeather, false);
  }

  public playThunder(): void {
    if (this.muted || !this.canStartContextWithoutWarning()) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;

    this.ambientTriggerCount += 1;
    this.syncBodyDataset('thunder');
    const now = ctx.currentTime;
    const duration = 2.4 + Math.random() * 0.7;

    // Distant rolling thunderclap via sweeping lowpass noise
    const src = ctx.createBufferSource();
    src.buffer = this.getNoiseBuffer(ctx);
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240 + Math.random() * 80, now);
    filter.frequency.exponentialRampToValueAtTime(62, now + duration);
    filter.Q.value = 1.1;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.09);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.42);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.65);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(now);
    src.stop(now + duration + 0.05);

    // Sub-bass pressure rumble
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(52, now);
    sub.frequency.exponentialRampToValueAtTime(28, now + 1.5);
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.18, now + 0.12);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    sub.connect(subGain);
    subGain.connect(this.master);
    sub.start(now);
    sub.stop(now + 1.65);
  }

  public playCricketChirp(): void {
    if (this.muted || !this.canStartContextWithoutWarning()) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;

    this.ambientTriggerCount += 1;
    this.syncBodyDataset('crickets');
    const baseTime = ctx.currentTime;
    const baseFreq = 3980 + Math.random() * 440;
    const pulses = 3 + Math.floor(Math.random() * 2);

    for (let i = 0; i < pulses; i++) {
      const start = baseTime + i * 0.055;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, start);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.96, start + 0.032);

      filter.type = 'bandpass';
      filter.frequency.value = baseFreq;
      filter.Q.value = 3.2;

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.055, start + 0.007);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.036);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 0.042);
    }
  }

  public getAmbientState(): {
    weather: WeatherPreset;
    mode: AmbientAudioMode | 'off';
    eventKind: AmbientEventKind;
    active: boolean;
    muted: boolean;
    hasContext: boolean;
    triggerCount: number;
  } {
    const profile = resolveAmbientAudioProfile(this.ambientWeather);
    return {
      weather: this.ambientWeather,
      mode: this.ambientActive && !this.muted ? profile.mode : 'off',
      eventKind: profile.eventKind,
      active: this.ambientActive,
      muted: this.muted,
      hasContext: Boolean(this.ctx),
      triggerCount: this.ambientTriggerCount,
    };
  }
}

export const soundEngine = new SoundEngine();
