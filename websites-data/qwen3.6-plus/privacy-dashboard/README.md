# Privacy Dashboard

A generic, brand-neutral privacy management panel — the kind of page a service might give you to control what data they collect, what's personalized, and how to download or delete what they have. It's intentionally not tied to any one company.

> Front-end demo only — toggles, deletions, and data downloads don't reach a backend.

## What you can do

- **See your privacy categories.** Section cards cover activity data, personalized ads, location, search, and devices. Each card has a toggle, a "Details" link, and a "Delete my X data" button.
- **Adjust toggles.** Flip any category on or off; the saved state updates visually.
- **Hit the danger zones.** Prominent buttons for **Download my data** and **Delete account** sit below the per-category cards. Delete asks for confirmation before it goes through.
- **Read the legal pieces.** Privacy-policy links live in the footer.

## How to use it

Open `index.html` in any modern browser. Click toggles or category actions to see how the panel responds. Delete and "delete my X data" buttons pop up a confirmation modal you can dismiss or confirm.

## What was changed in this version

- **A "DEMO" badge in the header.** A small yellow pill next to the page title now makes it obvious the dashboard is a simulation and nothing here touches a real account.
- **The "Download my data" panel now estimates the archive size.** As you tick categories (Search history, Browsing history, etc.) or change the file format, the summary on the right updates live with the format, the categories you picked, and an estimated size in MB or GB.
- **Bigger buttons, switches and inputs everywhere.** Toggle switches, header buttons, the close button on side drawers, dropdowns, and chips are all sized up to comfortable tap targets, so phone users don't have to aim carefully.
- **Tooltips no longer get cut off on the right.** Hover or focus tooltips now appear to the side of their icon with no risk of being hidden by the screen edge, and stay on a single line.
- **No sideways scrolling on phones.** The page no longer scrolls horizontally on narrow screens, and the DEMO badge shrinks slightly to fit smaller headers.
- **Cleaner toggles on phones.** The "On/Off" word next to each switch hides on very narrow screens so the rows don't look cramped.
- **Clearer close button on side drawers.** The "Close" word next to the X is now darker and the button shows a subtle background on hover so it's more obviously clickable.

## How to test the changes

1. Open `index.html`. The page title at the top should sit beside a small yellow "DEMO" pill.
2. Click **Download my data**. In the drawer that opens, tick a couple of categories (e.g. Search history and Voice activity) — the summary on the right should immediately show those categories and an estimated size like "590 MB". Change the format dropdown from `.zip` to `.tgz` — the summary updates.
3. Hover or tap any little "i" / help icon next to a setting — the tooltip should appear cleanly beside the icon, not clipped against the right edge.
4. Shrink the browser to phone width. The page should not scroll sideways. The On/Off label next to each toggle should disappear, and the DEMO badge should shrink to fit.
5. Open the **Delete account** confirmation drawer and tap the X close button — it should feel like a comfortably sized tap target and visibly darken on hover.
