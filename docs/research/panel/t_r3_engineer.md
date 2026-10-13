`nm/` = `/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`.

## Build check

| ID | Hardest part | Hidden scope | Effort | 60 fps risk | Emulator | Quest 3/3S only |
|---|---|---|---|---|---|---|
| S2-R | Reading a 6 cm lean, 6 cm bow and 3 cm rise from a head that also turns to listen | Neck-pivot correction; baseline frozen during moves; two rule sets (with and without height); look-ahead beat scheduler (`nm/@iwsdk/core/dist/audio/audio-utils.d.ts` L18) | 4.5-5.5 pw | Low | Head pose (`nm/iwer/lib/device/XRDevice.d.ts` L227-228), pinch, scheduler, mix | Thresholds on real necks, height on speakers, resting-hand pinches, latency, neck comfort |
| M1-R | Comfort, unprovable before a device | Custom mover and snap (`player.rotateY`, `nm/@iwsdk/core/dist/locomotion/turn.js` L96); palm-up recogniser; per-junction save | 3.5-4.5 pw | Low | Maze, homing, facing choice, pinches | Comfort, palm pose, system-gesture clash |

Catching: only which hand pinched matters, so it survives a moving head and a dim scene; the dimming is drawn, tracking needs room light (https://developers.meta.com/horizon/design/hands-limitations-mitigations/).

M1-R: I agree it cannot be both. The dark, steady, snap-only build follows Meta's guidance (https://developers.meta.com/horizon/design/locomotion-comfort-usability/) and leaves an audio compass.

## Disputes

1. Designer (`t_r2_refined.md` L41): "rotation is never read". Counter: the tracked point sits at the eyes, ahead of the neck pivot, so a 30° turn or nod shifts it several centimetres (inference), against 6 and 3 cm thresholds. Rotation must be read to subtract it.
2. Designer (L73, L89): exit "within 25° of your nose" with "head turns inside 30°". Side exits lie 90° away; both cannot hold. Choose by yaw sign past about 15°.
3. Designer (L75): upturned-palm map plus pinches. Quest "reserves the gesture of palm pinch on both hands for system use" (https://developers.meta.com/horizon/documentation/web/webxr-hands/). Use another pose.
4. Skeptic (`t_r1_redteam.md` L14): S2 Feasibility 4. Counter: a sighted runner plus an audio game is 4-5 person-weeks, with height and behind tunable only on a device. 3.

## Concessions

- S2 Win 4 → 3: no hand in the loop (judge); head-tilt dodging ships on earbuds (market).
- M1 Win 3 → 2: first-person runners and mazes review as nauseating (market).
- My ±12° nod and tilt thresholds: withdrawn; looking up doubles neck load (skeptic).

## Final scores

```csv
ID,Track,Award,Win,Feasibility,Difficulty,Note
S2,Gaming,Boldest Original Concept,3,3,3,Head pose robust and emulated; no hand in loop; height and behind by position alone
M1,Gaming,none,2,3,3,Constant motion with frequent turns; looking equals steering; comfort unprovable in emulator
S2-R,Gaming,Boldest Original Concept,4,3,3,Body dodging plus hand catch; rotation leaks into position; over budget; neck and speaker unknowns
M1-R,Gaming,none,3,3,3,Comfortable only when dark and slow; palm map collides with system gesture; thin
```

## Placement

- S2 (3): beside G4, about 26th; below S1 (3.4), G5 and the rest.
- M1 (2): about 30th; below all listed.
- S2-R (4): the 4.0 band, about 20th; level with G5 on Win, below S1-R, G5-R, N1, E3-R, A4-R.
- M1-R (3): about 26th; below G5 and G5-R.
- I would not build S2-R over A4-R: lower Win, more work, more device-only unknowns. Its checks: head-position drift while only turning and nodding; forty leans and bows a night for comfort; rustle versus thud on speakers, 50 trials; pinches while bowing; `outputLatency`.
