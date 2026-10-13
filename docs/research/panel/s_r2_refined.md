# Round 2: canonical spec for S1-R (designer)

| ID | Name | Track | Target special award | One-sentence pitch |
|---|---|---|---|---|
| S1-R | Owl Light | Gaming (casual) | Best Accessibility Forward Experience | Your own room dims to night as you succeed, and you keep one hand in the quiet lane by ear until dawn shows what you dodged. |

Status: kept, revised. This file is self-contained; score from it.

## Changes

1. **Earned dark replaces the 20-second timer.** The room dims with each clean streak and returns for a few beats after a hit. No deaths; a night always lasts three minutes. Driven by the judge (change 4; "unfair deaths"; replayed easy seconds) and the skeptic (a missed input and a misheard cue feel identical).
2. **Hop cut; play is left-right only.** Engineer, judge and skeptic agree height cannot be heard. This drops the user's jump and duck entirely.
3. **Microgestures removed, with a correction.** In round one I wrote that the Quest Browser exposes them. The engineer shows that is undocumented, right-hand only and absent from the emulator. New fallback: pinch-steps.
4. **Starts in passthrough.** Judge (change 5); engineer ("black reads as a crash").
5. **Speaker-first mix.** Mid-band knocks, level panning, a sound check; my "low thrum" is gone. Skeptic (Quest 3S has no headphone jack), judge, engineer.
6. **Two channels from second zero, a "Keep the light" mode, captions, a gentle tempo.** Judge (change 3), market (Meta: do not rely on one form of feedback), skeptic (deaf players; sight-optional toggle).
7. **Hand outline always drawn, plus an edge tone.** Skeptic and engineer (unseen hands drift).
8. **Claim narrowed.** Skeptic, judge, market.

**Critiques that land and that I cannot answer**
- A blind player cannot launch it unaided: Meta's screen reader is experimental and needs controllers.
- The loop already ships on phones. It is new to headsets, not new.
- No in-headset blind playtest fits in six weeks.
- Built-in speakers in a noisy office: mitigated, unmeasured.
- Head turns help but are never required.
- Technical stays thin: one wrist joint and a dimmer.

## Spec

**Mechanic.** Be in the quiet lane when the beat lands. Clean streaks dim the room; a hit brings it back.

**Input.**
- Primary: one resting hand, forearm supported. Lane is where the wrist sits (left, centre, right, 7 cm apart): a state, not a gesture. A tick confirms each change.
- Fallback: pinch the left hand to step left, the right to step right. Touching fingers give the only tactile confirmation hands offer.
- Deciding check, day one on a headset: seated, hand on thigh, armrest and tray, 100 prompted lane changes each. The slide stays at 97% correct (my threshold); otherwise pinch-steps.

**Sound vocabulary.** Direction: which lane (hard left, centre, hard right, fixed to the room). Rhythm: when (four beats' warning, never under 2 s). Timbre: what (knock, leave that lane; chime, go to it). No height, nothing behind.

**What you see.** Your room dimming, never a black frame: horizon glow, hand outline and three lane lights stay. Obstacles show while lit and flash as they pass. All within the central 30°.

**Onboarding without text.** A 15-second sound check doubles as calibration: knock left, centre, right, each with a light; put your hand under each. Spoken lines of six words or fewer, captioned.

**Why a headset.** Conceded: the loop does not need one. It adds three things: your own room taken away and handed back; a lane felt in your hand, not found on glass; sound fixed to the room as your head turns. No Boldest claim.

**Accessibility claim and limits.** Claimed, in the award's words: "experiences inclusive by default", "high-contrast modes". Playable by ear alone, or muted by eye alone in Keep the light; audible menus; one hand; head-lean option. Not claimed: "voice alternatives", "eyes-only navigation", unaided launch, validation with blind players. A flat keyboard build lets blind testers try the audio remotely. Wording: "designed to be played without sight or without sound".

**Tests.** Seat: 15 cm of hand travel, or none. Bus stop: three-minute night; lost tracking pauses with a tone. Take it away: nothing to remove.

**Reason to return in one sitting.** Dawn replays the night as a ribbon of lit and dark stretches; night two holds more dark. Date-seeded, with a seven-night archive.

**The 3-minute video.** Headset capture: the room dims, light returns on hits, dawn replay. A headphones card, a labelled spectator strip, ten seconds of Keep the light.

**Platform needs.** Confirmed: wrist pose, pinch, Web Audio panning, passthrough, captions. Unconfirmed: dimming passthrough with an alpha layer (inference; fallback is a dusk dome), resting-hand tracking, three lanes on speakers (fallback: two), audio latency. Unused: microgestures, speech, gaze, anchors.

**Hosting and assets.** Static. Sound synthesised in Web Audio; the entrant's own voice; procedural shapes; caption font under the SIL Open Font Licence.

**Cut for six weeks solo.** Jump, duck, arm swipes, lives, power-ups, leaderboards, story. First to go if late: head-lean, passthrough.

**Biggest remaining risk.** Three lanes on built-in speakers with unmeasured latency, which only a device can show; and judges seeing a phone game in a headset.

**My scores.** Win 5, Feasibility 4, Difficulty 3.

## Disagreements

1. **Engineer, microgestures as fix one.** I keep them out even if check 1 passes: undocumented, invisible to the emulator, and detected "at the end of the motion" in a timing game. A wrist position arrives every frame.
2. **Skeptic, "performative" and a Win ceiling of 4.** A claim limited to what is built and tested is not performative; I do drop the word "accessible". The judge's own estimate for a refined version is 25-26/40, Win 5.
3. **Skeptic, "spatial does one bit of work".** True and deliberate: one robust bit is what survives built-in speakers.
4. **Market, below N1 and E3-R.** That ranking rested on fast swipes. S1-R's input is now slower than N1's torch sweep; I hold it level with N1 and above E3-R.
5. **Judge, "a blindfold, not access" and weaker than E3-R.** Half accepted. But the same build is a whole game by ear from second zero, and every judge plays that mode by default, which E3-R could not promise.

## Sources

- Screen reader, experimental and controller-only (re-read by me): https://www.meta.com/help/quest/1214695769962939/
- Award wording: BRIEF2.md. Phone prior art, speakers, microgesture and audio findings: s_r1_market.md, s_r1_engineer.md, s_r1_redteam.md, s_r1_judge.md.
- Three sound dimensions (Presti et al. 2021, read through a summary): https://a11y-paradise.onrender.com/reviews/69cc71154ccda838b543d817
