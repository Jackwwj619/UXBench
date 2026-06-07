# Microsoft Privacy Clone

A practice clone of the Microsoft account privacy management panel — the page you'd visit on your Microsoft account to see and clear the data Microsoft has on you across browsing, search, location, voice, media, apps, Xbox, and ads, plus a deeper view into a few of those.

> Front-end demo only — saving and clearing settings only affects this page in your browser; nothing is sent to Microsoft.

## What you can do

- **See your privacy panel.** The home page has the Microsoft ribbon and account header at the top, a hero with privacy checkup / download / privacy statement entries, eight activity-data cards (browse, search, location, voice, media, apps, Xbox, ads), six privacy toggles with live "Saving…/Saved" feedback, and tiles to download or clear your data (clearing asks for confirmation).
- **Drill into browse history.** A breadcrumb leads to an Edge browse-history page with filters by time range, device, and search box, and a table of activity rows you can delete individually or all at once.
- **Tune ad settings.** A master "See ads that interest you" toggle controls the whole panel; below, per-service cards (Microsoft, Bing & Edge, LinkedIn, Xbox) have their own toggles, plus interest topics you can multi-select. An unsaved-changes banner reminds you to save or discard.
- **Download your data.** A four-step form lets you pick categories (10 to choose from), set a time range, enter recipient email and archive format, and accept the consent terms. Submit and you get a request ID confirmation.
- **Reach product-specific privacy pages.** The home page links to privacy settings for Windows, Xbox, Edge, Bing, Outlook, OneDrive, LinkedIn, and Microsoft 365.

## How to use it

Open `index.html` in any modern browser. Click any activity card to see how it'd surface that category of data, flip any toggle to see the saved-state feedback, or use the **Manage your data** tiles to walk through the download or clear flows.

## What was changed in this version

- The home page now has a "Jump to" row of quick links under the hero so you can skip straight to Privacy settings, Browse history, Ad personalization, Download data, or Delete activity.
- "Take the Privacy Checkup" now actually scrolls you down to the Privacy settings section instead of doing nothing.
- The "Privacy Statement" and "Help with privacy" links in the hero are clearly marked "(coming soon)" so you don't expect them to work.
- The time-range dropdown on the browse-history page now actually filters the table — picking "Last 24 hours" or "Last 7 days" hides older rows instead of showing the full list.
- The browse-history page now shows a summary line above the table ("Showing X of Y entries · Last 30 days · All devices") that updates as you change filters.
- "Clear all" on browse history now tells you how many entries it will remove before you confirm, and shows a friendly "Nothing to clear" message if the current filters match no rows.
- After clearing browse history or all activity, you see a confirmation panel inside the same dialog instead of a popup alert from the browser.
- On the Download your data form, the page shows a running count ("5 of 10 categories selected") next to Select all / Clear all, and a helper line under the submit button explaining exactly what's still needed (pick a category, check the acknowledgment) before it lights up.
- On phones and narrow windows, the browse-history table now stacks each row into its own card so you can read everything without scrolling sideways.
- Tap targets across the top ribbon, footer, breadcrumbs, jump menu, and checkbox rows are now bigger and easier to hit on a phone.

## How to test the changes

1. Open `index.html`. Under the hero text, find the new "Jump to:" row and click "Privacy settings" — the page scrolls down to that section.
2. Click "Take the Privacy Checkup" in the hero — it should smoothly scroll you to the Privacy settings section instead of jumping nowhere.
3. Look at the "Privacy Statement" and "Help with privacy" links in the hero — they now show "(coming soon)" next to them.
4. Go to `browse-history.html`. Change the Time range dropdown to "Last 24 hours" — older rows disappear and the summary line above the table updates the counts and labels.
5. On `browse-history.html`, narrow your filters so nothing matches (e.g. set the search box to "zzz") and click "Clear all" — a "Nothing to clear" message appears.
6. Reset the filters and click "Clear all" — the confirmation now tells you exactly how many entries will be removed. Confirm, and you stay in the dialog with a success message instead of a browser alert.
7. From the home page, click "Clear all activity" and confirm — you see an in-dialog "Activity cleared" panel instead of a browser popup.
8. Open `download-data.html`. Tick a couple of categories — the counter next to Select all updates ("2 of 10 categories selected"). The helper text under the submit button tells you exactly what's missing; once you also tick the acknowledgment, the button activates and the helper turns green.
9. Resize the browser to phone width and open `browse-history.html` — each history row stacks as its own card with the delete button in the top-right.
