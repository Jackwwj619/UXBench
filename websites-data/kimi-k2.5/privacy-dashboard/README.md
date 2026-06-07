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

- The "Export your data" panel now shows a live preview of what you're about to request, e.g. "Estimated archive: 4 GB .tgz - Every 2 months for 1 year - 3 categories", updating as you change the file type, size, frequency, or tick / untick categories — so you can tell at a glance what you're about to create.
- The header icons (search, profile, notifications) and the drawer close button are now big enough to tap comfortably on a phone (44 × 44 pixels), instead of squeezing into 38 pixels.
- Long pop-up windows like Privacy Check-up now keep the header, progress bar, and bottom action buttons in view while the middle section scrolls, so you never lose the "Next / Skip / Finish" controls.
- The action bar at the bottom of the side drawer now stays pinned to the bottom while you scroll, so the **Save** and **Cancel** buttons remain reachable.

## How to test the changes

1. Open `index.html` and scroll down to the "Export your data" card. Notice the blue "Estimated archive: …" message below the three dropdowns.
2. Change the **File type** to `.tgz`, the **Archive size** to `10 GB`, and the **Frequency** to "Every 2 months for 1 year". The estimate text should update each time.
3. Untick one of the "What to include" checkboxes (e.g. uncheck "Location") — the category count in the estimate should drop by one (e.g. "4 categories" → "3 categories").
4. Click any of the "Details" links on a category card to open the side drawer. Scroll the drawer up and down — the **Save** / **Cancel** row at the bottom should stay visible.
5. Click "Run Privacy Check-up" near the top of the page. As you advance through the steps, the progress bar and the **Next** / **Skip** buttons should stay pinned, even on a short window.
6. Shrink the browser to phone width. The icons in the header (bell, search, profile) should still be easy to tap (around 44 pixels square).
