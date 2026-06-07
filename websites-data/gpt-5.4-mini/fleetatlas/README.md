# FleetAtlas

FleetAtlas is a demo real-time management dashboard for a commercial vehicle fleet. Dispatchers and operations managers use it to see where every truck and van is right now, watch for problems, and dig into specific vehicles when something needs attention.

> Fictional product — vehicles, drivers, alerts, and locations are sample data. The "live" position updates are simulated jitter, not GPS feeds.

## What you can do

- **Watch the whole fleet on a city map.** The overview shows 25 vehicles in their current positions, with a status filter strip (All / Running / Idle / Maintenance / Offline / Alert) so you can hide the ones you don't care about. Running vehicles nudge their positions every few seconds so the map feels alive.
- **Inspect any vehicle.** Click a vehicle icon (or a row in the pull-up drawer at the bottom) to slide in a side panel with plate, model, VIN, driver info (with phone and shift hours), current task and ETA, a 24h/7d/30d historical track, and fuel and speed sparklines.
- **Take action on a vehicle.** From the panel you can send a command, contact the driver, view maintenance records, or reassign the task — reassignment asks for confirmation since it disrupts the trip.
- **Triage alerts.** The alerts center summarizes what's open, what's new today, and your mean handling time, then lists individual alerts with filters by time, severity, type, and status.
- **Run reports.** The analytics page shows daily average running vehicles, a 7×24 utilization heatmap, and your top 10 drivers by performance.
- **Browse the full vehicle list.** The vehicles page is a sortable table of all 25 vehicles with plate, model, driver, status, current location, mileage, and service history.

## How to use it

Open `index.html` in any modern browser. The map opens by default — use the status filter strip across the top to narrow which vehicles you see. Click any vehicle (or open the bottom drawer) to bring up its detail panel. Use the top tabs to switch between Map, List, and Analytics views, or jump to Alerts from the bell in the top bar.

## What was changed in this version

- The four left-rail links that previously led nowhere (Drivers, Routes, Maintenance, Settings) are now clearly marked with a small "Soon" badge and look faded, so you can tell at a glance which sections actually work.
- The search box on the dashboard now actually filters the vehicle list — type a plate number, driver name, or city and the bottom drawer narrows down. A small line under the filter strip tells you "Showing X of 25 vehicles" so you always know what you're looking at.
- The org-switcher dropdown at the top is now properly labeled "Organization". Picking a different organization briefly flashes a "Scope: …" pill so you can see the change took effect.
- The Alerts and Vehicles pages now have a search box that actually narrows the table, and a clear "Showing X of Y" counter at the top right. If nothing matches, you see a friendly "No alerts match the current filters" row instead of an empty table.
- Filter dropdowns on the Alerts and Vehicles pages are now properly labeled (Time range, Severity, Type, Status, Search) instead of unlabelled boxes.
- The Vehicles page now opens with four small summary cards at the top (Running, Idle, Maintenance, Offline / Alert) so you get the at-a-glance fleet health before you start filtering.
- On a phone or narrow window, the wide data tables now scroll sideways inside their box (instead of breaking the layout), with a small "Scroll for full table" hint. Filters and view tabs stack into a single column with bigger tap targets.
- When no vehicles match the filters on the dashboard, the empty state now offers a "Clear filters" link to reset everything in one click.

## How to test the changes

1. Open `index.html`. In the left rail, click **Drivers** or **Settings** — they should look greyed out with a "Soon" badge and clicking should do nothing destructive.
2. Type a driver name (try `Maria`) or a plate fragment into the search box at the top of the dashboard. The counter under the filter strip should update to e.g. "Showing 1 of 25 (search: 'Maria')". Clear the search to return.
3. Click a status filter pill like **Maintenance**. The counter updates. Then type a search that matches nothing (`zzz`) — the drawer's empty state should appear with a **Clear filters** link; click it and everything resets.
4. Change the **Organization** dropdown at the top — the small grey "Scope: …" pill near the filter strip should flash teal and update its text.
5. Open `vehicles.html`. Confirm the four summary cards (Running / Idle / Maintenance / Offline) appear above the filter row, and the "Showing X of 25" counter is in the top right. Type a search that matches nothing — you should see an inline "No vehicles match" row.
6. Open `alerts.html`. Confirm the filter row has clearly labelled controls (Time range, Severity, Type, Status, Search). Type in the search to narrow the table; the counter should update.
7. Shrink the browser to phone width on `vehicles.html` or `alerts.html` — the filter row should stack vertically, the table should scroll sideways inside its box, and the small "Scroll for full table" hint should appear above it.
