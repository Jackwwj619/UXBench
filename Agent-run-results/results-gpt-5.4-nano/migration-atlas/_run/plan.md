# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Migration Atlas interactive visualization end-to-end, focusing on the main exploration flow (filters → map playback → individual inspection) and validating adjacent UI flows (top nav links, citation/save actions, and any interactive components tied to the map).

## Plan Summary

Run should center on index.html: repeatedly vary filter settings, drive the month slider with play/pause and speed controls, then click map elements to validate individual inspection and aggregate stats updates. After validating the core loop, test top-nav actions (Explore/Studies/Submit a track/Methods/About) plus the Cite this view and Save view controls to confirm whether they open modals/overlays, downloads, or in-page sections. Finally, repeat the most failure-prone checks on a mobile viewport, emphasizing small tap targets and slider/toggle accessibility.

## Coverage Targets

- pages: `Visit all known HTML pages (only index.html is present in prescan).`
- features: `Exercise: species filter list + search, study year select, display toggles (3), month slider + play/pause + speed, SVG map click-to-inspect, Individual panel update, aggregate stats update, Cite this view, Save view, and all top nav links.`
- mobile: `Repeat: 2 species toggles, slider scrub + play/pause, 2 map taps for different individuals, and all 3 display toggles on mobile viewport.`

## Planned Phases

### Baseline load + primary exploration loop

- Objective: Confirm the app’s default state loads correctly and that the core loop (slider → map animation → individual/aggregate panels) works without console/network errors.
- Target pages: index.html
- Key checks:
  - Verify initial labels: season heading, current month (May in prescan), and aggregate stats values correspond to the displayed month
  - Click a visible trail/dot/tag on the SVG map; confirm the Individual section updates (individual ID/name) and that aggregate stats area refreshes appropriately
  - Scrub the month slider from the initial position toward at least two non-adjacent months (e.g., Jan and Jul) and confirm map positions/trails and “Current month” update
  - Use Play (▶) to animate through multiple month ticks, observe that slider thumb moves and right-panel/aggregate stats stay consistent; then Pause
- Exit criteria:
  - No console errors observed during interactions
  - Right panel updates after map click and matches the selected individual
  - Month slider and play animation remain synchronized with displayed tracks and aggregate stats at least for Jan/Jul (or similar non-adjacent months)

### Filter + display toggles stress (state consistency)

- Objective: Validate that filter and display controls correctly change the dataset/visual layers and that state transitions don’t break map interactivity or right-panel inspection.
- Target pages: index.html
- Key checks:
  - Toggle species checkboxes: disable one species, then re-enable; verify the map reduces to fewer tracks and aggregate 'Active individuals' count changes
  - Use the species search input (Filter species…) to filter the checkbox list (type partial name like 'whale' or 'albat'); confirm list filters and selected state persists when cleared
  - Change the study year select (2024 → 2026 (in progress)) and confirm header/labels and displayed tracks update; then return to 2025 to ensure restoration
  - Toggle Display options one at a time: Show trail, Show monthly positions, Show stop-over polygons; confirm each layer appears/disappears and does not break SVG click-to-inspect
  - With a restrictive setup (e.g., 1–2 species checked and 1 display mode), click multiple distinct map elements and confirm different individuals can be inspected
- Exit criteria:
  - Active individuals count and visible tracks respond to species and year changes
  - Layer toggles update visuals without disabling map click inspection
  - Species search filters the list and does not leave the map in an inconsistent state

### Cite/Save & top navigation behavior

- Objective: Validate auxiliary controls and navigation affordances, including whether they open modals, copy/share content, or route to in-page sections; ensure user feedback exists.
- Target pages: index.html
- Key checks:
  - Click “Cite this view”; verify resulting UI outcome (modal/dialog/toast) and that it references the current view (month, season/year, selected species/display states) if applicable
  - Click “Save view”; confirm whether it downloads, copies a link, or saves locally and that there is confirmation feedback
  - Activate top nav links: Explore, Studies, Submit a track, Methods, About; confirm whether they (a) change content in-page, (b) open sections/modals, or (c) are dead links (especially where prescan shows href='#')
  - Return to the main visualization (if nav causes scrolling/section changes) and confirm the month slider and map remain usable
- Exit criteria:
  - Cite and Save actions produce a clear user-facing result and do not error
  - Nav interactions do not break the main page; if links are non-functional, record the failure mode consistently

### Mobile viewport critical-path validation

- Objective: Re-run the most failure-prone interactions on mobile: small tap targets, slider/play controls, and map inspection responsiveness.
- Target pages: index.html
- Key checks:
  - Attempt to toggle at least two species checkboxes (noting 13x13px tap targets); verify reliably selected/deselected state
  - Use the month slider and Play/Pause (▶ and speed selector) and confirm synchronization with current month label
  - Tap map elements near trail/dots/tags and confirm individual inspection updates in the right panel (or mobile equivalent) without requiring hover
  - Toggle Display layers on mobile and confirm taps register and the SVG redraw occurs
- Exit criteria:
  - All critical inputs (species toggles, slider/play, map tap selection, display toggles) work at least once per category on mobile
  - No trapping overlays or blocked map interactions due to small UI elements

## Prescan Summary

### Migration Atlas — global animal tracking

- Page: `index.html`
- Headings: Filters, SPECIES, STUDY YEAR, DISPLAY, NOTES, Migration Atlas — 2025 season, Individual, Aggregate stats
- Interactables: `3` buttons, `5` links, `14` inputs
- Notable controls:
  - clickable:a:Explore
  - clickable:a:Studies
  - clickable:a:Submit a track
  - clickable:a:Methods
  - clickable:a:About
  - clickable:button:Cite this view
  - clickable:button:Save view
  - typeable:input:Filter species…

