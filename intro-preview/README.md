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
- There is no sound. The ICON intro's sound needs an Enter click to start, and this preview autoplays.
