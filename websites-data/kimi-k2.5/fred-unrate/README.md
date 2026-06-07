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

- Sidebar links — the related series (Real GDP, CPI, All Employees, etc.), the "Monthly, Not Seasonally Adjusted" alternate-frequency link, breadcrumbs, tags, and footer social links — used to do nothing when clicked. They now show a small confirmation toast like "Real Gross Domestic Product opened.", so you can tell the click was registered.
- The 1Y / 5Y / 10Y / Max time-range buttons above the chart are now larger and easier to tap, with a soft hover highlight and a clear keyboard focus outline. The same applies to the small tag chips below the chart.
- The "Skip to main content" link that appears when you tab onto the page is now a properly sized button (tall enough to read and click).
- On narrow screens (phone width), the tag chips, side-info links, and link-list entries become full 44-pixel tap targets so they're easier to use on a phone.
- Every time-range and tag button now carries a clear, descriptive label for screen readers (e.g. "Show last 5 years").

## How to test the changes

1. Open `index.html`. Scroll to the right-hand "Related data" list and click "Real Gross Domestic Product". A small toast should pop up reading "Real Gross Domestic Product opened.".
2. Click "Monthly, Not Seasonally Adjusted" in the metadata block — another toast should appear confirming it was opened.
3. Click any of the tags ("Civilian Labor Force", "Unemployment", etc.) below the chart — each should show a similar toast on click.
4. Hover the **1Y / 5Y / 10Y / Max** buttons above the chart — each should highlight subtly. Click them and confirm the chart updates to that range.
5. Press Tab from the address bar; a "Skip to main content" link should appear at the top — it should be large enough to read clearly.
6. Shrink the browser to phone width. Tap any tag chip below the chart — it should feel comfortably tall (around 44 pixels).
