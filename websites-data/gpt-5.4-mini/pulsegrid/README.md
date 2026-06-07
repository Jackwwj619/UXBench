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

- The left-rail "Topology" and "Events" links no longer pretend to work. They now look slightly faded with a "soon" pill, and clicking either pops up a "Topology — coming soon" message instead of jumping to a blank page.
- Filters on the Alarms page now actually filter the table. Picking Severity, Status, or Time, or typing in the search box, narrows the rows; a small chip on the right summarises the result like "5 of 12 alarms · severity: critical". An empty state appears when nothing matches.
- Each alarm row's "Open →" button now opens a side drawer with the full alarm details (severity, rule, asset, owner) and Acknowledge / Mark resolved buttons. Pressing Escape closes it.
- The "Acknowledge selected" button at the top of the alarms page now does something: tick a few rows, click it, and those rows visibly flip to "acked" status with a brief green flash. If nothing is selected, you get a polite "Select at least one alarm" toast instead of silence.
- The Generators table rows now also open the same side drawer with the generator's plant, fuel, zone, output, capacity, and operator when you click "Details →".
- Selecting a different balancing area (Western / ERCOT / SPP / MISO) on the Overview page, or switching the forecast mode on the Forecast page, now shows a toast confirming the change and updates the page title, so you can tell the choice was registered.
- Filter dropdowns across the dashboard now have small labels above them (Severity / Status / Time / Fuel / Zone) so you know what each one is for without having to open it.
- On phones and small screens, the top bar wraps gracefully, search boxes go full width, and all the buttons and filter pills are at least 40 pixels tall so they're tappable.

## How to test the changes

1. Open `index.html` and look at the left-hand nav. "Topology" and "Events" should look dimmer with a small "soon" pill. Click either — a toast like "Topology — coming soon" appears at the bottom right.
2. In the top bar, change "Balancing area" from Western Interconnect to ERCOT — a toast confirms "Balancing area: ERCOT". Click the Replay or Plan tab — a "Mode: Replay" toast appears.
3. Open `alarms.html`. Change the Severity dropdown to "Critical only" — the table shrinks to two rows and the chip on the right shows the new summary. Type "Colstrip" in the search box — only the matching row remains.
4. Set filters that match nothing (e.g. Severity: Critical only + search: "xyz") — an "No alarms match the current filters" message appears.
5. Click "Open →" on any row — the side drawer slides in from the right with the alarm details. Click Acknowledge — a green toast confirms, and the drawer closes.
6. Tick a few rows then click "Acknowledge selected" at the top — those rows flash green and their status pill becomes "acked". Click "Acknowledge selected" with nothing ticked — you get a "Select at least one alarm" toast.
7. Open `generators.html`, click "Details →" on any row — the same drawer opens with that generator's plant, fuel, output, etc.
8. Open `forecast.html` and change the Mode dropdown from "Day-ahead" to "Hour-ahead" — the page title updates to "Load forecast · Hour-ahead" and a toast confirms.
9. Shrink the browser to phone width — the top bar wraps to multiple rows, the search box stretches across, and tapping anything still feels comfortable.
