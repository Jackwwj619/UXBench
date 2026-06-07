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

- The gear icon in the bottom-left corner is now a proper "Settings" button with both a cog and the word "Settings"; clicking it slides a Settings & Privacy panel in from the right with Account, Preferences, and Privacy sections. Press Escape, click the X, or click outside to close.
- The "..." more-options button at the top of the conversation now opens a real menu with Rename thread, Export as Markdown, Archive thread, and Report a problem.
- Trying to send an empty message no longer silently does nothing — a small dark toast at the bottom says "Type a question first" and focuses your cursor in the box.
- After you send a message, the send arrow disables itself and shows a small spinner-style "…" until the tutor's reply finishes, so it's clear the request is in flight. Most other actions also pop a short confirmation toast (e.g. "Message sent", "Code copied to clipboard").
- The suggestion chips under the composer now add to whatever you're already typing instead of replacing it, and the chip flashes green for a moment after you click it.
- Each message's feedback buttons (👍 / 👎 / Share / Copy / Try again) now do something — they highlight, change their label (e.g. "✓ Copied"), and show a toast. Copy actually copies the reply text to your clipboard.
- The paperclip and microphone icons in the composer now respond: the paperclip shows "Attachments are not available in this preview" and the mic toggles a red "listening" state.
- The "Key concepts" links in the right rail are now clickable — clicking one highlights it with a green stripe and shows a confirming toast.
- The "+ New chat" button in the left rail now shows a "Started a new chat" toast when clicked.
- The "▶ Practice" button in the chat header now opens the practice panel as a slide-in drawer on narrow screens (instead of the panel just being hidden), and the first practice card flashes briefly so you can see where it is. A "✕ Close" button at the top of the drawer dismisses it.
- On a phone, hitting Enter in the composer now sends the message (without needing Cmd/Ctrl), and the header buttons stack into a wrapped row that's easier to tap.
- Buttons throughout (settings, header tools, send arrow, message feedback, composer icons, suggestion chips) are noticeably bigger with clearer tap targets.

## How to test the changes

1. Open `index.html`. In the bottom-left corner, click the new "⚙ Settings" button — a panel slides in from the right with Account, Preferences, and Privacy sections. Press Escape to close it, then re-open it and click the ✕ button.
2. In the conversation header (top of the middle column), click the "⋯" button — a menu drops down with Rename / Export / Archive / Report items. Click any one to see a toast confirming the action.
3. At the bottom of the page, click the send arrow with an empty message box — a small dark toast says "Type a question first". Type any text and press send; the arrow disables itself briefly while the reply loads.
4. Type a few words into the message box, then click one of the suggestion chips (e.g. "tan(√x) — derive it"). The chip's text appends to what you typed and the chip flashes green for a moment.
5. Under any tutor reply, click the 👍, ⤴ Share, or 📋 Copy button — each highlights, briefly changes its label (e.g. "✓ Copied"), and shows a toast. The Copy button actually copies the message text.
6. In the composer row, click the paperclip — a toast says attachments aren't available. Click the microphone — it turns red to indicate listening; click again to stop.
7. In the right rail under "Key concepts", click any link (e.g. "Chain rule"). It highlights with a green stripe and a toast confirms the choice.
8. In the left rail, click "+ New chat" near the top — a toast says "Started a new chat".
9. Shrink the browser to phone width and click "▶ Practice" in the chat header — the practice panel slides in from the right with a "✕ Close" button at the top. The first practice card flashes briefly so you can spot it.
10. On phone width, type a message into the composer and press Enter (no modifier) — the message sends.
