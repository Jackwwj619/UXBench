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

- The variable list now shows a "2 / 4" counter next to the heading, so you know how many slots you have left. Once you hit four, the remaining checkboxes are greyed out with a yellow note explaining "Limit reached. Uncheck a variable to add another."
- The chart title and the subtitle below it now update automatically to reflect the chosen variables, region, smoothing window, and current zoom range — instead of showing a fixed "Surface temperature anomaly & Atmospheric CO₂ · Global · 3-year running mean · 1900–2024" string regardless of what you picked.
- "Reset zoom" is disabled when you're already viewing the full 1900–2024 range, so it no longer looks clickable when it would do nothing.
- The "+ Note" button now opens a small inline form right above the chart with proper Year and Text boxes, rather than firing two awkward browser prompt() dialogs.
- The smoothing dropdown's "No smoothing" option now actually applies (it previously sent a non-numeric value that the code ignored, so the chart silently stayed smoothed).
- A small status line under the toolbar now shows brief confirmations like "Annotation added at 1998." or "Already at default zoom (1900–2024)."
- Clicking a Datasets / Stories / Methods / About link in the top nav, or a source link in the sources panel, now shows a friendly "coming soon" / "synthetic dataset (demo)" message instead of silently doing nothing.
- Checkboxes, radio buttons, dropdowns, the chart toolbar buttons, and the small "×" buttons that remove a layer are all bigger and easier to tap on phones.

## How to test the changes

1. Open `index.html`. Look at the left rail — you should see a "2 / 4" pill next to the "Add up to four variables" hint.
2. Tick two more variables to reach four. The remaining checkboxes should grey out, and a yellow "Limit reached" message should appear. Untick any one — the others become tickable again.
3. Switch the Region dropdown to "Northern Hemisphere" and change Smoothing to "No smoothing" — the chart title and subtitle above the chart should update to match (e.g., "Northern Hemisphere · no smoothing · 1900–2024 …"). The chart should also visibly become spikier with smoothing off.
4. Drag the brush handles to a narrower range — the "Reset zoom" button activates. Click it and the range snaps back to 1900–2024 and the button greys out again. Click it once more — a small note "Already at default zoom (1900–2024)." appears under the toolbar.
5. Click "+ Note". An inline form appears with Year and Text boxes. Enter a year (e.g., 1998), some text ("Strong El Niño"), and click "Add note". A status message confirms "Annotation added at 1998." and a ⋄ pin appears on the chart.
6. Click "Datasets" in the top navigation — you should see a small "Datasets: coming soon." status message instead of nothing happening. Hover a source in the sources panel and click it — you get "synthetic dataset (demo)" instead of a dead link.
