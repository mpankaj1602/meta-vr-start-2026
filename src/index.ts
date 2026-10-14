import { World } from '@iwsdk/core';
import projectOptions from 'virtual:iwsdk-project';
import { RitualSystem } from './lamplight/ritual-system.js';

World.create(
  document.getElementById('scene-container') as HTMLDivElement,
  projectOptions,
).then((world) => {
  world.registerSystem(RitualSystem);
});
