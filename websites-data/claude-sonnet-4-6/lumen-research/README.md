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

- The "Share thread", "Export as PDF", "+ New thread", and paperclip attach buttons now show a small confirmation message at the bottom of the screen ("not available in this demo") instead of doing nothing when clicked.
- Past threads in the left rail that don't have real content are now clearly marked as demo placeholders, and clicking one shows a polite "demo placeholder" message instead of silently doing nothing.
- The research-mode dropdown in the header and the depth dropdown above the composer now stay in sync — changing one updates the other so you can't end up with conflicting settings.
- A short legend was added below the source list explaining what the relevance bar (0–1) actually means.
- The sort dropdown, depth selector, and attach button now have proper labels so screen-reader and keyboard users can tell what each control does.

## How to test the changes

1. Open `index.html`. Click **Share thread** or **Export as PDF** at the top — a small toast message should appear at the bottom of the page.
2. Click the **+ New thread** button in the left rail, or the paperclip icon in the composer — both should also show a toast.
3. In the left rail, click any thread other than "Deep work scheduling literature" (e.g. "EV battery recycling policy in Norway"). It's styled as a placeholder and shows a toast when clicked.
4. Change the mode dropdown in the header bar (top-right) — the depth dropdown above the composer should change to match, and vice versa.
5. Look just under the sources list on the right; you should see a one-line explanation of the relevance score.
