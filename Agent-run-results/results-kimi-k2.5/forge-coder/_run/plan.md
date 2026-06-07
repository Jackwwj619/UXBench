# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the forge-coder agentic coding interface, focusing on the primary chatbot interaction flow, file tree navigation, and adjacent states/controls.

## Plan Summary

The run will start on index.html, first validating the chatbot interaction flow (typing, sending, and observing agent responses). Then, it will explore file tree navigation (clicking M/+ files, folder expansion), top navigation (Agent/Inbox/Runs/Settings), and key controls (Interrupt, Rerun, Accept changes). Finally, it will check mobile viewport layout and small tap targets.

## Coverage Targets

- pages: `Visit index.html (only known page)`
- features: `Exercise chatbot, file tree, top navigation, key buttons (Interrupt, Rerun, Send, etc.)`
- mobile: `Repeat critical checks (chat, file tree, top navigation) in mobile viewport`

## Planned Phases

### Chatbot Interaction Flow

- Objective: Validate the chatbot input, send, and response handling.
- Target pages: index.html
- Key checks:
  - Type text into the chat input (textarea)
  - Click 'Send' button and observe agent response
  - Check if 'Auto-apply edits' checkbox works (state change)
- Exit criteria:
  - Chat input accepts text, 'Send' triggers response, 'Auto-apply edits' toggles state.

### File Tree Navigation

- Objective: Validate file tree expansion, M/+ file clicks, and diff preview.
- Target pages: index.html
- Key checks:
  - Click a 'M' (modified) file (e.g., stream.ts, chunker.ts) and check diff preview
  - Click a '+' (added) file (e.g., index.ts) and check diff preview
  - Expand/collapse a folder (e.g., src/upload) and verify state change
- Exit criteria:
  - M/+ files load diffs, folders expand/collapse correctly.

### Top Navigation & Controls

- Objective: Validate top navigation (Agent, Inbox, Runs, Settings) and key buttons (Interrupt, Rerun, Connect a repo).
- Target pages: index.html
- Key checks:
  - Click 'Agent', 'Inbox', 'Runs', 'Settings' links (check state change)
  - Click 'Interrupt' and 'Rerun' buttons (check visual feedback)
  - Click 'Connect a repo' and 'Open in VS Code' buttons (check visual feedback)
- Exit criteria:
  - Top navigation links change state, Interrupt/Rerun/Connect buttons show feedback.

### Mobile Viewport Checks

- Objective: Validate layout and key interactions in mobile viewport.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport
  - Check small tap targets (e.g., Agent, Inbox, ⌕ buttons) for usability
  - Re-run key checks (chat input, file tree, top navigation) in mobile view
- Exit criteria:
  - Key interactions work in mobile view, small tap targets are usable (or warnings are confirmed).

### Other Controls (Unified/Split, Open Editor, Accept All)

- Objective: Validate 'Unified/Split' diff view, 'Open editor', and 'Accept all changes' buttons.
- Target pages: index.html
- Key checks:
  - Click 'Unified' and 'Split' buttons (check diff view change)
  - Click 'Open editor' and 'Accept all changes' buttons (check visual feedback)
- Exit criteria:
  - 'Unified/Split' toggles diff view, 'Open editor'/'Accept all changes' show feedback.

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

