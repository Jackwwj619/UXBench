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

- **Past threads now actually load.** Clicking any conversation in the left rail swaps the main canvas to that thread's title and a fresh assistant reply, instead of doing nothing.
- **Filtering or sorting sources gives visible feedback.** When you change the type tab or the sort menu on the right, the sources list briefly flashes and scrolls back to the top so you can see it updated.
- **Changing the research mode in the header confirms itself.** The dropdown at the top of the conversation briefly highlights in orange when you pick a new mode, so you know your choice registered.
- **Bigger, easier tap targets.** Buttons, the attachment icon, dropdowns, and the Send button are all taller and wider, which makes them much easier to hit on a phone or with a trackpad.
- **Better screen-reader labels everywhere.** Every dropdown, the prompt box, and the attachment button now announce what they're for, and the source-type tabs and history list are grouped so assistive tech can navigate them properly.
- **Mobile layout cleanup.** On narrow screens the header and action buttons wrap onto multiple lines instead of overflowing, the composer rearranges so the send controls sit on their own row, and message bubbles use the full width. Long tables in answers can now scroll sideways instead of breaking the layout.

## How to test the changes

1. Open `index.html`. In the left rail, click "EV battery recycling policy in Norway" (or any other past thread) — the main title and the conversation should change to match. Click "Deep work scheduling literature" to return to the original.
2. On the right rail, click between the All / Papers / Books / Web / Preprints tabs, or change the sort dropdown — the source list should briefly flash and scroll to the top each time.
3. At the top of the conversation, change the dropdown next to "Share thread" / "Export as PDF" — it should briefly turn orange to confirm the change.
4. Resize the browser window down to phone width. The header buttons should wrap to a new line, the composer's Send button should sit on its own row, and nothing should overflow horizontally.
5. Try tapping the paperclip attachment icon and the Send button on a touch device or with a small browser window — they should both be comfortably large to hit.
