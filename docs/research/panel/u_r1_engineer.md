`nm/` = `/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`. "Own test" = my exact-cover script `../u_eng/s3d2.mjs`, run in Node on a desktop; Quest speed is unmeasured.

## Is 3D sudoku well defined?

Yes, under three different rule sets; none is standard.

|Size|Symbols|Constraint set|Valid grids exist?|Cells|Playable in ten minutes?|Source or inference|
|---|---|---|---|---|---|---|
|3×3×3|9|Roxdoku: each of 9 slices holds 1-9 once; no line rule|Yes|27|Yes, 3-4 min|KSudoku handbook, which also offers 4×4×4 (16 symbols) and 5×5×5 (25): https://raw.githubusercontent.com/KDE/ksudoku/master/doc/index.docbook|
|any n|n|Latin cube: every axis line is a permutation|Yes (symbol = x+y+z mod n); 55,296 grids at n=4, 9.9×10^17 at n=6|n³|As below|https://oeis.org/A098679; https://users.cecs.anu.edu.au/~bdm/papers/hypercubes.pdf|
|4×4×4|4|Latin cube + 2×2 boxes in all 12 slices|Yes|64|Yes, 5-10 min|Inference: construction over Z2², machine-verified (own test)|
|6×6×6|6|Latin cube + 2×3 boxes in all 18 slices|Yes, with x cut in pairs, y in triples, z in pairs or triples by slice family. Fully rotating layout: none found in 3×10^7 nodes, undetermined|216|No, about 30 min|Own test (search). Inference: one box layout on all axes needs square n|
|8×8×8|8|Latin cube + 2×4 boxes in all 24 slices|Yes, box orientation rotating by axis|512|No, over an hour|Inference: construction over GF(2)³, machine-verified|
|9×9×9|9|All 27 slices are ordinary sudokus|Yes|729|No, 1.5 hours or more|Shipped product: https://www.tellini.org/products/ios/3doku; construction over Z3², machine-verified|

Times are inference from 10-30 minutes for an 81-cell puzzle (https://www.247sudoku.com/news/how-long-does-sudoku-take-understanding-puzzle-time-challenges/, secondary): about 12 s per blank cell.

**Unique-solution puzzles.** Fill a grid, remove clues one by one, keep a removal only if an exact-cover solver still finds exactly one solution. Own test, desktop: 4³ 8 ms; 6³ 0.1 s; 8³ 0.25 s; Roxdoku 5³ 52 ms; 9³ unfinished after 45 s. Random filling stalls at 8³ and 9³, so shuffle the constructions. Uniqueness needs only 5-19% clues, so grade difficulty with a singles-only solver. Generate 4³ and 6³ in a Worker; pre-generate 9³.

**Legibility and interaction (inference).** Meta asks 14 px minimum, 18 px comfortable (https://developers.meta.com/horizon/design/styles_typography/). Read as display pixels of digit height: 0.56-0.72° on Quest 3, 7-9 mm at 0.7 m; 5-6 mm on the Glasses. At 20 mm pitch a 9³ cube is 18 cm (15°) and fits the view, but each cell is 1.6°, half the 4 cm hand-ray target of the earlier day-one check, and interior digits sit behind up to eight layers. So: one active slice at 4 cm pitch, others ghosted; pinch-drag a handle to change slice; two-hand pull to explode; rotate with `DistanceGrabbable` `RotateAtSource` (`nm/@iwsdk/core/dist/grab/distance-grabbable.d.ts` L16); pinch-hold a cell for a radial digit palette. Draw digits as one instanced glyph-atlas mesh: 729 text objects exceed Meta's 200 draw-call guidance.

## R1

- **Turn gesture.** Most reliable seated: one-hand pinch-and-drag on a sticker. IWSDK pointers are `@pmndrs/pointer-events` pointers (`nm/@iwsdk/xr-input/dist/pointer/grab-pointer.d.ts` L7); events carry `pointerId`, `normal`, `localPoint` (`nm/@pmndrs/pointer-events/dist/event.d.ts` L37-55), so face normal plus drag direction picks layer and sense. Works by hand ray from the lap; 5 cm stickers at 0.6 m are 4.8°. Grab-and-twist with the other hand holding brings hands within 10 cm: "tracking may be lost ... when one hand occludes another" (https://developers.meta.com/horizon/design/hands-limitations-mitigations/), with no felt stop at 90°; offer it only if the device check passes. Arrows plus pinch: most reliable, least hands-first; keep as fallback. Whole-cube rotation: off-hand `RotateAtSource` on a separate shell entity, because grab components are one per entity (`nm/@iwsdk/core/dist/grab/one-hand-grabbable.d.ts` L16-20).
- **Snap (inference).** Reparent nine cubies to a pivot, follow the drag, tween to the nearest 90° on release, round transforms.
- **Solvers.** cubejs: MIT, Kociemba two-phase, 54-facelet string state, ≤22 moves, 4-5 s initialisation, worker included (https://github.com/ldez/cubejs). min2phase.js: GPLv3 and MIT texts, 0.35 s initialisation (https://github.com/cs0x7f/min2phase.js). rubiks-cube-solver: MIT, returns cross/F2L/OLL/PLL phases, Fridrich method, no explanations (https://github.com/slammayjammay/rubiks-cube-solver). The one JavaScript layer-by-layer solver found states no licence (https://github.com/ligangwang/rubikscube). **The beginner's-method tutor must be authored.**
- **Scanning a real cube.** Unconfirmed: WebXR `camera-access` is rejected; `getUserMedia` is the reported fallback (https://forum.babylonjs.com/t/webxr-camera-passthrough-support/58274). Optional only.

|ID|Best track|Core tech|Hardest problem|Dependencies|60 fps risk|Hands-only + seated?|Effort with AI|Win|Feasibility|Difficulty|
|---|---|---|---|---|---|---|---|---|---|---|
|R1|Gaming|Pointer-drag turns, pivot snap, cubejs in a Worker, authored tutor|Turn feel without haptics; a method that takes hours, taught in ten minutes|cubejs (MIT); name must change|Low (26 cubies)|Yes|Code in days; 2-3 weeks device tuning, tutor writing, playtests|4|4|3|
|D1|Gaming|Exact-cover generator, instanced digits, slice view, ray-pinch entry|Reading and picking cells inside a solid; 6³ and 9³ fail ten minutes|None|Low|Yes; hands only point|Code in days; 2 weeks legibility and difficulty playtests|3|4 (3 at 6³ or 9³)|3|

**Emulator.** Logic, ray and pinch-drag for both. Headset only: wrong-turn rate, two-hand occlusion, digit legibility, ray jitter.

**Rank.** R1 below A4-R, N3, P7-R, G5-R and N1, just above N2. D1 below all six, beside G4.

**Timeline instruction.** N3 Snip Feasibility 3 → 4 (its risk was geometry code). A2-R and S2-R lose "over budget" but stay 3. The other five named entries are unchanged.

**Day-one checks.** R1: 100 sticker drags from the lap, counting wrong turns; two hands on a 15 cm cube; solver initialisation time; camera list. D1: digits 6/8/10/12 mm at 0.7 m, opaque and ghosted; ray picks on 2/3/4 cm cells.
