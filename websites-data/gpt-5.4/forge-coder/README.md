# Forge Coder

Forge Coder is a demo of an agentic coding IDE — the kind of tool where you describe a change in chat and an AI agent reads files, edits code, and runs your tests, while you watch the diff appear in real time. The example session shows the agent working on a TypeScript project called `atlas-cli`.

> Fictional product — the agent isn't really running. The file tree, chat steps, diffs, and test progress are all scripted.

## What you can do

- **See what the agent's doing right now.** The center column shows your conversation with the agent: your messages, its explanations, and a series of step cards (Reading file, Editing, Running tests) with timestamps. A pulsing "running" indicator and elapsed time live at the top.
- **Stop the agent mid-run.** Hit **Interrupt** in the run header to pause; a "paused" step card appears and the test ticker stops.
- **Browse the project.** The left file tree shows folders you can collapse and files marked **M** (modified) or **+** (newly added). Click any modified or new file to load its diff into the right pane.
- **Read the proposed changes.** The right pane shows a syntax-highlighted diff in either unified or split view. Type-check, lint, and test chips at the bottom show live progress — the test chip flips to **passing** when the run completes.
- **Send the agent a new instruction.** Use the composer at the bottom of the chat. Cmd/Ctrl+Enter submits. There's an **Auto-apply edits** toggle if you trust it to commit changes without asking.

## What was changed in this version

- The top-nav links (Inbox, Runs, Settings) and the "Connect a repo" button now open a real pop-up dialog describing what each section would do, instead of being dead links. "Open in VS Code" pops a toast confirming the action.
- The search icon above the file tree now opens a filter box — typing into it hides files that don't match.
- The "+" new-file icon above the file tree opens a confirmation dialog.
- The "Accept all changes" button on the diff pane now asks for confirmation before applying, then visibly marks every modified/added file in the tree as accepted, swaps the file stats footer to "Applied 4 files / Pending 0", and changes the button to a disabled "✓ Changes applied" state.
- The "Open editor" button next to the diff now shows a toast naming the file that would be opened.
- The diff pane's "Split" tab now actually works — clicking it shows the before/after side by side; "Unified" switches back.
- The "Rerun" button now becomes a "Resume" button after you interrupt, and clicking it inserts a "Resumed" step card and restarts the live test counter.
- Interrupting the run now pauses the indicator dot to amber and disables the Interrupt button (it now reads "⏸ Paused").
- The Auto-apply edits checkbox now pops a toast every time you toggle it, explaining what changes.
- Sending an empty message no longer silently does nothing — you get a "Type a message first" hint next to the Send button.
- After you send a message, your bubble shows a dashed border and a "Sending…" label until it switches to "Sent · just now"; meanwhile the agent shows a typing indicator (three bouncing dots) before its reply appears. Sending also automatically pauses the running tests so the agent can re-plan.
- A short status text ("Sending…", "Sent ✓") appears next to the Send button after each submission.
- On phone-sized screens, the three IDE panes (Files / Chat / Diff) now collapse behind a tab strip at the top — tap a tab to switch panes — instead of being squashed into a stacked layout. Tapping a file in the tree also auto-switches you to the Diff pane.
- Buttons, links, file-tree rows, and tabs throughout the page are taller and easier to tap, and the top bar wraps gracefully on narrow widths.

## How to test the changes

1. Open `index.html`. In the top bar, click "Inbox" — a pop-up explains what the Inbox would show. Close it. Try "Runs", "Settings", and "Connect a repo" the same way. Click "Open in VS Code" — a toast appears at the bottom right.
2. Above the file tree, click the magnifying glass — a search box appears; type "upload" and only matching files stay visible. Click the magnifying glass again to clear.
3. Click the "+" above the file tree — a new-file pop-up appears with Cancel and Got it buttons.
4. In the diff pane (right side), click "Split" — the diff splits into Before/After columns. Click "Unified" to switch back.
5. Click "Accept all changes" — a confirmation dialog lists what will be applied. Confirm it; every modified file in the tree now shows a green check, the file-stats footer flips to "Applied 4 files", and the Accept button becomes a disabled "✓ Changes applied".
6. Click "Open editor" next to the diff title — a toast confirms which file would open.
7. Click "⏸ Interrupt" in the chat header — the green dot turns amber, the Interrupt button reads "⏸ Paused" and disables, and a "Paused" step card appears in the chat. Click the now-renamed "↻ Resume" button to restart the test counter; a "Resumed" card appears.
8. Toggle the "Auto-apply edits" checkbox below the composer — each toggle pops a toast explaining the new state.
9. In the message box, click Send with nothing typed — a "Type a message first" hint appears. Type any text and send; your bubble shows "Sending…" then "Sent · just now", and the agent replies with a typing indicator first.
10. Shrink the browser to phone width — three tabs appear at the top of the IDE area ("Files / Chat / Diff"). Tap each one to switch panes. From Files, tap any modified file — you automatically jump to the Diff pane.
