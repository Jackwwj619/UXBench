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

- **The alarms table filters now actually work.** Picking a severity, status, or time range — or typing in the search box — instantly narrows the alarms list, with a "12 of 12 alarms" counter at the top right and a friendly "No alarms match the current filters" message when nothing matches.
- **The Production / Replay / Plan tabs now do something.** Clicking **Replay** shows a blue notice strip saying you're viewing historical data with live updates paused; **Plan** shows a purple notice strip saying changes won't be dispatched. The active tab also takes on the matching color so the mode is obvious.
- **Coming-soon items in the side nav are labeled.** The Topology and Events entries are now dimmed, marked with a "SOON" pill, and clicking them does nothing — so it's clear they aren't ready.
- **Bigger, more colorful mode tabs and filters.** Operating-mode tabs, filter pills, status chips, and small row buttons are all noticeably taller and easier to tap, and the active mode tab now shows in the brand amber color instead of just text.
- **Filter dropdowns now have visible labels.** Above each select on the alarms page you can see a small "Severity / Status / Time" label, so it's obvious what the dropdown controls.
- **Tables scroll sideways on phones instead of squishing.** On narrow screens the generator and alarm tables get their own horizontal scroll, while the rest of the page stays put.
- **The top toolbar wraps cleanly on phones.** The Balancing-Authority selector, mode tabs, and search box rearrange onto multiple lines on small screens, with the search filling the row underneath.

## How to test the changes

1. Open `alarms.html`. Change the **Severity** dropdown to "Critical only" — the alarm table should immediately shrink to just the two critical rows and the counter should read "2 of 12 alarms". Switch the **Status** dropdown to "Resolved" — you should now see the "No alarms match the current filters" message. Reset both dropdowns and type "Colstrip" into the search field — only the Colstrip alarm should remain.
2. Go back to `index.html` and click the **Replay** tab at the top. A blue banner should appear under the top bar telling you live updates are paused. Click **Plan** — the banner should turn purple. Click **Production** — the banner should disappear.
3. In the left side rail, hover over the "Topology" and "Events" entries — they should look dimmed and show a small "SOON" pill. Clicking them should do nothing.
4. Shrink the browser to phone width. The top toolbar should wrap onto two or three rows, the mode tabs should still be comfortable to tap, and the alarm and generator tables should get their own sideways scroll instead of overflowing the page.
5. On `alarms.html`, look just above each filter dropdown — each one should have a small uppercase label (Severity, Status, Time) so you know what it controls without guessing.
