# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full brewlog-mobile system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Brewlog’s mobile shell is generally easy to orient within: bottom-tab switching between Today, Add, Stats, and Beans stayed consistent, and major screens loaded cleanly without mixed content. The biggest UX weakness is interaction friction inside the Add and Beans flows, where many key controls are undersized for touch, some fields lack clear labels, and several actions either produce weak feedback or appear nonfunctional. The Stats view is visually readable, but its range filter is both inaccessible and hard to trust because changing it does not clearly update the data.

## Issues (8)

### [HIGH] many-of-the-core-controls-in — mobile usability
- **Page**: `index.html Add form; screenshot /Users/timchef/UXBench/results-gpt-5.4/brewlog-mobile/_run/screenshots/agentic-66-click-mobile.png`
- **Problem**: Many of the core controls in the brew-logging flow are too small for comfortable mobile tapping, especially the brew method radios, score chips, and top navigation actions.
- **Evidence**: In the mobile Add form, layout warnings flagged the back arrow at 36x36, Cancel at 73x30, brew-method radios at 13x13, and score chips around 32x34. The final mobile observation (agentic-66-click-mobile.png) shows these controls as primary inputs in the main logging flow.
- **Suggested fix**: Make the full visual cards/chips tappable at 44x44 minimum, not just the tiny underlying radio/checkbox hit areas. Increase the back/cancel target heights and spacing so the top bar is easier to use one-handed.

### [HIGH] several-form-controls-rely-on-nearby — accessibility
- **Page**: `index.html Add form fields ux-22, ux-23, ux-24, ux-25`
- **Problem**: Several form controls rely on nearby visual text instead of proper field labels, including the bean selector and numeric inputs.
- **Evidence**: Session observations repeatedly flagged a missing label on the bean select and at least one unlabeled number input. In the final observation, layout warnings show missing_input_label for the BEAN select and number fields at x=18,y=323 and x=31,y=435 / x=151,y=435 / x=33,y=514.
- **Suggested fix**: Attach explicit labels to each field (Bean, Dose, Yield, Time minutes/seconds, etc.) and ensure they are programmatically associated, not just visually implied by section headers.

### [MEDIUM] changing-the-stats-period-control-shows — feedback
- **Page**: `index.html Stats range select`
- **Problem**: Changing the Stats period control shows a different selection in the dropdown, but the surrounding analytics do not visibly update, so it is unclear whether the filter actually worked.
- **Evidence**: After selecting 'Last 30 days' on both desktop and mobile, the control visibly changed, but observations note no obvious visible-text change and the same metrics remained shown (for example 17 brews, 8.1 avg score, 258 g coffee used, $28.40 est. cost).
- **Suggested fix**: Update chart/totals clearly when the range changes, or show a loading/refresh state and stronger visual confirmation that the data was recalculated for the selected period.

### [MEDIUM] the-stats-time-range-selector-has — accessibility
- **Page**: `index.html Stats header filter`
- **Problem**: The Stats time-range selector has no accessible label and appears partially clipped near the top of the viewport in at least one observation.
- **Evidence**: Important UX signals note a missing_input_label warning on the Stats select and report its bbox at y=-10, indicating it was partially off-screen/clipped. This issue was observed across desktop/mobile exploration of the Stats screen.
- **Suggested fix**: Give the selector a persistent label such as 'Period' or 'Date range' and add enough top spacing so the control is fully visible and comfortably tappable.

### [HIGH] the-beans-search-does-not-provide — feedback
- **Page**: `index.html Beans search field`
- **Problem**: The Beans search does not provide understandable results feedback: typing a real or nonsense query leaves the list looking unchanged, and clearing the field also gives no visible reset cue.
- **Evidence**: Typing 'Ethiopia' and later 'zzzz' left all five bean cards visible with no no-results message. Clearing the search on mobile also produced no detectable change; the same entries and tip card remained visible in agentic-64-type_text-mobile.png.
- **Suggested fix**: Make filtering immediate and obvious, or add explicit states such as '5 beans', 'No matches for zzzz', and a clear reset behavior when the query is cleared.

### [HIGH] some-prominent-beans-actions-appear-dead — affordance
- **Page**: `index.html Beans screen actions '+ New' and 'Brew'`
- **Problem**: Some prominent Beans actions appear dead or silent, especially '+ New' and 'Brew', which undermines confidence in the screen’s main calls to action.
- **Evidence**: Clicking '+ New' produced no visible change: same URL, same bean list, and no dialog. Clicking a bean-card 'Brew' button also produced no visible response, with tool_result.changed=false and the Beans screen remaining visible.
- **Suggested fix**: Ensure these actions open clear destinations or at minimum provide immediate feedback. If not implemented, de-emphasize or hide them rather than presenting them as fully available actions.

### [MEDIUM] the-cancel-action-on-the-add — error recovery
- **Page**: `index.html Add screen header; target ux-7 / ux-15`
- **Problem**: The Cancel action on the Add screen is hard to rely on because it was not consistently visible/clickable during testing, even though the back arrow did work.
- **Evidence**: A recorded failure shows clicking Cancel timed out because the element was not visible, despite the Add screen exposing a top bar with '←', title, and 'Cancel'. Separately, the back arrow successfully returned to Today.
- **Suggested fix**: Keep Cancel persistently visible within the form header and ensure it remains reachable after scrolling. Consider making Back and Cancel behavior clearer and more redundant for recovery.

### [MEDIUM] secondary-but-important-buttons-on-today — mobile usability
- **Page**: `index.html Today and Beans action buttons`
- **Problem**: Secondary but important buttons on Today and Beans are also undersized, including '+ Log', '+ New', 'Brew', and 'Reorder'.
- **Evidence**: Observed tap-target sizes include Today '+ Log' at 64x32, Beans '+ New' at 68x32, 'Brew' at 54x23, and 'Reorder' at 72x25. These were repeatedly flagged in layout warnings across desktop/mobile exploration and visible in the Beans and Today screenshots.
- **Suggested fix**: Increase button height to at least 44px and give actions more padding. If space is tight, reduce the number of side-by-side controls or move lower-priority actions into menus.
