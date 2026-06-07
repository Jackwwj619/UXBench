# Aurora Network — Privacy & Audience

Aurora Network is a demo privacy settings area for a social network — the kind of pages you'd visit to control who sees your posts, who can tag you, and what words you don't want to see. It's organized around five separate privacy surfaces.

> Fictional product — settings save to the page state only; nothing leaves your browser.

## What you can do

- **See your privacy at a glance.** The overview page lists your current defaults — who sees new posts, whether tag review is on, how many muted words you have — so you can spot anything that's off.
- **Set who can see new posts.** Choose between Public, Friends, a custom list, or only yourself. The page shows in plain language what each choice means and lets you build custom audience lists.
- **Review tags before they go live.** The pending-tag queue shows seven posts where someone tagged you; approve them, hide just the tag, or block the user outright. Bulk actions handle the whole list at once.
- **Tighten up old posts.** The past-posts view shows a year-by-year chart of how much you've posted and lets you change the audience on every visible post in one click.
- **Mute words and phrases.** Add words you don't want to see, choose where the mute applies (feed, comments, DMs, notifications), and set how long it lasts.

## How to use it

Open `index.html` in any modern browser. From the overview, click any of the four cards to jump to that privacy area. Each surface is self-contained — change a setting and you'll see the explanation update immediately.

## What was changed in this version

- On the overview, the "Change" links for settings that don't have a page yet (profile visibility, search-engine indexing, online status) are now labelled "In Profile settings" / "In Account settings" instead of pretending to be working links. The story-audience and "Allow tags from" rows now point to the right pages.
- On the default-audience page, the action bar now shows an "Unsaved changes" hint as soon as you pick a new option, and the **Discard changes** button actually reverts your selection back to what was saved.
- A small "More privacy settings ↓" link in the action bar jumps straight down to the "Who can tag you?" section.
- The "Who can tag you?" choices are now full-width tappable rows with clear borders, not cramped radio buttons, and changes save instantly with a toast at the bottom of the screen.
- After saving the default audience, you now also see a brief confirmation toast at the bottom ("Saved — default audience set to Friends").
- Approving, hiding, or blocking a tag on the tag-review page now shows a confirmation toast naming the person, and the count badge in the sidebar updates along with the one in the page header.
- The **Hide all** button on the tag-review page now actually works, asking you to confirm and then clearing the queue with a "Hid N tags" toast. Both bulk buttons grey out when the queue is empty.
- On the past-posts page, the year, audience, and bulk-restrict dropdowns now have proper labels above them so it's clear what each one controls, and the **Apply to visible** action shows a toast saying how many posts were changed.
- On the muted-words page, trying to add an empty entry now shows "Type a word or phrase to mute." and trying to add a duplicate shows "'X' is already in your muted list." instead of silently doing nothing.
- Removing a muted word now shows a toast with an **Undo** button that puts the word back in the same spot.
- The scope checkboxes and the duration dropdown on the muted-words page now show a confirmation toast each time you change them, so you know the change took effect.
- The Cancel/Confirm buttons in dialog popups (used by Block user, Apply to visible, Approve all, Hide all) now reliably respond every time, and pressing Escape closes the dialog. Dangerous actions focus the Cancel button by default.
- Tap targets across the site are bigger on phones: tag-review action buttons, side-nav links, the chip-remove × button, and tagging-permission rows are all at least 40-44 pixels tall, and on narrow screens the Approve/Hide/Block buttons stack in a clearer grid.

## How to test the changes

1. Open `index.html`. In the Snapshot panel, rows that don't have a real settings page now show a grey "In Profile settings" or "In Account settings" tag instead of a "Change" link. The "Allow tags from" row links into the tag-permissions section of the audience page.
2. Open `audience.html`. Click a different audience option (e.g. **Public**). An "Unsaved changes" message appears next to the Save button. Click **Discard changes** — the selection snaps back to Friends and a toast says "Changes discarded."
3. Still on `audience.html`, click the "More privacy settings ↓" link in the action bar — the page scrolls down to "Who can tag you?". Pick a different option there and a toast immediately confirms the change.
4. Open `tag-review.html`. Click **Approve** on any card — it fades out and a toast names the person whose tag you approved. The count badge in the left rail drops by one. Click **Hide all** — confirm in the dialog — the queue empties and a "Hid N tags" toast appears.
5. Click **Block user** on a card, then press the Escape key in the dialog — it closes without blocking. Re-open and click **Block** — the card fades out and a toast appears.
6. Open `past-posts.html`. The Year, Audience, and "Restrict to" dropdowns now have small labels above them. Pick a year filter, then click **Apply to visible** — confirm, and a toast says how many posts were restricted.
7. Open `blocked-words.html`. Click **Mute** with the box empty — a red error appears. Type a word already in the list (e.g. "crypto airdrop") and submit — the duplicate error appears. Add a new word — a toast says "Muted 'X'".
8. Click the × on any chip — the chip disappears and a toast with an **Undo** button appears. Click **Undo** within a few seconds and the chip reappears in the same spot.
9. On the same page, tick or untick a scope checkbox (e.g. "Home feed") or change the duration dropdown — a confirmation toast appears each time.
10. Shrink the browser to phone width on `tag-review.html` — the Approve / Hide tag buttons sit in a two-column grid above a full-width Block user button, all comfortably tappable.
