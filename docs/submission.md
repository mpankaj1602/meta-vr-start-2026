# Submission plan

Working draft for the Devpost entry. The final name is **Duskdesk** (chosen
17 November). Lines marked **[confirm]** wait for a device check result.

## Deadline

- Devpost closes Wednesday 18 November 2026, 12:00 Pacific, which is
  **Thursday 19 November, 01:30 IST**.
- Aim to submit by Wednesday 18 November, 20:00 IST. Devpost entries can be
  edited until the deadline, so submit early and update.
- The entry is frozen at the deadline and must stay online, free, until the
  winners are announced (about 11 December). Do not deploy to the live link
  after the deadline.

## What is still missing

| Item | State |
|---|---|
| Device checks on Quest 3S | A, B, C and E passed on the first build; D and F to do; new features to retest |
| Final name | Duskdesk |
| Public HTTPS link | https://duskdesk.vercel.app (live 17 November; device checks still to rerun there) |
| Video on YouTube, public | Not recorded |
| Devpost description | Draft below |
| Gallery images and thumbnail | Take from the video |

## Name

"Lamplight" is taken (an Android journal app and a Steam game). Checked
17 November with one web search each:

| Name | Found | Verdict |
|---|---|---|
| Pullchain | Only "Pull Chain Run", a car-pulling phone game | Clear. Names the gesture that opens and closes the ritual |
| Under the Lamp | Nothing with that title | Clear. Describes the picture; longer |
| Duskdesk | No app by that name; "dusk." (sunset times) and "Dusk Hours" (time tracking) exist | Clear. Dusk says end of day, desk says work |
| Evening Three | No exact match | Clear but plain |
| Desklight | A desk focus-timer app on the App Store | Avoid: same category |
| Three for Tomorrow | Many "three things" planner apps | Avoid: generic |
| Close of Day | "Close The Day", an iOS app for ending the workday (January 2026) | Avoid: same idea, near-identical name |
| Shutdown Ritual | "Shutdown Ritual: Workday Wrap" on iPhone; also Cal Newport's term | Avoid |
| Dusklight | An iOS story game and a golden-hour photo app | Avoid |
| Tomorrow, Set | No exact match, but many "Tomorrow" planners | Weak: crowded |

Avoid anything that suggests bed, sleep or rest ("Lights Out", "Wind Down",
"Nightstand", "Bedtime"): requirement 18 and section 7 of the concept rule out
those associations, and the rules forbid health claims. Let the tagline carry
"end-of-day planning ritual" instead, for example "Pullchain: an end-of-day
planning ritual for your real desk".

The name appears in the app only in `src/lamplight/page.ts` (the flat page
heading), plus the README and the page title.

## Devpost description (draft, about 500 words)

**Tagline:** Put tomorrow on your desk. Pick three. Switch off.

**Track:** Productivity. **Division:** New Experience.

### What it is

Duskdesk is a three-minute end-of-day ritual in passthrough mixed reality, played on
the real desk in front of you. A small desk lamp sits on your table. Pull its
chain and it lights a set of cards for what is on your mind. Slide three under
the light for tomorrow, set the rest aside, and pull the chain to switch off.
The next time you sit down, the lamp is still on your desk and the cards are
where you left them.

It is task management built around one mechanic: pinch a card and slide it
across your real desk. It is a habit tied to a recurring context: the same desk,
the same lamp, the same three-minute close.

### Inspiration

A list on a phone is good for looking things up all day. It is bad at ending
the day. We wanted closure: decide what tomorrow holds, set it down where you
work, and leave. Research on planning unfinished goals was a reason for the
design (making a specific plan stopped unfinished goals from intruding on
unrelated work, Masicampo and Baumeister, 2011); Duskdesk makes no claim about what
it does for its user.

### How it works in the headset

- **Fully usable with hands, end to end.** No controller is ever needed. Every
  action is the same pinch: wake the lamp, write a card, sort, switch off.
- **Seated, within arm's reach.** Everything sits low and central on a surface
  the size of an airplane tray table. Your forearm can rest on the desk.
- **The table becomes the surface.** One depth hit test finds your real desk
  with no room setup. If there is no surface, a slanted floating tray appears.
- **Persistent anchors drive repeat use.** The lamp is pinned to its spot in
  your room, so tomorrow's session opens on your desk with yesterday's cards.
  Starting somewhere else? Pinch and hold to bring the lamp to you.
- **Light is the lamp's only language.** It warms, dims the room outside its
  pool of light, and points at a card only when it has a true reason in six
  words or fewer, such as "Carried twice". Its pick comes from simple local
  rules.
- **Done is filed, not deleted.** Slide a card onto the folder: a stamp lands
  and the card slips inside. Slide it off the desk and it crumples into the
  bin. Pinch the folder or the bin and its cards rise into the air, readable.
- **A desk lamp worth looking at:** a detailed pull-chain lamp in three styles
  (Classic, Modern, Studio), with a chain that springs and swings when pulled
  and a glowing ring at the base edge where you hold it to move it.
- **Sound stands in for touch:** a paper scrape tied to hand speed, a knock in
  a slot, a stamp for done, a click for the chain.
- **Inclusive by default:** captions for everything, large high-contrast type,
  nothing conveyed by colour alone, one-hand use, a mirrored layout for
  left-handers and a pointer-only route.
- **Short, with clean pause and resume:** state is saved on every change.
  Offline, no account, nothing leaves the headset. "Go to desk" opens it from
  the page, and an Exit button sits beside the lamp.

### How it was built

Duskdesk is a web app built with Meta's Immersive Web SDK on Three.js, TypeScript
and Vite. It uses WebXR passthrough, hand tracking, hit testing and persistent
anchors. The lamp is modelled in code, card faces are drawn at runtime, and all
sound is synthesised with Web Audio, so it ships no third-party media. Cards
are written with the Quest system keyboard. It runs at **[confirm]** fps on
Quest 3S. *(Optional, your call: "Built with AI coding assistance.")*

### What's next

- Voice capture: say what is on your mind and see it split into cards in your
  own words, with the keyboard as the fallback.
- A private link to see tomorrow's three outside the headset.
- Meta VR Glasses: gaze-and-pinch pointing is already wired and tested in the
  emulator's glasses profile.
- Packaging as a PWA for the Meta Horizon Store.

**Target launch:** **[your call]**, for example a public web release now and the
Horizon Store in the first quarter of 2027.

### Claims to keep out

- No sleep, bed, rest or wellbeing benefit, anywhere.
- Never call the lamp's pick AI. Do not enter Agentic Interaction.
- Accessibility Forward: claim only "high-contrast modes" and "inclusive by
  default". Voice alternatives are not built.
- No fps figure until check F has a number.

## Video

### The decisions

- **Length:** aim for about 2:30 (the takes below add up to 2:38 with title
  and end cards). The rule is under 3:00; shorter keeps a judge watching.
- **Passthrough:** yes. Record in the headset, in passthrough, at your real
  desk. The product is the real desk; judges score "a table becomes the play
  surface", and the rules want real gameplay that honestly represents it. Use
  the emulator only as a fallback if a headset recording comes out black.
- **Voice:** optional. The app's own sounds (paper scrape, knock, stamp,
  chain click) carry the video and are part of the sound-design score. Add a
  short voice-over only at the start and end (script below), recorded on the
  Mac after editing. Either way, put the key words on screen as captions and
  add English subtitles on YouTube.
- **Music:** none, unless you made it yourself. The rules forbid third-party
  material, and the app's sounds are better evidence.
- **People:** you may appear (you are the entrant); nobody else. A 5-second
  over-the-shoulder phone shot of you seated at the desk wearing the headset
  helps judges see "seated, hands only" at once. Your face and room become
  public on YouTube, so that shot is your call.

### Before recording

1. Clear brand logos from the desk and the view: laptop lid, mugs, monitors,
   boxes, chargers.
2. Light the room enough for hand tracking but keep the evening feel: one
   lamp on, not the ceiling light off entirely.
3. In the Quest Camera app settings, choose landscape (16:9) recording if it
   is offered, and turn the microphone off (room noise, and your voice is
   added later).
4. On https://duskdesk.vercel.app press **Start over** (fresh first run) and
   pick the **Classic** lamp.
5. Record a 15-second test: start recording from the Camera app, Go to desk,
   pull the chain, stop. Check on your phone (Meta Horizon app, gallery) that
   the passthrough room shows, not black.

### How to record

- Use the controller only to start and stop recording, then put it down; the
  app itself is hands only.
- Do separate takes, not one long one. Re-do a take rather than fixing it in
  the edit.
- Hold your head steady and turn slowly; the recording follows your head.
  Look down at the desk at about 30 degrees with your hands in view.
- Move a little slower than usual so each gesture reads on video.

| Take | What to do | Keep |
|---|---|---|
| A, page | On the flat page: show the summary, tap Modern, Studio, back to Classic, then Go to desk | 0:10 |
| B, first run | Lamp appears, ghost pinch, slide the lamp onto the desk (grab ring glows), pull the chain: light on, room dims | 0:30 |
| C, cards | Starter cards fan out, pinch "+ write", system keyboard, type a card, it appears; slide three into the slots (knocks) | 0:35 |
| D, done and let go | Slide a card onto the folder (stamp, slips in) and one off the edge (crumples, into the bin); pinch the folder: cards rise into the air | 0:25 |
| E, switch off | Pull the chain: "Lamp off. Tomorrow is set." and the tomorrow preview | 0:10 |
| F, next session | Pinch Exit, quit the browser, reopen the link, Go to desk: the lamp is on the same spot with your cards; pull the chain, "Start with last time's three", retire them | 0:30 |
| G, inclusion | One hand only; captions; optional: move the lamp by its base edge | 0:10 |

### Edit (iMovie on the Mac is enough)

1. Transfer the clips: Meta Horizon phone app, gallery, save to phone, AirDrop
   to the Mac.
2. Order: title card, A to G, end card. Trim the waiting; do not speed up or
   fake any interaction.
3. Captions (large, white on dark, at the bottom), six words or fewer each:
   "No room setup", "Pull the chain", "Write your own", "Pick three",
   "Done is filed", "Let go", "Still on your desk", "Hands only. Seated."
4. Title card (3 s): "Duskdesk: put tomorrow on your desk." End card (5 s):
   "Duskdesk. Hands only, seated, offline. duskdesk.vercel.app".
5. Optional voice-over (iMovie's microphone button), about 20 seconds in all:
   - Start: "Duskdesk is an end-of-day ritual on your real desk. Put tomorrow
     on the desk, pick three, and switch off."
   - End: "Hands only, seated, offline, no account. The lamp stays where you
     left it, so tomorrow starts here."
6. Export 1080p. Upload to YouTube as **Public**; title "Duskdesk: an
   end-of-day desk ritual in mixed reality (Meta VR Start 2026)"; put the
   live link in the description; add English subtitles (YouTube's automatic
   captions, corrected, are fine).

Do not say or show anything about sleep, rest or wellbeing, and do not call
the lamp's pick AI.

## Devpost form checklist

- [ ] Project name and tagline
- [ ] Track: Productivity; division: New Experience
- [ ] Link to the hosted app: https://duskdesk.vercel.app
- [ ] YouTube link, public
- [ ] Description (above), English
- [ ] Built with: Immersive Web SDK, WebXR, Three.js, TypeScript, Vite, Web Audio
- [ ] Gallery: 3 to 5 stills from the video; thumbnail
- [ ] Re-read the official rules page for any field added since 17 November
- [ ] After the deadline, do not run `vercel deploy --prod` until judging ends

## Hosting

- Vercel project `duskdesk` (Hobby plan), production alias
  https://duskdesk.vercel.app.
- Deployed from this folder with the Vercel CLI. It is not connected to GitHub,
  so pushes to `main` do not change the live link.
- To publish a fix before the deadline: `npm run typecheck`, then
  `npx vercel deploy --prod --scope just-another-team1`. Rerun the affected
  device checks on the live link afterwards.
- Saved cards and the lamp's spot belong to each address, so the live link
  starts fresh on a headset that has only used the dev URL.
