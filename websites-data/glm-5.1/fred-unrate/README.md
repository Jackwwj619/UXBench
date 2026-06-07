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

- "Shaded areas indicate U.S. recessions." is now displayed as a small italic caption instead of a blue link that did nothing when clicked.
- In the data table under the chart, missing values now show "N/A" in grey italics (with a tooltip explaining no data was reported) instead of an empty cell.
- Clicking a placeholder link (like "Monthly, Not Seasonally Adjusted" or any other unfinished link) now pops up a friendly toast saying it's a demo link without a destination, instead of silently jumping to the top of the page.
- The blue maintenance banner at the top is much less shouty — the text is now a normal readable size instead of a huge 30-pixel headline.
- Buttons, range pickers, breadcrumbs, and the round social-share buttons are larger and more comfortable to tap on phones.
- Keyboard users now see a clear blue focus outline on every link and button as they tab through the page.
- The sliding side drawer (e.g. for download or embed) no longer overflows the screen on narrow viewports and its header now stays pinned at the top while you scroll the contents.

## How to test the changes

1. Open `index.html`. The blue banner at the very top should now have normal-sized text, not an oversized headline.
2. Below the main chart, look for the legend line "Shaded areas indicate U.S. recessions." — it should appear as small grey italic text, not as a blue link.
3. Click "Monthly, Not Seasonally Adjusted" (or any link that goes to "#") — a toast should pop up at the bottom telling you it's a demo link without a destination.
4. Scroll down to the data table under the chart. Any rows whose value is missing should display "N/A" in grey italics; hover for the explanation tooltip.
5. Press Tab repeatedly from the top of the page — every link and button should show a visible blue focus outline as you move through them.
6. Open any side drawer (e.g. Download or Embed). On a narrow window the drawer should not overflow the screen, and scrolling its body should keep the title bar fixed in place.
