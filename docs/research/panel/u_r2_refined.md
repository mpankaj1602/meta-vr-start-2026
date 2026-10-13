# Round 2: canonical specs for R1-R and D1-R (designer)

| ID | Name | Track | Target special award | One-sentence pitch | Status |
|---|---|---|---|---|---|
| R1-R | Quarter Turn | Gaming (puzzle) | Best First Five Minutes; second, Accessibility Forward (limited) | A cube on a stand that you turn with one pinch-and-drag, that sets you "three from solved" puzzles and then teaches you to solve it, with the lesson drawn on your own cube. | revised; the one I put forward |
| D1-R | Crosscut | Gaming (puzzle) | Best Reason to Come Back (moderate) | A glass cube of numbers you pull apart along any axis to read as flat boards, where forced cells fill themselves in chains. | revised; live |

This file is self-contained. Evidence cited by role is in u_r1_judge.md, u_r1_market.md, u_r1_engineer.md and u_r1_redteam.md. "My script" means scratchpad/designer_tmp/ (c4.py, c6.py, casc.py); the engineer has not checked it.

## Changes

**R1-R**
1. A real, unaided win by minute three: par puzzles ("three from solved"). Judge and skeptic (no beginner payoff in five minutes; the solver leaves the judge watching).
2. Own look: pale body, own palette, a glyph on every face. Judge, skeptic (the US trade dress is a black-bodied cube).
3. A complete one-hand, pinch-only path, and a second award target. Judge.
4. The layer is previewed before it commits. Market (a Vision Pro cube reviewed as "highly unpredictable").
5. The lesson map is visible from the start; any lesson can start from a prepared cube. Judge.
6. Tutor is authored; cubejs sets par and replays. Engineer.
7. Win held at 5 against the market evidence, on changes 1 and 3.

Lands, no answer: plastic turns better for ten dollars; two Quest cube apps with tutorials drew twelve reviews; a connected real cube already gives state-aware lessons with real haptics; an IWSDK cube build exists and may be in this field; no eyes-only path; accessibility untested with disabled players.

**D1-R**
1. Forced cells fill themselves. Market and skeptic ("tedious", "more cells, not more deduction").
2. Pull direction chooses the cut; no separate turn step. Judge (hands must slice).
3. Numbers are coloured, shaped beads that also carry the digit. Judge, skeptic.
4. First cube has five blanks. Judge.
5. 9x9x9 is an unlocked marathon, never the entry or the daily; 8x8x8 cut. Engineer, skeptic, judge.
6. Par scoring dropped: placements are fixed by the givens (my script).
7. Win 5 to 4.

Lands, no answer: the logic is easy at every size I tested; fifteen years on tablets found no audience; a judge who dislikes sudoku has nothing here.

**Reconciling 768.** The engineer found valid 4x4x4 grids exist and that 5-19% clues give a unique solution. I count 768 such grids: 32 patterns times 24 renamings of the digits. The two agree: so few grids is why so few clues suffice. For dailies, the date seed never runs out of instances but cannot vary difficulty: every 4x4x4 falls to single-step logic, and so did both my 6x6x6 samples.

## Spec: R1-R Quarter Turn

**Mechanic.** Turn the layers of a cube until each face is one pattern. Three ways in: par puzzles, seven lessons, free scramble.

**Hand input.** Primary: point at a tile, pinch, drag a few centimetres. The layer is highlighted after 1.5 cm, follows the hand, and springs back if released before 45°. Pinch beside the cube and drag to turn it whole. Fallback: pinch a rim arrow or the ghost turn. One-hand path: all of the above. Optional: the other hand pinch-holds to orient the cube from a distance, so hands never meet.

**What you see.** A pale 18 cm cube 0.8 m away, 25° below eye line; tiles of 4.3°; hidden faces in three mirrors; seven small goal cubes as the lesson map.

**First five minutes.** Undo three slow turns (0:40). Solve an unseen three-turn scramble unaided, scored against par (by 3:00). Lesson one, daisy then cross, begins.

**Why a headset.** See "Why not a real cube" below.

**Reason to return in one sitting.** Par ladder from two to six; lesson two unlocks; a date-seeded par puzzle.

**Award claim and limits.** First Five Minutes. Second: Accessibility Forward as "inclusive by default" (one hand, one pinch, glyph-coded, high contrast). Not claimed: eyes-only, since gaze is hidden until a pinch.

**Tests.** Seat: resting hands, drags under 10 cm. Bus stop: par puzzle 1-2 minutes, lesson 5-8, saved per turn. Take away: nothing.

**Content offered.** One 3x3x3; generated par puzzles graded by playtest; seven lessons (two playtested deeply, five as coached drills); a slow replay of any solve.

**Platform needs.** Pointer events carrying face normal and drag point; cubejs (MIT) in a worker: both confirmed by the engineer; emulator-testable. Unconfirmed: wrong-turn rate with real hands.

**Non-code work.** Turn tuning on a device (the engineer's 100-drag check); authoring the tutor and its six-word hints; par playtests with five non-solvers; turn, snap and solve sounds; palette and glyphs; video.

**Cut for experience reasons.** Hold-and-twist with hands together (occlusion, raised arms); speed timing (plastic wins); scanning a real cube (the judge has none; camera unconfirmed); other cube sizes.

**Biggest remaining risk.** Wrong-layer turns in front of a judge.

**My scores.** Win 5, Feasibility 4 (3 if the drag check fails and arrows become primary), Difficulty 3.

## Spec: D1-R Crosscut

**Mechanic.** Fill a glass cube so every line and every block holds each number once, whichever way it is cut. The last empty cell of any line or block fills itself, and the fills chain.

**Hand input.** Primary: pinch the cube and pull up, sideways or toward you; it opens into tiers along that axis, the spread following the hand. Pinch an empty cell, slide toward a number in the ring, release. Fallback: three axis tabs; pinch a cell, then a number. One-hand path: all of it.

**What you see.** An 18 cm cube 0.8 m away, 25° below eye line; cells of 3.2°; open stack about 13° by 20°. Each number is a coloured, shaped bead carrying its digit. A selected cell lights its three lines and three blocks; a clash strings a red thread; finished slices frost.

**First five minutes.** A cube with five blanks: pull, flick, watch the chain, done in 90 seconds. Then a first 4x4x4: eight givens, twelve placements, 44 cells fill themselves (my script).

**Why a headset.** A solid grid is what a flat screen shows worst; stereo keeps stacked tiers readable; a pull replaces layer menus. Conceded: it has run on tablets since 2011.

**Reason to return in one sitting.** Five-blank cube, first cube, today's cube; a shelf of the week's date-seeded cubes; fewer givens each rung.

**Award claim and limits.** Reason to Come Back, moderate: a streak and a shelf in a pool with established titles. Not Boldest.

**Tests.** Seat: one hand, pulls under 15 cm. Bus stop: 4x4x4 in 3-5 minutes; 6x6x6 about 8 (inference from my script: 70 givens, about 33 placements, two samples); saved per cell. Take away: nothing.

**Sizes offered.** 4x4x4 (judged path, quick daily); 6x6x6 (full daily; block direction changes by axis, drawn as tints); 9x9x9 as an unlocked marathon, labelled 90 minutes, one enlarged slab at a time.

**Platform needs.** Pointer, pinch, pinch-drag; one instanced glyph mesh; generator in a worker: confirmed by the engineer; emulator-testable. Unconfirmed: ghosted-bead legibility, ray picks on 3° cells.

**Non-code work.** Givens and pacing playtests with five people; device legibility checks; chain sounds; bead and glass look; video.

**Cut for experience reasons.** Reaching in to poke cells (raised arms, hands hide beads); timers; 8x8x8 (a second block layout, no new idea); the lines-free 3x3x3 (a second rule).

**Biggest remaining risk.** Pleasant but shallow: easy by construction.

**My scores.** Win 4, Feasibility 4, Difficulty 3.

## The two hard questions

**"Why not a real cube?"** Plastic wins on feel, speed and price, and I do not contest it. This wins on learning: the hint is for your cube, not a video's, and is recomputed after any wrong turn; undo exists, where on plastic one slip in a sequence destroys earlier work; any stage can be practised from a prepared cube; all six faces show at once; a par is something no plastic cube can tell you; and one pinch replaces two dexterous hands. The connected-cube app's 4.6 rating (market) suggests state-aware lessons are wanted; it also means they already exist with real haptics.

**"Tedious?"** The reviews blame 729 cells, entries needing no thought, and slow input. Here the judged cube has 64 cells; the cube places about three of every four numbers itself (44 of 56; about 113 of 146 at 6x6x6), so each placement is a decision followed by a payoff; entry is one flick; a pull replaces layer navigation. "Easier" I concede. Whether it holds interest past a week is unproven.

## Pick and rank

I put forward **R1-R**: its opening is the strongest on the table, hands turn an object, and it has two award routes. Order on my scale: A4-R, P7-R (6); N3 (5); R1-R, N1, G5-R (5); D1-R, N2 (4). D1-R is the safer build; I would switch to it if the day-one drag check fails.

## Disagreements

1. **Skeptic, "one ten-minute win, not a course".** I keep seven lessons: the user asked for a learner, and coding time is no reason to cut. The judged path is the opening and lesson one.
2. **Skeptic and judge, 9x9x9.** Kept as an unlocked marathon because the user named it and it is valid; fatal only as an entry point.
3. **Judge and skeptic, drop digits.** I keep digits on the beads; without them it is not the user's sudoku. They can be hidden.
4. **Market, D1 above R1.** Store traction is not the rubric; judges play the build. I concede the cube category's record.
5. **Engineer, 6x6x6 is thirty minutes.** With self-filling cells my script gives about 33 placements; at the engineer's 12 s each that is about seven minutes. To be checked.
6. **Judge, Reason to Come Back for the cube.** I target First Five Minutes because of the par puzzle.
7. **Judge and engineer, cube at 45-60 cm.** I keep 0.8 m: Meta advises against ray targets between 0.5 and 0.8 m (https://developers.meta.com/horizon/design/hands-ui-best-practices/).
