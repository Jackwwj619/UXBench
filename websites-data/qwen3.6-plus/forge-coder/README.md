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

- **The top-nav tabs actually switch views.** Clicking **Inbox**, **Runs**, or **Settings** in the top bar now replaces the three-pane IDE with a simple placeholder page that explains what would normally live there. Clicking **Agent** brings the IDE back. Before, all four tabs did nothing.
- **The header buttons give feedback.** "Connect a repo" and "Open in VS Code" used to be dead. They now show a short message at the bottom of the screen telling you the action isn't wired up in this demo, so you know the click was registered.
- **Diff toolbar buttons respond.** "Accept all" and "Open in editor" buttons above the diff now show a short confirmation message when clicked, and the Unified/Split tabs visibly switch their active style when you tap them.
- **Phone-friendly layout with Files / Chat / Diff tabs.** On narrow screens, a new row of tabs appears under the top bar that lets you swap between the file tree, the chat, and the diff one pane at a time, instead of trying to fit all three side-by-side.
- **Clicking a file on a phone jumps to the diff.** On a small screen, clicking a modified/added file in the tree now automatically switches to the Diff tab so you can read the change immediately.
- **Confirmation messages (toasts).** Small actions across the page (header buttons, diff toolbar) now show a brief message at the bottom-centre of the screen instead of changing silently.
- **Larger touch targets and clearer focus.** Top-bar links, header buttons, file-tree action buttons, the Auto-apply edits toggle, the Send button, and the message action icons (copy / reply / etc.) are all sized larger on small screens, and keyboard focus is shown more clearly.
- **Top nav scrolls horizontally on small screens.** When the top bar is too narrow to fit everything, the nav links scroll sideways instead of overflowing or wrapping awkwardly.

## How to test the changes

1. Open `index.html` and click **Inbox** in the top bar — the three-pane IDE should be replaced by an "Inbox" placeholder page. Try **Runs** and **Settings** for the same effect, then click **Agent** to return to the IDE view.
2. Click **Connect a repo** and **Open in VS Code** at the top right — each should show a short message at the bottom of the screen saying the action isn't wired up in the demo.
3. Above the diff on the right, click **Accept all** and **Open in editor** — each should briefly show a confirmation message. Switch between **Unified** and **Split** tabs to confirm the active tab changes.
4. Shrink the browser to phone width. A row of three tabs (Files / Chat / Diff) should appear under the top bar, with Chat selected by default. Tap Files, then click any file marked M or +; the view should automatically jump to the Diff tab and show its changes.
5. On the small-screen view, scroll the top nav sideways — it should scroll instead of overflowing. Try tapping the buttons in the chat-message footer and the file-tree icons; they should feel comfortably large.
