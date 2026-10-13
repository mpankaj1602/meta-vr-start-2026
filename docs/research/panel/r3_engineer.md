# Round 3: Lead Engineer, debate and final scores

Files read: `r1_judge.md`, `r1_market.md`, `r1_redteam.md`, `r2_refined.md` in
full; `r1_designer.md` only for its hover question (L348). Line numbers below
refer to those files. `nm/` means
`/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`.

Budget rule unchanged from round one: about 5 person-weeks (pw) of build are
available. The entrant still has no headset.

## 1. Build check of refined entries

"Static" and "no camera / speech / hover" refer to the designer's conventions
(`r2_refined.md` L31-38).

| ID | Needs from platform, confirmed? | Hardest part | Hidden scope | Effort in person-weeks | 60 fps risk | Testable on Quest 3/3S + emulator? |
|---|---|---|---|---|---|---|
| A4-R | Passthrough, hit test without room scan (Quest 3/3S, Browser 40.4+), one persistent anchor (IWSDK manages exactly one), system keyboard in WebXR, constrained distance grab. All documented. Static: yes. No camera/speech/hover: yes | Placement that restores to the same desk spot next day, with a clean fallback when the anchor does not restore (private mode, cleared site data) | Virtual stones draw on top of the real hand in passthrough unless depth occlusion is switched on; wiring a hidden DOM text field to the system keyboard inside an immersive session; day-rollover logic and the seven-day preview; water that looks good over passthrough | 3.5-4 | Low (rises to Low-Medium if depth occlusion is enabled) | Emulator covers logic, anchors and hit test. Device needed for passthrough look, real-desk hit test, anchor restore across browser restarts, keyboard. Hit test, anchors and passthrough on the Glasses browser are undocumented |
| P7-R | Pointer + pinch only; passthrough and hit test optional. Confirmed. Static: yes. No camera/speech/hover: yes | Ten loci in a 35 cm house that are all visible from outside and each at least about 4 cm apart, so a jittery hand ray on Quest can pick them | A pool of roughly 70+ distinct, instantly recognisable small objects in one art style; two modes (daily ten and "My Day"); next-day quiz; week archive | 3.5-4.5 | Low | Fully in the emulator. Device only for target size and object legibility |
| G5-R | Pointer + pinch. Confirmed. Static: yes, including the phone map (both sides derive the maze from the date code). No camera/speech/hover: yes | Making a maze feel good: fog rendering, step feedback, difficulty that lands in 3-6 minutes | Little. Phone navigator page is a second small front end (cut first) | 2.5-3.5 | Low | Fully in the emulator. Device for pointing comfort only |
| N1 | Continuous hand-ray pose, pinch, positional audio (Three's `PositionalAudio` sets HRTF panning: `nm/three/src/audio/PositionalAudio.js` L59). Confirmed. Static: yes. No camera/speech/hover: yes, and it does not use gaze at all | Game feel and balance; sounds that can be located left-right on the headset's own speakers | "Lit or not" is one angle test between beam axis and creature, so the torch logic is cheap; the scope is three creature behaviours, procedural animation, audio authoring, tutorial, tracking-loss pause. Pinching while aiming deflects the ray | 4-5 | Low-Medium (fake the beam with a cone mesh; no real-time shadows) | Emulator for logic. Device for wrist-sweep comfort, whether a hand on an armrest is tracked, and audio localisation |
| A7-R | Pointer + pinch, distance grab, text rendering. Confirmed. Static: yes. No camera/speech/hover: yes | Writing three cases with one unambiguous answer each, plus hints | Underlined words are tiny targets (a word at 0.9 m is about 2° wide, under 1° tall): they need enlarged hit areas or snap-to-nearest. Per-word hit regions aligned to typeset text; statement validation; hint system; paper flip | 4.5-5.5 | Low | Emulator for flow. Device for text legibility and word-level pointing with a hand ray |
| N2 | Pointer + pinch. Confirmed. Static: yes. No camera/speech/hover: yes | Clue templates that read naturally and puzzles that need deduction | The unique-solution guarantee is not the hard part: 5 figures in 5 rooms is at most 3,125 states, so brute-force checking takes milliseconds. The scope is the clue grammar, difficulty grading, and the fact that cards "turn over when satisfied" lets players solve by trial instead of reasoning | 3-3.5 | Low | Fully in the emulator |
| E3-R | Hand joints (palm normal from wrist and metacarpals), positional audio. Confirmed. Static: yes. No camera/speech/hover: yes; no pointer at all, so identical on Quest and Glasses | Recognising palm-up, tilt-to-pour and both-palms-down reliably when the player cannot see a hand to correct it | The pour gesture ends edge-on to the cameras, a weak pose; audio-only tutorial; two presentations (sight-free and a visual default for judges, plus high contrast); six minutes of composed sound | 3.5-4.5 | Low | Audio on a desktop. Gestures are **not** testable in the emulator beyond canned poses; device needed for all gesture tuning and the hand zone |
| A1-R | Pinch-drag, Web Audio. Confirmed. Static: yes (pattern in the address). No camera/speech/hover: yes | A self-playing generative piece that sounds good for 3-5 minutes | The music engine is the product (harmony, rhythm, timbre, mix); thin strands need fat invisible colliders; continuous "bend" is not hidden by beat quantising; audio node reuse to avoid garbage-collection hitches | 4-5 | Low-Medium | Sound on a desktop. Device for output latency and pinch-drag feel |
| N3 | Pinch-drag, passthrough, hit test on a wall, one anchor (several hung pieces stored as offsets from it). Confirmed. Static: yes for making and hanging. No camera/speech/hover: yes | Robust cutting: freehand strokes into valid polygons, boolean subtraction, triangulation with holes, without degenerate-input failures | Fold and unfold animation of 8-12 mirrored segments without z-fighting; fake shadow on the wall; depth-based hit test on a plain white wall is unverified; "opens on a phone" has no working path (a phone cannot scan a code shown inside a headset, and a piece is far too large for a typed code) | 4.5-5.5 | Low (rebuild the mesh on release, not during the drag) | Geometry in a desktop browser. Device for drawing feel, wall hit test, anchor. Phone hand-off unverified |
| P3-R | Pinch-drag, own integrator, custom hand visual. Confirmed (IWSDK accepts a custom visual class: `nm/@iwsdk/xr-input/dist/visual/adapter/base-visual-adapter.d.ts` L19-77). Static: yes. No camera/speech/hover: yes | Fair launches: slingshot orbits are very sensitive to launch error, and a few-centimetre pull has about a centimetre of fingertip noise | 24 designed levels plus a build-time solver; aim preview or quantised power; the stretched hand needs VR mode (a real hand in passthrough does not stretch) and a hole within reach, which contradicts the 0.7 m, nothing-in-reach convention | 4-5 | Low | Emulator for levels. Device for launch feel and the hand set-piece |
| A6-R | Constrained distance grab (`translateMin/Max`, `rotateMin/Max` exist on `DistanceGrabbable`: `nm/@iwsdk/core/dist/grab/distance-grabbable.d.ts` L75-95). Confirmed. Static: yes. No camera/speech/hover: yes | The art pipeline: five pages cut into layers, in-painted, rigged | About 2.5 pw of image work; narration and music; original hand lettering is unreadable at Quest resolution, so captions are re-typeset; provenance record for each scan; content check per page | 5-6 | Low-Medium (layered alpha) | Emulator for mechanisms. Device for legibility and drag feel |
| A3-R | Pinch-drag; plain 2D page on a phone (IWSDK runs non-immersive). Confirmed. Static: yes. No camera/speech/hover: yes | Flick feel and ladder design | A custom deterministic physics engine with continuous collision; a second touch front end for the phone; about 20 designed rungs. Cross-device identity holds only if the simulation avoids `Math.sin/cos/pow` and friends, which the language spec allows engines to approximate differently (https://tc39.es/ecma262/#sec-function-properties-of-the-math-object, not re-fetched); + − × ÷ and sqrt are safe. A duel needs every earlier code entered in order | 4-5 (3.5 without codes) | Low | Emulator plus a phone. Device for pull feel |
| A2-R | Grab, Havok, hosted model through a proxy. Confirmed. Static: **no** (optional proxy and key that must stay up to 11 Dec). No camera/speech/hover: yes | Two directors: an authored deck that is fun alone, and a model that drives the same tools within a second or two | Tool schema, validation and content guardrails; proxy with rate limit and spend cap; room generator; draw-call merging for kit pieces; small dice are awkward for both pinch-grab and Havok (use large dice); "grab and tip" at 0.7 m contradicts the nothing-in-reach convention | 5.5-6.5 | Low-Medium | Emulator for both paths. Device for dice handling |
| P5-R | Pinch-drag rotate, pointer. Confirmed. Static: yes (40-70 MB of models, so load per object). No camera/speech/hover: yes | Being a game and not a model viewer | Asset pipeline: decimate multi-million-triangle scans, bake normals, compress textures, twelve times; a tool to place five markers per object; 60 fact-checked clue texts | 3.5-4 | Low-Medium (one 100k-triangle lit object) | Fully in the emulator. Device for memory and frame rate |

Over budget as specified: A6-R, A2-R, and A7-R and N3 at the top of their
ranges.

### Gaze before the pinch: what the page receives (designer's open question)

Checked in the installed IWSDK 1.0.1 and IWER sources.

- In an **immersive session granted `gaze-tracking`**, the runtime exposes a persistent `XRInputSource` with `targetRayMode === 'gaze'`. IWSDK reads its pose every frame, filters it, and calls `pointer.move(scene)` every frame, so pointer enter/leave/move events and the `Hovered` tag fire **before** any pinch. Sources: `nm/@iwsdk/xr-input/dist/pointer/gaze-pointer.d.ts` L135-139 and `gaze-pointer.js` L758; `nm/@iwsdk/core/dist/gaze/gaze-system.d.ts` L178. The page can also read the ray directly (`getOrigin()`, `getDirection()`, `XROrigin.eyeSpace`).
- That pose can be withheld: the source may exist while `getPose` returns null when the OS eye-tracking permission is not granted or the headset is uncalibrated (`gaze-pointer.js` L219-224).
- The "no hover from gaze" statement is true of **2D pages**: "Web content in Browser does not receive gaze hover events" (https://developers.meta.com/horizon/llmstxt/documentation/web/llms-full.txt, 2D Web Development). The brief generalised it to WebXR.
- **On Quest 3/3S there is no gaze source.** The installed source says "Ordinary hand/controller far targeting remains active" (`gaze-pointer.js` L205). So judges on Quest will point with a **hand ray**, not the head. Meta's guide says "falls back to head pointing" (https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/); the two disagree and the shipped code is what runs. Day-one check.
- The emulator's gaze source is "persistent, viewer-relative" and "emits no select events" (`nm/iwer/lib/device/XRGazeInput.d.ts` L18-23), so hover-before-pinch will appear in the emulator.
- Consequence: hover highlights are safe as feedback and will show on Quest (hand ray) and in the emulator. Nothing may depend on them, on dwell, or on logging gaze, because the Glasses behaviour and permission flow cannot be tested before the deadline. The designer's convention (L31) is right; only "head or hand ray" should read "hand ray".

## 2. Disputes

1. **Pointing on Quest is a hand ray, and gaze credit cannot be shown.** Judge: gaze "falls back to head pointing" (`r1_judge.md` L60) and A8 is "the cleanest showcase of 'gaze interactions'" (L27). Designer: "a head or hand ray" (`r2_refined.md` L31). Counter: the installed SDK keeps hand far-targeting when no gaze source exists (`gaze-pointer.js` L205). Effect: every "point and pinch" entry is judged with a hand ray that jitters and needs the hand raised enough to aim. A8 loses its claimed gaze advantage (my Win 5 to 4). A7-R's word-sized targets become a real risk (Feasibility stays 3, not 4).
2. **A4 does not need room setup or unsolved text entry.** Skeptic: "planes need room setup", "text entry for tasks is unsolved", Feasibility 3 (`r1_redteam.md` L23). Counter: hit test works from live depth with no scan since Browser 40.4 (https://www.uploadvr.com/quest-browser-depth-api-webxr-hit-testing-instant-placement/); the system keyboard is available in WebXR (https://developers.meta.com/horizon/documentation/web/webxr-keyboard/); IWSDK persists one anchor itself. A4 and A4-R stay at Feasibility 4.
3. **Camera access is unconfirmed, not blocked.** Market: "Camera-dependent ideas are blocked on the web" and P5 Feasibility 1 (`r1_market.md` L40, L15). Counter: only the WebXR `camera-access` feature is rejected. Headset cameras are reported as ordinary `getUserMedia` devices since Browser 40.1 (https://forum.babylonjs.com/t/webxr-camera-passthrough-support/58274), and a 2025 IWSDK winner used camera access (https://devpost.com/software/nanauts). P5 stays at Feasibility 3 pending the device check. E1 and P6 stay at 1 for other reasons (no pose, no registration, comfort).
4. **A frozen submission does not make a backend unrepairable.** Skeptic: a key that fails after 18 Nov "may not be repairable without breaching this" (`r1_redteam.md` L40). Counter (inference): a serverless proxy needs no change to keep running; topping up credit or rotating a server-side key does not alter the submitted build. The real exposure is a spend cap being hit, which is a configuration choice. I do not lower A2, A2-R or P5 for uptime alone.
5. **A2 is Feasibility 3, not 2.** Judge and skeptic both give 2 with Difficulty 5 (`r1_judge.md` L21; `r1_redteam.md` L21). Counter: the idea as written says "voice/pinch choices", so voice is optional, and a solo developer shipped an LLM-driven IWSDK entry in three weeks last year (Nanauts, link above). It is over budget at 6-7 pw, which is why it is 3 and not 4.
6. **G1 and G2 are not Feasibility 4.** Judge gives both 4 (`r1_judge.md` L5-6) and market gives G1 4 (`r1_market.md` L3), while the judge's own text says the swing "leaves the tracking volume" and the draw hand "will not be detected". An entry whose core gesture drops out is not a polished slice. The skeptic's note that Meta ships throwing samples applies to the native toolkit (`r1_redteam.md` L120). Both stay at 3.
7. **E3-R is not "fully testable on a desktop".** Designer: `r2_refined.md` L115, Feasibility 4. Counter: the whole interaction is palm orientation, which the emulator only supplies as canned poses, and the player gets no visual correction. Audio is desktop-testable; the gestures are not. My Feasibility is 3.
8. **N3 is not Difficulty 2.** Designer: Feasibility 4, Difficulty 2 (`r2_refined.md` L237) on the strength of "polygon-clipping and triangulation libraries" (L140). Counter: see the build check. Freehand input into robust boolean geometry, a multi-segment unfold, wall hit testing on plain surfaces and a phone link with no transport are four separate problems. Feasibility 3, Difficulty 4. It is still the freshest refined idea, so Win 5 stands.
9. **P3-R's showpiece contradicts its own conventions.** Designer: "your own hand stretches as it nears the hole" with "drawing a stretched hand ... is my inference" (`r2_refined.md` L145-149), against "nothing has to be within reach" at 0.7 m (L32). Counter: the hand visual can be replaced, so the effect is buildable, but only in VR mode and only if the hole is brought within reach. Add 0.5 pw and a layout exception. Feasibility 3, not 4.
10. **P7-R against A4-R as the pick.** Designer picks P7-R (`r2_refined.md` L247). On build risk I agree P7-R is safer: it is fully emulator-testable, while A4-R has four device-only dependencies. I still rank A4-R first, because P7-R is a memory game and the sponsor "may re-assign an entry's Track" (`r1_judge.md` L57) into the most crowded field. P7-R Win 5, A4-R Win 6.

Confirmations rather than disputes: N2's unique-solution solver is cheap as
claimed (L101); A3-R's deterministic replay is achievable under the constraint
in the build check (L172); G5-R at Feasibility 5 is right.

## 3. Concessions

| ID | Score | Old | New | Evidence that changed it |
|---|---|---|---|---|
| A1 | Win | 6 | 5 | Market: most crowded hands genre, Maestro at 847 ratings and a direct hands-only rival released Aug 2026 (`r1_market.md` L18, L78). Skeptic: measured 45 ms hand-tracking delay against a 10-20 ms instrument tolerance (`r1_redteam.md` L20, L121); I had only called latency "unmeasured" |
| A5 | Feasibility | 4 | 3 | Skeptic: 9.6° mean joint-angle error (`r1_redteam.md` L119). Market: an existing ASL app dropped eight letters as untrackable (`r1_market.md` L22) |
| A5 | Win | 5 | 4 | Judge: teaching sign language is not what the Accessibility award describes (`r1_judge.md` L24) |
| A7 | Feasibility | 3 | 2 | Skeptic: submission is frozen at the deadline (`r1_redteam.md` L40), so "daily cases" as written means every case through 11 Dec must exist on 18 Nov |
| A6 | Win | 6 | 5 | Judge: special awards are single winners across both divisions (`r1_judge.md` L49) and one story is "a one-time demo" (L25) |
| A2 | Win | 5 | 4 | Market: a direct WebXR rival launches mid-October (`r1_market.md` L19). Judge and skeptic: the take-it-away test, which I did not know in round one |
| A8 | Win | 5 | 4 | Skeptic: speech-to-text backend and "slower than a phone" (`r1_redteam.md` L27); plus my own finding that gaze cannot be shown on Quest |
| P5 | Win | 4 | 3 | Market: Meta AI with Vision already does this on Quest 3 and Meta open-sourced a sample (`r1_market.md` L15, L72) |
| P4 | Win | 2 | 1 | Market: FLY is Google 3D Tiles on Quest with 1.3K reviews (`r1_market.md` L14). Judge: outright failure of the take-it-away test (`r1_judge.md` L16) |
| P1 | Win | 2 | 1 | Market: a free, well-rated learner-driver incumbent (`r1_market.md` L11) |
| P2 | Feasibility | 4 | 3 | Skeptic: documented errors in LLM agronomy advice (`r1_redteam.md` L14, L86); wrong advice is a compliance problem, not just a content one |
| G4 | Feasibility | 4 | 3 | Skeptic: Meta's own text that rapid movement and sideways chops track worst (`r1_redteam.md` L8) |
| G4 | Win | 4 | 3 | Market: the existing VR runner has six reviews (`r1_market.md` L6) |
| G2 | Win | 3 | 2 | Market: user reports that tracking fails with hands near the headset at full draw (`r1_market.md` L4) |
| E1 | Win | 2 | 1 | Market: the same idea exists free with a server model and was reviewed as a one-second-lag flat rectangle (`r1_market.md` L8) |
| E2 | Win | 2 | 1 | Market: shipped as a system feature by Meta, Google and Apple (`r1_market.md` L9) |

Accepted without a score change: the 0.5 m minimum fixation distance
(`r1_redteam.md` L60) replaces my loose "lap zone" wording; the take-it-away
test and cross-division award pools should have been in my round-one reasoning.

## 4. Final scores

```csv
ID,Track,Award,Win,Feasibility,Difficulty,Note
G1,Gaming,none,3,3,2,Swing leaves tracking volume when seated; stock genre; physics is easy
G2,Gaming,none,2,3,3,Full draw hides the string hand beside the face; raised arms tire
G3,Gaming,none,2,2,4,Paddle strokes out of view; water and river content exceed budget; comfort risk
G4,Gaming,Best First Five Minutes,3,3,3,Fast swipes are the tracker's worst case; phone genre; comfort unproven
G5,Gaming,Best First Five Minutes,4,4,2,Cheap and emulator-testable; first-person hands-only movement is unresolved as written
E1,Entertainment,none,1,1,5,Page cannot restyle passthrough; camera feed is unposed and late; no per-frame ML budget
E2,Entertainment,none,1,2,4,System feature already; browser video depth unproven; third-party video unreadable
E3,Entertainment,Best Accessibility Forward Experience,4,4,2,Technically safe; no stated interaction; all effort is sound design
P1,Gaming,none,1,1,5,No foot tracking so no pedals; content scope far over budget
P2,Productivity,none,2,3,2,Reference app in 3D; advice correctness is a compliance risk
P3,Entertainment,Best First Five Minutes,4,3,3,Four features in one idea; one mechanic fits; lensing must be approximated
P4,Entertainment,none,1,2,4,Wrapper on Google tiles; 60 fps while streaming unproven; logo conflict
P5,Productivity,Best Agentic Interaction,3,3,3,Rests on unverified browser camera access; seconds per answer; platform feature exists
P6,Productivity,none,1,1,4,Not seated; cannot be judged at a desk; no world-registered recognition
P7,Productivity,Best Reason to Come Back,2,4,2,Trivial to build; calorie premise is false and must go
A1,Entertainment,Best First Five Minutes,5,4,3,No services needed; pluck latency about 45 ms plus audio; crowded genre
A2,Gaming,Best Agentic Interaction,4,3,4,Buildable pinch-first; over budget with voice; proxy must stay up
A3,Gaming,Best Social & Multiplayer,5,3,4,Solo play is three weeks; live netcode doubles it and a lone judge cannot test it
A4,Productivity,Best Reason to Come Back,6,4,2,All features documented and emulated; vague as written; thinnest track
A5,Gaming,Best Accessibility Forward Experience,4,3,3,Fist letters untrackable; classifier will mark correct shapes wrong
A6,Entertainment,Best First Five Minutes,5,3,3,Simple code; original art for every spread is the bottleneck
A7,Gaming,Best Reason to Come Back,6,2,4,Verbs are SDK built-ins; daily cases cannot exist by a frozen deadline
A8,Productivity,none,4,4,3,Plain CRUD; voice needs a paid service; gaze advantage not showable on Quest
A9,Entertainment,none,4,3,2,Simple engine; depends on original art; hands barely used
A4-R,Productivity,Best Reason to Come Back,6,4,2,Hit test and one anchor confirmed; hand occlusion and anchor restore need a device
P7-R,Productivity,Best Reason to Come Back,5,4,2,Fully emulator-testable; needs 70+ curated objects; likely reassigned to Gaming
G5-R,Gaming,Best First Five Minutes,5,5,2,Smallest build here; fully emulator-testable; crowded track and familiar genre
N1,Gaming,Boldest Original Concept,5,4,3,Slow wrist aim suits tracking; no gaze dependence; fun and audio need a device
A7-R,Gaming,Best First Five Minutes,5,3,3,Writing is the product; word-sized targets too small for a hand ray
N2,Gaming,Best Reason to Come Back,4,4,2,Solver is trivial; clue templates and difficulty grading are the work
E3-R,Entertainment,Best Accessibility Forward Experience,5,3,3,Pour gesture untestable in emulator; identical on Quest and Glasses
A1-R,Entertainment,Best First Five Minutes,5,4,3,Beat quantising hides latency; generative music quality is skill-bound
N3,Productivity,Best First Five Minutes,5,3,4,Robust cutting and unfold are hidden scope; phone link has no path
P3-R,Gaming,Best First Five Minutes,4,3,3,Launch sensitivity versus hand noise; 24 levels; hand set-piece breaks reach rule
A6-R,Entertainment,Best First Five Minutes,5,3,3,Public-domain art removes drawing but layering five scenes is 2.5 weeks
A3-R,Gaming,none,4,4,3,Own deterministic physics is sound if trig is avoided; code duel is clumsy
A2-R,Gaming,Best Agentic Interaction,4,3,4,Two directors to build; not static; over budget at about six weeks
P5-R,Gaming,none,3,4,3,Routine asset pipeline; reads as a model viewer; twelve objects is thin
```

## 5. Per-track ranking

Ordered by my Win and Feasibility together (New division).

**Gaming**

1. G5-R Lantern (5 / 5): the only entry I am confident ships polished with time to spare.
2. N1 Hush (5 / 4): hand-aimed, no gaze or room dependence, simple logic; fun must be proven in week one.
3. A7-R Paper Trail (5 / 3): strong genre fit, bounded by writing and small text targets.
4. N2 Alibi (4 / 4): cheap and safe, limited ceiling.
5. A3-R Your Move (4 / 4): solid solo slice; the code duel is optional.

A7 as written has the highest Gaming Win (6) but Feasibility 2.

**Entertainment**

1. A1-R Strand (5 / 4).
2. A1 as written (5 / 4): same build minus the latency fix.
3. E3-R Close Your Eyes (5 / 3): best award target of the three, weakest testability.
4. A6-R Paper Theatre (5 / 3): over budget on art.
5. A6 as written (5 / 3).

**Productivity**

1. A4-R Three Stones (6 / 4).
2. A4 as written (6 / 4).
3. P7-R Pocket Palace (5 / 4).
4. N3 Snip (5 / 3).
5. A8 Spatial planning board (4 / 4).

### Overall recommendation: A4-R Three Stones

**Main reason.** It has the highest Win of anything I rate Feasibility 4 or
better, at 3.5-4 pw, in the least contested track, and every platform feature it
needs is documented, wrapped by IWSDK and emulated: hit test without a room
scan, one persistent anchor, constrained pinch-drag, the system keyboard. That
leaves a full week of slack for polish and the video.

**Main risk.** It is slight, and its selling point (your real desk) rests on
four things that can only be checked on a headset the entrant does not yet own.
If they fail, it degrades to a floating tray, which is a weaker entry.

**Fallback if the checks fail or the headset is late:** G5-R Lantern, which needs
none of them.

**Day-one device checks this pick depends on**

1. Hit test in an `immersive-ar` session lands on a real desk with no room setup done, in a room never scanned.
2. The persistent anchor restores after closing and reopening the browser (not in private mode), and the app recovers cleanly when it does not.
3. `session.isSystemKeyboardSupported` is true in the immersive session and a short title can be typed with hands.
4. Pinch and hand-ray aim are tracked with the forearm on a desk or armrest, and the ray is steady enough for 4 cm targets at 0.7 m.
5. A virtual stone held "over" the real hand in passthrough: decide whether depth occlusion is needed and what it costs at 72 Hz.
6. Which ray Quest actually gives without eye tracking (hand, as the SDK source says, or head, as Meta's guide says).
