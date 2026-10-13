# Meta VR Start 2026

Entry for the Meta VR Start Developer Competition 2026, built with Meta's
Immersive Web SDK (IWSDK) on Three.js, TypeScript and Vite.

## Run

```sh
npm install
npm run dev
```

`npm run dev` starts the dev server on `https://localhost:8081` and opens the
SDK's managed browser with the XR emulator. The emulator is set to the Meta VR
Glasses profile, so the view is masked to the glasses' narrower field of view.
Pick **Gaze + Hands** in the emulator toolbar to use the glasses input model.

To test on a Quest, open the network URL from `npm run dev:status` in the Meta
Quest Browser on the same Wi-Fi and accept the local certificate warning.

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Dev server plus managed browser and emulator |
| `npm run dev:runtime` | Dev server only                              |
| `npm run dev:down`    | Stop a background dev session                |
| `npm run typecheck`   | TypeScript check                             |
| `npm run build`       | Production build into `dist/`                |

## Configuration

`iwsdk.config.json` is the project authority, not `vite.config.ts`. It is set up
for the competition's hands-first, seated brief:

- hand tracking is required, gaze tracking is requested
- pinch grabs objects (`grabbing.useHandPinchForGrab`)
- locomotion is off
- the emulator device is `metaVRGlasses`

## Layout

- `src/index.ts` — creates the world and registers systems
- `src/assets.ts`, `src/components.ts` — asset and component manifests
- `public/scenes/` — scene composition (JSON)
- `public/ui/` — spatial UI panels

The robot, plant and welcome panel are SDK starter content and can be removed.
