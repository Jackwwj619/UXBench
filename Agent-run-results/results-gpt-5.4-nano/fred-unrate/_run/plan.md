# UXAgent Exploration Plan

## Goal

Critique and validate the UX of the fred-unrate (FRED UNRATE series detail) data-visualization experience, focusing on the primary chart interaction flow and adjacent controls (range/frequency/unit toggles, data table view, download/embed/share/citation, and related-series navigation), including key mobile usability checks.

## Plan Summary

Start on index.html and systematically exercise the core chart controls: time-range (1Y/5Y/10Y/Max), date fields (From/To), and the 'View as data table' switch. Then validate secondary actions (Download, fullscreen/share, edit graph overlay controls if present, and notes/metadata readability). Finish by checking navigation/search entry points and related-series recommendations, repeating the most critical interactions on a mobile viewport.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only).`
- features: `Exercise most visible controls per key page: Search, From/To inputs, 1Y/5Y/10Y/Max presets, Edit Graph editor buttons (EDIT LINE/ADD LINE/FORMAT), Chart vs data table toggle, Download, fullscreen/share, and related-series recommendations.`
- mobile: `Repeat critical checks on mobile viewport for: dismiss notice, range presets + chart interaction, data table toggle, and at least one top navigation/search path.`

## Planned Phases

### Baseline load + dismissible maintenance & primary page structure

- Objective: Ensure the page loads cleanly, the maintenance notice can be dismissed, and the core series header/chart area is reachable and usable.
- Target pages: index.html
- Key checks:
  - Locate and click the maintenance notice 'Close' button; confirm dismissal and that the chart/range controls are still interactable.
  - Use 'Skip to main content' to jump to chart/main content; verify focus and scroll position are correct.
  - Verify key series header elements are present and readable: series title (Unemployment Rate), latest observation ('Apr 2026: 4.3'), updated timestamp, and 'Next Release Date'.
  - Confirm the chart region is visible with recession shading and that the UI controls (1Y/5Y/10Y/Max, From/To, Edit Graph, Download, Chart/Data table toggle) are present.
- Exit criteria:
  - Maintenance notice is successfully closed (or clearly non-blocking if it must remain).
  - Chart and its primary controls are accessible without layout glitches.
  - No console/network errors are observed during basic load and dismissal.

### Core chart interaction: presets, date bounds, hover tooltip

- Objective: Validate that chart range controls and hover interactions behave coherently and update the visualization/data readouts correctly.
- Target pages: index.html
- Key checks:
  - Hover across the line chart to trigger tooltip; validate tooltip updates with date/value and is not obscured by UI.
  - Click time-range presets sequentially: 1Y → 5Y → 10Y → Max; confirm the chart updates (extent of x-axis data) each time.
  - Edit 'From' and 'to' date fields: set to a narrower window, confirm the chart updates to reflect the new bounds.
  - Check that preset selection and manual bounds are consistent (e.g., after selecting 5Y, changing From/To again results in expected range).
  - Verify the recession shading continues to appear appropriately relative to the chosen date window.
- Exit criteria:
  - Tooltip displays expected information on hover and remains stable during interactions.
  - Range presets and manual From/To changes reliably update the chart without broken states.
  - Shaded recession regions remain visible and correctly scoped to the selected range.

### Chart-to-table and notes/metadata clarity

- Objective: Confirm that the 'View as data table' experience works and that metadata/notes remain clear and accessible.
- Target pages: index.html
- Key checks:
  - Click 'View as data table' and confirm the chart-to-table transition occurs (and reverses via 'Chart' tab).
  - In data table view, verify date/value columns are present and correspond to the currently selected range.
  - Scroll to metadata/notes blocks and validate the presence/readability of: Units, Frequency, Source, Release, Last updated, and Notes content.
  - Use internal links/anchors if present (e.g., 'Notes' section) to verify navigation within the page.
- Exit criteria:
  - Data table renders successfully and reflects the active date/range state.
  - Switching between Chart and table does not lose the selected range or produce blank/overlaid content.
  - Metadata and notes are legible and not hidden behind overlays.

### Actions: Edit Graph editor controls, Download/share/fullscreen, related content entry points

- Objective: Validate complex editor controls and key outbound actions (download/share/embed/citation) plus discovery elements.
- Target pages: index.html
- Key checks:
  - Click 'Edit Graph' to open/activate the editing UI; validate 'EDIT LINE', 'ADD LINE', and 'FORMAT' controls are reachable and responsive.
  - If 'Formula Apply Formula' input is usable in the editor context, attempt a simple interaction (focus/type/apply) and verify either a controlled preview/update or a graceful error state.
  - Click 'Download' and validate a download UI/menu opens and can be dismissed/closed without breaking the chart.
  - Verify presence and interaction of fullscreen/share-style actions (as indicated in the visible excerpt: fullscreen/share); confirm they open expected viewers or modals and return cleanly.
  - Scroll to related-series/recommendations area ('Related Data and Content' / suggestions) and click at least one recommendation to confirm navigation behavior (even if it stays on the same page, validate the resulting state).
- Exit criteria:
  - Edit Graph editor opens/closes without overlay/interaction breakage.
  - At least one download/share-related action completes its UI flow (open→action→close or open new view) successfully.
  - At least one related-series recommendation is interactable with a non-broken outcome.

### Mobile viewport critical path re-check (usability/tap targets)

- Objective: Repeat the most failure-prone interactions on mobile viewport and check tap target usability.
- Target pages: index.html
- Key checks:
  - On mobile, attempt to dismiss maintenance notice (Close) and verify it does not trap the user.
  - Trigger hover-equivalent interaction (if hover is not available, use tap on chart points) to confirm value/date disclosure.
  - Use time-range presets (1Y/5Y/10Y/Max) and confirm updates still work with touch.
  - Switch 'View as data table' and verify the table is readable and scannable on smaller screens (no horizontal clipping that prevents reading).
  - Tap top navigation controls (Search input, RELEASE CALENDAR / TOOLS / NEWS / BLOG / ABOUT) at least once to ensure menus/actions are accessible despite small tap targets.
- Exit criteria:
  - Core interactions (range changes, tooltip/table switch) succeed on mobile without mis-taps or blocked UI.
  - No critical controls are unreachable due to responsive layout or sizing issues.

## Prescan Summary

### Unemployment Rate (UNRATE) | FRED | St. Louis Fed

- Page: `index.html`
- Headings: Unemployment Rate (UNRATE), Chart, Notes, Release Tables, Related Data and Content, Data Suggestions Based On Your Search, Content Suggestions, Other Formats, Related Categories, Releases
- Interactables: `65` buttons, `73` links, `14` inputs
- Notable controls:
  - clickable:button:Close maintenance notice
  - clickable:a:Skip to main content
  - clickable:a:FRED home
  - typeable:input:Search FRED Data
  - clickable:button:Search
  - clickable:button:Explore FRED apps
  - clickable:button:Open account menu
  - clickable:a:RELEASE CALENDAR

