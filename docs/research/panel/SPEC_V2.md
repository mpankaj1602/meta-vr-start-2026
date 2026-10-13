# Lamplight (working title) — concept, version 2

Merged by the moderator from the five round-one reports. High level only:
thresholds, layouts, exact gestures and library choices are left for the build.

## 1. What it is

**One line:** Say it once, sort it by hand, lights out.

An end-of-day ritual of about three minutes, in passthrough mixed reality, on
the real surface in front of you. A small lamp lays out cards for what is on
your mind, points its light at the three it would keep, and you slide three
under it. Next time you sit down, they are where you left them.

- **Track:** Productivity, New Experience.
- **Prize routes, in order of realistic chance:** Best New Productivity; Best
  Accessibility Forward; Best Agentic Interaction. Best First Five Minutes is a
  by-product. Best Reason to Come Back is not pursued.
- **Positioning:** not a chat assistant (the lamp never converses; it listens
  once, lays out cards, points, and the user decides) and not a notes app (it
  keeps three cards and it ends).
- **Single mechanic:** pinch a card and slide it across the real desk into one
  of three lit slots. Everything else makes cards, returns them or retires them.

## 2. Requirements (must have)

**The ritual**
1. Wake and lights-out by pulling the lamp's chain, using the same pinch as
   everything else.
2. Cards for tomorrow's candidates appear on the desk, from any of three
   sources: starter/preset cards (no permission, no network), the user's voice,
   or carried over from last time.
3. The user sorts by sliding: three slots under the lamp, a "later" tray, a
   "done" pad (a stamp falls on arrival), or past the edge of the light to let
   go.
4. The lamp spotlights the three it would keep and gives a reason of six words
   or fewer (for example "carried twice"). This works on any cards, with or
   without voice, and offline.
5. Next session opens on last session's cards, exactly where they were left, to
   be retired before anything new is captured.

**Hand-first start**
6. The first run is silent, hands-only and offline: a judge reaches a complete
   payoff without speaking, granting a microphone, or needing a network.
7. Voice is an invitation after that first payoff, never a gate. If the
   microphone is refused or the service is down, the voice control is simply
   absent and everything else works.

**Voice and the agent**
8. Push-to-talk only; a visible listening state; the user's words shown as they
   are understood, then turned into cards.
9. Cards carry the user's own words, extracted and shortened, never rewritten
   into advice or invented next steps. A wrong card is fixed in one move.
10. The model only proposes structured actions; the app executes them. At most
    one question and one suggestion per session.
11. A degrade ladder that never dead-ends: structured cards, then transcript
    cards, then a voice-memo card, then the preset cards slide out unasked.
12. A bundled sample evening, recorded by the entrant, cached, clearly labelled
    and offline, that runs the real flow: for judges who will not speak, for
    the video, and for outages.

**The lamp**
13. A fixed, faceless desk lamp with a turning shade and a pull chain. The light
    is the agent: it points, warms, flickers with the voice, breathes while
    thinking, dips on error, and shows uncertainty on the card itself.
14. No sprung arm, hop, nod, bow or face, and no spoken voice: captions and
    short sounds only.

**Space and hands**
15. Passthrough, with the lamp and cards on the user's real surface, found
    without any room setup; a manual "put the lamp here" step; a slanted
    floating tray when there is no surface.
16. The real desk is used for forearm rest and feel, never as a touch sensor.
17. One persistent anchor with a one-gesture re-place if it fails to restore.
18. Everything low and central, sized to fit an airplane tray table.
19. One-hand use and a mirrored layout.

**Trust and inclusion**
20. Captions for everything; large, high-contrast type by default; nothing
    conveyed by colour alone.
21. An exact, vendor-true statement of what leaves the headset, a privacy
    policy page, and consent before the first recording.
22. State saved on every change; instant resume; fast cold start.

**Judging and operations**
23. Previews of "tomorrow" and "day 7" that use the judge's own cards and are
    labelled as previews.
24. A small server that needs no attention from submission to 11 December:
    stateless, rate-limited, hard spend cap, two providers with automatic
    fallback, pinned model versions, an uptime check.
25. Sound designed as a substitute for touch: paper scrape tied to hand speed,
    slot knock, stamp, chain click.

## 3. Should have (if the device checks pass)

- One clarifying question from the lamp, answerable by pinch or by voice.
- Carried-over cards visibly curl; after two carries the lamp offers "smaller
  step, or let go?".
- A complete hands-free path: a handful of spoken sorting commands. Together
  with pointer-only and one-hand routes, tested with disabled users before any
  accessibility claim is made.
- System keyboard as a second silent way to make a card.
- A short beam sweep over the three cards when a session opens.

## 4. Could have (only after everything above is polished)

- Handwriting a card on the desk with a pen-grip pinch.
- Palm-press as an alternative way to mark done.
- The user's audio kept on every card, not only on failure.
- A private link that shows tomorrow's three outside the headset.

## 5. Non-requirements (out of scope)

- Conversation with the lamp, or any open-ended chat.
- Advice of any kind; rewriting the user's words into tasks they did not say.
- Any sleep, health or wellbeing claim; any reference to bed or sleep aids.
- Streaks, weekly review, cosmetic growth, phrasing memory, time tags, type
  marks, head-nod input, fist-crumple, a spoken lamp voice.
- Calendar, email or phone integrations; accounts; sync; multi-user.
- Always-on listening; headset camera access; handwriting recognition.
- Timers, focus sessions or anything used while doing other work.
- Standing or room-scale use; controllers; a required room scan.
- A character lamp that resembles any existing animated mascot.

## 6. Functionality by area

- **First run:** lamp appears ahead; the user slides it down onto the surface;
  chain pull; starter cards fan out; three slid under the lamp; the lamp's
  suggestion and reason shown; voice invited; lights out; labelled preview of
  tomorrow.
- **Return:** chain pull; last session's cards lit; retire each (done, later,
  let go, or keep); then capture; then choose three; lights out.
- **Voice capture:** one pinch to start, a pause or second pinch to stop; live
  line of understood words; cards slide out one at a time; a wrong card is
  re-said in place.
- **Lamp behaviours:** asleep, awake, listening, thinking, pointing, unsure,
  error. Nothing else.
- **Failure handling:** the degrade ladder; anchor re-place; no-surface tray;
  microphone refusal; offline.
- **Accessibility:** pointer-only, one-hand, and (if it passes) voice-only
  routes; captions; contrast; text size.

## 7. Engine and architecture

- **Engine:** Immersive Web SDK, submitted as a link. Reasons: nothing in the
  concept needs a native-only feature; tuning hand feel on the headset is the
  work AI coding does not compress, and the web loop from a Mac is seconds per
  try against a build per try in Unity; no install for judges.
- **Reverse to Unity if:** microphone capture inside the immersive browser
  session fails on the Quest 3, or the entrant has shipped Unity before and has
  a Windows PC. Decide by the second day with the headset.
- **Design rationale to cite:** making a specific plan stops unfinished goals
  intruding (Masicampo and Baumeister 2011); planning unfinished goals at the
  end of the work day improved detachment in 103 employees. No sleep study.

## 8. Device checks, in order

1. Microphone still delivers audio after a minute inside the passthrough
   session, and after taking the headset off and on.
2. Time from "stop talking" to first card over headset Wi-Fi, with several
   accents and a television on.
3. Pinch hold and release with the forearm resting on a desk, in evening light.
4. Surface placement in rooms never scanned: cards neither float nor sink.
5. Anchor restores after quitting the browser.
6. Dimming look and frame time.
If voice is not dependable by the end of the second week, ship hand-first with
voice removed.

## 9. Decisions deliberately left for the build

When exactly the microphone permission is requested; whether audio is kept on
every card; how many starter cards and which; the final name (an Android
journal app and a Steam game already use "Lamplight"); exact lamp styling; which
speech and model providers.

## 10. Expected scores (to be confirmed by the panel)

Round one, as first written: Win 5.6, Feasibility 2.6, Difficulty 4.2 (means of
five roles). The roles' own forecasts after their changes: Win 7 from four
roles and 6 from the skeptic, rising to 7 once voice is proven on a device.
