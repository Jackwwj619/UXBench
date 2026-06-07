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

- The Privacy Checkup cards on the overview now actually do something. Clicking "Review activity history", "Review ad personalization", "Check app access", or "Export your data" jumps you straight to that matching step in the checkup walk-through instead of always starting from the beginning.
- The card you click is highlighted in blue while the checkup is open, so you can see at a glance which task you're working on. The highlight clears when you finish or close the checkup.
- The Privacy Checkup pop-up now shows a small "Step 2 of 5" label and a clearer progress bar at the top — finished steps turn green, the current step is blue, and upcoming steps stay grey.
- Each new step in the checkup slides gently into view instead of appearing abruptly, and a brief message at the bottom of the screen tells you which step you've just moved to.
- The Privacy Checkup pop-up now keeps its title and its action buttons (Back / Next / Finish) pinned in place. The middle scrolls if the step text is long, so the buttons never get pushed off the bottom of the screen.
- The slide-out Details panel now announces "Details panel closed." in a small message at the bottom of the screen when you dismiss it, so it's clearer that it actually closed.
- Buttons across the top bar (search, profile, side links) and on the Privacy Checkup cards are bigger on phones, so they're easier to tap accurately.

## How to test the changes

1. Open `index.html`. Scroll to the "Privacy Checkup" cards near the top.
2. Click the "Check app access" card (the third one). The walk-through pop-up should open straight to the "apps" step (not step 1), and the card behind should now be highlighted in blue.
3. Inside the pop-up, look at the row of dots at the top — the current step shows in blue, finished steps in green, and there's a "Step X of 5" label above the title.
4. Click **Next**. Notice the new step content fades and slides in gently, and a short message ("Step 3 of 5: ...") appears at the bottom of the screen.
5. Make your browser window short so the step text needs to scroll. The title and the Back/Next buttons should stay locked in place at the top and bottom while only the middle scrolls.
6. Close the pop-up (Esc or the X). The blue highlight on the card disappears and a brief "Privacy checkup exited." message appears at the bottom.
7. Open any section's "Details" slide-out panel from the right, then close it — a "Details panel closed." confirmation message appears at the bottom.
8. Open the page on a phone (or resize narrow). The round buttons in the top bar (search, profile) are now large enough to tap comfortably.
