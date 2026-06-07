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

- The Drivers, Routes, Maintenance, and Settings entries in the left side menu are now clearly marked "Soon" and faded, so it's obvious those sections aren't built yet. Clicking one shows a small "coming soon" toast at the bottom of the screen.
- The search box in the top bar of the dashboard now actually filters the vehicle list as you type, matching plate, driver, task, or area.
- The search boxes on the Alerts and Vehicles pages also work now, and a search you type in the top bar carries through to the page's main filter.
- When you've applied any filter or search on the Alerts or Vehicles pages, a row of coloured chips appears above the table summarising what's active, along with a "Clear" button to wipe all filters at once.
- The vehicle count next to the status filters now shows "12 of 25" instead of just "12" whenever a filter is on, so you can see how much you've narrowed down.
- If a filter or search matches no rows, you now get a clear "No vehicles/alerts match the current filters" message inside the table instead of an empty table.
- The mileage and service dates in the Vehicles table are now stable values — they used to shuffle every time you changed a filter.
- Pressing Escape now closes the vehicle detail panel that slides in from the right.
- Action buttons in the Alerts and Vehicles tables (Assign / Details) are bigger and easier to click, with a visible focus ring when you tab to them.
- On phones and narrow screens, the data tables now stack into card-style rows with labels next to each value, instead of forcing you to scroll the table sideways. The bottom navigation bar is also taller with bigger taps.

## How to test the changes

1. Open `index.html`. Look at the left side menu — Drivers, Routes, Maintenance, and Settings have a faded "Soon" tag. Click one and a "coming soon" toast appears at the bottom of the screen.
2. In the top bar of the dashboard, type a driver name or plate into the search box — the vehicle list in the bottom drawer narrows as you type, and the count badge changes to "X of 25".
3. Go to `alerts.html`. Pick a severity (e.g. Critical) and a type (e.g. Speeding) — a coloured chip row appears above the table summarising what's active. Click "Clear" to remove all filters in one click.
4. On `alerts.html`, type something nonsense like "zzz" into the search box — the table shows a "No alerts match the current filters" message instead of being empty.
5. Open `vehicles.html`. Change the Status dropdown a few times — the mileage and service dates for each vehicle should stay the same, not reshuffle.
6. On the map, click any vehicle icon to open the detail panel on the right, then press Escape — the panel closes.
7. Tab through the buttons in the Alerts table — each has a visible green focus ring.
8. Resize the browser to phone width on `vehicles.html` or `alerts.html` — each row becomes its own card with field labels next to the values, and the side menu becomes a bottom bar.
