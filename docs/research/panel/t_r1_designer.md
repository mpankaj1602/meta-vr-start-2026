# S2 and M1: designer, round 1

| ID | Name | Track | Special award | Core mechanic | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|
| S2 | Sonic Navigator, head-steered | Gaming | Best First Five Minutes (weak) | Head movements dodge obstacles heard from every direction | 3 | 3 | 3 |
| M1 | Auto-run maze, head-steered | Gaming | none | Always-moving first-person maze; head-flick turns; gesture pause | 3 | 3 | 3 |
| S2-R | Echo Wood | Gaming | Best Accessibility Forward (modest claim) | Pinch to ping, hear the answer, lean away | 4 | 4 | 3 |
| M1-R | Homing | Gaming | Best First Five Minutes | Face the exit you want at each junction; home on a bell | 4 | 3 | 3 |

**Concession.** In S1-R I treated "weak" as "absent" and cut height without trying pitch or head movement. Both refinements work whichever way the audio evidence falls.

## 1. As the user describes them

**S2.** For twenty lit seconds you duck, lift and lean, which reads instantly: your body is the character. Then it goes dark: each dodge swings the head-tracked sound you are listening with, and telling behind from in front takes a head turn that the game reads as a dodge. The neck moves quickly every second or two and tires by minute three (inference).
- Input: head pose is the device's most reliable signal and runs in the emulator. Eagle Flight steered by head tilt comfortably [EAGLE]; flicks are the problem, not the head. Hands only press Start: controller-free, but not "hands-first design".
- Return: a high score.

**M1.** Walls stream past both edges of a 70° view while you are carried forward; at each junction a head flick swings the world. Looking down a side passage is the same movement as the turn command, so false turns come exactly when you are deciding. The stomach gets continuous self-motion plus frequent artificial rotation, which comfort guidance works hardest to tame [LOCO].
- Input: easy to detect, unreliable as intent. Standing turns fail the seat test and a tethered puck; "not all chairs spin" [LOCO]. Hands: one pause.
- Return: none stated.

## 2. S2-R: Echo Wood (working name)

- **Pitch:** pinch to click into the dark, hear the wood answer from every side, then lean, duck or lift clear.
- **Head:** a lean or tilt held as a state (about 10°, my value), never a flick, away from the sound, four ways. The rest pose re-centres when the head is still.
- **Hands:** nothing sounds until a hand pinches: each pinch is a click and obstacles answer from where they are. Pinch-hold pauses.
- **Listener versus controller:** echoes are snapshots heard at rest; the lean follows. Cues sit 45° apart, leans near 10° (inference).
- **Sound:** place and pitch say where, redundantly (above and higher, below and lower [PITCH]); echo delay says when. If elevation tests strong, pitch coding fades and sounds come from behind; if weak, pitch carries height.
- **Why a headset:** echoes stay fixed in the room, so turning or tilting and pinging again settles front-back and helps height [HEAD]; a phone cannot read a duck.
- **See, onboarding:** S1-R's earned dark; in dusk each pinch sends a visible ring and the answering tree lights. Six-word captions only.
- **Accessibility:** "inclusive by default" as S1-R, plus automatic ping; excludes players who cannot lean. Glasses later: look-and-pinch could replace the lean (unclaimed).
- **Tests, video:** small leans and a resting hand; three-minute night; nothing third-party. Film the room dimming and the rings.
- **Platform:** head pose and pinch confirmed and emulated; elevation legibility and resting-hand pinches need a device.
- **Cut:** flicks, standing, behind-cues at launch, leaderboards.
- **Risk:** eighty leans a night may tire the neck; an untracked hand silences the game.

## 3. M1-R: Homing (working name)

- **Pitch:** you are walked through a fog-lit hedge maze toward a bell heard through the walls; look into the passage you want, pinch-hold to stop.
- **Head:** a held look, not a flick: at a junction you take the lit exit you face (within about 20°), else straight on. Looking around between junctions does nothing.
- **Comfort:** one walking speed switched instantly, 90° snap turns at junctions only, a vignette while moving [LOCO]; fog cuts optic flow (inference). No standing mode.
- **Sound:** the bell is fixed at the exit; turning your head swings it, so you home in by left-right centring, which generic audio does best. Open passages hum before a 70° view shows them.
- **Hands:** pinch-hold stops; a short pinch drops or lifts one of five arrows; pinch-and-raise spends one of three lifts, a blink to a still overhead view.
- **Against Lantern:** same generator, arrows and lifts, seen from inside at real scale: higher ceiling, lower floor. Not above Lantern until a week-one comfort test passes.
- **See, onboarding:** lantern-lit hedges; a first maze of one corridor and one junction.
- **Accessibility:** captions; the bell drawn as a glow. No award claim.
- **Tests, video:** head turns only; four-minute maze saved per junction; nothing third-party. Film the bell swinging as the head turns, with a labelled top-down inset.
- **Platform:** head pose, pinch, positional audio confirmed; comfort needs a device.
- **Cut:** flicks, standing, smooth turns, enemies.
- **Risk:** queasy judges; mazes are a staple.

## 4. One game? Rank

One engine (head held as a state, room-fixed sound, pinch), two games: a maze has no up or down, which the user wants back.

- S2 and M1 (3): beside S1, below G5.
- S2-R (4): level with S1-R, nearer the user's idea.
- M1-R (4): above G5 on its hook, below G5-R on Feasibility.
- Both below N1, E3-R and A4-R, which I would still build.

## Sources

- [LOCO] https://developers.meta.com/horizon/design/locomotion-comfort-usability/
- [EAGLE] https://gamedeveloper.com/design/devising-the-vr-gaze-controls-of-i-eagle-flight-i- (search summary)
- [HEAD] https://www.frontiersin.org/articles/10.3389/fnins.2014.00210/pdf (search summary)
- [PITCH] https://link.springer.com/article/10.3758/s13414-016-1273-6 (via the engineer)
