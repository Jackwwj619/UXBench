# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Forge Coder agent run interface, validating the core agent-review workflow across the file tree, chat timeline, diff preview, and run controls, plus adjacent navigation and action surfaces on desktop and mobile.

## Plan Summary

The run should center on the visible primary flow: reviewing an in-progress coding task, inspecting changed files from the tree, switching diff views, and deciding whether to respond, interrupt, rerun, open the editor, or accept changes. Because only index.html is known, exploration should go deep within this one-page app rather than hunting for separate pages. Adjacent checks should probe top navigation, repo/editor actions, composer controls, and whether file/status interactions keep the three-pane context coherent. Mobile coverage should focus on usability of the dense header, small tap targets, pane accessibility, and whether critical actions remain reachable.

## Coverage Targets

- pages: `Fully explore index.html and any in-page states revealed by the visible navigation or action controls.`
- features: `Exercise nearly all visible controls on the main run view, with priority on changed-file selection, diff mode switching, composer submission, run controls, and adjacent repo/editor/navigation actions.`
- mobile: `Repeat the core review-and-respond workflow plus the highest-risk controls on mobile viewport, emphasizing pane access, overflow, and small tap-target usability.`

## Planned Phases

### Baseline run-state mapping

- Objective: Establish how the single-page interface is organized and confirm the default active-run state before deeper interaction.
- Target pages: index.html
- Key checks:
  - Confirm the three-pane structure: file tree, agent conversation/timeline, and diff preview.
  - Record which navigation item appears active and whether run metadata is clearly understandable.
  - Verify visible action groups in the header and run toolbar: Interrupt, Rerun, Open editor, Accept all changes, Connect a repo, Open in VS Code.
  - Check whether the currently selected file in the tree matches the diff header in the right pane.
  - Inspect whether the conversation timeline communicates progress, file reads/edits, and test execution clearly.
- Exit criteria:
  - The active state and hierarchy of the page are documented.
  - The current selected file and loaded diff are identified.
  - All major visible control clusters are accounted for before branching into interactions.

### Primary review flow through changed files and diffs

- Objective: Exercise the core code-review workflow by traversing changed files and validating diff-view behavior.
- Target pages: index.html
- Key checks:
  - Click each visible changed file badge target in the tree (stream.ts M, chunker.ts M, index.ts +, upload.spec.ts M) and verify the right pane updates accordingly.
  - Check whether unchanged files behave differently from changed files when selected.
  - Toggle between Unified and Split and confirm the same file remains selected and the rendering changes appropriately.
  - Observe whether diff metadata such as file path and line additions/removals update consistently with selection.
  - Validate basic affordance of collapse/expand behavior in the tree where folder disclosure indicators are visible.
  - Assess whether the file-status summary footer (Modified 3, Added 1, Lines changed +128 / -54) aligns with visible file states.
- Exit criteria:
  - Most visible modified/new files have been opened and cross-checked against the diff pane.
  - Both diff modes have been exercised.
  - Any mismatch between tree selection, diff header, and diff contents has been captured.

### Agent conversation and request submission flow

- Objective: Validate the feedback loop between user and agent using the visible composer and auto-apply option.
- Target pages: index.html
- Key checks:
  - Inspect the conversation area for chronology, readability, and clear distinction between user prompt, agent summary, and timeline events.
  - Type a safe follow-up request in the reply textarea and submit via Send, first without Auto-apply edits enabled if possible.
  - Toggle Auto-apply edits and inspect whether the control label, state, and risk are understandable before submission.
  - Check for any acknowledgment, new message, timeline update, or other visible state change after sending.
  - Verify whether the form prevents empty or accidental submissions and whether focus management is sensible.
- Exit criteria:
  - The composer, checkbox, and send interaction have been exercised.
  - At least one post-submit state response or lack of response is observed and documented.
  - Risk around auto-apply behavior is understood.

### Run controls and adjacent navigation/actions

- Objective: Probe non-core but high-risk controls that can alter run state or move the user into adjacent sections.
- Target pages: index.html
- Key checks:
  - Test Interrupt and inspect whether run status, buttons, or timeline update in a comprehensible way.
  - Test Rerun and observe whether the system clearly signals a restarted run, duplicated history, or reset state.
  - Inspect Accept all changes for confirmation, reversibility cues, or immediate state changes in tree and diff.
  - Try Open editor, Connect a repo, and Open in VS Code to see whether they open panels, trigger messages, or dead-end silently.
  - Click Agent, Inbox, Runs, and Settings to determine whether they switch visible content, selected nav state, or do nothing.
  - Test the search (⌕) and plus (+) controls in the file-tree header for discoverability and visible results.
- Exit criteria:
  - Each major adjacent action has been triggered at least once where safe.
  - Navigation behavior for the top links is understood as in-page state change or inert placeholder.
  - Any destructive or high-impact action ambiguity has been captured.

### Mobile responsiveness and reachability audit

- Objective: Repeat the most important workflow and action checks on mobile, focusing on density, tapability, and access to all panes and controls.
- Target pages: index.html
- Key checks:
  - Load the page in mobile viewport and verify whether the three-pane layout collapses, stacks, or requires horizontal scrolling.
  - Repeat critical path checks: select a changed file, inspect diff, toggle Unified/Split if reachable, and access the reply composer.
  - Confirm whether Interrupt, Rerun, and Accept all changes remain visible and separable on small screens.
  - Check the top navigation and utility actions for truncation, overflow, or inability to tap due to the prescan small-target warnings.
  - Assess whether the tiny controls called out in prescan (nav links, search, plus, auto-apply checkbox, Unified/Split, Send) are realistically usable by touch.
- Exit criteria:
  - The primary review flow has been repeated in mobile viewport.
  - Reachability and tap-target issues for critical controls are documented with examples.
  - A clear judgment is available on whether mobile supports the essential workflow or merely exposes a cramped desktop UI.

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

