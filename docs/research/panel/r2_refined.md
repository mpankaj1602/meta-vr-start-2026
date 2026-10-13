# Round 2 — canonical list of refined and new entries (designer)

Fourteen entries are live; five are withdrawn. This file is self-contained: score from it without reading round one.

| ID | Name | Derived from | Track | Target special award | One-sentence pitch | Status |
|---|---|---|---|---|---|---|
| A4-R | Three Stones | A4, A8 | Productivity | Best Reason to Come Back | Each morning set three stones for the day on your real desk; drop each into the water bowl when it is done and watch the pile grow. | revised |
| P7-R | Pocket Palace | P7 | Productivity (may be reassigned to Gaming) | Best Reason to Come Back | Place ten objects around a small house, put them back from memory, and get asked about them again tomorrow. | revised |
| G5-R | Lantern | G5 | Gaming (puzzle) | Best Reason to Come Back | A date-seeded fogged maze on a tabletop, with three lifts above the walls and five removable arrows. | revised |
| N1 | Hush | E3 plus a new game idea | Gaming (casual) | Boldest Original Concept | Creatures creep toward you only while unlit; you hear where they are and freeze them with a torch held in your hand. | revised |
| A7-R | Paper Trail | A7 | Gaming (narrative) | Best First Five Minutes | A cozy detective game made of paper: lift the details that matter and slot them into the statement. | revised |
| N2 | Alibi | A7, P7 | Gaming (puzzle) | Best Reason to Come Back | A daily deduction puzzle: move five figures between five rooms until every clue card is true. | new |
| E3-R | Close Your Eyes | E3 | Entertainment | Best Accessibility Forward Experience | A six-minute wind-down playable without sight: catch a note in your open palm and pour it into a bowl of sound. | revised |
| A1-R | Strand | A1 | Entertainment | Best First Five Minutes | A generative piece that plays by itself until you pinch and pull a strand to add your own accents. | new (reinstated) |
| N3 | Snip | market gap; A6 | Productivity (creative tool; may be reassigned) | Best First Five Minutes | Cut folded paper with a pinch, pull it open to reveal a symmetric papercut, and hang it on your real wall. | new |
| P3-R | Perigee | P3 | Gaming (puzzle) | Best First Five Minutes | Sling a probe around planets using real gravity, ending at a black hole that stretches your own hand. | revised |
| A6-R | Paper Theatre | A6, A9 | Entertainment | Best First Five Minutes | A five-scene paper theatre built from a public-domain 1905 dream comic, each scene worked by one paper mechanism. | revised |
| A3-R | Your Move | A3, G1 | Gaming (casual) | Best Social & Multiplayer (low odds) | A flick-disc trick-shot ladder you can also play against a friend's phone by trading four-character shot codes. | revised |
| A2-R | The Room Rolls | A2 | Gaming | Best Agentic Interaction | A seven-minute dice adventure that runs offline, with a hosted model directing the room when it is reachable. | revised |
| P5-R | Curio | P5 | Gaming (casual) | Best First Five Minutes (weak) | Turn an unlabelled museum object in front of you and work out what it is from five clues. | revised |
| P6-R | Loosen | P6, A5 | — | — | Two-minute tracked hand and neck reset. | withdrawn |
| A9-R | Slumberland, Nightly | A9 | — | — | Nightly public-domain comic page in depth. | withdrawn (folded into A6-R) |
| G2-R | Stillbow | G2 | — | — | Slow archery aimed by eye. | withdrawn |
| E2-R | Open Frame | E2, E1 | — | — | Daily painting pulled into layers. | withdrawn |
| P1-R | Hazard Eyes | P1 | — | — | Pinch when you spot the hazard. | withdrawn |

## Conventions that apply to every spec

These answer critiques that hit several entries, so I state them once.

- **Pointing.** "Point and pinch" means the system pointer plus a pinch. The pointer is gaze on the Glasses and a head or hand ray on Quest 3/3S. No entry uses hover, dwell or gaze data; selectable things are always visibly marked.
- **Distance.** Tabletop objects are drawn 0.6-0.8 m away and 20-35° below eye line, at most 40 cm wide (about 30°). Nothing sits literally in the lap. This follows Meta's 0.5 m minimum for fixated objects, raised by the skeptic. Selection is indirect, so nothing has to be within reach.
- **Hand zone.** Hands work wherever the tracker sees them below chest height, with forearms on an armrest, tray or thighs. Thigh-level tracking on Quest is unverified (engineer's day-one check 6).
- **Placement.** Objects float at a default spot. Snapping to a real surface uses hit test, which needs no room scan. No entry requires plane detection or room setup.
- **Hosting.** Static files only unless a spec says otherwise. Progress is kept in local storage, which is lost in private mode.
- **"Daily".** Daily means a puzzle generated on the device from the date. It needs no authored content and no server. Every daily entry includes a "this week" archive so a judge sees progression in one sitting.
- **Claims.** No entry makes a health, calorie or cognitive-improvement claim.
- **Take-it-away test.** Every entry except A2-R uses no third-party service at run time, so the test is passed by construction.

## Specs

### A4-R — Three Stones
- **Round-2 change (revised, and rated higher than in round one):** named the object and the moment; added the bowl drop, a seven-day preview, preset stones plus the system keyboard, and placement without a room scan. Phone link dropped. Driven by the judge (week-in-a-minute, no third-party device), the engineer ("one memorable physical interaction") and the skeptic (day-two preview, preset tokens).
- **Mechanic:** set three stones in the tray's hollows each morning; when one is done, drop it in the water bowl, where it settles and the pile grows.
- **Hands:** point and pinch a stone, pinch a hollow; pinch-drag a stone over the bowl and let go. A few centimetres of movement.
- **Tests:** tray 35 cm wide at 0.7 m. A visit is 60-90 seconds and resumes as left.
- **Platform:** passthrough, hit test, one persistent anchor, system keyboard. All confirmed by the engineer.
- **Online:** static.
- **Assets:** procedural stones and water; an Apache- or MIT-licensed icon set for stone glyphs (licence to be recorded).
- **Cut:** voice, calendar sync, reminders, phone hand-off, more than one tray.
- **Biggest risk:** it is slight. A judge finishes in three minutes, and a phone list is faster; the seven-day preview has to carry "visible growth".

### P7-R — Pocket Palace
- **Round-2 change (revised):** the only claim left is "you will remember this list", which the session itself tests. House moved from the lap to 0.7 m. The daily ten is drawn by date from a fixed pool. Week archive added. Driven by the skeptic (claims, near-field comfort, daily scope).
- **Mechanic:** place ten objects at ten spots in a small house, then put them back from memory. Tomorrow opens with a question about today's house.
- **Hands:** point and pinch a lit spot to place; to recall, pinch an object, then pinch its spot.
- **Tests:** house 35 cm at 0.7 m. A round is 4 minutes and is saved after every item.
- **Platform:** pointer, pinch, passthrough, optional hit-test placement. All confirmed.
- **Online:** static.
- **Assets:** Kenney and Quaternius kits (CC0); Fluent Emoji (MIT) as fallback objects.
- **Cut:** typed lists, voice, first-person walking, multiplayer. A "My Day" deck picked from an icon shelf stays, because it is what ties the entry to Productivity.
- **Biggest risk:** reassignment to Gaming. Also, the studies used environments people moved through; that a house viewed from outside works as well is my inference.

### G5-R — Lantern
- **Round-2 change (revised):** maze moved to 0.7 m; a string of lit lanterns records solved days; week archive; optional phone "navigator" map with no server. Driven by the skeptic (needs one hook), the judge (junction moves, scarce peek) and the market analyst (headset-plus-phone gap).
- **Mechanic:** step through a fogged maze by pinching the next lit junction. Three lifts raise you above the walls for three seconds. Five arrows can be dropped and picked up.
- **Hands:** pinch to step; pinch-and-hold to lift.
- **Tests:** maze 30 cm at 0.7 m. A maze takes 3-6 minutes and is saved every step.
- **Optional co-op:** a friend opens a static map page on a phone and enters the day's three-word code. They see the walls but not you, and guide you by voice. Never required; cut first if late.
- **Platform:** pointer and pinch, confirmed. Fully testable in the emulator.
- **Online:** static.
- **Assets:** procedural.
- **Cut:** first-person view, enemies, multiple floors.
- **Biggest risk:** mazes are familiar, and the market analyst found three hand-tracked maze products already.

### N1 — Hush
- **Round-2 change (revised):** the beam is now a torch held in your hand, not steered by head or gaze. Creatures stay on one frontal arc, so only left-right hearing is needed. Edge ripples are on by default at level one. Driven by the engineer (gaze untestable, generic spatial audio), the judge (hands-first was thin) and the skeptic (no headphones).
- **Mechanic:** creatures creep toward your lamp only while unlit. Point the torch to freeze one; pinch to flash it back.
- **Hands:** forearm rests on an armrest or tray; the wrist sweeps the beam about 35° each way; the same hand pinches. A head-aimed beam is an option for limited hand mobility.
- **Tests:** creatures at 1-1.5 m inside the central view. A round is 3 minutes; lowering the hand pauses.
- **Platform:** hand ray, pinch, positional audio. All confirmed.
- **Online:** static.
- **Assets:** procedural creatures; footsteps self-recorded or CC0.
- **Cut:** story, levels, more than three creature types, passthrough placement.
- **Biggest risk:** fun is unproven until prototyped. A phone with a gyroscope could imitate part of it, which weakens the Boldest claim.

### A7-R — Paper Trail
- **Round-2 change (revised):** the "daily docket" is gone. It is now a 90-second tutorial case plus two authored cozy cases, with built-in hints, flippable papers and larger type. Award target moved from Reason to Come Back to First Five Minutes. Driven by the skeptic and engineer (daily cases are a content treadmill; "stuck on clue two") and the judge (keep it cozy).
- **Mechanic:** notice, lift, slot. Each paper has at most five underlined details. Pinch one to lift it as a word chip; pinch a blank in the statement to place it.
- **Hands:** point and pinch; pinch-drag sideways flips a paper.
- **Tests:** papers at 0.8-1 m, at most 40 words each. A case is 6-8 minutes, saved per chip.
- **Platform:** pointer, pinch, distance grab. Confirmed. Text legibility on Quest 3 needs a device check.
- **Online:** static.
- **Assets:** documents typeset by the entrant in SIL Open Font Licence fonts; two or three CC0 props per case; own foley.
- **Cut:** daily cases, voice, faces (silhouettes only), a pin board, any crime beyond a missing pie.
- **Biggest risk:** the writing is the product, and Gaming is the most crowded track.

### N2 — Alibi (new)
- **Why it is here:** it answers the skeptic's objection to A7's daily cases with a generator instead of an author, and the market analyst's finding that daily-seed spatial puzzles are thinly supplied.
- **Mechanic:** move five figures between five rooms of a small house until every clue card is true, then ring the bell.
- **Generation:** made on the device from the date; a solver guarantees exactly one solution. No language model.
- **Hands:** pinch a figure, pinch a room. Clue cards of at most 12 words turn over when satisfied.
- **Tests:** house 35 cm at 0.7 m. A case is 3-5 minutes, saved per move.
- **Platform:** pointer and pinch, confirmed. Fully testable in the emulator.
- **Online:** static.
- **Assets:** CC0 kit house and figures; clue templates written by the entrant. Cozy themes only (who finished the biscuits).
- **Cut:** authored stories, dialogue, more than one house.
- **Biggest risk:** template clues can feel dry, and a logic grid plays as well on paper, so the innovation case rests on tactile arrangement alone.

### E3-R — Close Your Eyes
- **Round-2 change (revised):** no longer absorbs A1. Hands may be anywhere the tracker sees them, and a soft hiss tells you when tracking is lost. Visual mode is the default for judges, with a high-contrast option. Driven by the skeptic (thigh tracking, "works on a phone", no headphones) and the judge (sight-free onboarding).
- **Mechanic:** a note lands in your open palm; tilt the palm to pour it into the bowl, where it joins the chord. Six minutes, ending in silence.
- **Hands:** either hand, palm up, forearm supported. No pinch, no precision, one hand is enough.
- **Tests:** everything within forearm reach. Turning both palms down pauses.
- **Platform:** hand joints and positional audio. Confirmed, and fully testable on a desktop with headphones.
- **Online:** static.
- **Assets:** synthesised tones; spoken onboarding recorded by the entrant.
- **Cut:** menus, instruments, recording, voice control (no speech API).
- **Biggest risk:** it cannot be tested with blind players in six weeks, and launching a URL still needs sight. It is also hard to show in a video.

### A1-R — Strand (reinstated)
- **Why it is back:** the judge, engineer and skeptic each scored A1 at Win 6.
- **Changes from A1:** no conducting. Plucks land on the next beat, which hides tracking delay (the skeptic's latency evidence). The piece carries on when you stop (the judge's lean-back point).
- **Mechanic:** a generative piece plays by itself. Pinch and pull any strand to add an accent; hold and move to bend its tone.
- **Hands:** point, pinch, pull a few centimetres, release.
- **Tests:** strands 40 cm wide at 0.7 m. A piece is 3-5 minutes and stops or resumes on the bar.
- **Platform:** pinch-drag and Web Audio, confirmed. Output latency is unmeasured (engineer's check 4).
- **Online:** static. Your eight-bar pattern is stored in the page address.
- **Assets:** synthesised sound only.
- **Cut:** samples, recording, extra instruments, multiplayer.
- **Biggest risk:** this is the most crowded hands genre (Maestro, Blooming Conductor, four music winners in 2025), and sounding good takes musical skill.

### N3 — Snip (new)
- **Why it is here:** the market analyst found no lap-scale creative tool with a shareable result, and the Productivity track names "creative tools".
- **Mechanic:** the paper folds itself; draw cuts with a pinch; pull it open to reveal the symmetric papercut; hang it.
- **Hands:** pinch-drag to cut (symmetry makes sloppy lines look good); pinch and pull to unfold; point and pinch to hang on a wall or in the air.
- **Tests:** paper 25 cm at 0.6 m. One piece takes 60-90 seconds and is saved after each cut.
- **Platform:** pinch-drag, passthrough, hit test, one persistent anchor. All confirmed.
- **Online:** static. Each piece is stored in the page address and opens on a phone.
- **Assets:** procedural paper; polygon-clipping and triangulation libraries (permissive licences, to be verified).
- **Cut:** colour mixing, free folding, text, galleries.
- **Biggest risk:** it may read as a toy and be reassigned out of Productivity. Getting a link out of the headset is unverified.

### P3-R — Perigee
- **Round-2 change (revised):** the daily claim is dropped; it ships 24 levels checked at build time. The black-hole level takes the judge's image: your own hand stretches as it nears the hole, labelled as exaggerated. Driven by the judge, the skeptic (physics honesty, vection) and the engineer (no ray-marched lensing).
- **Mechanic:** pinch, pull, release a probe; planets bend its path to the beacon.
- **Hands:** a pull of a few centimetres.
- **Tests:** system 40 cm across at 0.7 m; the camera never moves. A level is 1-2 minutes.
- **Platform:** pinch-drag, confirmed. Joint transforms are confirmed; drawing a stretched hand from them is my inference.
- **Online:** static.
- **Assets:** procedural spheres and trails; own integrator.
- **Cut:** web data, falling sequences, free roam, lensing.
- **Biggest risk:** it shares its verb with last year's Tiny Golf.

### A6-R — Paper Theatre
- **Round-2 change (revised):** absorbs A9-R. Art now comes from public-domain 1905-06 Little Nemo pages (the judge notes the rules permit public-domain work). Raised to 0.7 m. Five scenes, not six. Driven by the judge, the skeptic (0.5 m minimum) and the engineer (art budget).
- **Mechanic:** one paper mechanism per scene: pull a tab, turn a wheel, lift a flap.
- **Hands:** point at the tab, pinch-drag a few centimetres.
- **Tests:** theatre 40 cm at 0.7 m. The whole tale is 5-6 minutes and resumes at the scene.
- **Platform:** constrained pinch-drag, confirmed. Layered cut-outs carry some overdraw risk.
- **Online:** static.
- **Assets:** Winsor McCay's first-run pages (public domain), cut into layers and in-painted by the entrant; captions and own narration.
- **Cut:** page turning, choices, animation beyond hinges and slides.
- **Biggest risk:** little reason to return, and judges may see old art as repackaging. Later strips include a racist caricature (my recollection), so each page needs checking.

### A3-R — Your Move
- **Round-2 change (revised):** a solo trick-shot ladder is now the core. Link play becomes four-character shot codes with my own fixed-step disc physics and no server. Driven by the judge and skeptic (lone judge, frozen backend) and the engineer (a shot is a few numbers).
- **Mechanic:** pinch, pull back, release a disc.
- **Hands:** a pull of a few centimetres.
- **Tests:** board 35 cm at 0.7 m. A rung is 30-60 seconds, saved per shot.
- **Optional duel:** after a shot the game shows a four-character code. A friend enters it on the same site on a phone, sees the shot and replies with theirs.
- **Platform:** pinch-drag, confirmed. Identical results across devices from fixed-step physics is my inference and must be tested.
- **Online:** static.
- **Assets:** procedural.
- **Cut:** live netcode, lobbies, Havok, game variants.
- **Biggest risk:** it reads as Tiny Golf's cousin, and codes are clumsy next to live presence.

### A2-R — The Room Rolls
- **Round-2 change (revised):** it now plays end to end offline from an authored event deck and a seeded room generator. A hosted model, when reachable, directs through the same tools. Voice removed. Driven by the skeptic (take-it-away test, frozen submission), the judge (authored skeleton) and the engineer (no speech API).
- **Mechanic:** choose one of three actions, then roll dice by hand.
- **Hands:** pinch a choice; grab the dice and tip them out.
- **Tests:** diorama 35 cm at 0.7 m. One room is 5-7 minutes, saved per beat. Remove the model and the game still runs.
- **Platform:** grab and Havok, confirmed. A hosted model through a proxy is available.
- **Online:** static site plus an optional proxy; a failed call falls back silently.
- **Assets:** CC0 dungeon kits.
- **Cut:** voice, free text, combat systems, campaigns.
- **Biggest risk:** two game masters to build. If the model is optional, judges may not see "AI as a core part"; wilds.ai launches this month.

### P5-R — Curio
- **Round-2 change (revised):** "daily" removed. Twelve objects and a cabinet that fills; no camera, no model. This is the skeptic's own fix for P5. Driven by the skeptic, the engineer (camera access unconfirmed) and the market analyst (camera-plus-AI is a platform feature).
- **Mechanic:** turn an unlabelled museum object, pinch up to five marked features for clues, then answer what it is and how it was made.
- **Hands:** pinch-drag anywhere to rotate; point and pinch a marker.
- **Tests:** object 25 cm at 0.7 m. Each takes 3-4 minutes, saved per clue.
- **Platform:** confirmed. Scans must be decimated to fit the triangle budget.
- **Online:** static.
- **Assets:** Smithsonian Open Access 3D scans (CC0); clue text written from the museum record; no museum branding.
- **Cut:** live questions, touching real things.
- **Biggest risk:** it reads as a model viewer, and twelve objects is thin.

## Withdrawn

- **P6-R Loosen.** The skeptic's accuracy evidence (about 10° joint-angle error, closed fists occluded) means the app would mark correct poses wrong. Meta's content guidelines also bar health-related claims, and track fit was weak.
- **A9-R Slumberland, Nightly.** Hands only advance pages (skeptic, engineer). Its public-domain art moves into A6-R.
- **G2-R Stillbow.** Its one distinctive feature, aiming by eye, cannot be tested or seen on Quest 3/3S (engineer, judge). What remains is a Tiny Golf follow-on.
- **E2-R Open Frame.** Horizon OS already turns photos into 3D (market analyst, judge). An authored version gives the hands little to do.
- **P1-R Hazard Eyes.** It relied on knowing where the player looked at the pinch. On Quest that is a head or hand ray, so the core check is not valid. Content load and motion discomfort remain.

## Disagreements

1. **P7-R is not "a generic daily puzzle" (with the skeptic).** The studies the skeptic cites (Simons 2016, Owen 2010) are about transfer from brain games to untrained tasks. P7-R claims no transfer. The method of loci is a memorising strategy with evidence for the material memorised (Legge 2012; Krokos 2019), and the player's own recall score is the proof. I accept that every "sharper" and calorie word must go, and it has.
2. **P7-R against A4-R for the top Productivity slot (with the judge, engineer and market analyst).** I rated A4 too low in round one and have raised it. I still hold P7-R at least level. The judge's own caveat is that "a judge cannot feel a habit in one sitting". P7-R gives a result inside the session; A4-R gives a pleasant 90 seconds and a preview.
3. **Date-seeded puzzles are not a scope trap (with the skeptic).** The objection is right for authored content, and I removed "daily" from A7-R, P5-R and P3-R. It does not apply to G5-R, N2 or P7-R, where the day's puzzle is generated on the device. The market analyst found only a word game and a Wordle port doing "daily" on Quest.
4. **Hands in the lap (with the skeptic).** I accept the 0.5 m rule and moved every object. I do not accept that lap-resting hands are ruled out for the target device. Meta's page says the tracking volume "varies depending on the hardware" and "exceeds the display field of view". Engadget's hands-on with the Glasses reports: "I was able to keep my hands in my lap." On Quest it is a day-one check.
5. **A1 is not a Win 6 (with the judge and engineer; I side with the market analyst).** I reinstated A1-R because three roles asked for it. The market evidence is that this is the most crowded hands genre, with a direct rival released in August 2026.
6. **P3 as a guided fall (with the judge).** A fall is sustained vertical motion, which the skeptic flags, and it is a one-time demo. I kept the puzzle and took only the stretching-hand image.
7. **A2-R and the Agentic award (with the skeptic).** "Model as optional narration" fails the award's wording, "AI as a core part of the experience". My version makes the model the director when reachable. I am not confident this satisfies both tests at once.

## Critiques that land and that I cannot answer

- **Media companion gap.** I have no honest design. A companion needs media; public-domain films show identifiable people, which the rules bar; a web page cannot overlay another app.
- **Gaze cannot be shown.** Judges on Quest 3/3S will see a head or hand ray. No entry can demonstrate eye targeting before the deadline.
- **Special-award pools.** They are open to both divisions, and Reason to Come Back and Social & Multiplayer favour established titles. My award targets are weaker than round one implied.
- **A4-R against a phone.** A phone list is faster. The case rests on ritual and a persistent anchor.
- **Hover.** Unresolved between the brief, the IWSDK guide and Meta's 2D-web doc. Nothing here depends on it.

## Designer's own scores and current pick

For the moderator; other roles should score independently.

| ID | Win | Feasibility | Difficulty |
|---|---|---|---|
| P7-R | 6 | 4 | 3 |
| A4-R | 6 | 4 | 2 |
| G5-R | 5 | 5 | 2 |
| N1 | 5 | 4 | 3 |
| N2 | 5 | 4 | 3 |
| N3 | 5 | 4 | 2 |
| E3-R | 5 | 4 | 3 |
| A1-R | 5 | 4 | 3 |
| A7-R | 5 | 3 | 3 |
| P3-R | 5 | 4 | 3 |
| A6-R | 5 | 3 | 4 |
| A3-R | 4 | 4 | 3 |
| A2-R | 4 | 3 | 4 |
| P5-R | 4 | 3 | 3 |

Current pick: **P7-R**, with **A4-R** as the lower-variance alternative if the panel judges that a memory trainer will be reassigned out of Productivity.

## Sources

- Special award definitions (re-read by me): https://start-developer-competition-26.devpost.com/details/special-awards
- Rules, take-it-away test and frozen submissions (via the judge's and skeptic's reports): https://start-developer-competition-26.devpost.com/rules
- 0.5 m and 1 m distances (re-read by me): https://developers.meta.com/vr/design/display/
- Hand-tracking volume (re-read by me): https://developers.meta.com/horizon/design/hands-limitations-mitigations/
- Hands in the lap on the Glasses (re-read by me): https://engadget.com/2267222/meta-vr-glasses-hands-on-hand-tracking
- Hit test without a room scan, anchors, system keyboard, speech, camera and audio status: the engineer's round-one platform table.
- Tracking accuracy and latency figures: https://research.birmingham.ac.uk/en/publications/a-methodological-framework-to-assess-the-accuracy-of-virtual-real (via the skeptic's report)
- Memory evidence: https://www.psych.ualberta.ca/~cml/papers/LeggEtal2012.pdf and https://obj.umiacs.umd.edu/virtual_reality_study/10.1007-s10055-018-0346-3.pdf
- Brain-training reviews the skeptic cites: https://www.psychologicalscience.org/publications/brain-training.html and https://www.nature.com/articles/nature09042
- Assets: Smithsonian CC0 3D https://3d.si.edu/collections/openaccesshighlights ; Kenney CC0 https://defold.com/assets/kenney ; Fluent Emoji MIT https://emojifyi.com/glossary/microsoft-fluent-emoji/ ; Little Nemo public-domain status https://www.comicbooktreasury.com/little-nemo-in-slumberland-winsor-mccay/
- Competing titles and gaps: the market analyst's round-one report and its source list.
