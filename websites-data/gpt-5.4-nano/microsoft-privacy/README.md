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

- The "Take the Privacy Checkup," "Privacy Statement," "Help with privacy," and "Manage voice activity" links no longer go nowhere — each now opens a clear pop-up that explains what the link would do and notes that the full page isn't available in this demo.
- Tapping anywhere on a privacy-toggle row (not just the small switch) now flips that toggle. This makes the rows much easier to use on a phone.
- The **Discard** button on the ad-settings page now actually discards the unsaved changes in place (without reloading the page), restores the original toggles, and shows a green "Changes discarded." banner. If there's nothing to discard, it now says "No unsaved changes to discard." instead of doing nothing.
- The download-data form now shows a live status message under the **Request my data** button that tells you exactly what's missing — pick a category, or tick the consent box — and turns green when both conditions are met and the button is ready.
- The Microsoft ribbon, top navigation, footer links, checkbox rows, and toggle switches all have larger, easier-to-tap areas on phones, and the toggle switch is bigger and more visible.

## How to test the changes

1. Open `index.html`. Click **Take the Privacy Checkup** in the hero — a pop-up appears with a short explanation. Close it, then click **Privacy Statement** and **Help with privacy** — each opens a similar pop-up tailored to what that link is for.
2. Scroll to the Voice card and click **Manage voice activity** — a pop-up appears explaining the voice management page isn't included in this demo.
3. On the same page, find any privacy-toggle row (e.g. "Send Microsoft optional diagnostic data") and click anywhere on the row, not the switch itself — the toggle flips and the "Saved — [setting] is now on/off" message appears.
4. Open `ad-settings.html`. Flip a few toggles to trigger the "You have unsaved changes" banner, then click **Discard** — the toggles snap back to their original positions and a green "Changes discarded." banner appears (without the page reloading). Click **Discard** again with nothing changed — it shows "No unsaved changes to discard."
5. Open `download-data.html`. Notice the status line under the **Request my data** button: "Select at least one data category to enable Request my data." Tick a category — the message changes to ask you to check the consent box. Tick the consent box — the message turns green ("Consent accepted — Request my data is enabled.") and the button becomes clickable.
6. Resize the window to a phone width. Try tapping the top ribbon links, footer links, and toggle rows — they all have noticeably larger hit areas, and the toggle switch itself is bigger.
