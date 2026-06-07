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
