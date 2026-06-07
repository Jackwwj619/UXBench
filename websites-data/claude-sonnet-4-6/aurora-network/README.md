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

- The "Discard changes" button on the Default audience page now actually reverts your selection to what was saved when the page opened, and a small banner confirms it.
- The "Save default audience" button now shows a clear "✓ Saved" confirmation and briefly disables itself so you can't double-click it.
- The "+ New list" button on the Default audience page now opens a real form. You can name a list, add comma-separated handles, and the new list appears below — with friendly errors for empty or duplicate names.
- The Muted words page now stops you from adding a word you're already muting; it flashes the existing chip and explains why instead of silently doing nothing.
- The Import .txt and Export .txt buttons on Muted words now work. Export downloads your muted words as a real text file; Import opens a file picker and adds new words while skipping duplicates.
- The Past-post visibility page now has clear labels above the year and audience filters, so it's obvious what each dropdown does.
- The Tag review page now keeps the side-nav badge, the heading count, and the bulk-bar wording in sync when you approve, hide, or block tags.
- The four "Change" links on the overview page that didn't go anywhere are now greyed out with a "Coming soon" tooltip. The two that do work ("Story audience" and "Allow tags from") jump straight to the right section of the audience page.
- On a phone or narrow window, the left-side settings nav now collapses behind a "Settings menu" button at the top so the main content gets the full screen.

## How to test the changes

1. Open `index.html`. Hover the greyed-out "Change" labels for a "Coming soon" tooltip. Click "Story audience → Change" — it jumps to the custom lists section on the audience page.
2. On `audience.html`, pick a different audience option, click "Discard changes" — you're returned to the original selection with a banner. Then change again and click "Save default audience" — a green "✓ Saved" confirmation appears.
3. Still on `audience.html`, click "+ New list". Try submitting with an empty name (error appears), then enter a unique name like "Studio cohort" and a couple of handles — a new list row appears at the bottom.
4. Open `blocked-words.html`. Add a word, then try to add the same word again — the existing chip flashes amber with a "you're already muting…" message. Click "Export .txt" — a file downloads. Click "Import .txt" and choose your downloaded file — it tells you how many were imported and skipped.
5. Open `past-posts.html` — each dropdown now has a label above it.
6. Open `tag-review.html` and click "Approve" on a card — the heading count, the bulk-bar text, and the sidebar badge all decrease together.
7. Shrink the browser window to phone width on any page — the left nav collapses into a "Settings menu" button you can tap to open and close.
