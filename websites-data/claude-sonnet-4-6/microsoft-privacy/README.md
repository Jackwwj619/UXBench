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

- The eight per-product privacy tiles at the bottom of the home page (Windows, Xbox, Edge, Bing, Outlook, OneDrive, LinkedIn, Microsoft 365) are now clearly marked as **placeholders not available in this demo**, with a helper sentence above them, so it's obvious why clicking them doesn't load anything.
- On the **Download your data** page, the **Request my data** button now shows a live helper line beneath it that tells you exactly what's needed to enable it ("select at least one category", or "tick the confirm box", or "ready — click to start").
- The time-range dropdown on the Download page now shows a one-line summary right beside it ("Your archive will include data from the last 12 months") that updates as you switch presets, so you can sanity-check your choice.
- On the **Ad settings** page, the LinkedIn service card now has a clear "Off by default — your account isn't linked to a LinkedIn profile yet" note explaining why that section behaves differently.
- The privacy toggles on the home page now read out their labels properly to screen readers, and the "Saving…/Saved" indicator is announced live as it changes.
- On narrow screens, the active item in the top horizontal nav now scrolls into view automatically so you can see where you are.

## How to test the changes

1. Open `index.html` and scroll to the bottom — note the new helper sentence above the **Privacy settings for Microsoft products** tiles, and that each tile is styled as a placeholder.
2. Flip any of the six toggles in the **Privacy settings** section — the "Saving…/Saved" message updates and is announced for assistive tech.
3. Open `download-data.html`. Without ticking anything, look beneath the **Request my data** button — the helper text tells you what's missing. Tick a category, then the confirmation checkbox; the helper text updates step by step until it says "Ready — click to start".
4. On the same page, change the **Time range** dropdown — the line "Your archive will include data from…" updates instantly.
5. Open `ad-settings.html` and find the **LinkedIn** service card — a grey note explains why it's off by default.
6. Shrink the browser window narrow on `index.html` — the highlighted nav item should remain visible on the horizontal nav bar.
