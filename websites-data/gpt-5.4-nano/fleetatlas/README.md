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

- Confirmation pop-ups now actually do something when you click "Confirm" — for example, assigning an alert marks it as assigned and a small message slides in at the bottom of the screen telling you it worked.
- The Assign and Details buttons on alert rows now work — Details opens a small pop-up with the full alert info, and Assign asks you to confirm before marking the alert as assigned.
- The alerts page has a new Search box that filters the list as you type (try part of a plate, driver, or note).
- The labels above each filter dropdown on the alerts and vehicles pages are now visible, so it's obvious which one controls Status, Severity, Type, etc.
- The Settings link in the side menu now opens a small settings pop-up with a few demo toggles, instead of doing nothing.
- The Drivers, Routes, and Maintenance side menu links now show a brief "not available in this demo" message instead of leading to a dead page.
- When a filter combination has no matching rows, the table now shows a clear "No alerts/vehicles match these filters" message instead of going blank.
- Action buttons in the tables are bigger and easier to tap, especially on touch screens.
- Wide tables now scroll sideways on narrow windows instead of getting cut off the edge of the screen.

## How to test the changes

1. Open `alerts.html`. Type part of a vehicle plate or driver name into the new Search box on the right of the filter row — the list should narrow as you type.
2. On the same page, click **Details** on any alert row — a pop-up should appear with the alert ID, time, severity, status, and note. Close it with the Close button or by clicking outside the box.
3. Click **Assign** on an open alert. Confirm the prompt — the row's status should switch to "assigned" and a small confirmation message should briefly appear at the bottom of the screen.
4. Set every filter to a combination that returns nothing — the table should show a clear "No alerts match these filters" message.
5. Click **Settings** at the bottom of the left side menu — a settings pop-up should open with a few checkboxes. Close it.
6. Click **Drivers**, **Routes**, or **Maintenance** in the side menu — a brief message should pop up saying that section isn't available in this demo.
7. Narrow the browser window to phone width and open `vehicles.html` — the table should scroll sideways instead of getting clipped, and the Details buttons should stay easy to tap.
