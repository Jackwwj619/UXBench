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

- The thread links in the left rail now actually work — clicking one switches the main pane to that thread, updates the page title, and shows a placeholder message for threads that don't have a saved conversation yet.
- The source type tabs (All / Papers / Books / Web / Preprints) now filter the source list when clicked, and the count at the top updates to match what you see.
- The Sort dropdown on the source rail now reorders the sources by relevance, date, or citation order, and confirms the choice with a small message at the bottom.
- The "Share thread", "Export as PDF", "+ New thread", and attach buttons in the header now respond when clicked, with small confirmation messages (Share copies a link to your clipboard).
- Sending an empty question now shows a friendly "Type a question first" message and keeps focus in the box, instead of silently doing nothing.
- The Ask button shows a "Thinking…" state and is disabled while the assistant prepares its reply, so it's clear something is happening.
- On phones, the left thread list and right source rail are no longer hidden — there are new "Threads" and "Sources" buttons at the top that slide them in from the sides, with a dimmed backdrop you can tap to close.
- Buttons, tabs, dropdowns, and the chat input throughout the page are larger and easier to tap, and screen readers now announce the proper labels for each control.

## How to test the changes

1. Open `index.html` and click any thread in the left rail (e.g. "EV battery recycling policy in Norway"). The main heading and the browser tab title should change, and a placeholder message should appear in the chat area.
2. Click the source-type tabs ("Papers", "Books", "Web") in the right rail — the list of sources should shrink to just the matching ones, and the number next to "Sources" should change.
3. Open the "Sort" dropdown in the right rail and pick a different option. The source cards should reorder, and a small confirmation message should pop up at the bottom.
4. Click "Share thread" in the top right — a message should confirm the link was copied. Click "Export as PDF" and watch it briefly disable while it "prepares".
5. Empty the chat input box and press the Ask button — you should see a "Type a question first" message instead of nothing happening.
6. Type a question and press Ask — the button should change to "Thinking…" and be disabled for a moment before the reply appears.
7. Shrink your browser to phone width (or open on a phone). The left rail and right rail disappear, replaced by "☰ Threads" and "Sources" buttons at the top. Tap either one to slide the panel in; tap the dimmed background or press Escape to close.
