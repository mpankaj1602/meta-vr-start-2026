"Measured" = my script `../u_eng/s3d3.mjs`.

## Build check

|ID|Hardest part|Found|Headset only|Day-one checks|
|---|---|---|---|---|
|R1-R|A drag that never turns the wrong layer; lessons written and tried on non-solvers|Corner-on, a top tile's two drag directions look 60° apart, not 90° (inference). Glyphs must be four-fold symmetric or solved centres look turned. Whole-cube turns should snap; one-hand path holds|Wrong-layer rate; resting-hand pinch|100 drags corner-on and face-on; pinch on lap and armrest|
|D1-R|Three cuts that each read as flat boards; chains that feel earned|Sideways boards are edge-on and toward-you boards stack in depth, so each cut needs its own fan or turn (inference). 6x6x6 in 18 cm gives 2.15° cells, under Meta's 2.5-3° (https://developers.meta.com/horizon/design/hands-ui-best-practices/); needs 21-25 cm. Digits 27 px on Quest 3, 40 on Glasses; a locked 9x9x9 slab spans 22.5°: both fine|Pull-axis misreads; picks on 2-3° cells; ghosted beads|30 pulls per axis; cell-versus-pull pinch errors|

## 3D sudoku numbers checked

- 4x4x4 grids: 768 (measured, exhaustive): 32 patterns times 24 renamings, only 2 distinct under slice and axis swaps.
- 4x4x4, 8 givens, 200 puzzles: 12-16 placements, 44 self-fills. 6x6x6, 70 givens, 40 puzzles: 31-36 placements, 113 self-fills (measured). The designer's figures hold.
- Every step has a single provable inside one flat slice (measured): re-cutting is search, not deduction.
- Difficulty: 4x4x4 never needs more than singles, even at 4 givens. 6x6x6 at 12-16 givens needs more in 38 of 40 (measured); it has over 550,000 grids.
- Time (inferred, 12-20 s per placement): 4x4x4 about 3 minutes; 6x6x6 7-12.
- Dailies: 4x4x4 seeds never run out but each day is the same easy cube; use 6x6x6.

## Disputes

1. Designer, "cubejs sets par": cubejs returns 22 moves or fewer, not the shortest, and takes face turns only (https://github.com/ldez/cubejs). Par needs breadth-first search over the 18 quarter turns a drag makes, middle layers included.
2. Designer, dailies "cannot vary difficulty": true at 4x4x4, false at 6x6x6 (above).
3. Designer, "no separate turn step": see build check.

## Concessions

- R1 Win 4 → 3: two hand-tracked Quest cube tutors drew twelve reviews; an IWSDK cube exists (`u_r1_market.md` L10-11).
- 6x6x6 time 30 → 7-12 minutes with self-fill.
- Cube distance 0.6 → 0.8 m: Meta says avoid 0.5-0.8 m.

## Final scores

```csv
ID,Track,Award,Win,Feasibility,Difficulty,Note
R1,Gaming,none,3,4,3,Shipped twice on Quest with tutorials and ignored; turn feel needs a headset
D1,Gaming,none,3,4,3,Valid at every size; only 4x4x4 fits ten minutes; hands only point
R1-R,Gaming,Best First Five Minutes,4,4,3,Par puzzles give an early win; wrong-layer turns and tutor playtests are the risk
D1-R,Gaming,Best Reason to Come Back,4,4,3,Numbers confirmed; self-fill fixes length; every step is a flat single so shallow
```

## Placement

R1-R and D1-R (4): level with N2 Alibi, below A4-R, N3, P7-R, N1 and G5-R; R1-R ahead on opening, D1-R on safety. R1 and D1 (3): below all six. I would build neither over A4-R: lower Win, equal Feasibility, and each rests on a feel only a headset proves.
