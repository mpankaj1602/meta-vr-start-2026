## Audio finding re-examined

Verdict: I overstated. "Left/right, not high/low" was wrong; the user's "all of 3D" also overstates. `cr/` = https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/blink/renderer/platform/audio/ ; `nm/` = `/Users/pankaj/MyHackathons/meta-vr-start-2026/node_modules/`. PubMed abstracts read; full papers not, except McAnally.

| Cue | Carried by | Reliable with generic HRTF? | With head tracking? | Source |
|---|---|---|---|---|
| Left/right | Interaural time and level differences | Yes: "interaural cues to horizontal location are robust" | Unchanged | https://pubmed.ncbi.nlm.nih.gov/8354753/ |
| Front/back | Outer-ear spectral cues | Weak: confusions "increased significantly" | Yes: confusions "nearly disappeared"; a 4° turn helps, about 32° almost eliminates them | https://pubmed.ncbi.nlm.nih.gov/10335634/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4130110/ |
| Up/down | Spectral cues | Partly: 12 of 16 listeners accurate once confusions were resolved, 2 degraded; up-down confusions rose | Partly: turning cuts elevation error, but yields the "absolute value" of elevation, not its sign | Same; https://pubmed.ncbi.nlm.nih.gov/9348691/ |
| Up/down plus pitch | Pitch "systematically biases perceived sound elevation" | Yes for a two-way choice (inference) | Not needed | https://pubmed.ncbi.nlm.nih.gov/24711409/ |

- **Chromium renders elevation.** Ten slices from -45° to +90° in 15° steps, azimuth every 15° interpolated eightfold (`cr/hrtf_database.cc` L41-44; `cr/hrtf_elevation.cc` L51-58). Above 45° many azimuths reuse lower data (`cr/hrtf_elevation.cc` L83-112).
- **The listener follows the head.** IWSDK parents Three's `AudioListener` to `player.head` (`nm/@iwsdk/core/dist/audio/audio-system.js` L72-74); Three writes position, forward and up every frame (`nm/three/src/audio/AudioListener.js` L175-203). The dynamic cues exist; a phone has none.
- **Lag.** Chromium cross-fades direction changes over "around 45 milliseconds" (`cr/hrtf_panner.cc` L204-207); output latency is unmeasured. Tracker latency above 73 ms raised errors for brief sounds (https://scholar.usuhs.edu/en/publications/effects-of-headtracker-latency-in-virtual-audio-displays/, search summary). Likely near that limit (inference).
- **Binaural demos** use real ears, room echo, slow sources and unlimited listening time (inference).

**Reliably audible in a Quest Browser build:** left/right, on speakers too (inference). Front/back, given a head turn of about 30° and roughly a second (inference), on headphones; speakers unmeasured. Up/down as a two-way choice when position is backed by pitch or timbre. By position alone most listeners manage; a minority will not. **Cutting jump and duck was not necessary.** It was a simplification.

## Head and eye input

- **Read:** `world.player.head` (`nm/@iwsdk/xr-input/dist/rig/xr-origin.d.ts` L18). The emulator sets headset position and rotation (`nm/iwer/lib/device/XRDevice.d.ts` L227-228), so logic is testable; human movement and comfort are not.
- **Detect (inference, tune on device):** lean as lateral offset from a 5-10 s running baseline, which recentres a slouch; ±6 cm with 2 cm hysteresis. Nod or tilt beyond ±12°. Flick as yaw rate above ~120°/s that returns within 400 ms.
- **Latency:** no camera-hand delay (45 ms: https://research.birmingham.ac.uk/en/publications/a-methodological-framework-to-assess-the-accuracy-of-virtual-real); faster than swipes (inference).
- **Conflict:** yaw is the listening movement (rows 2-3). S2 must not steer by yaw; use lean and head height.
- **Neck:** display mass raises neck joint torque and discomfort (https://kanazawa-u.repo.nii.ac.jp/record/44127/files/FR-PR-CHIHARA-T-204.pdf, search summary). Minutes of flicks are unvalidated.
- **Gaze:** a `gaze` input source on the Glasses only (`nm/@iwsdk/xr-input/dist/pointer/gaze-pointer.d.ts`); untestable before 2027.

## M1 build check

- **72 Hz:** instanced walls; low risk.
- **Turning:** queue a 90° snap for the next junction. Meta: snap turns help "eliminate the perception of continuous motion"; "Artificial turning is necessary, since not all chairs spin"; walk at 1.4 m/s; vignette (https://developers.meta.com/horizon/design/locomotion-comfort-usability/). IWSDK has a vignette and snap turn (`nm/@iwsdk/core/dist/locomotion/slide.d.ts` L24; `turn.d.ts` L8), stick-driven, so auto-run needs a custom mover.
- **Standing turns:** against the seated guideline; the puck tether winds (inference).
- **Look versus flick:** in a 70° view, glancing into a side corridor is also a head turn.
- **Pause:** pinch (`select`).
- **Above-maze jump:** Meta says "Stabilize camera elevation"; cut to an overhead view instead.
- **Markers:** pinch drops an arrow in the current cell.
- **Comfort:** restricting field of view reduces sickness (https://spectrum.ieee.org/tech-talk/consumer-electronics/gaming/dynamic-field-of-view-restriction-makes-virtual-reality-less-barfy, search summary). The emulator validates none of it.

| ID | Best track | Core tech | Hardest problem | 60 fps risk | Hands-only + seated? | Effort | Win | Feasibility | Difficulty |
|---|---|---|---|---|---|---|---|---|---|
| S2 | Gaming | Timed lane runner; head lean and height with drifting baseline; HRTF sources | Up/down and behind by position alone, for every listener, on speakers; neck load | Low | No controller, but hands idle in play; seated | 4-5 pw | 4 | 3 | 3 |
| M1 | Gaming | Grid maze; auto-run mover; flick snap turn; vignette; pinch pause | Comfort of constant motion with frequent 90° turns; look versus flick | Low | Hands only pause; seated in flick mode only | 3.5-4.5 pw | 3 | 3 | 3 |

**Rank.** S2 (4/3): level with S1, sturdier input, weaker hands-first; level with G5 on Win; below S1-R, N1, E3-R, G5-R, A4-R. M1 (3/3): below G5 (4/4), having chosen what I called "the uncomfortable version" (`r1_engineer.md` L149-150), and below the rest.

**Day-one checks.** S2: blind test of three heights × front/back, head still versus free, speakers versus wired, with and without pitch, 50 trials; head-turn-to-sound lag and `outputLatency`; lean and nod thresholds over five slouching minutes. M1: three seated minutes at 1.4 m/s with 90° snaps, vignette on and off; false flicks while looking around; swivel chair; 72 Hz.
