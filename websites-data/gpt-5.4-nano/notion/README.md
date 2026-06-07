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

- You can now close any pop-up dialog (Sign up, Request demo, etc.) by pressing the Escape key or clicking the dim area around it, not just by hitting the small X in the corner.
- The X close button on every pop-up is bigger, easier to hit, and clearly highlights when you tab to it with the keyboard.
- After you successfully sign up or request a demo, the success screen now has a clear **Done** button to dismiss it, instead of just a small X.
- When a pop-up is open, the page behind it no longer scrolls, so you can't accidentally lose your place.
- After you close a pop-up, the keyboard focus jumps back to the link or button that opened it, so you can keep tabbing through the page without losing your place.
- Validation errors on the Sign-up and Demo forms now clear themselves the moment you start fixing the field, instead of sticking around until you submit.
- On phones, the close button, top-nav logo, and mobile menu links have larger tap areas so they're easier to hit, and the page no longer scrolls sideways.

## How to test the changes

1. Open `index.html` and click **Request demo** in the top nav — the pop-up appears.
2. Press the **Escape** key — the pop-up should close. Re-open it and click the dim area around the white box — it should close again.
3. With the pop-up open, try scrolling the page in the background — it should stay locked in place.
4. Submit the demo form with a clearly bad email like `bob@bob` — you'll see an inline error. Now start typing a fix in the email field — the error should disappear as soon as you begin editing.
5. Submit a valid email and look at the success screen — there should be a black **Done** button you can click to dismiss the dialog (the small X still works too).
6. Use the **Tab** key to move to the "Request demo" link in the nav, press Enter to open it, then press Escape to close — the focus ring should land back on the "Request demo" link, not at the top of the page.
7. Shrink the window to phone width — the close X, the logo, and the mobile menu items should all be easier to tap.
