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

- The many placeholder links across the page (breadcrumbs, footer links, tags, related series, social links, source/release links) now show a small pop-up message confirming what they would do, instead of silently doing nothing.
- The "From" and "To" date boxes above the chart now open a real calendar date picker, so you can pick a date instead of typing one by hand.
- Clicking a time-range button (5Y / 10Y / Max) now shows a confirmation message, and the date boxes politely lose focus first so the picker doesn't get stuck open.
- In the data table, months that don't have a value yet show a clear dash with a "Data not yet available" tooltip, instead of being blank.
- The "Skip to content" link at the top of the page now slides into view properly when you press Tab, so keyboard users can jump past the navigation.
- On a phone, the page is easier to use: buttons and links are larger taps, and the long breadcrumb trail is shortened so it fits on a narrow screen.

## How to test the changes

Open `index.html` in any modern browser.

- Click any link in the breadcrumbs at the top, the footer, the tag list at the bottom, or the "Related" sidebar — a small toast should pop up confirming the action.
- Click the "From" or "To" date box above the chart — a calendar should open. Try changing the range with **5Y / 10Y / Max** afterwards.
- Scroll to the data table beneath the chart and look for any month showing a dash; hover it to see the "Data not yet available" tooltip.
- Press **Tab** as soon as the page loads — the "Skip to content" link should slide down at the top-left.
- Open the page on a phone (or shrink the browser window narrow): notice the breadcrumbs collapse and the buttons grow larger.
