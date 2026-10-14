/**
 * The lamp's proposals. Simple local rules only: the lamp suggests a card
 * when it has a true reason it can say in six words or fewer, and is
 * otherwise quiet. It is never described as artificial intelligence.
 */

import type { SavedCard } from './store.js';

export interface Proposal {
  cardId: string;
  reason: string;
}

const NUMBER_WORDS = ['', 'once', 'twice', 'three times', 'four times', 'five times'];

export function carriedReason(carries: number): string {
  const times = NUMBER_WORDS[carries] ?? `${carries} times`;
  return `Carried ${times}`;
}

/**
 * Pick what the lamp would keep for tomorrow. Only cards still on the desk
 * (loose or later) count, and only a card carried over at least once has a
 * reason. Ties go to the card carried longest, then the oldest.
 */
export function proposeKeep(cards: readonly SavedCard[]): Proposal | null {
  let best: SavedCard | null = null;
  for (const card of cards) {
    if (card.zone !== 'loose' && card.zone !== 'later') continue;
    if (card.carries < 1) continue;
    if (
      best === null ||
      card.carries > best.carries ||
      (card.carries === best.carries && card.bornSession < best.bornSession)
    ) {
      best = card;
    }
  }
  return best ? { cardId: best.id, reason: carriedReason(best.carries) } : null;
}

/** After two carries the lamp offers a smaller step instead. */
export function shouldOfferSmallerStep(card: SavedCard): boolean {
  return card.carries >= 2;
}

export const SMALLER_STEP_PROMPT = 'Smaller step, or let go?';

/** Starter cards for the first run: common end-of-day items, short. */
export const STARTER_CARDS = [
  'Reply to that email',
  'Book the appointment',
  'Tidy the desk',
  'Call back',
  'Pay the bill',
];

/** Count the words in a line of on-screen copy (requirement: six or fewer). */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}
