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

- The **generator cells** on the Overview screen and the **Details →** buttons on the Generators table now open a pop-up window showing that unit's status, fuel, zone, output, capacity, and operator. Click the ✕ or press Escape (or click the dark backdrop) to close.
- The filter dropdowns on the Alarms page (Severity, Status, Time) and the search box now actually filter the alarm table. The "Open →" button on each row opens a pop-up with the full alarm details.
- The **Acknowledge selected** button on the Alarms page now works. Tick one or more alarm rows, click the button, and the alarms flip to "acked" status, with a small toast at the top confirming how many you acknowledged. Clicking without selecting anything shows a friendly "Select at least one alarm" reminder.
- A "Select all" checkbox in the alarm table header ticks or unticks every visible row at once.
- The Forecast page's "Day-ahead / Hour-ahead / Real-time" dropdown now actually redraws the chart. Hour-ahead shows a tighter band, real-time shows a noisy 5-minute slice, and the chart title updates to match.
- Filtering the alarm table to a combination that matches nothing now shows a clear "No alarms match current filters" row instead of a blank table.

## How to test the changes

1. Open `index.html`. Click any colored square in the generator status grid — a pop-up should open with that unit's details. Press Escape or click outside the pop-up to close it.
2. Open `generators.html` and click any **Details →** button on the right of a row — the same pop-up should appear with that generator's info.
3. Open `alarms.html`. Change the **Severity** dropdown to "Critical only" — the table should drop down to just the two critical alarms. Change **Status** to "Resolved" — the table should show the resolved rows. Set both to combinations that match nothing to see the "No alarms match" row.
4. Type "Colstrip" in the search box on the Alarms page — the table should narrow down to that unit.
5. Reset the filters, tick the checkbox on a couple of "open" rows, and click **Acknowledge selected**. Their status pill should flip to "acked" and a toast should appear at the top reading e.g. "2 alarms acknowledged."
6. Click **Acknowledge selected** with nothing ticked — a "Select at least one alarm to acknowledge" toast should appear.
7. Open `forecast.html`. Switch the dropdown next to the chart from "Day-ahead" to "Hour-ahead" — the chart should redraw with a tighter confidence band and the title should say "Next 60 minutes". Switch to "Real-time" and watch the line get noisier.
