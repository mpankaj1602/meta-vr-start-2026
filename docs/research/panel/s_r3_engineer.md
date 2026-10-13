`nm/` = `/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`.

## Build check of S1-R

| Part | Platform fact | Hidden scope | Emulator? |
|---|---|---|---|
| Wrist slide | Pose every frame (`nm/@iwsdk/xr-input/dist/visual/adapter/hand-visual-adapter.d.ts` L13). Meta: hands "by the thighs ... will not be detected" (https://developers.meta.com/horizon/design/hands-limitations-mitigations/) | Calibrated lane frame, re-centre, ~1.5 cm hysteresis, hold then pause on a null pose | Logic yes; noise, low hand no |
| Pinch-steps | Pinch is `select` (https://developers.meta.com/horizon/documentation/web/webxr-hands/) | Both hands in view | Yes |
| Darkening passthrough | Meta: "possible to interact with it using transparent pixels" (https://developers.meta.com/horizon/documentation/web/webxr-mixed-reality/). Three forces a transparent clear (`nm/three/src/renderers/webgl/WebGLBackground.js` L66-68), so the dimmer is a drawn black mesh with opacity | IWSDK hides `DomeGradient` in passthrough (`nm/@iwsdk/core/dist/environment/scene-ar-environment.js` L64-66): horizon and dome become custom meshes | Yes (`nm/iwer/lib/device/configs/headset/meta.js` L134-139); real look no |
| Beat, mix | `AudioUtils.play(entity, fadeIn?)` has no start time (`nm/@iwsdk/core/dist/audio/audio-utils.d.ts` L18) | Look-ahead scheduler on the audio clock (https://web.dev/articles/audio-scheduling) | Yes; speakers, latency no |
| Light mode, captions, prompts, replay, patterns | No platform risk | ~30 voice clips, audible menus, two inputs × three visual modes to test | Yes |

Hardest part: three lanes legible on built-in speakers and a tracked resting hand, both device-only. Effort 4-5 person-weeks (4 without head-lean, archive, keyboard build). 60 fps risk low: the dimmer is one full-view blend (inference).

Microgestures: I agree with keeping them out. A position state needs no recogniser, is documented, and runs in the emulator.

## Disputes

1. Designer (`s_r2_refined.md` L34): pinch-steps are the fallback. Counter: where a low hand is untracked, its pinch is too (hands-limitations page). The real fallback is a raised, supported forearm or head-lean.
2. Designer (L53): "fallback dusk dome". Counter: IWSDK's dome is suppressed in passthrough (source above); budget a custom mesh.
3. Designer (L37): lanes "room-fixed". Counter: an armrest hand moves with a swivel chair, the room does not (inference); add a re-centre.
4. Skeptic (`s_r1_redteam.md` L3): "thumb microgesture or palm tilt". Counter: microgestures are undocumented in the browser; tilt ends edge-on to the cameras (`r3_engineer.md` L24).

## Concessions

- S1 effort 4-5 → 4.5-5.5 person-weeks: recorded menus and prompts were uncounted (skeptic, section 7).
- My fix 1 (microgestures) and "pitch carries height": withdrawn.
- S1 rank 20th → 21st: FEER has S1's exact swipes (market).

## Final scores

```csv
ID,Track,Award,Win,Feasibility,Difficulty,Note
S1,Gaming,Best Accessibility Forward Experience,4,3,3,Fast unseen swipes plus height by ear; both device-only; a phone game has identical controls
S1-R,Gaming,Best Accessibility Forward Experience,5,4,3,Per-frame position input; every device unknown has a fallback; technically thin; loop exists on phones
```

## Placement

- S1 (4/3): bottom of the 4.0 band, about 21st; above G4, level with E3 on Win, below E3-R, N1, G5-R, A4-R.
- S1-R (5/4): beside N1 and E3-R, about 11th-13th; level with N1, above E3-R and below G5-R on Feasibility, below A4-R on Win.
- I would still build A4-R: higher Win, thinner track, less work.
- Checks: (1) wrist pose on thigh, armrest, tray, 100 lane changes each; (2) three lanes blind on built-in speakers; (3) black mesh at rising opacity in passthrough at 72 Hz, visible in recordings; (4) `outputLatency`, flash-to-knock sync; (5) pinches in the same positions.
