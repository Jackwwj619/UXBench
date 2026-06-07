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

- The **Sign up** and **Request demo** pop-up dialogs now fade and pop in smoothly, and can be closed by pressing the **Escape** key or clicking outside them — not just by hitting the X.
- When you submit the Sign up or Request demo form, the submit button now turns into a spinner labelled "Submitting…" for a moment so you get clear feedback that the click registered.
- After a successful submit, the success screen now has a proper **Done** button (instead of only a small X), and your keyboard focus returns to the link you originally clicked.
- The little × close button on the pop-ups is bigger and has a clearer hover/focus circle, so it's easier to find and tap.
- On the pricing page, the Monthly / Yearly toggle is larger and more obvious — bigger switch, bigger handle, with a subtle shadow on the knob — and easier to hit on touch screens.
- FAQ items on the pricing page now gently highlight in blue when expanded so the open question stands out from the rest of the list.
- On a phone, the top hamburger button, footer links, the Notion logo, and the pricing page's comparison table all have larger tap zones (and the comparison table scrolls sideways instead of squishing).

## How to test the changes

1. Open `index.html`. Click **Get Notion free** (or any "Sign up" / "Request demo" link in the top nav) — the dialog should fade and pop in.
2. With the dialog open, press **Escape** — it should close. Re-open it and click the dark area outside the box — it should also close.
3. Fill in a valid email and submit. The button should briefly show a spinner with "Submitting…", and then the success screen should appear with a **Done** button. Click Done — the dialog should close and focus should return to the link you started from.
4. Open `pricing.html` and click the **Monthly / Yearly** toggle a few times — the switch should be noticeably larger and the knob should slide more visibly. Prices should update.
5. Still on `pricing.html`, scroll to the FAQ and expand a question — the open item should pick up a light blue tint.
6. Shrink the browser to phone width and open the hamburger menu; tap a footer link — both should feel comfortably tappable, and the comparison table on the pricing page should scroll horizontally rather than squashing into an unreadable grid.
