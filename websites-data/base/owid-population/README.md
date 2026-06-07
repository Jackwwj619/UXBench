# OWID Population Clone

A planned practice clone of the Our World in Data Grapher page for the global Population chart. Right now, only the data files are in place — the page itself hasn't been built yet.

> Not yet implemented. The HTML/CSS/JS for the chart haven't been written; only the underlying data is here.

## What's here today

- `data/population.csv` — long-format historical population data
- `data/population.metadata.json` — source, units, last-updated info
- `data/population-data.js` — the same data shaped for the eventual front-end

## What it will become

When built, the page will let you:

- **Read a long-running population chart.** Title and subtitle at the top, with Chart, Map, and Table view tabs.
- **Compare countries.** A multi-select on the left lets you add or remove countries from the chart.
- **Pick a time range.** A slider at the bottom controls the time axis; the chart reflows as you move it.
- **Read the source.** A collapsible Sources section explains where the data comes from.
- **Take it away.** A Download / Embed / Citation toolbar lets you export the chart or grab a citation.

## How to use it

Until the page is built, you can inspect the data files directly. The CSV and JSON metadata are standalone references for OWID's population dataset.
