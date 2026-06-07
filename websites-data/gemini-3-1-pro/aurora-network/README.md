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

- Saving the default audience now shows both the inline green banner and a polite toast at the top of the page, so the confirmation stays visible even when the banner is hidden under a sticky header on a phone.
- The "Tag review · 7" badge in the left sidebar now updates in real time as you approve, hide, or block tags — previously it stayed stuck at 7 forever.
- The "Approve all" button on the tag-review page no longer hard-codes "Approve all 7 tags". The confirmation dialog now uses the live count and disables the action when the queue is empty.
- The Import .txt and Export .txt buttons on the muted-words page actually work. Export downloads a real `aurora-muted-words.txt` file with one word per line; Import reads a `.txt` file and adds any new words to the list, skipping duplicates, with a toast that tells you how many were added.
- The "Edit" link on each row of the past-posts page is now a proper button that opens a "Per-post editing isn't available here" explanation, instead of pretending to be a working link that did nothing.
- The "+ New list" button on the audience page now shows a "coming soon" toast instead of silently doing nothing.
- The "Direct messages from friends" checkbox in Mute placement is now disabled with an "(always exempted)" hint, since muting friends' DMs wasn't actually implemented.
- The two filter dropdowns on the past-posts page now have proper labels for screen readers and autofill, as does the X button on every muted-word chip.

## How to test the changes

1. Open `audience.html`. Pick a different audience (e.g. Friends → Only me) and click Save. A green banner appears below the heading and a toast slides in from the top with the same confirmation.
2. Open `tag-review.html`. Approve, hide, or block any tag and watch the "7" badge in the sidebar drop in real time. When the queue is empty, the "Approve all" button stops triggering a confirm dialog.
3. Still on `tag-review.html`, click "Approve all" — the dialog title now matches how many tags are actually left (e.g. "Approve all 4 pending tags?").
4. Open `blocked-words.html`. Click Export .txt — a `aurora-muted-words.txt` file downloads with one word per line. Re-import it with the Import .txt button — a toast tells you "Imported 0 new muted words" because they all already exist; add a fresh line to the file and re-import to see the new chip appear.
5. Open `past-posts.html`. Click Edit on any post row — a modal explains that per-post editing opens in the composer (which isn't part of this demo).
6. On `audience.html`, click "+ New list" under "Custom lists" — a toast confirms the feature is coming soon instead of leaving you wondering whether the click registered.
