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

- The **Papers / Books / Web / Preprints** tabs above the source list now actually filter the right rail. Picking "Books" leaves only book sources visible, and the "Sources" counter in the header updates to match.
- The **Share thread** and **Export as PDF** buttons in the canvas header now do something: Share copies the page URL to the clipboard and shows a toast, Export shows a "Preparing PDF export…" then "PDF export ready (demo)" toast pair.
- Submitting a follow-up question now shows a typing indicator (three bouncing dots and "Lumen is thinking…") while the assistant prepares its reply, and the composer is briefly disabled so you can't queue duplicates.
- Every dropdown, the textarea, and the source tabs now have proper labels for screen readers, so it's clear whether a `select` is for "sort sources", "response depth", or "response mode".
- On a phone-width window the canvas header collapses behind a single menu (`☰`) button — tap it to reveal Share / Export / Mode in a stacked panel — and the composer reflows so the textarea is full width with the attach and send buttons below.
- The canvas header is no longer translucent on top of the body; it uses a solid background so the heading text doesn't blur into the message above it as you scroll.
- A new toast system at the bottom of the screen handles all the new feedback messages without resorting to browser `alert()` dialogs.

## How to test the changes

1. Open `index.html`. In the right rail, click the **Books** tab — only the "BRAC overview" book row stays visible and the "Sources" count in the header drops to 1. Click **All** to bring everything back.
2. In the canvas header click **Share thread** — a toast appears at the bottom saying "Thread link copied to clipboard". Click **Export as PDF** and watch the two-step toast sequence.
3. Type "What about adolescents?" into the composer and press Enter. A typing indicator with bouncing dots appears in a new assistant message while the composer is disabled; after about a second the indicator is replaced by the mock reply.
4. Open the page in a screen reader or hover the right-rail dropdowns — each `select` announces a label like "Sort sources by" or "Select response depth".
5. Resize the browser to phone width. The header collapses to a `☰` button; tap it to reveal Share / Export / Mode in a vertical panel. The composer reflows so the textarea sits above the attach and send controls.
