/**
 * Saved state: every card with its zone and its position in the lamp's frame.
 * Written to localStorage on every change; read once at start.
 */

export type SavedZone = 'loose' | 'slot' | 'later' | 'done';

export interface SavedCard {
  id: string;
  text: string;
  /** True when the user wrote it; false for a starter card. */
  own: boolean;
  zone: SavedZone;
  slotIndex: number;
  x: number;
  z: number;
  /** Sessions this card has been carried over without being retired. */
  carries: number;
  /** Session number in which the card was created. */
  bornSession: number;
}

/** What happened to a card that left the desk. */
export type HistoryOutcome = 'done' | 'letGo';

export interface HistoryEntry {
  id: string;
  text: string;
  own: boolean;
  outcome: HistoryOutcome;
  /** Session number in which it left the desk. */
  session: number;
  /** Epoch milliseconds. */
  at: number;
}

/** The lamp's look; every style lights and behaves the same. */
export type LampStyle = 'classic' | 'modern' | 'studio';
export const LAMP_STYLES: readonly LampStyle[] = ['classic', 'modern', 'studio'];

/** The folder and the bin keep this many of their most recent cards. */
export const HISTORY_LIMIT = 48;

export interface SavedState {
  version: 1;
  /** Completed sessions (switch-offs). 0 means the first run is not done. */
  sessions: number;
  mirrored: boolean;
  /** Persistent anchor id pinning the lamp to its spot in the room. */
  anchorId: string | null;
  /** True when the lamp was left on a floating tray rather than a surface. */
  floating: boolean;
  cards: SavedCard[];
  /** Cards filed in the done folder or thrown in the bin, oldest first. */
  history: HistoryEntry[];
  lampStyle: LampStyle;
}

const KEY = 'lamplight.state.v1';

export function emptyState(): SavedState {
  return { version: 1, sessions: 0, mirrored: false, anchorId: null, floating: false, cards: [], history: [], lampStyle: 'classic' };
}

export function loadState(): SavedState {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    if (parsed.version !== 1 || !Array.isArray(parsed.cards)) return emptyState();
    return {
      version: 1,
      sessions: Number(parsed.sessions) || 0,
      mirrored: Boolean(parsed.mirrored),
      anchorId: typeof parsed.anchorId === 'string' ? parsed.anchorId : null,
      floating: Boolean(parsed.floating),
      cards: parsed.cards.filter(isSavedCard),
      history: Array.isArray(parsed.history) ? parsed.history.filter(isHistoryEntry).slice(-HISTORY_LIMIT) : [],
      lampStyle: LAMP_STYLES.includes(parsed.lampStyle as LampStyle) ? (parsed.lampStyle as LampStyle) : 'classic',
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state: SavedState): void {
  try {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage can be full or blocked; the session still works in memory.
  }
}

export function clearState(): void {
  try {
    globalThis.localStorage?.removeItem(KEY);
  } catch {
    // Ignore.
  }
}

function isSavedCard(value: unknown): value is SavedCard {
  const c = value as SavedCard;
  return (
    typeof c === 'object' &&
    c !== null &&
    typeof c.id === 'string' &&
    typeof c.text === 'string' &&
    typeof c.x === 'number' &&
    typeof c.z === 'number'
  );
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  const h = value as HistoryEntry;
  return (
    typeof h === 'object' &&
    h !== null &&
    typeof h.id === 'string' &&
    typeof h.text === 'string' &&
    (h.outcome === 'done' || h.outcome === 'letGo')
  );
}

/** Record a card leaving the desk, keeping the most recent HISTORY_LIMIT. */
export function addHistory(state: SavedState, card: SavedCard, outcome: HistoryOutcome): void {
  state.history.push({
    id: card.id,
    text: card.text,
    own: card.own,
    outcome,
    session: state.sessions,
    at: Date.now(),
  });
  if (state.history.length > HISTORY_LIMIT) state.history.splice(0, state.history.length - HISTORY_LIMIT);
}

/** Most recent first. */
export function historyOf(state: SavedState, outcome: HistoryOutcome, limit: number): HistoryEntry[] {
  const out: HistoryEntry[] = [];
  for (let i = state.history.length - 1; i >= 0 && out.length < limit; i -= 1) {
    if (state.history[i]!.outcome === outcome) out.push(state.history[i]!);
  }
  return out;
}

let counter = 0;
export function newCardId(): string {
  counter += 1;
  return `c${Date.now().toString(36)}${counter.toString(36)}`;
}

/** The three cards waiting for tomorrow, in slot order. */
export function tomorrowCards(state: SavedState): SavedCard[] {
  return state.cards
    .filter((c) => c.zone === 'slot')
    .sort((a, b) => a.slotIndex - b.slotIndex);
}
