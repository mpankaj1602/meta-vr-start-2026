| ID | Best track | Core tech | Hardest problem | External dependencies | 60 fps risk | Hands-only + seated? | Effort (person-weeks) | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 | Gaming (award: Accessibility Forward) | Timed lane runner; swipe classifier on wrist velocity; pooled Web Audio HRTF sources; visuals fade out | Two device-only unknowns at once: recognising fast sideways swipes, and telling "jump" from "duck" by ear | None (synthesised or CC0 sound); headphones advisable | Low | Hands yes. Seated yes, but one hand stays raised in camera view | 4-5 | 4 | 3 | 3 |

# S1 Sonic Navigator: Lead Engineer, round 1

`nm/` = `/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`. "(inference)" marks my judgement.

## 1. Swipes

- **Arm swipes.** No built-in recogniser. Difference the wrist joint per frame (`jointSpaces`, `nm/@iwsdk/xr-input/dist/visual/adapter/hand-visual-adapter.d.ts` L13-14); fire on speed plus travel along one axis; lock out the return stroke for ~300 ms (inference). Meta: "Rapid or erratic hand movements can challenge the system's tracking accuracy"; movements "parallel to the view (such as chops)" track worse than punches (https://developers.meta.com/horizon/design/hands-limitations-mitigations/). Side swipes are that worst case. Fast Motion Mode is documented for Unity, Unreal and Native only (https://developers.meta.com/horizon/blog/hand-tracking-22-response-time-meta-quest-developers/). Latency: 45 ms tracking delay measured on Quest 2 (https://research.birmingham.ac.uk/en/publications/a-methodological-framework-to-assess-the-accuracy-of-virtual-real) plus 3-5 frames of evidence, so ~100-130 ms from motion start (inference).
- **Thumb microgestures are readable by app code.** IWSDK's hand layout names gamepad buttons `swipeleft` 5, `swiperight` 6, `swipeup` 7, `swipedown` 8, `confirm` 9 (`nm/@iwsdk/xr-input/dist/visual/adapter/hand-visual-adapter.js` L16-70); locomotion reads them via `world.input.xr.gamepads.right.getButtonDownByIdx(n)` (`nm/@iwsdk/core/dist/locomotion/locomotion-input-provider.js` L52-85). Meta's set matches: tap, left, right, forward, backward; "detection of the gesture happens at the end of the motion" (https://developers.meta.com/horizon/documentation/unity/unity-microgestures/). Four directions cover S1's four actions. Caveats: no Meta web doc says Quest Browser fills those buttons (none in https://developers.meta.com/horizon/llmstxt/documentation/web/llms-full.txt); IWSDK reads the right hand only; the hand must stay in camera view (https://developers.meta.com/horizon/design/design-microgestures/); ~200-350 ms from thumb start (inference).

## 2. Audio

- `PositionalAudio` sets `panningModel = 'HRTF'` (`nm/three/src/audio/PositionalAudio.js` L59). Chromium uses one composite set in 15° steps, elevation clamped to -45°..+90° (https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/blink/renderer/platform/audio/hrtf_database.cc L42-44), so a floor obstacle close ahead is clamped.
- Left/right is robust. With non-individual transfer functions, "front-back and up-down confusions ... increased significantly" (https://ntrs.nasa.gov/citations/19930067961). Head turning converts front/back into left/right (https://developers.meta.com/horizon/resources/audio-intro-localization/). So lanes are hearable; high versus low is not by position alone. Pitch can carry height (https://link.springer.com/article/10.3758/s13414-016-1273-6).
- Speakers: no measurement found for Quest's open speakers. Meta's guide rates HRTF rendering more accurate on headphones (https://developers.meta.com/horizon/resources/audio-intro-devices/). Left/right should survive (inference). Quest 3S has no 3.5 mm jack (https://www.uploadvr.com/quest-3s-images-leak-reveal-battery-size-no-headphone-jack/); Bluetooth lags (https://mixed-news.com/en/meta-quest-3s-bluetooth-audio-low-latency-update/).
- Latency: `outputLatency`/`baseLatency` unmeasured on device. Auditory reaction is ~140-160 ms (https://pmc.ncbi.nlm.nih.gov/articles/PMC4456887). Budget (inference): choice reaction 300-400 + gesture 100-350 + tracking 45 + audio out unknown, so each cue needs ≥1.2 s warning. Constant latency matters more than low: schedule on the audio clock.

## 3. Rendering nothing

Black frames are valid in `immersive-vr`; keep the frame loop running. Tracking depends on room light, not on what is drawn (hands-limitations page). No optic flow removes G4's vection (https://developers.meta.com/horizon/design/locomotion-comfort-usability/). Risks: black reads as a crash; a three-minute video of black; unseen hands drift out of view. Keep a dim world-locked horizon (`DomeGradient`, `/Users/pankaj/MyHackathons/meta-vr-start-2026/.claude/skills/iwsdk-dev/references/api-reference.md` L537) and hand outlines.

## 4. Generation and scoring

Three lanes × low/high/full blockers from a seeded stream; resolve hits by time, not geometry; always leave one safe action; shrink gaps toward the 1.2 s floor, one new cue type at a time; score dark distance with a streak multiplier. Under a week.

## 5. Testability

Emulator: loop, generation, scoring, mix on desktop headphones. Device only: swipe tuning, microgesture buttons (IWER's hand gamepad has only `pinch`, `nm/iwer/lib/device/XRHandInput.js` L33), audio latency, speaker legibility. Unknown until the Glasses ship: speakers, hand-camera coverage, microgesture exposure.

## Ranking

Above G4 (3/3): darkness removes vection and most art, and adds a hook. Below N1 (5/4) and E3-R (5/3): N1 needs only left/right hearing and slow aim. Level with E3 on Win, lower Feasibility. About 20th of 39. A phone game already dodges traffic by ear (https://www.pocketgamer.com/blind-drive/review/), weakening Boldest.

## Smallest fixes (for the designer)

1. Thumb microgestures instead of arm swipes, if check 1 passes.
2. Pitch or timbre for high/low; obstacles only in the frontal arc.
3. Dim horizon, hand outlines, brief "echo" reveal on near-misses.
4. Events on a beat; 1.2 s minimum warning.
5. Tracking-lost tone with auto-pause.

## Day-one device checks

1. Hand `gamepad.buttons.length`; do buttons 5-9 fire on both hands, hand in lap; 100 trials each.
2. `baseLatency`, `outputLatency`, tap-to-sound on speakers and wired.
3. Blind test on speakers: three lanes × two heights, 50 trials.
4. 100 arm swipes per direction: misses, null poses, return-stroke triggers.
5. Six HRTF sources at 72 Hz without glitches.
