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

- Decorative placeholder links across the page (top nav items, related-series cards, and other `#` links) now show a small "X is a demo link." toast when clicked, instead of silently scrolling to the top of the page.
- The Edit Graph drawer is now properly inert when closed, so Tab no longer cycles into hidden controls and screen readers don't announce them. Opening the drawer flips inert off and focuses the unit dropdown.
- Every interactive element (links, buttons, inputs, dropdowns) now shows a clear blue focus ring with a soft glow when reached by keyboard, making Tab navigation visible.
- The main UNRATE chart now scales to the screen instead of forcing a 920px horizontal scrollbar on phones. It keeps its aspect ratio and the horizontal scroll has been removed.
- Breadcrumb links and other inline links have 44px tap targets on phone-width windows, so they're easy to tap without zooming.
- The breadcrumbs row now wraps to a second line on narrow windows rather than overflowing off the side of the screen.

## How to test the changes

1. Open `index.html`. Click any of the decorative top-nav links (e.g. "Categories", "Tags") or one of the related-series cards — a toast appears at the bottom saying "X is a demo link." instead of jumping to the top of the page.
2. Tab through the page from the URL bar — each link, button, and dropdown shows a clear blue focus ring as it gains focus.
3. With the Edit Graph drawer closed, press Tab repeatedly — focus never enters the hidden drawer's controls. Open the drawer with "Edit graph" and Tab cycles through its fields normally.
4. Resize the browser to phone width — the chart resizes to fit the column and the horizontal scrollbar under it disappears.
5. On phone width, tap the breadcrumb links — each has a comfortable tap area and the trail wraps onto another row instead of running off screen.
