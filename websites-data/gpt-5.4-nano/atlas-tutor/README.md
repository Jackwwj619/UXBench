# Atlas Tutor

Atlas Tutor is a demo AI tutor that helps students work through math, programming, physics, statistics, and linear algebra problems one step at a time. The example conversation walks through the chain rule in calculus, but the layout is built for any subject you'd ask a tutor about.

> Fictional product — replies are pre-written for the chain-rule walkthrough, not generated live.

## What you can do

- **Read a worked example.** The conversation in the center shows a full back-and-forth: a student asks about differentiating `sin(x²)`, and the tutor explains where the chain rule comes from, walks through a harder three-layer problem, and finishes by writing a Python helper using SymPy.
- **Practice on your own.** The right rail has six chain-rule problems with difficulty pills. Hit **Solve** to mark one as done; hit the hint button if you're stuck. Your progress bar updates as you finish problems.
- **Browse past chats and subjects.** The left rail groups your tutoring history by recency (Today / Last 7 days / Earlier) and lets you jump between subjects.
- **Ask follow-ups.** Type into the composer at the bottom (Cmd/Ctrl+Enter sends), or tap a suggestion chip to pre-fill the box. Each tutor reply shows briefly as "Thinking…" before the answer appears.
- **Copy or run code samples.** Code answers come with **Copy** and **Run** buttons; Run reveals a sample output panel inline.

## How to use it

Open `index.html` in any modern browser. Read through the existing chain-rule conversation, click the practice problems on the right to mark them solved, or type a new question into the composer to send another turn. Use the **Step-by-step mode** toggle in the chat header if you want the tutor to slow down its explanations.

## What was changed in this version

- Almost every button now confirms what it did with a small popup notification at the bottom of the screen — sending a message, copying code, accepting a thumbs-up, and so on.
- The gear icon at the bottom of the left rail now opens a real Settings dialog (Step-by-step explanations, Hints, Sound, Privacy, Model, Account). Press Escape or click outside to close; "Save" shows a "Settings saved" notification.
- The "..." button next to Practice in the chat header now opens a menu with Rename thread, Export conversation, Archive, Report a problem, and Clear thread.
- The "▶ Practice" button now visibly turns on and off, and on a phone it scrolls the practice panel into view.
- The hint button on a practice problem now toggles — click it once to show the hint, click again to hide it.
- "Solve" no longer marks a problem instantly correct — it shows a "Checking…" spinner for a moment, then turns into a green "Correct" badge with a status line below.
- The thumbs-up and thumbs-down on tutor replies now stay visibly pressed when you tap them, and tapping the opposite one swaps the highlight.
- The "Copy" and "Share" buttons on messages now actually copy text and show a quick "Copied" confirmation.
- The "Run" button on code samples now shows a brief "Running…" state before revealing the output panel.
- The paperclip, microphone, and "+ New chat" controls now respond to clicks with helpful notifications and put your cursor in the message box.
- Buttons, hint chips, and tap targets throughout the page are larger and easier to use on a phone.

## How to test the changes

1. Open `index.html`. Click the gear icon at the bottom of the left rail — a Settings dialog opens with several rows of options. Press Escape or click outside to close, or click "Save" to see the "Settings saved" notification.
2. In the chat header (top right of the conversation), click the "..." button. A menu appears with five items (Rename, Export, Archive, Report, Clear). Pick any one and watch the matching notification appear.
3. Click "▶ Practice" in the chat header — the button highlights and a notification confirms it's on. Click again to turn it off.
4. In the right rail, click "Solve" on any practice problem — it briefly says "Checking…" before turning into a green "Correct" badge. Click "💡 Hint" — a yellow hint appears; click it again and the hint hides.
5. On any tutor reply, click the 👍 thumb — it stays highlighted in teal. Click 👎 and the thumb-up clears while thumb-down highlights in red.
6. On any code sample, click "Copy" — the button briefly says "Copied" and a confirmation notification appears. Click "Run" — it shows "Running…" for a moment, then the sample output slides in.
7. Click the paperclip and microphone icons in the message box — each shows a brief notification. Click "+ New chat" in the left rail — your cursor lands in the message box and "New chat ready" appears.
