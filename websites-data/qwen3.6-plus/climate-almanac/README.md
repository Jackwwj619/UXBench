# Climate Almanac — multi-variable climate explorer (local demo)

Fictional climate-data explorer. Local fixture for UXBench. Open `index.html` directly.

## Page

### `index.html` — Explorer
Three-panel layout: left rail variable selector (six climate variables, each with a colored swatch, units, and source caption), center chart area, right inspector panel.

Center stack:
- A vector chart with up to four overlaid series and a dual-axis option (left axis for unit-less anomalies, right for absolute units).
- Hovering exposes a value tooltip and updates the right-rail inspector with the same year's values.
- Click-able annotation pins along the time axis. The "+ Note" button adds new ones.

Below the chart: a time-axis brush. Drag either handle to set the range; drag the shaded middle to pan the window. The chart immediately reflows.

Other rails:
- Region selector, smoothing window, axis mode.
- Drag-style layer chips show the current overlay order; each chip removes the layer when clicked.
- Source list — hovering a source surfaces a footnote-style tooltip describing the (synthetic) dataset.

All data is synthetic and inline in `script.js`. No external requests.
