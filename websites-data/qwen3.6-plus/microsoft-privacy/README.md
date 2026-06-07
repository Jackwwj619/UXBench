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

- **Undo a deleted browse-history row.** When you delete an entry from the browse-history table, a small dark "Removed [page title]" message slides up at the bottom of the screen with an **Undo** button. Click Undo within a few seconds and the row reappears in its original spot.
- **Browse-history range hint updates live.** The blue information banner above the table now rewords itself to match the selected time range (e.g. "the last 24 hours", "the last 7 days") instead of always showing the same generic text.
- **Discarding ad-settings changes no longer reloads the page.** Hitting **Discard** snaps every toggle and interest topic back to where it was, without the page flickering or scrolling back to the top. If nothing is unsaved, a small message tells you "No unsaved changes to discard." instead of a confirmation prompt.
- **Save now becomes the new baseline.** After you save your ad-settings changes, hitting Discard later reverts to the just-saved state rather than the very first state of the page.
- **Tap targets sized for phones.** On phone-width screens, the top ribbon, navigation links, icon buttons, and Manage-your-data links are now comfortably tall enough to tap without zooming.
- **Filter bar and form stack cleanly on mobile.** On a narrow phone, the browse-history filter bar (time range / device / search) stacks vertically with full-width controls instead of overflowing, and the download-data form buttons stretch to fit one per row.
- **Browse-history table fits a phone.** The history table no longer scrolls sideways awkwardly on small screens — text wraps within the cells and the delete column shrinks so the whole row stays on screen.

## How to test the changes

1. Open `index.html`, click the **Browse history** card to reach the browse-history page. Click the trash icon on any row — instead of the row just disappearing silently, a dark toast slides up at the bottom saying "Removed [page title]" with an **Undo** button. Click Undo before it fades and the row pops back into its original position.
2. On the same page, change the **Time range** dropdown between "Last 24 hours", "Last 7 days", "Last 30 days", and "Last 90 days". The blue info banner above the table should rewrite itself to mention the chosen range.
3. Go to the ad-settings page (via Privacy dashboard → Ads card, or `ad-settings.html`). Flip the master toggle and pick a few interest topics, then click **Discard changes** — the page should *not* reload, and the toggles should snap back instantly. Click Discard again with nothing changed and you should see a small "No unsaved changes to discard." toast.
4. On the ad-settings page, change a few toggles, click **Save**, then change something else and click **Discard** — it should revert to your saved state, not the original page state.
5. Shrink the browser window to phone width (or open on a phone). On the privacy dashboard, the top Microsoft ribbon, account nav, and Manage-your-data links should all look easy to tap.
6. While narrow, open the browse-history page — the filter row (time range, device, search) should stack into a single column with full-width controls, and the table should fit the screen without horizontal scrolling.
