| ID | Best track | Verdict | Strongest objection | Evidence | Fix if any | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|---|
| R1 | Gaming (puzzle); award: First Five Minutes, weakly | SERIOUS, fixable | It already ships on Quest and was ignored; plastic turns better | Speed Cube (2021, hands, teaches solving): 2.7★ from 12 reviews [SC]. Cube Puzzle XR (2025, passthrough, tutorial, timer): no ratings [CPX]. cuVision (Vision Pro): too few ratings to display [CUV] | Unbranded cube at chest height; one pinch-drag turn; teach one ten-minute win, not a course | 3 | 3 | 3 |
| D1 | Gaming (puzzle); no award | SERIOUS, fixable; FATAL at 9x9x9 | More cells, not more deduction; a tablet already does it | 3Doku (iPad, 729 cells): one reviewer found the extra constraints make it easier; another "had to do it 100 times to fill everything in" [3DK]. Pocket Gamer (2.5/5) said sudoku does not need 3D [PG] | Smallest valid cube solvable inside ten minutes; hands slice the grid; colours or symbols, not small digits | 3 | 3 | 4 |

## R1
- **Brand.** Spin Master bought Rubik's Brand Ltd in January 2021 [SM]. EU: the General Court annulled the coloured shape mark on 9 July 2025 (the black-and-white one fell in 2019); the name and logo stay protected [EU]. US: the registered trade dress is a black-bodied cube, nine squares a side, each side one solid colour; a magistrate recommended holding it non-functional and left infringement by a white-bodied rival for trial [US]. The rules bar brand names and recognisable branded products [RULES]. So the name must go; a generic cube with a non-black body and its own palette is probably safe (inference, not legal advice).
- **Why not a real cube.** Unanswered as written. Overlay, undo and hints are a real answer, but both shipped Quest apps already have tutorials [SC][CPX].
- **Feel.** I found ratings, not written reviews of turning quality. Inference from general evidence: a reviewer of a hand-physics game reported virtual hands often glitching and fingers mistracked [HPL]; Meta says heavily obscured hands vanish [LIM], which a two-hand cube grip invites, and advises against holding hands above heart level [BP]. Unreliable in that grip, not impossible.
- **Solver and learner** (inference). The solver leaves the judge watching; a full method cannot pay off in ten minutes.
- **Camera scan.** Developers report WebXR `camera-access` is rejected in Quest Browser, with `getUserMedia` as a lossy fallback [CAM] (search snippet; verify on device). More decisive: the judge has no cube, and entries should not need a third-party device (BRIEF2).
- **Awards.** Boldest fails: it exists as a toy (inference). First Five Minutes only if refined.
- **Non-code scope:** lesson design, turn feel on a headset, turn sounds replacing haptics. **Demo day:** a wrong-layer turn wrecks a lesson.

## D1
- **Fun.** Evidence above. KDE describes Roxdoku as having no rows or columns and as easier than it sounds [KDE]: overlapping blocks, not spatial deduction.
- **Platform test.** 3Doku runs on iPad [3DK], so the Boldest award's other-platform test fails.
- **Seeing and entering** (inference): interior cells hide; 81 digits per layer must fit a 70x66 degree view; gaze and pinch per digit is slower than touch. Pocket Gamer faulted even keypad input as slow (search summary of [PG]).
- **Hands.** As written they are buttons; BRIEF4 wants real work.
- **Lone non-player judge** (inference): the three-axis rule needs explaining; five minutes fills a corner.
- **Name.** Nikoli's "Sudoku" mark is Japan-only [NIK] (search snippet); low risk.
- No VR 3D sudoku found (not proof of absence).
- **Non-code scope:** difficulty tuning needs human playtests; legibility is device-only; sound and art for an abstract grid.

## Ranking (my scale: A4-R 6; N3, P7-R, G5-R, N1 4; N2 3)
Both sit below the first five. R1 is level with N2: hands do real work, but it plays better in plastic. D1 is last: hands idle, tedium evidenced.

## Timeline instruction
- **Moves:** Feasibility up about one for code-bound entries (A3 netcode, N3 geometry, A8 export); G5-R's and A4-R's finishability edge narrows. No Win changes.
- **Stays hard:** no headset (turn feel, legibility, passthrough, 60 fps); A6-R art; A1-R music; A7 authored cases; service uptime after the freeze for A2 and P5 [RULES]; N1's unproven fun; daily hooks for a lone judge; every platform or rule verdict (E1, P1, P4, P6, P7).

## Sources
[RULES] https://start-developer-competition-26.devpost.com/rules
[SM] https://www.newswire.ca/news-releases/spin-master-completes-acquisition-of-rubik-s-cube-r--824049314.html
[EU] https://www.mondaq.com/trademark/1664844/eu-general-court-rules-in-latest-rubiks-cube-case
[US] https://ipandmedialaw.fkks.com/post/102gqjy/sdny-magistrate-judge-recommends-that-rubiks-cube-design-is-not-functional
[SC] https://vrdb.app/game/3812740692111787
[CPX] https://queststoredb.com/game/cube-puzzle-xr-with-tutorial-and-timer-24048696964725297/
[CUV] https://apps.apple.com/us/app/cuvision/id6705121815
[HPL] https://roadtovr.com/?p=170345
[LIM] https://developers.meta.com/horizon/design/hands-limitations-mitigations/
[BP] https://developers.meta.com/horizon/design/hands-best-practices/
[CAM] https://communityforums.atmeta.com/discussions/Questions_Discussions/request-webxr-raw-camera-access-camera-access-feature-in-quest-browser/1367463
[3DK] https://apps.apple.com/us/app/3doku/id451510747
[PG] https://www.pocketgamer.com/3d-sudoku/review/
[KDE] https://docs.kde.org/trunk_kf6/en/ksudoku/ksudoku/variants.html
[NIK] https://automaton-media.com/en/news/20230830-21220/
