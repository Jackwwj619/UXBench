# Notion Clone

A practice clone of Notion's marketing funnel — home, product sub-pages, templates, and pricing. It's what you'd see before signing up: how Notion pitches docs, wikis, projects, and AI, plus its pricing tiers.

> Front-end demo only — none of the CTAs lead to a real account.

## What you can do

- **Read the pitch.** The home page has the top nav (Product / Download / Solutions / Resources / Pricing / Request demo / Log in / Get Notion free), a hero with the product positioning and main screenshot, and modular intros to Docs, Wikis, Projects, and AI. Below: a customer logo wall, customer stories, and a multi-column footer.
- **Dig into projects and wikis.** Sub-pages walk through how project management views look (Board / Timeline / Calendar with view-switching screenshots), and how wiki-style knowledge bases work, with permissions, search, templates, and case studies.
- **Browse templates.** A template gallery for projects with category sidebar and a card grid showing cover, author, and install count for each template.
- **Compare pricing.** Four columns — Free / Plus / Business / Enterprise — with a monthly/yearly toggle, an AI add-on, a feature comparison table, and an FAQ.

## How to use it

Open `index.html` in any modern browser. Click any of the product entries in the top nav to visit a sub-page, or jump straight to `templates-projects.html` or `pricing.html`. Use the monthly/yearly toggle on the pricing page to see how the numbers change.

## What was changed in this version

- "Contact sales" buttons now open a proper Contact Sales dialog (with company, work email, company size, and a "What are you hoping to solve?" message) instead of the generic Request-a-demo form.
- The signup and demo dialogs can now be closed by pressing Escape or clicking the dim area outside the box, in addition to the existing close button.
- After you successfully submit a signup, demo, or sales form, the success screen now has a clear "Done" button to close the dialog.
- If you try to submit a dialog form with missing or invalid fields, a red banner appears at the top saying "Please fix the highlighted fields to continue", and the bad fields stay highlighted until you correct them.
- As you start typing in a field that was flagged as invalid, the red highlight clears automatically and the banner disappears once everything is valid.
- When a dialog is open, the page behind it no longer scrolls, and closing the dialog returns the cursor to the button you originally clicked.
- The dialogs now fade and pop in with a small animation when they open, with a darker, slightly blurred background behind them.
- The mobile menu button (the three-line icon on narrow screens) now animates into an X when the menu is open, and tapping any link inside the menu closes it automatically.
- Tap targets across the top navigation, footer links, mobile menu items, and the dialog close button are noticeably larger and easier to hit on phones.
- The pricing comparison table now scrolls sideways inside its own container on narrow screens instead of stretching the whole page.

## How to test the changes

1. Open `pricing.html` and click "Contact sales" on the Enterprise column — a dialog opens with company name, work email, company size, and a message box (different from the demo form).
2. Open any dialog (for example, click "Get Notion free" on `index.html`). Press Escape — the dialog closes. Open it again, click the dim area outside the white box — it closes again.
3. In the signup dialog, click "Sign up" without filling anything in — a red banner appears at the top and both fields get red error text. Start typing your name — the red on that field clears as soon as it's valid.
4. Fill in valid details and submit — a success screen appears with a checkmark and a "Done" button. Click Done to close.
5. While a dialog is open, try scrolling the page behind it — it stays still. Close the dialog and notice the focus jumps back to the button you used to open it.
6. Shrink the browser to phone width on `index.html`. Tap the three-line menu icon — the lines animate into an X. Tap any link inside the menu — the menu closes by itself.
7. Still on phone width, scroll to the footer — the link rows are taller and easier to tap. Visit `pricing.html` and scroll to the "Plans and features" table — it scrolls sideways inside its own area instead of pushing the page wider.
