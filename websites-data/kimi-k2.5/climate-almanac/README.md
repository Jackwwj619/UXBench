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

- The chart title now updates to show the variables you're looking at, and the subtitle spells out the region, smoothing setting, and year range — so you always know exactly what the chart is showing.
- The chart tooltip is more reliable: hovering anywhere on the chart now shows the values for that year, instead of only working in a narrow strip.
- If you try to add a fifth variable, the tickbox stays unchecked and a small message tells you "You can compare up to 4 variables. Uncheck one to add another." A yellow banner in the left rail also appears when you've reached the limit.
- The **Download .csv** button now actually downloads a CSV file of the variables and years you're looking at. The button briefly says "Downloading…" and a "CSV downloaded" toast appears at the bottom.
- The **Share view** button now shows a "View link copied (demo)" toast instead of doing nothing.
- When you change region or smoothing, a brief toast confirms the new setting in plain words ("Region: Northern Hemisphere", "Smoothing: 10-year running mean").

## How to test the changes

1. Open `index.html`. Notice the chart title says "Land surface temperature anomaly" (or similar) and the subtitle shows the region, smoothing, and year range. Tick a second variable — the title should change to include both.
2. Move your mouse anywhere over the chart area — a tooltip should appear at any horizontal position, showing values for that year. The right-side inspector should update too.
3. Tick variables until you have four selected. Try to tick a fifth — the box doesn't tick, a toast says "You can compare up to 4 variables", and a yellow banner appears in the left rail.
4. Click the **Download .csv** button at the top right. The button should briefly show "Downloading…" and your browser should download a CSV file named something like `climate-almanac_global_1900-2024.csv`.
5. Click the **Share view** button — a toast should appear saying the link was copied.
6. Change the "Region" dropdown to something different — a toast at the bottom should confirm the new region.
