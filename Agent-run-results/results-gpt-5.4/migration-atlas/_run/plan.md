# UXAgent Exploration Plan

## Goal

Exhaustively explore the Migration Atlas primary visualization workflow on index.html, validating how filters, time playback, map inspection, and utility actions behave across desktop and mobile.

## Plan Summary

The run should center on the single known atlas page, starting with baseline comprehension of the default state and then exercising the core exploratory flow: filter species, change season, scrub/play time, and inspect map-linked details. Adjacent checks should cover the visible top navigation and utility controls only to verify whether they meaningfully change state, since no separate pages were discovered in prescan. Because this is a dense three-column data visualization with many tiny controls, mobile validation should focus on layout integrity, reachability, and touch usability of the most important interactions.

## Coverage Targets

- pages: `Visit the only known page, index.html, and revisit it through multiple UI states rather than expecting additional HTML pages.`
- features: `Exercise nearly all visible controls on index.html: species search, all species toggles at least selectively, study year selector, all display toggles, month slider, play/pause, speed selector, map inspection attempts, and top utility/nav controls.`
- mobile: `Repeat the critical exploration flow on a mobile viewport: access filters, change species, scrub or play months, inspect the visibility of the right-side detail content, and test touchability of the smallest controls.`

## Planned Phases

### Baseline atlas state and information architecture

- Objective: Establish the default state of the only known page and verify the visible structure, defaults, and static comprehension cues before altering state.
- Target pages: index.html
- Key checks:
  - Confirm default selected species, study year, display toggles, current month, species shown count, and individuals count.
  - Check whether the page communicates the primary task clearly: filter species, play through months, inspect individuals.
  - Verify that left filter rail, center map/player, and right inspector/stats are all visible and readable on desktop.
  - Note whether top navigation and utility actions appear actionable versus decorative in the default state.
- Exit criteria:
  - A complete record of the default desktop state is captured, including selected filters and visible summary metrics.
  - The primary workflow and the page regions involved in that workflow are identified from direct observation.

### Filtering and dataset state changes

- Objective: Validate that filtering controls produce coherent updates across map, counters, and inspector/stat areas, including recovery from narrow or empty states.
- Target pages: index.html
- Key checks:
  - Use the species search input to narrow the species list and verify filtering behavior, matching text, and clearing/reset behavior.
  - Toggle multiple species on and off, including reducing to one species and attempting zero species if allowed.
  - Confirm species shown and individuals counts update correctly when species selections change.
  - Switch between 2024, 2025, and 2026 season (in progress) and observe whether the map, counts, or labels update consistently.
  - Toggle Show trail, Show monthly positions, and Show stop-over polygons individually and in combination to verify visible impact.
  - Watch for broken states such as blank map without explanation, stale inspector content, or stats not matching current filters.
- Exit criteria:
  - Most visible filter controls have been exercised at least once, including search, species toggles, year selector, and display toggles.
  - At least one reduced-data state and one recovery back to a richer state have been validated.

### Temporal playback and progression

- Objective: Test the time-based interaction model to ensure slider scrubbing, playback, and speed changes are understandable and synchronized with the map and metrics.
- Target pages: index.html
- Key checks:
  - Scrub the month slider across multiple positions including beginning, middle, and end of year and verify the current month label changes appropriately.
  - Observe whether trails extend progressively as described when advancing through months.
  - Use Play/Pause to animate through months and verify whether playback advances smoothly and can be stopped reliably.
  - Change speed between 0.5×, 1×, 2×, and 4× and confirm the cadence changes without breaking playback state.
  - Check whether aggregate stats such as active individuals, max range this month, fastest individual, and stop-overs detected change with month progression.
  - Look for edge behavior at January/December boundaries, such as looping, stopping, or resetting unexpectedly.
- Exit criteria:
  - Slider, play/pause, and speed selector have all been exercised in combination.
  - There is clear evidence whether temporal controls stay synchronized with month label, map rendering, and summary metrics.

### Map inspection and detail panel linkage

- Objective: Verify the inspect-an-individual flow by interacting directly with the map and confirming whether selection state is intelligible and persistent across other controls.
- Target pages: index.html
- Key checks:
  - Attempt to click visible trails, monthly dots, or tags in the map to trigger the Individual panel.
  - Confirm whether selected individual identifiers and related details appear in the right-side inspector.
  - Test selection on at least two different visible species/track colors if clickable targets can be found.
  - While an individual is selected, change month and/or filters to see whether selection persists, updates, or clears appropriately.
  - Check whether hiding trails or monthly positions affects the ability to select and inspect individuals.
  - Look for affordance problems: no hover/cursor change, unclear selected state, overlapping marks, or accidental selections.
- Exit criteria:
  - Either the inspect flow has been successfully triggered and validated, or strong evidence is gathered that the map selection affordance is missing/broken.
  - Selection behavior under at least one subsequent state change has been observed.

### Adjacent actions and mobile resilience

- Objective: Probe visible non-core controls for meaningful behavior, then repeat the most important atlas checks on mobile to assess responsiveness and touch usability.
- Target pages: index.html
- Key checks:
  - Click Explore, Studies, Submit a track, Methods, and About to verify whether they navigate, jump, or do nothing.
  - Use Save view and Cite this view to observe any message, copied state, modal, URL change, or silent failure.
  - Switch to mobile viewport and verify whether filters, map, player, and inspector remain reachable and understandable.
  - Repeat one species-filter change, one month scrub/play interaction, and one attempt at map selection on mobile.
  - Assess whether the tiny checkbox targets and compact top action buttons are practically operable on touch.
  - Watch for clipping, horizontal scrolling, hidden controls, overlapping columns, or reordered content that weakens the core flow.
- Exit criteria:
  - All visible top-nav and utility controls have been tried once and their outcomes documented.
  - Critical path interactions have been rechecked on mobile with at least one concrete finding about responsiveness or touch ergonomics.

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

