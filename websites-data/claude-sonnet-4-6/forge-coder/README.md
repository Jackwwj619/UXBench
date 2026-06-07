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

- The **Split** tab in the diff pane now actually shows side-by-side before/after columns instead of looking identical to Unified.
- **Accept all changes** now asks for confirmation before applying, then shows a notification with a 5-second **Undo** option. A new **Reject all** button next to it discards the proposed edits (also with a confirmation).
- Clicking the magnifier above the file tree opens a filter box — type to narrow the file list, press Esc or click the icon again to clear.
- The **Rerun** button in the run header, the Inbox/Runs/Settings tabs, "Connect a repo", "Open in VS Code", "Open editor", and "New file" buttons now show a brief message explaining they're demo-only instead of doing nothing silently.
- The **Send** button in the composer now shows a "Sending…" state with a spinner so it's obvious when your message has been submitted.
- On narrow screens (phones and small tablets), three tabs (Files / Chat / Diff) appear above the workspace so you can switch between the panes one at a time instead of cramming all three onto a small display. The top menu collapses into a hamburger button.

## How to test the changes

1. Open `index.html`. Click **Split** above the diff and confirm you see two columns (Before / After) with deletions on the left and additions on the right. Click **Unified** to switch back.
2. Click **Accept all changes**. Confirm the dialog, then look for the toast at the bottom and click **Undo** within five seconds — the modified/added badges on the files should reappear.
3. Click the magnifier above the file tree, type `auth`, and watch the file list narrow. Clear it with Esc.
4. Click **Interrupt**, then **Rerun**, then any of the Inbox / Runs / Settings tabs — each should pop a short message.
5. Type something in the composer and press Send; the button should briefly say "Sending…".
6. Shrink the window to phone width and use the Files / Chat / Diff tabs that appear at the top to switch between the panes.
