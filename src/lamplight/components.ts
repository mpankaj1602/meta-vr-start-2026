import { createComponent, Types } from '@iwsdk/core';

/** Marks the desk lamp. Its local frame is the desk frame for every card. */
export const Lamp = createComponent('Lamp', {
  awake: { type: Types.Boolean, default: false },
});

export const CardZones = {
  Loose: 'loose',
  Slot: 'slot',
  Later: 'later',
  Done: 'done',
  Blank: 'blank',
} as const;

/** One paper card on the desk. Position lives on the entity's transform. */
export const Card = createComponent('Card', {
  cardId: { type: Types.String, default: '' },
  zone: { type: Types.Enum, enum: CardZones, default: CardZones.Loose },
  slotIndex: { type: Types.Int8, default: -1 },
  held: { type: Types.Boolean, default: false },
});
