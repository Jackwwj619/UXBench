# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Lumen Research research-thread interface, validating the main chat workflow, citation/source linking behavior, thread management actions, mode and sort controls, suggested prompts, and mobile usability issues.

## Plan Summary

The run should start with the active research thread on index.html and verify the primary chat experience end-to-end: reading the assistant answer, interacting with inline citations, and checking how the Sources rail responds. Then it should cover adjacent flows available on the page, including switching conversation threads, changing mode and sort settings, using follow-up prompts, attaching content, and trying share/export actions. Because this site is a single HTML page, coverage should focus on state changes, interaction quality, and mobile responsiveness rather than page navigation.

## Coverage Targets

- pages: `Visit all known HTML pages; this site currently exposes only index.html, so coverage should focus on all interactive states within that single page.`
- features: `Exercise the main chat thread, citation hover/click behavior, thread switching, mode changes, sort/filter controls, suggested prompts, follow-up submission, attachment, share, and export controls.`
- mobile: `Repeat the highest-value checks on mobile viewport, prioritizing the left-rail thread items, mode selector, Ask button, and citation/source-link behavior.`

## Planned Phases

### Establish the primary thread flow

- Objective: Validate the baseline research-thread experience from the current conversation state, including readability, answer structure, and source linkage expectations.
- Target pages: index.html
- Key checks:
  - Read the current assistant answer and confirm the numbered inline citations are visible and correspond to the Sources rail.
  - Hover each visible citation chip in the answer and confirm the matching source card is highlighted or brought into view on the right.
  - Click at least one citation chip and confirm it jumps to the correct source entry without breaking the thread layout.
  - Inspect the assistant response for preserved rich text formatting such as numbered lists and emphasized phrases.
- Exit criteria:
  - At least two citation chips have been tested with hover and click behavior.
  - The source rail visibly reacts to citation interaction.
  - The current thread content remains stable and readable after citation actions.

### Exercise thread and conversation controls

- Objective: Validate conversation-level actions and state changes around thread management and mode selection.
- Target pages: index.html
- Key checks:
  - Click + New thread and confirm whether a new blank thread is created, a confirmation appears, or the UI returns to a fresh state.
  - Switch among the visible mode options, especially Balanced, Quick scan, and Deep dive, and observe whether the answer style or available suggestions change.
  - Test the suggested prompt buttons under the composer, especially the one about directly comparing schedules and the one about negative results.
  - Use the textarea to enter a short follow-up and submit with Ask, checking whether the new message appears and whether the mode selector influences the response.
- Exit criteria:
  - Thread creation behavior is understood and any state reset is observed.
  - At least two mode states are exercised.
  - At least one suggested prompt and one manual follow-up submission are tested.

### Validate Sources rail sorting and filtering

- Objective: Check whether the sources panel supports its visible controls and whether source cards remain coherent under different views.
- Target pages: index.html
- Key checks:
  - Change the Sort dropdown from Relevance to Date and Cited in this answer, verifying whether the source list reorders as expected.
  - Use the All tab and any adjacent category tabs visible in the Sources rail to check filtering behavior.
  - Confirm that source titles, metadata, and relevance scores remain aligned after sorting/filtering.
  - Verify that clicking a source card or its citation anchor leads to a stable focus state rather than layout jumps or dead links.
- Exit criteria:
  - Each visible sort option has been exercised at least once.
  - At least one source-filter/tab interaction has been tested.
  - Source list behavior remains consistent across changes.

### Test share, export, and attach utilities

- Objective: Validate the utility actions around collaboration and content import, focusing on visible outcomes and failure handling.
- Target pages: index.html
- Key checks:
  - Click Share thread and observe whether a share dialog, copy state, or browser-native response appears.
  - Click Export as PDF and verify whether a download, print flow, or mock export state is triggered.
  - Use the attach button to see whether file attachment or paste/import affordances open, even if no file is chosen.
  - Check whether these actions preserve the current thread state and do not disrupt the conversation or sources rail.
- Exit criteria:
  - Share and export actions have been triggered and their visible outcomes recorded.
  - Attach control behavior is confirmed.
  - No destructive state loss occurs after utility actions.

### Switch threads and inspect adjacent history items

- Objective: Verify navigation between recent threads and the stability of the left rail history list, including mobile implications.
- Target pages: index.html
- Key checks:
  - Open at least one other thread from Today and one from the older history sections, if available.
  - Confirm that the active thread title and conversation content change appropriately after switching.
  - Return to the original deep work thread and verify that its source rail and citations still behave correctly.
  - Check whether long thread names truncate cleanly and remain recognizable.
- Exit criteria:
  - At least two non-current threads have been opened and one return path has been verified.
  - Thread list truncation and active-state styling have been observed.
  - Original thread state is recoverable after switching.

### Repeat critical checks on mobile viewport

- Objective: Re-run the most important interactions on mobile and confirm touch usability, layout integrity, and the prescanned tap-target risks.
- Target pages: index.html
- Key checks:
  - Verify that the three-column layout adapts without obscuring the conversation or sources.
  - Test the smallest, most important touch targets: + New thread, one left-rail thread item, mode selector, Ask button, and one citation chip.
  - Confirm whether the flagged small tap targets are still usable or whether they feel cramped on mobile.
  - Ensure the composer, source rail, and current answer remain readable without excessive horizontal scrolling.
- Exit criteria:
  - Core interactions have been repeated in a mobile viewport.
  - At least one mobile usability issue or confirmation has been recorded for the flagged tap targets.
  - No critical content becomes inaccessible on mobile.

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

