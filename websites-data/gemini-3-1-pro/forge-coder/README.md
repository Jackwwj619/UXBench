# Forge Coder

Forge Coder is a demo of an agentic coding IDE — the kind of tool where you describe a change in chat and an AI agent reads files, edits code, and runs your tests, while you watch the diff appear in real time. The example session shows the agent working on a TypeScript project called `atlas-cli`.

> Fictional product — the agent isn't really running. The file tree, chat steps, diffs, and test progress are all scripted.

## What you can do

- **See what the agent's doing right now.** The center column shows your conversation with the agent: your messages, its explanations, and a series of step cards (Reading file, Editing, Running tests) with timestamps. A pulsing "running" indicator and elapsed time live at the top.
- **Stop the agent mid-run.** Hit **Interrupt** in the run header to pause; a "paused" step card appears and the test ticker stops.
- **Browse the project.** The left file tree shows folders you can collapse and files marked **M** (modified) or **+** (newly added). Click any modified or new file to load its diff into the right pane.
- **Read the proposed changes.** The right pane shows a syntax-highlighted diff in either unified or split view. Type-check, lint, and test chips at the bottom show live progress — the test chip flips to **passing** when the run completes.
- **Send the agent a new instruction.** Use the composer at the bottom of the chat. Cmd/Ctrl+Enter submits. There's an **Auto-apply edits** toggle if you trust it to commit changes without asking.

## How to use it

Open `index.html` in any modern browser. Watch the example run play out, click around the file tree to see how diffs swap into the right pane, and try the Interrupt button to pause the session. Type a follow-up in the composer to see the chat extend with a new turn.

## What was changed in this version

- The composer now submits on Enter the way most chat apps do, with Shift+Enter inserting a newline. Cmd/Ctrl+Enter still works for muscle memory.
- The **Unified** / **Split** tabs above the diff are now active — clicking Split highlights the tab and shows a "Split view — coming soon" toast so it's no longer a dead button.
- Every previously inert button across the page (Inbox, Runs, Settings, Connect a repo, Open in VS Code, Rerun, Open editor, Accept all changes, the file-tree search and "+" icons) now responds with a clear "feature — coming soon" toast instead of doing nothing.
- On phone-width windows the three-pane layout collapses behind two new buttons in a top bar ("☰ Files" and "Diff ⇆"). Each slides its panel in over a scrim; tapping the scrim or picking a file closes the drawer.
- The mobile drawers don't compete for vertical space anymore — only one is open at a time, the chat stays full width, and tapping a file from the file drawer auto-closes it.
- Buttons in the top bar, diff tabs, and composer "Auto-apply edits" toggle are now full 44px touch targets with bigger checkboxes for easier tapping.
- The IDE panes now properly clip their own overflow, so long chat threads, file trees, and diffs scroll inside their column instead of pushing the whole page sideways.

## How to test the changes

1. Open `index.html`. Click in the composer and type "hello", then press Enter — the message submits. Hold Shift and press Enter to insert a newline instead.
2. Click the "Split" tab above the diff — it activates and a small toast appears at the bottom reading "Split view — coming soon".
3. Click any header link (Inbox, Runs, Settings) or the "Connect a repo" / "Open in VS Code" buttons — each shows its own coming-soon toast instead of jumping to `#`.
4. Resize the browser to phone width — a thin bar appears above the IDE with "☰ Files" on the left and "Diff ⇆" on the right. Tap "☰ Files" to slide in the file tree; pick a file and the drawer closes automatically.
5. Tap the dark scrim behind an open drawer — the drawer closes.
6. On phone width, the "Auto-apply edits" toggle in the composer has a larger checkbox and a 44px tap area.
