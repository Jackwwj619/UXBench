# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Forge Coder agentic IDE interface, validating the primary agent chat flow, file tree interactions, diff preview states, and responsive layout behavior.

## Plan Summary

The exploration will proceed by first validating the primary agent run view and its interactive states (interrupt, rerun, chat). Next, it will deep-dive into the file tree and diff preview pane interactions, including view toggles and file selection. It will then test the top-level navigation tabs and header actions. Finally, the entire critical flow will be validated on a mobile viewport to assess responsive layout and tap target issues identified in the prescan.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Exercise all 11 buttons, 4 links, 2 inputs, and key file tree interactions`
- mobile: `Repeat critical agent, file tree, and diff checks on mobile viewport to validate layout and tap targets`

## Planned Phases

### Agent Run State & Chat Controls

- Objective: Validate the primary agent run view, state transitions, and chat input functionality.
- Target pages: index.html
- Key checks:
  - Click '⏸ Interrupt' and verify the agent status updates appropriately
  - Click '↻ Rerun' and verify the run resets or restarts visually
  - Type a message in the 'Reply...' textarea and click 'Send'
  - Toggle the 'Auto-apply edits' checkbox on and off
- Exit criteria:
  - Agent state controls have been exercised
  - Chat input and submission work without errors
  - Auto-apply toggle responds to interaction

### File Tree & Diff Preview Interactions

- Objective: Validate file tree navigation, folder collapse, file status badges, and the resulting diff preview updates.
- Target pages: index.html
- Key checks:
  - Click a folder (e.g., 'src' or 'upload') to collapse and expand it
  - Click a file marked 'M' (e.g., 'stream.ts') and verify the diff loads in the right pane
  - Click a file marked '+' (e.g., 'index.ts') and verify the diff loads
  - Click an unmarked file (e.g., 'retry.ts') and observe the right pane behavior
  - Toggle between 'Unified' and 'Split' diff views
  - Click 'Accept all changes' and 'Open editor' buttons
- Exit criteria:
  - File tree interactions correctly update the diff pane
  - Diff view toggles function as expected
  - Diff action buttons have been clicked and observed

### Top Navigation & Header Actions

- Objective: Validate the behavior of top-level tabs and header buttons.
- Target pages: index.html
- Key checks:
  - Click 'Inbox', 'Runs', and 'Settings' tabs to check for view changes or UI feedback
  - Click 'Agent' tab to return to the main view
  - Click 'Connect a repo' button
  - Click 'Open in VS Code' button
- Exit criteria:
  - All top navigation tabs have been clicked
  - Header action buttons have been exercised

### Mobile Responsive Validation

- Objective: Validate the layout, readability, and tap-target usability on a mobile viewport.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the three-pane layout adapts correctly (e.g., panes stack or collapse)
  - Check if file tree and diff pane are accessible on mobile
  - Attempt to tap small controls identified in prescan (Auto-apply checkbox, nav tabs, tree icons)
  - Test chat input and send functionality on mobile
- Exit criteria:
  - Mobile layout has been assessed for major usability flaws
  - Small tap target warnings have been visually confirmed
  - Core agent flow is functional on mobile

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

