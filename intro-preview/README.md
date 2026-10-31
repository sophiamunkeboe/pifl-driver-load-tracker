# Warp intro (preview only)

This folder is staged on the `intro-preview` branch only. `main` and the live tracker are unchanged.

- `index.html` is the tracker with the intro inlined. It plays the intro, then fades into the app. Its asset links point at `../`.
- `pifl-intro.js` is the same intro as a standalone file, for reading or reuse. It uses no libraries, just canvas and CSS.
- The logo is `../assets/pifl-shield-512.png`, a transparent shield cut from the brand logo.

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

## Sound (Web Audio, no audio files)

Browsers block audio until the user taps, so the intro opens on a **"Tap to start your engine"** screen. The 🔊 button mutes or unmutes, and the choice is remembered in `localStorage` under `pifl-intro-muted`. Esc or Skip on the start screen goes straight to the app with no sound.

| t after tap | sound |
|---|---|
| 0–0.35 s | starter cranks |
| 0.35–3.0 s | diesel catches, revs, shifts, revs again; warp whoosh + sub rumble build |
| 2.55–3.95 s | jake-brake "brap" growl as the lanes streak |
| 3.05 s | sub boom on the flash |
| 3.62 s | air-brake "pssht" hiss, just before the reveal |
| 4.05 s | deep metallic thunk as the shield locks in |
| 4.1–7.3 s | low diesel idle under the name and tagline |
| 7.3 s | deep two-blast air horn (A1/A2/C#3/E3 chord), "honk honk", into the dashboard |

Skipping mid-intro cuts the soundtrack and still plays the honk-honk. Reduced motion keeps only the thunk and the horn.
