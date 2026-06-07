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

- The composer now gives visible feedback when you send: the Send button shows a spinner, the status line says "Sending… → Sent · agent is working", and the agent reply appears after a short delay. Hitting Send with an empty box now shows a "Type a message before sending" hint instead of doing nothing.
- The **Split** tab in the diff toolbar now actually rearranges the diff into a two-column side-by-side layout (it used to just look selected without changing anything). A small message confirms the view switch.
- The magnifying-glass button above the file tree now opens a real "Filter files…" search box that hides files in the tree as you type, instead of being a dead icon. The **+** "New file" button gives a clear confirmation when tapped.
- The **Accept all changes** button now asks for a confirmation tap before committing ("Click again to confirm"), then shows an "Applying…" spinner, drops a new "Accepted all changes" step into the chat, and pops a summary message. The **Open editor** button shows a similar "Opening in VS Code" confirmation.
- The top-nav tabs (Inbox, Runs, Settings) and the top-right action buttons (Connect a repo, Open in VS Code) now show a clear "demo only" message when tapped, instead of silently jumping to the top of the page.
- On a phone or narrow window, a new row of **Files / Chat / Diff** tabs appears so you can switch between the three panes one at a time — they no longer all squash together. Touch targets (buttons, file rows, the composer) are also enlarged for easier tapping.
- Confirmations and warnings throughout the app now appear as small pop-up messages at the bottom of the screen so it's clear what happened after each action.

## How to test the changes

1. Open `index.html`. Type a short message in the composer and press Send — the button briefly shows a spinner, the status line says "Sent · agent is working", and a fake agent reply appears underneath. Clear the box and press Send again to see the empty-state hint.
2. In the right pane, click the **Split** tab — the diff should rearrange so the before-and-after sit side by side. Click **Unified** to put it back.
3. Above the file tree on the left, click the magnifying glass — a filter box should slide in. Type "chunker" and watch unrelated files disappear from the tree. Click a still-visible file to load its diff into the right pane.
4. Click **Accept all changes** in the diff toolbar — the button should change to "Click again to confirm". Tap it again; it shows "Applying…", then "Changes accepted", and a new "Accepted all changes" card appears in the chat.
5. Click **Open editor** next to it — a "Opening in VS Code" confirmation pops up at the bottom.
6. Click **Inbox**, **Runs**, or **Settings** in the top nav, then **Connect a repo** in the top right — each should show a small "demo only" pop-up at the bottom instead of jumping the page.
7. Shrink the window to phone width. A new row of three tabs (Files / Chat / Diff) appears under the top bar; click each to switch between the panes. Buttons and file rows should all be noticeably larger.
