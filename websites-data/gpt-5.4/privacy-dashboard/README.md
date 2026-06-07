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

- The Help button in the top bar now opens a small menu with links like "Privacy dashboard tour", "Manage data controls", "Create a data export", and "Account privacy settings" instead of just showing a one-line toast.
- The "Alex" account button in the top bar now opens a real account menu with your name, email, and shortcuts to dashboard, privacy settings, devices, and export.
- The web address in your browser now updates as you switch sections (e.g. `#activity`, `#devices`), so you can use Back/Forward and bookmark or share a specific page.
- Toast notifications when you flip a toggle now say what was changed (e.g. "Location turned off") instead of a generic "Setting turned on/off".
- When you turn off the master "Personalized ads" toggle, the rest of the ads section dims and shows a small explainer that your preferences are saved but won't apply until personalization is turned back on.
- The activity log summary now spells out exactly what you've filtered by — for example "5 items from the last 7 days in Search matching 'login'" — instead of just "Showing filtered sample activity".
- The chart subtitle on the activity overview now updates with the selected time range (last 30 days, 90 days, or year).
- Confirmation dialogs now use action-specific button labels — "Revoke access" for connected apps and "Sign out" for devices — instead of always saying "Delete".
- Pressing Escape, or clicking outside, now closes the new Help and account menus.
- Buttons in the top bar (search, help, account, menu) and side navigation links are now larger and easier to tap on phones.

## How to test the changes

1. Open `index.html` and click the **Help** icon in the top bar — a small menu appears with several shortcut links, not just a toast.
2. Click the **Alex** button next to it — an account menu opens showing the name, email, and four shortcuts.
3. Click any link in either menu (or in the left sidebar) — the address bar now changes to something like `#controls`. Use the browser Back button to return to the previous section.
4. Flip the "Location" toggle on the controls page — the toast now says "Location turned off" (or similar) instead of "Setting turned off".
5. Go to the Personalized ads section and switch the master toggle off — the preview, chips, and sensitive-topic grid all dim, and a small notice appears explaining preferences are saved but inactive.
6. Open the Activity section, set a date filter, category, and type something in the search box — the line under the count now reads something like "3 items from the last 7 days in Search matching 'login'".
7. On the Overview, switch the chart between 30d / 90d / 1y — the subtitle text under the chart updates to match the range.
8. Go to Apps, open one and click "Revoke access" — the confirmation popup's main button now says "Revoke access" instead of "Delete". Try the same on a device: the button reads "Sign out".
9. Open the Help or account menu, then press Escape or click anywhere outside it — the menu closes.
10. Shrink the browser to phone width — the search, help, profile, and menu buttons in the top bar are all larger and easier to tap.
