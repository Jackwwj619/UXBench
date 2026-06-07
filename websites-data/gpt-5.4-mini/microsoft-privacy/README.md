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

- The "Manage…" links on the home page activity cards (Search, Location, Voice, Media) no longer go nowhere — they now scroll down to the matching toggle on the same page and briefly highlight it in yellow, so you can see exactly which switch controls that data.
- On the browse-history page, the time-range dropdown (Last 24 hours / 7 days / 30 days / 90 days) actually filters the table now. A clear line above the table also reports what you're looking at, e.g. "Showing 5 of 12 entries from the last 7 days matching 'github'."
- On the ad settings page, turning the master "See ads that interest you" switch off now also visibly fades and disables the interest-topic checkboxes (not just the per-service toggles), and a helper note above explains what the master switch does.
- The interest-topic rows on the ad settings page are now clickable as a whole card, not just on the tiny checkbox — easier to hit, especially on a phone.
- The download-data page now shows a clear "Export vs. Delete" explainer at the top, with a link back to the privacy dashboard if you actually wanted to delete data instead of just downloading it.
- On a phone, the browse-history table now reflows into stacked cards instead of overflowing sideways, filters stack into a single column, and buttons / dropdowns are tall enough to tap comfortably.
- The top black Microsoft ribbon and account navigation no longer cram together on narrow screens — links wrap and each one has a larger tap area.

## How to test the changes

1. Open `index.html`. Click **Manage search activity** on the Search history card — the page should smoothly scroll down to the toggle list and the "Search history" row should flash yellow for a moment. Try the same for Location, Voice, and Media.
2. Open `browse-history.html`. Change the time-range dropdown to **Last 24 hours** — the table should shrink to just today's entries, and the line above the table should update to confirm what's visible. Type `github` into the search box and watch the line update again.
3. Open `ad-settings.html`. Turn the master switch at the top off — the four service cards and every interest-topic row below should visibly fade and become unclickable. The grey note under the master switch should change to "Personalization is off…".
4. With the master switch back on, click anywhere inside one of the interest-topic boxes (not just the tiny checkbox) — the checkbox should tick / untick.
5. Open `download-data.html`. Look for the new two-column "Export / Delete" strip near the top — click the **privacy dashboard** link inside it and you should land back on `index.html`.
6. Shrink the browser window to phone width (or open on a phone). Visit `browse-history.html` and confirm the table is now a stack of cards (not a sideways-scrolling table) and the filter row stacks vertically with large, easy-to-tap controls.
