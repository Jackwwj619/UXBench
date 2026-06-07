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

- The chart title and subtitle now update automatically when you change variables, region, smoothing, or year range, so the header always reflects what you're actually looking at.
- Adding a note is now a guided two-step flow: click "+ Note", and a prompt tells you to click a year on the chart. The cursor switches to a crosshair, and pressing Escape cancels.
- The "Share view" button now copies a URL containing your current variables, region, smoothing, axis mode, and year range to the clipboard, with a toast confirmation.
- The "Download .csv" button actually downloads a CSV of the visible series for the selected year range, with a brief "Preparing…" state and a toast on completion.
- The four-variable limit is now enforced visibly — when four are active, the remaining checkboxes fade and become non-clickable, and a toast explains why if you try to add a fifth.
- Removing the last active layer no longer silently re-adds the temperature series. The chart shows a friendly "Select a variable to begin" empty state instead.
- The legend now wraps onto a second row when variable names would overflow the chart width, so long labels no longer get clipped or overlap.
- Form controls (checkboxes, radio buttons, dropdowns, layer remove buttons) now have 44px tap targets on phone-width windows for easier touch use.
- Screen readers now announce each filter dropdown thanks to proper `<label>` associations on Region and Smoothing.

## How to test the changes

1. Open `index.html`. Toggle different variables in the left rail and change Region or Smoothing — the chart title and subtitle above the chart update to match.
2. Click "+ Note" in the right rail. A blue prompt appears asking you to click a year on the chart; click anywhere on the chart and the year is captured into the note prompt. Press Escape mid-flow to cancel.
3. Click "Share view" in the top bar — a toast confirms a link was copied. Paste it elsewhere to confirm the URL has `?vars=…&region=…&from=…` parameters.
4. Click "Download .csv" — the button briefly shows "Preparing…" and a CSV file downloads with one row per year in the current range.
5. Check four variables in the left rail; the remaining variables fade and can't be added. Uncheck one and the others become active again.
6. Uncheck every variable — the chart shows "Select a variable to begin" instead of jumping back to temperature.
7. Resize the browser to phone width — checkboxes, radio buttons, and the layer remove buttons all become comfortably tappable.
