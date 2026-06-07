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

- The four filter controls on the **Alarms** page (Severity, Status, Time, Search) now actually filter the alarm table. Pick "Critical only", switch to "Acknowledged", narrow to the last hour, or type a name like "Okafor" and the rows update on the spot.
- A small "Showing X of 12 alarms" counter sits next to the filters so you always know how much the filters are hiding.
- The **Acknowledge selected** button at the top now only works when you've actually ticked some alarms. It starts greyed out, shows the count in parentheses ("Acknowledge selected (3)"), and lights up with a glow once you select something.
- Ticking the checkbox in the table header now selects (or clears) every visible alarm in one click. Selected rows get a soft amber highlight and a small bar down the left edge.
- Acknowledging alarms now changes their status pill from "open" to "acked" in place, the row briefly flashes green, and a small toast message in the bottom-right confirms how many were acknowledged.
- The per-row **Open →** button now does something — it briefly says "Opening…", marks an open alarm as acknowledged for "You", and pops a toast confirming what happened.
- As alarms are acknowledged or resolved, the "Active", "Critical", and "Resolved · 24h" cards at the top, and the alarm badge in the left-rail "Alarms" link, all update automatically.
- The Alarms top bar, filter controls, table buttons, and checkboxes are all bigger on tablets and phones so they're easier to tap without missing.

## How to test the changes

1. Open `index.html`, then click **Alarms** in the left rail.
2. Look just above the table — there should be a chip reading "Showing 12 of 12 alarms".
3. Open the first filter drop-down and pick "Critical only". The table should shrink to just the two critical rows and the counter should now read "Showing 2 of 12 alarms". Switch back to "Severity: All".
4. Type `Okafor` into the search box. The table should narrow to only rows owned by SO Okafor. Clear the box to bring everything back.
5. Notice the **Acknowledge selected (0)** button in the top-right is greyed out. Tick the checkbox on a couple of "open" rows — the count updates to (2), the button lights up with an amber glow, and those rows get an amber highlight with a bar on the left edge.
6. Click **Acknowledge selected**. The status pill on those rows should change from "open" to "acked", each row briefly flashes green, a toast pops up in the bottom-right corner ("Acknowledged 2 alarms."), and the "Active" KPI and the "Alarms 8" badge in the left rail tick down accordingly.
7. Click the checkbox in the table header — every currently visible row should tick at once. Click it again to clear them.
8. Click the **Open →** button on any remaining open alarm. It briefly says "Opening…", then the row's status flips to "acked" and a toast says the alarm was opened and acknowledged for you.
9. Resize the window narrow (or open on a tablet). The top bar, filter selects, and table buttons should all grow taller and easier to tap.
