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

- **Wide data tables now scroll sideways on a phone.** The alerts table and the vehicles table no longer overflow the page on narrow screens — they slide left and right within their own scroll area while the rest of the page stays put.
- **The bottom navigation bar on mobile is friendlier to tap.** Each icon in the slim left rail (which becomes a bottom bar on phones) is now a comfortable size for a fingertip, and it no longer accidentally captures taps meant for the map or panel above it.
- **Search boxes, dropdowns, and the user icon are bigger on phones.** The top-bar search, organisation switcher, and round profile/alert icons all grow to a finger-friendly size when the window is narrow.
- **Filter pills and toolbar dropdowns feel chunkier.** The status filter strip on the map page and the dropdowns on Alerts and Vehicles are taller so they're easier to hit without misclicking.
- **Bigger, easier-to-click table checkboxes.** The "Select all" and per-row checkboxes in the vehicles table now have a larger tap area so you don't have to aim precisely.
- **Action buttons inside tables (e.g. Details, Assign) are sized consistently** so they no longer look squished into one or two pixel-tall rows.
- **Disabled buttons and filters look disabled.** When a button or filter can't be used, the cursor changes to a "blocked" symbol and the control fades slightly, so it's obvious why nothing happens when you click.
- **Better screen-reader labels.** The org switcher, search boxes, alert bell, profile icon, and filter dropdowns are now properly labelled so they make sense when read out by assistive tech.

## How to test the changes

1. Open `index.html` and shrink the browser to phone width. The slim left rail should jump to the bottom of the screen as a horizontal bar, and each icon should look comfortably tap-sized.
2. While narrow, open the alerts page from the bell icon. The big alerts table should let you swipe/scroll left and right inside its own area, while the page header and filter bar stay anchored.
3. Open `vehicles.html` at phone width. Try ticking the "Select all" checkbox at the top of the table and a few row checkboxes — they should be easy to hit and not require careful aiming.
4. Still on the vehicles page, look at the **Details** / **Assign** buttons inside the rows. They should be a consistent, readable size rather than crammed in.
5. Resize back to a normal desktop window. The map overview should still look right, and clicking a vehicle should slide in the right-side detail panel as before — the new layered tweaks shouldn't block any clicks on the map.
6. Tab through the page with the keyboard or use a screen reader on the top bar — the org switcher, search field, alert bell, and profile icon should now read out with meaningful names.
