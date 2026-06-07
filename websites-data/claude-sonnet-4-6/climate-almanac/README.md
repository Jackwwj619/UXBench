# Climate Almanac

Climate Almanac is a demo data explorer for long-term climate variables. You pick the variables you care about — temperature anomaly, precipitation, CO2, sea ice — and the chart overlays them so you can compare trends.

## What was changed in this version

- The "Download .csv" button now actually downloads a CSV file with the years and values you're viewing, with a confirmation message.
- The "Share view" button now copies a shareable link (including which variables, time range, smoothing, and region you've selected) to your clipboard.
- A new "Year" slider underneath the chart lets you pick any year between 1900 and 2024 and have the inspector and tooltip jump to it — useful on phones or trackpads where hovering is awkward.
- The chart title at the top now updates automatically to name the variables currently shown (for example, "Surface temperature anomaly & Atmospheric CO2").
- A new "Reset zoom" button restores the full 1900-2024 range when you've zoomed in with the bottom brush.
- The dataset sources in the right panel now have a small info button next to each one — click it to read a description of that synthetic dataset.
- Header links like "Datasets" and "Methods" are now clearly labelled "soon" so you don't waste a click on placeholders.
- A short on-screen pop-up (toast) confirms actions like adding an annotation, copying a share link, or finishing a download.

## How to test the changes

1. Open `index.html`. Look at the chart title — it should match the variables turned on in the left rail.
2. Click **Download .csv** in the top-right. A CSV file should download and a toast should confirm how many rows were saved.
3. Click **Share view**. The button should briefly say "Copied!" and a toast confirms the link is in your clipboard.
4. Drag the new **Year** slider under the chart left and right — the inspector on the right and the chart cursor should follow.
5. Drag the bottom brush handles to zoom in, then click the **Reset zoom** button to go back to 1900-2024.
6. In the right rail, click the small "i" icon next to any dataset name to see a description popover.
7. Hover a "Datasets" or "Methods" link at the top to see the "soon" tag.
