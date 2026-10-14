import { defineAssets } from '@iwsdk/core';
import deskLamp from './scene-assets/desk-lamp.scene-asset.js';

// Lamplight ships no downloaded media: the lamp is procedural, card faces are
// drawn at runtime and every sound is synthesised, so the first run is offline.
export default defineAssets({
  'desk-lamp': deskLamp,
});
