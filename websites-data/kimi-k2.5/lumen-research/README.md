# Lumen Research

Lumen Research is a demo research-assistant chat — the kind of tool you'd use to ask a question and get an answer that cites real sources you can click through to. Citations in the chat are linked one-to-one with source cards on the right rail.

> Fictional product — the conversation, sources, and relevance scores are pre-written.

## What you can do

- **Read a researched answer.** The center column shows a conversation in a serif body font. Each assistant turn has inline citation chips (`[1]`, `[2]`, …); hover one to highlight the matching source on the right, click to jump straight to it.
- **Inspect the sources.** The right rail shows source cards with title, citation metadata, a relevance bar (0–1), and a one-line snippet. Filter by type (All / Papers / Books / Web / Preprints) or change the sort. Hovering a card highlights its citation chip back in the chat.
- **Ask a follow-up.** Use the composer at the bottom — Enter submits, Shift+Enter adds a newline. Choose how deep to research (Balanced / Quick scan / Deep dive) before sending.
- **Pick up a suggested thread.** A row of follow-up question chips suggests what to ask next; click one to pre-fill the composer.
- **Switch between past threads.** The left rail groups your research history by recency (Today / Last 7 days / Earlier).

## How to use it

Open `index.html` in any modern browser. Read the existing conversation, click any citation chip to jump to the corresponding source, and try a follow-up question in the composer. Use the type tabs and sort on the right rail to narrow down sources.

## What was changed in this version

- The threads in the left rail are no longer just labels — clicking any one of them now switches the conversation and sources in the middle to that thread's actual content. A small toast confirms which thread you loaded.
- The **+ New thread** button at the top of the left rail now actually starts a fresh thread, adds it to the list, and clears the conversation so you can begin a new question.
- The follow-up suggestion chips below the composer now send the question for you instead of just filling the box, so you get an answer with one click instead of two.
- After you send a question, a "thinking…" bubble with animated dots appears briefly before the answer shows up, so it feels like the assistant is working.
- Clicking a citation chip in the chat now highlights the matching source on the right for almost two seconds before fading, making it easier to spot.
- The **Share thread** button now copies a link to your clipboard and shows a "Share link copied" toast, and the **Export as PDF** button opens the print dialog.
- Switching the source-type filter (All / Papers / Books etc.) now shows a small toast confirming the filter is active.
- Citation chips can now be focused with the keyboard, and they highlight their matching source the same way as hovering does.

## How to test the changes

1. Open `index.html`. Click "EV battery recycling policy in Norway" in the left rail — the conversation and source cards in the middle and right should change to a different topic, and a toast should confirm the load.
2. Click "+ New thread" at the top of the left rail — a new thread is added to the list, the conversation clears and shows a welcome line, and your cursor moves to the message box.
3. Below the composer, click any of the suggested follow-up chips — the question should be sent automatically and an answer should appear after a brief thinking animation.
4. Click any "[1]" or "[2]" citation chip in the assistant's reply — the matching source card on the right should highlight and stay highlighted for a moment.
5. Press Tab from the message box to reach a citation chip with the keyboard — the matching source on the right should highlight.
6. Click the **Share thread** button in the header — a toast says the link was copied. Click **Export as PDF** — your browser's print dialog should open.
7. On the right rail, click "Papers" in the source-type tabs — a toast at the bottom should say "Filtered: Papers".
