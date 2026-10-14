/**
 * Sound as a substitute for touch, synthesised with Web Audio so the app
 * needs no downloads: paper scrape tied to hand speed, slot knock, stamp,
 * chain click, and a soft hum while the lamp is on.
 */

export type CaptionSink = (text: string) => void;

export class Sound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private scrapeGain: GainNode | null = null;
  private scrapeFilter: BiquadFilterNode | null = null;
  private humGain: GainNode | null = null;

  /** Create or resume the audio context. Call from a user gesture. */
  unlock(): void {
    if (!this.ctx) {
      const Ctor =
        globalThis.AudioContext ??
        (globalThis as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.8;
      this.master.connect(this.ctx.destination);
      this.noise = this.makeNoise(2);
      this.startScrapeBed();
      this.startHum();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  /** Paper scrape: 0 when still, rising with the card's speed in m/s. */
  setScrapeSpeed(speed: number): void {
    if (!this.ctx || !this.scrapeGain || !this.scrapeFilter) return;
    const s = Math.min(1, speed / 0.6);
    const t = this.ctx.currentTime;
    this.scrapeGain.gain.setTargetAtTime(s * 0.32, t, 0.03);
    this.scrapeFilter.frequency.setTargetAtTime(900 + s * 2600, t, 0.05);
  }

  setHum(on: boolean): void {
    if (!this.ctx || !this.humGain) return;
    this.humGain.gain.setTargetAtTime(on ? 0.018 : 0, this.ctx.currentTime, 0.4);
  }

  /** Two quick metallic ticks: the chain's beads, then the switch. */
  chainClick(): void {
    this.tick(0, 3200, 0.25);
    this.tick(0.06, 2100, 0.35);
  }

  /** A card seating into a slot: a dull wooden knock. */
  slotKnock(): void {
    this.thump(0, 180, 0.5, 0.09);
    this.burst(0, 1400, 0.15, 0.03);
  }

  /** The rubber stamp landing on the done pad. */
  stamp(): void {
    this.thump(0, 95, 0.75, 0.16);
    this.burst(0, 700, 0.35, 0.06);
  }

  /** A card sliding off the edge of the light. */
  letGo(): void {
    this.sweep(0, 900, 300, 0.18, 0.5);
  }

  /** A quiet rising chime when tomorrow's three are set. */
  settle(): void {
    [523.25, 659.25, 783.99].forEach((f, i) => this.bell(i * 0.12, f, 0.12));
  }

  /** A soft low note when something is refused (slot taken, nothing to do). */
  dip(): void {
    this.bell(0, 196, 0.1);
  }

  private makeNoise(seconds: number): AudioBuffer {
    const ctx = this.ctx!;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b = 0;
    for (let i = 0; i < data.length; i += 1) {
      // Slightly pink noise reads more like paper than pure white noise.
      b = 0.97 * b + 0.03 * (Math.random() * 2 - 1);
      data[i] = (Math.random() * 2 - 1) * 0.6 + b * 4;
    }
    return buffer;
  }

  private startScrapeBed(): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    this.scrapeFilter = ctx.createBiquadFilter();
    this.scrapeFilter.type = 'bandpass';
    this.scrapeFilter.Q.value = 0.8;
    this.scrapeGain = ctx.createGain();
    this.scrapeGain.gain.value = 0;
    src.connect(this.scrapeFilter).connect(this.scrapeGain).connect(this.master!);
    src.start();
  }

  private startHum(): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.value = 120;
    this.humGain = ctx.createGain();
    this.humGain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    osc.connect(filter).connect(this.humGain).connect(this.master!);
    osc.start();
  }

  private tick(at: number, freq: number, gain: number): void {
    this.burst(at, freq, gain, 0.025, 6);
  }

  private burst(at: number, freq: number, gain: number, length: number, q = 1.2): void {
    const ctx = this.ctx;
    if (!ctx || !this.noise) return;
    const t = ctx.currentTime + at;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + length);
    src.connect(filter).connect(g).connect(this.master!);
    src.start(t, Math.random());
    src.stop(t + length + 0.02);
  }

  private thump(at: number, freq: number, gain: number, length: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const t = ctx.currentTime + at;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.8, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.03);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + length);
    osc.connect(g).connect(this.master!);
    osc.start(t);
    osc.stop(t + length + 0.02);
  }

  private sweep(at: number, from: number, to: number, gain: number, length: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.noise) return;
    const t = ctx.currentTime + at;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(from, t);
    filter.frequency.exponentialRampToValueAtTime(to, t + length);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + length);
    src.connect(filter).connect(g).connect(this.master!);
    src.start(t, Math.random());
    src.stop(t + length + 0.02);
  }

  private bell(at: number, freq: number, gain: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const t = ctx.currentTime + at;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    osc.connect(g).connect(this.master!);
    osc.start(t);
    osc.stop(t + 1);
  }
}
