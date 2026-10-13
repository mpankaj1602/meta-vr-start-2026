# Research behind the concept

Working papers from the idea search for the Meta VR Start Developer Competition
2026, kept for the rare case where [the concept document](../lamplight-concept.md)
or [the competition notes](../competition-notes.md) is not enough. Nothing here
is needed to build the entry.

## How the research was done

A five-role review panel of AI agents evaluated every idea in three rounds:

1. **Round 1:** each role wrote an independent report.
2. **Round 2:** the designer revised the refined ideas after reading the other
   four reports.
3. **Round 3:** every role disputed the others, conceded where it was wrong, and
   gave final scores.

| Role | What it judged |
|---|---|
| Judge | The official four-part rubric and the special awards |
| Market analyst | What already exists and what people want |
| Engineer | What the platform can do and what can be made reliable |
| Skeptic | Rules, science, safety, legal exposure and demo-day failure |
| Designer | The strongest honest version of each idea |

Scores are the mean of the five roles:

- **Win** (1-10): chance of a prize by any route. Not a literal probability.
- **Feasibility** (1-5): likelihood of a polished, compliant result by the
  deadline.
- **Difficulty** (1-5): how hard the experience is to get right.

These are AI roles' judgments, not measurements. Nothing was tested on a headset.

## Files in `panel/`

| Prefix | Subject | Files |
|---|---|---|
| `BRIEF.md` | The shared brief every role read first | 1 |
| `r1_`, `r2_`, `r3_` | The first 38 entries: 15 user ideas, 9 assistant ideas, 14 refined or new | 11 |
| `BRIEF2.md`, `s_` | Sonic Navigator (swipe-driven) and its refinement, Owl Light | 12 |
| `BRIEF3.md`, `t_` | The audio dispute, head-steered Sonic Navigator and the auto-run maze | 12 |
| `BRIEF4.md`, `u_` | Cube solver and learner, and 3D sudoku; the AI-assisted timeline rule | 12 |
| `BRIEF5.md`, `SPEC_V1.md`, `SPEC_V2.md`, `L_` | Lamplight versions 1 and 2 | 13 |

File names end with the role: `judge`, `market`, `engineer`, `redteam` (the
skeptic) or `designer`. `r2_refined.md` and its `s_`, `t_`, `u_` equivalents hold
the full specs of every refined entry. Each brief corrects the ones before it;
`BRIEF2.md` has the official wording of the special awards.

## Other files

- `scores.csv`: the final score of every entry, with each role's win score.
- `scripts/s4d.py`, `s4d2.py`, `s9.py`: the moderator's checks on
  four-dimensional sudoku (size 4 has no grid when the box rule applies to all
  six slice directions; 66,816 grids with the natural time rule; a valid
  9x9x9x9 construction).
- `scripts/c4.py`, `c6.py`, `casc.py`: the designer's checks on 3D sudoku (768
  valid 4x4x4 grids; how many cells fill themselves).

## Caveats

- The reports were written to a temporary folder and rebuilt from the session's
  transcripts. Six surviving files matched their rebuilt copies exactly.
  `L_r1_judge.md` is a near-final draft, about 50 words longer than the version
  the panel used.
- `CALIBRATION.md`, which the later briefs mention, was a table of the first 38
  scores. `scores.csv` replaces it.
- Reports refer to each other and to the project by absolute paths on the
  machine where they were written.
- The Reddit community could not be read directly; "community" evidence is
  press, store data, Meta's own audience data and published surveys.

## Concepts the panel did not score

- **Set Down:** handwrite tomorrow's tasks on your real desk at the end of the
  day, with no voice or AI. It became Lamplight.
- **Lamplight version 3:** the final concept. It applies the panel's last
  must-fix list to version 2.

## Final scores, all entries

| # | ID | Name | Origin | Track | Win /10 | Feasibility /5 | Difficulty /5 |
|---|---|---|---|---|---|---|---|
| 1 | L-v2 | Lamplight, version 2 | refined or new | Productivity | 6.4 | 3.2 | 3.6 |
| 2 | A4-R | Three Stones | refined or new | Productivity | 6.0 | 4.0 | 2.0 |
| 3 | A4 | Daily ritual object | assistant | Productivity | 5.8 | 4.0 | 2.2 |
| 4 | L-v1 | Lamplight, version 1 | assistant | Productivity | 5.6 | 2.6 | 4.2 |
| 5 | A7 | Hands-on mystery | assistant | Gaming | 5.4 | 2.8 | 4.0 |
| 6 | N3 | Snip | refined or new | Productivity | 5.2 | 3.6 | 3.2 |
| 7 | A6-R | Paper Theatre | refined or new | Entertainment | 5.2 | 3.0 | 3.8 |
| 8 | P7-R | Pocket Palace | refined or new | Productivity | 5.0 | 4.0 | 2.8 |
| 9 | A1-R | Strand | refined or new | Entertainment | 5.0 | 4.0 | 3.0 |
| 10 | A1 | Playable music visualiser | assistant | Entertainment | 4.8 | 3.8 | 3.0 |
| 11 | A7-R | Paper Trail | refined or new | Gaming | 4.8 | 3.2 | 3.0 |
| 12 | A6 | Pop-up storybook | assistant | Entertainment | 4.8 | 3.0 | 3.8 |
| 13 | N1 | Hush | refined or new | Gaming | 4.6 | 4.0 | 3.0 |
| 14 | E3-R | Close Your Eyes | refined or new | Entertainment | 4.6 | 3.8 | 3.0 |
| 15 | G5-R | Lantern | refined or new | Gaming | 4.4 | 5.0 | 2.0 |
| 16 | S1-R | Owl Light | refined or new | Gaming | 4.4 | 4.0 | 3.0 |
| 17 | A3 | Tabletop duel | assistant | Gaming | 4.4 | 3.0 | 4.0 |
| 18 | A3-R | Your Move | refined or new | Gaming | 4.2 | 4.0 | 3.0 |
| 19 | G5 | Maze solver | user | Gaming | 4.0 | 4.0 | 2.0 |
| 20 | E3 | Movement through sound | user | Entertainment | 4.0 | 4.0 | 2.6 |
| 21 | N2 | Alibi | refined or new | Gaming | 4.0 | 4.0 | 2.8 |
| 22 | P3-R | Perigee | refined or new | Gaming | 4.0 | 3.6 | 3.0 |
| 23 | R1-R | Quarter Turn | refined or new | Gaming | 4.0 | 3.6 | 3.0 |
| 24 | A9 | Interactive comic | assistant | Entertainment | 4.0 | 3.0 | 3.0 |
| 25 | S2-R | Echo Wood | refined or new | Gaming | 4.0 | 3.0 | 3.0 |
| 26 | A2 | AI game master | assistant | Gaming | 4.0 | 2.2 | 4.8 |
| 27 | D1-R | Crosscut | refined or new | Gaming | 3.8 | 4.0 | 3.0 |
| 28 | A8 | Spatial planning board | assistant | Productivity | 3.8 | 3.2 | 3.2 |
| 29 | A2-R | The Room Rolls | refined or new | Gaming | 3.8 | 3.0 | 4.0 |
| 30 | A5 | Hand-shape learning | assistant | Gaming | 3.6 | 3.2 | 3.0 |
| 31 | P3 | Universe experience | user | Entertainment | 3.6 | 3.0 | 3.4 |
| 32 | S1 | Sonic Navigator (swipes) | user | Gaming | 3.4 | 3.0 | 3.0 |
| 33 | R1 | Cube solver and learner | user | Gaming | 3.0 | 3.2 | 3.4 |
| 34 | D1 | 3D sudoku | user | Gaming | 3.0 | 3.2 | 3.8 |
| 35 | G4 | Subway-style runner | user | Gaming | 3.0 | 3.0 | 3.0 |
| 36 | S2 | Sonic Navigator (head-steered) | user | Gaming | 3.0 | 3.0 | 3.0 |
| 37 | M1-R | Homing | refined or new | Gaming | 3.0 | 3.0 | 3.0 |
| 38 | P5-R | Curio | refined or new | Gaming | 2.8 | 3.2 | 3.0 |
| 39 | P5 | The Curious Cat | user | Productivity | 2.8 | 2.2 | 4.0 |
| 40 | G1 | Bowling | user | Gaming | 2.2 | 3.2 | 2.0 |
| 41 | P2 | Learn gardening | user | Productivity | 2.0 | 3.4 | 2.2 |
| 42 | G2 | Archery | user | Gaming | 2.0 | 3.0 | 3.0 |
| 43 | M1 | Auto-run maze (head-steered) | user | Gaming | 2.0 | 3.0 | 3.0 |
| 44 | P7 | Brain exercise | user | Productivity | 1.8 | 4.0 | 2.0 |
| 45 | G3 | Rafting | user | Gaming | 1.8 | 2.0 | 4.0 |
| 46 | E2 | 3D converter | user | Entertainment | 1.0 | 2.0 | 4.0 |
| 47 | P4 | Vacation visualiser | user | Entertainment | 1.0 | 2.0 | 4.0 |
| 48 | E1 | Anime converter | user | Entertainment | 1.0 | 1.0 | 5.0 |
| 49 | P1 | Car driving | user | Gaming | 1.0 | 1.0 | 5.0 |
| 50 | P6 | Gym | user | Productivity | 1.0 | 1.0 | 4.8 |
