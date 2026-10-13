# Addendum 3: the user disputes a finding and revises two ideas (2026-10-07)

You already evaluated S1 "Sonic Navigator" and its refinement S1-R "Owl Light".
Panel means for those: S1 Win 3.4 / Feasibility 3.0 / Difficulty 3.0; S1-R Win
4.4 / 4.0 / 3.0. The user has read the result, pushes back on one finding, and
asks for a re-evaluation with changed inputs. Same roles, same three rounds,
same scales (BRIEF.md, BRIEF2.md, CALIBRATION.md).

## The user's message, verbatim

"Jump versus duck can't be heard - why up and down is no different from left and
right. Spatial audio works really well by modifying the sound amplitude or
parameters in such a way in both ears that you should be able to not just
determine up and down but all of 3d direction even from back of your head thats
what spatial audio means like in songs or in audio where with your eyes closed
you feel like sound is coming from different places.

Instead of hand swipes maybe we can use directional input by moving head or eye
tracking (only future or for yet to be launched glasses)

This can be used in maze ideas as well where the player is always moving in
front and a hand gesture can be used to pause running. Turning can be either
actual turning if you are standing or just a head flick if sitting based on some
setting.

Reevaluate these"

## What must be re-examined, honestly

1. **The audio claim.** The earlier panel said height "cannot be heard" through
   the browser's generic spatial audio and cut jump and duck. The user says
   spatial audio conveys all 3D directions, including behind. Treat this as a
   real challenge to the panel, not as a misunderstanding to be explained away.
   Establish with primary or review sources: which cues carry left/right
   (interaural time and level differences) versus elevation and front/back
   (spectral cues from the outer ear); how accurate elevation and front/back
   localisation are with non-individualised head-related transfer functions
   (HRTFs) versus individualised ones; how much head tracking (available in a
   headset, absent on a phone) reduces front/back and up/down confusion; how
   long that takes relative to a reaction window; what Chromium's `PannerNode`
   HRTF actually renders (does it include elevation); whether redundant cues
   (pitch-to-height mapping, distinct timbres) make jump versus duck reliable;
   and the difference between binaural demo recordings and real-time rendering.
   Say plainly where the earlier panel overstated, and where the user's claim
   overstates. If jump and duck can be made reliably audible, say so: the
   earlier cut may have been unnecessary.
2. **Head or eye input.** Head pose is available to every WebXR page each frame
   and is testable in the emulator; eye gaze is a pointer on the VR Glasses only
   and cannot be tested before spring 2027. Examine: comfort and neck strain of
   repeated head tilts, nods and flicks in a reaction game; Meta's and other
   published guidance on head-based input; whether head movement used as input
   corrupts the very head-tracked audio cues the player is listening with;
   whether a game steered by the head satisfies the hard requirement "fully
   usable with hands, end-to-end" and the track wording "games designed for
   hands-first or eyes and hands", and how it scores on the Technical criterion
   (gaze interactions, hand tracking, passthrough, anchoring, FoV-aware design).
3. **First-person auto-run maze.** Examine: comfort of continuous forward
   self-motion plus frequent turns when seated (vection, artificial rotation,
   snap versus smooth turning; cite comfort guidance); the "actual turning if
   standing" option against the seated guideline, the airplane-seat test and a
   tethered-puck device; what a head flick is as an input (threshold, false
   triggers, fatigue) and whether a swivel chair changes anything; whether a
   pinch or open-palm gesture to pause is enough to count as hands-first; a
   70 by 66 degree field of view in corridors; and prior art for first-person
   mazes and auto-runners in VR.

## Entries to score (new IDs)

- **S2** "Sonic Navigator, head-steered" (as the user now describes it): S1's
  game (see ~20 seconds, then sound only; avoid obstacles; jump, duck, sidestep)
  with full 3D spatial audio relied on for every direction including up, down
  and behind, and with directional head movement as the input instead of hand
  swipes. Eye tracking is a future option for the VR Glasses, not required.
- **M1** "Auto-run maze, head-steered" (as the user now describes it): the
  user's maze idea G5 (limited above-maze jumps; removable arrow markers) played
  in first person, always moving forward; a hand gesture pauses running; turning
  is by physically turning when standing, or by a head flick when sitting,
  chosen in a setting. The user says the head and spatial-sound approach "can be
  used in maze ideas as well"; whether sound guides the maze is left open.
- Refined variants, written by the designer in round 2: **S2-R** and **M1-R**.

Reference points on the same scale: G5 maze as written 4.0 / 4.0 / 2.0; G5-R
Lantern (tabletop fogged maze) 4.4 / 5.0 / 2.0; N1 Hush 4.6 / 4.0 / 3.0; E3-R
Close Your Eyes 4.6 / 3.8 / 3.0; A4-R Three Stones 6.0 / 4.0 / 2.0.

## Ground rules

Same as before. Cite a URL for every factual or scientific claim; label
inference; invent nothing; concede where the user is right. Keep reports short.
Do not modify the project repository and do not spawn other agents.
