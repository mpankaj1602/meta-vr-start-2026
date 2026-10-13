# Round 2: canonical specs for S2-R and M1-R (designer)

| ID | Name | Track | Target special award | One-sentence pitch | Status |
|---|---|---|---|---|---|
| S2-R | Echo Wood | Gaming (casual) | Boldest Original Concept (moderate) | As your room dims to night you dodge what you hear with your body, left, right, over and under, and catch chimes with your hands. | revised; the one I put forward |
| M1-R | Homing | Gaming (puzzle) | none | You are walked through a night maze toward a bell, taking the exit you face at each junction and marking your way by hand. | revised; live, not recommended |

Two entries, not one: a maze is flat, so merging would drop the up and down the user asked to get back. This file is self-contained. Evidence cited by role is in t_r1_engineer.md, t_r1_redteam.md, t_r1_judge.md and t_r1_market.md.

## Changes

**S2-R**
1. Hands now catch; the ping is gone. I had offered an automatic ping, which showed it was dispensable. Judge (change 1), skeptic ("a real job for hands"), market (hands are the sensor earbuds lack).
2. Head input is position only; rotation is never read. Engineer ("must not steer by yaw"), judge, skeptic.
3. Rise is a taller sit, not a chin lift. Skeptic: looking up doubles neck load.
4. Height is coded three ways, with a sound check that falls back to left-right. Engineer, skeptic, judge.
5. Behind is used only where the answer does not depend on it. Judge, engineer.
6. Award target moved from Accessibility Forward to Boldest, moderate. Judge.
7. Never fully black; the bow is calibrated in the light. Skeptic (ducking blind at a desk).
8. Feasibility 4 to 3: two inputs and more device-only tuning.

Lands, no answer: the parts ship elsewhere and only the combination is new; open speakers may defeat height for some judges, and the fallback then removes jump and duck for them; neck comfort over minutes is unmeasured; players who cannot lean are excluded.

**M1-R**
1. Night maze: darkness is now the comfort measure. Skeptic (vection is visually induced), market (lit first-person mazes review badly).
2. The lift is a map in an upturned palm, with no camera rise. Engineer, judge.
3. Arrows hum where they lie. Judge (markers by hand).
4. Standing mode cut. Judge, skeptic, engineer.
5. Win 4 to 3.

Kept against advice: the auto-walk, the pinch-hold stop and head-based turning, because they are what the user asked for.

**Plain answer on the maze.** I cannot make it both comfortable and competitive. Made comfortable it is dark, slow and flat; a phone with earbuds can run its core; one queasy judge ends it. I would tell the user: head-and-sound play belongs in S2-R, and if you want a maze, G5-R Lantern is the one to build.

Lands, no answer: looking and steering still share the head, sampled on a beat but not separated; comfort cannot be shown before a device.

## Spec: S2-R Echo Wood

**Mechanic.** Dodge knocks with your body; catch chimes with your hands. Clean streaks dim the room; a hit brings it back.

**Head input.** Position only, read when the beat lands: lean 6 cm left or right, bow 6 cm to duck, sit 3 cm taller to rise (engineer's thresholds; the rise is mine), from a running baseline. The head stays free to turn and listen.

**Hand input.** Pinch the hand on the chime's side as it arrives. Pinch-hold pauses.

**Sound vocabulary.** Direction: left or right on a room-fixed arc; overtakers may come from behind, where the same lean answers, so front-back confusion costs nothing. Height: placement, pitch and timbre together (rustle above, thud below). Timing: four beats' warning, at least 2 s. Timbre: knock avoid, chime catch.

**What you see.** Passthrough dimmed by a drawn black layer, never fully; hand outlines; a jar of caught fireflies; silhouettes while lit.

**Comfort measures.** No camera motion, nods, flicks or chin lifts. The desk edge stays visible. Three-minute nights.

**Onboarding without text.** One of each in the lit room, seen and heard: trunk, branch, log, firefly. The height pair is the sound check. Six-word captions.

**Why a headset.** Only a headset tracks head position and both hands; earbuds give rotation, phones neither. Conceded: head-tilt dodging and head-tracked audio play ship elsewhere.

**Award claim and limits.** Boldest: a loop that "depends on presence ... or eyes and hands". Not claimed: Accessibility Forward, or "couldn't exist anywhere else" beyond the combination.

**Tests.** Seat: 6 cm moves, hands at rest. Bus stop: three-minute night, pinch-hold pause. Take it away: nothing to remove.

**Reason to return in one sitting.** Dawn replays the night; night two is darker with a fuller jar. Date-seeded.

**Platform needs.** Confirmed and emulated: head pose, pinch, elevation rendering with a head-following listener, black-mesh dimmer. Device-only: resting-hand pinches, height on speakers, latency, neck comfort.

**Cut for six weeks solo.** Ping, flicks, standing, eye input, lives, leaderboards.

**Biggest remaining risk.** Forty leans and bows a night under a headset, and two tasks at once in minute one.

**My scores.** Win 4, Feasibility 3, Difficulty 3.

## Spec: M1-R Homing

**Mechanic.** You are walked through a night maze at one steady pace. At each junction you take the exit you face; a bell at the way out tells you where to face.

**Head input.** A held look, sampled on the junction beat after two warning ticks: the exit within 25° of your nose, else straight on. Dead ends turn you round. No flicks; looking about in corridors does nothing.

**Hand input.** Pinch-hold stops the walk. A short pinch drops or lifts one of five arrows. An upturned palm shows the maze as a model in your hand, three times a night.

**Sound vocabulary.** Direction: the bell, fixed at the exit, centred by turning the head; open passages hum from their side. Height: unused. Timing: footsteps, two ticks. Timbre: bell goal, airy hum opening, low hum arrow, thud dead end.

**What you see.** A lantern pool at your feet, junction posts, glowing arrows.

**Comfort measures.** Darkness removes most optic flow; 1.4 m/s switched instantly; 90° snap turns at junctions only; no standing mode.

**Onboarding without text.** Maze one is a corridor and one junction. Stop, arrow and palm map arrive one per maze.

**Why a headset.** Weak, conceded: homing by head turn ships on earbuds. The headset adds arrows and a map in the hand.

**Award claim and limits.** None.

**Tests.** Seat: head turns inside 30°. Bus stop: four-minute maze saved per junction. Take it away: nothing to remove.

**Reason to return in one sitting.** Date-seeded night, week archive, fewer arrows used.

**Platform needs.** Confirmed: head pose, pinch, positional audio. To build: an auto-walk mover and a palm-up recogniser. Device-only: comfort.

**Cut for six weeks solo.** Flicks, standing turns, lit corridors, enemies.

**Biggest remaining risk.** A motion-sensitive judge stops in minute one.

**My scores.** Win 3, Feasibility 3, Difficulty 3.

## Disagreements

1. **Judge and skeptic, the M1 fixes** (run only while pinching, pinch between junctions, turn by pointing). They are comfortable because they stop being M1. I would rather score the user's idea honestly at 3 than rename Lantern.
2. **Market, "still no" on the platform test.** For S2-R the answer is "partly": the rivals cited read head tilt, and none reads head position with two hands. I claim Boldest as moderate only.
3. **Judge, nothing from behind.** I keep behind where the same lean answers front or back. It costs no accuracy and gives the user the direction they asked for.
