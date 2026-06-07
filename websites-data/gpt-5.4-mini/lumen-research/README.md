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

- The source-type tabs (All / Papers / Books / Web / Preprints) now actually filter the source cards on the right. The number badge next to "Sources" updates to show how many match, and if a tab has no matches you'll see a friendly "No sources match this filter" message.
- Clicking the tab "Web" — which has no entries in this demo — now shows the empty-state message instead of leaving the list unchanged.
- The past-thread links on the left now actually open: clicking one highlights it, swaps the title at the top of the conversation, and shows a small confirmation popup.
- The "Share thread", "Export as PDF", "New thread", attach (paperclip), and the depth, mode, and sort dropdowns all now do something when used — a small popup tells you what happened (for example, "Share link copied to clipboard" or "Depth: Deep dive").
- Pressing Ask with an empty composer no longer silently does nothing — it nudges you with "Type a question first" and puts the cursor back in the box.
- After you send a question, you see animated "Lumen is searching sources…" dots before the reply appears, so it feels like the assistant is working.
- Suggested follow-up chips give a brief visual press and a small confirmation popup when you click them, so you know they landed in the composer.
- The citation chips in the answer can now be reached with the keyboard (Tab to focus, Enter or Space to open the source), and the matching source card gets a stronger highlight outline.
- Buttons, dropdowns, chips, and tabs are all taller and easier to tap, and there's a clear focus outline when you Tab around with the keyboard.
- On a phone or narrow window, the left rail of past threads is hidden behind a new "☰ Threads" button at the top, and slides in over a dim background when tapped. The composer, header buttons, and source tabs also re-stack so they don't overflow.

## How to test the changes

1. Open `index.html`. Click "Papers" in the sources tabs on the right — only paper-type sources should remain and the small number badge next to "Sources" should drop. Click "Web" — you should see the "No sources match this filter" message. Click "All" to restore everything.
2. In the left rail, click any thread under "Today", "Last 7 days", or "Earlier" — the heading at the top of the conversation should change to that thread's name and a small popup should appear at the bottom.
3. Click "Share thread" in the top bar — a popup should confirm the link was copied. Click "Export as PDF" — a popup should say it's preparing, then ready. Change the "Mode" dropdown — a popup should confirm the new mode.
4. In the composer at the bottom, press "Ask" without typing anything — you should see a "Type a question first" prompt instead of nothing. Now type a question and press Ask — animated dots and a "Lumen is searching sources…" line should appear briefly before the reply.
5. Click any of the suggested follow-up chips below the composer — the chip should briefly press in, the text should fill the composer, and a popup should confirm it.
6. Click the paperclip icon to the left of the composer — a popup should mention attaching a file.
7. Use the Tab key to move across the citation chips like `[1]` in the conversation. When focused, press Enter — the matching source card on the right should highlight and scroll into view.
8. Shrink the browser window narrow (or open on a phone). The left rail should disappear and a "☰ Threads" button should appear at the top — tap it to slide the rail in over a dimmed background.
