# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Lumen Research chat interface, validating the core research-thread workflow, citation-to-sources behavior, thread switching, composing/follow-up actions, and responsive usability on both desktop and mobile.

## Plan Summary

The run should center on index.html because the prescan only revealed one HTML page and a rich single-page research assistant interface. Start by validating the default thread and the three-column desktop experience, then exercise adjacent in-page flows: switching threads, changing modes/sorts/tabs, using follow-up prompts and composer controls, and testing export/share/new-thread actions for visible outcomes or failure states. Finish by repeating the most important reading and input tasks on mobile, where the left-rail tap targets already show risk.

## Coverage Targets

- pages: `Visit the only known HTML page (index.html) and cover its major in-page states by switching several threads and source views.`
- features: `Exercise nearly all visible controls on index.html: thread links, New thread, citation chips, source tabs, sort selector, top and composer mode selectors, suggested prompts, textarea, attachment, Ask, Share thread, and Export as PDF.`
- mobile: `Repeat the critical reading and follow-up workflow on mobile, including thread access, citation/source linkage, and message composition/submission.`

## Planned Phases

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

## Prescan Summary

### Lumen Research — research assistant

- Page: `index.html`
- Headings: Deep work scheduling literature, Sources 8
- Interactables: `14` buttons, `10` links, `4` inputs
- Notable controls:
  - clickable:button:+ New thread
  - clickable:a:Deep work scheduling literature
  - clickable:a:EV battery recycling policy in Norway
  - clickable:a:Trace prevalence of seal influenza H10N7
  - clickable:a:Comparative grad-school stipends in CS
  - clickable:a:Microclimate effects of urban rooftop gardens
  - clickable:a:Late-Holocene shoreline shifts, NW Europe
  - clickable:a:Why does ringing happen in step responses

