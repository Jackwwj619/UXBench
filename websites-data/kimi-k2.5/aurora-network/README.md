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

- The **Profile** and **Account** links in the side nav (and other top-level placeholder links) now show a small "isn't available in this demo" toast at the bottom of the screen, instead of silently doing nothing.
- The **Discard changes** button on the default-audience page now actually works. If you changed your audience choice, clicking it reverts to the original choice and shows an orange "Changes discarded" banner. If there were no changes, it shows a friendly "No unsaved changes to discard" message.
- The **+ New list** button on the default-audience page now opens a small dialog where you can name your new custom list. Once created, the list appears at the bottom of the custom lists area, and a toast confirms it.
- Existing custom-list rows on the default-audience page are now clickable and keyboard-focusable. Clicking one opens a "Manage list" dialog showing its name and member count.
- The **Import .txt** button on the muted-words page now lets you pick a text file from your computer. Each non-empty line becomes a new muted word.
- The **Export .txt** button on the muted-words page now downloads all your muted words as a `.txt` file you can save.
- A green "saved" banner now appears for a few seconds when settings are saved on the default-audience page, with proper colors so it stands out.
- All buttons and side-nav links are taller (at least 44px) on phones so they're easier to tap.

## How to test the changes

1. Open `index.html`. In the side nav, click **Profile** or **Account** — a small dark toast appears at the bottom saying it isn't available in this demo.
2. Open `audience.html`. Change the audience radio from its current value, then click **Discard changes** — the page reverts to the original choice and an orange banner explains what happened.
3. On the same page, click **+ New list**. A small dialog opens with a name field. Type a name, click **Create list**, and the list appears at the bottom of the custom lists. A toast confirms it was created.
4. Click any of the existing custom-list rows (Close friends, Work circle, etc.) — a dialog opens showing the list's name and member count. Try Tabbing to one and pressing Enter — it should open the same way.
5. Open `blocked-words.html`. Click **Export .txt** — your browser downloads a file with all the seed muted words.
6. Click **Import .txt** and pick any text file (one word per line) — each line gets added as a muted word and a toast confirms how many were imported.
7. Shrink the browser to phone width. The side nav links, buttons, and chip remove (×) buttons should all be tall enough to tap easily.
