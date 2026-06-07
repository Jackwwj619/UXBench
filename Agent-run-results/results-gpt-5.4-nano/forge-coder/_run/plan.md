# UXAgent Exploration Plan

## Goal

Evaluate the full Forge Coder (agentic coding IDE) UX starting from the primary agent/run view: file selection, diff visualization, run controls (interrupt/rerun/accept), repository/connect actions, and chat/reply workflow—then validate critical behaviors on mobile.

## Plan Summary

Start on index.html (the only known page) and explore the agent run view’s three-pane layout: switch between modified/added files, inspect unified vs split diff, and use run controls (Interrupt/Rerun). Then exercise the chat input loop (Send, auto-apply toggle) and the change acceptance/editing controls (Open editor, Accept all changes). Finally, repeat the same critical interactions in a mobile viewport focusing on tap target issues, layout stability, and any control accessibility.

## Coverage Targets

- pages: `Visit all known HTML pages (1 total): index.html`
- features: `Exercise: top nav items (Agent/Inbox/Runs/Settings), file tree selection (M and +), diff mode (Unified/Split), run controls (Interrupt/Rerun), chat send flow, Auto-apply toggle, Open editor, and Accept all changes`
- mobile: `Repeat the same critical interactions from file selection + diff mode, run lifecycle, and chat/change acceptance on mobile viewport`

## Planned Phases

### Baseline run view + navigation/tabs

- Objective: Confirm the core layout, basic state visibility, and whether top-level navigation items change content or are purely decorative.
- Target pages: index.html
- Key checks:
  - Verify three-pane layout is present: file tree (left), agent/run/chat (center), diff preview (right).
  - Click each top nav item: Agent, Inbox, Runs, Settings; confirm whether panel content switches, highlights active state, or triggers any modal/overlay.
  - Use the search/expand icons in the file tree (⌕ and +) to validate they respond and do not break the file tree/diff binding.
  - Check that the run status (e.g., agent working/elapsed time) remains consistent when interacting with non-run controls.
- Exit criteria:
  - All four nav items provide a clear state response (active styling and/or content change).
  - File tree remains usable after using ⌕ and +.
  - No layout break (no blank panes, overlapping panes, or missing diff content).

### File tree selection + diff correctness (Unified/Split)

- Objective: Validate that selecting files with status badges (M/+), and switching diff mode, updates the right pane predictably and clearly.
- Target pages: index.html
- Key checks:
  - Click modified files in the left tree (e.g., items labeled M such as src/upload/stream.ts, chunker.ts, retry.ts, index.ts) and verify corresponding diff content in the right pane changes.
  - Click the newly added file(s) marked + (e.g., src/upload/chunker.ts or similar) and verify diff shows addition context (or equivalent).
  - Toggle Unified vs Split (ux-16/ux-17) and verify line/context indicators and file path header update appropriately.
  - Use any scroll within diff preview (ensure pinned file header/path remains readable).
  - Confirm the line diff still matches the selected file after toggling modes and returning to another file.
- Exit criteria:
  - At least 3 different M files and 1 + file are selected and each produces a distinct, correct diff in the right pane.
  - Unified/Split toggling does not desync diff content from the current file selection.

### Run controls: Interrupt and Rerun lifecycle

- Objective: Exercise agent run controls and ensure state transitions are understandable and do not corrupt chat/diff/history.
- Target pages: index.html
- Key checks:
  - Click ⏸ Interrupt during an active run; verify run status changes from working to interrupted/paused and buttons reflect the new state.
  - Click ↻ Rerun and verify the run restarts; observe whether diff/chat updates correspond to the rerun.
  - After rerun/interrupt, re-select a different file in the tree and confirm diff reflects the latest run outputs.
  - Check whether chat input remains enabled/disabled appropriately after interruptions.
- Exit criteria:
  - Interrupt produces a clear, user-visible state change; Rerun returns to a working state without breaking panes.
  - Diff selection remains functional and reflects the current run context after lifecycle actions.

### Chat + change management: Send, Auto-apply, Open editor, Accept all

- Objective: Validate the primary agent interaction loop and how proposed edits/diffs are managed and applied.
- Target pages: index.html
- Key checks:
  - Type a short reply in the textarea (placeholder: “Reply, ask for a change, or request another pass…”) and click Send (ux-13).
  - Toggle Auto-apply edits on/off and send at least one message in each state; verify whether edits are automatically applied or only suggested in the diff.
  - Click Open editor and verify the expected editor action occurs (e.g., opens an in-app view or a simulated editor state) without losing diff selection.
  - Click Accept all changes and verify the diff preview and/or file statuses (M/+ badges) update to reflect acceptance.
- Exit criteria:
  - Send works reliably; chat messages appear and subsequent agent/run output updates are visible.
  - Auto-apply toggle changes behavior in a measurable way (edits applied vs suggested).
  - Accept all changes updates file statuses/diff state in the UI.

### Mobile critical path regression

- Objective: Repeat the most failure-prone interactions on mobile viewport (tap targets, layout flow, and accessibility).
- Target pages: index.html
- Key checks:
  - Repeat Phase 2: click at least 2 M files and toggle Unified/Split; confirm touch interaction works and diff updates.
  - Repeat Phase 3: trigger Interrupt then Rerun once; confirm buttons are tappable and states are clear.
  - Repeat Phase 4: toggle Auto-apply (target is very small), send one message, and hit Accept all changes (primary action); confirm no accidental taps or misfires.
- Exit criteria:
  - All critical controls in mobile are reachable and functional (no persistent UI overlap or missing panes).
  - Auto-apply checkbox remains selectable and Send/Accept operations are not confused with adjacent UI elements.

## Prescan Summary

### Forge Coder — agentic coding

- Page: `index.html`
- Headings: none
- Interactables: `11` buttons, `4` links, `2` inputs
- Notable controls:
  - clickable:a:Agent
  - clickable:a:Inbox
  - clickable:a:Runs
  - clickable:a:Settings
  - clickable:button:Connect a repo
  - clickable:button:Open in VS Code
  - clickable:button:⌕
  - clickable:button:+

