# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full climate-almanac system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Climate Almanac’s primary data visualization flow has several usability issues: small tap targets for checkboxes/radio buttons (mobile friction), inconsistent 'Smoothing' dropdown behavior, lack of error feedback for exceeding the 4-variable limit, and unresponsive hover interactions. Key untested areas include some dataset links and the 'Dual axes' radio button.

## Issues (7)

### [MEDIUM] variable-checkboxes-e-g-surface-temperature — mobile usability
- **Page**: `index.html: checkboxes (e.g., ux-3, ux-4)`
- **Problem**: Variable checkboxes (e.g., 'Surface temperature anomaly', 'Precipitation') have small 13x13px tap targets, below mobile accessibility guidelines (44x44px minimum).
- **Evidence**: Layout warnings in mobile viewport flag checkboxes as 13x13px, and testing confirmed they’re hard to tap accurately.
- **Suggested fix**: Increase checkbox size to at least 44x44px or add touch targets around them.

### [MEDIUM] the-smoothing-dropdown-frequently-fails-to — forms
- **Page**: `index.html: Smoothing dropdown (ux-10)`
- **Problem**: The 'Smoothing' dropdown frequently fails to select the intended option (e.g., '10-year running mean' selects '3-year running mean' or 'No smoothing' instead).
- **Evidence**: Multiple attempts to select '10-year running mean' resulted in incorrect selections, with the chart title reflecting the wrong setting.
- **Suggested fix**: Fix option mapping in the dropdown to ensure selections match user intent, and add visual feedback (e.g., updated chart title) on selection.

### [MEDIUM] no-error-feedback-when-exceeding-the — feedback
- **Page**: `index.html: VARIABLES section`
- **Problem**: No error feedback when exceeding the 'up to four variables' limit (e.g., six variables selected without warning).
- **Evidence**: Testing showed variables could be selected beyond the stated limit, with no UI/chart errors or warnings.
- **Suggested fix**: Add error feedback (e.g., disabled checkboxes, warning message) when the 4-variable limit is reached.

### [MEDIUM] hover-interactions-with-the-chart-area — affordance
- **Page**: `index.html: chart-area (data-uxagent-id=chart-area)`
- **Problem**: Hover interactions with the chart area frequently time out or fail, preventing tooltip/inspector updates.
- **Evidence**: Multiple hover attempts on the chart-area failed with timeouts, leaving the inspector empty.
- **Suggested fix**: Fix chart interactivity to ensure hover triggers tooltip and inspector updates reliably.

### [LOW] y-axis-radio-buttons-e-g — mobile usability
- **Page**: `index.html: radio buttons (e.g., ux-11, ux-12)`
- **Problem**: Y-axis radio buttons (e.g., 'Single (z-scored)') have small 13x13px tap targets, below mobile accessibility guidelines.
- **Evidence**: Layout warnings in mobile viewport flag radio buttons as 13x13px, and testing confirmed difficulty in selection.
- **Suggested fix**: Increase radio button size or add touch targets around them.

### [LOW] the-download-csv-button-provides-no — feedback
- **Page**: `index.html: Download .csv button (ux-2)`
- **Problem**: The 'Download .csv' button provides no visible feedback (e.g., download dialog, confirmation) when clicked.
- **Evidence**: Clicking the button resulted in no URL change, download dialog, or error message.
- **Suggested fix**: Add feedback (e.g., 'Downloading...' message, download dialog) to confirm action status.

### [MEDIUM] the-region-dropdown-sometimes-fails-to — forms
- **Page**: `index.html: Region dropdown (ux-9)`
- **Problem**: The 'Region' dropdown sometimes fails to update the chart immediately (e.g., changing to 'Northern Hemisphere' with no visible chart update).
- **Evidence**: Testing showed dropdown state changed, but chart updates were delayed or inconsistent.
- **Suggested fix**: Ensure the chart updates immediately when the region is changed, with visual feedback (e.g., updated title).
