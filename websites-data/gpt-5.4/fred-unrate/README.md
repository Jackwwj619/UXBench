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

- The "From" and "To" date boxes above the chart now use a proper calendar date picker (with min/max limits) instead of a plain text box, so you can't enter an unsupported date.
- The full-screen chart layer no longer leaks past the corner of the page when closed — it stays fully hidden until you open it, and clicking Close hides the hover tooltip too.
- The Close button on the full-screen view now stands out as a solid blue button and is easier to tap on phones.
- The data table below the chart now shows missing months as a faded italic "N/A" with a tooltip ("Observation not yet available") and a slightly tinted row, instead of a blank cell.
- Toasts on the page now make it clear which actions are real demos and which are placeholders — for example "Share API URL — demo only on this page" instead of just "Share API URL opened", and "Copied to clipboard" for share/embed/citation links.
- Dismissing the maintenance banner at the top now announces "Maintenance notice dismissed." to screen readers and moves focus back to the skip-to-content link, so keyboard users don't lose their place.
- Any link on the page that previously did nothing now shows a friendly "demo only" toast when clicked, instead of silently doing nothing.
- On phones, the range buttons (5Y / 10Y / Max), date inputs, breadcrumbs, related-series tags, and header icons are all noticeably larger and easier to tap.

## How to test the changes

1. Open `index.html`. Above the chart, click the "From" date — a calendar picker appears (instead of a text box) and refuses dates outside 1948–2026.
2. Click the full-screen icon next to the chart. Press Close — the chart returns to normal and no leftover tooltip lingers. The Close button is solid blue and clearly visible.
3. Scroll to the data table below the chart. Recent months that have no value show "N/A" in faded italics with a tinted row background; hover the N/A for the explanation tooltip.
4. Click "Share API URL" or "Copy citation" — the toast now ends with "copied to clipboard" / "demo only on this page", clarifying what actually happened.
5. Click the X on the yellow maintenance banner at the top — the banner disappears and keyboard focus jumps back to the skip-to-content link.
6. Click any link in the top navigation menu, footer, or breadcrumb — a toast appears explaining the link is demo-only.
7. Resize the browser to phone width and try the 5Y / 10Y / Max buttons and the date pickers — they're all big enough to tap comfortably.
