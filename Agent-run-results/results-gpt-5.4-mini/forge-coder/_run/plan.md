# UXAgent Exploration Plan

## Goal

Evaluate the Forge Coder agent IDE’s primary run view end-to-end, with special attention to code-change controls, run-state controls, and mobile usability of the compact toolbar and left file tree.

## Plan Summary

Start on the main agent run page and validate the core tri-pane workflow: navigating the file tree, inspecting the live diff preview, and using the agent conversation controls. Then probe adjacent run-management actions like Interrupt, Rerun, Open editor, Accept all changes, and the view toggles, since these are the main recovery and review paths visible in the prescan. Finish with mobile viewport checks focused on the small tap targets already flagged, especially top navigation, repo/open actions, and diff view controls.

## Coverage Targets

- pages: `visit all known HTML pages; in this fixture that means thoroughly exercising index.html only`
- features: `exercise the core run workspace, at least two file-diff selections, all visible run controls, composer submission, and diff view toggles`
- mobile: `repeat the core selection, run-control, composer, and mode-toggle checks in a mobile viewport, with emphasis on the small tap targets already flagged`

## Planned Phases

### Baseline run-view walkthrough

- Objective: Confirm the primary three-pane agent workspace and understand the default active run state.
- Target pages: index.html
- Key checks:
  - Verify the left file tree, central agent conversation, and right diff preview are all visible and functional in the default desktop state
  - Check whether the currently selected file/diff matches the highlighted file tree entry
  - Confirm the run header shows meaningful status and elapsed time, and the agent thread is readable without truncation issues
- Exit criteria:
  - At least one modified or added file has been selected and its diff is visible
  - Default run status, conversation area, and diff pane behavior are understood
  - No blocking layout or rendering failures observed on desktop

### File tree and diff inspection

- Objective: Validate the primary file-navigation flow from the left tree into the diff viewer.
- Target pages: index.html
- Key checks:
  - Click multiple file-tree entries with M/+ badges to confirm each loads the correct diff content
  - Expand/collapse any visible folders such as src, upload, commands, core, test, and docs if controls are present
  - Check whether file-status badges, modified counts, and lines-changed summary stay consistent when switching files
- Exit criteria:
  - Multiple file selections successfully swap the diff preview
  - Folder navigation behavior is confirmed for at least one expanded branch
  - The modified/added file summary appears stable across selections

### Run control and recovery actions

- Objective: Stress the main agent-management controls that could interrupt or reframe the current task.
- Target pages: index.html
- Key checks:
  - Validate Interrupt behavior on an active run and observe any state change or confirmation
  - Validate Rerun behavior and whether it resets the current run context or regenerates the work state
  - Open editor and assess whether it exposes a separate editing surface or simply changes the preview mode
  - Review Accept all changes for scope and safety, especially whether it acts on all visible edits or requires confirmation
- Exit criteria:
  - Each run-management button has been exercised at least once or confirmed inert
  - Any confirmations, state transitions, or disabled states are documented
  - No destructive action is triggered without a visible safeguard

### Chat composer and agent response workflow

- Objective: Validate the central conversation input flow and whether user guidance can steer the agent effectively.
- Target pages: index.html
- Key checks:
  - Type a follow-up prompt into the reply textarea and verify Send behavior
  - Toggle Auto-apply edits and observe whether it changes post-send behavior or edit application state
  - Check whether the composer can request another pass, ask for changes, or continue the task without breaking the current thread
- Exit criteria:
  - Composer accepts text and sends or queues a response
  - Auto-apply edits has a clear and observable effect or documented lack of effect
  - Conversation state remains coherent after user input

### Navigation, mode toggles, and adjacent controls

- Objective: Verify the nearby top-level navigation and diff-display controls that frame the run experience.
- Target pages: index.html
- Key checks:
  - Exercise Agent, Inbox, Runs, and Settings links to see whether they navigate, switch panels, or remain placeholders
  - Test Connect a repo and Open in VS Code for expected affordance and any guardrails
  - Toggle Unified and Split diff modes and confirm the right pane layout changes appropriately
  - Use the search and add controls in the file tree header if they are active
- Exit criteria:
  - All visible navigation and mode controls have been clicked or ruled out as inert
  - At least one layout-mode change has been observed if supported
  - Any nonfunctional or placeholder controls are identified

### Mobile viewport validation

- Objective: Repeat the most important interactions under mobile constraints, focusing on the known tap-target risks.
- Target pages: index.html
- Key checks:
  - Recheck top navigation, repo/open actions, search/add icons, Interrupt/Rerun, and Unified/Split buttons on mobile
  - Validate file-tree selection and diff loading with touch-sized interaction
  - Confirm composer usability on small screens, including textarea, Auto-apply checkbox, and Send
- Exit criteria:
  - Critical run-flow actions are usable or clearly degraded on mobile
  - Small tap target warnings are confirmed against actual touch behavior
  - Any layout breakage, overlap, or unreachable controls on mobile are documented

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

