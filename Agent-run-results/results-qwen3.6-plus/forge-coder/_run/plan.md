# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Forge Coder agentic IDE, focusing on the three-pane workflow (File Tree, Agent Chat, Diff Preview), interaction states, and mobile responsiveness.

## Plan Summary

The run will validate the primary 'Agent Run' flow by interacting with the file tree to trigger diff updates, simulating agent control via chat inputs and interrupt buttons, and verifying layout stability. It will then stress-test the UI controls for accessibility and touch targets, specifically addressing the prescan warnings regarding small tap areas. Finally, it will repeat critical path checks on a mobile viewport to assess the viability of the complex three-column layout on smaller screens.

## Coverage Targets

- pages: `100% of known HTML files (index.html)`
- features: `Exercise all visible buttons, toggles, and the file tree interaction model`
- mobile: `Full regression of Phase 1 and 2 on mobile viewport`

## Planned Phases

### Primary Workflow & Pane Interaction

- Objective: Validate the core loop: selecting files triggers correct diffs, and the agent chat displays history correctly.
- Target pages: index.html
- Key checks:
  - Click multiple files in the left tree (e.g., 'stream.ts', 'chunker.ts') and verify the right pane updates with corresponding code/diffs.
  - Verify folder collapse/expand functionality in the file tree.
  - Check visual feedback (hover/active states) on the 'Unified' vs 'Split' diff toggles.
  - Scroll the central agent chat to ensure smooth rendering of long conversation histories.
- Exit criteria:
  - All visible files in the tree have been clicked and rendered in the diff pane.
  - Diff view toggles switch the display mode without layout breakage.

### Agent Control & Input Simulation

- Objective: Test the interactive elements controlling the agent's execution state.
- Target pages: index.html
- Key checks:
  - Type a dummy message into the bottom textarea to check focus states and auto-resize behavior.
  - Click 'Send' to observe any immediate UI feedback (even if no backend exists).
  - Toggle the 'Auto-apply edits' checkbox and verify its state persistence visually.
  - Hover over 'Interrupt' and 'Rerun' buttons to check for tooltips or danger-state styling.
- Exit criteria:
  - Input field accepts text and clears/resets appropriately after 'Send'.
  - Control buttons provide clear affordance for their destructive/restart nature.

### Navigation & Secondary Views

- Objective: Explore adjacent flows accessible via the top navigation bar.
- Target pages: index.html
- Key checks:
  - Click 'Inbox', 'Runs', and 'Settings' tabs to verify view switching.
  - Check if the 'Connect a repo' and 'Open in VS Code' buttons trigger modals or external links.
  - Verify that the active tab is clearly highlighted in the navigation bar.
- Exit criteria:
  - All top-level navigation items have been activated.
  - No JavaScript errors occur during view transitions.

### Mobile Responsiveness & Accessibility

- Objective: Assess usability on mobile viewports, specifically targeting the prescan's 'small tap target' warnings.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Attempt to tap the 'Agent', 'Inbox', and 'Settings' nav items; note overlap or miss-taps.
  - Check if the three-pane layout collapses into a stack, tabs, or drawer menu.
  - Verify if the code diff remains readable or requires excessive horizontal scrolling.
  - Test the 'Send' button and file tree interactions for touch friendliness.
- Exit criteria:
  - Critical navigation and input controls are usable despite small target sizes.
  - Layout adaptation strategy (stacking/hiding panes) is identified and evaluated.

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

