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

- The chart title and subtitle at the top of the chart now update automatically to reflect the variables you've picked, the region, the smoothing window, and the year range — so the heading always describes what you're looking at.
- The Variables panel now shows "X/4 selected", and once you've added four, the remaining checkboxes are greyed out with a tooltip explaining the limit. Trying to remove the last variable now restores the temperature layer and explains why.
- Most actions (changing region, smoothing, axis mode, resetting zoom, adding a note, removing a layer) now show a small confirmation toast at the bottom of the screen.
- The "Share view" button at the top now copies a shareable link (with your current variables, region, smoothing, axis, and year range) to your clipboard.
- The "Download .csv" button at the top now actually downloads a CSV file with the years and values of every selected variable in the visible range.
- Tapping or clicking the chart now pins the inspector to that year, instead of clearing when you move the mouse away. The cursor line stays put until you reset the zoom.
- The chart now responds to touch — you can drag your finger across it on a phone or tablet to scrub through years.
- On phones, a year slider appears under the chart so you can pick a year without needing precise touch on the chart.
- The chart now has axis labels showing what each side measures (e.g., "Left: Surface (°C)" and "Right: Atmospheric (ppm)"), and the legend uses small arrows to mark which axis each line is on.
- The Sources list on the left now updates to show only the sources for the variables you currently have on the chart, and clicking a source shows its description in a toast (the old hover tooltip was a bit fragile).
- Top-bar links that aren't built yet (Datasets, Stories, Methods, About) now show a small "soon" badge and explain they're coming soon if you click.
- Checkboxes, dropdowns, segmented controls, and the remove (×) buttons are larger and easier to tap on phones and tablets.

## How to test the changes

1. Open `index.html`. Tick "Precipitation" in the left rail — the chart title at the top should change to include precipitation, and the subtitle's variable list updates too.
2. Tick a third and fourth variable. The "X/4 selected" count goes up. Try to tick a fifth — it's greyed out and a toast says you've hit the limit.
3. Untick every variable. The temperature variable comes back automatically and a toast explains why.
4. Change the Region dropdown — a toast confirms the new region, and the subtitle text updates.
5. Click "Reset zoom" — a toast says "Zoom reset to 1900–2024".
6. Click "Share view" at the top right. A toast confirms a link has been copied. Paste it somewhere to see it includes your current settings.
7. Click "Download .csv". A CSV file downloads, with one column per active variable and one row per year in the current window.
8. Click anywhere on the chart. The cursor line and tooltip stay where you clicked. Move the mouse away — they don't disappear.
9. On a touch device (or in mobile-mode browser dev tools), drag a finger across the chart. The cursor and inspector follow.
10. Shrink the browser to phone width — a year slider appears below the chart. Drag it; the inspector updates.
11. In the Sources list on the left, only the sources for currently-selected variables appear. Click one — a toast shows the description.
12. In the top bar, click "Datasets". A small "soon" badge appears next to it and a toast says it's coming soon.
13. Look at the chart — small axis labels read along the left and right sides, and the legend at the top now has little arrows (←/→) showing which line uses which axis.
