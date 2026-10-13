# Round 3 — designer's final scores

Scale note: my Win scores top out at 6. No solo entry built in six weeks without a headset in hand is a favourite, so I have not used 7-10. Feasibility and Difficulty use the full 1-5 range.

## 1. Anticipated attacks

My top six refined entries, the strongest objection I expect from each role, and my answer.

### P7-R Pocket Palace
- **Judge: "This is a memory game, so expect reassignment to Gaming; and a memory-palace app already shipped on Quest."** Partly answered. The "My Day" deck is the tie to Productivity, and three of four roles placed P7 in Productivity as written. The earlier app (Librarium) was a controller-era study tool, not a four-minute hands-first daily. Reassignment is still the main risk.
- **Engineer: "About thirty pinches a round; if pinch is unreliable with hands low, that is tiring."** No answer until the day-one hand-zone check. Targets are about 6° apart at 0.7 m, which is comfortable for a hand ray.
- **Skeptic: "The studies had people move through a space and form their own images. Putting an object back on its spot is recognition, not recall, so the payoff is inflated."** This lands. The test is object-to-place recall, which is what the technique trains, and I claim nothing wider. That a house seen from outside works as well is my inference. A judge also cannot experience the next-day question.

### A4-R Three Stones
- **Judge: "I am finished in three minutes, and the track text invites every entrant to build a habit tracker."** Partly answered by the bowl drop and the persistent place. That it is the obvious Productivity entry is true *(inference on the field)*.
- **Engineer: "The anchor is lost in private mode and in a new location; water is costly."** Answered: the tray floats at a default spot when no anchor resolves, and the water is a stylised ripple, not refraction.
- **Skeptic: "A phone list is faster, and a seven-day preview is not a habit."** No answer to the first. The preview is labelled as a preview so the video stays honest.

### G5-R Lantern
- **Judge: "A maze is a hackathon staple. What would I remember?"** Partly answered: the lift and the fog. Memorability remains its weakness.
- **Engineer: "Cells of a 30 cm maze at 0.7 m are under 3° wide."** Answered: only lit neighbouring junctions are selectable, at most four, and the pointer snaps to the nearest. Maze size is capped at 9 by 9.
- **Skeptic: "Date seed plus a row of lanterns is borrowed progression, and the co-op needs a second person."** Partly answered. Co-op is optional and cut first. The Reason to Come Back pool does include established titles.

### N1 Hush
- **Judge: "Is it fun after the first minute? I am on speakers in an office."** No answer on fun until a prototype exists. Left-right hearing on one frontal arc works on speakers.
- **Engineer: "Three minutes of pointing; the ray jitters when the wrist turns away from the cameras."** Partly answered: the forearm is supported, and a lost hand dims the torch instead of breaking the game. Needs device tuning.
- **Skeptic: "A phone with a gyroscope does this, so it is not the boldest concept."** Partly lands. A phone cannot give a hand-held beam in a head-tracked dark space, but the claim is weaker than I first made it.

### E3-R Close Your Eyes
- **Judge: "It uses neither passthrough, anchoring nor the pointer, so the Technical criterion is thin; art direction is hard to score."** This lands. The visual mode helps Polish, not Technical.
- **Engineer: "A palm-up hand held low may be outside the tracking volume on Quest."** No answer until the day-one check. The hiss on lost tracking makes it recoverable without sight.
- **Skeptic: "An accessibility claim not tested with disabled players is performative."** This lands. The entry should describe itself as designed to be sight-optional and not claim more.

### A7-R Paper Trail
- **Judge: "A reading game in the most crowded track; where is the direct manipulation?"** Partly answered: papers are flipped and props turned. It is still mostly reading.
- **Engineer: "Legibility at Quest 3 resolution, and many text meshes."** Partly answered: at most 40 words a paper at 0.8-1 m. Needs a device check.
- **Skeptic: "Two cases is fifteen minutes with no replay, written by a developer."** This lands. I moved the award target for that reason.

## 2. Changes since round one (as-written ideas)

| ID | Changed | Old → New | Reason |
|---|---|---|---|
| G1 | Difficulty | 3 → 2 | Engineer: eleven rigid bodies; the hard part is feel, not code. |
| G3 | Win | 2 → 1 | Engineer: 6-8 person-weeks, over budget, with the worst gesture and comfort profile. |
| E1 | Win | 2 → 1 | Engineer and skeptic: a web page cannot read or restyle passthrough pixels. |
| E2 | Win; Feasibility; Difficulty | 2 → 1; 1 → 2; 5 → 4 | Market: already an OS feature on three platforms. Engineer: still images are feasible, video is not. |
| P1 | Win; Feasibility; Track | 2 → 1; 2 → 1; Productivity → Gaming | Engineer: legs are not tracked, so no pedals; 8-10+ person-weeks. Judge: wrong track. |
| P2 | Feasibility; Difficulty | 3 → 4; 3 → 2 | Engineer: mostly panels and data. Win unchanged. |
| P3 | Win | 3 → 4 | Judge: as Entertainment it earns track relevance; black space is cheap and forgiving of a narrow view. |
| P4 | Win | 2 → 1 | Judge and skeptic: fails the take-it-away test; Google's mandatory logo collides with the logo ban. |
| P5 | Feasibility; Difficulty | 1 → 2; 5 → 4 | Engineer: headset cameras are reported reachable as ordinary camera devices, with conflicting evidence. Win stays 3 because the platform already ships the feature. |
| P7 | Feasibility; Difficulty; Track | 3 → 4; 3 → 2; Gaming → Productivity | Engineer: engineering is trivial. Judge: a daily warm-up fits the habit wording. Win stays 2 because the premise is false. |
| A2 | Win; Feasibility; Difficulty | 5 → 4; 3 → 2; 4 → 5 | Engineer: no speech API, so voice needs three hosted services. Skeptic: a frozen submission cannot repair a backend. Market: a direct rival launches this month. |
| A4 | Win; Difficulty | 5 → 6; 3 → 2 | Judge: matches the track sentence, and the rubric names persistent anchors. Engineer: every feature is confirmed and emulated. |
| A7 | Feasibility | 2 → 3 | Engineer: the verbs are SDK built-ins; one case fits the budget. |

Unchanged: G2, G4, G5, E3, P6, A1, A3, A5, A6, A8, A9. I held A1 at Win 5 and A3 at Win 4 against the other roles' higher scores, for the reasons in my round-two disagreements.

## 3. Final scores

```csv
ID,Track,Award,Win,Feasibility,Difficulty,Note
G1,Gaming,none,2,3,2,Standing swing fails seat test; release leaves tracking volume; saturated genre
G2,Gaming,none,2,3,3,Draw hand at cheek is untracked; arms above heart level
G3,Gaming,none,1,2,4,Over budget; paddling leaves the tracked area; motion discomfort
G4,Gaming,Best First Five Minutes,3,3,3,Reaction game on fast swipes that track worst; derivative framing
G5,Gaming,Best First Five Minutes,4,4,2,Sound mechanic; movement unspecified; mazes are a hackathon staple
E1,Entertainment,none,1,1,5,Web page cannot read or restyle passthrough; studio name is a brand
E2,Entertainment,none,1,2,4,Already an OS feature on three platforms; third-party video unreadable
E3,Entertainment,Best Accessibility Forward,4,4,3,Emptiest space found; no mechanic stated yet
P1,Gaming,none,1,1,5,No pedals without leg tracking; sickness-prone; far over budget
P2,Productivity,none,2,4,2,Reference panel with unreliable advice; no reason for a headset
P3,Entertainment,Best First Five Minutes,4,3,4,Four exhibits not one mechanic; one strong moment
P4,Entertainment,none,1,2,4,Fails take-it-away test; mandatory logo collides with rules
P5,Productivity,Best Agentic Interaction,3,2,4,Camera access unconfirmed; platform already ships it
P6,Productivity,none,1,1,5,Not seated; cannot be judged at a desk
P7,Productivity,Best Reason to Come Back,2,4,2,Calorie premise is false; no mechanic defined
A1,Entertainment,Best First Five Minutes,5,3,3,Named in track; conducting raises arms; most crowded hands genre
A2,Gaming,Best Agentic Interaction,4,2,5,Voice needs three hosted services; frozen-backend risk; direct rival
A3,Gaming,Best Social & Multiplayer,4,3,4,Proven verb; lone judge has no opponent; netcode doubles work
A4,Productivity,Best Reason to Come Back,6,4,2,Matches track sentence; features confirmed; concept still vague
A5,Gaming,Best Accessibility Forward,4,3,3,Closed-fist shapes misread; existing tutors barely used
A6,Entertainment,Best First Five Minutes,5,3,4,Most charming opening; art load; ends once read
A7,Gaming,Best Reason to Come Back,5,3,4,Validated genre; daily cases are a content treadmill
A8,Productivity,none,4,3,3,Voice capture needs paid service; phone is faster
A9,Entertainment,Best First Five Minutes,4,3,3,Most comfortable; hands barely used; needs original art
A4-R,Productivity,Best Reason to Come Back,6,4,2,Lowest technical risk; literal track fit; slight; phone list is faster
P7-R,Productivity,Best Reason to Come Back,6,4,3,Payoff inside one session; reassignment risk; recall test is partly recognition
G5-R,Gaming,Best Reason to Come Back,5,5,2,Safest to finish; fully emulator-testable; familiar genre
N1,Gaming,Boldest Original Concept,5,4,3,Most original loop; fun unproven until prototyped
A7-R,Gaming,Best First Five Minutes,5,3,3,Under-served genre; writing is the product; only two cases
N2,Gaming,Best Reason to Come Back,4,4,3,Free daily content; plays as well on paper
E3-R,Entertainment,Best Accessibility Forward,5,4,3,Least-targeted award; untested with blind players; thin on Technical
A1-R,Entertainment,Best First Five Minutes,5,4,3,Latency hidden by quantising; crowded genre; needs musical skill
N3,Productivity,Best First Five Minutes,5,4,3,Fast payoff; may read as a toy and be reassigned
P3-R,Gaming,Best First Five Minutes,4,4,3,Finished mechanic; same verb as Tiny Golf
A6-R,Entertainment,Best First Five Minutes,5,3,4,Public-domain art removes drawing; layer cutting is slow; weak return
A3-R,Gaming,Best Social & Multiplayer,4,4,3,Static and judgeable alone; shot codes are clumsy
A2-R,Gaming,Best Agentic Interaction,4,3,4,Runs offline; may satisfy neither award wording nor wrapper test
P5-R,Gaming,Best First Five Minutes,3,3,3,Reads as a model viewer; twelve objects is thin
```

Marked down from my round-two numbers: N2 (5 → 4), P3-R (5 → 4) and P5-R (4 → 3). In each case I had named a weakness I could not answer: plays as well on paper, shares last year's winning verb, and reads as a viewer.

## 4. Per-track ranking

Where a refined version exists I list it and leave out its as-written parent. Ties are broken by Feasibility, then by my judgement.

**Productivity**
1. P7-R Pocket Palace (6)
2. A4-R Three Stones (6)
3. N3 Snip (5)
4. A8 Spatial planning board, as written (4)
5. P5 Curious Cat, as written (3)

P7-R and A4-R are tied on my numbers. I put P7-R first because it gives a result inside one session, and because habit trackers are what the track text invites every entrant to build *(inference)*.

**Gaming**
1. G5-R Lantern (5, Feasibility 5)
2. N1 Hush (5)
3. A7-R Paper Trail (5)
4. N2 Alibi (4)
5. P3-R Perigee (4)

**Entertainment**
1. E3-R Close Your Eyes (5)
2. A1-R Strand (5)
3. A6-R Paper Theatre (5)
4. P3 Universe experience, as written (4)
5. A9 Interactive comic, as written (4)

E3-R leads A1-R on the judge's finding that Accessibility Forward is the least-targeted award pool and the engineer's that it is fully testable on a desktop.

### Overall recommendation: P7-R Pocket Palace

- **Main reason:** it is in the thinnest track, spatial depth is what makes it work, and a first-time player gets a real result in under five minutes.
- **Main risk:** judges read it as a memory game and reassign it to Gaming, where the field is far stronger.
- **Fallback if a day-one device check fails:**
  - If pinch is unreliable with hands held low (engineer's check 6), a round of about thirty pinches becomes tiring. Switch to **A4-R**, which needs under ten per visit.
  - If passthrough placement or anchors misbehave as well, switch to **G5-R**, which needs neither and is fully testable in the emulator.

The entry of my own I trust least is **A2-R**. It is the only one that needs a backend, and I could not show that it meets both the Agentic award's wording and the take-it-away test.
