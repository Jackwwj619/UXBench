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

- A small toast pops up at the bottom of the screen after every save (approve a tag, mute a word, restrict old posts), so you can see exactly what happened. Toasts are green for confirmations and grey when nothing changed.
- The overview page now remembers your default audience and your most recent bulk past-post change, so the "Snapshot" panel reflects the choices you made on the other pages instead of showing static text.
- The **Hide all** button on the tag-review page now actually works — it asks you to confirm, then hides every pending tag at once and shows a green confirmation.
- The confirmation dialogs (used for "Approve all," "Hide all," and bulk past-post changes) are now more reliable: the keyboard Enter and Escape keys work, the buttons are larger and easier to tap, and the dialog can no longer get stuck behind other elements.
- The "Where do mutes apply?" checkboxes on the muted-words page now have a live summary that updates as you check or uncheck them, e.g. "Applies to: Home feed, Comments on your posts." Each checkbox row is a larger, tappable card with a clear "on" highlight.
- The bulk "Restrict visible posts" control on the past-posts page now shows a green status note saying how many posts were updated and to what audience, in addition to the toast.
- Tap targets across the topbar, side nav, action buttons, and tag-action buttons are larger on phone-sized screens, so they're easier to hit on touch devices.
- Form fields (the muted-word input, year/audience filters, and mute duration) now have proper hidden labels and tooltips, so screen-reader users get the same information sighted users see.

## How to test the changes

1. Open `audience.html`, choose a different option (say, **Public**), and click **Save**. A green toast appears at the bottom, and the in-page banner updates. Now open `index.html` — the "Default post audience" line in the Snapshot now reads "Public."
2. Open `tag-review.html` and click **Approve** on any pending tag. A green "Tag approved" toast appears and the count badge drops by one. Click **Hide all** at the top, confirm, and the rest of the list disappears with a "Hidden N tags" toast.
3. On `tag-review.html`, open the **Approve all** confirmation dialog. Press Escape — the dialog closes with a grey "No changes made" toast. Reopen it and press Enter — it confirms and a green toast appears.
4. Open `past-posts.html`, leave the filters as-is, pick an audience from the **Restrict visible posts to** dropdown, and click the bulk button. After confirming, a green status note appears under the controls saying how many posts were updated. Reopen `index.html` to see the new line in the Snapshot.
5. Open `blocked-words.html`. Tick and untick a few of the "Where it applies" checkboxes — the "Applies to:" sentence below updates immediately and a toast notes each on/off change.
6. Type a new phrase into the muted-words input and press Enter — the chip appears in the list with a green "Muted [word]" toast.
7. Resize the window to a phone width and revisit any page — the buttons, tag actions, and side nav links are noticeably larger and easier to tap.
