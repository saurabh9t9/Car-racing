class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private muted = false;

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

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.42, this.ctx.currentTime, 0.03);
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
}

export const soundEngine = new SoundEngine();
