# UXAgent Exploration Plan

## Goal

Critically explore the primary map-based migration tracking flow in Migration Atlas, verify filter/player/inspector interactions across study years and species combinations, and check adjacent navigation and mobile usability for the most important controls.

## Plan Summary

Start with the main visualization on index.html and validate the intended end-to-end flow: species filtering, study-year switching, month scrubbing, play/pause, speed changes, and inspection by clicking trails/dots/tags. Then probe adjacent top-nav and view actions, and use a few representative species/state combinations to see how the map, summary metrics, and inspector update together. Finish with a mobile viewport pass focused on the same critical controls, especially those already flagged as small tap targets.

## Coverage Targets

- pages: `visit all known HTML pages; in this site, that means thoroughly exercising the single known page index.html`
- features: `exercise the filter rail, season selector, display toggles, month slider, play/pause, speed selector, map inspection, and view/action buttons`
- mobile: `repeat the core filter, timeline, playback, and inspection checks in mobile viewport, with special attention to the flagged small tap targets`

## Planned Phases

### Baseline map and control sanity

- Objective: Confirm the default 2025 season state loads correctly and that the core controls are present and responsive before deeper interaction.
- Target pages: index.html
- Key checks:
  - Verify default species selection, current month, active individual count, and aggregate stats match the loaded state.
  - Confirm month slider, play/pause, and speed selector are all usable from the initial view.
  - Check that the right inspector panel shows guidance text when no individual is selected.
  - Inspect whether visible map layers correspond to the default display toggles (trail and monthly positions on, stop-over polygons off).
- Exit criteria:
  - Default view understood and no blocking UI or rendering failures observed.
  - At least one successful state change is demonstrated from the baseline without errors.

### Filter and season matrix

- Objective: Exercise the left-rail filters to validate species toggles, species search, and study-year switching with attention to count and map-state changes.
- Target pages: index.html
- Key checks:
  - Use the species search box to narrow the list, then clear it and verify labels/counts remain consistent.
  - Toggle several species on and off, including the low-count species and the swarm aggregate, and observe changes in species shown and individual totals.
  - Switch between 2024, 2025, and 2026 seasons and verify the map and summary metrics update appropriately.
  - Check whether selected species persist or reset across season changes in a sensible way.
- Exit criteria:
  - All visible species controls have been exercised at least once, including search and season switching.
  - Observed no broken selections, impossible counts, or stale labels after state changes.

### Temporal playback and rendering toggles

- Objective: Validate the month-based migration animation and the display-layer toggles that alter how the data is rendered.
- Target pages: index.html
- Key checks:
  - Scrub the month slider across early, middle, and late-year positions to ensure the title, current month, trails, and active individual behavior update.
  - Use Play/Pause to animate through months and confirm the slider advances and can be stopped cleanly.
  - Change speed among available settings and verify cadence changes during playback.
  - Toggle Show trail, Show monthly positions, and Show stop-over polygons individually and in combinations to confirm layer visibility changes without breaking the map.
- Exit criteria:
  - Month progression is seen to affect the map and summary state.
  - All three display toggles and the speed selector have been tested in at least one meaningful combination.

### Individual inspection and map hit-target validation

- Objective: Confirm that clicking map objects opens or updates the individual inspector and that the key species/trail elements are distinguishable and interactive.
- Target pages: index.html
- Key checks:
  - Click representative trails, dots, and tags for at least two species and confirm the inspector panel updates from the generic prompt to a specific individual.
  - Check that the selected individual affects aggregate stats or displayed context in a coherent way.
  - Verify the interaction remains usable after filter changes and different month positions.
  - Look for any mismatch between clicked visible geometry and the inspector content, especially on dense or overlapping tracks.
- Exit criteria:
  - At least two distinct inspection interactions succeed from the map.
  - Inspector updates are consistent with the clicked species/track and no dead hit areas are observed in the sampled cases.

### Adjacent actions and recovery paths

- Objective: Probe the non-core actions and nearby navigation for safe behavior, expected affordances, and recovery from any transient state.
- Target pages: index.html
- Key checks:
  - Activate Cite this view and Save view to verify whether they open a dialog, copy action, or other visible confirmation.
  - Open top navigation links Explore, Studies, Submit a track, Methods, and About to determine whether they are inert placeholders, in-page anchors, or route to valid content.
  - If any action changes the page state, confirm there is a way back to the main atlas view without losing browser stability.
  - Check that no console/network errors appear after these actions.
- Exit criteria:
  - Adjacent controls have been sampled and their behavior characterized.
  - Any non-core flow either works safely or is confirmed as placeholder behavior without breakage.

### Mobile viewport regression pass

- Objective: Repeat the most important interactions on mobile viewport to assess tapability, layout stability, and control usability under constrained space.
- Target pages: index.html
- Key checks:
  - Verify the main layout remains usable and the map, filters, and inspector are still accessible on mobile.
  - Repeat one species toggle, one season switch, one month scrub, one play/pause action, and one map inspection on mobile.
  - Specifically check the small tap targets already flagged in prescan, including nav links and species checkboxes, for mis-taps or difficult activation.
  - Confirm the speed selector and month slider remain operable without overlap or clipping.
- Exit criteria:
  - Critical interactions succeed on mobile or are clearly identified as problematic due to tap-target size.
  - At minimum, the core filter-player-inspector loop has been verified in mobile viewport.

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

