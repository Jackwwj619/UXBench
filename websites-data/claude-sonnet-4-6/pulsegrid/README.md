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

- The "⌘K" button in the top bar now actually opens a working command palette that lets you jump to any page (Overview, Generators, Forecast, Alarms) or to a specific generator or alarm by name. Cmd/Ctrl + K from anywhere also opens it.
- The bell icon now drops down a notifications panel listing the most recent alarms, with a "Mark all read" button and a link to the alarms page.
- On the Alarms page, the "Acknowledge selected" button is disabled until you actually tick at least one row, and a tiny hint next to it tells you how many you've selected. Confirming brings up a dialog listing exactly which alarms will be acknowledged, with an Undo option in the toast afterwards.
- Each row on the alarm table has an "Open" button that pops up a full alarm-detail dialog with severity, rule, current value, escalation history, and an acknowledge button.
- The alarm filters (severity / status / time / search) now actually filter the table, and there's a "No alarms match the current filters" empty state with a "Clear filters" button.
- The Generators page has the same treatment: active filters now show as removable chips at the top, status-pill counts update as you filter, and there's an empty state with "Clear all filters" when nothing matches.
- The Forecast page's horizon dropdown (Day-ahead / Hour-ahead / Real-time) now updates the model name and accuracy text next to the chart, instead of being a decorative menu.
- All the top-bar selects, search boxes, and icon buttons now have proper hover labels and keyboard-friendly tab stops.

## How to test the changes

1. Open `index.html`. Click the "⌘K" button top-right (or press Cmd+K / Ctrl+K). Type "trip" or "tehachapi" — the list narrows. Press Enter on the top match or click a row to jump.
2. Click the bell icon next to it: the notifications panel slides out with five recent alarms. Click "Mark all read" — the red dot on the bell disappears.
3. Open `alarms.html`. The "Acknowledge selected" button at the top should be greyed out. Tick one or two checkboxes — it activates and the hint shows the count. Click it to see the new confirmation dialog listing the exact alarms; confirm to acknowledge, then hit Undo in the toast to revert.
4. Still on Alarms, click "Open →" on any row to see the new alarm-detail dialog. Then change the Severity filter to "Critical only" to see filtering in action; set it to something that matches nothing to see the empty state.
5. Open `generators.html`, set Status to "Tripped" and pick a fuel — chips appear at the top showing your active filters with an X to remove each. The pill counts also update to reflect those filters.
6. Open `forecast.html` and switch the dropdown from Day-ahead to Hour-ahead — the model name and MAPE next to the chart update accordingly.
