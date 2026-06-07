# UXAgent Exploration Plan

## Goal

Exercise the primary climate explorer workflow end-to-end: build and compare multi-variable overlays, inspect hover-driven details and annotations, validate the key controls for region/smoothing/y-axis/layers, and check mobile usability of the most important interactions.

## Plan Summary

The run should begin on the single known page, establish the baseline explorer state, and verify the core visualization loop: selecting variables, changing display modes, hovering the chart, and using reset/note/share/download controls. From there, broaden into adjacent states by testing different region and smoothing combinations, layer reordering/removal, and any chart/inspector updates they trigger. Because the site appears to be a one-page local demo, the plan should focus on depth and state coverage rather than page navigation, with a separate mobile pass to validate tap-target and layout issues already hinted by the prescan.

## Coverage Targets

- pages: `Visit the only known HTML page, index.html, and fully explore its state space.`
- features: `Exercise the main visualization workflow, all visible variable controls, both y-axis modes, all region and smoothing options, hover inspection, annotations, reset zoom, note creation, share, and CSV download.`
- mobile: `Repeat the core workflow on a mobile viewport, with special attention to the small nav links, compact checkboxes, and action buttons flagged by the prescan.`

## Planned Phases

### Baseline explorer and control inventory

- Objective: Confirm the starting state, identify which variables and display modes are active by default, and verify the page-level structure of the explorer.
- Target pages: index.html
- Key checks:
  - Record the default overlay set, region, smoothing, and y-axis mode.
  - Verify the left rail variable list, center chart, right inspector, and annotations panel are all present and readable.
  - Check whether the top nav items behave as navigation, anchors, or inert placeholders.
  - Inspect whether the default chart legend, axis labels, and summary text accurately reflect the chosen variables and transforms.
- Exit criteria:
  - Default state is documented with no missing major UI regions.
  - Top nav behavior is understood.
  - Baseline chart/inspector/annotation relationships are confirmed.

### Primary variable-selection workflow

- Objective: Exercise the core data exploration path by adding/removing variables and confirming the four-overlay limit and layer presentation behavior.
- Target pages: index.html
- Key checks:
  - Toggle each visible variable at least once, prioritizing the six listed climate variables.
  - Attempt to build a multi-variable overlay up to the stated limit of four variables.
  - Observe whether new series are added with distinct colors and whether legend/labels update correctly.
  - Remove a variable and confirm the chart, layer list, and any inspector context update cleanly.
  - Check whether the layer stack shows the expected draggable/reorder affordance and whether any remove affordance is discoverable.
- Exit criteria:
  - At least one 2-variable and one near-limit overlay state have been tested.
  - Add/remove behavior is understood.
  - Layer presentation responds consistently to variable toggles.

### Transform controls and interpretation states

- Objective: Validate that region, smoothing, and y-axis controls meaningfully alter the visualization without breaking the inspector or chart semantics.
- Target pages: index.html
- Key checks:
  - Change region across the available options, especially Global, hemispheric, Tropics, and Arctic views.
  - Switch smoothing between raw, 3-year, 10-year, and 30-year settings and watch for title/subtitle and line-shape changes.
  - Toggle between Dual axes and Single (z-scored) and verify axis labeling/scaling changes are coherent.
  - Confirm that the selected transform is reflected in the chart subtitle or accompanying description.
  - Look for any state reset, clipping, or label overlap after transform changes.
- Exit criteria:
  - Each transform control has been exercised at least once.
  - Chart labeling and scaling remain understandable after changes.
  - No obvious state desynchronization between controls and visualization is observed.

### Chart interaction, notes, and utility actions

- Objective: Test the interactive analysis loop: hover inspection, annotation visibility, reset behavior, and utility actions like note sharing/export.
- Target pages: index.html
- Key checks:
  - Hover multiple years on the chart and verify tooltip values, inspector text, and any highlighted points stay in sync.
  - Confirm that the pinned note markers and annotation cards correspond to meaningful positions on the chart.
  - Use Reset zoom and verify the visible domain returns to the full chart extent.
  - Trigger + Note and determine whether it creates a note, opens an editor, or otherwise changes state.
  - Trigger Share view and Download .csv, checking for feedback, generated output, or errors.
- Exit criteria:
  - Hover-driven inspector behavior is verified.
  - Reset zoom returns the chart to a known baseline.
  - Share/download/note controls have been observed in their real behavior.

### Mobile viewport validation

- Objective: Repeat the most critical explorer interactions on a mobile viewport and assess whether the known tap-target and layout risks hinder task completion.
- Target pages: index.html
- Key checks:
  - Confirm that the page remains usable in a narrow viewport without critical overlap or truncation.
  - Try the most important controls on mobile: variable checkboxes, region/smoothing selects, y-axis radios, Reset zoom, and Download/Share buttons.
  - Check whether the chart remains inspectable by touch and whether hover-style insight is replaced by a workable mobile interaction.
  - Assess whether the left rail, chart, and inspector reflow in a way that preserves the primary workflow.
  - Note any missed tap targets, accidental activations, or controls that become too small to use comfortably.
- Exit criteria:
  - Critical controls have been tested on mobile.
  - Any mobile-specific breakpoints or usability failures are documented.
  - The run has enough evidence to judge whether the explorer is practically usable on touch devices.

## Prescan Summary

### Climate Almanac — multi-variable explorer

- Page: `index.html`
- Headings: VARIABLES, REGION, SMOOTHING, Y-AXIS, LAYERS
DRAG TO REORDER, SOURCES, Surface temperature anomaly & Atmospheric CO₂, Inspector, Annotations
- Interactables: `9` buttons, `9` links, `10` inputs
- Notable controls:
  - clickable:a:Explorer
  - clickable:a:Datasets
  - clickable:a:Stories
  - clickable:a:Methods
  - clickable:a:About
  - clickable:button:Share view
  - clickable:button:Download .csv
  - clickable:input:Surface temperature anomaly

