# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full brewlog-mobile system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Brewlog mobile fixture presents a compact, readable log-entry and analytics experience, but several interaction patterns feel under-optimized for phone use. The biggest risks are small touch targets, missing field labels, weak feedback for several controls, and a fixed bottom nav that crowds the save area; one notable strength is that tab switching and saved-state confirmation do work when directly activated. Coverage is fairly broad on the main flow, but some controls and recovery paths remain untested, so the critique emphasizes issues repeatedly observed in the explored screens.

## Issues (9)

### [HIGH] the-primary-completion-action-does-not — feedback
- **Page**: `index.html / Save brew ↗`
- **Problem**: The primary completion action does not give dependable confirmation. In mobile tests, tapping the save area sometimes produced no visible change, and the form could remain looking exactly the same after the tap, which makes it hard to know whether the log was submitted.
- **Evidence**: In the recent mobile trajectory, tapping Save brew produced “no visible text change, button state change, or navigation” (steps-79-79 / agentic-80-click). A previous tap did show a ✓ Saved state (steps-67-72), so feedback appears inconsistent rather than clearly reliable.
- **Suggested fix**: Make the submit state unambiguous and consistent: disable the button while saving, change its label to Saved/Done after success, and/or navigate to a clear success state or Today screen with a confirmation message.

### [HIGH] several-core-controls-are-far-below — mobile usability
- **Page**: `index.html / BREW METHOD, SCORE, TASTING NOTES, Cancel`
- **Problem**: Several core controls are far below mobile tap-target guidance, making the form difficult to use on touch devices. The brew-method radios, tasting-note chips, score buttons, back arrow, and Cancel all appear very small relative to phone interaction norms.
- **Evidence**: Layout warnings flagged the brew-method radio inputs at 13×13 px, the back arrow at 36×36 px, Cancel at 73×30 px, and score buttons at about 32×34 px. The trajectory repeatedly notes these as “below the 44 px mobile guidance.”
- **Suggested fix**: Increase hit areas to at least ~44×44 px, use larger padding around radio/chip/button labels, and space adjacent controls farther apart to reduce accidental taps.

### [HIGH] key-inputs-lack-labels-or-accessible — forms
- **Page**: `index.html / bean select, dose, yield, time`
- **Problem**: Key inputs lack labels or accessible names, which makes the form harder to understand and especially risky on a compact mobile screen where context is already limited.
- **Evidence**: The DOM/observations repeatedly flagged missing labels for the bean select and number inputs; the final observation lists several inputs with empty labels, and the layout warnings include missing_input_label for the select and multiple number fields.
- **Suggested fix**: Add persistent visible labels and accessible names/aria-labels for the bean selector and all numeric fields, and keep labels clearly associated with inputs in the mobile layout.

### [MEDIUM] several-in-form-selection-controls-provide — feedback
- **Page**: `index.html / SCORE, TASTING NOTES`
- **Problem**: Several in-form selection controls provide weak or inconsistent feedback. Some actions show a highlight, but others appear to do nothing visually, leaving users unsure whether the tap registered.
- **Evidence**: The score row sometimes highlighted a selected button (e.g., “5” or “10”), but other taps produced no visible change or confirmation. Tapping tasting-note chips such as caramel and burnt produced no obvious state change in the mobile trajectory.
- **Suggested fix**: Make selection states more obvious and consistent across all choice controls: stronger selected styling, checkmarks, count updates, or brief inline confirmation.

### [MEDIUM] the-fixed-bottom-tab-bar-crowds — mobile usability
- **Page**: `index.html / Save brew ↗, bottom tab bar`
- **Problem**: The fixed bottom tab bar crowds the lower part of the form, and the save area sits very close to it. That creates a cramped completion zone and risks accidental overlap or obscured controls on small screens.
- **Evidence**: The mobile trajectory notes that the bottom tab bar overlaps the lower edge of the form and that the Save brew button is only partially visible above the fixed nav. Scrolling also did not move the page in some states, leaving the lower controls difficult to reach.
- **Suggested fix**: Add bottom padding/safe area space for the form, pin the nav lower only outside form-heavy states, or move the save action higher so it is fully separated from the tab bar.

### [MEDIUM] the-stats-date-range-selector-changes — feedback
- **Page**: `index.html / Stats time-range select`
- **Problem**: The Stats date-range selector changes its visible value, but the charts and metrics do not obviously update. That makes the control feel more decorative than functional.
- **Evidence**: When the time-range dropdown was changed to “Last 30 days,” the observation recorded that the visible metrics and chart did not update and that feedback was “weak or absent.” The select is also missing a label.
- **Suggested fix**: Trigger a clear loading or transition state and visibly update the metrics/charts when the range changes; add a concise label to explain the control’s purpose.

### [MEDIUM] bottom-navigation-is-present-and-labeled — navigation
- **Page**: `index.html / bottom tab bar`
- **Problem**: Bottom navigation is present and labeled, but it is still somewhat cramped for the mobile fixture and was not consistently proven tappable in the earlier steps. Several failed locator clicks suggest the tabs and their affordances may be harder to hit or target reliably than they appear.
- **Evidence**: The bottom bar is labeled Today / Add / Stats / Beans and later did switch views successfully, but earlier attempts to tap Stats failed multiple times with missing locators. The mobile fixture also shows the tabs as compact icon+label controls inside a dense phone frame.
- **Suggested fix**: Enlarge tab hit areas, increase spacing, and ensure active-state changes are very obvious so each section switch is easy to recognize and repeat.

### [LOW] the-beans-search-field-does-not — clarity
- **Page**: `index.html / Beans search`
- **Problem**: The Beans search field does not provide obvious filtering feedback. Typing a query leaves the full list looking largely unchanged, with no visible result count or clear confirmation that the search is active.
- **Evidence**: In the trajectory, typing “Brazil” or “Ethiopia” into the Beans search field produced no obvious visible-text change; the full bean list remained on screen and no count, highlight, or empty state appeared.
- **Suggested fix**: Filter the list visibly as the user types and add a result count or no-results state so search behavior is obvious.

### [LOW] per-bean-actions-like-brew-and — affordance
- **Page**: `index.html / Beans rows, Brew, Reorder`
- **Problem**: Per-bean actions like Brew and Reorder are compact and do not clearly respond when tapped, so their affordance is weaker than the rest of the UI.
- **Evidence**: The Beans section showed readable inventory cards and actions, but tapping Brew produced no visible state change or panel. The Brew target was measured at about 54×23 px, below mobile guidance.
- **Suggested fix**: Enlarge the action buttons and provide immediate visual feedback such as pressed state, toast, or a transition into the brewing flow.
