# Climate Almanac

Climate Almanac is a demo data explorer for poking at long-term climate variables. You pick the variables you care about (temperature anomaly, precipitation, CO₂, sea ice, and so on), and the chart in the middle overlays them so you can compare trends over the same time window.

> Fictional product — all the climate series are synthetic data baked into the page. Nothing is fetched live.

## What you can do

- **Layer up to four climate variables on one chart.** Pick variables from the left rail; each gets a colored swatch and shows its units and source. If they have different scales, the chart adds a second axis automatically.
- **Inspect any year.** Hover the chart to see a tooltip with that year's values. The inspector on the right shows the same year's numbers in detail.
- **Zoom and pan through history.** The brush below the chart lets you drag either handle to narrow the range, or drag the middle to slide the window forward and back.
- **Annotate moments worth flagging.** Click an annotation pin on the time axis to see what was happening; use **+ Note** to add your own.
- **Tune the view.** Change region, smoothing window, or whether the y-axis shows raw units or normalized anomalies. Remove a layer by clicking its chip in the layer order panel.
- **Check sources.** Hover a source in the source list to see a footnote about (this synthetic) dataset.

## How to use it

Open `index.html` in any modern browser. Add a variable from the left rail, then drag the brush at the bottom of the chart to focus on a time range. Click anywhere on the chart for a year-specific reading; everything else (region, smoothing, axis mode, layer order) lives in the rails on either side.

## What was changed in this version

- A new year slider below the chart lets you scrub through years one at a time, and the picked year stays highlighted with a dashed vertical line on the chart so you don't lose your place.
- Clicking anywhere on the chart now also locks the inspector to that year (previously it only updated while the mouse was over the chart), so the values stick when you move your cursor away.
- You can now press the Left and Right arrow keys after focusing the chart to step the inspected year backwards and forwards.
- The **Download .csv** button now actually downloads a CSV file of whatever variables and year range you currently have on screen, and a small toast confirms how many rows were exported.
- The **Share view** button now opens a small dialog with a ready-made link that captures your current variables, smoothing, region, axis mode, year range, and inspected year. A **Copy** button copies it to the clipboard and a toast confirms the copy.
- Clicking an annotation in the right-side list now jumps the chart inspector to that year (with the note shown below the values), and the small "×" beside each annotation still removes it.
- Annotation pins on the chart now also jump the inspector to that year when clicked, and show the note text below the values.
- All form controls (Region, Smoothing) now have proper labels and the chart has a screen-reader description, making the page friendlier with keyboard and assistive tech.

## How to test the changes

1. Open `index.html` in any modern browser.
2. Drag the new **Inspect year** slider beneath the chart left and right — the chart should draw a dashed vertical line at the picked year and the right inspector should update live; the number next to the slider should match.
3. Click anywhere on the chart — the dashed line should jump there and stay even after you move your mouse away. Hover other years; the temporary tooltip should follow your mouse, but the inspector should keep showing the year you clicked.
4. Click on the chart, then tab to give it keyboard focus (or click it once to focus) and press Left/Right arrow keys — the inspected year should step by one each press.
5. Click **Download .csv** in the top bar — a CSV file should download with one row per year for whatever variables you've added, and a small toast in the corner should say "Download started · N rows".
6. Click **Share view** in the top bar — a dialog should pop up with a URL that includes your variables and settings. Click **Copy**; a toast should confirm "Link copied to clipboard". Paste it into a new tab to confirm the explorer loads with the same selections.
7. Click any annotation pin on the chart (or any note in the annotations list on the right) — the inspector should jump to that year and show the note text beneath the values.
8. Click the small "×" next to an annotation in the list — only that note should be removed, not the whole inspector reading.
