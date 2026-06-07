# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full climate-almanac system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Climate Almanac provides a robust multi-variable charting experience on desktop, but suffers from significant UX and accessibility flaws, particularly on mobile. Critical issues include an unenforced 4-variable limit that contradicts UI copy, broken interactive controls (dropdowns, annotation button, and dead navigation links), and severe mobile usability barriers due to tiny tap targets and unresponsive select elements. Untested areas include the 'NSIDC Sea Ice Index' source link and the 'Surface temperature anomaly' checkbox on desktop.

## Issues (8)

### [HIGH] the-ui-explicitly-states-add-up — clarity
- **Page**: `index.html: VARIABLES section`
- **Problem**: The UI explicitly states 'Add up to four variables to overlay', but the limit is completely unenforced. Users can select 5 or 6 variables without any warning or error, contradicting the stated constraint and potentially cluttering the chart.
- **Evidence**: Session memory notes: 'Attempting to select a 5th variable (Arctic sea-ice extent) when 4 are already active successfully added it to the LAYERS list, violating the stated Add up to four variables constraint' and 'the UI successfully allowed toggling a 6th variable (ENSO ONI)'.
- **Suggested fix**: Enforce the 4-variable limit by disabling unselected checkboxes when 4 are active, and display a clear tooltip or inline message explaining why further selections are disabled.

### [HIGH] the-region-and-smoothing-dropdowns-are — mobile usability
- **Page**: `index.html: ux-9 (Region select), ux-10 (Smoothing select)`
- **Problem**: The Region and Smoothing dropdowns are broken on the mobile viewport. Selecting an option either reverts to a default or selects the wrong item entirely, making these core configuration controls unusable on touch devices.
- **Evidence**: Trajectory chunk steps-37-42 shows: 'Selecting Arctic (60°N–90°N) from the Region dropdown failed; the tool feedback indicates it selected Global instead' and 'Region dropdown failed to update to Southern Hemisphere; tool feedback indicates it selected Northern Hemisphere instead'.
- **Suggested fix**: Debug the select element event handling on mobile/touch events to ensure the selected value correctly updates the application state and chart data.

### [HIGH] interactive-controls-for-checkboxes-radio-buttons — mobile usability
- **Page**: `index.html: ux-3 to ux-8 (checkboxes), ux-11/ux-12 (radios), ux-55 (× button)`
- **Problem**: Interactive controls for checkboxes, radio buttons, and layer removal ('×') have critically small tap targets (13x13px and 20x17px), far below the 44px minimum mobile guidance.
- **Evidence**: Layout warnings consistently flag these elements: 'Variable checkboxes in the left rail have critically small tap targets (13x13px)' and 'Layer removal button (×) is only 20x17px'.
- **Suggested fix**: Increase the padding around native inputs to expand the tap area to at least 44x44px, or replace them with custom styled controls that meet mobile touch guidelines.

### [MEDIUM] clicking-the-note-button-produces-no — feedback
- **Page**: `index.html: ux-20 (+ Note button)`
- **Problem**: Clicking the '+ Note' button produces no visible change, modal, or inline input form on either desktop or mobile, failing to provide any user feedback or path to complete the action.
- **Evidence**: Trajectory chunk steps-07-12 and steps-43-48 confirm: 'Clicking the + Note button produced no visible change, no modal, and no inline input form' on both desktop and mobile viewports.
- **Suggested fix**: Either implement the annotation flow (e.g., open a modal or inline text field) or disable/hide the button if the feature is not yet available, providing a tooltip explaining its future state.

### [MEDIUM] navigation-links-stories-methods-and-source — navigation
- **Page**: `index.html: Nav links (Stories, Methods), SOURCES section links`
- **Problem**: Navigation links ('Stories', 'Methods') and source links ('Berkeley Earth', 'NOAA', 'CMIP6', 'NSIDC') are dead-ends (href='#') that provide no content, modal, or visual feedback when clicked.
- **Evidence**: Trajectory chunks steps-19-24 note: 'Clicking the Stories navigation link resulted in no visible change... confirming it is a dead-end' and 'Source links in the left rail appear to be non-functional placeholders'.
- **Suggested fix**: Remove placeholder links or provide a visual indicator (e.g., 'Coming soon' tooltip) if the content is not yet available. For source links, ensure they point to the actual external references.

### [MEDIUM] the-region-and-smoothing-select-elements — accessibility
- **Page**: `index.html: ux-9, ux-10`
- **Problem**: The Region and Smoothing select elements lack associated label elements, aria-labels, or placeholders, failing accessibility standards.
- **Evidence**: Layout warnings flag: 'A form field has no label, aria-label, or placeholder' for both ux-9 and ux-10.
- **Suggested fix**: Add visible <label> elements associated with the select elements, or at minimum, add aria-label attributes to describe their purpose.

### [LOW] the-reset-zoom-button-lacks-a — feedback
- **Page**: `index.html: ux-19 (Reset zoom button)`
- **Problem**: The 'Reset zoom' button lacks a disabled state or feedback when the chart is already at its default zoom level, leaving users uncertain if their click registered.
- **Evidence**: Trajectory chunk steps-13-18 states: 'Clicking Reset zoom when the chart is already at its default range produces no visible change or textual feedback'.
- **Suggested fix**: Visually disable the 'Reset zoom' button when no zoom is applied, or display a brief toast message indicating the view is already at the default range.

### [LOW] selecting-10-year-running-mean-from — clarity
- **Page**: `index.html: ux-10 (Smoothing select)`
- **Problem**: Selecting '10-year running mean' from the Smoothing dropdown fails to update the chart subtitle and reverts to 'No smoothing', indicating a state management or reactivity bug.
- **Evidence**: Trajectory chunk steps-07-12 notes: 'Selecting 10-year running mean from the Smoothing dropdown failed to update the chart subtitle, which still displays 3-year running mean' and 'the selection reverted to No smoothing'.
- **Suggested fix**: Debug the event handler and state update logic for the Smoothing dropdown to ensure all options correctly update the chart data and subtitle.
