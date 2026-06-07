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

- Top-bar and side-nav links that don't lead anywhere in this demo (Home, Discover, Messages, Profile, Account, Email, Push) are now visibly greyed out so you can tell which links are real and which are placeholders.
- On the Default audience page, the **+ New list** button now opens a small panel where you can name and create a new custom list, and the list appears in place. Saving shows a green confirmation toast at the bottom of the screen.
- Picking an audience option now shows a small "Selected — press Save default to apply" pill next to it, so it's obvious the change isn't saved until you click Save.
- The "Who can tag you?" choice now has a live summary underneath that reads back the active rule (e.g. "People you follow can tag you") with a "Saved" badge.
- On the Past post visibility page, the year, audience, and a new visibility filter (Visible to others / Hidden) each have a clear label above them, and a sticky summary bar at the bottom always shows which posts will be affected by a bulk action and how many.
- The bulk-restrict button on past posts now confirms with a green toast saying exactly how many posts were updated, and the list refilters automatically afterward.
- On the Muted words page, picking a duration (Forever / 30 days / 7 days / 24 hours) now shows a plain-English explanation of what that means, including the date the words will automatically unmute.
- Tap targets across the top bar, side nav, and buttons are larger and easier to use on phones, and form selects on past posts now stack into a single column on small screens.

## How to test the changes

1. Open `index.html`. Look at the top nav and the side nav — Home / Discover / Messages / Profile / Account / Email / Push should appear greyed out and not respond to clicks, while Overview / Default audience / Tag review / Past post visibility / Muted words still work.
2. Open `audience.html`. Click **+ New list**, type a name (try leaving it blank first to see the prompt), then click **Create list** — it should appear in the list and a green toast should pop up at the bottom.
3. Still on `audience.html`, click any audience option — a small pill should appear saying it's not saved yet. Click **Save default** to see the confirmation toast.
4. Change the "Who can tag you?" radio to a different option and watch the line below update to read back the new rule with a "Saved" badge.
5. Open `past-posts.html`. Change the year, audience, or new Visibility filter — the sticky bar at the bottom should update the count and the scope. Click **Apply to visible** and confirm — you should see a toast saying exactly how many posts were updated.
6. Open `blocked-words.html` and pick "7 days" from the Duration of mute dropdown — the text underneath should change to explain the duration and show when the words will automatically unmute.
7. Shrink the browser to phone width on `past-posts.html` — the filter dropdowns should stack into a single column with clear labels above each.
