# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Lumen Research chatbot interface has several UX issues. Thread switching often fails to update the conversation and sources rails. Citation chip interactions (hover/click) frequently time out, hindering source navigation. The 'Export as PDF' button and '+ New thread' button lack visible feedback. Mobile viewports have horizontal overflow and small tap targets, reducing usability. Many follow-up buttons and filters remain untested, limiting confidence in full functionality.

## Issues (7)

### [HIGH] clicking-on-different-threads-in-the — goal completion
- **Page**: `index.html (left rail thread links)`
- **Problem**: Clicking on different threads in the left rail (e.g., 'EV battery recycling policy in Norway', 'Trace prevalence of seal influenza H10N7') does not update the center conversation or right sources rails, leaving the UI unchanged.
- **Evidence**: Multiple thread click actions (e.g., steps 6, 8, 9) resulted in no visible UI updates. The center column still showed 'Deep work scheduling literature' content after clicking other threads.
- **Suggested fix**: Fix the thread switching logic to ensure the center and right rails update dynamically when a thread is selected. Add loading indicators or visual feedback during thread transitions.

### [HIGH] hover-and-click-actions-on-citation — goal completion
- **Page**: `index.html (citation chips like [1], [2])`
- **Problem**: Hover and click actions on citation chips (e.g., [1], [2]) frequently time out, failing to highlight or navigate to the corresponding source in the right rail.
- **Evidence**: Hover (steps 1, 7) and click (steps 2, 3, 7) actions on citation chips resulted in timeouts. The locator for 'data-uxagent-id="1"' could not be found within the timeout period, despite the chip being visible.
- **Suggested fix**: Improve the element identification and interactability of citation chips. Ensure hover highlights and click navigation to sources work reliably. Add error handling for failed interactions.

### [MEDIUM] clicking-the-export-as-pdf-button — feedback
- **Page**: `index.html (Export as PDF button)`
- **Problem**: Clicking the 'Export as PDF' button does not trigger a download prompt, confirmation message, or any visible UI change.
- **Evidence**: Step 5: Clicking 'Export as PDF' (target_id: ux-13) resulted in no URL change, download prompt, or visible feedback. The page remained unchanged.
- **Suggested fix**: Add visible feedback (e.g., a download prompt, confirmation message, or loading indicator) when the 'Export as PDF' button is clicked. Ensure the export functionality works as intended.

### [MEDIUM] the-mobile-viewport-has-horizontal-overflow — mobile usability
- **Page**: `index.html (mobile viewport)`
- **Problem**: The mobile viewport has horizontal overflow (page width 515px > viewport 390px) and small tap targets (e.g., '📎' button 32x35px, 'Ask' button 60x39px) below mobile accessibility guidelines (44px minimum).
- **Evidence**: Layout warnings in mobile viewports (e.g., step 31, final observation) show horizontal overflow and small tap targets. The '📎' button (32x35px) and 'Ask' button (60x39px) are below 44px height/width recommendations.
- **Suggested fix**: Optimize the mobile layout to eliminate horizontal overflow. Increase the size of tap targets (e.g., buttons, citation chips) to at least 44x44px for better mobile interaction.

### [MEDIUM] clicking-the-new-thread-button-does — feedback
- **Page**: `index.html (+ New thread button)`
- **Problem**: Clicking the '+ New thread' button does not create a new thread or update the UI (e.g., no new thread in the left rail, conversation area unchanged).
- **Evidence**: Step 31: Clicking '+ New thread' resulted in no visible UI updates. The left rail still showed the existing threads, and the conversation area remained the same.
- **Suggested fix**: Fix the 'New thread' functionality to create a new thread and update the UI. Add visual feedback (e.g., a new thread in the left rail, empty conversation area) when the button is clicked.

### [MEDIUM] many-follow-up-buttons-e-g — goal completion
- **Page**: `index.html (follow-up buttons like 'Find papers since 2020...')`
- **Problem**: Many follow-up buttons (e.g., 'Find papers since 2020...', 'Power analysis...') do not trigger visible responses or updates, leaving the UI unchanged.
- **Evidence**: Steps 19, 20, 21: Clicking follow-up buttons like 'Find papers since 2020 directly comparing the two schedules' and 'Power analysis for 24 engineers × 2 weeks' resulted in no visible text or URL changes.
- **Suggested fix**: Ensure follow-up buttons trigger the chatbot to generate responses or update the conversation. Add loading indicators or feedback to show the action is processing.

### [LOW] multiple-form-fields-e-g-mode — accessibility
- **Page**: `index.html (mode dropdown, sources filter dropdown)`
- **Problem**: Multiple form fields (e.g., mode dropdown, sources filter dropdown) lack visible labels, aria-labels, or placeholders, reducing accessibility for screen reader users.
- **Evidence**: Layout warnings (e.g., step 31) identify form fields (target_ids: ux-3, ux-6) with no labels. The mode dropdown and sources filter dropdown have no visible labels.
- **Suggested fix**: Add visible labels, aria-labels, or placeholders to all form fields (e.g., dropdowns, input fields) to improve accessibility.
