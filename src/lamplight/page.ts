import type { SavedCard } from './store.js';

/**
 * The flat page around the canvas: the labelled "tomorrow" list so the user's three can be seen without the
 * headset, and the hidden text field that raises the system keyboard.
 */
export class PageOverlay {
  readonly input: HTMLInputElement;
  private readonly panel: HTMLDivElement;
  private readonly list: HTMLOListElement;
  private readonly tomorrow: HTMLElement;

  constructor(onStartOver: () => void) {
    const style = document.createElement('style');
    style.textContent = `
      body { background: #15130f; color: #fffaf0; font-family: "Atkinson Hyperlegible", system-ui, sans-serif; }
      .ll-panel { position: fixed; left: 16px; top: 16px; max-width: 280px; padding: 14px 18px;
        background: rgba(12,11,10,0.9); border: 2px solid #fffaf0; border-radius: 16px; font-size: 17px; line-height: 1.35; }
      .ll-panel h1 { font-size: 24px; margin: 0 0 4px; }
      .ll-panel p { margin: 0 0 14px; }
      .ll-panel h2 { font-size: 18px; text-transform: lowercase; letter-spacing: 0.06em; margin: 14px 0 6px; }
      .ll-panel ol { margin: 0; padding-left: 26px; }
      .ll-panel button { font: inherit; font-weight: 700; padding: 10px 22px; border-radius: 999px;
        border: 2px solid #fffaf0; background: #fffaf0; color: #15130f; cursor: pointer; }
      .ll-panel button.ll-quiet { background: transparent; color: #fffaf0; font-size: 15px; padding: 4px 12px; margin-top: 14px; }
      .ll-hidden { display: none !important; }
      .ll-input { position: fixed; left: 0; top: 0; width: 1px; height: 1px; opacity: 0.01; border: 0; padding: 0; }
    `;
    document.head.appendChild(style);

    this.panel = document.createElement('div');
    this.panel.className = 'll-panel';
    this.panel.innerHTML = `
      <h1>Lamplight</h1>
      <p>Put tomorrow on your desk. Pick three. Switch off.</p>
      <section data-tomorrow class="ll-hidden">
        <h2>tomorrow</h2>
        <ol data-list></ol>
      </section>
      <div><button type="button" class="ll-quiet" data-reset>Start over</button></div>
    `;
    document.body.appendChild(this.panel);
    this.tomorrow = this.panel.querySelector('[data-tomorrow]')!;
    this.list = this.panel.querySelector('[data-list]')!;
    this.panel.querySelector('[data-reset]')!.addEventListener('click', onStartOver);

    this.input = document.createElement('input');
    this.input.className = 'll-input';
    this.input.type = 'text';
    this.input.maxLength = 60;
    this.input.autocomplete = 'off';
    this.input.setAttribute('aria-label', 'Write a card');
    this.input.setAttribute('enterkeyhint', 'done');
    document.body.appendChild(this.input);
  }

  setImmersive(immersive: boolean): void {
    this.panel.classList.toggle('ll-hidden', immersive);
  }

  showTomorrow(cards: readonly SavedCard[]): void {
    this.list.replaceChildren(
      ...cards.map((card) => {
        const li = document.createElement('li');
        li.textContent = card.text;
        return li;
      }),
    );
    this.tomorrow.classList.toggle('ll-hidden', cards.length === 0);
  }
}
