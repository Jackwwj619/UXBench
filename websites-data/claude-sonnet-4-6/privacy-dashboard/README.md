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

- The "Alex" profile button at the top right now opens a real account menu (Manage account / Switch account / Sign out) instead of just showing a toast. Clicking outside, or pressing Escape, closes it.
- Deleting sample activity items, or removing an interest, now shows an "Undo" button in the confirmation toast — you have a few seconds to put the deletion back.
- Devices that haven't been seen for a while now carry a yellow "Review" badge plus a one-line hint ("No activity for 42 days — consider signing out this device"), so it's clearer which devices to look at.
- The retention buttons (3 months / 18 months / Forever / etc.) no longer save instantly. They now mark the Save button with an "Unsaved" badge, so you have to click Save Retention to commit — and the toast tells you which option was saved.
- The "Sponsored ad preview" on the personalized-ads card now updates based on the interests you actually have ("Recommendations based on cooking and travel interests."), instead of always saying the same thing.
- The Privacy Checkup cards on the overview now jump you to the right section (apps with broad access, ads, devices, etc.) and mark themselves complete, instead of being purely decorative.
- The dashboard's pop-up dialogs and side panels now stack correctly — the confirmation dialog always sits above the side panel and dims it instead of getting trapped underneath.

## How to test the changes

1. Open `index.html`. Click the "Alex" profile button top-right — the account menu drops down. Click outside or press Escape to dismiss it.
2. Click into the Activity section, tick a few sample items, and delete them. The toast at the bottom now has an "Undo" button — click it before it disappears to restore them.
3. In the Personalized ads section, remove one of your Interest chips — the same Undo flow appears, and the "Sponsored" preview text below changes to reflect your remaining interests.
4. Go to Devices: any device showing the new yellow "Review" badge has a hint underneath about signing it out.
5. In the Activity section, change the Auto-delete option (e.g. 3 months → 18 months). The Save button now shows an "Unsaved" pill until you click Save Retention.
6. Back on the Overview, click any of the Privacy Checkup cards — you should be taken straight to the matching section and the card should be marked done.
