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

- The filter rows on the Alerts and Vehicles pages now show a small label above each dropdown ("Time range", "Severity", "Type", "Status", "Search vehicles") so it's obvious what each one does, instead of guessing from the placeholder.
- The big tables on the Alerts and Vehicles pages no longer get squashed or cut off on narrow screens — they can now be scrolled sideways inside their own area while the rest of the page stays still.
- The Assign and Details buttons inside table rows are now taller and have clear screen-reader labels like "View details for alert ALT-1042 on truck ATL-1287".
- The bottom navigation bar on phones is taller, has more breathing room between the icons, and the alert badge sits cleanly in the top corner of the bell instead of overlapping the icon.
- On phones, filter boxes now snap to two-per-row (or one-per-row on very small screens), the map controls and search box wrap onto the next line cleanly, and there's extra space at the bottom of every page so the navigation never covers the last row of a table.
- All the dropdowns, search boxes, the org switcher, and the account icon in the top bar now have proper labels for screen-reader users.

## How to test the changes

1. Open `alerts.html`. Above each dropdown in the filter row, you should see a small grey label like "Time range" and "Severity". Click any "Details" button — its tooltip / aria label now mentions the specific alert and vehicle.
2. Narrow the browser to phone width. On `alerts.html` or `vehicles.html`, the table can now be scrolled sideways inside the page; the page itself doesn't scroll sideways anymore.
3. On a phone-sized window, the bottom navigation strip looks roomier and the red number badge on the bell sits in the corner instead of on top of the icon.
4. Open `vehicles.html` on a phone-sized window. The status, fleet, and search filters now stack into two-per-row instead of cramming into one line.
5. Open `index.html` on a phone-sized window. Scroll to the bottom — there's a little extra space so the bottom navigation doesn't cover the page footer or the bottom drawer.
