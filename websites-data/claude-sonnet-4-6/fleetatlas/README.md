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

## What was changed in this version

- The search box in the top bar now actually filters the map and the bottom vehicle drawer as you type (try a plate fragment or a driver's name). Pressing Enter pops the drawer open.
- The alerts page now responds to the time-range dropdown (24 hours / 7 days / 30 days): the four KPI cards and the subtitle update to match. The search field at the right of the filter row also filters the list now.
- The Assign and Details buttons on alert rows now work — Details opens a popup with the full alert info, Assign asks for confirmation before doing anything.
- The Details button on each row of the full vehicle list now opens a popup with that vehicle's info.
- Tables and filter strips that don't fit on phone screens now scroll sideways instead of being cut off, and the side menu collapses into a tappable hamburger button.
- Navigation links for sections that aren't built (Drivers, Routes, Maintenance, Settings) now show a "Soon" tag and a brief "coming soon" pop-up instead of leading to a dead page.
- Switching organizations from the top-bar dropdown and tapping the profile icon now show a brief confirmation message so it's obvious the click registered.
- When a filter or search returns nothing, the table shows a clear "No vehicles/alerts match…" message instead of going blank.

## How to test the changes

1. Open `index.html`. Type part of a plate or driver name into the top-bar search and watch the map dim the non-matches and the bottom drawer narrow down. Press Enter to expand the drawer.
2. Open `alerts.html`. Change the time-range dropdown to "Last 7 days" — the KPI cards and subtitle should change. Click Details on any alert row to see the popup, then Assign on an open one to see the confirmation.
3. Open `vehicles.html` and click Details on a row.
4. Click "Drivers" in the left side menu — a small "Drivers — coming soon" message should appear.
5. Shrink the window to phone width: the side menu should turn into a hamburger button, the alert table should scroll sideways, and the map controls should stay reachable.
