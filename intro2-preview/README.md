# PIFL intro 2 preview: docuseries-style opener

URL: https://jg-demos.netlify.app/pifl-driver-load-tracker/intro2-preview/  (`?nointro` skips the intro)

This is a separate preview. The main app entry (`/index.html`, `main` branch) and `intro-preview/` are not changed.
The page is the same dashboard as `intro-preview/` with a different intro in front of it.

## How it works
- There is one pre-mixed video, `assets/pifl-intro2.mp4` (1280x720, 14.6 s, H.264/AAC, about 2.6 MB). Picture and soundtrack are in the same file, so they stay in sync on iOS.
- It uses the same "Tap to start your engine" gate as intro 1. The tap does three things:
  - starts the video unmuted
  - unlocks Web Audio, including iOS `navigator.audioSession.type = "playback"`
  - decodes the horn so Skip can still honk
- Title cards, location stamps, the lower third, 2.39:1 letterbox bars, the vignette and the film grain are HTML/CSS overlays timed from `video.currentTime`.
- 🔊/🔇 toggles sound and is remembered in localStorage under `pifl-intro-muted`.
- Skip and Esc stop the video, play the Truck Horn #2 honk, and drop to the dashboard.
- If `prefers-reduced-motion` is set, you get a 3 s still of Chris plus the horn.
- If the video stalls, a safety timer still lets the user in.
- Portrait phones see the 16:9 frame with the cards set below it.

## Timeline (seconds after the tap)
| t | picture | sound | overlay |
|---|---|---|---|
| 0–1.0 | black, then fade up | sub drone + rumble, gears rev | "Pay It Forward Logistics PRESENTS" |
| 1.0–4.2 | desert mesa highway at dawn, PIFL trailer | narrator: "Thirty years behind the wheel… every load, every mile, every driver…" | NORTHERN ARIZONA |
| 4.1 | – | jake brake | |
| 4.2–6.5 | icy mountain pass, PIFL logo on the cab door | taiko build, snare roll, riser | MOUNTAIN PASS |
| 6.55 | night rain, big PIFL trailer | braam + boom: "This is Pay It Forward Logistics." | title slam: shield + name |
| 9.8–12.8 | Chris leaning out of the cab window, PIFL on the door | "Y'all gonna love this!" | CHRIS ELLISON · Owner · Former CDL driver · 30 years |
| 12.85 | hold on Chris | Truck Horn #2 honk-honk + final hit | |
| 13.35 | fade into the dashboard | – | |

## Credits / sources
- **Highway shots:** AI-generated stills with the PIFL logo composited onto the truck. Shots 1 and 2 were animated with HeyGen image-to-video. Shot 3 is a Ken Burns move on the still because its HeyGen render failed.
- **Chris clip** (`assets/chris-yall-test.mp4`): AI still of Chris (his likeness is used with his consent) animated with HeyGen image-to-video.
  - The voice is HeyGen TTS "Sage Sawyer". It is a stand-in stock voice, not Chris's real voice.
  - Lip sync is approximate.
- **Narrator:** HeyGen TTS "Mysterious Michael - Broadcaster".
- **Music:** an original score synthesized for this preview (drone, taiko, braam, risers). No third-party music is used.
  - pixabay.com blocked the box's requests, so no Pixabay music track could be downloaded.
  - A licensed Pixabay track can be swapped into the mix later.
- **SFX (Pixabay Content License)**, the same files as intro 1:
  - Truck Horn #2 (280800, Audley_Fergine)
  - semi gears rev (34081, freesound_community)
  - jake brake (63220, freesound_community)
