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

- The Interrupt button now turns into a green Resume button once you pause the run, so you can continue from where you left off — and a small "Run paused" / "Run resumed" message confirms each action.
- The Rerun button now actually does something: it shows a spinner, bumps the run number, drops a "Rerun started" card into the chat, and pops up a confirmation toast.
- The top-bar tabs (Agent / Inbox / Runs / Settings) now respond to clicks — the inactive ones show a friendly "this is part of the full product" toast instead of doing nothing, and the active tab gets a colored underline.
- The Split view tab in the diff pane now actually splits the diff into a two-column side-by-side view (removed lines on the left, added lines on the right). Switching back to Unified restores the original.
- Switching between files in the left tree now resets the diff to Unified view automatically, so split-mode doesn't carry over and look strange on the next file.
- On phones and small tablets, a new "Files / Chat / Diff" tab strip lets you swap between the three panes one at a time, instead of squishing them all into one column.
- Keyboard focus is now visible on top-bar links (a colored outline appears), and the diff tabs, navigation links, and composer controls are spaced out enough to tap comfortably.

## How to test the changes

1. Open `index.html`. Click "⏸ Interrupt" in the chat header — it should turn green and read "▶ Resume", a "Run paused" toast appears, and the live status changes to "paused". Click Resume to continue and watch a "Resumed by user" step appear.
2. Click "↻ Rerun" next to the Interrupt button — the button briefly shows a spinner reading "Starting…", a small toast says "Rerun #244 started", and the run number in the chat header increments.
3. Click "Inbox", "Runs", and "Settings" in the top navigation — each should show a "part of the full product" toast and the underline should move to the clicked tab.
4. In the right diff pane, click "Split" — the diff should rearrange into two side-by-side columns. Click "Unified" to switch back.
5. With the diff in Split view, click a different file in the left tree marked M or + — the diff should swap and snap back to Unified view automatically.
6. Resize the browser to phone width. A "Files / Chat / Diff" tab strip should appear under the top bar — tap each tab to bring that pane to the front.
7. Press Tab to move keyboard focus through the top navigation links — each focused link should show a visible outline.
