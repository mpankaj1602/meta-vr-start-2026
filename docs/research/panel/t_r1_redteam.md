## Audio finding re-examined

**Verdict.** The user is right that the panel overstated: the browser renders height and behind, most listeners cope with generic rendering, and head movement largely removes front-back errors; "cannot be heard" and my "reliably only left/right" were too strong, and cutting jump and duck was over-cautious. The user overstates too: up/down and front/back are not "no different" from left/right; they rest on outer-ear cues that vary between people, fail for a minority, need time and head rotation, and degrade on open speakers. Jump versus duck is safe in a reaction game only with redundant coding (pitch and timbre plus rendered elevation); direction alone, as S2 specifies, is not.

Evidence (read unless marked):
- **For the user.** Chromium's panner holds kernels from -45° to 90° elevation in 15° steps ([CHROMIUM](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/blink/renderer/platform/audio/hrtf_database.cc)). With another person's HRTFs, localisation was "quite accurate" for "12 out of 16 subjects" once confusions were resolved ([WENZEL](https://ntrs.nasa.gov/citations/19930067961)); I quoted only the negative half in round one. With head movement, front-back confusions "nearly disappeared" for real and virtual sources ([WIGHTMAN](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:10335634&resultType=core&format=json)).
- **Against.** "Many subjects showed high rates of front-back and up-down confusions" with non-individual HRTFs, while horizontal cues "are robust" [WENZEL]. Elevation "is known to be inaccurate with generic spatialization"; 38 listeners localised height better with pitch coding than spatialisation alone ([BORDEAU](https://doi.org/10.3389/fpsyg.2023.1079998)).
- **Time.** With real sources, head rotation helped front-back from a 4° window but elevation only beyond 8°, with stimuli lasting 1.2-1.8 s ([MCANALLY](https://www.frontiersin.org/articles/10.3389/fnins.2014.00210/full)).
- **Speakers.** Meta: headphones are "more accurate since they don't suffer from the 'doubling down' of HRTF effects" ([META-AUDIO](https://developers.meta.com/horizon/resources/audio-intro-devices/)); extending that to Quest's open speakers is inference.
- **The user's likely reference (inference).** Demo recordings and music are scripted and need no timed decision; some earbuds build a "personal profile" from a camera scan ([APPLE](https://support.apple.com/en-us/102596)). A browser on Quest has neither.
- **Practice.** A shipped audio runner codes jump and duck by timbre ([FEER](https://afb.org/aw/19/11/15145)). Two-choice above/below accuracy with generic HRTFs: no readable study found.

| ID | Best track | Verdict | Strongest objection | Evidence | Fix if any | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|---|
| S2 | Gaming | SERIOUS, fixable | A core loop without hands in a hands-first contest, relying on rendered height and "behind" that a minority cannot hear | [WENZEL], [RULES](https://start-developer-competition-26.devpost.com/rules) | Lean and duck as position input; pitch and timbre for height; frontal arc only; a real job for hands; earned dark | 3 | 4 | 3 |
| M1 | Gaming | SERIOUS; fix converges on G5-R | Forced forward motion with frequent turns while seated, and a turn command identical to looking around | [LOCO](https://developers.meta.com/horizon/design/locomotion-comfort-usability/), [NECK](https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2025.1682866/full) | No auto-run; pinch to hop between junctions; find the exit by turning toward a sound | 2 | 3 | 3 |

### S2

**Hands.** It passes "without ever pairing a controller" [RULES], but hands do nothing in the core loop, so "hands-first design" and "hand tracking" marks go (inference).
**Head as controller and ears.** Leaning or ducking is the good case: the cue shifts as you clear it. Rotation gestures collide with listening, because rotating resolves front-back [WIGHTMAN]; looking around becomes a command (inference).
**Neck.** Looking up needs "more than twice the total neck muscle activity" of looking down; the comfort zone is ±30° horizontal [NECK]. Nod-up to jump is the worst mapping.
**Sickness and safety.** Little risk in the dark, since vection is "visually induced" [LOCO]; a judge ducking blind at a desk is the hazard (inference).
**Eyes.** A pinch-time pointer on unreleased hardware (BRIEF.md): untestable, absent on Quest 3/3S.
**Survives:** lean and duck as position input (emulator-testable), jump and duck restored, and sound that answers your own movement, which a phone cannot give (inference). This would repair S1-R's thin game.

### M1

**Motion.** Always-forward movement is slide locomotion, where vection "occurs"; Meta wants accelerations "brief and infrequent" [LOCO]. Pausing, resuming and frequent turns are the opposite.
**Turning.** Standing turns break "Designed for seated/stationary use" [RULES] and wrap the puck cable (inference). Meta: "artificial turning is necessary, since not all chairs spin" [LOCO]; snap turns reduce sickness ([SNAP](https://www.csit.carleton.ca/~rteather/pdfs/GI_2018_viewpoint_snapping.pdf), search summary).
**Head flick.** Inspecting a side corridor is the same motion as the command, the return stroke is a second one, and an unambiguous flick must leave the ±30° comfort zone [NECK] (inference).
**Game.** A maze needs stopping to think; auto-run removes it, so pause becomes the main verb and hands still do little. A judge unwell in minute one stops.

**Rank and awards.** S2 (Accessibility Forward, partial): above S1; below S1-R, G5, G5-R, N1, E3-R and A4-R. M1 (no award): below all seven, and worse than G5-R Lantern, which has no self-motion.
