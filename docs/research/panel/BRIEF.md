# Shared brief: idea ranking for the Meta VR Start Developer Competition 2026

Today is 2026-10-06. You are one member of a five-role panel. Each role works
independently, then the panel debates. A moderator (not you) compiles the final
ranking. Read this whole file before starting.

## The entrant

- Solo developer (assume solo unless a note says otherwise). Started 5 Oct 2026.
- Stack is fixed: Meta Immersive Web SDK (IWSDK 1.0.1) = WebXR on Three.js r181,
  TypeScript, Vite. Entry is delivered as a hosted HTTPS URL opened in the Meta
  Quest Browser. Not Unity/Unreal.
- Does not own a headset yet; considering a Quest 3 or 3S. Has the IWSDK desktop
  emulator (IWER) with a "Meta VR Glasses" profile.
- Likely has some experience building LLM agents (inferred, unconfirmed).
- Entering the **New Experience** division (project begun on/after 24 Sep 2026).
- One entry per person, so exactly one idea gets built.

## The competition (facts from the official Devpost page and rules)

- Deadline 18 Nov 2026 12:00 PT (about six weeks of build time). Judging to ~9 Dec.
- $1M, 20 prizes. One prize per entry.
- Tracks (pick one): **Gaming** (puzzle, strategy, casual, social, narrative, for
  seated play), **Entertainment** (lean-back: spatial cinema, interactive video,
  music visualization, immersive storytelling, spatial audio, media companion
  apps), **Productivity** (multi-panel workspaces, task management, creative
  tools, habits tied to a recurring context such as morning routine, commute,
  wind-down).
- Prizes per track, New division: Gaming $100k/$50k, Entertainment $100k/$50k,
  Productivity $70k/$35k (winner / runner-up). New entries do not compete with
  Adapted/Updated entries.
- Special awards, $25k each, one winner: Best Social & Multiplayer, Best Agentic
  Interaction, Best Reason to Come Back, Best First Five Minutes, Best
  Accessibility Forward Experience, Boldest Original Concept. Plus two Judge's
  Choice at $20k. Official definitions of the special awards were not found.
- **Hard requirement:** "fully usable with hands, end-to-end"; a user must be
  able to complete the whole experience without ever pairing a controller.
- **Guidelines (not hard, but scored):** seated-optimized, "airplane seat test:
  does every interaction work in a two-foot radius?"; "one bus stop test": fast
  cold start, clean pause/resume, satisfying in 10 minutes or less; "original,
  not a wrapper": thin wrappers around third-party services are discouraged.
- Stage one is pass/fail on fit with the theme. Stage two, four criteria at 25%
  each:
  1. Innovation & Creativity: originality, relevance to the track, uniquely
     leveraging device capabilities (spatial depth, hands-first design).
  2. Experience Design: intuitive navigation, clear onboarding, "habit-forming
     purpose"; for passthrough, "player's real room meaningfully changes the
     experience"; FoV-aware design.
  3. Technical Implementation: reliability, minimum 60 fps on Quest hardware,
     bug-free, good use of gaze interactions, hand tracking, passthrough, spatial
     anchoring, FoV-aware design.
  4. Polish & Presentation: UI/UX, art direction, sound design, and the quality
     of submission materials. Demo video under 3 minutes showing real use.
- Content rules: no third-party IP infringement, no branded products or
  commercial advertising, no identifiable persons other than the entrants, no
  adult/hateful/deceptive content, English or English subtitles. Only publicly
  released tools/SDKs. The build must stay online and free until ~11 Dec.
- Meta's own advice: "Scope to one mechanic and finish it. A tight vertical slice
  is better than a broad prototype with gaps, because judges play what you
  submit."

## Hardware and software context

- Target devices: Meta Quest (3/3S) and **Meta VR Glasses** (ships spring 2027,
  $1,300; ~100 g glasses + tethered compute puck, Snapdragon Reality Elite, 12 GB
  RAM; 2412x2288 per eye micro-OLED, ~37 pixels per degree; colour passthrough;
  eye tracking; hand tracking; no controllers in the box; ~3 h battery).
- VR Glasses field of view is about 70 x 66 degrees (Quest 3: about 110 x 96).
  The IWER emulator mask is 37 deg left/right, 25 deg up, 43 deg down. Key UI
  must sit near the centre.
- Input model on the Glasses: look to target (gaze), pinch to select. Hover does
  not fire from gaze (gaze is private by design). Quest 3/3S have no eye
  tracking, so IWSDK falls back to head pointing there.
- Hand tracking limits reported by developers and studies: no haptics, tracking
  loss on fast motion and when hands cross/occlude, arm fatigue with raised
  arms, gesture variation between people. Pinch with hands resting in the lap is
  the comfortable pattern.
- IWSDK 1.0.1 offers: ECS on Three.js, gaze-and-pinch, hand tracking, grab
  (one-hand, two-hand, distance), Havok physics, spatial UI (UIKitML), spatial
  audio, scene understanding (planes/meshes), environment raycast, depth
  occlusion, anchors, passthrough (immersive-ar), a `camera` feature flag.
  What the Quest Browser's WebXR actually exposes (camera frames, body tracking,
  depth, WebGPU, on-device ML speed) should be checked, not assumed.
- Judges open a URL. Anything needing a paid API key costs the entrant money and
  must stay up for the judging period.

## Audience and ecosystem (prior research; verify anything you rely on heavily)

- Meta says the growth audience is "mainstream adults": media/TV-first, seated,
  controller-free, mid-core, subscription-friendly. Teens are today's most
  active audience but play free social games with controllers.
- Meta's GDC 2026 talk names as under-served: hand-tracking-first design,
  cost-effective narrative games, visual novels and adventure games.
- Announced VR Glasses titles are almost all games: Beat Saber Flux, Tetris
  Effect: Mixed Realities, Dragon Grove (cozy puzzle), Dice Throne Digital,
  Cardmada (card battler), Two Point Hospital, Story of Seasons, Phoenix Wright
  Ace Attorney, H3VR 2, PAYDAY, Supernatural. No productivity, education or
  creative tools were announced.
- About 1,729 hand-tracking titles are already on Quest (vrdb.app). Popular:
  Waltz of the Wizard, Job Simulator, Puzzling Places, Cubism, Maestro,
  PokerStars, Forever Pets, Virtual Desktop, Immersed.
- Productivity: Meta shut Horizon Workrooms in Feb 2026; leaders are PC-screen
  mirrors (Virtual Desktop, Immersed). On Apple Vision Pro (closest comparable
  device), task/calendar apps (Things, Fantastical) and focus soundscapes
  (Endel) are among the most used.
- 2025 winners (different brief: room-scale mixed reality, $1.5M, 655 entries):
  Tiny Golf (pinch mini golf), Saber Punks (PvP fighter), DreamSpace (re-skin
  your room), Inkphony (room as instrument), Hand Survivor, Pocket Lands (lap
  diorama), Awesome Hand (steer a ball with your palm), Language IRL / Chores.gg
  / Flows.xr (camera + AI), Compile Crops (code drones on a desk farm), The
  Nanauts (WebXR, AI robots in your room, built solo in 3 weeks), Dun Jun (WebXR
  hands-only brawler).
- Already on the Quest store and relevant to some ideas: RealCarrom, Table Party
  (17 board games), Table Troopers, Tiny Golf, Jigsaw Night, Demeo; ASL tutors
  (Gesture Play, Sign Pose VR, Silent Classroom); wilds.ai (AI game master,
  WebXR); Skybox / Moon / Fluid video players; Wander (Street View travel);
  TRIPP, Headspace XR (wellness).

## The ideas (use these IDs exactly)

User's ideas, in the user's own words:

- **G1** Bowling
- **G2** Archery
- **G3** Rafting
- **G4** Subway-Surfers-type game with hand movement to jump, sit or step sideways
- **G5** Maze solver with limited abilities: above-maze jumps, and maze markers
  (a removable arrow showing which way you went)
- **E1** Anime converter: surroundings look anime-like (2D, 3D or Ghibli style)
- **E2** 3D converter for movies, reels, video or images: adds depth and immersion
- **E3** Feel movement through sound, with eyes closed or with visuals
- **P1** Car driving: learn to drive; cars can be added by AI (dimensions, speed,
  controls, without logos)
- **P2** Learn gardening: tells you what soil needs for what you want to grow, how
  much and how often to water, expected growth over days or months, with
  AI-generated or licence-free images
- **P3** Universe experience (productivity and entertainment): what gravitational
  acceleration looks like, data from the web on surroundings, how fast you fall
  toward nearby bodies, spaghettification near a black hole
- **P4** Vacation visualiser: imagine yourself in places using Google 3D maps
- **P5** The Curious Cat: touch anything and it tells you what it is, how it
  works, how it formed (tech details for man-made, growth/timeline for natural)
- **P6** Gym: a spotter for machines (where they are, how to use them), plus
  scenes or other things to take the boredom out of exercise
- **P7** Brain exercise: since the brain uses a lot of energy, an app that
  stimulates the brain to burn calories while making it sharper (user says this
  is primitive and needs research-backed evidence)

Assistant's earlier ideas:

- **A1** Playable music visualiser (conduct or pluck a generative piece)
- **A2** AI game master on a lap-sized diorama (voice/pinch choices, dice by hand)
- **A3** Pinch-and-pull tabletop duel (carrom/crokinole-style, invite by link)
- **A4** Daily ritual object (passthrough desk companion for one recurring
  moment, tasks as physical tokens)
- **A5** Hand-shape learning game (fingerspelling tutor or one-handed puzzle)
- **A6** Lap pop-up storybook (turn pages, pull tabs, poke characters)
- **A7** Hands-on mystery (short detective cases; handle evidence, pin clues to a
  board; daily cases)
- **A8** Spatial planning board (sort your day/project by pinch, capture by
  voice, open result on phone by link)
- **A9** Interactive comic or reader (panels unfold around the centre of view)

Refined variants will get IDs of the form `<base>-R` (for example `G5-R`), and
brand-new merged concepts `N1`, `N2`, ... These are separate entries from the
unrefined originals and are scored separately.

## Scores every role uses

- **Win** (1-10): chance of taking a prize (track winner/runner-up or a special
  award) in its best-fit category, given the rubric, the likely field, and
  competent execution by this entrant in the time available. 10 = favourite.
- **Feasibility** (1-5): likelihood this solo developer ships a polished,
  compliant, 60 fps, hands-only vertical slice in IWSDK by 18 Nov. 5 = very
  likely.
- **Difficulty** (1-5): engineering plus content effort and risk. 5 = hardest.
- Also give the **best-fit track** (you may move an idea to another track) and
  the special award it could plausibly target, if any.

## Ground rules for every role

- Be critical and specific. Back claims with evidence: cite URLs for anything
  you looked up; label inference as inference. Do not invent facts or numbers.
- Judge the idea as written for unrefined entries. Do not quietly improve it.
- Research on the web as needed. Do not modify any files in the project
  repository. Do not spawn further agents.
- Write your report to the file path given in your instructions (Markdown), then
  reply with a short summary. Keep the report dense: no filler.
