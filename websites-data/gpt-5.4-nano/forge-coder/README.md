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

- The "Send" button under the composer now visibly turns into "Sending…" and is briefly disabled while your message is being handed off to the agent, and a small notification confirms the message was queued.
- The "Auto-apply edits" toggle is now a proper checkbox that visibly shows ON / OFF (and turns orange when ON), and a notification confirms the new state every time you flip it.
- "Accept all changes" actually does something now: file badges clear, the modified/added counts at the bottom of the file tree drop to zero, a green "Accepted N changes" note appears in the run header, and a new step card is added to the chat.
- The "Unified" vs "Split" tabs above the diff now work — clicking Split rearranges the diff into a two-column view, and a small chip on the right tells you which mode you're in.
- The top-bar links (Agent / Inbox / Runs / Settings) now act like a real navigation: clicking Inbox, Runs, or Settings shows a small banner with a short description and a "Back to Agent" button.
- The "Rerun" button in the run header now adds a new step card to the chat ("Rerun queued"), updates the run state to "starting…", and shows a notification.
- The "Open editor" button now opens a small modal that previews the current file's diff and can be dismissed by clicking the backdrop or the close button.
- A small popup notification system at the bottom-right of the screen confirms most actions (sending, accepting, view changes, rerun).
- The whole IDE now reflows for small screens: the top nav wraps and stretches, the file tree and chat stack vertically, and buttons are larger and easier to tap.

## How to test the changes

1. Open `index.html`. Type any message into the composer at the bottom of the chat and hit Send — the button briefly shows "Sending…", disables itself, then re-enables. A "Message sent · agent queued" notification appears bottom-right.
2. Click the "Auto-apply edits" toggle next to Send a few times — it visibly switches between ON and OFF (orange when ON) and a notification confirms each change.
3. Click "Accept all changes" in the diff toolbar. The M / + badges in the file tree disappear, the changed/added counters at the bottom of the file tree drop to 0, a green "Accepted N changes" chip appears next to the run state, and a new step card appears in the chat.
4. Above the diff, click "Split". The diff rearranges into two columns and the chip on the right reads "Mode: Split". Click "Unified" to switch back.
5. In the top bar, click "Inbox", "Runs", or "Settings". A banner appears above the chat with a short description and a "Back to Agent" button.
6. Click "↻ Rerun" in the run header. A new "Rerun queued" step card is added to the chat and the run state briefly says "starting…".
7. Click "Open editor" above the diff. A modal opens showing the current file's diff preview. Click the backdrop or "Close" to dismiss it.
8. Resize the browser to phone width. The top navigation wraps onto its own row with larger tap targets, the file tree stacks above the chat, and toolbar buttons feel comfortably large.
