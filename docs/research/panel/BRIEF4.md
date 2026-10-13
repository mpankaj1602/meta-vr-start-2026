# Addendum 4: two new ideas and a change to how time is weighed (2026-10-07)

Read `BRIEF.md`, then `BRIEF2.md` (corrections, official special-award wording,
platform findings), then this file, then `CALIBRATION.md`. You are a fresh
instance of one role on the same five-role panel (judge, market analyst,
engineer, red-team skeptic, designer). Same three rounds, same scales.

## Instruction from the user on timelines (binding for this round)

"These timelines should be way less with the help of AI ... for the tasks I am
not independently doing (i.e. coding without AI) the timelines should be way
less. And thus the timelines will be less of a bottleneck."

Apply it like this:
- The entrant builds with AI coding agents. Treat the time to write code as a
  minor constraint. Do not mark an idea down for code volume or algorithmic
  complexity that an AI coding agent handles well (solvers, generators, UI,
  state machines, shaders of ordinary difficulty).
- Do still name, separately, the things AI does not compress much: checks that
  need a physical headset, tuning how an interaction feels in the hand,
  playtesting with people, original art and sound, authored content, recording
  the demo video, and waiting on external services. These, not coding weeks, are
  what Feasibility should now reflect.
- Feasibility (1-5) therefore means: how likely is a polished, compliant,
  comfortable, hands-only result by 18 Nov given those non-compressible risks.
  Difficulty (1-5) means how hard it is to get the experience right, not how
  much code it is.
- Effort, if you give it, should be stated as "with AI coding assistance".

## Lessons from the panel's last two rounds (do not repeat these mistakes)

- The panel wrongly said height "cannot be heard" in browser spatial audio and
  had to concede. Check claims about what is impossible against sources before
  cutting a feature the user asked for; prefer "unreliable under conditions X"
  to "cannot".
- Refinements that quietly remove what the user asked for were criticised. Keep
  faith with the user's concept where the evidence allows; say plainly when it
  cannot be kept.
- Hands must do real work in the core loop: the one hard rule is "fully usable
  with hands, end-to-end", and Technical Implementation rewards hand tracking,
  gaze interactions, passthrough, anchoring and FoV-aware design.
- Each judge plays alone for five to ten minutes on a Quest 3/3S with empty
  local storage; "daily" hooks need a way to be felt in one sitting.
- Brand names are barred by the rules ("corporate logos, brand names ...
  recognizable branded products"), and names should be checked for collisions.

## Reference points on the same scale (panel means)

A4-R Three Stones 6.0 / 4.0 / 2.0 (Productivity; the panel's pick).
N3 Snip 5.2 / 3.6 / 3.2. A6-R Paper Theatre 5.2 / 3.0 / 3.8. P7-R Pocket Palace
5.0 / 4.0 / 2.8. N1 Hush 4.6 / 4.0 / 3.0. G5-R Lantern (tabletop fogged maze)
4.4 / 5.0 / 2.0. N2 Alibi (daily deduction puzzle on a tabletop) 4.0 / 4.0 / 2.8.
S1-R Owl Light 4.4 / 4.0 / 3.0. Full table in `CALIBRATION.md`. No entry has
averaged above 6. Those earlier scores were given before the timeline
instruction above; say if you think the instruction would move any of them.

Relevant earlier findings: Meta names puzzle first in the Gaming track; its
"Leisure Lovers" segment (puzzle, strategy, rhythm; shortest sessions) is
described as under-represented on Quest; Cubism and Puzzling Places are popular
hand-tracked puzzle games; the market analyst found daily-seed spatial puzzles
"validated but thinly supplied" and cited the scale of daily puzzle habits
(New York Times games).

## The two new ideas, in the user's own words

- **R1** "Rubiks cube solver and learner - with a 3d rubiks cube in front of you
  that you rotate using hand gestures"
- **D1** "3D sudoku (6x6x6 or 9x9x9 or any dimension that is possible - needs
  research) if it is possible"

Judge R1 and D1 as written. Refined variants written by the designer in round 2
get the IDs **R1-R** and **D1-R** and are scored separately.

## What needs establishing

For R1: the legal position of the name and the puzzle (the "Rubik's" trademark
and its owner, the status of the cube shape, what a clone may be called);
existing cube apps on Quest, Vision Pro, WebXR and phones, hand-tracked or not,
and how they are reviewed; how layer turns and whole-cube rotations can be done
with tracked hands without haptics (grab-and-twist, pinch-and-drag on a face,
gaze plus pinch), how reliable each is given finger occlusion, and how real
"finger tricks" compare; whether "why not a real ten-dollar cube" is answerable
(guided learning overlaid on the cube itself, undo, slow motion, a solver that
shows the next move, timing, patterns); solver and teaching methods available as
open-source JavaScript and their licences; the passthrough-camera route for
scanning a real cube and whether the browser allows it.

For D1: whether a three-dimensional sudoku is mathematically well defined and at
which sizes (for example 4x4x4, 6x6x6, 8x8x8, 9x9x9; the "Roxdoku" 3x3x3 variant
in KDE's KSudoku; Latin cubes with box constraints; whether every axis-aligned
slice can be a valid sudoku at each size); how puzzles with a unique solution
are generated and how hard they are for a person; existing 3D sudoku products on
any platform and in VR; the central usability problem of seeing and selecting
cells inside a solid grid (layers, exploded views, slicing with the hands,
rotation) and entering digits by gaze and pinch; legibility of small digits on a
Quest 3 and in a 70 by 66 degree view; session length against the "one bus
stop" test at each size; the status of the name "Sudoku".
