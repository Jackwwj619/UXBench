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

- The "Topology" and "Events" items in the left sidebar are now clearly marked as "soon" and look greyed out, so you don't waste a click on links that go nowhere.
- The "Replay" and "Plan" tabs at the top of Overview, plus the ⌘K search button, are now visibly disabled with tooltips explaining they aren't available in this build.
- The alert bell in the top bar now opens a small recent-alerts panel listing the three latest critical/major events, with a link to the full Alarms page. Clicking outside closes it.
- The Alarms page filters (severity, status, time, search) now actually filter the alarm table, and a summary line above the table describes what's shown. When nothing matches, a friendly "No alarms match these filters" panel appears with a Reset filters button.
- "Acknowledge selected" on the Alarms page now starts disabled and only becomes active once you tick rows; the button label updates to show the count, e.g. "Acknowledge 3 selected". A select-all checkbox in the table header ticks every row at once.
- The Generators page now also shows a summary line listing the active filters, an empty-state panel with a Reset filters button when nothing matches, and a select-all checkbox in the table header.
- Clicking "Details →" on a generator or "Open →" on an alarm now expands a small drawer under that row explaining the feature isn't available, instead of doing nothing. Clicking again collapses it.
- On the Overview chart, the 24h / 48h / 7d buttons now visibly switch which range is "active". On the Forecast page, the 12h / 24h / 7d buttons and the Day-ahead/Hour-ahead/Real-time dropdown both update the chart title.
- The generator count and "View all" link no longer say "312 units" — they now correctly say "38 dispatchable units · 312 total assets".
- On phones, the Generators and Alarms tables now stack into easy-to-read cards (one row per generator with field labels on the left), and filter pills, dropdowns, buttons, and sidebar items are noticeably larger to tap.

## How to test the changes

1. Open `index.html`. In the left sidebar, hover "Topology" or "Events" — they're now greyed out with a "soon" tag and a "Coming soon" tooltip.
2. At the top, hover the "Replay" or "Plan" tabs and the ⌘K button — each shows a disabled cursor and a tooltip saying it's unavailable.
3. Click the bell icon top-right — a small popover appears listing three recent alerts and a link to the Alarms page. Click anywhere outside to close.
4. Click the 24h / 48h / 7d buttons above the system-load chart — the "active" highlight moves to the button you pressed.
5. Open `alarms.html`. Change the Severity dropdown to "Critical only" — the table filters and the summary line above updates (e.g. "Showing 2 critical alarms · open · last 24h"). Type "wind" into the search to narrow further.
6. Set filters that match nothing (e.g. Severity=Minor only + Status=Resolved + Time=Last 1h) — a "No alarms match these filters" panel appears with a Reset filters button.
7. Tick a couple of alarm checkboxes — the top-right "Acknowledge selected" button becomes active and shows the count.
8. Click "Open →" on any alarm row — a small grey drawer slides out under it explaining the feature isn't available. Click again to collapse.
9. Open `generators.html`. The header now reads "38 dispatchable units · 312 total assets". Type in the search box and pick a fuel — the summary line lists the active filters; clear all and click Reset filters in the empty state if nothing matches.
10. Click "Details →" on a generator — a similar small drawer appears under the row.
11. Open `forecast.html`. Click "12h" or "7d" above the chart — the title above the chart updates accordingly. Change the dropdown to "Hour-ahead" — the title updates to combine both labels.
12. Resize the browser to phone width and open Generators or Alarms — table rows stack into cards with field labels on the left, and filter buttons/dropdowns are big enough to tap easily.
