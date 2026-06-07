# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The interface presents a credible research-chat layout, but many core actions feel inert or ambiguous in both desktop and mobile testing. The biggest UX risk is broken trust: thread switching, sending follow-ups, source filtering/sorting, and top-level actions like Share/Export often showed no visible result or confirmation. Mobile adds substantial friction through horizontal overflow, undersized tap targets, and a Sources section that appears effectively unreachable beyond its filter row.

## Issues (9)

### [HIGH] thread-switching-appears-nonfunctional-or-unsynced — goal completion
- **Page**: `index.html, left thread rail links`
- **Problem**: Thread switching appears nonfunctional or unsynced: clicking multiple thread titles changed only the hash or did nothing, while the center conversation and right-side Sources stayed on the existing thread.
- **Evidence**: Across chunks steps-01-06, 13-18, 19-24, and 25-30, clicks on threads such as "EV battery recycling policy in Norway," "Comparative grad-school stipends in CS," "Microclimate effects of urban rooftop gardens," and "Building codes vs wildfire defensible space" did not visibly replace the active conversation. Observations repeatedly still showed the heading "Deep work scheduling literature" and "Sources 8." Session memory also notes the left-rail click changed the URL hash but not the visible content.
- **Suggested fix**: Make thread changes immediate and unmistakable: update the conversation title/content, refresh the Sources panel, persist a selected state in the left rail, and show loading or error feedback if switching fails.

### [HIGH] submitting-a-follow-up-gives-no — feedback
- **Page**: `index.html, follow-up composer / Ask button`
- **Problem**: Submitting a follow-up gives no visible sent state, loading feedback, appended user turn, or failure message, making the primary chat action feel broken.
- **Evidence**: Desktop and mobile Ask interactions repeatedly returned no detectable change. In steps-07-12, steps-19-24, and recent step agentic-49-click, clicking "Ask" left the same conversation visible with no new user message, no disabled button, no spinner, and no response. Session memory explicitly notes there is no evidence of an in-progress state after submission attempts.
- **Suggested fix**: After submit, immediately append the user's message, disable or morph the Ask button into a loading state, show progress text such as "Searching sources…", and surface an explicit error banner if no response can be generated.

### [HIGH] on-mobile-the-sources-section-appears — mobile usability
- **Page**: `index.html, mobile Sources section`
- **Problem**: On mobile, the Sources section appears effectively inaccessible: users can reach the Sources heading, sort, and filter chips, but not the actual source cards.
- **Evidence**: In steps-43-48 and the final observation, scrolling to the bottom showed "Sources 8" plus sort/filter controls, but no source entries beneath them; the footer appears immediately below. Dragging horizontally on the visible Sources control did not reveal cards. The mobile page also has horizontal overflow (515px content width on a 390px viewport), and recent screenshots such as /Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-48-drag-mobile.png support the clipped/stacked state.
- **Suggested fix**: Restructure mobile so source cards are reliably rendered below the filter row or opened in a dedicated full-width panel/sheet. Eliminate horizontal overflow and ensure at least one source card is visible immediately after the Sources heading.

### [MEDIUM] source-filters-and-sorting-rely-on — clarity
- **Page**: `index.html, right Sources rail tabs and sort select`
- **Problem**: Source filters and sorting rely on subtle state changes and often do not show an obvious content update, so users cannot tell whether the controls worked.
- **Evidence**: Clicks on "Papers," "Books," "Preprints," "Web," and "All" across steps-01-06, 13-18, 19-24, 31-36, 37-42, and 43-48 usually produced no visible-text or count change; the rail kept showing "Sources 8." Even when a tab looked active, the displayed cards still appeared mixed. Sorting to "Date" changed the dropdown label but the card order still looked inconsistent (years visible as 2021, 2023, 2019, 2022 in chunk 13-18).
- **Suggested fix**: Make filtering/sorting outcomes explicit: animate list reordering, update the source count, show a small status label such as "Showing 2 books," and provide a stronger selected state than a thin underline alone.

### [MEDIUM] prominent-top-level-actions-appear-to — trust
- **Page**: `index.html, header actions`
- **Problem**: Prominent top-level actions appear to do nothing, with no confirmation, modal, download indicator, or failure message.
- **Evidence**: In steps-37-42 on mobile, tapping "Export as PDF" and "Share thread" produced no URL change, no visible-text change, and no dialog (DOM dialogs: 0). In steps-13-18, "Share thread" was also tested on desktop without evidence of feedback. The final mobile screenshot continues to show the same page state after these taps.
- **Suggested fix**: Provide immediate confirmations such as "Link copied," a share sheet/modal, or a visible download/export progress state. If unsupported in the demo, disable the controls or label them as unavailable.

### [MEDIUM] the-citation-to-source-interaction-is — affordance
- **Page**: `index.html, inline citation chips and Sources rail`
- **Problem**: The citation-to-source interaction is not discoverable or perceptible enough; hover and click testing did not show a visible source highlight or jump behavior.
- **Evidence**: In steps-01-06, hovering an inline citation produced no detectable UI change and did not provide evidence that the matching source was highlighted or scrolled into view. In steps-07-12 and 25-30, citation-click testing could not be verified because the target became unavailable/out of view, while the Sources panel itself often fell off-screen during reading. The product README promises hover and click linkage, but the observed behavior did not make that relationship visible.
- **Suggested fix**: Strengthen the interaction with a more obvious source flash/highlight, scroll anchoring that preserves reading context, and a short helper hint like "Tap a citation to view source." On mobile, consider opening the cited source in an overlay instead of relying on distant stacked content.

### [MEDIUM] the-mobile-layout-is-too-wide — mobile usability
- **Page**: `index.html, mobile header/composer/Sources controls`
- **Problem**: The mobile layout is too wide for the viewport and several key controls are below recommended touch sizes, increasing error risk in an already dense interface.
- **Evidence**: Final and recent observations report horizontal overflow of 515px on a 390px viewport. The top mode control is visibly cut off at the right edge in mobile screenshots. Layout warnings flag many controls below 44px tall or wide, including source tabs like "All" (35x35), "Papers" (62x35), "Books" (57x35), the attachment button (32x35), and Ask (60x39).
- **Suggested fix**: Reflow the header and Sources controls into full-width stacked rows on mobile, remove horizontal overflow, and increase tap targets to at least 44px in the source tabs, composer actions, and thread controls.

### [MEDIUM] several-select-controls-lack-labels-or — accessibility
- **Page**: `index.html, mode selects and source sort select`
- **Problem**: Several select controls lack labels or accessible names beyond their visible option text, creating ambiguity for screen-reader users and weakening comprehension even visually.
- **Evidence**: Session memory and final layout warnings report missing labels for form fields, including the top mode select (ux-3), the lower composer mode select (ux-6), and the source sort select (ux-12). The warnings explicitly state these fields have no label, aria-label, or placeholder.
- **Suggested fix**: Add explicit labels or aria-labels such as "Conversation mode" and "Sort sources by," and visually group each control with nearby content so its purpose is obvious.

### [LOW] the-new-thread-action-gives-no — feedback
- **Page**: `index.html, + New thread button`
- **Problem**: The "+ New thread" action gives no visible reset, confirmation, or warning, so users cannot tell whether a blank thread was created or ignored.
- **Evidence**: In steps-07-12 and again in steps-31-36, clicking "+ New thread" produced no visible change; the same "Deep work scheduling literature" conversation remained on screen and the URL stayed at index.html#. Session memory notes the control is reachable but gives no feedback after activation.
- **Suggested fix**: Open a visibly empty composer state, add a new selected item in the thread list, and show a confirmation or unsaved-work warning when leaving an existing conversation.
