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

- The 30d / 90d / 1y buttons on the activity chart now actually relabel the panel subtitle and rescale the bars, instead of just visually toggling the active state.
- Signed-out devices now stay signed out: the device card greys out, the status flips to "Signed out", and the "Find" and "Sign out" buttons are disabled so you can't keep clicking them.
- Confirmation dialogs now use the right verb — "Revoke access" when revoking a connected app, "Sign out" when signing out a device, and "Delete" only for actual deletions, instead of every confirm button saying "Delete".
- Turning off the "Personalized ads" toggle now visibly disables the interests editor and the sensitive-topic checkboxes below it, so it's clear those settings have no effect while personalization is off.
- The toggle switches no longer jump or get stuck mid-animation: the slider position resets cleanly and uses higher-specificity styles so themes can't accidentally override the active colour.
- The toast and modal layers now stack correctly — toasts always appear above modals, and modals always appear above the drawer, so confirmation popups and feedback messages stop hiding behind each other.
- Tap targets across the mobile layout were enlarged. The mobile menu button, icon buttons, sidebar links, and interest chip remove buttons all meet the 44px target size on phones.

## How to test the changes

1. Open `index.html` and scroll to the activity chart on the Overview page. Click 30d, 90d, and 1y — the bars rescale and the subtitle updates to say "Sample volume for the last 30 days / 90 days / 12 months".
2. Open the "Devices & locations" section, click "Sign out" on any device, and confirm. The card greys out, the status reads "Signed out", and the buttons can no longer be clicked.
3. From the same screen, click "Revoke" on a connected app — the confirmation button reads "Revoke access", not "Delete".
4. Toggle "Personalized ads" off on the Ad personalization section — the interest chips and sensitive-topic checkboxes below visibly fade and stop responding to clicks.
5. Open any modal (e.g. confirm a delete) — the toast notification still appears on top, not hidden behind the dialog.
6. Shrink the window to phone width and tap the hamburger menu, an interest chip's "x", and the sidebar links — they all have a comfortable tap area.
