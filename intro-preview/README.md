# Warp intro (preview only)

This folder is staged on the `intro-preview` branch only. `main` and the live tracker are unchanged.

- `index.html` is the tracker with the intro inlined. It plays the intro, then fades into the app. Its asset links point at `../`.
- `pifl-intro.js` is the same intro as a standalone file, for reading or reuse. It uses no libraries, just canvas and CSS.
- The logo is a transparent shield cut from the brand logo, inlined in the script as a PNG data URI (360px, 8-bit with alpha) so it never depends on a separate file. It has no CSS filters on it; an external PNG plus animated blur/drop-shadow filters showed up as a white square in iPhone Safari.

## Timeline (about 8 s)

| Time | What happens |
|---|---|
| 0–3.0 s | Night highway warp. Lane dashes, edge lines, headlight and taillight streaks and green shoulder streaks rush toward the viewer, and stars streak overhead. The speed builds the whole time. |
| 2.2–3.1 s | A truck's headlights rush up from the horizon, then a white flash. |
| 3.15–4.2 s | The green shield flies in, spins and overshoots, then **locks** into place: silver corner brackets snap in and a green and silver ring pulses out. |
| 4.35 s | "PAY IT FORWARD LOGISTICS" reveals letter by letter in a silver gradient, with a green rule underneath. |
| 5.4 s | The tagline "Family-owned. Driver-led. Arizona." appears, then "Freight brokerage run by former CDL drivers". |
| 7.3–8.1 s | The intro fades into the tracker. |

- **Skip ›** (top right) or **Esc** skips the intro.
- `?nointro` turns it off.
- With **prefers-reduced-motion**, there is no warp. The logo and text simply fade in, and it is done in about 3.6 s.

## Sound (recorded clips + Web Audio)

Browsers block audio until the user taps, so the intro opens on a **"Tap to start your engine"** screen. That tap creates and resumes the audio context and plays a silent buffer, which unlocks audio on iOS; on iOS 17+ it also sets `navigator.audioSession.type = "playback"` so the intro is heard with the ringer switch on silent. The 🔊 button mutes or unmutes (all clips and synth go through one master gain), and the choice is remembered in `localStorage` under `pifl-intro-muted`. Esc or Skip on the start screen goes straight to the app with no sound. The clips are prefetched on page load and decoded on the tap.

| t after tap | sound | source |
|---|---|---|
| 0–0.35 s | starter cranks | synth |
| 0.3–2.8 s | semi pulling through the gears (rev, shift, rev) under the warp whoosh + sub rumble | `assets/semi-gears-rev.mp3` |
| 2.3–4.1 s | jake brake | `assets/jake-brake.mp3` |
| 3.05 s | sub boom on the flash | synth |
| 3.55 s | air-brake "pssht" as the truck stops; its hiss tail settles under the name | `assets/air-brake-hiss.mp3` |
| 4.05 s | deep metallic thunk as the shield locks in | synth |
| 7.3 s | double air horn "honk honk" into the dashboard (the clip is already two blasts; played once) | `assets/truck-horn-2.mp3` |

Skipping mid-intro cuts the soundtrack and still plays the honk-honk. Reduced motion keeps only the thunk and the horn.

### Sound credits (all Pixabay Content License: free to use, no attribution required)

| file | Pixabay page | title / author | trim |
|---|---|---|---|
| `truck-horn-2.mp3` | https://pixabay.com/sound-effects/truck-horn-2-280800/ | Truck Horn #2 / Audley_Fergine | full clip |
| `semi-gears-rev.mp3` | https://pixabay.com/sound-effects/city-freightliner-going-through-gears-34081/ | freightliner going through gears / freesound_community | 18.3–20.8 s, fades |
| `jake-brake.mp3` | https://pixabay.com/sound-effects/city-truck-jake-brake-63220/ | truck jake brake / freesound_community | 12.9–14.65 s, fades |
| `air-brake-hiss.mp3` | https://pixabay.com/sound-effects/film-special-effects-air-brakes-loud-fade-out-96993/ | air_brakes_loud_fade_out / freesound_community | 0–4.4 s, fade out |
