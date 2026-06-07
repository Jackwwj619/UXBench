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

- Side-nav items that aren't built yet (Drivers, Routes, Maintenance, Settings) are now visibly marked "soon" and look slightly dimmed, so you don't keep clicking links that go nowhere.
- The alerts popover that opens from the bell now has an X close button in the top corner, and you can also press the Escape key to close it (or the open vehicle details panel).
- On both the Alerts and Vehicles pages, any filter or search you've set shows up as a small chip just above the table, with an X to clear that one filter individually. The table also shows a friendly "No alerts match the current filters" message when nothing matches, instead of just being blank.
- The Alerts page search box now actually filters the table (it didn't before), matching against the vehicle plate, alert note, or type as you type.
- The search box on the Analytics page now filters the top-10 driver performance table by driver name or fleet as you type, instead of doing nothing.
- Buttons, dropdowns, search boxes, filter pills, and the status filter chips throughout the dashboard are larger and easier to tap, especially on phones and tablets.
- On phones, the side navigation slides to the bottom of the screen as a real bottom bar, and the wide data tables now scroll sideways so columns aren't crushed.
- Screen readers now announce meaningful names for the organization picker, search boxes, filter dropdowns, icon buttons (alerts bell, profile, close), and the status filter pills correctly report which one is active.

## How to test the changes

1. Open `index.html`. Look at the left side-nav — Drivers, Routes, Maintenance, and Settings should appear slightly dimmed with a small "soon" badge next to each. Hover one and you'll see a tooltip.
2. Click the bell icon (top right) to open the recent-alerts popover. Press the X button in the top right of the popover to close it. Reopen it and press the Escape key — it should close again.
3. Click any vehicle icon on the map to open the right detail panel, then press Escape — the panel should slide closed.
4. Open `alerts.html`. Type "speed" into the search box — only rows with "Speeding" should remain. Pick a severity from the dropdown — a chip like "Severity: Critical" should appear above the table; click its X to clear that one filter. Apply filters that match nothing (e.g., search a nonsense string) — the table should show "No alerts match the current filters."
5. Open `analytics.html`. Type a driver name into the top-right search box ("Search drivers…") — the top-10 driver performance table should narrow as you type.
6. Resize the browser to phone width. The side nav should move to the bottom of the screen as a horizontal bar, and the vehicle and alerts tables should let you swipe sideways to see all columns.
