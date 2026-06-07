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

- Clicking a file in the left tree now also gives you a clear sign the right pane has updated: a small orange flash appears on the diff and a status message at the bottom says "Showing diff: filename".
- Files in the tree can now be picked using the keyboard — Tab to a file, then Enter or Space to load its diff.
- The **↻ Rerun** button in the chat header now actually works. Clicking it shows "Starting…", adds a "Rerun triggered" step card to the chat, and flashes a "Rerun started" message at the bottom.
- The **Accept all changes** button now does the full motion: the **M** and **+** badges disappear from the file tree, the file counts in the footer drop to zero, the diff shows "applied", and a green "Applied" checkmark appears on the button.
- The **Open editor**, **Open in VS Code**, and **Connect a repo** buttons now respond when clicked — they briefly show "Opening…" with a small spinner and a status message.
- The **Search** (⌕) and **New file** (+) buttons in the file-tree header now work too. New file opens a small prompt for a name and adds the file to the tree; Search shows a "type to filter" hint.
- The Agent / Inbox / Runs / Settings tabs at the top now highlight when you click one and flash a "Viewing: …" message.
- All status messages appear briefly at the bottom of the screen and fade away on their own.
- On phone-sized screens, the top nav wraps, buttons get taller (at least 44px), and tree rows are easier to tap.

## How to test the changes

1. Open `index.html`. In the left file tree, click any file marked **M** or **+** — the right diff pane flashes orange and a "Showing diff: …" message appears briefly at the bottom.
2. Press Tab repeatedly until a file row in the tree is highlighted, then press Enter — that file's diff loads.
3. In the chat header, click **↻ Rerun** — the button shows "Starting…", a new "Rerun triggered" step appears in the chat, and a status message flashes at the bottom.
4. In the bottom-right, click **Accept all changes** — the M/+ badges in the file tree disappear, the diff stat changes to "applied", and the button briefly turns green with "✓ Applied".
5. Click **Open editor**, **Open in VS Code**, or **Connect a repo** — each shows a small spinner and a status message at the bottom.
6. In the file-tree header, click the **+** button. Enter a file path in the prompt and confirm — the new file appears in the tree marked **+** and you can click it to see an empty diff.
7. At the top of the page, click **Inbox**, **Runs**, or **Settings** — the active tab changes and a "Viewing: …" message appears.
