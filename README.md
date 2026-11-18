# Duskdesk

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

## What it is

Duskdesk is an end-of-day ritual in passthrough: slide a desk
lamp onto your real desk, pull its chain, slide three cards under the light for
tomorrow and pull the chain to switch off. The concept is defined in
`docs/lamplight-concept.md`.

This is the hand-first version: silent, hands-only and offline. Voice is not
built yet.

The flat page opens on a centred card: tomorrow's three, how many cards are
waiting later, done and let go, a lamp style picker (Classic, Modern, Studio)
and **Go to desk**, which starts the passthrough session. In the headset an
**Exit** button sits beside the lamp.

On the desk, a card slid onto the folder is stamped and slips inside; a card
slid off the desk (or onto the bin) crumples and is thrown into the bin. Pinch
the folder or the bin and its recent cards rise into the air, readable. The
pull chain springs back and swings, and a ring at the base edge glows where
the lamp can be held to move it.

The lamp stays where you set it: place it once (say on the loft desk) and the
next session opens with it there, cards and all. If you start somewhere else,
pinch and hold on empty space for a moment to bring the lamp to you, then set
it down; that becomes its new spot. If the headset no longer recognises the
room, you place the lamp again.

## Configuration

`iwsdk.config.json` is the project authority, not `vite.config.ts`. It is set up
for the competition's hands-first, seated brief:

- the session is `ar` (passthrough); hand tracking is required, gaze tracking,
  hit testing and anchors are requested
- the SDK's grab system and locomotion are off: the app handles its own pinch
  and slide
- outside the headset the camera looks down at a virtual desk, so the ritual can
  be run with the mouse
- the emulator device is `metaVRGlasses`

## Layout

- `src/index.ts`: creates the world and registers the ritual system
- `src/assets.ts`, `src/components.ts`: asset and component manifests
- `src/scene-assets/desk-lamp.scene-asset.ts`: the procedural lamp and the
  shade outline for each style
- `src/lamplight/`: the ritual
  - `ritual-system.ts`: phases (placing, asleep, awake, off), picking, sliding,
    sorting, writing, the lamp's proposal and saving
  - `layout.ts`: the desk layout in the lamp's frame and drop classification
  - `pointers.ts`: pinch from WebXR select events (hands, controllers, gaze) and
    the mouse
  - `surface.ts`: one downward hit test to find the real desk, with a floating
    tray as fallback
  - `anchor.ts`: a WebXR persistent anchor that keeps the lamp at its spot in
    the room between sessions
  - `store.ts`, `rules.ts`: saved state (cards, done and let-go history, lamp
    style) and the lamp's local rules
  - `card-visual.ts`, `desk-dressing.ts`, `visuals.ts`: cards (including the
    crumple and paper ball), light, slots, the folder, bin, exit button and grab
    ring, lamp styles, captions, the "tomorrow" preview, room dimming and the
    ghost demonstration
  - `sound.ts`: synthesised paper scrape, knock, stamp and chain click
  - `page.ts`: the flat page (the centred card with Go to desk, the summary and
    the style picker) and the hidden text field that raises the system keyboard
- `public/scenes/main.iwsdk.scene.json`: places the lamp and sets lighting

"Start over" on the flat page clears saved state after a confirmation. The
live entry is at https://duskdesk.vercel.app (Vercel, deployed from this folder
with the Vercel CLI; see `docs/submission.md`).
