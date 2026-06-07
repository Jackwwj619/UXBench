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

- In the "Sensitive categories" and "Choose what to export" sections, the checkbox tiles now turn blue when ticked, so it's obvious which ones are selected at a glance instead of having to read each label.
- Ticking or unticking any of those sensitive-category or export checkboxes now pops up a small toast like "Health limited in personalized ads." or "Photos added to export." so you get confirmation that the change registered.
- The "Auto-delete saved activity" panel now reads more clearly: presets apply immediately when you click them, and the confirm button is renamed from "Save retention" to "Confirm choice" with a one-line explanation underneath that says what it does.
- The Privacy Checkup wizard now shows "Privacy checkup - Step 2 of 4" in its header and fades each step in smoothly, so you always know how far through the wizard you are.
- Moving between steps in the Privacy Checkup also pops a toast naming the next step ("Step 3 of 4: Personalization controls"), useful if you missed the visual transition.
- Closing the right-hand detail drawer now shows a brief "Details closed." confirmation toast.
- Buttons and side-nav links throughout the dashboard are slightly larger so they're easier to tap on phones, and the sidebar drawer slides in a touch faster and stays a comfortable width on small screens.

## How to test the changes

1. Open `index.html` and scroll to the "Sensitive categories" panel. Tick a few boxes — each tile should turn blue, and a small toast at the bottom of the screen should confirm "X limited in personalized ads." Untick one and you should see the matching "X no longer limited." toast.
2. Scroll to the "Choose what to export" section and tick categories — same blue highlight, same toast naming what was added or removed.
3. Find the "Auto-delete saved activity" panel. The button at the top right now reads "Confirm choice" and the helper line explains that presets apply immediately.
4. Open the Privacy Checkup (from the top of the page or its CTA). The header should show "Privacy checkup - Step 1 of 4"; click Next and watch the body fade and the header update to "Step 2 of 4". A toast at the bottom names the new step.
5. Click any "Details" link on a section card to open the right-hand drawer, then close it. A "Details closed." toast should briefly appear.
6. Narrow your browser to phone width. The hamburger should open the sidebar; side-nav links should feel comfortably tappable.
