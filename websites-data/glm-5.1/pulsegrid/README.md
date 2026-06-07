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

- The 24h / 48h / 7d range buttons on the Overview load chart and the Forecast chart now actually redraw the chart with the selected time range.
- Changing the balancing-authority dropdown (Western / ERCOT / SPP / MISO) now updates the page — the browser tab title changes and a "Scope: ..." line confirms the new selection.
- Picking a different forecast model (Day-ahead / Hour-ahead / Real-time) on the Forecast page now redraws the chart with different confidence bands and updates the model info line (including the MAPE accuracy figure).
- Clicking "Open →" on any alarm row in the alarms table now opens a detail dialog with all the alarm fields and an Acknowledge button (close it with the X, Cancel, or the Escape key).
- On the Generators page, the status pill counts (All / Online / Ramping / Tripped / Maintenance) now reflect the fuel, zone, and search filters you've applied — and pills with zero matches are visibly dimmed.
- On narrow screens, the left navigation rail collapses behind a hamburger button that slides the sidebar in and out.
- Screen readers now get proper labels on every filter dropdown, search box, and table checkbox, so the dashboard is usable with assistive technology.
- Whole alarm rows are clickable to toggle their checkbox, making selection easier on touch screens.

## How to test the changes

1. Open `index.html`. On the 48-hour load chart, click "24h" — the chart should redraw with a shorter timeline and different tick labels. Click "7d" to see a multi-day view.
2. On the same page, change the balancing-authority dropdown from "Western Interconnect" to "ERCOT". The browser tab title should update, and a small "Scope: ERCOT" line should appear next to the dropdown.
3. Open `forecast.html` and switch the model dropdown to "Real-time" — the chart should redraw with a tighter confidence band and the line under the title should now read something like "model: pulse-net-v8 · Real-time · MAPE 0.42%".
4. Open `alarms.html` and click "Open →" on any alarm row — a detail dialog should appear with the alarm fields. Close it with the X, the Close button, or by pressing Escape.
5. Open `generators.html`, pick "Natural gas" from the fuel filter, and watch the status-pill counts at the top (All / Online / Ramping / Tripped) update to match — pills with zero matches should look dimmed.
6. Shrink the browser to phone width on any page — the left sidebar should disappear and a hamburger button should appear at the top. Tap it to open and close the menu.
