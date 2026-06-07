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

- The status filter strip on the dashboard now actually hides vehicle icons on the map. Picking "Idle" or "Alert" leaves only those vehicles visible instead of just dimming the counts in the bottom drawer.
- The unfinished side-nav items (Drivers, Routes, Maintenance, Settings) are now visibly marked with a small "Soon" badge and show a friendly toast ("Drivers is coming soon — module not yet available.") instead of silently routing to a dead `#` link.
- On narrow windows the side rail collapses into a clean bottom tab bar that only carries the real pages (Dashboard, Vehicles, Analytics, Alerts) — the "soon" links are hidden so the bar isn't cluttered, and the alert badge sits neatly on top of its icon.
- Data tables on the Alerts, Vehicles, and dashboard drawer now reflow into a stacked card layout on phone-width windows, with each cell prefixed by its column label (Plate, Driver, Status, etc.) instead of overflowing horizontally.
- The dashboard header now wraps cleanly on phones — the org dropdown, search box, and profile button stay on screen instead of running off the edge.
- Form controls across the app (dropdowns, search boxes, table action buttons, checkboxes) are now full 44px touch targets on phone widths, with bigger 22px checkboxes.
- Search fields, org selectors, and filter dropdowns throughout the app now have proper labels and aria-labels, so screen readers and autofill know what each field is for.
- The "Select all" checkbox on the vehicles table and each row's checkbox now carry assistive labels naming the plate, so screen readers can disambiguate them.

## How to test the changes

1. Open `index.html`. Click "Idle" or "Maintenance" in the status filter strip — only matching vehicle icons remain visible on the map, and the bottom-drawer count updates to match.
2. Click any of the side-nav links marked with a small "Soon" pill (Drivers, Routes, Maintenance, Settings) — a toast appears at the bottom saying the module isn't available yet, instead of navigating to a dead link.
3. Open `alerts.html` or `vehicles.html`, then resize the browser to phone width — the table rearranges into stacked cards where each row has labelled "Plate", "Driver", "Status" rows.
4. On phone width, the side rail moves to the bottom of the screen as a tab bar showing only Dashboard, Vehicles, Analytics, and Alerts — the alert badge sits in the corner of its icon.
5. Tab through filter dropdowns on the Alerts page; screen-reader output names each one ("Filter by severity", "Filter by alert type", etc.).
6. On phone width, tap each toolbar select and the table action buttons — every control has a comfortable 44px tap area.
