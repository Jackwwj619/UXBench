# Microsoft Privacy Clone

A practice clone of the Microsoft account privacy management panel — the page you'd visit on your Microsoft account to see and clear the data Microsoft has on you across browsing, search, location, voice, media, apps, Xbox, and ads, plus a deeper view into a few of those.

> Front-end demo only — saving and clearing settings only affects this page in your browser; nothing is sent to Microsoft.

## What you can do

- **See your privacy panel.** The home page has the Microsoft ribbon and account header at the top, a hero with privacy checkup / download / privacy statement entries, eight activity-data cards (browse, search, location, voice, media, apps, Xbox, ads), six privacy toggles with live "Saving…/Saved" feedback, and tiles to download or clear your data (clearing asks for confirmation).
- **Drill into browse history.** A breadcrumb leads to an Edge browse-history page with filters by time range, device, and search box, and a table of activity rows you can delete individually or all at once.
- **Tune ad settings.** A master "See ads that interest you" toggle controls the whole panel; below, per-service cards (Microsoft, Bing & Edge, LinkedIn, Xbox) have their own toggles, plus interest topics you can multi-select. An unsaved-changes banner reminds you to save or discard.
- **Download your data.** A four-step form lets you pick categories (10 to choose from), set a time range, enter recipient email and archive format, and accept the consent terms. Submit and you get a request ID confirmation.
- **Reach product-specific privacy pages.** The home page links to privacy settings for Windows, Xbox, Edge, Bing, Outlook, OneDrive, LinkedIn, and Microsoft 365.

## What was changed in this version

- "Manage location activity", "Manage voice activity", "Manage media activity", "Manage app activity", and "Manage Xbox activity" links on the home page now open a small dialog that explains where that data is actually controlled, instead of doing nothing.
- The eight product links at the bottom of the home page (Windows, Xbox, Edge, Bing, Outlook, OneDrive, LinkedIn, Microsoft 365) also open the same friendly dialog, each with a short explanation of where to manage that product's privacy.
- "Manage search activity" now navigates to the existing browse-history page (filtered for search) rather than going nowhere.
- On the Ad settings page, turning off the toggle for a service like LinkedIn now visibly dims that whole card, so it's easy to see at a glance which ones are off.
- Privacy on/off switches are now clickable across their whole area (not just the thumb), and the switches and most navigation links are bigger and easier to tap on a phone.

## How to use it

Open `index.html` in any modern browser. Click any activity card to see how it'd surface that category of data, flip any toggle to see the saved-state feedback, or use the **Manage your data** tiles to walk through the download or clear flows.

## How to test the changes

1. Open `index.html`. Click "Manage location activity" inside the Location Activity card — a dialog appears explaining where location data lives. Press Close or Got it. Try "Manage voice activity" and "Manage Xbox activity" the same way.
2. Click "Manage search activity" — the page navigates to the browse-history view (with search type in the URL).
3. Scroll down to the "Manage privacy for Microsoft products" section and click "Windows" — a dialog explains where Windows privacy settings live. Try Edge, LinkedIn, and Microsoft 365.
4. Open `ad-settings.html`. Turn off the "Show me ads from LinkedIn" toggle — the LinkedIn card visibly dims. Turn it back on and the card returns to full brightness.
5. Shrink the browser to a phone width. Try tapping the toggles and product links — they're now noticeably easier to hit.
