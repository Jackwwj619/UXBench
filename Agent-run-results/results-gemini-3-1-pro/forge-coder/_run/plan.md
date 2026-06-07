# UXAgent Exploration Plan

## Goal

Thoroughly validate the agentic IDE interface, focusing on the three-pane interaction model (file tree, agent chat, live diff), chat functionality, and responsive behavior on mobile.

## Plan Summary

The exploration will systematically test the three main panes of the IDE layout. It will verify that file selection correctly loads diffs, agent chat messages can be submitted, and diff views can be toggled. Finally, it will run a mobile pass to assess how the dense three-pane layout adapts to smaller screens, paying special attention to the reported small tap targets.

## Coverage Targets

- pages: `Fully explore index.html (the only known page).`
- features: `Exercise file selection, diff toggling, chat submission, and run controls.`
- mobile: `Validate the layout transformation of the 3-pane IDE and assess tap target usability.`

## Planned Phases

### Global Navigation and Toolbar

- Objective: Verify global navigation links and primary actions.
- Target pages: index.html
- Key checks:
  - Click Inbox, Runs, Settings to check for navigation or modal popups.
  - Click 'Connect a repo' and 'Open in VS Code' to observe behavior (expecting alerts or stubs).
- Exit criteria:
  - All top-level navigation and utility buttons have been clicked and their responses recorded.

### File Tree and Diff Preview Integration

- Objective: Test the interaction between the file tree (left) and the live diff preview (right).
- Target pages: index.html
- Key checks:
  - Click on a modified (M) or added (+) file in the tree (e.g., 'stream.ts' or 'chunker.ts').
  - Verify the diff pane on the right updates to show the selected file's contents.
  - Toggle between 'Unified' and 'Split' diff views.
  - Click 'Open editor' and 'Accept all changes' in the diff pane.
- Exit criteria:
  - Confirmed that clicking files updates the diff view and that diff viewing controls function.

### Agent Chat Interaction

- Objective: Validate the central agent chat interface and input controls.
- Target pages: index.html
- Key checks:
  - Click '⏸ Interrupt' and '↻ Rerun' to check state changes in the run status.
  - Enter text into the 'Reply...' textarea.
  - Toggle the 'Auto-apply edits' checkbox.
  - Submit the form using the 'Send' button and observe the chat history update.
- Exit criteria:
  - Chat input form has been submitted and run control buttons have been interacted with.

### Mobile Viewport Stress Test

- Objective: Evaluate the complex IDE layout on a constrained mobile viewport.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Observe how the three panes (tree, chat, diff) are handled (e.g., stacked, tabbed, hidden).
  - Attempt to use the small tap target controls identified in the prescan (e.g., nav links, toggle buttons).
  - Submit a chat message on mobile.
- Exit criteria:
  - Mobile layout strategy is documented and critical interactions have been verified on the small screen.

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

