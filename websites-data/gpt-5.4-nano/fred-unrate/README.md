# FRED Unemployment Rate Clone

A practice clone of the FRED (Federal Reserve Economic Data) series page for the U.S. unemployment rate (UNRATE). It shows the time series as a line chart with recession periods shaded, plus the metadata FRED publishes alongside every series.

> Front-end demo only — the data file is sample data, not the live FRED feed.

## What you can do

- **Read the unemployment rate over time.** The main chart shows monthly unemployment with recession periods shaded behind it. Hover anywhere on the line for a tooltip with that month's value.
- **Switch how the data is displayed.** Above the chart, change the time range (5Y / 10Y / Max), the frequency (Monthly / Quarterly / Annual), and the units.
- **Get the metadata.** The side panel lists the source, release, units, frequency, last-updated date, and notes about the series — what economists need to cite it.
- **Take it away.** Download, API, Embed, and Citation buttons let you grab the data or reference it.
- **Find related series.** Recommendations point to other indicators worth looking at next.

## How to use it

Open `index.html` in any modern browser. Click the time-range buttons above the chart to zoom in or out, switch frequency or units as you need, and hover the chart line to read individual values.

## What was changed in this version

- The custom date range now has its own **Apply** button next to the From / To boxes, so you can pick both dates first and then commit them in one go instead of the chart re-drawing the moment you tab out of the first box.
- A small italic line under the date pickers always tells you which range is currently shown, e.g. "Showing 1948-01-01 to 2026-04-01" — so you can tell at a glance how far back the chart goes.
- When you change the range with a shortcut button (1Y / 5Y / 10Y / Max) or apply a custom date, the From / To date boxes briefly flash yellow so you can see they were just updated, and a small message appears at the bottom confirming the new range.
- The shortcut buttons (1Y / 5Y / 10Y / Max) above the chart now have clearer "pressed" styling — the active one is a solid blue button instead of a faint highlight — and they show a soft blue hover so you know they're clickable.
- Opening Edit Graph, switching tabs inside it (Edit Line / Add Line / Format), and opening or closing the Fullscreen chart all now show a small confirmation message at the bottom of the screen so the action is acknowledged.
- The Edit Graph panel now scrolls back to the top each time you switch tabs, instead of stranding you mid-scroll on the previous tab.
- The tabs inside the Edit Graph panel now stay pinned at the top of the panel while you scroll its content, so you don't lose your place.
- Small round buttons across the top banner, the share/social row, and the chart's icon controls are now larger (44 px) so they're easier to tap on a phone, and they show a hover highlight on a mouse.
- The "Showing 1948-01-01 to 2026-04-01" line is read out by screen readers as the range changes, and the range shortcuts and Fullscreen button now announce their state clearly.

## How to test the changes

1. Open `index.html` and scroll to the chart.
2. Find the From / To date boxes under the chart. Type a new date in the From box (e.g. 2000-01-01) — notice the chart does NOT redraw yet. Type a new To date, then click the new **Apply** button. Now the chart redraws, the boxes flash yellow for a moment, and a small message at the bottom confirms "Date range applied: 2000-01-01 to ..."
3. Look just under the date boxes — the italic line should now read "Showing 2000-01-01 to ...".
4. Click the **5Y** shortcut button above the date boxes. The button turns solid blue, the date boxes flash yellow with their new values, the italic line updates, and a confirmation message appears at the bottom. Hover the other shortcut buttons (1Y, 10Y, Max) — they should show a light blue hover background.
5. Click the **Edit Graph** button (top-right of the chart). The Edit Graph drawer opens and a small message confirms "Edit Graph drawer opened." Inside the drawer, click the **Add Line** tab — the drawer scrolls to the top and another message reads "Add Line options shown." The tabs row stays pinned at the top as you scroll the drawer.
6. Click the **Fullscreen** button on the chart toolbar — the chart fills the screen and a message confirms "Fullscreen chart opened." Close it (Esc or the close control) and a "Fullscreen chart closed." message confirms.
7. Resize the page to phone width or open it on a phone. The small round buttons in the dark top banner and the icon buttons next to the chart should now be comfortably tappable.
