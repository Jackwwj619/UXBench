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

- Most actions now show a brief toast at the bottom of the screen confirming what happened (for example "Tag approved", "Default audience saved", "Muted 'spoiler'").
- The "Home" link in the top nav is now visibly disabled and pops a "Home is not available in this demo" toast instead of silently doing nothing.
- The "Discard changes" button on the default-audience page now actually works — it puts the radio selection and the explanation text back to whatever you last saved, and tells you if there's nothing to discard.
- The bulk "Hide all" button on the pending-tags page now asks for confirmation and then clears the queue (previously only "Approve all" worked).
- The pending-tags page now also keeps a small counter next to the heading in sync with how many tags are left, so you can see the queue empty in real time.
- The "Export .txt" button on the muted-words page now actually downloads a text file with all your muted words. "Import .txt" still tells you it isn't available in this demo.
- Confirmation pop-ups can now be dismissed with the Escape key, and they no longer break if you click them twice.
- Radio buttons and checkboxes throughout the privacy pages are larger, with bigger, easier-to-tap rows. The little "x" on each muted-word chip is also a bigger tap target.
- The "Add a muted word" box now has a proper label for screen readers.

## How to test the changes

1. Open `index.html` and click "Home" in the top nav — the link looks dimmed and a toast saying "Home is not available in this demo" should slide up from the bottom.
2. Open `audience.html`, change the audience from Friends to Public, click **Save changes** — a green banner appears and a toast says "Default audience saved". Change it again to Custom list, then click **Discard changes** — it should snap back to Public.
3. On `tag-review.html`, approve one tag and hide another — each should show a toast and the count next to "pending tags" should drop. Click **Hide all** — you should get a confirmation dialog, and accepting it should clear the queue.
4. While a confirmation dialog is open, press the **Escape** key — the dialog should close as if you clicked Cancel.
5. Open `blocked-words.html`, type a new word and press Enter — a toast like "Muted 'foo'" appears. Click **Export .txt** — your browser should download a `muted-words.txt` file containing every muted word.
6. On the same page, click **Import .txt** — a toast should say it's not available in this demo.
7. Shrink the browser to phone width and try tapping the radio rows under "Who can tag you?" — they should be tall, clearly clickable, and highlight on hover.
