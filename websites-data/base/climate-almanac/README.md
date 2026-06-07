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
