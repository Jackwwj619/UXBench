# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full migration-atlas system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Migration Atlas provides a functional data visualization flow with responsive filtering and timeline controls, but suffers from significant accessibility and feedback gaps. Critical issues include undersized touch targets for mobile users (13x13px checkboxes), missing system feedback for 'Save' and 'Cite' actions, and state synchronization failures in the 'Study Year' filter. Additionally, core drill-down interactions on the map frequently fail due to unresponsive SVG elements.

## Issues (5)

### [HIGH] interactive-checkboxes-for-species-filters-and — mobile usability
- **Page**: `final_observation: layout_warnings (ux-4 through ux-14)`
- **Problem**: Interactive checkboxes for species filters and display toggles are significantly smaller than recommended mobile touch targets (13x13px vs 44x44px).
- **Evidence**: Layout warnings in steps-37-42 and final_observation identify multiple inputs (e.g., ux-4 'Western osprey', ux-12 'Show trail') with dimensions of 13x13px. While the agent managed to click them, this represents high friction and error risk for human users.
- **Suggested fix**: Increase the clickable area of all checkboxes and toggles to at least 44x44px, using CSS padding or pseudo-elements if the visual checkbox size must remain small.

### [HIGH] clicking-save-view-and-cite-this — feedback
- **Page**: `steps-13-18: ux_signals regarding 'Cite this view'; steps-37-42: ux_signals regarding 'Save view'`
- **Problem**: Clicking 'Save view' and 'Cite this view' buttons produces no visible user feedback (no modal, toast, or download).
- **Evidence**: In steps-13-18 and steps-37-42, the agent clicked these buttons (ux-1, ux-2) but observed no UI change, modal appearance, or clipboard confirmation. The action appeared to do nothing.
- **Suggested fix**: Implement immediate feedback such as a toast notification ('View saved'), a modal dialog for citation details, or a file download trigger.

### [HIGH] clicking-on-map-labels-e-g — error recovery
- **Page**: `session_memory: notable_failures (Locator.click timeouts)`
- **Problem**: Clicking on map labels (e.g., 'CAR-52', 'MON-90') and trails frequently fails to trigger the 'Individual' inspector panel.
- **Evidence**: Multiple failures recorded in steps-01-06, steps-13-18, and steps-19-24 (e.g., 'Click failed for ux-map-label-car47'). The inspector panel often remains in the default 'Click a trail...' state despite visible map elements.
- **Suggested fix**: Debug SVG event handling and z-index issues. Ensure hit areas for trails and labels are sufficiently large and that click events properly propagate to update the inspector state.

### [MEDIUM] the-study-year-dropdown-updates-locally — clarity
- **Page**: `steps-07-12: ux_signals ('main dashboard header still displays... 2025 season')`
- **Problem**: The 'Study Year' dropdown updates locally but fails to synchronize with the main application header and map data.
- **Evidence**: In steps-07-12 and steps-19-24, the agent selected '2024 season' in the filter rail, but the main header remained 'Migration Atlas — 2025 season' and map stats did not update accordingly.
- **Suggested fix**: Ensure the global application state (header title, map layers, aggregate stats) updates immediately and visibly when the 'Study Year' filter is changed.

### [MEDIUM] the-study-year-select-dropdown-lacks — accessibility
- **Page**: `final_observation: layout_warnings (ux-11)`
- **Problem**: The 'Study Year' select dropdown lacks an associated accessible label.
- **Evidence**: Final observation layout warning identifies ux-11 (the year selector) as having 'no label, aria-label, or placeholder'.
- **Suggested fix**: Add a visible <label> element linked to the select input, or add an aria-label attribute describing the control (e.g., 'Select Study Year').
