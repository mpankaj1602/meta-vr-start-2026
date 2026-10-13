# S1 Sonic Navigator: designer, round 1

| ID | Name | Track | Special award | Core mechanic | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|
| S1 | Sonic Navigator (as written) | Gaming | Best First Five Minutes (weak) | Four-direction arm swipes dodge obstacles heard after sight is removed | 4 | 3 | 3 |
| S1-R | Owl Light | Gaming (casual) | Best Accessibility Forward, claimed modestly; second: Best First Five Minutes | Slide a resting hand between three lanes to fly by ear after dusk | 5 | 4 | 3 |

## 1. S1 as written

- **First five minutes.** Twenty seconds of an ordinary lane runner played with G4's raised-hand swipes. Then the picture cuts out, one of the strongest single moments in the 39 entries. But nothing has taught which sound means jump, duck or sidestep, and jump versus duck depends on hearing height, which generic spatial audio conveys poorly (brief; [HRTF]). Runs end seconds after the blackout; the rest is blackness, retries and a tired arm.
- **Hand interaction.** Four ballistic arm swipes: neither comfortable nor reliable seated. Meta: "rapid or erratic hand movements can challenge the system's tracking accuracy" [LIM]. Up-swipes rise above heart level, down-swipes head for the thighs where hands "will not be detected" [LIM], and a return stroke can read as the opposite swipe (inference). In the dark, without haptics, a dropped swipe feels the same as a wrong decision.
- **Return tomorrow.** Only an implied high score.
- **Precedent.** FEER, a phone game, is already an audio endless runner with this mapping: swipe sideways for lanes, down to duck, up to jump; its reviewer struggled with the jump swipe [FEER]. What S1 adds is the sight-to-sound handover and the headset.
- **Scores.** Win 4, Feasibility 3, Difficulty 3. Above G4 because it has an idea; level with E3 because it stacks G4's input risk on E3's audio risk.

## 2. S1-R: Owl Light

Working name; "Sonic" in a game title risks trademark confusion (inference).

- **Pitch:** dusk falls in twenty seconds, then you fly a wood by ear until dawn shows what you dodged.
- **Track / award:** Gaming. Accessibility Forward ("experiences inclusive by default", "high-contrast modes"); First Five Minutes second.
- **Mechanic:** be in the silent lane when the beat lands.
- **Input:** forearm supported; slide the hand about 7 cm left or right. Lane is hand position, a state and not a swipe event: no speed, no return stroke, dropouts self-heal, and you feel your lane unseen. Pinch, the best-tracked gesture, hops a full-width branch. Thumb microgestures rejected: Quest Browser exposes them (IWSDK reads hand buttons 5-9), but Meta wants hands held "higher" and flags fatigue from "fast and repetitive swiping" [MICRO], and the emulator lacks them. Head-lean is offered for limited hand mobility.
- **Sound:** direction says where (three world-fixed bearings on a frontal arc; turning the head sharpens them); rhythm says when (arrival four beats after the first pulse, never under 2 s); timbre says what (thrum avoid, chime catch, rising sweep hop). Three dimensions only [SONIF]; nothing behind or above.
- **Seen in the dark:** stars, your own glow, and each tree lit only as it passes, so the display confirms and never predicts. At game over, dawn replays the flight in daylight.
- **Teaching:** in dusk every source is visible and pulses with its sound; each later sound is seen once before it is only heard.
- **Why a headset:** head-tracked sound, real darkness, hand position as controller. Admission: the loop survives on a phone (FEER; Blind Drive [BD]), so no Boldest claim.
- **Blind play:** menus are slide-to-hear, pinch-to-choose, with recorded prompts and number clips; a hiss marks lost tracking. Reaching "Enter VR" needs Meta's experimental screen reader [SR] or a helper. Untested with blind players: say "designed sight-free", and frame it as an audio game, not a blindness simulation.
- **Tests:** 15 cm of hand travel; three-minute night; lowering the hand pauses; static; no third-party service.
- **Return:** a second run lasts later into the night because your ears learned; date-seeded wood with a seven-night archive.
- **Video:** headset capture with stereo sound; the dawn replay is real footage of what was dodged; inset of the entrant's hand.
- **Assets:** synthesised sound, own voice, procedural silhouettes.
- **Cut:** duck, arm swipes, power-ups, leaderboards, passthrough.
- **Biggest risk:** unmeasured audio and tracking latency in a timing game; open speakers in a noisy room; thin on Technical.
- **Scores:** Win 5, Feasibility 4, Difficulty 3.

## 3. Relation and rank

- **Overlap:** S1-R, N1 and E3-R share a sound engine, the frontal-arc rule and the same risks. S1-R reuses E3-R's tracking hiss and modest claim.
- **Stronger:** S1-R over E3-R: it has a fail state, and every judge plays the sight-free mode by default, answering the skeptic's "judges will use the visual default". Level with N1, marginally ahead: its visuals cannot leak the answer. N1 stays more headset-native.
- **Merge:** S1-R supersedes E3-R as the audio entry. Keep N1 separate; a torch is a second mechanic.
- **Rank:** S1 at Win 4 joins the 4.0 group (16th-21st of 39) with E3, above G4 (26th), below E3-R and N1. S1-R at 5 should sit beside N1 and E3-R (11th-12th), below A4-R and P7-R: Gaming is the strongest field.

## Sources

- [LIM] https://developers.meta.com/horizon/design/hands-limitations-mitigations/ (heart-level wording: BRIEF2)
- [MICRO] https://developers.meta.com/horizon/design/design-microgestures/ ; buttons: `node_modules/@iwsdk/xr-input/dist/visual/adapter/hand-visual-adapter.js` L27-59; none in `node_modules/iwer`
- [FEER] https://afb.org/aw/19/11/15145
- [BD] https://www.gamedeveloper.com/disciplines/creating-i-blind-drive-i-an-audio-sensory-driving-game-experienced-through-sound (two-button audio dodging)
- [SONIF] Presti et al. 2021 via a third-party summary: https://a11y-paradise.onrender.com/reviews/69cc71154ccda838b543d817
- [HRTF] https://www.ieda.ust.hk/dfaculty/so/pdf/Ngan-et-al-2010-Ergonomics.pdf (front-back confusion; search summary only)
- [SR] https://www.meta.com/help/quest/1214695769962939/
