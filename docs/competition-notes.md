# Competition notes

Facts about the Meta VR Start Developer Competition 2026 gathered while choosing
the entry. Check the official pages before relying on anything here; they are
linked at the end.

## Dates

- Submissions: 24 September to 18 November 2026, 12:00 Pacific.
- Judging: about 23 November to 9 December.
- Winners announced: about 11 December.
- The entry is frozen at the deadline and must stay available, free, until the
  winners are announced.

## Who can enter

- Members of the Meta VR Start program, aged 18 or over.
- Not open to residents of Brazil, Quebec or sanctioned regions.
- One entry per person. A solo entrant may also be a non-lead member of other
  teams' entries, but cannot submit twice.

## What must be built

- **Hard requirement:** fully usable with hands, end to end, without ever
  pairing a controller.
- **Guidelines that are scored:**
  - Seated: every interaction works within a two-foot radius ("airplane seat
    test").
  - Short: fast start, clean pause and resume, satisfying in ten minutes or
    less ("one bus stop test").
  - Original: remove any third-party service and a project must remain ("take
    it away test").
- **Divisions:** New Experience (begun on or after 24 September, no earlier
  codebase) or Adapted/Significantly Updated. They are judged separately.

## Tracks and prizes ($1M, 20 prizes, one prize per entry)

| Track | Covers | Winner / runner-up, per division |
|---|---|---|
| Gaming | Puzzle, strategy, casual, social, narrative, for seated play | $100k / $50k |
| Entertainment | Spatial cinema, interactive video, music visualization, storytelling, spatial audio, media companions | $100k / $50k |
| Productivity | Multi-panel workspaces, task management, creative tools, habits tied to a recurring context | $70k / $35k |

Special awards, $25k each, one winner from the whole field (both divisions, all
tracks). A track winner drops out of these pools.

| Award | Official wording |
|---|---|
| Social & Multiplayer | "Experiences designed for shared presence - co-watching, cooperative play, social spaces, or asymmetric multiplayer." |
| Agentic Interaction | "Apps where AI is a core part of the experience - spatial agents, voice-first AI interaction, procedural content, context-aware assistance." |
| Reason to Come Back | "thoughtful progression and reward design: something to work toward, visible growth between sessions, and a loop that pulls the user back tomorrow." |
| First Five Minutes | "how fast the experience explains itself, teaches controller-free interaction without a wall of text, and delivers a payoff before the user takes the headset off." |
| Accessibility Forward | "voice alternatives for hand interactions, eyes-only navigation for limited mobility, high-contrast modes, or experiences inclusive by default." |
| Boldest Original Concept | "the idea that couldn't exist anywhere else ... whether the experience would fall apart on any other platform." |

Two Judge's Choice awards of $20k go to "standout entries that don't fit neatly
into a single track or category."

## Judging

Stage one is pass or fail on fitting the theme. Stage two has four criteria at
25% each:

1. **Innovation and creativity:** originality, relevance to the track, and
   using device capabilities (spatial depth, hands-first design, gaze,
   passthrough, scene understanding, persistent anchors) "to drive repeat usage".
2. **Experience design:** intuitive navigation, clear onboarding, a
   "habit-forming purpose"; in passthrough, whether "a table becomes the play
   surface, walls host content, or UI adapts to the space"; design for a
   narrower field of view.
3. **Technical implementation:** "solid and bug-free", at least 60 frames per
   second on Quest hardware, "holding up in rooms the developer never tested".
4. **Polish and presentation:** interface, art direction, sound design, and the
   submission materials.

Other points:

- The video is under three minutes and must "show real gameplay that honestly
  represents the experience". Emulator capture is allowed.
- "AI tools may also be used to assist in the judging", so the written
  description should state hands-only, seated and track fit in the rubric's own
  words.
- Judges are a distributed team, each playing alone, mostly on Quest 3 or 3S.
- Meta's advice: "Scope to one mechanic and finish it."

## Submission for a web entry

- A direct link to the hosted app (GitHub Pages, Vercel and similar).
- The video on YouTube or Vimeo, publicly visible.
- A description of about 500 words: inspiration, how it was built, what is next,
  target launch date.
- English, or English subtitles.

## Content rules that matter

- No third-party intellectual property, brand names or recognisable branded
  products.
- No identifiable person other than the entrants in the materials.
- Nothing "false, fraudulent, deceptive, misleading"; no health claims.
- Only publicly released tools and SDKs.

## The devices

- **Meta VR Glasses:** ship spring 2027 at about $1,300. About 100 g with a
  tethered compute puck, sharp text, colour passthrough, eye and hand tracking,
  no controllers in the box.
- **Input:** look to point, pinch to select.
- **Field of view:** about 70 by 66 degrees (Quest 3 is about 110 by 96), with
  more room below centre than above, so content belongs low and central.
- **Quest 3 and 3S:** no eye tracking; pointing falls back to a hand ray.

## Platform findings for the web stack

- A web page cannot read or restyle the passthrough view.
- There is no speech recognition or speech synthesis in the Quest browser;
  voice needs a hosted service.
- Microphone permission is reported as granted on the page before entering the
  session; working inside the session is still to be checked on a device.
- Surfaces can be found without a room scan by depth hit test. Labelled table
  planes need the headset's room setup, which few people run.
- Spatial audio renders height and follows the head. Left and right are
  reliable for everyone; up, down and behind are less so with a generic ear
  profile, and a pitch cue helps.
- Fast or out-of-view hand motion loses tracking, and fingers hide each other
  in a two-hand grip.

## 2025 compared with 2026

| | 2025 | 2026 |
|---|---|---|
| Prize pool | $1.5M | $1M |
| Prizes | 32 | 20 |
| Tracks | Entertainment, Lifestyle, Gaming | Entertainment, Gaming, Productivity |
| New and updated entries | Judged together | Separate divisions |
| Web SDK award | Two at $30k | None |
| Hands | A special award | Mandatory |
| Registered / submitted | 2,865 / 655 | About 2,560 registered by early October |

2025 main-category winners: Tiny Golf (pinch mini golf), Saber Punks (fighting
game), DreamSpace (re-skin your room) and Inkphony (your room as an
instrument). The two web SDK winners were The Nanauts (AI robots in your room)
and Dun Jun (a hands-only brawler).

## Audience

- Meta names "mainstream adults" as the growth audience: media-first, seated,
  controller-free.
- Meta's 2026 talk lists hand-tracking-first design, low-cost narrative games,
  visual novels and adventure games as under-served.
- Almost every title announced for the VR Glasses is a game.
- In 2025, about 66 of 653 entries mentioned AI. Thirteen were AI assistants or
  companions and about six were notes or task apps; none of those won.

## Official pages

- https://start-developer-competition-26.devpost.com/
- https://start-developer-competition-26.devpost.com/rules
- https://start-developer-competition-26.devpost.com/details/judging
- https://start-developer-competition-26.devpost.com/details/special-awards
- https://start-developer-competition-26.devpost.com/resources
- https://developers.meta.com/blog/meta-connect-2026-vr-start-developer-competition/
- https://developers.meta.com/vr/blog/meta-horizon-start-developer-competition-meet-the-winners/
- https://developers.meta.com/vr/essentials/bring-your-app-glasses/
