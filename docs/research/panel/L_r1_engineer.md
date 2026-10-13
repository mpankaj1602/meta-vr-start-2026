# Lamplight round 1: Lead Engineer

`P/` = `/Users/pankaj/MyHackathons/meta-vr-start-2026/`. `M/` = `https://developers.meta.com/horizon/documentation/`. "Inf." = my inference.

| Capability | Web SDK | Unity | Confirmed? | Source |
|---|---|---|---|---|
| Microphone inside the immersive session | `getUserMedia`, granted on the 2D page before entering | Android permission dialog | Web: community reports only; Meta's web docs never mention microphone (searched) | https://forum.babylonjs.com/t/using-meta-quest-2-microphone-inside-of-webxr-game/38321 ; https://learn.framevr.io/tutorials/troubleshooting-browser-permissions ; https://forum.needle.tools/t/voip-not-connecting-to-scene-when-joining-with-xr-headset/253 ; https://developers.meta.com/horizon/llmstxt/documentation/web/llms-full.txt |
| Speech-to-text | No browser speech API; hosted. In-browser Moonshine (27M parameters) unmeasured | Voice SDK dictation is Wit.ai cloud (timeouts reported); Building Blocks speech is cloud; whisper.cpp on device | Yes, except on-device speed | https://communityforums.atmeta.com/discussions/dev-quest/speechrecognition-in-webxr/1168273 ; https://arxiv.org/html/2410.15608v2 ; `M/unity/voice-sdk-overview/` ; https://communityforums.atmeta.com/discussions/Questions_Discussions/wit-ai-dictation-request-timing-out/1373576 ; https://github.com/Macoron/whisper.unity |
| Delay and accuracy | Streaming recognition under 300 ms; batch Whisper 216x real time (60 s clip ≈0.3 s). First card ≈1.5-3 s only if cards stream singly and button release ends the utterance (inf.). Error 7-12% of words; no Quest accent data | Same | Vendor figures; total unmeasured | https://neurlcreators.substack.com/p/nova-3-deepgram-review ; https://groq.com/whisper-large-v3-turbo-now-available-on-groq-combining-speed-quality-for-speech-recognition/ |
| Server | One stateless function behind a gateway: rate limits, hard spend cap, provider fallback, keys server-side | Still needed: an APK can be unpacked (inf.) | Yes | https://developers.cloudflare.com/ai-gateway/features/spend-limits ; `P/.claude/skills/iwsdk-hosting/SKILL.md` |
| On-device, no server | WebGPU experimental; not at card quality | Building Blocks run SmolLM, Qwen, Phi on Quest; quality and frame cost unproven | Partly | `M/unity/unity-ai-building-blocks-overview/` ; https://developers.meta.com/horizon/release-notes/web/ |
| Desk without room setup | Depth hit test, `EnvironmentRaycastTarget` | `EnvironmentRaycastManager` | Yes | https://www.uploadvr.com/quest-browser-depth-api-webxr-hit-testing-instant-placement/ ; `P/.claude/skills/iwsdk-dev/references/api-reference.md` §22 ; `M/unity/unity-mr-utility-kit-environment-raycast/` |
| Labelled table plane | Needs Space Setup ("few people run" it) | Needs Space Setup | Yes | `M/web/webxr-mixed-reality/` ; `M/unity/unity-mr-utility-kit-manage-scene-data/` |
| Persistent anchor | 8 per site; lost in private mode or cleared data; SDK persists one | Not re-checked | Documented; restore untested | `M/web/webxr-mixed-reality/` ; `P/node_modules/@iwsdk/core/dist/scene-understanding/scene-understanding-system.d.ts` L191-221 |
| Pinch-slide, chain pull, hand-flat calibration | 25 joints, pinch built in | Interaction SDK | APIs yes; desk feel no | `P/node_modules/@iwsdk/xr-input/dist/visual/adapter/hand-visual-adapter.d.ts` ; https://www.meta.com/help/quest/1589938228821220/ |
| Palm stamp, fist crumple, nod | Classified from joints and `player.head` | Pose recogniser | Tuning risks | `M/unity/unity-isdk-hand-pose-detection/` ; `M/unity/unity-handtracking-troubleshooting-limitations/` |
| Light pool, dimming | Lights reach virtual objects only; dim with translucent black ("interact with it using transparent pixels") | Same, plus global brightness; surface-projected patches deprecated v83 | Principle yes; look and cost untested | `M/web/webxr-mixed-reality/` ; `M/unity/unity-customize-passthrough-surface-projected-passthrough/` |
| Headset iteration from a Mac | Hot reload over ADB; emulator | Link "only supported on Windows": Simulator or a build per try | Yes | `P/.claude/skills/iwsdk-native-xr-test/SKILL.md` ; `M/unity/unity-link` |
| Rubric, delivery | A link; gaze system present | Rubric names "ISDK v207+", "MRUK"; APK in a "Competition" channel | Yes | https://start-developer-competition-26.devpost.com/rules ; `P/node_modules/@iwsdk/core/dist/gaze/gaze-system.d.ts` |

| Engine recommendation | Win | Feasibility | Difficulty |
|---|---|---|---|
| Immersive Web SDK, submitted as a link | 6 | 3 | 4 |

## Frozen submission

"Once the Entry Period has ended, you may not make changes or alterations to your submission. The judging process will be based on the state of the Entry at the time of submission deadline. Entries must be capable of successful and consistent operation and function." Also "made available free of charge and with sufficient access until the Winner Announcement". It bars changing the entry and is silent on servers. Inf.: an unchanged server must stay up; redeploying it is a grey area. Build it to need no touch for 23 days: two providers with automatic fallback, pinned model versions, capped prepaid credit, an uptime ping.

## Engine

Web SDK. Decisive: (1) what AI coding does not compress is tuning feel on the headset; from a Mac the web loop takes seconds, Unity's a build per try. (2) Nothing here is native-only; Unity removes neither the server nor the Space Setup dependency. (3) Existing project and agent skills; no install for judges. Unity's edges: rubric-named tools, a standard microphone prompt, pose recognisers. Native/Spatial SDK: no advantage found (inf.). Reverse if check 1 fails, or the entrant has shipped Unity before and owns a Windows PC. Decide by day two.

## Scores

As written 6 / 3 / 4: more prize routes than Three Stones (6 / 4 / 2), but three input modes, five hand verbs and a live service. With the cuts below and checks 1-3 passing: 7 / 4 / 3.

## Risk out of proportion to value

Palm stamp (the hand rests on the desk by design, so presses misfire; inf.); fist crumple (fists hide fingertips); head nod (looking down at cards resembles one); handwriting as Core; spoken lamp voice (a second service); phrasing memory, weekly review, streak, time chips (invisible in one sitting).

## Keep / cut / change / add

1. Keep push-to-talk with the user's audio on every card: recognition errors stay survivable.
2. Change: stream cards one at a time; button release ends the utterance.
3. Change: surface step is "lay a hand flat where the lamp goes", seeded by depth hit test; never trigger room setup.
4. Change: one verb, pinch-slide into zones (tomorrow, later, done, let go); chain pull is the same pinch. Stamp returns only if check 6 passes.
5. Cut nod, time chips, weekly review, streak, cosmetic growth, phrasing memory, spoken voice.
6. Change silent mode: preset tray and system keyboard Core; handwriting Should.
7. Add a bundled sample utterance and week needing no microphone or network: judge path, video path, outage path.
8. Add a degrade ladder: structured cards, transcript cards, voice-memo cards.
9. Add microphone permission on the landing page, with "continue without voice".
10. Keep the lamp: procedural, six poses or fewer; light is a dim layer plus a warm decal, no shadow maps.
11. Add the no-touch server above.
12. Keep one anchor; add "move lamp" for failed restores.

## Device checks, in order

1. Microphone granted on the page still delivers samples after 60 s inside `immersive-ar`, and after doffing the headset.
2. Release-to-first-card over headset Wi-Fi: 20 utterances, the entrant's accent, a television on.
3. Pinch hold and release with the forearm resting on a desk, in evening light.
4. Depth hit test and hand-flat plane in an unscanned room: cards neither float nor sink.
5. Anchor restores after quitting the browser.
6. Dim layer look and frame time at 72 Hz; stamp and crumple false triggers.

Not compressed by AI coding: lamp animation, hand feel, voice tests with other speakers, sound, the video.
