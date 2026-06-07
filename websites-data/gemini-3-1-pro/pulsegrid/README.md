# PulseGrid

PulseGrid is a demo SCADA / EMS dashboard for an electricity grid operator — the kind of console a control-room engineer at a balancing authority watches all day. The example data covers the Western Interconnect.

> Fictional product — every reading (demand, generation, frequency, alarms, weather) is sample data, refreshed only with a seeded random source for stable repeat viewing.

## What you can do

- **See the whole grid at a glance.** Five KPI cards across the top show demand, generation, frequency, renewables share, and active alarms, each with a sparkline. Below, a 48-hour load chart overlays actual demand, forecast (dashed), and renewables area, with a **NOW** marker.
- **Read the operating environment.** A weather card shows four zones (e.g. Phoenix at 112°F driving 1.8 GW of cooling load) and how they're stressing the system.
- **Track every generator.** A 24-cell generator status grid is color-coded for online / tripped / ramping / maintenance, with output and percent of capacity on each cell. A full table lives on the `generators.html` page (38 units across the fleet) with filters by status, fuel, zone, and search.
- **Triage alarms.** The alarms center shows active, critical, mean handle time, and resolved-in-24h KPIs, plus a 12-row alarm table you can filter by severity, status, and time. Critical alarms pulse red.
- **Read the day-ahead forecast.** A 24h chart shows central forecast with P10/P90 confidence band, capacity ceiling, and peak hour, alongside an hour-by-hour breakdown and a reserve-adequacy panel comparing reserve types against the 100% requirement. A driver table compares today versus yesterday across six zones.
- **Switch balancing authorities.** Western, ERCOT, SPP, MISO from the top bar.

## How to use it

Open `index.html` in any modern browser. The clock at the top ticks live. Use the left rail to switch between Overview, Generators, Alarms, and Forecast. On Generators, filter pills + fuel + zone + free-text search combine; counts update at the top.

## What was changed in this version

- The Alarms page filters now actually filter the table. Picking a severity, picking a status, or typing in the unit/rule/owner search box trims the rows live, and an empty-state message appears when nothing matches.
- The "Acknowledge selected" button on the Alarms page now works. Tick one or more alarms, press the button, and their status flips to "acked" with a confirmation toast — pressing it with nothing selected shows a clear error message instead of doing nothing silently.
- The 12h / 24h / 7d buttons on the Forecast page now redraw the chart and the hourly breakdown table for the selected horizon, and the card title updates to "Next 12 hours / 24 hours / 7 days".
- The "Topology" and "Events" items in the left rail are now clearly marked "soon", greyed out, and show a non-blocking toast on click, so you don't end up stuck on a dead `#` link.
- The whole app now has a mobile layout. On a narrow window a hamburger button appears in the top bar that slides the left navigation in over a backdrop; tables become horizontally scrollable and key controls hit the 44px tap-target size.
- Every clickable "Open →" row action (alarms and generators) now confirms via a toast that the detail view isn't part of the prototype, instead of silently doing nothing.
- The non-working "⌘K" search button in the top bar is now visibly disabled with a "coming soon" label, so it's clear it isn't a working search.
- Filter dropdowns, the alarm search box, and the generators search now expose proper accessible labels for screen readers.

## How to test the changes

1. Open `alarms.html`. Change the severity dropdown to "Critical only", change status to "Acknowledged", or type "Colstrip" in the search — the table filters live and the row count updates. Combine filters until none match to see the empty state.
2. On the same page, tick a few alarm rows and press "Acknowledge selected" at the top right — a toast confirms how many were acknowledged and their status pills flip to "acked". Press it with nothing selected and a red error toast appears.
3. Open `forecast.html` and click the 12h, 24h, and 7d buttons above the chart. The chart, hourly breakdown table, and card heading all relabel.
4. Shrink the browser to phone width on any page — a hamburger button appears in the top bar; tapping it slides in the left rail and dims the page behind a backdrop. Tap the backdrop or a nav item to close.
5. On the left rail, click "Topology" or "Events" — they're greyed out and show a "Coming soon" toast instead of navigating to a broken anchor.
6. Click any "Open →" button on a generator or alarm row — a toast explains the detail view isn't available in the prototype.
