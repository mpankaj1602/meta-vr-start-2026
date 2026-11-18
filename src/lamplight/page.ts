import { LAMP_STYLES } from './store.js';
import type { LampStyle, SavedCard } from './store.js';

export interface PageSummary {
  tomorrow: readonly SavedCard[];
  later: number;
  done: number;
  letGo: number;
  firstRun: boolean;
}

export interface PageHandlers {
  /** Enter the headset session. Must run inside the click for user activation. */
  onGoToDesk: () => void;
  onStartOver: () => void;
  onStyle: (style: LampStyle) => void;
}

const STYLE_LABEL: Record<LampStyle, string> = { classic: 'Classic', modern: 'Modern', studio: 'Studio' };

/**
 * The flat page around the canvas: a centred card with the summary and the
 * "Go to desk" button that enters the headset session, a chip to bring it
 * back, and the hidden text field that raises the system keyboard.
 */
export class PageOverlay {
  readonly input: HTMLInputElement;
  private readonly panel: HTMLDivElement;
  private readonly chip: HTMLButtonElement;
  private readonly summary: HTMLElement;
  private readonly note: HTMLElement;
  private xrSupported = false;
  private immersive = false;
  private dismissed = false;
  private readonly styleButtons = new Map<LampStyle, HTMLButtonElement>();

  constructor(private readonly handlers: PageHandlers) {
    const style = document.createElement('style');
    style.textContent = `
      body { background: #15130f; color: #fffaf0; font-family: "Atkinson Hyperlegible", system-ui, sans-serif; }
      .ll-panel { position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
        width: min(420px, calc(100vw - 32px)); box-sizing: border-box; padding: 28px 28px 20px;
        background: rgba(12,11,10,0.94); border: 2px solid #fffaf0; border-radius: 22px;
        font-size: 18px; line-height: 1.4; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
      .ll-panel h1 { font-size: 34px; margin: 0 0 6px; letter-spacing: 0.01em; }
      .ll-tag { margin: 0 0 10px; font-size: 19px; font-weight: 700; }
      .ll-about { margin: 0 0 18px; font-size: 16px; opacity: 0.88; }
      .ll-steps { text-align: left; margin: 0 0 10px; padding-left: 26px; font-size: 17px; }
      .ll-steps li { margin: 4px 0; }
      .ll-small { font-size: 14px; opacity: 0.75; margin: 0 0 4px; text-align: center; }
      .ll-summary { text-align: left; margin: 0 auto 20px; max-width: 320px; }
      .ll-summary h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 8px; opacity: 0.85; }
      .ll-summary ol { margin: 0 0 12px; padding-left: 26px; font-size: 19px; }
      .ll-summary li { margin: 2px 0; }
      .ll-counts { display: flex; gap: 8px; flex-wrap: wrap; margin: 0; padding: 0; list-style: none; }
      .ll-counts li { border: 1.5px solid rgba(255,250,240,0.7); border-radius: 999px; padding: 3px 12px; font-size: 15px; }
      .ll-first { text-align: center; margin: 0 0 20px; opacity: 0.9; }
      .ll-panel button { font: inherit; cursor: pointer; }
      .ll-go { display: block; width: 100%; font-weight: 800 !important; font-size: 22px !important; padding: 14px 22px;
        border-radius: 999px; border: 2px solid #fffaf0; background: #fffaf0; color: #15130f; }
      .ll-go:focus-visible, .ll-quiet:focus-visible, .ll-chip:focus-visible { outline: 3px solid #ffc76b; outline-offset: 3px; }
      .ll-note { font-size: 15px; margin: 10px 0 0; opacity: 0.85; }
      .ll-quiet { background: transparent; color: #fffaf0; border: 0; text-decoration: underline;
        font-size: 15px !important; padding: 6px 10px; margin-top: 14px; opacity: 0.8; }
      .ll-chip { position: fixed; left: 16px; top: 16px; font: inherit; font-weight: 800; font-size: 17px;
        padding: 8px 16px; border-radius: 999px; border: 2px solid #fffaf0; background: rgba(12,11,10,0.9); color: #fffaf0; cursor: pointer; }
      .ll-style { border: 0; margin: 0 0 18px; padding: 0; display: flex; gap: 8px; justify-content: center; align-items: center; }
      .ll-style legend { float: left; margin-right: 4px; font-size: 15px; opacity: 0.85; }
      .ll-style button { font-size: 15px !important; font-weight: 700; padding: 6px 14px; border-radius: 999px;
        border: 2px solid rgba(255,250,240,0.7); background: transparent; color: #fffaf0; }
      .ll-style button[aria-pressed="true"] { background: #fffaf0; color: #15130f; border-color: #fffaf0; }
      .ll-hidden { display: none !important; }
      .ll-input { position: fixed; left: 0; top: 0; width: 1px; height: 1px; opacity: 0.01; border: 0; padding: 0; }
    `;
    document.head.appendChild(style);

    this.panel = document.createElement('div');
    this.panel.className = 'll-panel';
    this.panel.setAttribute('role', 'dialog');
    this.panel.setAttribute('aria-label', 'Duskdesk');
    this.panel.innerHTML = `
      <h1>Duskdesk</h1>
      <p class="ll-tag">An end-of-day planner for your real desk.</p>
      <p class="ll-about">Get what’s on your mind onto cards. Slide three under the lamp for tomorrow,
        file what’s done, toss what can go. Pull the chain and the day is put away.</p>
      <section class="ll-summary" data-summary></section>
      <fieldset class="ll-style" data-style><legend>Lamp</legend></fieldset>
      <button type="button" class="ll-go" data-go>Go to desk</button>
      <p class="ll-note" data-note></p>
      <button type="button" class="ll-quiet" data-reset>Start over</button>
    `;
    document.body.appendChild(this.panel);
    this.summary = this.panel.querySelector('[data-summary]')!;
    this.note = this.panel.querySelector('[data-note]')!;
    const styleSet = this.panel.querySelector('[data-style]')!;
    for (const style of LAMP_STYLES) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = STYLE_LABEL[style];
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        this.setStyle(style);
        this.handlers.onStyle(style);
      });
      styleSet.appendChild(button);
      this.styleButtons.set(style, button);
    }
    this.panel.querySelector('[data-go]')!.addEventListener('click', () => this.goToDesk());
    this.panel.querySelector('[data-reset]')!.addEventListener('click', () => {
      if (window.confirm('Clear every card, the folder, the bin and the lamp’s spot?')) this.handlers.onStartOver();
    });

    this.chip = document.createElement('button');
    this.chip.type = 'button';
    this.chip.className = 'll-chip ll-hidden';
    this.chip.textContent = 'Duskdesk';
    this.chip.setAttribute('aria-label', 'Show the Duskdesk panel');
    this.chip.addEventListener('click', () => {
      this.dismissed = false;
      this.refresh();
    });
    document.body.appendChild(this.chip);

    this.input = document.createElement('input');
    this.input.className = 'll-input';
    this.input.type = 'text';
    this.input.maxLength = 60;
    this.input.autocomplete = 'off';
    this.input.setAttribute('aria-label', 'Write a card');
    this.input.setAttribute('enterkeyhint', 'done');
    document.body.appendChild(this.input);

    this.setXRSupported(false);
  }

  private goToDesk(): void {
    if (this.xrSupported) {
      this.handlers.onGoToDesk();
    } else {
      // No headset: hide the card so the virtual desk is free for the mouse.
      this.dismissed = true;
      this.refresh();
    }
  }

  setStyle(style: LampStyle): void {
    for (const [s, button] of this.styleButtons) button.setAttribute('aria-pressed', String(s === style));
  }

  setXRSupported(supported: boolean): void {
    this.xrSupported = supported;
    this.note.textContent = supported
      ? 'Sit at a desk or table. The lamp goes right on it.'
      : 'Open this page in your Meta Quest browser to use your real desk. Here, try it with the mouse.';
  }

  setImmersive(immersive: boolean): void {
    this.immersive = immersive;
    // Leaving the headset brings the card back, ready to go to the desk again.
    if (!immersive) this.dismissed = false;
    this.refresh();
  }

  private refresh(): void {
    this.panel.classList.toggle('ll-hidden', this.immersive || this.dismissed);
    this.chip.classList.toggle('ll-hidden', this.immersive || !this.dismissed);
  }

  showSummary(s: PageSummary): void {
    this.summary.replaceChildren();
    if (s.firstRun && s.tomorrow.length === 0) {
      const h2 = document.createElement('h2');
      h2.textContent = 'How it works';
      const ol = document.createElement('ol');
      ol.className = 'll-steps';
      for (const step of [
        'Set the lamp on your desk and pull its chain.',
        'Write cards. Slide three under the light.',
        'Pull the chain again. Tomorrow is set.',
      ]) {
        const li = document.createElement('li');
        li.textContent = step;
        ol.appendChild(li);
      }
      const small = document.createElement('p');
      small.className = 'll-small';
      small.textContent = 'About three minutes. Your cards stay on this device.';
      this.summary.append(h2, ol, small);
      return;
    }
    const h2 = document.createElement('h2');
    h2.textContent = s.tomorrow.length > 0 ? 'Tomorrow' : 'Tomorrow is open';
    this.summary.appendChild(h2);
    if (s.tomorrow.length > 0) {
      const ol = document.createElement('ol');
      for (const card of s.tomorrow) {
        const li = document.createElement('li');
        li.textContent = card.text;
        ol.appendChild(li);
      }
      this.summary.appendChild(ol);
    }
    const counts = document.createElement('ul');
    counts.className = 'll-counts';
    counts.setAttribute('aria-label', 'Your cards');
    const add = (n: number, label: string) => {
      const li = document.createElement('li');
      li.textContent = `${n} ${label}`;
      counts.appendChild(li);
    };
    add(s.later, 'waiting later');
    add(s.done, 'done');
    add(s.letGo, 'let go');
    this.summary.appendChild(counts);
  }
}
