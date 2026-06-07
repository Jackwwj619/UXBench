# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Lumen Research interface presents a promising three-column layout for research threads, but the local demo suffers from severe interactivity and responsiveness issues. Core navigation, mode switching, and action buttons (Share, Export, New Thread) are completely non-functional, providing zero feedback to users. Furthermore, the mobile experience is critically broken by a 515px horizontal overflow that ignores the 390px viewport, alongside pervasive small tap targets and missing form labels that hinder accessibility and touch usability.

## Issues (7)

### [HIGH] clicking-thread-links-in-the-left — goal completion
- **Page**: `index.html left rail thread links (ux-2 through ux-10)`
- **Problem**: Clicking thread links in the left rail does not update the conversation or sources panel, completely blocking the user from accessing other threads.
- **Evidence**: Clicking thread links like 'EV battery recycling policy in Norway' and 'Late-Holocene shoreline shifts, NW Europe' produced no visible change or URL update. The conversation remained stuck on 'Deep work scheduling literature'. Links use href='#' without triggering JS state changes.
- **Suggested fix**: Implement client-side routing or JS event handlers to swap the active thread state when a left-rail link is clicked, and provide an active/selected visual state for the current thread.

### [HIGH] the-three-column-desktop-layout-does — mobile usability
- **Page**: `index.html responsive layout / CSS media queries`
- **Problem**: The three-column desktop layout does not reflow for mobile, causing a 125px horizontal overflow that forces horizontal scrolling and breaks the layout.
- **Evidence**: Layout warnings consistently flag 'Page width 515px exceeds viewport 390px' during mobile viewport testing. Left rail elements retain desktop dimensions (215px wide).
- **Suggested fix**: Implement a responsive layout that collapses the left and right rails into off-canvas menus or tabs on narrow viewports, ensuring the page fits within the viewport width.

### [HIGH] critical-interactive-elements-ask-button-suggested — feedback
- **Page**: `index.html buttons: ux-1, ux-2, ux-7, ux-8, ux-9, ux-15`
- **Problem**: Critical interactive elements (Ask button, suggested follow-ups, Share, Export, New Thread, attachment) produce no visual feedback, loading states, or functional response when clicked.
- **Evidence**: Clicking 'Ask' with an empty field fails silently. Clicking 'Share thread', 'Export as PDF', '+ New thread', '📎', and suggested follow-up buttons (e.g., 'Power analysis...') all result in 'No obvious URL or visible-text change'.
- **Suggested fix**: Wire up event handlers to provide immediate feedback (e.g., loading spinners, toast notifications, disabled states) and implement the underlying logic for core actions like submitting queries and sharing.

### [MEDIUM] changing-the-mode-selector-or-sort — feedback
- **Page**: `index.html select elements: ux-3, ux-6, ux-12`
- **Problem**: Changing the Mode selector or Sort dropdown produces no visible change to the UI or content, failing to communicate the effect of the selection.
- **Evidence**: Selecting 'Deep dive' in the Mode selector and 'Date' in the Sort dropdown both resulted in no visible UI or text changes, indicating unimplemented functionality.
- **Suggested fix**: Connect these controls to their respective filtering and logic functions, and provide clear visual feedback when an option is selected (e.g., active state, content update).

### [MEDIUM] multiple-form-controls-lack-associated-labels — accessibility
- **Page**: `index.html select elements: ux-3, ux-6, ux-12`
- **Problem**: Multiple form controls lack associated labels, aria-labels, or placeholders, making them unintelligible to assistive technologies.
- **Evidence**: Layout warnings flag missing input labels for the Mode select (ux-3), secondary Mode select (ux-6), and Sort select (ux-12).
- **Suggested fix**: Add explicit <label> elements or aria-label attributes to all select elements (e.g., aria-label='Research Mode', aria-label='Sort Sources').

### [MEDIUM] numerous-interactive-elements-have-tap-targets — mobile usability
- **Page**: `index.html mobile layout buttons: ux-4, ux-7, ux-9, ux-11, ux-13, ux-14, ux-15, ux-16`
- **Problem**: Numerous interactive elements have tap targets smaller than the 44x44px mobile guidance, making them difficult to activate accurately.
- **Evidence**: Layout warnings identify small tap targets for the 📎 button (32x35px), Ask button (60x39px), suggestion chips (e.g., 283x35px), and source filter buttons (e.g., All 35x35px, Papers 62x35px).
- **Suggested fix**: Increase the padding and minimum height of all interactive elements to at least 44x44px, ensuring adequate spacing between adjacent touch targets.

### [LOW] source-filter-buttons-all-papers-books — feedback
- **Page**: `index.html source filter buttons: ux-13, ux-14, ux-15, ux-16, ux-17`
- **Problem**: Source filter buttons ('All', 'Papers', 'Books', etc.) lack an active/selected visual state, making it impossible to know which filter is currently applied.
- **Evidence**: Clicking the 'Papers' and 'All' source filter buttons resulted in no visible change or active state feedback.
- **Suggested fix**: Implement distinct visual styles for active vs. inactive filter buttons (e.g., background color change, bold text) and wire them to the filtering logic.
