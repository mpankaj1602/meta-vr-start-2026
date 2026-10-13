# IWSDK project guidance

@AGENTS.md

## Project context

- The entry is defined in `docs/lamplight-concept.md`. Start there.
- Competition facts (dates, rules, judging, award wording) are in
  `docs/competition-notes.md`. The deadline is 18 November 2026, 12:00 Pacific.
- `docs/research/` holds the working papers behind the concept. It is not
  needed to build.

## Working preferences

- The developer builds with AI coding assistance. Quote AI-assisted estimates
  and do not treat time-to-code as the bottleneck. Name separately what AI does
  not speed up: tests on the headset, tuning how an interaction feels, original
  art and sound, playtests and the demo video.
- Headset testing happens in a local session. A cloud session cannot reach the
  Quest 3 or show the emulator window.
- Build order: finish and polish the hand-first version before starting voice.
