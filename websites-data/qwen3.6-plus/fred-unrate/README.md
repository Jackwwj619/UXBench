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

- **The "Edit Graph" button now toggles.** Clicking the button when the side panel is already open closes it again, instead of leaving you to hunt for an X.
- **Date boxes catch typos.** If you type something like `1948-13-99` into the From or To date boxes, the box now turns red and a clear "Enter dates as YYYY-MM-DD" message appears below them. Fix the date and the warning disappears.
- **"Shaded areas indicate U.S. recessions" is now an interactive legend.** Clicking it opens a small popup listing every NBER recession period (start month to end month) shown on the chart. Click outside or hit Close to dismiss it.
- **Download buttons show a confirmation pop.** Clicking CSV, Excel, Graph image, or PowerPoint now briefly shows a "Preparing CSV download..." toast so you can tell something happened.
- **Switching tabs inside the Edit Graph panel scrolls back to the top.** Jumping between the panel's tabs now smoothly scrolls the panel to the top, so you don't land deep inside a long section.
- **Bigger buttons, icons, and tabs throughout.** Header icons, the chart-action toolbar (zoom, range, download), date inputs, the metadata-block tabs, and breadcrumb links are all sized up to comfortable tap targets.
- **The chart-tab bar sticks at the top while you scroll.** When you scroll down the chart panel, the "Chart / Table / Notes" tab bar stays pinned just under the page header so you can switch views from anywhere.

## How to test the changes

1. Open `index.html` and click **Edit Graph** at the top of the chart. The side panel should slide in. Click **Edit Graph** again — the panel should close.
2. With the Edit Graph panel open, find the From date field and type `1948-99-99`. The field should turn red and a "Enter dates as YYYY-MM-DD" message should appear underneath. Correct the date to `1948-01-01` — the red highlight and the message should disappear.
3. Open Edit Graph again and switch between the tabs inside the panel (e.g. "Add Line", "Format", "Edit Lines") — each click should scroll the panel back to the top.
4. Click the link "Shaded areas indicate U.S. recessions." below the chart — a small popup should appear listing the recession periods (with start and end months). Click anywhere outside the popup to dismiss it.
5. Click any of the download buttons (CSV, Excel, etc.) — a brief "Preparing CSV download..." style toast should appear at the bottom of the screen.
6. Scroll down the page — the row of "Chart / Table / Notes" tabs should stay pinned just below the header instead of scrolling out of view.
