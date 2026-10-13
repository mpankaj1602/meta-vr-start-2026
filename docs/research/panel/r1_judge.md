# Round 1 report: Competition Judge

| ID | Best track | Stage 1 pass? | Innovation /10 | Experience /10 | Technical /10 | Polish /10 | Special award | Win 1-10 | Feasibility 1-5 | Difficulty 1-5 | Rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|
| G1 | Gaming | Pass (marginal on seated) | 3 | 4 | 5 | 5 | None realistic | 2 | 4 | 2 | Meta's own gaming use-case page already cites Premium Bowling, so "originality, creative ambition" is near zero. An arm swing leaves the tracking volume and Meta's hands doc names throwing as the case where "the camera may not immediately capture the exact point of release". Fails the airplane-seat test as written. |
| G2 | Gaming | Pass | 3 | 4 | 4 | 5 | None realistic | 2 | 4 | 2 | Bow draw puts one hand at the cheek ("too close to the device like on the cheek, will not be detected") and both arms "above heart level", the two things Meta's hands guidance says to avoid. Genre is saturated; nothing here "differentiates". |
| G3 | Gaming | At risk (large paddling motion vs "no large physical movement") | 5 | 4 | 4 | 4 | Boldest Original Concept (weak) | 2 | 2 | 4 | Sitting in a raft is a nice diegetic fit for "seated-optimized", but paddle strokes happen at the hips, outside both the tracking volume and a 70-degree FoV, and a moving river is a vection risk for a judge. Water plus environment art at "min 60 fps" in WebXR is heavy for one person. |
| G4 | Gaming | Pass (only if hands, not body, drive it) | 4 | 6 | 5 | 5 | Best First Five Minutes (weak) | 3 | 3 | 3 | Best bus-stop fit of the user's games (90-second runs, instant comprehension, score chase = "habit-forming purpose"). But "Subway-Surfers-type" is derivative by definition, and a reaction game on fast gestures collides with "rapid or erratic hand movements can challenge the system's tracking accuracy" and "solid and bug-free". |
| G5 | Gaming | Pass | 6 | 6 | 6 | 5 | Boldest Original Concept; Best First Five Minutes | 4 | 4 | 3 | "Puzzle" is the first genre named in the track. The above-maze jump is a real "spatial depth / real-world scale" mechanic and hand-placed markers are hands-first; limited abilities add strategy. Hurt by maze being a hackathon staple and by unresolved seated first-person locomotion in a narrow FoV. |
| E1 | Entertainment | At risk ("Ghibli" is a brand name; technical viability doubtful) | 5 | 3 | 3 | 4 | Boldest Original Concept (weak) | 2 | 1 | 5 | DreamSpace (room re-skin) won Entertainment in 2025, so appetite exists but novelty is spent. As written there is no hand loop at all, a two-minute novelty with no "habit-forming purpose", and re-rendered camera frames in a browser cannot hold "min 60 fps" or alignment. |
| E2 | Entertainment | Conditional (content rights, wrapper test) | 3 | 4 | 4 | 4 | None realistic | 2 | 2 | 4 | "Spatial cinema" is named in the track, but Meta already auto-converts Instagram photos and Reels to 3D at OS level, so "differentiate themselves" fails. Any movie or reel shown is third-party IP and likely depicts "identifiable person[s] other than Entrants". Hands are reduced to play/pause. |
| E3 | Entertainment | Conditional (needs an explicit hand loop) | 7 | 5 | 5 | 5 | Best Accessibility Forward Experience | 4 | 3 | 3 | "Spatial audio" is named in the track and an eyes-closed piece is rare, FoV-proof and "inclusive by default". But as written there is no stated interaction, it exercises none of "gaze interactions, hand tracking, passthrough, spatial anchoring", and it is hard to show in a 3-minute video. |
| P1 | Gaming (moved from Productivity) | At risk (track relevance; no pedals) | 3 | 3 | 3 | 3 | Best Agentic Interaction (weak) | 1 | 1 | 5 | Not "task management, creative tools, or habits tied to a recurring context", so it loses "relevance to the chosen track" in Productivity. First-person driving is a known sickness trigger, a 70-degree FoV defeats mirror checks, and a traffic sim is far beyond "scope to one mechanic". |
| P2 | Productivity | Pass (weak) | 3 | 4 | 4 | 4 | Best Agentic Interaction (weak) | 2 | 3 | 2 | As written it "tells you" things and shows images: a reference panel that would work on a phone, so it does not "uniquely leverage Meta device capabilities". If the advice is LLM-backed it fails the "take it away test". |
| P3 | Entertainment (moved from Productivity) | Pass | 6 | 6 | 6 | 6 | Best First Five Minutes; Boldest Original Concept | 5 | 4 | 3 | "Immersive storytelling" at "real-world scale" with "spatial depth"; black space is cheap to render at 60 fps and forgiving of a narrow FoV. Loses on "habit-forming purpose" (reads as "a one-time demo") and on the four-feature scope against "scope to one mechanic". In Productivity it would be marked down for track relevance. |
| P4 | Entertainment (moved from Productivity) | At risk (wrapper; brand attribution) | 2 | 4 | 3 | 4 | None realistic | 1 | 2 | 4 | Textbook failure of the "take it away test - remove the third-party service. Is there still a Project?". Google's Map Tiles policy requires showing the Google logo, which collides with "corporate logos, brand names". Wander and Brink Traveler already own this. |
| P5 | Productivity | Conditional (wrapper scrutiny) | 5 | 6 | 4 | 5 | Best Agentic Interaction | 4 | 2 | 4 | Touch-as-query is truly hands-first and the "real room meaningfully changes the experience" more than any other idea; "context-aware assistance" is verbatim in the Agentic definition. But three camera-plus-AI entries won in 2025, the answer is a third-party model (wrapper test), and it must hold "up in rooms the developer never tested". |
| P6 | Productivity | Likely fail | 3 | 2 | 2 | 3 | None | 1 | 1 | 5 | Needs a gym, machines and walking: the opposite of "seated/stationary use" and the "2ft radius". A judge alone at a desk has nothing to evaluate; "judges can't score what they can't launch". |
| P7 | Productivity | Conditional (calorie claim must go) | 4 | 5 | 5 | 5 | Best Reason to Come Back | 3 | 4 | 2 | A daily brain warm-up is a clean "habit tied to a recurring context" and bus-stop sized. The calorie-burn premise is content that is "false ... deceptive, misleading" under the rules, and as written no mechanic is specified, so originality is unscored potential. |
| A1 | Entertainment | Pass | 6 | 7 | 7 | 7 | Best First Five Minutes | 6 | 4 | 3 | "Music visualization" is named in the track; music entries placed four times in 2025 (Inkphony, (m)ORPH, OpenSoundLab, IMMERROCK). Pluck-and-hear is a payoff in seconds, and "sound design" is a third of the Polish criterion. Conducting with raised arms breaks "above heart level"; rivals in this niche tend to be audio professionals. |
| A2 | Gaming | Pass (pinch path must be complete without voice) | 7 | 6 | 6 | 5 | Best Agentic Interaction | 5 | 2 | 5 | Hits three of four Agentic phrases ("spatial agents, voice-first AI interaction, procedural content") and rolling dice by hand forgives sloppy tracking. Against it: LLM latency inside a 5-10 minute session, uptime to 11 Dec, "solid and bug-free", the ChatGPT wrapper test, and wilds.ai as prior art. |
| A3 | Gaming | Pass | 5 | 7 | 7 | 6 | Best Social & Multiplayer; Best First Five Minutes | 5 | 3 | 4 | Exactly the interaction Meta holds up as its hands exemplar (Table Troopers: "all you need is pinch") and that won Best Casual Game in 2025 (Tiny Golf); "a table becomes the play surface" is verbatim rubric. That same lineage caps "originality", it sits in the most crowded track, and a "duel" is judged by one person alone. |
| A4 | Productivity | Pass | 6 | 7 | 6 | 6 | Best Reason to Come Back | 7 | 4 | 2 | The only idea built on the track's own sentence: "designed around specific daily moments ... habits tied to a recurring context". Hits "habit-forming purpose", "persistent anchors ... to drive repeat usage" and purposeful passthrough on a real desk, in the thinnest field. Risk: a judge cannot feel a habit in one sitting, and the concept is still vague. |
| A5 | Productivity (tutor) or Gaming (puzzle) | Pass | 4 | 6 | 6 | 5 | Best Accessibility Forward; Best Reason to Come Back | 4 | 4 | 3 | Showcases hand tracking directly and is perfectly seated with streak-based return. But ASL tutors already exist on the store and at every XR hackathon, look-alike letters hit self-occlusion (reliability), and teaching sign language is not what the Accessibility definition describes. |
| A6 | Entertainment | Pass | 6 | 7 | 6 | 6 | Best First Five Minutes | 5 | 3 | 4 | "Immersive storytelling", lap scale, and a book "teaches controller-free interaction without a wall of text". Wholly dependent on "art direction" and narration that a solo developer must source, and one story is "a one-time demo" with no pull back tomorrow. |
| A7 | Gaming | Pass | 7 | 7 | 6 | 6 | Best Reason to Come Back | 6 | 3 | 4 | "Narrative" and "puzzle" are both named; Meta calls adventure and visual-novel genres under-served and put Phoenix Wright on the launch slate. Handling evidence is "direct manipulation" and daily cases are "a loop that pulls the user back tomorrow". Costs: writing quality, reading text in-headset, and the most crowded track. |
| A8 | Productivity | Pass | 5 | 6 | 7 | 6 | Best Accessibility Forward (voice path); Judge's Choice | 5 | 4 | 3 | "Task management" is verbatim track text and look-pinch-sort is the cleanest showcase of "gaze interactions" and "FoV-aware design". But it is the obvious Productivity entry, a judge has no real tasks to sort, and text crispness in WebXR competes with native panel apps. |
| A9 | Entertainment | Pass | 5 | 6 | 6 | 6 | Best First Five Minutes (weak) | 4 | 4 | 3 | Layout built around the centre of view is "FoV-aware design" by construction and it is truly "lean-back". Hands do almost nothing, so "hands-first design" is thin, and the whole score rides on comic art the entrant does not have. |

Scores assume a competent solo build of the idea as written; I have not repaired the idea. Feasibility and Difficulty are my estimates; I defer to the engineer on those.

## 1. Rubric verification: what the brief missed or got wrong

Primary sources read in full on 2026-10-06: overview https://start-developer-competition-26.devpost.com/ , rules https://start-developer-competition-26.devpost.com/rules , judging https://start-developer-competition-26.devpost.com/details/judging , special awards https://start-developer-competition-26.devpost.com/details/special-awards , FAQs https://start-developer-competition-26.devpost.com/details/faqs , schedule and webinars pages under /details/.

**Wrong in the brief**

- "Official definitions of the special awards were not found" is incorrect. Rules section 7 and the Special Awards page define all of them:
  - Best Social & Multiplayer: "Experiences designed for shared presence - co-watching, cooperative play, social spaces, or asymmetric multiplayer."
  - Best Agentic Interaction: "Apps where AI is a core part of the experience - spatial agents, voice-first AI interaction, procedural content, context-aware assistance."
  - Best Reason to Come Back: "thoughtful progression and reward design: something to work toward, visible growth between sessions, and a loop that pulls the user back tomorrow. Rewards experiences built for longevity, not a one-time demo."
  - Best First Five Minutes: "how fast the experience explains itself, teaches controller-free interaction without a wall of text, and delivers a payoff before the user takes the headset off."
  - Best Accessibility Forward: "voice alternatives for hand interactions, eyes-only navigation for limited mobility, high-contrast modes, or experiences inclusive by default."
  - Boldest Original Concept: "the idea that couldn't exist anywhere else. A concept whose core loop depends on presence, spatial depth, real-world scale, or eyes and hands. Judged on originality and on whether the experience would fall apart on any other platform."
  - Judge's Choice: "standout entries that don't fit neatly into a single track or category."

**Missing from the brief and material to scoring**

- Special awards are "Open to both new and adapted / significantly updated experiences across all tracks". Each is a single winner drawn from the whole field, not from the New division.
- One prize per entry, and (FAQ) "If in consideration for multiple prizes, you will be awarded the highest prize value." Track winners therefore drop out of the special-award pools.
- A third named test: "The 'take it away test' - remove the third-party service. Is there still a Project?" This is the operative test for P4, P5, P2, E2 and A2.
- The Judging page's Innovation text is longer than the brief's: "uniquely leverage Meta device capabilities (e.g., spatial depth, hands-first design, gaze, passthrough mode, scene understanding, persistent anchors) to drive repeat usage." Repeat usage is scored under Innovation as well as Experience Design.
- Passthrough is judged on specifics: "whether a table becomes the play surface, walls host content, or UI adapts to the space", and technically on "anchoring content to detected planes, surfaces, and room geometry, and holding up in rooms the developer never tested."
- FoV wording: "keep essential UI and interactions within a comfortable, narrower FoV and adapt across devices."
- Polish wording: "visually cohesive, and clearly demonstrate relevance to the chosen track"; video must "show real gameplay that honestly represents the experience ... Don't lean on AI-generated video to carry the pitch." "Judges are not required to watch beyond three minutes." Video may be captured "via XR Simulator or another equivalent emulator".
- "AI tools may also be used to assist in the judging, but final decisions will be made by human judges." Inference: the written description should state hands-only, seated and track fit in the rubric's own words.
- Sponsor may re-assign an entry's Track and its Division at its sole discretion.
- New Experience means "No pre-existing codebases". Inference: the entrant should not seed the build from an older personal project.
- Content clauses that bite specific ideas: no content that is "false, fraudulent, deceptive, misleading" (P7); no "corporate logos, brand names ... recognizable branded products" (P4, E1, P1); "may not mention or depict any identifiable person other than Entrants" (E2, and any camera-based demo video); "must not contain or describe any harmful or illegal activity" plus the 10+/13+/18+ content guidelines (A7 crime fiction should stay cozy; A2 and P5 must constrain model output).
- FAQ: judges are "our large team of globally distributed judges" who "all have equal access" to Meta VR devices, and "Your experience should not require a third-party device to operate" (A8's phone hand-off must stay optional). Inference: most judging happens on Quest 3/3S, where gaze falls back to head pointing, since the Glasses do not ship until spring 2027.
- The rubric names "gaze interactions (Unity/Unreal ISDK v207+)" specifically. There is no IWSDK-specific award this year (2025 had two at $30k), so WebXR entries compete head to head with Unity and Unreal. Twenty prizes versus 32 in 2025.
- Meta's linked exemplars on the overview page: Hand Physics Lab and Table Troopers for hands, AnExplorer (a file manager) for Productivity, and the Quest Gamer Segments post. Table Troopers is described as "all you need is pinch" on "the player's real table" (https://developers.meta.com/vr/discover/success-stories/table-troopers/). The segments post calls Leisure Lovers (puzzle, strategy, rhythm; shortest sessions) "underrepresented on Quest" (https://developers.meta.com/horizon/blog/know-your-players-understanding-your-audience-with-2025-quest-gamer-segments/).
- Field size: 2,327 registered as of today. The overview states that last year "over 2,900 developers joined" and delivered "more than 650 submissions".
- Schedule page: judging 23 Nov to 9 Dec, winners 11 Dec. Listed judge: Dilmer V, who also co-presents the 20 Oct session on agentic workflows ("what an agentic interaction looks like when it's actually useful, where it tends to break").

**Confirmed as the brief states**: hands-first is the only hard design requirement; seated, easy in/out and not-a-wrapper are guidelines; four criteria at 25%; stage one is pass/fail on whether the entry "reasonably fits the theme and reasonably applies the required tools and features"; prize amounts.

**What 2025 judges rewarded** (https://developers.meta.com/vr/blog/meta-horizon-start-developer-competition-meet-the-winners/ ; the page carries no judge commentary, so the pattern is my inference):

- One-gesture clarity: Tiny Golf, "all you need is a pinch".
- Hands as the mechanic rather than a controller substitute: Hand Survivor, Pocket Lands, Awesome Hand.
- Music and expression, repeatedly: Inkphony (winner), (m)ORPH and IMMERROCK (mentions), OpenSoundLab (Judges' Choice).
- Room-aware mixed reality and camera plus AI: DreamSpace and three camera-AI winners. Those were dedicated categories last year and are gone this year, so they are no longer novel and no longer have a reserved prize.
- Small scale works: lap and desk dioramas (Pocket Lands, Compile Crops) and a solo WebXR build (The Nanauts).

**Meta's hands guidance used in the scoring** (https://developers.meta.com/horizon/design/hands-limitations-mitigations/ and https://developers.meta.com/horizon/design/hands-best-practices): hands "resting by the thighs or placed too close to the device like on the cheek, will not be detected"; "when throwing a virtual object ... the camera may not immediately capture the exact point of release"; "Avoid requiring hands to be held above heart level or excessive reaching"; "Teach one core interaction, use it everywhere"; "prioritize direct manipulation of physical objects over 2D menu interactions".

## 2. How I scored

A judge session, as I would run it: open the URL in Quest Browser, enter the session, play alone for five to ten minutes at a desk, then watch the video. Consequences applied to every idea:

- I am alone. Anything that needs a second player, a gym, my own media library or my real task list shows me less than the developer intended.
- My room is unknown to the developer. Passthrough ideas are scored on whether they survive that.
- Microphone and camera permission prompts are friction and a failure point in the first minute.
- I probably have a Quest 3, so "gaze" is head pointing; I check FoV-awareness by whether essentials sit near the centre.
- Win reflects field strength as well as raw score, which is why A4 (25/40, thin field) outranks A1 (27/40) and A7 (26/40).

No idea as written earns more than 7 on Win. A competent solo build of the best of them lands around 25-27 out of 40; track winners will need roughly 33 or more (inference from equal weighting and a field of several hundred).

## 3. Track crowding in the New division

All inference; the project gallery is not yet published.

- **Most crowded: Gaming.** Quest developers are overwhelmingly game developers, the track lists the widest genre set, two of four main categories in 2025 were games, and Meta's own Glasses slate is almost all games. I expect roughly half or more of New entries here, including the strongest small studios. Hardest place to finish top two.
- **Least crowded: Productivity.** Lower prizes ($70k/$35k), few developers with productivity experience, hands-only text entry is hard, and Meta's own exemplar is a file manager. Many entries will be flat panel utilities. A charming, hands-first, habit-shaped entry stands out most easily here.
- **Middle: Entertainment.** Needs original or licensed content and wrappers are discouraged, which thins the field, but the people who do enter tend to be strong on art and audio. Many entries will be passive visualisers and video players. Full $100k/$50k prizes with a medium field make it the best expected value for an entry that has real content.
- **A structural help for New:** "Implementing Hand Interactions as a new feature" qualifies as a significant update, so established studios with shipped titles are funnelled into Adapted. The New field should be more hackathon-like.
- **Special awards** are cross-track and cross-division with one winner each. My read of the pools: Accessibility Forward is the least targeted; Boldest Original Concept rewards concept over finish, which suits a solo build; Agentic will be crowded but mostly low quality; Social & Multiplayer and Reason to Come Back favour Adapted titles that already have netcode and progression; First Five Minutes is open to everyone and decided on craft.

Effect on odds: for equally good entries, Productivity > Entertainment > Gaming on probability of a track prize. An idea that is a 26/40 in Gaming needs a special award to pay; the same score in Productivity can place.

## 4. Top 5 and bottom 5

**Top 5 (as written)**

1. **A4 Daily ritual object (Win 7).** Matches the Productivity track sentence and "habit-forming purpose" word for word, uses passthrough the way the rubric describes, is small enough to finish and polish, and sits in the thinnest field. Natural target for Best Reason to Come Back.
2. **A1 Playable music visualiser (Win 6).** Highest raw score. Named in the track, instant payoff, sound design counts directly, generative audio avoids every licensing clause, and the web audio stack is an advantage for this entrant.
3. **A7 Hands-on mystery (Win 6).** Most distinctive of the game ideas, on-genre for what Meta says is under-served, tactile, with a daily loop. Held back by content cost and Gaming's crowding.
4. **A3 Pinch-and-pull tabletop duel (Win 5).** Lowest-variance scorer on Experience and Technical because it is the interaction Meta itself points entrants to. Capped by originality and by being a two-player idea judged by one person.
5. **A6 Lap pop-up storybook (Win 5).** Strongest First Five Minutes candidate. Its Polish score has the widest range of any idea, depending entirely on art and narration.

Just outside: A8, A2 and P3 (all Win 5). Best of the user's own ideas: P3, then G5, E3 and P5.

**Bottom 5 (as written)**

1. **P6 Gym spotter (Win 1).** Not seated, needs a gym, unjudgeable from a desk; the one idea I expect to fail stage one.
2. **P1 Car driving (Win 1).** Wrong track, no pedals, sickness-prone, FoV-hostile, enormous scope.
3. **P4 Vacation visualiser (Win 1).** Fails the take-it-away test outright and carries a brand-attribution conflict.
4. **E1 Anime converter (Win 2).** No interaction loop, brand-name risk, and not technically credible in a browser at 60 fps.
5. **E2 3D converter (Win 2).** Duplicates an OS-level feature, depends on third-party content, hands barely involved.

G1, G2, G3 and P2 are next lowest at Win 2.

**Where track choice changes the outcome**

- **P3**: Productivity to Entertainment lifts it from roughly Win 2 to Win 5, because "relevance to the chosen track" stops being a penalty and "immersive storytelling" becomes a credit.
- **E3**: could instead be framed as a wind-down sound ritual in Productivity ("habits tied to a recurring context ... wind-down"), where the field is thinner. Comparable odds by a different route; worth debating.
- **A5 and P7**: Productivity (daily practice habit) beats Gaming for both on field strength, at some cost in track relevance for A5.
- **P1 and P4**: moving them fixes relevance but not their other problems.
- **A7**: stays in Gaming. Entering it as Entertainment risks reassignment.

## 5. Suggested refinements (separate from the scoring above)

For the designer to weigh; none of this is reflected in the table.

- **A4**: name the object and the moment; build a compressed "week in one minute" replay so a judge sees "visible growth between sessions" in a single sitting; anchor to a detected surface with a sensible fallback when no plane is found. Merging A8's voice capture and phone hand-off into A4 gives one Productivity entry that covers "task management" and "daily moments" together.
- **A1**: replace conducting with a lap-height plucked or struck instrument so hands stay below heart level; let the piece keep playing after the player stops, to earn "lean-back"; add a daily seed for return visits.
- **A7**: one complete six-to-eight-minute cozy case (no violence, to stay clear of the "harmful or illegal activity" clause and age ratings), clue linking by look-and-pinch, and a visible teaser for tomorrow's case.
- **A3**: open on a solo trick-shot ladder so a lone judge gets a full session; add asynchronous "ghost" duels by link before attempting live netcode; put the board on the real table.
- **A2**: authored campaign skeleton and rules with the model used only for narration and improvisation, plus a scripted fallback, so the take-it-away test still leaves a game; pinch-complete with voice optional.
- **A6 and A9**: use public-domain stories or art, which the Originality rule explicitly permits, to remove the art bottleneck.
- **A8**: make every action possible by voice to target "voice alternatives for hand interactions".
- **G5**: put the maze on the lap as a diorama, move by look-and-pinch between junctions instead of free locomotion, and make "peek from above" the scarce resource; a daily seeded maze adds the return loop. I would expect this to rise to about Win 6.
- **P3**: cut to one mechanic, a five-minute guided fall toward a black hole in which the player's own tracked hands stretch; enter Entertainment and aim at Best First Five Minutes or Boldest Original Concept.
- **E3**: make the hands the instrument or the locator, and make the whole thing playable without sight, including onboarding, to aim squarely at Accessibility Forward.
- **P7**: drop the calorie claim; a three-minute daily hands-and-eyes warm-up with visible progress, tied to one recurring moment.
- **P5**: limit to objects within reach, add an entrant-built collection cabinet and cached cards so there is a project without the model.
- **G4**: lap-scale third-person runner driven by small thumb swipes and taps with hands resting.
- **G1 and G2**: pinch-pull-release tabletop versions are feasible but would be read as Tiny Golf follow-ons.

## Sources

- https://start-developer-competition-26.devpost.com/ (overview, tracks, tests, prizes, exemplar links, participant count)
- https://start-developer-competition-26.devpost.com/rules (entry requirements, content rules, judging stages, criteria, award definitions)
- https://start-developer-competition-26.devpost.com/details/judging
- https://start-developer-competition-26.devpost.com/details/special-awards
- https://start-developer-competition-26.devpost.com/details/faqs
- https://start-developer-competition-26.devpost.com/details/webinars-office-hours and /details/dates
- https://developers.meta.com/vr/blog/meta-horizon-start-developer-competition-meet-the-winners/ (2025 winners)
- https://developers.meta.com/horizon/blog/meta-connect-2026-vr-start-developer-competition/ (Meta's "scope to one mechanic" advice)
- https://developers.meta.com/horizon/design/hands-limitations-mitigations/ and https://developers.meta.com/horizon/design/hands-best-practices
- https://developers.meta.com/horizon/design/hands-adapting-from-controllers/
- https://developers.meta.com/vr/discover/success-stories/table-troopers/ and https://developers.meta.com/horizon/discover/success-stories/hand-physics-lab-holonautic/
- https://developers.meta.com/horizon/discover/use-cases/gaming (Premium Bowling cited) and https://developers.meta.com/horizon/discover/use-cases/entertainment (travel filed under Entertainment; Brink Traveler)
- https://developers.meta.com/horizon/blog/know-your-players-understanding-your-audience-with-2025-quest-gamer-segments/
- https://developers.google.com/maps/documentation/tile/policies (Google logo attribution requirement for 3D Tiles)
- https://www.uploadvr.com/quest-instagram-app-now-ai-converts-videos-to-3d-too/ (OS-level 2D-to-3D conversion)
- https://communityforums.atmeta.com/discussions/Questions_Discussions/request-webxr-raw-camera-access-camera-access-feature-in-quest-browser/1367463 (WebXR camera-access not supported in immersive-ar; getUserMedia as fallback; not independently tested by me)

- https://www.uploadvr.com/meta-launches-1-million-competition-for-hands-first-apps-ahead-of-vr-glasses/ (20 prizes this year versus 32 in 2025)

Taken from the shared brief without re-checking: the GDC 2026 "under-served genres" claim, the announced Glasses launch slate, wilds.ai, Wander, and the existing ASL tutor titles.

Not verified by me: whether judges will have VR Glasses hardware, speech recognition support in Quest Browser, and camera or scene-mesh availability on the Glasses. Field-size and crowding figures are inference.
