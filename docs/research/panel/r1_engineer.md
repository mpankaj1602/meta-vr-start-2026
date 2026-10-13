# Round 1: Lead Engineer report

Scope: what a solo developer can ship by 18 Nov 2026 in IWSDK 1.0.1 (WebXR on
Three.js r181, WebGL renderer), delivered as a URL in the Meta Quest Browser,
at 60 fps or better, hands-only, polished.

Method: read the installed SDK (`node_modules/@iwsdk/*`, `iwer`), the project
skill reference, Meta developer docs, immersive-web specs and community reports.
Every platform claim below carries a source. "Inference" marks my own
engineering judgement. Several Meta community-forum pages returned HTTP 403 to a
direct fetch; where I rely on a search-engine summary of such a page it is
marked "(secondary)".

Budget assumption: 6 calendar weeks, minus about 1 week for the demo video,
Devpost write-up, hosting and buying/setting up a headset, leaves about 5
person-weeks of build. Anything I estimate above 5 pw does not fit without cuts.
The entrant has no headset yet; hand-tracking feel, device frame rate, camera
and depth cannot be validated in the emulator, so every score assumes a Quest
3/3S is in hand by about 12 Oct.

## 1. Platform facts

Paths starting `nm/` are under
`/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`. "api-ref" is
`/Users/pankaj/MyHackathons/meta-vr-start-2026/.claude/skills/iwsdk-dev/references/api-reference.md`.

| Capability | Available in Quest Browser WebXR / IWSDK? | Source | Notes |
|---|---|---|---|
| Articulated hand joints | **Confirmed.** 25 joints per hand via `XRHand`; pinch surfaces as a gamepad button / select | https://developers.meta.com/horizon/documentation/web/webxr-hands/ ; `nm/@iwsdk/xr-input/dist/visual/adapter/hand-visual-adapter.d.ts` L13-41 (`jointSpaces`, `jointTransforms`, `getPinchStrength()`, `capturePose()`); `nm/@iwsdk/xr-input/dist/rig/xr-origin.d.ts` L57 (`indexTipSpaces`) | Palm-pinch is reserved by the system (menu). Custom poses/gestures must be classified by the app from joints. No haptics. |
| Hand-tracking robustness | **Limited.** Tracking degrades when one hand occludes the other, outside the camera field of view, in poor light | https://developers.meta.com/horizon/documentation/unity/unity-handtracking-troubleshooting-limitations/ | Meta's "Fast Motion Mode" is a native developer option (https://uploadvr.com/quest-hand-tracking-2-4-improves-fast-motion-mode); I found no WebXR switch for it (not available, inference). Throws, swings, full bow draws and paddle strokes are the worst cases. |
| Built-in hand interactions | **Confirmed.** Ray, near touch/poke, one-hand/two-hand/distance grab with pinch, microgesture teleport and turn | api-ref sections 12 and 16; `nm/@iwsdk/core/dist/locomotion/teleport.d.ts` L25; `nm/@iwsdk/xr-input/dist/pointer/multi-pointer.d.ts` | No built-in throw velocity; compute from hand history and apply with `PhysicsManipulation`. |
| Gaze | **Pointer only, and only on eye-tracked hardware.** IWSDK requests optional `gazeTracking`; when granted the runtime surfaces an `XRInputSource` with `targetRayMode === 'gaze'` and IWSDK drives a ray pointer from it; pinch commits | `nm/@iwsdk/core/dist/init/xr.d.ts` L53-61; `nm/@iwsdk/core/dist/gaze/gaze-system.d.ts`; https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/ | Quest 3/3S have no eye tracking, so the app falls back to head/hand rays. Whether hover fires from gaze on real Glasses is **unconfirmed**: the brief says no, Meta's 2D-web doc says "Web content in Browser does not receive gaze hover events" (https://developers.meta.com/horizon/llmstxt/documentation/web/llms-full.txt), while the SDK types describe hover events from the gaze ray. Cannot be tested until 2027. Design must not depend on gaze hover, dwell or gaze analytics. |
| Passthrough (immersive-ar) | **Confirmed.** | https://developers.meta.com/horizon/documentation/web/webxr-mixed-reality/ ; `SessionMode.ImmersiveAR` in `nm/@iwsdk/core/dist/init/xr.d.ts` | The system composites passthrough behind the page's framebuffer. The page cannot read, filter or restyle those pixels. Native passthrough styling (LUTs, edges) has no WebXR equivalent that I could find (not available, inference). |
| Passthrough camera frames to JavaScript | **Partly, with conflicting evidence.** WebXR Raw Camera Access (`camera-access`) is not supported. Headset RGB cameras are reported exposed as ordinary `getUserMedia` devices (default since Browser 40.1, Sept 2025; behind a flag from 38.2) | https://forum.babylonjs.com/t/webxr-camera-passthrough-support/58274 ; https://communityforums.atmeta.com/discussions/Questions_Discussions/request-webxr-raw-camera-access-camera-access-feature-in-quest-browser/1367463 (secondary); 2025 IWSDK winner used it: https://devpost.com/software/nanauts | **Conflict:** api-ref L1102 states "`CameraSource` does not expose Quest passthrough or raw headset-camera frames", and Meta's IWSDK camera guide (https://developers.meta.com/horizon/documentation/web/iwsdk-guide-camera-access/) says nothing Quest-specific. Treat as **unconfirmed until tested on the device on day 1**. No intrinsics or camera pose in the browser, so pixels cannot be registered to the 3D world or reprojected per eye. Permission must be granted before entering the session. Not emulated by IWER. Availability on VR Glasses unknown. |
| Camera resolution and latency | Native API: 1280x960, plus 1280x1280 from Horizon OS v83; capture latency documented at 20-40 ms (launch coverage said 30 fps and 40-60 ms) | https://developers.meta.com/vr/documentation/spatial-sdk/spatial-sdk-pca-overview/ ; https://www.uploadvr.com/quest-passthrough-camera-api-experimental-out-now/ (secondary) | Browser-path resolution, frame rate and added latency are **not documented**. Expect no better than native (inference). The camera image covers less than the user's view. |
| Depth sensing | **Confirmed.** `depth-sensing` with GPU texture array per eye; IWSDK `DepthSensingSystem` + `DepthOccludable` | `nm/@iwsdk/core/dist/init/xr.d.ts` L31-37, L46; `nm/@iwsdk/core/dist/depth/depth-textures.d.ts`; `/Users/pankaj/MyHackathons/meta-vr-start-2026/.claude/skills/iwsdk-depth-occlusion/SKILL.md` | Quest 3/3S only; range about 5 m (https://www.uploadvr.com/quest-browser-depth-api-webxr-hit-testing-instant-placement/). `getDepthInMeters` is CPU-path only per the Babylon thread above. Emulated by IWER. |
| Hit test | **Confirmed.** Since Browser 40.4 uses the Depth API, no room scan needed on Quest 3/3S | https://www.uploadvr.com/quest-browser-depth-api-webxr-hit-testing-instant-placement/ ; api-ref section 22 | Good for placing static objects only. |
| Plane and mesh detection | **Confirmed.** `plane-detection`, `mesh-detection` with semantic labels | https://developers.meta.com/horizon/documentation/web/webxr-mixed-reality/ ; `nm/@iwsdk/core/dist/init/xr.d.ts` L44-45; api-ref section 17 | Depends on the user having completed the system room scan. Judges may not have one, so never make it a hard requirement. Emulated by IWER (`nm/iwer/lib/device/XRDevice.d.ts` L31). |
| Anchors and persistence | **Confirmed.** Persistent anchors, maximum 8 per site; lost in private mode or when site data is cleared | https://developers.meta.com/horizon/documentation/web/webxr-mixed-reality/ ; `nm/@iwsdk/core/dist/scene-understanding/scene-understanding-system.d.ts` L192-236 | IWSDK manages one auto-persisted anchor (UUID in localStorage). Shared/colocated anchors exist only behind a browser flag (https://www.uploadvr.com/quest-web-browser-experimental-colocation-webxr/), so unusable for judging. |
| Body / leg tracking | **Experimental and inferred, not real.** `body-tracking` (83 joints, draft Community Group report) has been in Quest Browser since about v32 | https://immersive-web.github.io/body-tracking/ ; https://forum.babylonjs.com/t/webxr-body-tracking/63258 ; https://en.wikipedia.org/wiki/Meta_Quest_Browser (secondary) | Legs and feet are synthesised from head and hand motion, not tracked (https://uploadvr.com/quest-body-tracking-api-no-legs/). The spec itself requires devices to "emulate" unsupported joints. No IWSDK wrapper (no match for "body" in `nm/@iwsdk/xr-input/dist`). Not emulated by IWER. Useless for jump/sit/step or pedals, and those actions break the seated guideline anyway. |
| Microphone | **Confirmed (community).** `getUserMedia({audio})` works and carries into the immersive session if granted beforehand | https://forum.babylonjs.com/t/using-meta-quest-2-microphone-inside-of-webxr-game/38321 | Ask for permission before entering XR. |
| Speech recognition / synthesis | **Reported not available.** `SpeechRecognition` is reported not exposed in Quest Browser; `speechSynthesis` also reported absent | https://communityforums.atmeta.com/discussions/dev-quest/speechrecognition-in-webxr/1168273 (secondary; old thread, re-test on device) | Voice input means recording audio and sending it to a hosted speech-to-text service, or running Whisper-tiny in WASM (speed on XR2 Gen 2 unmeasured). Spoken output means pre-rendered audio or a hosted TTS. The 2025 IWSDK winner Nanauts used a hosted LLM for speech intent and procedural Web Audio "voices" for its characters (https://devpost.com/software/nanauts). |
| Text entry | **Confirmed.** System keyboard inside WebXR via `session.isSystemKeyboardSupported` (Browser 26.1+) | https://developers.meta.com/horizon/documentation/web/webxr-keyboard/ | Each show is a new edit session; no key events. Adequate for short task titles. |
| WebGPU | **Not usable for a judged build.** Experimental; WebXR-WebGPU requires the user to turn on "WebXR experimental features" in chrome://flags (Browser 146, Apr 2026). Later notes still say "experimental" (150.1, Aug 2026) | https://developers.meta.com/horizon/release-notes/web/ ; https://x.com/rcabanier/status/2047408843244912810 | IWSDK renders with `WebGLRenderer` (api-ref L261). Whether plain `navigator.gpu` (for compute/ML outside the XR layer) is on by default is **unconfirmed**. Plan for WebGL2 only. |
| On-device ML speed | **Unconfirmed in the browser.** No published ONNX Runtime Web / transformers.js numbers for Quest Browser were found | Native reference only: ZipDepth at 512x288 takes about 15 ms per depth map on Quest 3's GPU, with depth lagging the picture by about 50 ms (https://github.com/Gilleece/moonlight-android-xr) | Without WebGPU the browser falls back to WASM or WebGL backends; expect several times slower than native (inference). Any per-frame network competes with the renderer for the same mobile GPU. One-shot inference (a photo, a hand-pose classifier) is realistic; per-frame video or camera inference at display quality is not something to bet a six-week project on. |
| Frame rate and budgets | Default WebXR rate 72 or 90 Hz by device; `updateTargetFrameRate()` available. Meta's Quest 3 guidance: 72 Hz target (13.8 ms), under 200 draw calls, under 1.5M triangles | https://developers.meta.com/horizon/documentation/web/webxr-frames/ ; https://developers.meta.com/vr/resources/device-optimization-comparison/ ; api-ref L682 | Lock 72 Hz with fixed foveation. JS garbage collection and main-thread asset decoding cause hitches that judges will read as bugs. |
| Physics | **Confirmed.** Havok WASM (`@babylonjs/havok`), optional worker; sphere/box/cylinder/capsule/convex/trimesh | `nm/@iwsdk/core/package.json` dependencies; api-ref section 11 | No vehicle, cloth, fluid or joint helpers surfaced in the reference. Cross-device determinism not documented (assume none, inference). |
| Spatial audio | **Confirmed.** `AudioSource` with positional playback and pooling; Web Audio underneath | api-ref section 10 | Generic HRTF only. Output latency on Quest Browser is unmeasured; read `AudioContext.outputLatency` on device before committing to an instrument. |
| Video and stereoscopic video | **Confirmed.** h.264, h.265, VP8, VP9, AV1; WebXR media layers with stereo layouts; MV-HEVC enabled in Browser 150.1 | https://developers.meta.com/horizon/llmstxt/documentation/web/llms-full.txt ("Browser Video Support"); https://developers.meta.com/horizon/documentation/web/webxr-layers/ ; https://developers.meta.com/horizon/release-notes/web/ | IWSDK 1.0.1 exposes quad and cylinder layers with a render callback only (`nm/@iwsdk/core/dist/layers/`); media/equirect layers need hand-written `XRMediaBinding` code. DRM-protected or non-CORS video cannot be read into a texture (standard web platform rule), so frames from streaming services cannot be processed. |
| Multiplayer transport | **Expected, not separately documented by Meta.** WebSocket and WebRTC are standard in the Chromium engine the browser uses | https://developers.meta.com/horizon/documentation/web/browser-specs/ (Chromium engine); a community report of WebRTC voice failing on Quest: https://forum.needle.tools/t/voip-not-connecting-to-scene-when-joining-with-xr-headset/253 | Data transport is low risk (inference); voice chat is less certain. IWSDK ships no networking (no match for webrtc/websocket in `nm/@iwsdk/core/dist`). You build signalling, relay, state sync and reconnection yourself, and need two XR clients to test (emulator plus headset works). |
| Google Photorealistic 3D Tiles | **Technically loadable.** `3d-tiles-renderer` (NASA-AMMOS) supports Google tiles in Three.js and has a VR example; a Quest app already does this (EarthQuest) | https://github.com/NASA-AMMOS/3DTilesRendererJS ; https://mixed-news.com/en/earthquest-hands-on/ | Pricing: 1,000 free root-tile sessions a month, then $6 per 1,000 (https://developers.google.com/maps/billing-and-pricing/pricing). Policy: no offline use, pre-fetch or geometry extraction; must show aggregated attributions and the Google logo (https://developers.google.com/maps/documentation/tile/policies). The mandatory logo may collide with the contest's "no branded products" rule (unresolved). Streaming photogrammetry on a mobile GPU in a browser at a locked 60 fps is unproven (inference: high risk from draw calls, texture memory and decode hitches). |
| Hosted LLM / vision APIs | **Available**, through your own server-side proxy | Prices: Claude Haiku 4.5 $1 / $5 per million tokens in/out (https://platform.claude.com/docs/en/about-claude/pricing); Gemini 3.5 Flash-Lite $0.30 / $2.50 (https://ai.google.dev/gemini-api/docs/pricing) | A page cannot hide an API key, so a serverless proxy with rate limiting is mandatory and must stay up to about 11 Dec. Cost at judging scale is a few dollars. Round-trip is typically 1-5 s for a vision or multi-step turn (inference), which must be designed around. "Thin wrapper" is explicitly discouraged by the rules. |
| Emulator coverage | IWER emulates hand tracking, gaze, anchors, planes, meshes, hit test, depth | `nm/iwer/lib/device/XRDevice.d.ts` L31 | Not emulated: headset cameras, body tracking, real hand-tracking noise, device performance, audio latency. Per `/Users/pankaj/MyHackathons/meta-vr-start-2026/AGENTS.md`, pose and interaction claims need a real XR session. |
| VR Glasses hardware | **Not available until spring 2027.** | https://developers.meta.com/vr/discover/meta-vr-glasses/ | The submission can only be proven on Quest 3/3S plus the emulator's Glasses field-of-view mask. |

Facts that most constrain the idea list:

1. The page cannot touch passthrough pixels, and camera frames (if available at all) arrive as an unposed 2D video stream. This kills E1 as written and caps P5/P6.
2. No WebGPU for judges and no measured ML speed in the browser. This kills per-frame neural processing (E1, E2 video).
3. No speech API. Every voice feature (A2, A8, P5 narration) adds a paid service, a proxy and seconds of latency.
4. Feet and legs are not tracked, and fast or out-of-view hand motion loses tracking. This breaks P1's pedals and makes G1, G2, G3 unreliable at life scale.
5. The Glasses and their gaze input cannot be tested. Gaze must stay an optional targeting aid.

## 2. All 24 ideas, judged as written

Effort is person-weeks for a polished vertical slice. Win is 1-10, Feasibility
and Difficulty 1-5 as defined in the brief.

| ID | Best track | Core tech | Hardest problem | External dependencies | 60 fps risk | Hands-only + seated as written? | Effort (person-weeks) | Win 1-10 | Feasibility 1-5 | Difficulty 1-5 |
|---|---|---|---|---|---|---|---|---|---|---|
| G1 | Gaming | Havok ball + 10 pins, grab and release with hand-velocity estimate, scoring, lane art, audio | A real bowling swing is fast and leaves the tracking cameras' view at the moment of release; no weight or haptics; an underarm swing does not work from a chair | None (procedural assets, CC0 audio) | Low | Hands yes. Seated no at life scale (large swing) | 3-4 | 3 | 3 | 2 |
| G2 | Gaming | Bow held by one hand, string pinch and draw with the other, release detection, ballistic arrows, targets | Full draw puts the string hand beside the face and behind the bow hand: occlusion and out-of-view tracking loss; raised extended arms tire quickly; jitter ruins aim | None | Low | Hands yes. Seated physically yes, but fails the two-foot-radius test at full draw | 3-4 | 3 | 3 | 3 |
| G3 | Gaming | Spline river and banks, water shader, raft buoyancy in a flow field, two-hand paddle input, obstacles | Paddle strokes are large, fast and to the side or below the cameras' view; continuous rocking forward motion is a motion-sickness risk; long environment is a lot of content | Environment art, water audio | Medium (water, transparency, long draw distance) | Hands yes. Seated in theme, but large physical movement | 6-8 | 2 | 2 | 4 |
| G4 | Gaming | Lane runner, pooled/instanced procedural track, swipe classifier from palm velocity, collisions, speed ramp | Reliable low-latency swipe detection (return strokes, false positives, fast-motion dropouts) as speed rises; comfort of constant forward motion; arm fatigue over 10 minutes | None (genre only; avoid the named game's look) | Low-Medium | Yes if "hand movement" means hand swipes. If it means the body jumping/sitting/stepping: not seated, and legs are not tracked | 4-5 | 4 | 4 | 3 |
| G5 | Gaming | Maze generator, instanced walls, player movement, limited "rise above" overview, pinch-placed removable arrow markers | Moving through a first-person maze with hands only: teleport is tedious, smooth motion is nauseating when seated, and the overview lift is itself a comfort event. A tabletop view gives the solution away unless fogged | None | Low | Achievable (IWSDK has hand microgesture teleport/turn), but the idea does not say how you move | 3-4 | 4 | 4 | 2 |
| E1 | Entertainment | Camera frames to a stylising shader or neural style transfer, re-displayed over the world | The page cannot restyle passthrough. The only pixel source is an unposed, lower-resolution, delayed `getUserMedia` stream that cannot be reprojected per eye, so a full-view restyle is flat, misaligned and laggy. Per-frame neural style transfer has no confirmed budget in this browser. "Ghibli" is a third-party studio name | Camera permission (unconfirmed access), style model weights | High | Yes | 6-8, outcome uncertain | 2 | 1 | 5 |
| E2 | Entertainment | Monocular depth estimation, depth-based stereo synthesis or displaced mesh, playback on a layer or quad | Per-frame depth for video in the browser without WebGPU is unproven (native needs about 15 ms on the GPU). Third-party movies and reels are copyrighted, and DRM or non-CORS video cannot be read. Horizon OS already converts photos and Instagram video to 3D | Depth model (Depth Anything V2 Small is Apache-2.0; larger sizes are non-commercial), licensed sample media, possibly a GPU server | High for video, Low for still images | Yes | 5-7 | 2 | 2 | 4 |
| E3 | Entertainment | Web Audio spatial sources on authored motion paths, head-tracked listener, optional hand steering, sparse visuals | Not engineering: making audio-only "movement" compelling and legible is all sound design. Generic HRTF, no haptics. An eyes-closed product is hard to show in a 3-minute video and scores little on art direction | Audio content (own, procedural or CC0); headphones advised | Low | Yes, ideal | 3-4 | 4 | 4 | 2 |
| P1 | Productivity (weak fit; closer to a simulation game) | Custom raycast vehicle on Havok bodies, hand-tracked steering wheel, hand substitutes for pedals/gears/signals, roads, traffic AI, lesson scripting, LLM that emits a car parameter set | Feet are not tracked, so accelerator, brake and clutch move to the hands and the skill no longer transfers: "learn to drive" is not deliverable. Mid-air wheel with no force feedback. Road, signage and traffic content is far beyond six weeks | LLM API plus proxy, jurisdiction-specific driving rules, logo-free car and road assets | Medium | Hands yes (with compromised realism). Seated yes | 8-10+ | 2 | 1 | 5 |
| P2 | Productivity | Plant knowledge base, growth-over-time visualisation (procedural plants or image sequences), UIKitML panels, optional LLM Q&A | Content correctness and breadth, and justifying a headset: as written it is a reference app in 3D. Good-looking multi-species growth models are art-heavy | Plant care data (licence to verify), pre-generated images, optional LLM API | Low | Yes | 4-5 | 2 | 4 | 2 |
| P3 | Entertainment | Orrery / n-body view, gravity visualiser, "fall speed toward nearby bodies" from ephemerides, black hole with lensing shader and stretch effect, narration | Four features in one idea. A lensing shader at per-eye resolution on a mobile GPU needs a cheap analytic approximation. Scientific accuracy has to be right | Public-domain space imagery, baked ephemeris data, star map | Medium (full-screen shader) | Yes, good fit | 5-6 as written; 3-4 for one mechanic | 4 | 3 | 3 |
| P4 | Entertainment (not Productivity) | `3d-tiles-renderer` with Google Photorealistic 3D Tiles, place list/search, hand navigation, attribution UI | Holding 60 fps while streaming photogrammetry in a mobile browser; network-bound cold start; Google terms (no caching, mandatory logo and attributions); "wrapper around a third-party service" is discouraged; Wander and EarthQuest already exist | Google Cloud billing and API key (cost negligible at this scale), network | High | Yes if tabletop or teleport | 4-5 | 2 | 2 | 4 |
| P5 | Productivity | Passthrough session, fingertip + pinch trigger, camera frame capture, hosted vision model, answer card at the fingertip, optional narration | Depends on browser camera access that the SDK reference says is not exposed (must be proven on device). No real "touch" sensing and no camera pose, so the model must infer the target from the hand in the image. 2-5 s per answer, hallucinations in unknown rooms, and it sits close to a wrapper. Little to touch in a two-foot radius | Vision LLM API plus proxy (kept up to 11 Dec), optional TTS service | Low | Yes | 4-5 | 4 | 3 | 3 |
| P6 | Productivity | Camera + vision model to recognise machines, anchored instructions, distraction scenes | Not seated, not stationary, cannot be judged outside a gym, and wearing a headset while lifting is a safety problem. Labels cannot be registered to machines without camera pose. Hands are busy, so pinch input conflicts with the task | Vision LLM API, exercise content, a gym | Low-Medium | Hands nominally. Seated no | 6-8 | 1 | 1 | 4 |
| P7 | Productivity | Cognitive mini-games (n-back, Stroop, spatial memory) with hand input, local progress and streaks | The premise. Thinking harder does not burn meaningful calories, and brain-training claims have drawn regulatory action; the rules ban deceptive content. Engineering is trivial | None | Low | Yes | 3 | 2 | 4 | 2 |
| A1 | Entertainment | Generative music engine on Web Audio, fingertip pluck and palm-velocity conducting, audio-reactive instanced visuals, spatial audio | Making generative music sound good and feel responsive; unmeasured audio latency in Quest Browser; beat detection from hand motion that works across people. Maestro, Inkphony and (m)ORPH are prior art | None if synthesised; optional CC0 samples | Low-Medium (particles, shaders) | Yes (pluck in the near field; sustained conducting raises arms) | 4-5 | 6 | 4 | 3 |
| A2 | Gaming | LLM narrative engine with structured state, modular diorama set, Havok dice thrown by hand, pinch choices, voice in, narration out | The voice chain: no speech API, so microphone to hosted speech-to-text to LLM to hosted TTS, several seconds per turn and three services to keep alive. Making the diorama change with the story rather than decorate a chatbot. wilds.ai is a direct WebXR competitor | LLM API, STT and TTS APIs, proxy server, CC0 model kit | Low | Yes | 6-7 | 5 | 3 | 4 |
| A3 | Gaming | Havok discs on a board, pinch-pull-release aiming, rules and scoring, AI opponent, room link, host-authoritative turn sync over WebSocket/WebRTC | Multiplayer: no SDK networking, two XR clients to test, and judges rarely have a partner, so a strong solo opponent is also required. RealCarrom, Table Party and Tiny Golf cover the mechanic | Signalling/relay host (free tiers exist), optional TURN | Low | Yes, exemplary | 5-6 with multiplayer; 3 solo-only | 5 | 3 | 4 |
| A4 | Productivity | Passthrough, desk placement by hit test or manual drag, one persistent anchor, grabbable task tokens and slots, local persistence, reactive companion object, streak logic | Design rather than code: being more than a to-do list with 3D checkboxes, and proving a daily habit to a judge who plays once (needs a time-skip demo). Text entry is short-form only | None | Low | Yes | 3-4 | 6 | 4 | 2 |
| A5 | Gaming (Accessibility award angle) | Static hand-pose classifier on 25 joints, ghost reference hand, lesson/game loop | Tracking accuracy on self-occluding handshapes (fist letters, crossed fingers) and motion letters; responsible, correct sign content; three ASL tutors already on the store | Reference poses (self-recorded with `capturePose`), expert review for sign content | Low | Yes, the purest hands-first idea | 3-4 | 5 | 4 | 3 |
| A6 | Entertainment | Book with page-turn constraint, pop-up rigs driven by page angle, pull tabs (constrained grab), poke reactions, narration, 5-8 spreads | Content production: illustrated paper-craft for every spread, animation rigs, story and voice-over, all by one person. Page-turn feel with hand tracking | Original art, narration, music | Low-Medium (alpha cut-outs, overdraw) | Yes, exemplary; sits in the lower field of view | 5-6 | 6 | 3 | 3 |
| A7 | Gaming | Grabbable evidence with two-hand inspect, clue board with pins and strings, deduction check, case data format, 1-3 cases | Content: a good case is writing plus bespoke props; "daily cases" implies a generation and validation pipeline. Deduction-check UX | CC0 prop kits, writing; optional LLM | Low | Yes, desk scale | 5-7 (one case 4-5) | 6 | 3 | 4 |
| A8 | Productivity | Card board on a curved surface, pinch-drag sorting, voice or keyboard capture, small sync backend, share link / QR to phone | Voice capture needs a hosted speech-to-text service; dense text is marginal on Quest 3 optics; share links need a backend with abuse controls; must beat doing the same on a phone | STT API, key-value backend and hosting | Low-Medium (many text meshes) | Yes | 4-5 | 5 | 4 | 3 |
| A9 | Entertainment | 3D panel layout with parallax layers, pinch/gaze progression, audio, one original short comic | Original layered artwork; otherwise simple. Uses hands minimally, which weakens the hands-first score | Original art, music/SFX | Low | Yes | 4-5 | 4 | 3 | 2 |

### Emulator and device coverage, and award targets

| ID | Emulator is enough for | Needs a real Quest 3/3S for | Blocked by missing Glasses hardware? | Plausible special award |
|---|---|---|---|---|
| G1 | Physics, scoring, UI | Release timing and throw feel | No | None |
| G2 | Ballistics, targets | Draw-pose tracking, fatigue | No | None |
| G3 | River logic, shader look | Paddle tracking, comfort, frame rate | No | None |
| G4 | Game loop, generation | Swipe classifier tuning, comfort | No | Best First Five Minutes |
| G5 | Almost everything | Microgesture locomotion, comfort | No | Best First Five Minutes |
| E1 | Nothing that matters | Camera access, latency, comfort | Camera access on Glasses unknown | Boldest Original Concept (only if it worked) |
| E2 | Pipeline on desktop GPU | Inference speed, thermal, stereo comfort | No | None |
| E3 | Everything (with headphones) | Final mix on device speakers | No | Accessibility Forward |
| P1 | Vehicle model, lessons | Wheel feel, comfort, frame rate | No | Best Agentic Interaction (weak) |
| P2 | Everything | Text legibility | No | None |
| P3 | Everything except performance | Shader cost | No | None |
| P4 | Functionality on desktop | Frame rate, memory, load hitches | No | None |
| P5 | UI and proxy (desktop webcam as stand-in) | Camera access, fingertip-in-image, latency | Camera access on Glasses unknown | Best Agentic Interaction |
| P6 | Little | A gym | Yes, in practice | None |
| P7 | Everything | Little | No | Best Reason to Come Back (without the calorie claim) |
| A1 | Synthesis, visuals, logic | Audio latency, gesture tuning | No | Best First Five Minutes |
| A2 | Narrative engine, dice | Microphone path, latency in headset | No | Best Agentic Interaction |
| A3 | Solo play, physics | Aim feel; second client for multiplayer | No | Best Social & Multiplayer |
| A4 | Tokens, persistence, anchors (emulated) | Passthrough look, desk placement | No | Best Reason to Come Back |
| A5 | Game loop | All classifier tuning | No | Accessibility Forward |
| A6 | Rigs, page logic | Page-turn feel | No | Best First Five Minutes |
| A7 | Almost everything | Two-hand inspect feel | No | Best Reason to Come Back |
| A8 | Board, backend | Microphone/STT, legibility | No | None |
| A9 | Everything | Legibility | No | None |

## 3. Score justification

**G1 Bowling (Win 3, F 3, D 2).** Physics is the easy part: 11 rigid bodies in
Havok. The throw is the product and it is exactly what hand tracking does worst.
Feasibility 3 rather than 4 because, as written, a judge will try a bowling
swing from a chair. Win 3: a 2025 winner already took "pinch to play a ball
sport" (Tiny Golf), and bowling is a stock genre.

**G2 Archery (Win 3, F 3, D 3).** Same pattern. The anchor pose of a real draw
is outside reliable tracking and fails the airplane-seat test. Codable in three
weeks, hard to make feel good without controllers.

**G3 Rafting (Win 2, F 2, D 4).** Largest gesture set of the games, most
content, highest comfort risk, and nothing in IWSDK helps with water. Over
budget at 6-8 pw.

**G4 Runner (Win 4, F 4, D 3).** Buildable. All risk sits in the gesture
classifier and comfort, both tunable only on device. Scores low on "uniquely
leveraging device capabilities" because it is a phone genre with bigger swipes.
If the user means real body movement, Feasibility drops to 1 (not seated; no
leg tracking).

**G5 Maze (Win 4, F 4, D 2).** Cheapest game here and fully testable in the
emulator. The markers and limited overview are a real mechanic. Held back by the
unstated locomotion: first-person hands-only movement through corridors is the
uncomfortable version.

**E1 Anime converter (Win 2, F 1, D 5).** Blocked by the platform, not by
effort. A web page gets no passthrough pixels to restyle. A camera feed pasted
over the view is mono, unposed, lower resolution than the display and late, and
that is a comfort failure and a "bug-free, 60 fps" failure. Neural style
transfer per frame cannot be planned without WebGPU. Feasibility 1 is for the
idea as written; a reduced version is in section 4.

**E2 3D converter (Win 2, F 2, D 4).** Three independent blockers: browser
inference speed for video is unproven; the content people want to convert cannot
legally or technically be read by the page; and the operating system already
offers photo and Instagram-video conversion
(https://www.uploadvr.com/quests-latest-ptc-update-turns-web-photos-into-3d/ ,
https://www.uploadvr.com/quest-instagram-app-now-ai-converts-videos-to-3d-too/).
Stills only would be Feasibility 4, but then it duplicates a system feature.

**E3 Movement through sound (Win 4, F 4, D 2).** Technically the safest idea:
no frame-rate risk and fully testable on a desktop. The work is sound design,
and the idea as written does not yet say what the user does. Accessibility
Forward is a credible target.

**P1 Driving (Win 2, F 1, D 5).** No pedals is fatal to "learn to drive", and
the content scope is several times the budget. The AI car generator is the easy
10%: an LLM returning dimensions, mass and gearing as JSON for a parametric car.

**P2 Gardening (Win 2, F 4, D 2).** Easy to ship, hard to justify in a headset.
Mostly panels and data, so it scores poorly on spatial depth and hands-first.

**P3 Universe (Win 4, F 3, D 3).** Suits seated, lean-back viewing and needs no
services. Feasibility 3 because the idea lists four experiences; one of them
done properly fits, all four do not. Lensing must be an analytic approximation
on a cubemap lookup, not ray marching (inference).

**P4 Vacation visualiser (Win 2, F 2, D 4).** Loads, but I do not believe it
holds a locked 60 fps while streaming on Quest in a browser, and its cold start
depends on the judge's network. It is the clearest "wrapper" on the list, has
store incumbents, and carries a logo/attribution obligation that may conflict
with the content rules.

**P5 Curious Cat (Win 4, F 3, D 3).** The whole idea rests on one unverified
capability. If `getUserMedia` returns headset camera frames, a working slice is
about two weeks plus polish. If not, there is no product. Even working, answers
take seconds, vary by room, and the judges saw a "Passthrough Camera + AI"
category last year. The seated two-foot radius limits what there is to ask
about.

**P6 Gym (Win 1, F 1, D 4).** Fails the seated guideline, cannot be evaluated
by a judge at a desk, and needs world-registered recognition the browser cannot
provide. Likely fails stage one.

**P7 Brain exercise (Win 2, F 4, D 2).** Trivial to build. The calorie claim is
unsupported (https://www.scientificamerican.com/article/thinking-hard-calories)
and brain-training marketing has been sanctioned
(https://ftc.gov/news-events/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges).
Without the claim it becomes a generic mini-game collection.

**A1 Playable music visualiser (Win 6, F 4, D 3).** Named in the Entertainment
track text, needs no services, no room scan and no content pipeline beyond the
music system. Fingertip plucking uses joints the SDK already exposes. Risks are
audio latency (measure in week 1) and musical quality. Not novel as a category.

**A2 AI game master (Win 5, F 3, D 4).** The entrant's likely strength, and the
most natural fit for Best Agentic Interaction. The engineering cost is the
service chain and its latency, not the 3D. Voice as the primary input is the
part most likely to fail in front of a judge. Over budget at 6-7 pw unless voice
is cut to optional.

**A3 Tabletop duel (Win 5, F 3, D 4).** Solo play against an AI opponent is a
three-week job on built-in physics and pinch. Networking doubles it and cannot
be demonstrated by a single judge. "Invite by link" is a real advantage of a web
entry, which is why I keep Win at 5 despite crowded prior art.

**A4 Daily ritual object (Win 6, F 4, D 2).** Lowest technical risk of the
strong ideas: every piece (grab, persistence, anchor, passthrough) is a
documented SDK feature that the emulator covers. Matches the Productivity track
wording almost literally and that track has the thinnest field. The risk is
that it reads as slight; it needs one memorable physical interaction.

**A5 Hand-shape game (Win 5, F 4, D 3).** Uses the one sensor the platform is
best at. The classifier is simple; the danger is the long tail of handshapes
the tracker confuses, which shows up as "the game says I'm wrong when I'm
right". A puzzle that uses only well-tracked shapes is safer than a full
fingerspelling alphabet.

**A6 Pop-up storybook (Win 6, F 3, D 3).** Interaction code is modest and maps
to constrained grabs. Feasibility 3 because it is art-bound: 5-8 illustrated,
rigged spreads plus narration is more than half the budget for a solo engineer.
Three spreads would be Feasibility 4.

**A7 Hands-on mystery (Win 6, F 3, D 4).** The verbs (pick up, turn over, pin,
connect) are exactly IWSDK's built-ins, so engineering risk is low. One polished
case fits. "Daily cases" as written does not; it turns the project into a
content generator with validation.

**A8 Spatial planning board (Win 5, F 4, D 3).** Straightforward CRUD with a
small backend. Voice capture is the one dependency that can break. Scores low on
innovation; its chance comes from a thin Productivity field.

**A9 Interactive comic (Win 4, F 3, D 2).** Simple engine, entirely dependent
on original art, and the least hands-first of the assistant's ideas.

## 4. Infeasible or non-compliant as written, and the smallest fix

| ID | Why it fails as written | Smallest change that makes it buildable |
|---|---|---|
| E1 | No access to passthrough pixels; camera feed is unposed and late; no per-frame neural budget; studio name | Stylise what the page can draw: ink outlines from depth-map discontinuities and a cel-shaded repaint of the scanned room mesh over passthrough, with an animated painted sky on ceiling/window planes. Or a hand-held "lens" quad that shows a toon-shaded camera feed, small enough that mono and lag are tolerable. Drop the studio name |
| E2 | Video depth in-browser unproven; third-party media unreadable; duplicates an OS feature | Stills only, from the user's own or CC0 images, depth computed once on device, presented as a hand-manipulated depth diorama (tilt, relight, layer peel) so the hands add something the OS feature lacks |
| P1 | No foot tracking; scope | Drop "learn to drive". A tabletop junction diorama for hazard perception and right-of-way decisions (gaze/point and pinch), or a lap-sized RC car. Keep the AI car parameters as a garnish |
| P6 | Not seated; untestable by judges; no world-registered recognition | Keep only "take the boredom out of stationary exercise" as a seated or stationary-bike scenic ride in Entertainment, or drop |
| P4 | Frame rate, wrapper, terms | Bounded tabletop city diorama (one fixed tile region at capped detail, pinch to pan/zoom) with authored postcards on top. Still network- and API-dependent |
| P5 | Rests on unverified camera access; no touch sensing | Verify camera on day 1. Use "point and pinch": send one frame showing the hand, let the model resolve the target, float the card at the fingertip (no world registration needed), cache results |
| P7 | Unsupported health claim | Remove calorie and "sharper brain" claims; present as a daily hand-and-memory warm-up |
| G1 | Life-scale swing from a chair | Tabletop lane; roll by pinch-pull-release or a short wrist flick inside the tracking volume |
| G2 | Full draw leaves tracking volume | Short-draw pinch slingshot or finger bow held in the lap zone, with head/gaze-assisted aim |
| G3 | Paddling out of view; comfort | On-rails river steered by a two-hand tiller pose, or a tabletop raft pushed by hand "currents" |
| G4 | Ambiguous: body movement would break seated and needs leg tracking | State that swipes of one hand drive a third-person runner on a lap-sized track |
| G5 | Locomotion unspecified | Lap-sized maze under fog of war with a figurine led by pinch; "jump" lifts the fog briefly; markers placed by pinch |
| A2 | Voice-first chain is slow and fragile | Pinch choices and dice as the primary loop; voice optional; narration as text plus pre-rendered or procedural audio |
| A3 | Real-time multiplayer cannot be judged solo and doubles the work | Ship the AI opponent first. For multiplayer use asynchronous turns by link (each shot is a few numbers replayed on the other side), so no simultaneous session or netcode is needed |
| A7 | "Daily cases" is a content pipeline | One or two authored cases in a data-driven format; describe daily cases as the roadmap |
| A8 | Voice capture needs a paid service | System keyboard first; cloud speech-to-text as an optional extra |

## 5. Rankings from the engineering seat

### Five most buildable and impressive

1. **A4 Daily ritual object.** 3-4 pw, no services, every feature is a documented SDK capability with emulator coverage, and it fits the least-contested track's wording.
2. **A1 Playable music visualiser.** 4-5 pw, no services or room scan, uses finger joints directly, and is named in the Entertainment track. Measure audio latency first.
3. **A5 Hand-shape learning game.** 3-4 pw, built on the platform's best sensor, zero content pipeline if scoped to a puzzle with well-tracked shapes.
4. **A7 Hands-on mystery (one case).** 4-5 pw, the interaction verbs are IWSDK built-ins, so time goes to content rather than fighting the platform.
5. **A3 Tabletop duel (solo first, async link play second).** 3 pw for solo on built-in physics, with link-invite as the web-only differentiator if time remains.

Near misses: G5 (cheapest game, needs a locomotion decision), A6 (best fit for
"narrative" but art-bound), A8 (ships easily, impresses little).

### Five worst effort-to-payoff

1. **P6 Gym spotter.** Not seated, not judgeable, not registrable to the world. Likely fails stage one.
2. **P1 Car driving.** 8-10+ pw and the core promise is impossible without pedals.
3. **E1 Anime converter.** Blocked by the platform; weeks of work to reach an uncomfortable result.
4. **E2 3D converter.** Unproven performance, unusable source content, and it duplicates an OS feature.
5. **P4 Vacation visualiser.** A third-party data wrapper with incumbents, a frame-rate problem and licence strings.

Sixth: G3 Rafting (over budget, worst gesture and comfort profile of the games).

## 6. Checks to run on day 1 with a headset

These decide several scores above and take under a day in total.

1. `navigator.mediaDevices.enumerateDevices()` and `getUserMedia` in Quest Browser: are the headset RGB cameras listed, at what resolution and frame rate, and do they keep streaming inside an immersive session? (Decides P5, the reduced E1.)
2. `'gpu' in navigator` with default flags. (Decides whether any on-device ML is worth considering.)
3. `'SpeechRecognition' in window`, `'webkitSpeechRecognition' in window`, `speechSynthesis.getVoices()`. (Decides A2, A8 voice design.)
4. `new AudioContext({latencyHint:'interactive'}).outputLatency` and a tap-to-sound test. (Decides A1's pluck mechanic.)
5. `session.supportedFrameRates` and a 200-draw-call test scene at 72 Hz. (Sets the art budget for everything.)
6. Hand-tracking volume from a chair: where pinch and joints stay reliable with hands in the lap, at chest height and at arm's length. (Sets the interaction zone for every idea.)

## 7. Where I expect to be disputed

- **Camera access.** Others may treat "camera + AI" as proven because of the 2025 winners. Those were mostly native; in the browser the only evidence is a forum thread and one Devpost write-up, against a line in the SDK's own reference that says the opposite. I hold Feasibility 3 for P5 until the day-1 check.
- **E1 and E2 scores.** They have the most "wow" on paper. My 1 and 2 are platform limits, not pessimism: no passthrough pixels, no WebGPU for judges, no readable third-party video.
- **G1/G2 feasibility.** A designer can make them seated-friendly, but that is a refinement. As written they invite the gestures tracking handles worst.
- **A3 and A2 feasibility of 3.** Both are 4 without their riskiest feature (multiplayer, voice). I scored them as written.
- **A4 and A8 Win scores.** I rate them on finishability and a thin Productivity field. The judge or skeptic may see them as too slight or too 2D.
- **Gaze.** If anyone designs around gaze hover or dwell, note it cannot be tested before the deadline and Quest falls back to head or hand rays.
- **Effort numbers.** They assume heavy use of AI coding agents for code; art, sound, on-device tuning and submission materials do not compress the same way.
