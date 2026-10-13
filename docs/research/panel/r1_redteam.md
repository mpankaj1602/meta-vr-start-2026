# Round 1: Red-team skeptic report

| ID | Best track | Verdict | Strongest objection | Evidence or source | Fix if any | Win 1-10 | Feasibility 1-5 | Difficulty 1-5 |
|---|---|---|---|---|---|---|---|---|
| G1 | Gaming | SERIOUS | A bowling swing is a large arm movement whose backswing and release pass the thigh, which is outside the hand-tracking volume; saturated genre, near-zero innovation score | Rules: "Limit roomscale or large physical movement" [RULES]; Meta: hands "resting by the thighs ... will not be detected" [HANDS-LIM] | Tabletop skittles with a flick or pinch-pull in front of the chest (this converges on A3) | 2 | 3 | 2 |
| G2 | Gaming | SERIOUS | Drawing a bow puts the string hand at the cheek, where Meta says hands are not detected; aiming arm held raised with no draw-weight feedback | Meta: hands "placed too close to the device like on the cheek, will not be detected" [HANDS-LIM]; "Avoid requiring hands to be held above heart level" [HANDS-BP] | Desk-scale slingshot or ballista: pinch-pull in front of the chest, release to fire | 3 | 3 | 3 |
| G3 | Gaming | SERIOUS (borderline fatal) | Paddling is repeated two-arm strokes that leave the tracking volume near the hips; rapids add pitch, roll and yaw acceleration, the worst case for vection; water plus river content is heavy scope | [HANDS-LIM]; Meta locomotion guide: discomfort comes from changes in motion, steady movement is "often comfortable" [LOCO] | Constant-speed drift, steer by palm tilt, no paddling, no rapids (which removes most of the appeal) | 2 | 2 | 4 |
| G4 | Gaming | SERIOUS | Reflex game driven by fast sideways hand swipes, the motion Meta says tracks worst; forward vection with lane-change accelerations; "Subway-Surfers-type" invites a clone verdict; fails the seat test outright if "jump, sit, step" is read literally | Meta: "rapid or erratic hand movements can challenge the system's tracking accuracy"; chops parallel to the view track worse than punches [HANDS-LIM]; [LOCO] | Third-person runner on a diorama in front of the user, slow palm tilt for lanes, original theme | 3 | 3 | 3 |
| G5 | Gaming | SURVIVES | Low ceiling rather than a failure: mazes are generic, and if first-person, corridor turning with hands-only locomotion is a comfort risk | [LOCO] recommends stepped translation and snap turns; Gaming track names "Puzzle" [RULES] | Gaze-and-pinch hop between junctions (no smooth locomotion); needs one distinctive hook | 4 | 4 | 2 |
| E1 | Entertainment | FATAL | WebXR on Quest gives no access to passthrough pixels, so the real view cannot be restyled; the only camera path is a separate 2D camera stream with tens of ms of capture latency and no intrinsics; "Ghibli" is a third party's brand name; nothing to do with hands | Meta: "There is no way to get to the pixels of the passthrough content" [WEBXR-MR]; [BABYLON-CAM]; [PCA]; rules ban "brand names" [RULES]; [CODA] | None that keeps the idea. A mesh-based room re-skin with an original toon style is 2025 winner DreamSpace [WINNERS25] | 1 | 1 | 5 |
| E2 | Entertainment | FATAL | Meta already ships automatic 2D-to-3D for photos, videos and Reels in its Horizon OS Instagram app; the judge has no media to convert; other people's films and reels are third-party content and DRM video cannot be read by a page | [UPLOADVR-3D]; rules on third-party rights [RULES]; [EME] | Different idea: entrant-owned or CC0 clips with pre-baked depth in an authored viewer | 2 | 2 | 4 |
| E3 | Entertainment (award: Accessibility Forward) | SERIOUS | Not yet a product: no mechanic, goal or hands interaction is stated; sound-only self-motion is weaker than visual; with eyes closed it works equally on a phone with earbuds | Väljamäe review: sound contribution to self-motion "appears to be weaker than the visual modality" [VECTION-AUDIO]; Boldest-concept test: "would fall apart on any other platform" [RULES] | Define one audio-first game steered by head and hands, minimal visuals, headphones prompt | 4 | 4 | 2 |
| P1 | Productivity as written; really a Gaming sim | FATAL | "Learn to drive" is an instructional claim made with no pedals, wheel or haptics, hands only; HMD driving raises simulator sickness; AI-added cars are a generative pipeline and real car shapes are "recognizable branded products" even without logos | HMD "resulted in ... a higher degree of simulation sickness" [DRIVE-HMD]; evidence base even for real simulators is thin [DRIVE-REVIEW]; [RULES] | Different idea: tabletop toy-car puzzle with no instruction claim | 1 | 2 | 5 |
| P2 | Productivity | FATAL | As written it is a reference chatbot with pictures: nothing spatial or hands-first, and the rules name ChatGPT wrappers; LLM agronomy advice has documented errors; months-long growth conflicts with a 10-minute session | "take it away test" [RULES]; GPT advice tested on Nigerian cassava farming had shortcomings [LLM-AG]; [LLM-AG2] | Different idea: desk planter sim, curated data for a handful of plants, time-lapse growth | 2 | 3 | 3 |
| P3 | Entertainment (immersive storytelling), not Productivity | SERIOUS | Four exhibits, not one mechanic; "data from the web" is a live dependency; easy to get physics wrong (spaghettification depends on black-hole mass; pull toward "nearby bodies" is imperceptible); falling is vertical vection | [SPAGHETTI]; [LOCO] | One lap-scale gravity sandbox plus one correct black-hole set-piece, all data bundled | 4 | 3 | 4 |
| P4 | Entertainment | FATAL | Pure wrapper: remove Google and nothing is left; Fly, EarthQuest and Wooorld already do this on Quest; Google requires its logo and attributions on screen while the contest bans corporate logos and brand names | "take it away test", logo ban [RULES]; Google tile policies [GMAPS-POL]; [GEARTH-APPS] | None | 1 | 2 | 4 |
| P5 | Productivity (award: Agentic Interaction) | SERIOUS (severe) | Depends on a cloud vision model being right about arbitrary objects, then confidently narrating "how it formed"; needs the camera path the entrant cannot test without a headset; frames of the judge's room go to a third party; fails the take-it-away test | Object hallucination is a documented failure of vision-language models [POPE], [MULTIOBJ]; camera data is "Device User Data" [PCA]; [BABYLON-CAM]; [RULES] | Curated virtual "specimens" with verified explainers as the core; live camera as an optional mode with confidence gating and an honest "not sure" | 4 | 2 | 5 |
| P6 | Productivity | FATAL | A judge at a desk has no gym, so the entry cannot be tested; it is the opposite of seated, two-foot-radius use; Meta's own safety guide warns against use during activities needing coordinated physical movement | [RULES]; Quest 3 safety guide [Q3-SAFETY]; [MR-HEALTH] | None | 1 | 1 | 5 |
| P7 | Gaming (puzzle) once claims are removed | FATAL as written | Both premises fail: hard thinking adds roughly 5% to the brain's energy use (about half a kcal per hour by my arithmetic), and "sharper" is the claim the FTC fined Lumosity for; contest bans false or misleading content | [RAICHLE-5PCT], [SCIAM], [QUANTA]; [FTC-LUMOS]; [SIMONS]; [OWEN]; Meta bans health claims [CONTENT-GL] | Delete every calorie and cognition claim; what remains is a generic daily puzzle set | 1 | 4 | 2 |
| A1 | Entertainment | SURVIVES | Plucking will feel late: measured hand-tracking delay of about 45 ms against a 10-20 ms tolerance for instruments; conducting holds arms up; 2025 already rewarded three music entries | [HT-ACCURACY]; [MUSIC-LAT]; [HANDS-BP]; [WINNERS25] | Quantise to the beat (shape, do not trigger); keep gestures below chest height | 6 | 4 | 3 |
| A2 | Gaming (award: Agentic Interaction) | SERIOUS | The LLM is the product: fails the take-it-away test, costs money through a judging window in which the submission is frozen, adds seconds of latency per turn; browser speech recognition is reported unavailable on Quest; at least five subsystems | "you may not make changes or alterations to your submission" [RULES]; [SPEECH] | Hand-authored adventure graph that plays fully offline; LLM only as optional narration with cached fallback; pinch choices primary | 5 | 2 | 5 |
| A3 | Gaming (award: Social & Multiplayer only if netcode ships) | SERIOUS (cheap fix) | "Duel, invite by link": a judge alone has no opponent; real-time physics netcode is a second project; carrom and pinch-pull golf are already on the store | [WINNERS25] (Tiny Golf); brief (RealCarrom, Table Party) | Solo versus AI and trick-shot puzzles as the core loop; multiplayer optional | 5 | 3 | 4 |
| A4 | Productivity (award: Best Reason to Come Back) | SERIOUS | A judge cannot experience "daily" in one sitting; passthrough must hold up "in rooms the developer never tested" and the entrant has no headset; anchors and planes have hard limits; text entry for tasks is unsolved | [RULES]; "only create 8 persistent anchors", not persistent in private mode, planes need room setup [WEBXR-MR] | A complete first session with a compressed-time preview of day two, preset tokens, and a no-surface fallback | 5 | 3 | 3 |
| A5 | Gaming or Productivity (award: Accessibility Forward) | SERIOUS | Fingerspelling needs finger-level accuracy the tracker does not give for closed-fist letters; teaching wrong shapes is instructional harm; three ASL tutors already ship; hearing-led sign tech has a history of Deaf-community criticism; the entry is two ideas joined by "or" | About 9.6 degrees mean joint-angle error [HT-ACCURACY]; occlusion [HANDS-LIM]; [ATLANTIC] | Choose the non-linguistic hand-shape puzzle, or a verified subset reviewed by Deaf signers | 4 | 3 | 3 |
| A6 | Entertainment (award: First Five Minutes) | SURVIVES | Art and animation load for one person; a storybook is finished once, which is weak on "habit-forming purpose"; a book in the lap sits inside Meta's 0.5 m comfort limit | Fixation targets "at least 0.5 meters away" [DISPLAY]; criteria wording [RULES] | Raise the book to tray height at 0.6-0.8 m; one short story finished to a high standard | 6 | 3 | 4 |
| A7 | Gaming (narrative) | SERIOUS (cheap fix) | "Daily cases" is a content treadmill one person cannot sustain, and generated cases risk being unsolvable; text-heavy; four systems hide inside "handle evidence, pin clues" | Inference from scope; submission frozen at deadline [RULES] | Two hand-authored eight-minute cases, episodic framing, drop "daily" | 6 | 3 | 4 |
| A8 | Productivity | SERIOUS | Capture by voice needs speech-to-text that the Quest browser is reported not to expose, so a paid cloud service; "open on phone by link" is a backend; sorting cards in the air is slower than a phone | [SPEECH]; Boldest-concept test [RULES] | Preset templates, no accounts, QR or short link to a static export | 3 | 3 | 4 |
| A9 | Entertainment | SERIOUS | Needs an original comic (script plus art); turning pages is a thin use of hands; reads as well on a tablet | Innovation criterion: "uniquely leverage Meta device capabilities" [RULES] | One short original story with depth-layered panels and one tactile action per page (this converges on A6) | 4 | 3 | 3 |

Reading the table: ideas are judged as written. Win is 1-10; Feasibility is 1-5 (5 = very likely to ship); Difficulty is 1-5 (5 = hardest). "Award" in the track column is the special award the idea could plausibly target. Source keys in square brackets resolve in the Sources section at the end. Verdict counts: 7 FATAL, 14 SERIOUS, 3 SURVIVES.

## 1. Rule wording that decides cases

All quotes are from the official rules page [RULES], read on 2026-10-06.

- Hands-first is the only item labelled "Requirement": "Fully usable with hands end-to-end. Controller support optional." Test: "Can someone complete the entire experience without ever pairing a controller?"
- The other three are labelled "Guidelines": "Designed for seated/stationary use. Limit roomscale or large physical movement." ("does every interaction work in a 2ft radius?"); "Fast cold start. Clean pause/resume. Satisfying in ≤10 minutes."; "Core experience is Entrant-built. Thin wrappers around existing platforms or services (YouTube, ChatGPT, etc.) are highly discouraged."
- The wrapper guideline has a named test the brief did not quote: "The 'take it away test' — remove the third-party service. Is there still a Project?" This is the single most damaging sentence for P2, P4, P5 and A2.
- Content: "Projects may not mention or depict any identifiable person other than Entrants." "Projects must not contain any commercial or corporate advertising (including, without limitation, corporate logos, brand names, and slogans), recognizable branded products, or commercial artwork." Projects must not include content that is "false, fraudulent, deceptive, misleading".
- Frozen submission: "Once the Entry Period has ended, you may not make changes or alterations to your submission. ... Entries must be capable of successful and consistent operation and function." and "made available free of charge and with sufficient access until the Winner Announcement". Inference: a backend or API key that fails after 18 Nov may not be repairable without breaching this.
- Passthrough is scored, not free: "the player's real room meaningfully changes the experience, not a scene that plays the same with passthrough off", and entries must show "correct use of scene understanding ... anchoring content to detected planes ... and holding up in rooms the developer never tested."
- Performance: "must be performant on Meta Quest hardware (min 60 fps), solid and bug-free".
- "AI tools may also be used to assist in the judging, but final decisions will be made by human judges." The text description and video therefore matter more than usual.
- Licences: third-party tools and assets must be used "in accordance with any terms and conditions or licensing requirements", and the sponsor "may at any time request written proof of ownership or proper license".

Correction to the brief: the special awards do have official definitions on the rules page.
- Agentic Interaction: "Apps where AI is a core part of the experience—spatial agents, voice-first AI interaction, procedural content, context-aware assistance."
- Reason to Come Back: "thoughtful progression and reward design: something to work toward, visible growth between sessions, and a loop that pulls the user back tomorrow."
- First Five Minutes: "how fast the experience explains itself, teaches controller-free interaction without a wall of text, and delivers a payoff before the user takes the headset off."
- Accessibility Forward: "voice alternatives for hand interactions, eyes-only navigation for limited mobility, high-contrast modes, or experiences inclusive by default."
- Boldest Original Concept: "A concept whose core loop depends on presence, spatial depth, real-world scale, or eyes and hands. Judged on originality and on whether the experience would fall apart on any other platform."
- Social & Multiplayer: "co-watching, cooperative play, social spaces, or asymmetric multiplayer."

The existence of the Agentic award weakens a blanket "AI equals wrapper" objection. My position is narrower: AI may be core, but the entry must still be something when the service is removed.

## 2. Cross-cutting risks (apply to several ideas)

1. No headset. The native Passthrough Camera API "is not supported in XR Simulator" [PCA]; hand-pose accuracy, passthrough, plane detection, anchors and 60 fps cannot be validated in a desktop emulator (inference for the web emulator). Every idea that leans on camera, room geometry or fine hand shapes (E1, P5, P6, A4, A5) is being designed blind until a Quest is bought. The rules do allow emulator footage in the video ("via XR Simulator or another equivalent emulator") but still score 60 fps on hardware.
2. Hand-tracking volume. Meta: "Hands outside this area, such as resting by the thighs or placed too close to the device like on the cheek, will not be detected." Occlusion: "If significant portions of the hand are obscured, the virtual representation of the hand will disappear." Fast motion: "rapid or erratic hand movements can challenge the system's tracking accuracy" [HANDS-LIM]. Fatigue: "Avoid requiring hands to be held above heart level or excessive reaching." [HANDS-BP]. This leaves a narrow comfortable band, roughly lower chest height in front of the body (inference), and it cuts against the brief's "hands resting in the lap" assumption on Quest hardware. Check lap-level pinch on a real Quest before committing to any lap-diorama idea (A2, A3, A6).
3. Near-field comfort. Meta: objects users fixate on for extended periods should be "rendered at least 0.5 meters away"; "1 meter is a comfortable distance for menus" [DISPLAY]. A diorama or book literally in the lap is closer than that and forces sustained neck flexion (the second point is inference). Counter-evidence I accept: Pocket Lands, a lap diorama, won a 2025 hand-interaction award [WINNERS25], so this is a design constraint, not a kill.
4. Voice. Developers report that the Web Speech `SpeechRecognition` API is not exposed in the Quest browser [SPEECH]. I could not open the Meta forum threads (HTTP 403), and the reports are not recent, so treat this as "verify on device". If true, A2 and A8 need a cloud speech service: cost, a microphone permission prompt and another outage point.
5. Scene dependence. Plane detection returns nothing until the user has done room setup; Meta recommends calling `initiateRoomCapture` when `detectedPlanes` is empty [WEBXR-MR]. A judge who is pushed into a room scan in the first minute is a lost First Five Minutes.
6. Network dependence. Anything that calls a paid API must stay funded and working from 18 Nov to the winner announcement with the submission frozen (section 1).

## 3. Scientific and factual validity

### P7: "burn calories by thinking" and "sharper"

- Energy. The brain takes about 20% of resting metabolic rate; Scientific American's worked example is 260 kcal/day, or 10.8 kcal/hour, and quotes Claude Messier: "when people do one mental task you won't see a large increase of glucose consumption as a significant percentage of the overall rate" [SCIAM]. Raichle's work and a 2025 review by Jamadar and colleagues in Trends in Cognitive Sciences put the extra cost of effortful, goal-directed tasks at about 5% over rest [RAICHLE-5PCT], [QUANTA]. My arithmetic from those figures: 5% of 10.8 kcal/hour is about 0.5 kcal/hour, so a 10-minute session adds roughly 0.1 kcal. The popular "chess grandmasters burn 6,000 calories" figure has no primary source and was extrapolated from heart-rate data [CHESS].
- "Sharper". Simons et al. (2016, Psychological Science in the Public Interest) found "little evidence for broad transfer from brain-training tasks to other tasks" [SIMONS]. Owen et al. (2010, Nature, 11,430 participants) reported "no evidence for any generalized improvements in cognitive function following brain training" [OWEN]. A 2014 statement from about 70 researchers said brain-game claims "are frequently exaggerated and at times misleading" [STANFORD]. For balance: a larger group replied that "certain cognitive training regimens can significantly improve cognitive function" [STANFORD]; that supports specific studied regimens, not a new untested app.
- Regulation. Lumos Labs paid $2 million to settle FTC charges that it "deceived consumers with unfounded claims" that its games improve performance at work and school and delay cognitive decline [FTC-LUMOS]. The FTC's 2022 Health Products Compliance Guidance extends to health apps and expects randomised controlled trials as substantiation [FTC-GUIDE].
- Platform policy. Meta's content guidelines prohibit "Health-related claims or content that relates to the diagnosis, mitigation, cure, or treatment of a disease or medical condition" [CONTENT-GL]. A calorie claim is arguably outside that exact sentence, but it is squarely inside the contest's ban on "false ... deceptive, misleading" content.
- Verdict: the premise is false on the first claim and unsubstantiated on the second. Without the claims the idea is a daily puzzle collection, which is a legitimate but different entry.

### P1: learning real driving, hands only

- No pedals. Hands-first is a hard requirement, so throttle and brake must be mapped to hands. Inference: that trains a mapping that does not exist in a car; I found no study supporting skill transfer from a pedal-less, wheel-less, hands-in-air simulator.
- Even purpose-built simulators with wheel and pedals have a thin evidence base: a 2023 systematic review of 17 studies found general support for training value but "very limited research samples" and "infrequent follow-up of the training outcomes" [DRIVE-REVIEW].
- Sickness. A 2021 comparison found the head-mounted display gave "more virtual presence, and a higher degree of simulation sickness" than monitors in a driving simulator [DRIVE-HMD]. Driving is continuous acceleration, braking and turning, which is exactly what Meta's locomotion guidance says causes discomfort [LOCO].
- Hands. A mid-air wheel has no reaction force; a review of hand tracking in VR notes that removing tactile cues "impairs the accuracy of manual localization" [HT-REVIEW]. Hand-over-hand steering makes one hand cover the other, which is the occlusion case in [HANDS-LIM] (inference for steering specifically).
- "Cars added by AI ... without logos". The rule bans "recognizable branded products", not just logos; a recognisable production car body is exposed to that rule even unbadged (inference about how a judge reads it). Generating drivable vehicles with correct dimensions and handling from a prompt is a separate product.
- Liability: an app that says it teaches driving invites reliance. The contest also bans "deceptive, misleading" content.

### P2: AI soil and watering advice

- Tzachor et al. (2023, Nature Food) tested GPT on technical advice for Nigerian cassava farmers and "emphasize shortcomings of this technology", proposing human experts in the loop [LLM-AG]. Reporting on that work lists wrong planting times, seed rates and fertiliser timing, and a herbicide-timing error that "could cause significant crop damage" [LLM-AG2]. A weed-science comparison found even the best models had "significant limitations" [LLM-AG3].
- Correct soil and watering advice depends on climate zone, season, container versus ground and a soil test. A headset has none of these inputs (inference).
- AI-generated plant images can show the wrong species or growth stage with no warning to the user (inference).

### P3: physics accuracy

- Spaghettification is not a property of all black holes. For a stellar-mass black hole tidal forces destroy a person before the horizon; for a supermassive one the head-to-feet difference at the horizon is "about 0.02 percent—barely noticeable" [SPAGHETTI], [SPAGHETTI2]. A visualisation that always stretches the viewer is wrong.
- "How fast you fall toward nearby bodies": the pull between a person and room-scale objects is far too small to perceive (standard Newtonian gravity; my statement, no source needed beyond the law). That could be the interesting reveal, but only if the numbers are shown honestly.
- "Data from the web on surroundings" is undefined and makes the experience depend on a live service.
- Comfort: falling is sustained vertical acceleration of the viewpoint. Meta advises keeping camera elevation consistent to avoid discomfort from vertical movement [LOCO].
- It is not Productivity under the track text; it would be judged as Entertainment or re-assigned.

### P5: AI vision on arbitrary objects

- Object hallucination is a named, benchmarked failure mode. The POPE paper found some models answer "yes" to object-presence questions almost regardless of the image [POPE]; a later study shows models hallucinate when asked to recognise several objects at once [MULTIOBJ]. The idea then asks the model to explain "how it works, how it formed", multiplying the chance of a fluent wrong answer. Under the contest rules a confidently false explanation is "false ... misleading" content.
- Pointing to pixels. In WebXR "there is no way to get to the pixels of the passthrough content" [WEBXR-MR]. Developers report the cameras are reachable through `getUserMedia` as an ordinary camera, without intrinsics or lens parameters [BABYLON-CAM]; the WebXR `camera-access` feature is reported unsupported in immersive-ar (search snippet of a Meta forum thread I could not open [RAWCAM-REQ]). Mapping a fingertip to the right pixel without calibration is unsolved in this stack (inference).
- Capture latency for the native API is listed as 20-40 ms on the current docs page and was 40-60 ms at 30 Hz when it launched [PCA], [PCA-RTVR]; a cloud model adds seconds (inference).
- Precedent cuts both ways: three camera-plus-AI entries won a dedicated award in 2025 [WINNERS25]. That award does not exist this year, and the idea is no longer novel.

### P6: headset in a gym

- Quest 3 safety guide: "Using Meta Quest during some activities may create safety hazards"; activities needing "full, unobstructed or undistorted vision or focused attention" or "coordinated physical movement" are flagged; "Pass-through sensors are not as clear or wide as your natural vision"; "Pass-through may lag behind what is occurring in the physical world"; "Vigorous physical activity can lead to injuries or death, even in apparently healthy people." [Q3-SAFETY]
- Meta's developer guidance: passthrough "is not equivalent to natural human vision. HMDs have limited field of view (FoV) and are not as accurate at representing important visual cues like depth and color." [MR-HEALTH]
- Telling a user how to load and use a machine while their depth perception is degraded is instructional liability with a physical-injury outcome.

### E1 and E2: comfort and feasibility

- E1 cannot restyle the true passthrough view (see P5). The fallback is drawing a processed camera stream on a surface: one camera rather than a correct per-eye view, delayed by capture plus processing. Research on video see-through headsets ties added latency and wrong geometry to discomfort; Google reports that "directly displaying camera feeds causes visual discomfort and cybersickness due to the inaccurate perception of scale and exaggerated motion parallax" [GAP]. A user also loses reliable sight of the real room while wearing it.
- Neural style transfer on every frame at headset refresh rates in a browser on a mobile chip is not credible (inference). As a yardstick, one write-up cites a Google benchmark of about 28 ms per frame for the small Depth Anything V2 model with WebGPU on an M2 laptop [DEPTH-PERF] (secondary source); that is already over a 72 Hz frame budget before any rendering, on a much faster chip. WebGPU in WebXR on the Quest browser is still flagged experimental (v146.0, April 2026) [BROWSER-RN].
- E2: the same cost applies to per-frame depth estimation. Wrong or flickering depth gives the eyes conflicting cues; Meta's guidance on vergence-accommodation conflict applies [DISPLAY] (application to converted video is inference).

### Hand tracking and the game ideas

- Measured accuracy (Quest 2, Behavior Research Methods 2024): "average fingertip positional error of 1.1cm, an average finger joint angle error of 9.6° and an average temporal delay of 45.0 ms" [HT-ACCURACY]. Newer headsets are likely better; I found no equivalent published figure for Quest 3.
- Meta shipped "Hands 2.4" in December 2025 with better fast-motion tracking and native sample scenes for "darts, bowling, frisbee throws, and ball sports" [HANDS24]. This weakens my objection to G1's release detection, but those samples ship with Meta's native interaction toolkit rather than WebXR (inference), and it does not change the tracking-volume or seated-movement problems.
- A1: instrument-quality research found players rated 20 ms and 10 ms ± 3 ms of jitter as worse than zero latency, with 10 ms fixed not significantly different [MUSIC-LAT]. A 45 ms tracking delay plus audio output delay is well past that, so direct "pluck to sound" will feel late. Conducting-style control (shaping tempo, dynamics and texture) tolerates it.
- A5: fingerspelling-recognition work reports confusion among closed-fist letters such as A, M, N, S and T (I relied on a search summary of [FS-CONFUSION], not a full read). Combined with a joint-angle error near 10 degrees and finger occlusion, a tutor will mark correct signs wrong and wrong signs correct.
- E3: auditory self-motion illusions are real but weaker than visual ones [VECTION-AUDIO].

## 4. Legal, policy and privacy exposure

- Health claims: P7 (above); P6 by implication (exercise guidance).
- Instructional liability: P1 (driving), P6 (machine use), P2 (plant care, low stakes), A5 (teaching a language incorrectly).
- Camera privacy: P5, P6 and any camera variant of P2. Meta classes camera images as "Device User Data ... included in our Developer Data Use Policy" [PCA]; reporting on that policy says it prohibits surveillance uses and identifying users [PCA-RTVR]. Sending a judge's room to a third-party model needs disclosure and consent. The demo video must not show any identifiable person other than the entrant.
- Copyright: E2 converts films and reels the user does not own; the contest bans infringing third-party rights. Protected streaming video cannot be read into a canvas (frames return black under Encrypted Media Extensions) [EME], so the idea only works on local or open files. E1's "Ghibli style" names a studio whose trade body (CODA, which counts Studio Ghibli as a member) wrote to OpenAI in 2025 objecting to training on members' works after lookalike output appeared [CODA]; the contest bans "brand names" and "commercial artwork". A visual style alone is generally not protected by copyright (my understanding, not legal advice); the exposure is the name and the judge's reaction to it.
- Maps terms: Google requires "clear Google Maps attribution", forbids obscuring the logo, forbids pre-fetching, caching or offline use, and for 3D tiles requires all attributions shown in a line [GMAPS-POL]. Developers already ask how to square this with immersion in VR [CESIUM-ATTR]. The contest bans corporate logos. Billing is per root-tile request with a small free monthly cap [GMAPS-BILL].
- Clone risk: G4 names a specific commercial game. Genre mechanics are free to use, but copied look and naming are not; the judge-facing risk is the Innovation score, not a lawsuit (inference).
- Generated content: A2's live LLM output must still meet Meta's content guidelines for the declared age rating [RULES]. A generated scene the entrant never saw is still the entrant's content.

## 5. Demo-day failure modes (judge alone, five minutes, one Quest)

- G1, G2, G3: tracking drops at the far end of the gesture (backswing, cheek anchor, paddle past the hip); judge is seated and cannot perform the motion fully.
- G4: missed swipes read as unfair deaths; discomfort within a minute for sensitive users.
- G5: few failure modes if junction-hop movement is used. Risk is the judge forgetting it.
- E1: camera permission prompt, then a laggy flat picture. E2: "choose a video" with nothing on the device.
- E3: judge has no headphones and is in a shared office; closing eyes while a colleague is nearby is awkward.
- P1: nausea; arms tire holding a wheel. P2: a wall of text. P3: nausea in the fall sequence; blank exhibit if the web data call fails.
- P4: tiles load slowly or the quota or key fails; ground-level photogrammetry looks melted (inference; I could not open the review I wanted to cite).
- P5: permission prompt; three to six second waits (inference); a wrong identification of the judge's keyboard ends the session. P6: no gym.
- P7: works, and the judge reads a calorie claim they know is false.
- A1: none structural (no network, no room, no second player). Risk is that five minutes of unguided play sounds aimless.
- A2: API quota, cold-start latency, an off-tone or off-policy generation, microphone prompt.
- A3: nobody to invite. A4: empty first state, room-setup prompt, nothing "daily" to see.
- A5: correct sign marked wrong. A6: content ends in four minutes (acceptable) or runs long and the judge quits before the payoff.
- A7: the judge is stuck on clue two with no hint system. A8: nothing to plan and no way to type. A9: reads like a PDF.
- Field of view: any idea that puts key UI outside the central region loses marks on the Glasses; the criteria name "FoV-aware design" twice [RULES].

## 6. Hidden scope (one mechanic that is really several)

- G3: water rendering, raft physics, paddle-stroke recognition, river authoring, comfort system.
- G4: procedural track, obstacle set, three gesture recognisers, difficulty curve, art for a full environment.
- G5: maze generator, movement, jump-peek camera, marker placement and removal, level progression. Small but real.
- E1: camera capture, style model, stereo presentation, safety fallback. E2: decoder, depth model, temporal smoothing, hole filling, stereo player, file picker.
- P1: vehicle physics, road network, traffic, lesson scripting, scoring, AI car generator. P3: four separate exhibits and a data service.
- P5: camera, pointing calibration, vision model, explanation generation, speech, caching, privacy flow. P6: the same plus exercise content and a fitness scene.
- A2: narrative state machine, LLM orchestration and guardrails, diorama scene assembly, dice physics, speech in and out.
- A3: flick physics tuning, AI opponent, rules engine, and for multiplayer: signalling server, state sync, reconnection.
- A4: token physics, persistence, anchors, time logic, text entry. A7: case authoring format, evidence models, clue-link logic, board UI, hint system, writing.
- A8: capture, card layout, persistence, phone export, link service. A6 and A9: the hidden scope is art, not code.

## 7. The five I could not kill

1. A1. Named in the track text ("music visualization"), needs no network, room, second player or authored story, and is hands-first by nature. My objections (latency, fatigue, three music winners in 2025) shape the design but do not stop it.
2. A6. Clear first-five-minutes shape and no technical dependency. The weaknesses are art workload and low replay value.
3. A3, once it is playable alone. Pinch-pull physics is a proven, satisfying single mechanic (Tiny Golf won on it). As written, the "duel by link" framing fails the lone-judge test.
4. A7, once "daily" is dropped. It fits the narrative gap Meta itself named (per the brief's account of Meta's GDC 2026 talk) and uses hands for something meaningful. The risk is writing and scope, not rules or science.
5. G5. Nothing in the rules, science or demo conditions breaks it. I could not kill it, but I also could not find the reason a judge would remember it.

Next in line: A4. It has the emptiest field (no Productivity titles announced, per the brief) and the track text describes it almost exactly, but its value shows only on day two and it depends on passthrough features the entrant cannot test yet.

## 8. The five I consider dead (plus two more that are fatal as written)

1. P6. Untestable by a seated judge, the opposite of the seated guideline, and against the grain of Meta's own safety warnings.
2. E1. The platform does not expose the pixels the idea needs; the named style is someone else's brand; there is no interaction.
3. P4. Fails the take-it-away test completely, duplicates three shipping apps, and Google's logo requirement collides with the contest's logo ban.
4. P7. One premise is false and the other is the claim regulators have already penalised. The entrant asked for evidence; the evidence says no.
5. P1. An instructional claim that cannot be honoured hands-only, in the genre most associated with simulator sickness, with a generative-vehicle feature that is its own project.

Also fatal as written: E2 (Meta ships the feature; no content the judge can lawfully and practically use) and P2 (a text-and-pictures reference app with unreliable advice). Each has a salvage path, but the salvaged version is a different idea and should be scored as a new entry.

## 9. Where I expect pushback, and what would change my mind

- "AI is rewarded this year" (A2, P5). True: the Agentic award names "context-aware assistance". I would move A2 to survivable if it plays end to end offline and the model only decorates. I would move P5 up only after a real-device test shows camera access, pointing accuracy and response time are acceptable.
- "E1 can be done with a shader on the camera feed, or with the room mesh." The first is flat, delayed and uncomfortable; the second is a 2025 winner's concept. Evidence of a stereo-correct, low-latency stylised view in the Quest browser would change my verdict.
- "E2 is literally spatial cinema." The category fits; the feature is already in the operating system's own app. A defence needs a reason a judge would prefer this to what Meta built.
- "P7 is fine if you remove the claims." Agreed, and then it is a puzzle game that should be compared with G5 and A7, not scored as P7.
- "Lap dioramas hurt the eyes and necks" (A2, A3, A6). Pocket Lands won anyway. I hold this as a placement constraint only.
- "Bowling and archery work; Meta ships hand-tracked throwing samples." The samples exist for native engines. My objection is the seated guideline, the tracking volume at the ends of the gesture, and the innovation score.
- "A4 deserves more because the Productivity field is empty." Possibly. My doubt is whether a habit can be judged in five minutes and whether passthrough quality can be reached without a device until late in the build.
- "P3 could take Boldest Original Concept on real-world scale." It could if cut to one mechanic and the physics is checked by someone qualified.

## 10. What I could not verify

- Whether `SpeechRecognition` is still missing from the Quest browser in late 2026 (forum threads returned HTTP 403; evidence is older developer reports).
- Resolution, frame rate and latency of the camera stream as exposed to web pages; figures cited are for the native API.
- Which devices judges will use, and whether any of this camera or speech behaviour differs on the VR Glasses.
- wilds.ai (my search found nothing; I rely on the brief) and the current store status of the Google-tiles apps.
- The Depth Anything timing comes from a secondary blog citing a Google benchmark.
- The fingerspelling confusion statement comes from a search summary, not a full reading of the paper.

## Sources

- [RULES] https://start-developer-competition-26.devpost.com/rules
- [WINNERS25] https://developers.meta.com/horizon/blog/meta-horizon-start-developer-competition-meet-the-winners/
- [HANDS-LIM] https://developers.meta.com/horizon/design/hands-limitations-mitigations/
- [HANDS-BP] https://developers.meta.com/horizon/design/hands-best-practices/
- [HANDS24] https://roadtovr.com/?p=223679 (Road to VR, 17 Dec 2025)
- [LOCO] https://developers.meta.com/horizon/design/locomotion-comfort-usability/
- [DISPLAY] https://developers.meta.com/vr/design/display/
- [MR-HEALTH] https://developers.meta.com/horizon/design/mr-health-passthrough/
- [Q3-SAFETY] https://www.meta.com/legal/quest/health-and-safety-warnings/quest-3/
- [CONTENT-GL] https://developers.meta.com/horizon/policy/content-guidelines/
- [WEBXR-MR] https://developers.meta.com/horizon/documentation/web/webxr-mixed-reality/
- [BABYLON-CAM] https://forum.babylonjs.com/t/webxr-camera-passthrough-support/58274
- [RAWCAM-REQ] https://communityforums.atmeta.com/discussions/Questions_Discussions/request-webxr-raw-camera-access-camera-access-feature-in-quest-browser/1367463 (search snippet only)
- [PCA] https://developers.meta.com/horizon/documentation/unity/unity-pca-overview/
- [PCA-RTVR] https://roadtovr.com/meta-quest-passthrough-camera-api-public-publish-horizon-store/
- [BROWSER-RN] https://developers.meta.com/horizon/release-notes/web/
- [SPEECH] https://communityforums.atmeta.com/discussions/dev-quest/speechrecognition-in-webxr/1168273 ; https://communityforums.atmeta.com/discussions/dev-general/speech-to-text-library-react-speech-recognition-not-working-in-oculus-quest-2-br/1188891 ; https://forum.babylonjs.com/t/voice-recognition-with-web-speech-api/41911 (search snippets; pages not opened)
- [SCIAM] https://www.scientificamerican.com/article/thinking-hard-calories
- [RAICHLE-5PCT] https://pmc.ncbi.nlm.nih.gov/articles/PMC1157105 (search summary of Raichle lab work) ; https://www.livescience.com/21788-thinking-hard-calories.html
- [QUANTA] https://www.quantamagazine.org/how-much-energy-does-it-take-to-think-20250604/
- [CHESS] https://statmodeling.stat.columbia.edu/2025/06/30/its-sapolsky-time-about-that-bogus-claim-that-chess-grandmasters-burn-6000-calories-per-day/ ; https://blackdotresearch.sg/does-high-level-chess-really-burn-calories-at-an-athletic-rate/
- [SIMONS] https://www.psychologicalscience.org/publications/brain-training.html
- [OWEN] https://www.nature.com/articles/nature09042 (facts taken from the summary at https://mdedge.com/content/brain-exercises-fail-increase-cognitive-power)
- [STANFORD] https://longevity.stanford.edu/a-consensus-on-the-brain-training-industry-from-the-scientific-community/
- [FTC-LUMOS] https://ftc.gov/news-events/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges
- [FTC-GUIDE] https://www.cov.com/en/news-and-insights/insights/2023/01/ftc-issues-new-guidance-on-health-related-claims-to-replace-the-dietary-supplements-advertising-guide
- [DRIVE-REVIEW] https://www.mdpi.com/2076-3417/13/9/5266 (search summary; full text not opened)
- [DRIVE-HMD] https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.647723
- [HT-REVIEW] https://arxiv.org/pdf/2103.14853
- [HT-ACCURACY] https://research.birmingham.ac.uk/en/publications/a-methodological-framework-to-assess-the-accuracy-of-virtual-real
- [MUSIC-LAT] https://qmro.qmul.ac.uk/xmlui/bitstream/handle/123456789/44614/Jack%20Action-sound%20Latency%202018%20Accepted.pdf?sequence=1 ; https://nime.org/proc/mcpherson2016
- [FS-CONFUSION] https://arxiv.org/pdf/2408.09311
- [ATLANTIC] https://www.theatlantic.com/technology/archive/2017/11/why-sign-language-gloves-dont-help-deaf-people/545441/
- [VECTION-AUDIO] https://research.chalmers.se/en/publication/114917
- [LLM-AG] https://doi.org/10.1038/s43016-023-00867-x
- [LLM-AG2] https://ambrook.com/blog/chatgpt-risks-and-rewards-for-farmers
- [LLM-AG3] https://growiwm.org/battle-of-the-bots-ai-takes-on-weed-management-questions/
- [POPE] https://deepai.org/publication/evaluating-object-hallucination-in-large-vision-language-models
- [MULTIOBJ] https://www.arxiv.org/pdf/2407.06192v1
- [SPAGHETTI] https://www.astronomy.com/science/ask-astro-why-are-small-black-holes-more-dangerous-than-big-ones/
- [SPAGHETTI2] https://en.wikipedia.org/wiki/Spaghettification
- [GMAPS-POL] https://developers.google.com/maps/documentation/tile/policies
- [GMAPS-BILL] https://developers.google.com/maps/documentation/tile/usage-and-billing
- [CESIUM-ATTR] https://community.cesium.com/t/best-practice-for-google-3d-tiles-attribution-in-a-pcvr-app-to-maintain-immersion/46272
- [GEARTH-APPS] https://heise.de/-10451589 ; https://roadtovr.com/google-earth-vr-fly-meta-quest-apple-vision-pro/
- [UPLOADVR-3D] https://www.uploadvr.com/quest-instagram-app-now-ai-converts-videos-to-3d-too/ (4 Aug 2025)
- [EME] https://lists.w3.org/Archives/Public/public-html-media/2013May/0079.html (search summary)
- [CODA] https://terms.law/2025/11/06/studio-ghibli-coda-and-sora-2-how-to-run-a-coalition-demand-letter-against-an-ai-giant/ ; https://gulfnews.com/technology/media/studio-ghibli-backed-group-urge-openai-to-halt-ai-training-on-their-content-1.500332787
- [GAP] https://research.google/blog/mind-the-gap-geometry-aware-passthrough-mitigates-cybersickness/
- [DEPTH-PERF] https://essamamdani.com/blog/litert-js-google-webgpu-browser-ai-july-2026 (secondary)
