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

export interface SavedState {
  version: 1;
  /** Completed sessions (switch-offs). 0 means the first run is not done. */
  sessions: number;
  mirrored: boolean;
  cards: SavedCard[];
}

const KEY = 'lamplight.state.v1';

export function emptyState(): SavedState {
  return { version: 1, sessions: 0, mirrored: false, cards: [] };
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
      cards: parsed.cards.filter(isSavedCard),
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
