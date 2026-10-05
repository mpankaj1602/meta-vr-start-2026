# Meta VR Start 2026

WebXR starter for the Meta VR Start Developer Competition 2026, built with Three.js, TypeScript and Vite.

## Run

```bash
npm install
npm run dev
```

- **Desktop:** open `http://localhost:5173` and drag to orbit the scene. Install the
  [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik)
  Chrome extension to simulate a Quest headset and controllers.
- **Quest:** WebXR needs HTTPS off localhost, so run `npm run dev:quest` instead. With the headset on
  the same Wi-Fi, open the `Network` URL Vite prints in the Meta Quest Browser, accept the
  self-signed certificate warning, then press **Enter VR**.

## Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server on localhost    |
| `npm run dev:quest` | HTTPS dev server on the LAN, for a headset |
| `npm run build`   | Type-check and build into `dist/`    |
| `npm run preview` | Serve the production build locally   |

## Layout

- `src/main.ts` — renderer, XR session setup, render loop
- `src/scene.ts` — lights, floor, table and the grabbable objects
- `src/controllers.ts` — controller/hand models, ray pointing, grab on trigger or pinch
