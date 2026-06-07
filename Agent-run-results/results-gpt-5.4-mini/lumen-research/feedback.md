# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The interface supports a clear research-thread layout, but several core actions feel inert or under-communicated, especially on mobile. Users can see controls like share/export, source filters, suggestion chips, and the composer, yet taps often produce no visible state change, making it hard to tell whether an action worked. The mobile view also introduces horizontal overflow and several undersized controls, which will make the product feel cramped and unreliable on touch devices; a few source/citation behaviors were also not fully verifiable, so the current interaction model still has some trust and clarity gaps.

## Issues (8)

### [HIGH] many-primary-actions-respond-with-no — feedback
- **Page**: `index.html: Share thread / Export as PDF / suggestion chips / source tabs`
- **Problem**: Many primary actions respond with no visible confirmation, so users cannot tell whether the action succeeded or was ignored. This makes the interface feel unreliable even when the underlying state may have changed.
- **Evidence**: Share thread, Export as PDF, the source category tabs, and multiple suggestion chips all showed no visible URL/text/state change after taps. In the mobile observation, tapping "Surface negative results: where mornings didn't help" produced no pressed state or content update, and clicking Share thread / Export as PDF on desktop also produced no obvious feedback.
- **Suggested fix**: Add immediate feedback for every action: pressed states, toast messages, loading indicators, copied/exported confirmations, or visible filter/state changes. If an action is intentionally inert, make that clearer in the design.

### [HIGH] the-mobile-layout-overflows-horizontally-and — mobile usability
- **Page**: `index.html mobile view; composer row and bottom filter row`
- **Problem**: The mobile layout overflows horizontally and several controls are too small or cramped, making the main workflow harder to scan and tap.
- **Evidence**: On mobile, the page width is 515px vs a 390px viewport, indicating horizontal overflow. The observation also flagged many undersized touch targets: the paperclip is 32×35px, Ask is 60×39px, and the bottom filter buttons are as small as 35×35px.
- **Suggested fix**: Reflow the mobile layout into a single-column stack, remove horizontal overflow, and enlarge touch targets to at least 44px high with more spacing between adjacent controls.

### [HIGH] left-rail-thread-items-sometimes-only — goal completion
- **Page**: `index.html left rail thread items`
- **Problem**: Left-rail thread items sometimes only change the hash or highlight selection without clearly swapping the visible conversation, which makes thread switching feel ambiguous or broken.
- **Evidence**: Multiple attempts on thread items changed the URL to `#` but left the visible conversation/title/source rail unchanged. One trajectory note says the active thread stayed on “Deep work scheduling literature” even after clicking another thread; another later step showed a thread switch finally working, which indicates inconsistent or unclear behavior across items.
- **Suggested fix**: Make thread selection produce unmistakable feedback: immediate content swap, strong active-state styling, and perhaps a loading or transition state. Avoid hash-only changes unless they are clearly tied to visible updates.

### [MEDIUM] several-controls-are-visually-present-but — affordance
- **Page**: `index.html: Mode select, source filter selects/tabs`
- **Problem**: Several controls are visually present but poorly signposted: the mode select, source tabs, and some header actions are compact, and at least some selects lack clear labels/affordance cues. That makes it hard to predict what will change.
- **Evidence**: The observation flagged missing input labels for select controls, and the mode selector accepted changes like “Quick scan” without any visible response in the conversation or source rail. The source tabs also showed no selected-state change after taps.
- **Suggested fix**: Add explicit labels, stronger selected states, and short helper text for controls that change answer style or source filtering. If the mode only affects future responses, say that near the control.

### [MEDIUM] the-citation-chips-have-a-promising — feedback
- **Page**: `index.html citation chips and Sources rail`
- **Problem**: The citation chips have a promising interaction model, but the hover/click behavior could not be verified and no source highlighting or scrolling was observed, so the cross-reference affordance is weakly communicated.
- **Evidence**: Hover and click attempts on citation chip ux-0 timed out, and trajectory notes say no source-rail highlight, scroll, or focus change was observed from citation interaction. The answer still showed inline citation chips and the Sources rail was populated, but the linkage was not demonstrable.
- **Suggested fix**: Ensure citation chips are easy to target and provide immediate visible feedback on hover/focus/click, such as highlighting the matching source card and scrolling it into view. Consider adding an accessible label or tooltip describing the action.

### [MEDIUM] suggestion-chips-repeatedly-appear-inert-tapping — feedback
- **Page**: `index.html follow-up suggestion chips`
- **Problem**: Suggestion chips repeatedly appear inert: tapping them does not visibly populate the composer, submit a follow-up, or show a pressed state.
- **Evidence**: On mobile, tapping suggestion chips like “Surface negative results: where mornings didn't help” produced no visible change. Earlier attempts on other suggestion chips also produced no composer fill, state change, or URL/text update.
- **Suggested fix**: Make suggestion-chip behavior explicit: either fill the composer with the suggested text, send it immediately, or visibly explain what happens on tap. Add pressed and loading states so the user can confirm the action.

### [MEDIUM] dense-text-and-small-interactive-elements — accessibility
- **Page**: `index.html left rail, header actions, bottom filter row`
- **Problem**: Dense text and small interactive elements create a high-effort reading/tapping experience, especially in the sidebar and compact action rows.
- **Evidence**: Desktop observations noted thread labels truncating with ellipses, and mobile observations flagged small controls such as 35×35, 32×35, 60×39, and 57×35px. The top action bar and bottom filter row are especially compact.
- **Suggested fix**: Increase line-height and spacing, reduce truncation where possible, and give text controls more room. Use larger, clearly separated buttons for the most important actions.

### [LOW] the-source-category-tabs-are-present — clarity
- **Page**: `index.html source tabs`
- **Problem**: The source category tabs are present but their state is hard to read because taps do not visibly change the rail, and the tab row is visually low-emphasis.
- **Evidence**: Clicking Papers and All showed no visible filter change or reordering. The trajectory specifically noted that the Sources rail affordance is visually present but weakly signaled, and the mobile tabs are very small.
- **Suggested fix**: Add a stronger active tab state and a short label or header that confirms the current filter. If filtering is intentional but subtle, animate the rail or show a count change.
