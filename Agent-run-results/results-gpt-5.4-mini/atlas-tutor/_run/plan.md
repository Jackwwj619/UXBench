# UXAgent Exploration Plan

## Goal

Thoroughly explore the Atlas Tutor chat experience, with emphasis on the main conversation flow and the settings/privacy-adjacent controls exposed in the header and side rails, while validating recovery paths, practice interactions, and mobile usability.

## Plan Summary

Start from the prefilled chain-rule conversation and validate the core tutoring loop: reading the response, using feedback/share/copy/try-again controls, and sending a follow-up prompt through the composer. Then move into adjacent areas surfaced in the prescan: chat navigation/search, subject/history switching, practice problems with the Solve→Hint/Submit/Correct progression, concepts links, and the header actions (Steps, Practice, overflow). Repeat the most important interactions on a mobile viewport to confirm the small tap-target risks observed in prescan. Since only one HTML page is known, coverage should focus on distinct states and behaviors within index.html rather than page-to-page traversal.

## Coverage Targets

- pages: `visit all known HTML pages; in this fixture that means thoroughly exercising index.html states and controls`
- features: `exercise most visible controls per key area: header tools, assistant message actions, composer controls, suggestion chips, subject/history navigation, search, practice cards, and concepts links`
- mobile: `repeat the core chat send flow, one practice interaction, and one navigation action on a mobile viewport; specifically scrutinize the small tap targets flagged in prescan`

## Planned Phases

### Baseline desktop chat review

- Objective: Validate the default conversation view, reading flow, and main response-action controls from the prefilled chain-rule thread.
- Target pages: index.html
- Key checks:
  - Confirm the current thread title, model metadata, and conversation layout remain stable on load.
  - Exercise assistant response actions: thumbs up, thumbs down, share, copy, and try again.
  - Open Steps, Practice, and the overflow menu to see whether they reveal additional guidance or modes without losing the current thread state.
  - Verify the suggestion chips and composer affordances are visible and usable.
- Exit criteria:
  - All visible response actions have been clicked at least once and their behavior observed.
  - Top header controls have been opened or toggled at least once each.
  - No unexpected layout breakage or console/network errors appear during these interactions.

### Composer and send-flow validation

- Objective: Test the primary input path for asking a follow-up question and any adjacent input affordances.
- Target pages: index.html
- Key checks:
  - Type a realistic follow-up question in the composer and send it using the send button and/or Cmd+Enter.
  - Check that the attach and mic buttons are present and do not interfere with composing or sending.
  - Use at least one suggestion chip to confirm shortcut prompts work as intended.
  - Verify the sent message appears in the conversation and the thread preserves context.
- Exit criteria:
  - A follow-up message is successfully submitted and rendered in the chat.
  - At least one shortcut path into the composer is validated.
  - No input focus or submission issues are observed.

### Practice panel state progression

- Objective: Deeply validate the right-rail practice workflow, including per-problem state changes and difficulty presentation.
- Target pages: index.html
- Key checks:
  - Open several chain-rule practice problems and confirm the difficulty pills match their displayed labels.
  - Use Hint on at least a few cards to confirm hints reveal without resetting the panel.
  - Exercise the Solve→Submit→Correct progression on representative items, including one easy, one medium, and one hard problem.
  - Confirm the progress bar or progress card updates as problems are completed.
- Exit criteria:
  - At least one problem from each difficulty level has been interacted with.
  - At least one card reaches a completed/correct state.
  - Progress feedback changes in a visible and stable way.

### Navigation and adjacent content

- Objective: Check chat discovery, subject filtering, thread switching, and concept links without leaving the single-page fixture.
- Target pages: index.html
- Key checks:
  - Use search chats to filter or locate threads.
  - Switch between at least two threads from Today/Last 7 days/Earlier and confirm the conversation updates correctly.
  - Click one or more subject nav items to see whether the left rail context changes appropriately.
  - Open at least two Concepts links to verify their destination behavior or in-page content switch.
- Exit criteria:
  - Search and thread navigation behavior has been observed.
  - At least one subject filter and one concept link have been exercised.
  - The page continues to preserve a coherent active-thread state after navigation.

### Mobile viewport accessibility check

- Objective: Repeat the most important interactions on mobile to validate the known tap-target risks and cramped layout behavior.
- Target pages: index.html
- Key checks:
  - Re-check header controls, assistant action buttons, and composer controls on a narrow viewport.
  - Confirm whether the small tap targets remain usable without accidental activation.
  - Test one practice card interaction and one thread switch on mobile.
  - Verify the three-column layout degrades into an understandable stacked or compressed mobile layout.
- Exit criteria:
  - Critical chat, practice, and navigation actions are still usable on mobile.
  - Known small-tap-target issues are confirmed or ruled out with direct interaction.
  - Any viewport-specific layout problems are documented with concrete evidence.

## Prescan Summary

### Atlas Tutor — math & CS tutor

- Page: `index.html`
- Headings: Chain rule — when both functions move, Chain rule
- Interactables: `40` buttons, `5` links, `2` inputs
- Notable controls:
  - clickable:a:Atlas Tutor
  - clickable:button:+ New chat
  - typeable:input:Search chats…
  - clickable:button:⚙
  - clickable:button:⌥ Steps
  - clickable:button:▶ Practice
  - clickable:button:⋯
  - clickable:button:👍

