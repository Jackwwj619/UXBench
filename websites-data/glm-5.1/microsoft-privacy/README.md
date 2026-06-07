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

- The browse history page's time-range filter (Last 24 hours / 7 days / 30 days / 90 days) now actually filters the table — previously it changed nothing. Switching the range also updates the blue info banner above the table to say "the last 24 hours", "the last 7 days", etc.
- On the Ad settings page, the "About our ads" link at the bottom now expands a real explainer panel — covering which services show personalized ads, what turning personalization off actually does, and what is never used. Before, the link went nowhere.
- On the Download your data form, the disabled "Request my data" button now shows a small line of help text explaining what's missing — for example, "Please select at least one data category" or "Please confirm the agreement above" — so it's clear why you can't click it yet.
- The data-category checkboxes on the download form are larger and easier to tap, with bigger boxes and more padding around each label.
- The top black Microsoft ribbon and the account-page tabs now wrap and grow on small screens, so links no longer get cut off or feel too small to tap on a phone.
- The footer links at the bottom of the page now have a bigger tap area on mobile.

## How to test the changes

1. Open `index.html`, scroll to the activity-data cards, and click the **Browse** card to open `browse-history.html`. Change the time-range dropdown from "Last 30 days" to "Last 24 hours" — only "Today" rows should remain. Change it to "Last 7 days" and "Yesterday" rows should reappear; "May 9" rows should still be hidden. Notice the blue info banner at the top now reads "the last 7 days".
2. Go back to `index.html` and click the **Ads** card (or open `ad-settings.html` directly). Scroll to the bottom and click the **About our ads** link — a panel should expand below the page with three paragraphs explaining personalized ads.
3. From the home page, click the **Download your data** tile to open `download-data.html`. Without checking anything, look just above the "Request my data" button — a red hint should explain that you need to pick a category and confirm the agreement. Tick a couple of categories and the message should update to mention only the missing agreement; tick the agreement too and the button enables and the message disappears.
4. Shrink the browser to phone width on `index.html`. The top black Microsoft ribbon and the account-page nav should now wrap onto multiple rows instead of being squished or cut off, and each link should be comfortably tap-sized.
