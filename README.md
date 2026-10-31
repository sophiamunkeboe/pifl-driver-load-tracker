# PIFL Driver Load Tracker

A load notes organizer for the drivers app at **Pay It Forward Logistics** ([payitforwardlogistics.com](https://payitforwardlogistics.com)), a family-owned freight brokerage in Arizona led by former CDL drivers.

- **Live preview:** https://sophiamunkeboe.github.io/pifl-driver-load-tracker/
- **Excel tracker:** [`PIFL_Driver_Load_Tracker.xlsx`](PIFL_Driver_Load_Tracker.xlsx)

The rows in the file and the preview are **sample data only**.

## Load notes structure

Each row is one load. Fields, in column order:

| # | Field | What goes in it |
|---|-------|-----------------|
| A | **Load ID** | Unique load reference. It also carries the load's size and whether it is hot (e.g. `…-FTL-HOT`, `…-LTL`). |
| B | **Customer Name** | Shipper or customer the load is for. |
| C | **Trailer Type** | Dropdown of equipment types (see below). The key field for matching a driver to a load. |
| D | **Pickup City/State** | Where the load is picked up. |
| E | **Pickup Date & Time** | Scheduled pickup appointment. |
| F | **Load Size / Weight / Details** | FTL/LTL, weight, pallets, commodity, special handling (temps, tarps, straps). |
| G | **Hot Load?** | `Yes` / `No` dropdown. `Yes` turns the whole row red. |
| H | **Delivery City/State** | Where the load is delivered. |
| I | **Delivery Date & Time** | Scheduled delivery appointment. |
| J | **Miles** | Trip miles, pickup to delivery. |
| K | **Notes** | Anything else the driver needs: gate info, contacts, check-in steps. |

## Trailer types

The Trailer Type column uses a dropdown fed by the `Lists` sheet:

- Dry Van
- Reefer
- Flatbed
- Step Deck
- Other

To add equipment, add a row to `Lists!A` and extend the dropdown range.

## Hot loads

A hot load is time-critical freight that has to move first. When **Hot Load?** is `Yes`, conditional formatting highlights the entire row in red, in the spreadsheet and in the web preview, so drivers and dispatch spot it immediately.

## Load ID

The Load ID is the short reference used in the drivers app. Besides identifying the load, it encodes the load size (e.g. FTL or LTL) and a `HOT` flag, so a driver can tell what the load is at a glance from the ID alone.

## Files

| File | Purpose |
|------|---------|
| `PIFL_Driver_Load_Tracker.xlsx` | The tracker: dropdowns, hot-load highlight, sample rows. |
| `index.html` | Static, mobile-friendly preview with a trailer type filter (GitHub Pages). |
| `README.md` | This file. |
