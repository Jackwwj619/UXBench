# FRED Unemployment Rate Clone

A practice clone of the FRED (Federal Reserve Economic Data) series page for the U.S. unemployment rate (UNRATE). It shows the time series as a line chart with recession periods shaded, plus the metadata FRED publishes alongside every series.

> Front-end demo only — the data file is sample data, not the live FRED feed.

## What you can do

- **Read the unemployment rate over time.** The main chart shows monthly unemployment with recession periods shaded behind it. Hover anywhere on the line for a tooltip with that month's value.
- **Switch how the data is displayed.** Above the chart, change the time range (5Y / 10Y / Max), the frequency (Monthly / Quarterly / Annual), and the units.
- **Get the metadata.** The side panel lists the source, release, units, frequency, last-updated date, and notes about the series — what economists need to cite it.
- **Take it away.** Download, API, Embed, and Citation buttons let you grab the data or reference it.
- **Find related series.** Recommendations point to other indicators worth looking at next.

## How to use it

Open `index.html` in any modern browser. Click the time-range buttons above the chart to zoom in or out, switch frequency or units as you need, and hover the chart line to read individual values.

## What was changed in this version

- The blue "maintenance" banner at the top is now much shorter — a regular notice strip instead of a huge billboard that took up half the screen.
- The From / To date boxes above the chart now have a proper "Apply" button next to them, so it's obvious how to commit a custom range instead of guessing whether typing alone did anything.
- The close button on the Edit Graph side panel is now a clearly outlined "X Close" button with text, and a new "Done" button sits at the bottom of the panel so you can dismiss it from either end.
- Closing the Edit Graph panel (by X, by Done, or by clicking outside) now shows a brief "Edit Graph closed." toast so you know the action took effect.
- All the dead "#" links scattered across the page (Source, Release, related series, blog posts, footer social and help links) now show a friendly toast like "Real Gross Domestic Product series (demo)." when clicked, instead of silently jumping to the top of the page.
- The "Related Data and Content" section now has a one-line note explaining that this is a demo and links open a confirmation message rather than navigating away.
- You can now tap (not just hover) the chart to see the tooltip with that month's value — useful on touch screens where hovering isn't possible.
- All the small icon buttons and shortcut buttons across the page (header icons, range pills, date inputs, social buttons) are now at least 44 pixels so they're easy to tap on a phone.

## How to test the changes

1. Open `index.html`. The blue notice strip at the top should now be a single short row, not a tall block. Click the X — it dismisses normally.
2. Scroll to the chart controls. Type a different "From" date (say `2000-01-01`) and click the new "Apply" button — the chart re-renders to that range and a toast confirms "Date range applied: ...".
3. Click "Edit Graph" to open the side panel. The close button in the top right is now a labelled "X Close" button. Scroll to the bottom of the panel — there's also a "Done" button. Click either, or click the dimmed area outside — a "Edit Graph closed." toast appears.
4. Scroll down to the "Related Data and Content" section. Read the new italic note explaining this is a demo. Click "Real Gross Domestic Product" — a toast appears saying "Real Gross Domestic Product series (demo)." instead of the page jumping to the top.
5. Scroll to the very bottom and click any footer link (LinkedIn, FRED Help, Privacy Notice) — each shows a "... (demo)." toast.
6. On a touch device or phone simulator, tap the chart line — the tooltip should appear at the tap point. Resize your browser narrow and confirm the header icons, range buttons, and date inputs are all comfortably tappable.
