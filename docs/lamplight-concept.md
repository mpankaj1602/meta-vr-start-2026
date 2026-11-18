# Lamplight (working title): final concept

Entry concept for the Meta VR Start Developer Competition 2026, Productivity
track, New Experience division. This is the high-level definition: what the
product is, what it must and must not do, and what it does. Thresholds, layouts,
exact gestures and library choices are deliberately left for the build.

Status: version 3. Versions 1 and 2 were evaluated by a five-role review panel
(judge, market analyst, engineer, skeptic, designer). Version 3 applies the
panel's final must-fix list and has not itself been re-scored.

## 1. The idea

**One line:** Put tomorrow on your desk, pick three, switch off.

An end-of-day ritual of about three minutes, in passthrough mixed reality, on
the real surface in front of you. A small desk lamp lights a set of cards for
what is on your mind. You slide three under the lamp for tomorrow and pull its
chain to switch off. The next time you sit down, the cards are where you left
them.

- **Single mechanic:** pinch a card and slide it across your real desk into one
  of three lit slots. Everything else makes cards, returns them or retires them.
- **Not a chat assistant:** the lamp never converses. It listens once, lays out
  cards, points, and you decide.
- **Not a notes app:** it keeps three cards and it ends.
- **Stance on "a phone is faster":** the product is closure, deciding and
  setting it down, not a list you consult all day. The app and the video say so.

## 2. Panel scores

| Version | Win /10 | Feasibility /5 | Difficulty /5 |
|---|---|---|---|
| 1, as first written | 5.6 | 2.6 | 4.2 |
| 2, after the panel's changes | 6.4 | 3.2 | 3.6 |

- Version 2 is the first concept the panel scored above 6.0 on average.
- Forecast if the first three device checks pass: Win 7 from four roles; the
  skeptic holds 6 with voice as upside.
- All five would build it over the earlier pick, Three Stones (the engineer only
  if the checks pass within two days with the headset; the market analyst
  narrowly).
- The judge's 7 rests on the Productivity route alone.

## 3. Requirements (always)

**The ritual**
1. Wake and switch-off by pulling the lamp's chain, using the same pinch as
   everything else.
2. Cards reach the desk from three sources that need no microphone and no
   network: starter cards, cards the user writes silently with the system
   keyboard, and cards carried over from last time.
3. Sorting is by sliding: three slots under the lamp, a "later" tray, a "done"
   pad (a stamp falls on arrival), or past the edge of the light to let go.
4. The next session opens on the previous session's cards, where they were left,
   to be retired before anything new is added.
5. The first run is silent, hands-only and offline, and ends with the user
   having placed at least one card of their own.
6. A wordless demonstration teaches the one gesture. No text longer than six
   words anywhere.

**The lamp**
7. A fixed, faceless desk lamp with a turning shade and a pull chain. Light is
   its only language: it points, warms, breathes and dips.
8. The lamp proposes before the user chooses, only when it has a true reason to
   give in six words or fewer (for example "carried twice"). Otherwise it stays
   quiet. It never second-guesses a choice already made.
9. The lamp's pick always comes from simple local rules, in every mode. It is
   never described as artificial intelligence.

**Space and hands**
10. Passthrough, with lamp and cards on the user's real surface, found without
    any room setup. The user places the lamp by hand. A slanted floating tray
    appears when there is no surface.
11. The real desk is for forearm rest and feel, never a touch sensor.
12. Card positions are remembered relative to the lamp, with a one-gesture way
    to re-place the lamp.
13. Everything sits low and central and fits an airplane tray table. One-hand
    use, a mirrored layout and a pointer-only route are complete.

**Trust, inclusion and judging**
14. Captions for everything; large, high-contrast type by default; nothing
    conveyed by colour alone.
15. State saved on every change, instant resume, fast cold start.
16. One labelled preview, "tomorrow", that shows the user's own cards waiting.
17. Sound designed as a substitute for touch: paper scrape tied to hand speed,
    slot knock, stamp, chain click.
18. No sleep, health or wellbeing claim anywhere in the app, description or
    video.

## 4. Requirements if voice passes its device checks

These become must-haves once checks 1 and 2 in section 9 pass. If voice is not
dependable by the end of the second week with the headset, all of section 4 is
removed and the entry ships hand-first.

19. Voice is an invitation after the first payoff, never a gate. If the
    microphone is refused or the service is down, the voice control is absent
    and everything else works.
20. Push-to-talk only, a visible listening state, and the user sees what was
    understood before cards are made.
21. Cards carry the user's own words, shortened, never rewritten into advice or
    steps they did not say. A wrong card is fixed in one move, by voice or by
    keyboard.
22. What the model adds, stated plainly: it splits a ramble into separate
    cards; it recognises an item already on the desk and merges instead of
    duplicating; it asks at most one question about one vague card; and it
    notes urgency or dates the user actually said, which the local rules may
    quote as a reason ("you said Friday").
23. The model only proposes structured actions; the app executes them.
24. A failure ladder that never dead-ends: structured cards, then transcript
    cards, then a voice-memo card, then the keyboard and starter cards.
25. One labelled replay of a recorded sample, a single pinch away from the
    first payoff, so a user who will not speak still sees the model work.
26. An exact, vendor-true statement of what leaves the headset, a privacy
    policy page, and consent before the first recording.
27. A small server that needs no attention from submission to 11 December:
    rate-limited, hard spend cap, two providers with automatic fallback, pinned
    model versions, an uptime check.
28. A complete hands-free route: a handful of spoken sorting commands, tested
    with disabled users before any accessibility claim is made.

## 5. Should have

- Carried-over cards visibly curl; after two carries the lamp offers "smaller
  step, or let go?".
- A way to see tomorrow's three outside the headset, such as a private link.
- A short sweep of the beam over the cards when a session opens.

## 6. Could have (only after everything above is polished)

- Handwriting a card on the desk with a pen-grip pinch.
- Palm-press as another way to mark a card done.
- The user's own audio kept on every card, not only on failure.

## 7. Non-requirements (out of scope)

- Conversation with the lamp, or any open-ended chat.
- Advice of any kind; inventing tasks or next steps.
- Any reference to bed, sleep or wellbeing benefits.
- A character lamp: no sprung arm, hop, nod, bow, face or spoken voice.
- Streaks, weekly review, a "day 7" preview, cosmetic growth, phrasing memory,
  time tags, type marks on cards.
- Head-nod input, fist-crumple, handwriting recognition.
- Calendar, email or phone integrations; accounts; sync; multi-user.
- Always-on listening; headset camera access.
- Timers, focus sessions or anything used while doing other work.
- Standing or room-scale use; controllers; a required room scan.
- Pursuing the Best Reason to Come Back or Boldest Original Concept awards.

## 8. Functionality

**First run (silent)**
1. The lamp appears ahead. A ghost hand shows the pinch-and-slide; the user
   slides the lamp down onto their surface.
2. Chain pull. The lamp wakes and the room dims outside its light.
3. Starter cards fan out. The user writes one card of their own.
4. The lamp lights three empty slots. The user slides three cards in.
5. Chain pull to switch off. A labelled preview shows the same three cards
   waiting tomorrow.

**Return session**
1. Chain pull. Last session's cards are lit where they were left.
2. Each is retired: done, later, let go, or kept.
3. If there is a true reason, the lamp points at what it would keep.
4. New cards are added, three are chosen, and the lamp is switched off.

**Voice capture (if it ships)**
1. One pinch on the microphone spot starts listening; a second pinch stops.
2. The lamp's light follows the voice; the understood words are shown.
3. Cards slide out one at a time. Items already on the desk are merged.
4. At most one question, answered by pinch or by voice.

**Lamp states:** asleep, awake, listening, thinking, pointing, unsure, error.

**Failure handling:** no surface (floating tray); lamp misplaced (re-place);
microphone refused or offline (voice control absent); recognition failure (the
ladder in requirement 24).

**Accessibility:** pointer-only and one-hand routes always; captions, contrast
and text size always; a hands-free spoken route if voice ships and is tested.

## 9. Engine, build order and device checks

- **Engine:** the Immersive Web SDK, submitted as a link. Nothing in the concept
  needs a native-only feature, tuning how things feel takes seconds per try on
  the web from a Mac, and judges install nothing.
- **Switch to Unity only if** microphone capture fails inside the immersive
  browser session on the Quest 3, or the entrant has shipped Unity before and
  has a Windows PC.
- **Build order:** finish and polish the hand-first version before starting
  voice.

Device checks, in order:
1. The microphone still delivers audio after a minute inside the passthrough
   session, and after taking the headset off and on.
2. Time from "stop talking" to first card over headset Wi-Fi, with several
   accents and a television on.
3. Pinch hold and release with the forearm resting on a desk, in evening light.
4. Lamp placement in rooms never scanned: cards neither float nor sink.
5. Card positions survive quitting and reopening the browser.
6. The dimming look and the frame time.

Decision gate: run checks 1 to 3 in the first two days with the headset. If
check 3 fails, fall back to the earlier Three Stones concept. If checks 1 or 2
fail, build Lamplight without section 4.

## 10. Prize routes and what may be claimed

| Route | Pursue? | Claim only |
|---|---|---|
| Best New Productivity | Yes, primary | "Task management" and "habits tied to a recurring context" |
| Best Accessibility Forward | Narrow claim always; full claim if requirement 28 ships | Always: "high-contrast modes" and "inclusive by default". With 28: "voice alternatives for hand interactions" |
| Best Agentic Interaction | Only if section 4 ships | The four things in requirement 22 |
| Best First Five Minutes | By-product | Not targeted |

## 11. Design rationale that may be cited

- Making a specific plan stopped unfinished goals from intruding on unrelated
  work (Masicampo and Baumeister, 2011).
- Planning unfinished goals at the end of the work day improved detachment from
  work in a study of 103 employees.
- These are reasons for the design. They are not claims about what the product
  does for its user.

## 12. Decisions left for the build

- When the microphone permission is requested.
- The speech and model providers, and whether understood words appear live or
  on stopping.
- How many starter cards, and which.
- Exact lamp styling.
- The final name. An Android journal app and a Steam game already use
  "Lamplight". Decided 17 November: **Duskdesk** (see `docs/submission.md`).

## 13. Known risks

- Voice is unproven on the device until checks 1 and 2 run.
- Without voice, the entry is close to the earlier Three Stones concept with a
  lamp: a sound entry, scored 6.
- Speaking to turn a ramble into tasks already exists on phones; only the desk,
  the hand sorting and the lamp are native to the headset.
- The Productivity field is assumed to be the thinnest; no entry counts exist.
