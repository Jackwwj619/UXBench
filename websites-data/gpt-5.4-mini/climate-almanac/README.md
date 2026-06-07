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

- The "Share view" and "Download .csv" buttons in the top bar now actually work. "Share view" copies a link to the current view (variables, region, smoothing, axis, year range) to your clipboard, and "Download .csv" downloads the visible data as a CSV file. Both confirm with a brief message at the bottom of the screen.
- The Datasets / Stories / Methods / About links in the top bar now open a real pop-up panel with a short explanation, instead of being dead links. You can close the panel with the × button, a click outside it, or the Escape key.
- The chart now responds to taps and touch-drags on phones and tablets, not just mouse hover. You can also click anywhere on the chart with the mouse to pin a reading.
- The "Reset zoom" button now shows a "View reset to 1900–2024." confirmation when used.
- Hovering a source in the left rail used to flash a floating tooltip; clicking a source now expands a clear panel underneath the source list, and clicking again collapses it. This works on touch screens.
- Checkboxes for variables, radios for axis mode, and the small × button on layer chips are all larger and easier to tap, with proper labels for each form control. The "remove note" button on annotations is similarly bigger and shows a red highlight on hover.
- On a phone or narrow window, the chart toolbar buttons now stretch across the full width and the chart header stacks vertically instead of being squashed.
- The inspector hint now reads "Hover or tap the chart …" so touch users know the chart is interactive.

## How to test the changes

1. Open `index.html`. In the top bar, click "Share view" — a "Link to current view copied to clipboard." message should appear at the bottom; paste the link into the address bar of a new tab to confirm.
2. Click "Download .csv" — a file like `climate-almanac_1900-2024.csv` should download, and a "Downloading …" confirmation should appear.
3. Click "Datasets", "Stories", "Methods", and "About" in the top bar one by one — each should open a centred pop-up panel with a short description. Close one with the × button, another by clicking the dimmed background, and a third with the Escape key.
4. Click "Reset zoom" above the chart — a "View reset to 1900–2024." toast should appear.
5. In the left rail, scroll down to the "Sources" list and click any source link — a small panel should appear below the list with the dataset description. Click the same source again to hide it.
6. Click the × on one of the layer chips (e.g. "CO₂") — the chip's × button should be clearly bigger than before and easy to hit. Add the variable back with the checkbox in the Variables list (the checkbox should also be bigger).
7. Click anywhere on the chart — the year tooltip should appear and the right-rail Inspector should fill in. On a touch device, tap the chart with one finger and drag to scrub through years.
8. Shrink the browser to phone width — the chart header should stack vertically and the "Reset zoom" / "+ Note" buttons should each become full width.
