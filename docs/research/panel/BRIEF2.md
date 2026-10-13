# Addendum brief: one new idea for the same panel (2026-10-07)

Read `BRIEF.md` in this folder first; this file corrects and extends it. A
five-role panel (judge, market analyst, engineer, red-team skeptic, designer)
already ran three rounds on 38 entries. The user has now submitted one more idea
and asked for it to go through the same roles and the same three rounds. You are
a fresh instance of one of those roles: read your role's earlier reports (paths
in your instructions) so your scores sit on the same scale.

## Corrections to BRIEF.md established by the earlier panel

- The special awards DO have official definitions, and each is one winner from
  the whole field (all tracks, both divisions). A track winner drops out of the
  special-award pools (one prize per entry, highest value wins).
  - Best Social & Multiplayer: "Experiences designed for shared presence -
    co-watching, cooperative play, social spaces, or asymmetric multiplayer."
  - Best Agentic Interaction: "Apps where AI is a core part of the experience -
    spatial agents, voice-first AI interaction, procedural content,
    context-aware assistance."
  - Best Reason to Come Back: "thoughtful progression and reward design:
    something to work toward, visible growth between sessions, and a loop that
    pulls the user back tomorrow. Rewards experiences built for longevity, not a
    one-time demo."
  - Best First Five Minutes: "how fast the experience explains itself, teaches
    controller-free interaction without a wall of text, and delivers a payoff
    before the user takes the headset off."
  - Best Accessibility Forward: "voice alternatives for hand interactions,
    eyes-only navigation for limited mobility, high-contrast modes, or
    experiences inclusive by default."
  - Boldest Original Concept: "the idea that couldn't exist anywhere else. A
    concept whose core loop depends on presence, spatial depth, real-world
    scale, or eyes and hands. Judged on originality and on whether the
    experience would fall apart on any other platform."
  - Judge's Choice: "standout entries that don't fit neatly into a single track
    or category."
- The rules contain a "take it away test": remove the third-party service; is
  there still a project?
- Innovation is scored on leveraging device capabilities "(e.g., spatial depth,
  hands-first design, gaze, passthrough mode, scene understanding, persistent
  anchors) to drive repeat usage". Polish includes sound design. The video must
  "show real gameplay that honestly represents the experience"; judges need not
  watch past three minutes.
- Meta's hands guidance: hands "resting by the thighs or placed too close to the
  device ... will not be detected"; "rapid or erratic hand movements can
  challenge the system's tracking accuracy"; "avoid requiring hands to be held
  above heart level or excessive reaching"; "teach one core interaction, use it
  everywhere".
- Engineer's platform findings for Quest Browser WebXR / IWSDK 1.0.1: spatial
  audio is available through Web Audio (generic head-related transfer function
  only, output latency unmeasured on device); articulated hand joints are
  available; IWSDK has built-in thumb microgestures for teleport and turn;
  speech recognition and synthesis are reportedly absent; fast or out-of-view
  hand motion loses tracking; legs are not tracked; no native "fast motion mode"
  switch was found for WebXR; the desktop emulator does not reproduce real
  hand-tracking noise or audio latency. On Quest 3/3S the pointer falls back to
  a hand ray (SDK source) because there is no eye tracking.
- Judges are a distributed team who each open the URL alone, mostly on Quest
  3/3S; each starts with empty local storage. The entry "should not require a
  third-party device to operate".
- Market findings relevant here: "movement through sound" was the emptiest space
  the analyst found, and accessibility-first play (blind or one-handed) was
  named as an open gap. Audio wind-down apps exist (TRIPP Sound Bath, Lungy).
  "Creatures move when unwatched" games exist on Quest (Frozen In Fear: Don't
  Blink, Keep Watching VR).

## Where the earlier panel ended (for calibration)

`CALIBRATION.md` in this folder holds the final mean scores for all 38 entries.
Headlines: the top entry was A4-R Three Stones (Win 6.0, unanimous). No entry
averaged above 6. The related entries are:

- **G4** (the user's original): "Subway-Surfers-type game with hand movement to
  jump, sit or step sideways". Win 3.0, Feasibility 3.0, Difficulty 3.0. Marked
  down as derivative, not seated as written, and dependent on fast swipes.
- **E3** (user's): "Feel movement through sound, with eyes closed or with
  visuals". Win 4.0, Feasibility 4.0, Difficulty 2.6. No mechanic stated.
- **E3-R Close Your Eyes** (refined): a six-minute sight-optional wind-down;
  catch a note in an open palm and pour it into a bowl of sound. Win 4.6.
- **N1 Hush** (new): creatures creep toward you only while unlit; you hear where
  they are and freeze them with a torch held in your hand. Win 4.6,
  Feasibility 4.0. Marked down for unproven fun and existing look-alikes.

## The new idea (ID **S1**), in the user's own words

"For the subway surfer type - change it to **sonic navigator** where initially
you see, after 20 sec you don't (spatial sound is present in both) and the goal
is to avoid obstacles - swiping handles movement like up swipe jump, down swipe
skip lower, side swipe means step sideways etc. When you can't see, you have to
depend on spatial sound etc."

Reading: an endless-runner-style obstacle game played seated. For the first
~20 seconds the player sees and hears the obstacles; then the visuals go away
and the player must dodge by spatial sound alone. Input is hand swipes: up =
jump, down = duck under, left/right = sidestep. Judge it as written for S1.

A refined variant will get the ID **S1-R** and is scored separately.

## Scores (same definitions as BRIEF.md)

Win 1-10, Feasibility 1-5, Difficulty 1-5, best-fit track, most plausible
special award. Stay on the earlier panel's scale: say where S1 would rank among
the 38 and against G4, E3, E3-R and N1 specifically.

## Ground rules

Be critical and specific; cite URLs for anything looked up; label inference; do
not invent facts. Keep new research proportionate: this is one idea. Do not
modify the project repository and do not spawn other agents. Write your report
to the path in your instructions and reply with a short summary.
