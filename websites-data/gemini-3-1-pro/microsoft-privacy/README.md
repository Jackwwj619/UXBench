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

- The "Time range" dropdown on `browse-history.html` now actually filters the activity table. Switching between Last 24 hours / 7 days / 30 days / 90 days hides rows that fall outside the chosen window, instead of leaving the table unchanged.
- On `ad-settings.html`, "Discard changes" now restores the toggles and topic checkboxes to their last-saved state in place, instead of reloading the whole page (which used to wipe everything you'd done since the page loaded). Saving a new state also makes that the new baseline for future discards.
- The page no longer shows a confusing "You have unsaved changes" banner the moment you open ad settings — the dirty flag now only trips on actual user edits.
- The Fluent-style on/off switches are now reachable by Tab and have a clear blue focus outline, and each one has a proper screen-reader label (e.g. "Personalize LinkedIn") so assistive tech can announce what it controls.
- The top Microsoft ribbon and account nav now scroll horizontally on a phone instead of being clipped, with a subtle fade on the right edge to hint that there's more.
- Every link, button, toggle, dropdown, and search input is now at least 44px tall on touch screens, making the whole panel comfortable to use on a phone.
- Wide tables and filter bars no longer push the page sideways on small windows; the table itself scrolls horizontally inside its container.

## How to test the changes

1. Open `browse-history.html`. Change the "Time range" dropdown to "Last 24 hours" — rows older than today disappear and the count of visible rows shrinks. Switch back to "Last 30 days" and they return.
2. Open `ad-settings.html`. Flip the master "See ads that interest you" toggle off and uncheck a couple of interest topics — the yellow "unsaved changes" banner appears. Click "Discard changes" and the toggles snap back to their original positions without the page reloading.
3. On `ad-settings.html`, flip a service toggle, click "Save", then flip another and click "Discard changes" — it should revert only to the just-saved state, not all the way to the original page load.
4. Reload `ad-settings.html` fresh — the unsaved-changes banner should be hidden until you actually touch a control.
5. On any page, press Tab repeatedly to step through the toggles — each switch shows a clear blue focus ring, and a screen reader announces its label.
6. Shrink the browser to phone width on `index.html` and `browse-history.html` — the top ribbon and account nav scroll sideways with a fade hint, and toggles, buttons, and the search field all get bigger touch targets.
