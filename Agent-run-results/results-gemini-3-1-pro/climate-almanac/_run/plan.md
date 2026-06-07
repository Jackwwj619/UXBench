# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full climate-almanac system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will focus on the single-page application `index.html`, starting with core variable selection and layer management to test the 4-variable limit. Next, it will evaluate the data modifiers (Region, Smoothing, Y-Axis) and their effect on the chart. Following that, chart tools (Add Note, Reset Zoom) and top-level actions (Share, Download) will be tested. Finally, the run will validate the mobile experience, paying special attention to layout collapse and reported small tap targets.

## Coverage Targets

- pages: `100% (only index.html exists)`
- features: `Select variables, change modifiers, use chart tools, delete annotations, test exports.`
- mobile: `Ensure the 3-column layout adapts to a mobile screen and controls remain usable.`

## Planned Phases

### Variables & Layers Management

- Objective: Validate variable selection, the maximum of 4 variables constraint, and layer removal.
- Target pages: index.html
- Key checks:
  - Select additional variables to hit the 4-variable limit and observe system feedback
  - Deselect a variable via the left-rail checkbox
  - Remove a selected variable using the '×' button in the LAYERS section
- Exit criteria:
  - Variables can be added/removed, and the 4-variable limit is triggered and handled gracefully.

### Data Modifiers

- Objective: Test the global controls for Region, Smoothing, and Y-Axis.
- Target pages: index.html
- Key checks:
  - Change the 'REGION' dropdown and check for UI updates
  - Change the 'SMOOTHING' dropdown
  - Toggle 'Y-AXIS' between 'Dual axes' and 'Single (z-scored)'
- Exit criteria:
  - All select and radio button modifier controls can be interacted with without errors.

### Chart Tools & Annotations

- Objective: Interact with chart specific functionalities like zoom, notes, and the inspector panel.
- Target pages: index.html
- Key checks:
  - Click '+ Note' to see how new annotations are created
  - Click 'Reset zoom'
  - Click the '×' on an existing annotation in the right panel to delete it
- Exit criteria:
  - Note addition flow is exposed, zoom resets, and annotations can be deleted.

### Top-level Actions & Export

- Objective: Test the utility buttons and header navigation.
- Target pages: index.html
- Key checks:
  - Click 'Share view' and observe outcome (e.g., clipboard copy, modal)
  - Click 'Download .csv'
  - Click one of the secondary nav links (e.g., 'Datasets') to verify behavior
- Exit criteria:
  - Export and share actions are triggered; nav links are verified as placeholders or functional.

### Mobile Viewport Validation

- Objective: Evaluate the responsive layout and accessibility of small tap targets on mobile.
- Target pages: index.html
- Key checks:
  - Verify that the left rail, center chart, and right inspector stack correctly without horizontal scrolling
  - Attempt to tap checkboxes and header links to validate the small tap target warnings
- Exit criteria:
  - Mobile layout is reviewed and tap target usability is assessed.

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

