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

- The Papers / Books / Web / Preprints tabs on the right now actually filter the source list, and the count under the heading updates to show how many sources are visible. A small caption ("Showing 4 papers") explains what you're looking at.
- The "Sort" dropdown on the source list now actually sorts by relevance, date, or citation order, and a toast confirms the change.
- Clicking a citation chip in the conversation now smoothly scrolls to the matching source and briefly flashes it yellow so you can spot it.
- The threads in the left rail are now clickable. Picking one updates the page title and shows a short summary; the active thread is highlighted with a colored stripe.
- The "+ New thread" button now actually clears the conversation, shows an empty "What would you like to research?" prompt, and puts the cursor in the message box.
- Sending a message now shows your message immediately, a "Searching sources…" status line under it, and a spinner in the Ask button until the reply arrives.
- Trying to send an empty message no longer does nothing — it shows a "Type a question first" toast and focuses the input.
- "Share thread" now opens a dialog with a copy-able link to the current thread.
- "Export as PDF" now shows a brief "Preparing PDF…" state, then opens your browser's print dialog.
- On phones and narrow screens, a "☰ Threads" button appears at the top — tapping it slides the thread rail in from the left over a dimmed backdrop.
- The conversation, composer, source tabs, and other buttons are all noticeably larger and easier to tap, and have clearer focus outlines for keyboard users.
- A small hint under the first assistant message explains "tap a citation chip like [1] to jump to its source on the right".

## How to test the changes

1. Open `index.html`. On the right rail, click "Papers" — only papers remain visible and the count next to "Sources" updates (e.g. "5"). The caption underneath reads "Showing 5 papers".
2. Click "All" to bring everything back. Change the Sort dropdown to "Date" — the order of source cards changes and a toast confirms "Sources sorted by date".
3. In the conversation, click any citation chip like `[4]`. The page scrolls smoothly to that source and the card briefly flashes yellow.
4. In the left rail, click "EV battery recycling policy in Norway". The page title at the top changes, the conversation is replaced by a short summary, and the active thread gets a colored stripe on its left edge.
5. Click "+ New thread" at the top of the left rail. You'll be asked to confirm; pick OK. The conversation clears and the message box is focused.
6. Type a question and press Enter. Your message appears immediately, a "Searching sources…" status appears underneath, the Ask button shows a spinner, and a reply comes back about a second later with a "Reply ready" toast.
7. Try pressing the Ask button with an empty box — a toast says "Type a question first" and the box gets focus.
8. Click "Share thread" in the top right. A dialog opens with a copy-able link. Click "Copy link" — a toast confirms the link is on your clipboard.
9. Click "Export as PDF". The button shows "Preparing PDF…" briefly, then the browser's print dialog opens.
10. Shrink the browser to a phone-sized width. A "☰ Threads" button appears at the top. Tap it — the thread list slides in from the left with a dimmed backdrop. Tap the backdrop to close.
