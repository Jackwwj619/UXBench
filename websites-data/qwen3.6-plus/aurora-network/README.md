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

- **Acting on a pending tag now gives clear feedback.** When you Approve, Hide, or Block a tag in the queue, the card fades out gently and stamps a green "Approved", yellow "Hidden", or red "Blocked" pill before it disappears. A small toast message near the top confirms what just happened ("Tag approved", "Tag hidden — won't link to your profile", etc.).
- **The pending-tag counter is always accurate.** The number badge next to "Tag review" updates the moment you act on a card, and once the queue is empty the badge hides itself instead of showing a 0.
- **"Approve all" and "Hide all" now say how many.** The confirmation dialog uses the real number of tags still pending ("Approve all 5 pending tags?") instead of always saying 7, even if you've already cleared a few.
- **A real "Hide all" bulk action.** The Hide all button at the top of the tag queue now works the same way as Approve all — with a confirmation explaining that the post stays up but the tag won't link to your profile.
- **The "Who can tag you?" radios save automatically.** On the Default audience page, picking a new option (Anyone / People you follow / Only your friends / Nobody) briefly shows "Saving…" and then a green "Saved" pill, so you don't wonder whether you needed to press a save button.
- **You can't double-click yourself into trouble.** Once a tag card is being processed, its buttons are disabled so a quick second click doesn't fire the same action twice.
- **Buttons and links are easier to tap on phones.** Side-nav links, action buttons, and tag-action buttons are now taller, so the privacy pages are usable on a smaller screen.

## How to test the changes

1. Open `tag-review.html`. Click **Approve** on the first card — it should fade out with a green "Approved" pill, a small "Tag approved" message should appear at the top, and the queue counter in the side nav should drop by one.
2. On a different card, click **Hide tag**, then on another click **Block user**. Each card should fade with its own coloured pill, and each toast should match the action.
3. After clearing some cards, click **Approve all** at the top. The confirmation dialog should mention the actual number of cards still in the queue, not "7".
4. Try **Hide all** — confirm in the dialog, and every remaining card should fade out with yellow "Hidden" pills.
5. Open `audience.html` and scroll to "Who can tag you?". Click a different option — you should briefly see "Saving…" turn into a green "Saved" pill on the right, without pressing any save button.
6. Shrink the browser to phone width and try tapping the side-nav entries and the action buttons — they should feel large enough to use comfortably.
