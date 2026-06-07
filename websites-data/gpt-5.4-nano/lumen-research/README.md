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

- The **Share thread** button at the top now opens a small dialog with a shareable link and a Copy link button; clicking Copy briefly shows a confirmation message at the bottom of the screen.
- The **Export as PDF** button now shows a short message and opens your browser's print dialog so you can actually save the conversation as a PDF.
- The source-type tabs (All / Papers / Books / Web / Preprints) now actually filter the source list — picking "Books," for example, hides every non-book source and the count next to "Sources" updates to match.
- Clicking a citation chip in the conversation now scrolls to the matching source card and highlights it; if the source was hidden by a filter, the list switches back to "All" first so you can see it.
- Citation chips and source cards can now be reached with the keyboard — tab to a chip, press Enter or Space, and it jumps to the source just like a mouse click.
- The share dialog can be closed with the Escape key, and focus returns to where you were before.
- Buttons, tabs, dropdowns, and the attach paperclip are now large enough to tap comfortably on a phone-width screen, and the top bar wraps neatly instead of overflowing.
- Labels were added to the mode dropdown, depth dropdown, sort dropdown, attach button, and message box so screen readers announce what each control does.

## How to test the changes

1. Open `index.html`. Click **Share thread** in the top bar — a dialog appears with a link already selected. Click **Copy link** and a green confirmation message slides in at the bottom of the screen. Press Escape (or click outside the dialog) to close it.
2. Click **Export as PDF** — a short message appears and your browser's print dialog opens shortly after.
3. On the right rail, click the **Books** tab — only book entries remain visible and the number next to "Sources" drops to match. Click **All** to bring everything back.
4. With "Books" still selected, click any citation chip like `[1]` in the conversation. The list jumps back to **All**, scrolls the matching source into view, and briefly highlights it.
5. Click in the page, then press Tab repeatedly until a citation chip gets a visible outline. Press Enter — the matching source is highlighted and scrolled into view.
6. Resize the window to phone width — the top buttons wrap onto a second row, the source tabs wrap, and every control is tall enough to tap easily.
