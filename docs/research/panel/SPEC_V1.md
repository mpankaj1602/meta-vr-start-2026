# Lamplight (working title) — detailed concept, version 1

Written by the moderator for the panel to evaluate and tweak. Deliberately
feature-rich: part of the panel's job is to say what to cut. "Tier" marks the
moderator's first guess at priority: Core, Should, Could.

## 1. One-sentence pitch

A small lamp on your real desk listens to what is on your mind at the end of the
day, turns it into cards on the desk, helps you pick three for tomorrow, and has
them waiting for you in the morning.

## 2. Who and when

- **User:** a seated adult who owns a Quest 3/3S or the VR Glasses and mostly
  uses it in the evening for media. Not a gamer.
- **Moments:** evening wind-down (3 to 5 minutes), morning start (1 to 2
  minutes), optional check-in during the day to mark something done (30 seconds).
- **Places:** a desk at home, a coffee table from a sofa, an airplane tray table,
  a lap tray in bed.
- **Track:** Productivity, New Experience division.
- **Prize routes targeted:** Best New Productivity; Best Agentic Interaction;
  Best Accessibility Forward; secondarily Best First Five Minutes and Best Reason
  to Come Back.

## 3. Evening loop

1. **Wake (Core).** The lamp sits folded on the real desk with a softly glowing
   pull chain. Pinch the chain and pull down. The lamp unfolds, turns toward the
   user's head, and throws a pool of light on the desk. Passthrough dims outside
   the pool.
2. **Review today (Core).** If there are cards from yesterday, they are where the
   user left them. Press a palm on a card to stamp it done; slide it to "later";
   or crumple it in a fist to let it go.
3. **Say it (Core).** Tap the lamp's base (or pinch-hold beside it). The lamp
   leans in and its light flickers with the user's voice so it is obvious it is
   listening. The user talks for 20 to 60 seconds about whatever is on their
   mind. Push-to-talk only; never always listening.
4. **Cards appear (Core).** The lamp "thinks" (the light breathes), then cards
   slide out one at a time with a paper sound. Each card has a title of six
   words or fewer written as a concrete next step, a small type mark (task,
   worry, idea, person, appointment), and the user's own audio snippet attached,
   playable by tapping the card's corner.
5. **One question (Should).** For at most one vague item, the lamp shines on
   that card, tilts its head, and asks a short question ("What is the first
   step?"). The user answers by voice and the card updates. Skippable.
6. **Sort by hand (Core).** With the hand resting on the real desk, pinch a card
   and slide it: three slots under the lamp for tomorrow, a tray for later, or
   crumple to let go.
7. **Suggestion (Should).** The lamp shines on the three it would pick (urgent
   wording, carried-over items). Accept by sliding them in, by a head nod, or by
   voice.
8. **When (Could).** For each of the three, one pinch on a chip (morning, after
   lunch, evening) adds a time tag: a simple if-then plan.
9. **Lights out (Core).** Pull the chain. The lamp bows, the desk darkens, one
   line appears: "Three for tomorrow."

## 4. Morning loop

1. **Wake (Core).** Pull the chain. The lamp stretches and lights the three
   cards, which are exactly where they were left (persistent anchor).
2. **Brief (Should).** The lamp shines on each card in turn with a caption.
3. **Done (Core).** During the day or the next evening: palm-press to stamp a
   card done. It moves to the done stack; the lamp gives a small flourish.
4. **Carry-over (Should).** Unfinished cards stay and visibly age (curl,
   yellow). After two carry-overs the lamp suggests a smaller first step or
   letting it go.

## 5. Over time

- **Done stack (Core):** stamped cards pile up; spread the pile with a hand to
  fan out the week.
- **Weekly review (Could):** counts of done, carried and let go; "what kept
  getting carried?".
- **Streak (Could):** a string of small lights along the desk edge, one per day
  completed.
- **Lamp memory (Should):** remembers carry-overs and the user's usual phrasing;
  stored on the device only.
- **Cosmetic growth (Could):** the lamp picks up small marks of use over weeks.
- **Judge path (Core):** a clearly labelled "skip to morning" and "see a week"
  preview with sample data, so the whole loop is felt in one sitting.

## 6. Input modes (inclusive by default)

- **Voice (Core):** primary at home.
- **Silent mode (Core):** for planes, offices and judges who will not speak.
  (a) Handwrite on the desk with a pen-grip pinch; the scrawl becomes the card.
  (b) Pick from a tray of common preset cards. (c) System keyboard.
- **Voice-only path (Should):** every sorting action can be spoken ("keep the
  first three", "drop the second").
- **Head nod / shake (Could):** hands-free yes or no.
- **One-hand path and left-handed mirror (Core).**
- **Pointer:** gaze plus pinch on the VR Glasses, hand ray on Quest 3/3S; direct
  touch for anything within reach.
- **Captions for everything the lamp says; high-contrast and large-text options;
  nothing conveyed by colour alone (Core).**

## 7. The lamp as an embodied agent

- **Body language first:** attention (turns to you), listening (leans in),
  thinking (light breathes), pointing (spotlight on a card), question (head
  tilt), agreement (nod), celebration (small hop), sleep (droops).
- **Speech:** captions and earcons by default; spoken voice is an option. Never
  more than about eight words.
- **Bounded initiative:** at most one question and one suggestion per session.
- **Tools the agent can call:** create card, rewrite card, ask to clarify,
  suggest three, tag a time, shrink a stuck task, give the morning brief, weekly
  review. The app executes; the model only proposes structured actions.
- **Open question for the panel:** a living articulated desk lamp strongly
  recalls a famous animated film studio's mascot. Should the form be a
  banker's lamp with a pull chain, a lantern, or simply a pool of light with no
  character?

## 8. AI pipeline

- Microphone capture, speech-to-text, then a language model that returns cards
  in a fixed structure.
- **Target:** first card within three seconds of the user stopping.
- **If the service is unreachable:** each utterance still becomes a card that
  holds the audio as a voice memo with a generic title, and silent mode works in
  full. The app therefore passes the "take it away" test.
- **Privacy:** push-to-talk, a visible listening state, nothing retained on the
  server, everything else stored on the device, a plain statement of what leaves
  the headset.
- **Guardrails:** the model only reformats what the user said. No advice.
- **Running cost:** small; capped.

## 9. Spatial and technical outline

- Passthrough mixed reality. Table found by plane detection or hit test, with a
  "palms flat on the surface" calibration as fallback, and a floating tray when
  there is no surface.
- One persistent anchor. State saved on every change; instant resume.
- Everything sits low and central: lamp 0.6 to 0.7 m away, 20 to 35 degrees
  below eye line.
- Hand actions: pinch-drag slide with the hand resting on the desk, tap, palm
  stamp, fist crumple, chain pull. Each has an alternative.
- Paper, ink and lamp are procedural. Sounds: chain click, paper slide, stamp.

## 10. First five minutes

Pull the chain (10 s). "What is on your mind for tomorrow?" (20 s). Speak (20 s).
Cards appear (by 0:50). Slide three (by 1:40). Lights out and a short time-lapse
to morning (2:00). Cards waiting; stamp one (2:30). Week preview (3:00). No
text longer than six words.

## 11. Evidence the design leans on

- Writing a to-do list for five minutes at bedtime was followed by falling
  asleep about nine minutes faster than writing about completed tasks, and more
  specific lists went with faster sleep onset (Scullin et al. 2018, 57 adults,
  one night, pen and paper).
- Making a specific plan removed the intrusive thoughts caused by unfinished
  goals (Masicampo and Baumeister 2011).
- The entry may cite these as design rationale but must make no health or sleep
  claim.

## 12. Not in scope (moderator's first list)

Calendar, email or phone integration; accounts or sync; a phone app;
open-ended chat; always-on listening; timers; advice of any kind; handwriting
recognition; standing or room-scale use; anything requiring controllers;
headset camera access; sessions longer than ten minutes.

## 13. Engine

Open. The moderator's lean is the existing web stack (Immersive Web SDK) with a
small server for speech and the model, on the grounds that nothing here needs a
native-only feature. The entrant is willing to use Unity and will have a Quest 3
for testing.

## 14. Known risks

Microphone capture inside an immersive browser session; speech errors with
accents and background noise; delay; a judge unwilling to speak in an office;
being read as "a chat assistant in a headset"; privacy of voice; server uptime
to 11 December with a frozen submission; the quality of the lamp's animation;
resemblance to an existing animated lamp character; too many features for "one
mechanic, finished".
