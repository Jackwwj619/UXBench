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

- The "Start" button on the Privacy Checkup card now actually opens the checkup drawer when you click it.
- After you pick a retention period (3, 18, or 36 months) and click Save, a green confirmation note appears right under the buttons saying "Saved - auto-delete is X months", in addition to the usual toast.
- The confirmation dialog for revoking a connected app now shows a "Revoke" button instead of the generic "Delete", so the action you're about to take is clearer.
- The little checkboxes next to each activity row are easier to tap — their clickable area now extends well beyond the box itself.
- The "X" buttons on chips (like the ad-topic chips) also have a larger invisible tap area, so you can dismiss them more reliably on phones.
- The slide-out details drawer no longer steals clicks when it's hidden — clicks pass through to the page underneath as expected.
- Long titles in the drawer header now wrap onto multiple lines instead of overlapping the close button.

## How to test the changes

1. Open `index.html`. Scroll to the Privacy Checkup card and click **Start** — the side drawer should now open. Previously this button did nothing.
2. Scroll to the "How long do we keep your data?" section, click one of the buttons (e.g. 18 months) and click Save. A green confirmation note should appear directly beneath the buttons.
3. Find the Connected apps list and click the small remove ("x") on one of them. Confirm that the popup's main button now says **Revoke** instead of **Delete**.
4. Try tapping just outside one of the small activity checkboxes — clicks within a comfortable margin around the box should still toggle it.
5. Open the side drawer for any category with a long name — the title should wrap cleanly and the close button should remain visible at the top-right.
