# R1 and D1: designer, round 1

| ID | Name | Track | Special award | Core mechanic | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|
| R1 | (as written) | Gaming | Best First Five Minutes (weak) | Turn cube layers by hand gesture | 3 | 3 | 4 |
| D1 | (as written) | Gaming | Best Reason to Come Back (weak) | Fill a solid cube of digits | 3 | 3 | 4 |
| R1-R | Quarter Turn | Gaming | Best First Five Minutes | Pinch a sticker, drag, the layer follows; ghost turns coach | 5 | 4 | 3 |
| D1-R | Crosscut | Gaming | Best Reason to Come Back (moderate) | Pull the cube into tiers, re-cut three ways, flick digits in | 5 | 4 | 3 |

My earlier scale (tops at 6). Names: one search each, no clash found.

## 1. As written

**R1.** Everyone knows the object, so minute one needs no words; the next four go on fighting the gesture. The natural reading, hold with one hand and twist with the other, raises both arms and makes each hand hide the other, which is where tracking drops [HANDS]. Return: lessons, but a non-solver gets no win unless the solver dictates. The title is a brand; a hands cube with a tutorial already sells on Quest, unrated [CPXR], and one was built on this SDK [DEVPOST].

**D1.** A block of 216 or 729 digits, most of them inside it, with no stated way to see or reach them. No hand interaction is given. Return: a daily is natural, but a 9x9x9 takes hours. 3D sudoku exists on screens [KSUDOKU] [KUBOKU].

## 2. R1-R: Quarter Turn

- **Cube:** on a stand 0.8 m away, 25° below eye line, 18 cm wide: stickers of 4.3°, above Meta's 2.5-3° minimum [HANDS]. Corner-on; the three hidden faces float beside it as mirrors. Faces carry glyphs as well as colours.
- **Turn:** point at a sticker, pinch, drag a few centimetres: the layer follows, clicks at a quarter turn, springs back if released early. Pinch beside the cube and drag to turn the whole cube. One resting hand at a time, so hands never cover each other. The target locks at pinch start, because pinching shifts the ray [HANDS]. Hold-and-twist is rejected: occlusion, raised arms, no resistance.
- **Fallback:** every ghost turn and rim arrow is a button: point, pinch.
- **First session:** the solved cube makes three slow turns and you undo them: solved inside a minute. Then lesson one of seven, the daisy and white cross, taught without algorithms [DAISY], on your own cube state.
- **Coach, not spoiler:** hints escalate on request: light the piece and its home; six words; one ghost turn. They come from a beginner-method solver, so each move is explainable. The fast solver shows only "turns from solved", plus a replay after the lesson.
- **Better than a real cube:** the lesson matches your cube, not a video's; undo, slow motion; mirrors; an exploded view showing fixed centres, twelve edges, eight corners.
- **Return:** seven goal cubes on a shelf; lesson two opens in the same sitting; a daily scramble.
- **Award:** First Five Minutes: "explains itself ... without a wall of text ... a payoff".
- **Tests:** 10 cm drags; lessons of 3-8 minutes saved per turn; nothing third-party.
- **Platform:** pointer, pinch, pinch-drag; emulator-testable. Device-only: drag feel.
- **Cut:** speed timing (no finger tricks without haptics); scanning a real cube (browser camera unconfirmed).
- **Risk:** turn feel is unprovable without a headset; low originality; trade dress, for other roles.

## 3. D1-R: Crosscut

- **Rule, shown not written:** every line and block holds each number once, whichever way you cut. Taught on one flat 4x4 tier with three blanks, which then drops into the cube.
- **Sizes (my script; engineer to confirm):** a 4x4x4 whose twelve slices are all valid sudokus exists, in only 768 grids; puzzles need about five givens and single-step logic: the three-minute first cube. A 6x6x6 with all eighteen slices valid also exists: the daily, about eight minutes (inference). 9x9x9 (construction, inference): one persistent cube worked over weeks.
- **Interior:** pinch the cube and pull: it opens into tiers like stacked glass trays, each a flat grid seen from above, which suits the taller lower view. Pinch beside it and drag to turn; pull again to cut along another axis. The same cell sits in three flat puzzles; choosing the cut is the play. Larger cubes open three tiers at a time.
- **Digits:** pinch a cell, a ring of digits blooms, slide toward one, release. Fallback: two pinches. Nine digits use a keypad layout.
- **Feedback:** a selected cell lights its three lines and blocks; a clash strings a red thread between the two cells; finished slices frost; pips count slices per axis.
- **Legibility:** 4 cm cells at 0.8 m are 2.9°; digits face you, colour-coded. Open stack about 11° by 21°. 6x6x6 cells are 2.5°, the minimum [HANDS]; 9x9x9 must enlarge the open tier.
- **Return in one sitting:** tier, first cube, today's cube; solved cubes sit on a week shelf.
- **Award:** Reason to Come Back, moderate. Not Boldest [KSUDOKU] [KUBOKU].
- **Tests:** pointer and 10 cm pulls; saved per cell; nothing third-party.
- **Platform:** as R1-R. Device-only: digit legibility, ray jitter.
- **Cut:** reaching in to poke cells (arms up, hands hide digits); the lines-free 3x3x3 variant (a second rule).
- **Risk:** dry; first cube too easy, daily may overrun ten minutes.

## 4. Rank and pick

P7-R = A4-R (6) > N3 = R1-R (5) > N1 = G5-R = D1-R (5) > N2 (4) > R1 = D1 (3). R1-R has the best opening on the table and the weakest originality. D1-R beats N2 because it cannot be played on paper. The timeline instruction moves none of my earlier scores: their limits were content, art and device checks. I would still build P7-R (panel: A4-R); of the new pair, R1-R, if a week-one device test shows pinch-drag turning feels good.

## Sources

- [HANDS] https://developers.meta.com/horizon/design/hands-ui-best-practices/
- [CPXR] https://queststoredb.com/game/cube-puzzle-xr-with-tutorial-and-timer-24048696964725297/
- [DEVPOST] https://devpost.com/software/rubiks-cube-vr (search summary)
- [DAISY] https://cube.academy/beginner (search summary)
- [KSUDOKU] https://docs.kde.org/trunk_kf6/en/ksudoku/ksudoku/variants.html
- [KUBOKU] https://www.phonearena.com/news/Kuboku-brings-3D-sudoku-to-iOS-devices_id14076 (search summary)
