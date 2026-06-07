# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Lumen Research interface demonstrates a strong core conversational flow with effective citation integration, but suffers from significant usability regressions on mobile devices. Critical issues include horizontal layout overflow, sub-standard touch targets for primary actions, and broken navigation links in the thread history. Additionally, several interactive controls lack necessary accessibility labels, creating barriers for screen reader users.

## Issues (6)

### [HIGH] the-interface-exhibits-horizontal-overflow-515px — mobile usability
- **Page**: `index.html (Mobile Viewport)`
- **Problem**: The interface exhibits horizontal overflow (515px content width vs 390px viewport), causing layout breakage and potential clipping of interactive elements like citation chips and source filters.
- **Evidence**: Layout warnings in steps 67-79 confirm 'Page width 515px exceeds viewport 390px'. Screenshots show the three-column desktop layout failing to collapse gracefully, pushing content off-screen or requiring horizontal scrolling.
- **Suggested fix**: Implement a responsive layout that stacks or hides sidebars (Sources/History) on mobile viewports. Ensure the main conversation column fits within the viewport width (max-width: 100%) to prevent horizontal overflow.

### [HIGH] critical-form-controls-including-the-mode — accessibility
- **Page**: `index.html: ux-3, ux-6, ux-12`
- **Problem**: Critical form controls, including the 'Mode' selector, 'Sort' dropdown, and the main chat input textarea, lack visible labels or aria-labels.
- **Evidence**: DOM summary and layout warnings in steps 73-80 flag 'missing_input_label' for ux-3 (Mode), ux-6 (Input area context), and ux-12 (Sort).
- **Suggested fix**: Add explicit <label> elements or aria-label attributes to all select inputs and the main textarea. For example, label the Mode selector as 'Research Depth Mode' and the Sort selector as 'Sort Sources By'.

### [MEDIUM] multiple-interactive-elements-have-tap-targets — mobile usability
- **Page**: `index.html: ux-4, ux-7, ux-13, ux-14`
- **Problem**: Multiple interactive elements have tap targets smaller than the recommended 44x44px minimum, leading to potential mis-taps and frustration.
- **Evidence**: Layout warnings identify small targets for the 'Ask' button (60x39px), 'Attach' icon (32x35px), and filter chips like 'All' (35x35px) and 'Papers' (62x35px) in steps 67-80.
- **Suggested fix**: Increase the padding or hit-area of all buttons and filter chips to meet the 44x44px minimum guideline. Use CSS `min-height` and `min-width` to enforce this without altering visual design significantly.

### [MEDIUM] clicking-on-existing-thread-titles-in — navigation
- **Page**: `index.html: Left Rail Thread Links`
- **Problem**: Clicking on existing thread titles in the left rail (e.g., 'EV battery recycling...') fails to update the main conversation view or sources panel.
- **Evidence**: Steps 19-24 report that clicking thread links ux-3 and ux-4 resulted in no state change; the center panel remained stuck on the 'Deep work scheduling literature' thread despite the URL hash updating.
- **Suggested fix**: Debug the event handlers for thread list items. Ensure that clicking a thread triggers a state update that loads the corresponding conversation history and sources into the main view.

### [MEDIUM] the-mode-selector-appears-interactive-but — affordance
- **Page**: `index.html: ux-14`
- **Problem**: The 'Mode' selector appears interactive but fails to open a dropdown or provide feedback when clicked, leaving its function unclear.
- **Evidence**: Steps 01-06 note that clicking ux-14 ('Mode: Balanced') produced no visible state change or dropdown menu, suggesting a broken JavaScript event or non-interactive styling.
- **Suggested fix**: Ensure the click event listener is correctly attached to the Mode selector. If it is not yet functional, disable the visual affordance (remove the chevron or hover state) until the feature is ready.

### [LOW] changing-the-sort-order-e-g — feedback
- **Page**: `index.html: Right Rail Sources Panel`
- **Problem**: Changing the sort order (e.g., to 'Date') or applying filters provides limited visual confirmation, as the source list does not visibly reorder or animate in the current viewport.
- **Evidence**: Step 77 reflection notes that while the dropdown label updated to 'Sort: Date', the list below did not visibly change, making it hard to confirm the action succeeded without scrolling.
- **Suggested fix**: Add a subtle animation or highlight to the source list when it reorders or filters. Ensure the top of the sorted list is visible or auto-scrolls into view after the action.
