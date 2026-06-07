# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the Atlas Tutor chat + practice experience with emphasis on the primary settings/privacy flow and adjacent recovery/feedback paths, on both desktop and mobile viewports.

## Plan Summary

Start from index.html’s existing chat state and validate core interactions: subject navigation, chat history/search, head-tools (Steps/Practice/more), composer send flows, and inline feedback/share/copy controls. Then exercise the right-rail practice problem panel including Hint/Solve/Submit/Correct transitions and progress updates. Finally, validate settings/privacy entry points via the ⚙ control, confirming any dialogs/pages, state persistence, and mobile usability.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html).`
- features: `Exercise most visible controls per key page: subject clicks, chat thread switching, search, ⌥ Steps/▶ Practice/⋯ head tools, composer (textarea, Cmd+Enter, attach, mic, send), message tools (👍/👎/Share/Copy/Try again), and practice panel (Hint + Solve→Submit→Correct across multiple problems).`
- mobile: `Repeat critical checks on mobile: ⚙ settings/privacy opening/closing, composer send, practice lifecycle completion, and feedback/copy/share touch responsiveness.`

## Planned Phases

### Baseline & navigation sanity (left rail + head tools)

- Objective: Confirm the primary structure works: subject navigation, chat history grouping, and the sticky head/tools don’t break scrolling or state.
- Target pages: index.html
- Key checks:
  - Click a Subject in the left rail (e.g., Mathematics / Programming / Physics / Statistics / Linear algebra) and verify the conversation/practice context changes or filters as expected
  - Use Search chats… input to filter existing history; verify results update without losing chat state
  - Use sticky head-tools: ⌥ Steps, ▶ Practice, and ⋯; verify each changes the UI (steps mode, practice focus, or menu) and returns cleanly
  - Click a left-rail chat thread under Today / Last 7 days / Earlier and verify the conversation content updates to the selected thread
- Exit criteria:
  - At least one subject click, one history thread switch, and one search action are completed with visible state changes
  - All three head-tools (⌥ Steps / ▶ Practice / ⋯) are validated for correct toggling and non-breaking layout

### Chat interaction & recovery (composer + response tools)

- Objective: Validate message sending, composer controls, and response tool affordances including failure recovery (Try again).
- Target pages: index.html
- Key checks:
  - Send a short message using Cmd+Enter and verify a new assistant reply appears in the conversation viewport
  - Test suggestion chips (e.g., the visible suggestions row) by clicking at least one and ensuring it pre-fills or sends as designed
  - Validate composer controls: click attach 📎 and ensure any file input/modal opens (or confirm graceful no-op); click mic 🎤 and ensure permission/state handling is reasonable
  - After receiving a reply, use 👍 and 👎 on the assistant message and confirm any visual/recorded state change
  - Use Share ⤴ and Copy 📋 on the assistant message; verify expected share/copy behavior (or clear messaging if unsupported)
  - Use ↻ Try again and confirm it triggers a new attempt/reply rather than doing nothing
- Exit criteria:
  - At least one successful message send (Cmd+Enter) and one recovery action (↻ Try again) are completed with visible conversation updates
  - Composer attach and mic interactions are validated for either successful behavior or clear, non-breaking failure handling

### Practice problems flow + progress correctness

- Objective: Exercise the right-rail practice panel: hinting, 3-state problem lifecycle (Solve→Submit→Correct), and ensure progress bar updates in sync with completed problems.
- Target pages: index.html
- Key checks:
  - For multiple problems, click Hint and verify the hint reveals/retracts appropriately (and does not break Solve/Sumbit states)
  - For at least one problem per difficulty tier visible (EASY/Medium/Hard), run the full lifecycle: Solve → Submit → Correct (or equivalent), verifying buttons and status labels change per state
  - If incorrect submission is supported, submit an incorrect answer once and verify the UI provides feedback and allows retry
  - After completing practice items, verify Your progress card’s progress bar increases and stays consistent when switching problems or chat threads
- Exit criteria:
  - At least 3 practice problems completed across the panel with clear state transitions
  - Progress bar reflects completed items without regression during navigation within the page

### Settings/privacy flow via ⚙ + state persistence

- Objective: Validate the primary settings/privacy entry point and confirm it behaves correctly (open/close, navigation, persistence, and accessibility), then re-check key flows after returning.
- Target pages: index.html
- Key checks:
  - Click ⚙ and verify a settings/privacy interface opens (dialog/panel/page section) with expected options or at minimum clear privacy-related controls
  - Test closing behavior (close button and Escape if applicable) and verify focus returns to the chat
  - If settings include toggles/checkboxes, change at least one and refresh/reload (or navigate threads) to confirm persistence if intended
  - Re-run a critical chat action after closing (send a message or toggle ▶ Practice) to ensure no UI is stuck in the wrong mode
- Exit criteria:
  - ⚙ settings/privacy UI is opened and closed successfully with no broken layout or trapped focus
  - At least one setting interaction is completed and its effect/persistence is validated

### Mobile viewport critical path checks

- Objective: Repeat the most risk-prone interactions on mobile: tapping small controls, composer send, practice lifecycle, and settings/privacy access.
- Target pages: index.html
- Key checks:
  - Verify three-column layout collapses acceptably (rails become usable) and critical controls remain reachable
  - Tap ⚙ (small target) reliably; confirm settings/privacy opens and closes properly
  - Use composer: click into textarea and send a message; verify keyboard interactions and send button affordance on mobile
  - Complete at least one practice problem through Solve→Submit→Correct on mobile and confirm progress update
  - Tap 👍/👎 and Copy/Share once to ensure touch targets respond
- Exit criteria:
  - No blocking issues on mobile for settings/privacy, message sending, and at least one practice lifecycle
  - Touch interactions register (no accidental taps; no unresponsive controls)

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

