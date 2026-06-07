# UXAgent Report

## Target

- Site: `lumen-research`
- Page type: `chatbot/agent interface`
- Target: `file:///Users/timchef/UXBench/websites/lumen-research/index.html`
- Run directory: `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run`

## Explored User Goal

Autonomously explore and critique the UX of the full lumen-research system, prioritizing the primary chatbot/agent interface flow plus adjacent pages, states, and recovery paths.

## Exploration Summary

The interface presents a credible research-chat layout, but many core actions feel inert or ambiguous in both desktop and mobile testing. The biggest UX risk is broken trust: thread switching, sending follow-ups, source filtering/sorting, and top-level actions like Share/Export often showed no visible result or confirmation. Mobile adds substantial friction through horizontal overflow, undersized tap targets, and a Sources section that appears effectively unreachable beyond its filter row.

## Execution Plan

The run should center on index.html because the prescan only revealed one HTML page and a rich single-page research assistant interface. Start by validating the default thread and the three-column desktop experience, then exercise adjacent in-page flows: switching threads, changing modes/sorts/tabs, using follow-up prompts and composer controls, and testing export/share/new-thread actions for visible outcomes or failure states. Finish by repeating the most important reading and input tasks on mobile, where the left-rail tap targets already show risk.

### Baseline desktop thread comprehension

- Objective: Establish how the default desktop thread is structured and whether the three primary regions support the main read-and-evaluate workflow clearly.
- Target pages: index.html
- Key checks:
  - Confirm the selected thread in the left rail matches the center conversation title ('Deep work scheduling literature').
  - Read through the active conversation and verify long-form content, lists, and any embedded table/list styling render cleanly.
  - Inspect the Sources panel count ('Sources 8') against visible source cards and note whether cards appear complete, scannable, and tied to the answer.
  - Check whether primary controls at the top of the conversation (Share thread, Export as PDF, mode selector) remain understandable and reachable without confusion.
- Exit criteria:
  - A clear baseline understanding of the default thread, visible sources, and top-level controls is documented.
  - Any obvious content/layout mismatches across left rail, conversation, and sources are identified.

### Citation and sources linkage validation

- Objective: Deeply validate the most distinctive interaction in the prescan: inline citations connected to source cards.
- Target pages: index.html
- Key checks:
  - Hover over multiple citation chips in the assistant response and verify the matching source card highlights in the right rail.
  - Confirm hover behavior also scrolls the corresponding source into view when needed, without disorienting jumps.
  - Click citation chips and verify jump/scroll lands on the correct source card, not just the panel generally.
  - Test more than one citation-to-source pair to ensure numbering consistency across the answer.
  - Assess whether returning to reading after a citation jump is easy or whether context is lost.
- Exit criteria:
  - At least 3-4 citation chips have been tested for correct source mapping and visible feedback.
  - The runner has evidence on whether citation hover and click behaviors are accurate, helpful, and stable.

### Thread switching and adjacent reading states

- Objective: Verify that alternate research threads and source browsing controls create coherent in-page state changes without breaking context.
- Target pages: index.html
- Key checks:
  - Open several different left-rail thread entries from different sections (Today, Last 7 Days, Earlier) and confirm the center title/content and right-rail sources update together.
  - Check whether the active thread state is visually clear after switching.
  - Use the Sources tabs (All, Papers, Books, Web, Preprints) and verify the visible source list changes appropriately and remains understandable.
  - Change the source sort control (Relevance/Date/Cited in this answer if available) and verify ordering changes are reflected in visible cards.
  - Return to the original thread and confirm state recovery is intuitive.
- Exit criteria:
  - Multiple thread switches have been exercised with evidence of whether state updates correctly.
  - At least two source tabs and at least one alternate sort option have been tested.

### Composer, follow-up prompts, and action controls

- Objective: Exercise the main input workflow plus high-value adjacent actions, including visible recovery or placeholder states.
- Target pages: index.html
- Key checks:
  - Use one or more suggested follow-up buttons (for example, 'Find papers since 2020 directly comparing the two schedules') and observe whether they populate/send a prompt and generate a meaningful thread update.
  - Type a custom follow-up into the textarea and submit with Ask; verify message placement, response rendering, and any loading/disabled states.
  - Compare behavior of the lower composer mode selector (Balanced/Quick scan/Deep dive) with the top mode selector and note whether both affect output consistently or create ambiguity.
  - Click the attachment button and record whether a file picker, placeholder, or no-op occurs.
  - Test Share thread and Export as PDF for visible outcomes, downloads, dialogs, or silent failures.
  - Try New thread and observe whether it resets the interface, starts a blank conversation, or risks losing prior context without warning.
- Exit criteria:
  - At least one suggested prompt and one manual prompt submission have been attempted.
  - Each high-value action control (attachment, Share thread, Export as PDF, New thread) has documented behavior, even if that behavior is a placeholder or no-op.

### Mobile critical-path and responsiveness checks

- Objective: Repeat the most important tasks on a mobile viewport and specifically probe likely navigation and tap-target issues.
- Target pages: index.html
- Key checks:
  - Verify how the three-column layout collapses on mobile and whether thread history, conversation, and sources all remain reachable.
  - Re-test left-rail/thread navigation or any mobile equivalent, focusing on the known small tap targets.
  - Open a thread, read the answer, and test at least one citation-to-source interaction on mobile.
  - Use the composer to enter and submit a follow-up on mobile, checking keyboard overlap, visibility of the Ask button, and control crowding.
  - Check usability of top actions and selectors on mobile, especially the unlabeled/ambiguous mode controls and source filters.
- Exit criteria:
  - The primary mobile flow from opening a thread to reading sources to asking a follow-up has been exercised.
  - Any mobile-specific layout, access, or tap-size issues are captured with concrete evidence.

## Exploration Coverage

- Status: `near_complete`
- Confidence: `high`
- Page coverage: `100%`
- Feature coverage: `82%`
- Action success rate: `94%`
- Viewports exercised: `desktop, mobile`

Coverage gaps:
- 3 browser action(s) failed and should be retried or analyzed.
- 73% of actions produced no visible URL/text change; this may indicate dead controls or repeated probes.

Visible but not directly exercised:
- `index.html`: Caffeine half-life in slow metabolizers
- `index.html`: Late-Holocene shoreline shifts, NW Europe
- `index.html`: Survey: open-source funding models 2024
- `index.html`: Trace prevalence of seal influenza H10N7
- `index.html`: Why does ringing happen in step responses

## Top UX Feedback

1. **[HIGH] Thread switching appears nonfunctional or unsynced: clicking multiple thread titles changed only the hash or did nothing, while the center conversation and right-side Sources stayed on the existing thread.** (goal completion)
2. **[HIGH] Submitting a follow-up gives no visible sent state, loading feedback, appended user turn, or failure message, making the primary chat action feel broken.** (feedback)
3. **[HIGH] On mobile, the Sources section appears effectively inaccessible: users can reach the Sources heading, sort, and filter chips, but not the actual source cards.** (mobile usability)
4. **[MEDIUM] Source filters and sorting rely on subtle state changes and often do not show an obvious content update, so users cannot tell whether the controls worked.** (clarity)
5. **[MEDIUM] Prominent top-level actions appear to do nothing, with no confirmation, modal, download indicator, or failure message.** (trust)

## High Severity Findings

### Thread switching appears nonfunctional or unsynced: clicking multiple thread titles changed only the hash or did nothing, while the center conversation and right-side Sources stayed on the existing thread.

- UX area: `goal completion`
- User goal: Switch to another research thread and continue work in the correct conversation.
- Evidence: Across chunks steps-01-06, 13-18, 19-24, and 25-30, clicks on threads such as "EV battery recycling policy in Norway," "Comparative grad-school stipends in CS," "Microclimate effects of urban rooftop gardens," and "Building codes vs wildfire defensible space" did not visibly replace the active conversation. Observations repeatedly still showed the heading "Deep work scheduling literature" and "Sources 8." Session memory also notes the left-rail click changed the URL hash but not the visible content.
- Why it matters: Thread history is a core navigation model for a research assistant. If clicking a thread does not clearly open it, users cannot trust saved work, compare topics, or recover previous sessions.
- Suggested change: Make thread changes immediate and unmistakable: update the conversation title/content, refresh the Sources panel, persist a selected state in the left rail, and show loading or error feedback if switching fails.
- Source hint: `index.html, left thread rail links`

### Submitting a follow-up gives no visible sent state, loading feedback, appended user turn, or failure message, making the primary chat action feel broken.

- UX area: `feedback`
- User goal: Ask a follow-up question and receive a response.
- Evidence: Desktop and mobile Ask interactions repeatedly returned no detectable change. In steps-07-12, steps-19-24, and recent step agentic-49-click, clicking "Ask" left the same conversation visible with no new user message, no disabled button, no spinner, and no response. Session memory explicitly notes there is no evidence of an in-progress state after submission attempts.
- Why it matters: The main purpose of this product is conversational research help. If send feels like a no-op, users cannot complete the primary task and will lose confidence quickly.
- Suggested change: After submit, immediately append the user's message, disable or morph the Ask button into a loading state, show progress text such as "Searching sources…", and surface an explicit error banner if no response can be generated.
- Source hint: `index.html, follow-up composer / Ask button`

### On mobile, the Sources section appears effectively inaccessible: users can reach the Sources heading, sort, and filter chips, but not the actual source cards.

- UX area: `mobile usability`
- User goal: Review the sources behind the answer on a phone.
- Evidence: In steps-43-48 and the final observation, scrolling to the bottom showed "Sources 8" plus sort/filter controls, but no source entries beneath them; the footer appears immediately below. Dragging horizontally on the visible Sources control did not reveal cards. The mobile page also has horizontal overflow (515px content width on a 390px viewport), and recent screenshots such as /Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-48-drag-mobile.png support the clipped/stacked state.
- Why it matters: Evidence review is central to trust in a research tool. If mobile users cannot actually inspect sources, the product loses one of its strongest promised benefits.
- Suggested change: Restructure mobile so source cards are reliably rendered below the filter row or opened in a dedicated full-width panel/sheet. Eliminate horizontal overflow and ensure at least one source card is visible immediately after the Sources heading.
- Source hint: `index.html, mobile Sources section`

## Medium Severity Findings

### Source filters and sorting rely on subtle state changes and often do not show an obvious content update, so users cannot tell whether the controls worked.

- UX area: `clarity`
- User goal: Filter or sort sources to inspect a specific evidence type.
- Evidence: Clicks on "Papers," "Books," "Preprints," "Web," and "All" across steps-01-06, 13-18, 19-24, 31-36, 37-42, and 43-48 usually produced no visible-text or count change; the rail kept showing "Sources 8." Even when a tab looked active, the displayed cards still appeared mixed. Sorting to "Date" changed the dropdown label but the card order still looked inconsistent (years visible as 2021, 2023, 2019, 2022 in chunk 13-18).
- Why it matters: When a control changes state without an understandable result, users question both the quality of the source set and the reliability of the interface.
- Suggested change: Make filtering/sorting outcomes explicit: animate list reordering, update the source count, show a small status label such as "Showing 2 books," and provide a stronger selected state than a thin underline alone.
- Source hint: `index.html, right Sources rail tabs and sort select`

### Prominent top-level actions appear to do nothing, with no confirmation, modal, download indicator, or failure message.

- UX area: `trust`
- User goal: Use secondary actions like Share thread or Export as PDF with confidence.
- Evidence: In steps-37-42 on mobile, tapping "Export as PDF" and "Share thread" produced no URL change, no visible-text change, and no dialog (DOM dialogs: 0). In steps-13-18, "Share thread" was also tested on desktop without evidence of feedback. The final mobile screenshot continues to show the same page state after these taps.
- Why it matters: Silent failure on high-importance actions damages trust disproportionately because these controls imply polished, dependable workflow support.
- Suggested change: Provide immediate confirmations such as "Link copied," a share sheet/modal, or a visible download/export progress state. If unsupported in the demo, disable the controls or label them as unavailable.
- Source hint: `index.html, header actions`

### The citation-to-source interaction is not discoverable or perceptible enough; hover and click testing did not show a visible source highlight or jump behavior.

- UX area: `affordance`
- User goal: Use citation chips to connect claims in the answer to specific sources.
- Evidence: In steps-01-06, hovering an inline citation produced no detectable UI change and did not provide evidence that the matching source was highlighted or scrolled into view. In steps-07-12 and 25-30, citation-click testing could not be verified because the target became unavailable/out of view, while the Sources panel itself often fell off-screen during reading. The product README promises hover and click linkage, but the observed behavior did not make that relationship visible.
- Why it matters: Citations are the bridge between answer quality and evidence trust. If users cannot easily see what a citation does, the scholarly affordance is weakened.
- Suggested change: Strengthen the interaction with a more obvious source flash/highlight, scroll anchoring that preserves reading context, and a short helper hint like "Tap a citation to view source." On mobile, consider opening the cited source in an overlay instead of relying on distant stacked content.
- Source hint: `index.html, inline citation chips and Sources rail`

### The mobile layout is too wide for the viewport and several key controls are below recommended touch sizes, increasing error risk in an already dense interface.

- UX area: `mobile usability`
- User goal: Navigate and interact comfortably on a phone.
- Evidence: Final and recent observations report horizontal overflow of 515px on a 390px viewport. The top mode control is visibly cut off at the right edge in mobile screenshots. Layout warnings flag many controls below 44px tall or wide, including source tabs like "All" (35x35), "Papers" (62x35), "Books" (57x35), the attachment button (32x35), and Ask (60x39).
- Why it matters: Overflow and undersized targets make the interface feel cramped and fragile, especially for repeated source filtering and follow-up actions.
- Suggested change: Reflow the header and Sources controls into full-width stacked rows on mobile, remove horizontal overflow, and increase tap targets to at least 44px in the source tabs, composer actions, and thread controls.
- Source hint: `index.html, mobile header/composer/Sources controls`

### Several select controls lack labels or accessible names beyond their visible option text, creating ambiguity for screen-reader users and weakening comprehension even visually.

- UX area: `accessibility`
- User goal: Understand and use form controls with assistive tech or clear labels.
- Evidence: Session memory and final layout warnings report missing labels for form fields, including the top mode select (ux-3), the lower composer mode select (ux-6), and the source sort select (ux-12). The warnings explicitly state these fields have no label, aria-label, or placeholder.
- Why it matters: Unlabeled controls make the interface harder to understand, especially when there are duplicate mode selectors and a sort dropdown whose effect is already subtle.
- Suggested change: Add explicit labels or aria-labels such as "Conversation mode" and "Sort sources by," and visually group each control with nearby content so its purpose is obvious.
- Source hint: `index.html, mode selects and source sort select`

## Low Severity Findings

### The "+ New thread" action gives no visible reset, confirmation, or warning, so users cannot tell whether a blank thread was created or ignored.

- UX area: `feedback`
- User goal: Start a fresh research session without carrying over prior context.
- Evidence: In steps-07-12 and again in steps-31-36, clicking "+ New thread" produced no visible change; the same "Deep work scheduling literature" conversation remained on screen and the URL stayed at index.html#. Session memory notes the control is reachable but gives no feedback after activation.
- Why it matters: A new-thread action is a common recovery path when users want a clean slate. Silent behavior risks accidental context carryover and confusion about whether prior content still affects answers.
- Suggested change: Open a visibly empty composer state, add a new selected item in the thread list, and show a confirmation or unsaved-work warning when leaving an existing conversation.
- Source hint: `index.html, + New thread button`

## Screenshots and Evidence

- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/initial-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/initial-responsive-screenshots-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/initial-responsive-screenshots-mobile.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/initial-after-responsive-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/post-plan-reset-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-01-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-02-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-03-hover-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-04-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-05-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-06-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-07-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-08-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-09-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-10-scroll-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-11-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-12-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-13-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-14-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lumen-research/_run/screenshots/agentic-15-select_option-desktop.png`

## Suggested Fix Priorities

1. Make thread changes immediate and unmistakable: update the conversation title/content, refresh the Sources panel, persist a selected state in the left rail, and show loading or error feedback if switching fails.
2. After submit, immediately append the user's message, disable or morph the Ask button into a loading state, show progress text such as "Searching sources…", and surface an explicit error banner if no response can be generated.
3. Restructure mobile so source cards are reliably rendered below the filter row or opened in a dedicated full-width panel/sheet. Eliminate horizontal overflow and ensure at least one source card is visible immediately after the Sources heading.
4. Make filtering/sorting outcomes explicit: animate list reordering, update the source count, show a small status label such as "Showing 2 books," and provide a stronger selected state than a thin underline alone.
5. Provide immediate confirmations such as "Link copied," a share sheet/modal, or a visible download/export progress state. If unsupported in the demo, disable the controls or label them as unavailable.
6. Strengthen the interaction with a more obvious source flash/highlight, scroll anchoring that preserves reading context, and a short helper hint like "Tap a citation to view source." On mobile, consider opening the cited source in an overlay instead of relying on distant stacked content.
7. Reflow the header and Sources controls into full-width stacked rows on mobile, remove horizontal overflow, and increase tap targets to at least 44px in the source tabs, composer actions, and thread controls.
8. Add explicit labels or aria-labels such as "Conversation mode" and "Sort sources by," and visually group each control with nearby content so its purpose is obvious.

## Claude Remediation

_Claude Code fix pass was not requested for this run._

## Trace Summary

- Trace entries: `48`
- Full trace: `trace.json`
- Structured report: `report.json`
