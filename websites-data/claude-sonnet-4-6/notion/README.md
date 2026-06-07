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

- The template category cards on the Projects templates page are now clickable filters with a clear "selected" highlight, instead of being decorative tiles that did nothing.
- The "Request demo" and "Sign up" pop-up forms now reset cleanly after a successful submit, so you can re-open them and try again without seeing the leftover success message.
- After a successful sign-up or demo request, there's now a "Continue exploring" button to dismiss the success screen instead of just a small X in the corner.
- You can close any pop-up by pressing the Escape key.
- Email validation is stricter, so obvious typos like "alice@company" now show an inline error instead of going through.
- The Monthly / Yearly toggle on the pricing page is larger and easier to hit, especially on touch screens.
- The mobile menu button and footer links have larger tap areas for easier use on phones.

## How to test the changes

1. Open `templates-projects.html`. Click each of the category cards across the top (e.g. Engineering, Design, Marketing) — they should highlight in blue when active and behave like a single-choice filter, and the keyboard can reach them with Tab + Enter.
2. From any page, click "Request demo" in the top nav. Submit a clearly bad email like `bob@bob` to see the new inline error. Then submit a valid email — after the success screen, click the new "Continue exploring" button. Re-open the same dialog and the form should be empty again, not stuck on the success state.
3. With any pop-up open, press the Escape key to dismiss it.
4. Open `pricing.html` and click the Monthly / Yearly toggle — the larger switch should clearly slide and the prices should change.
5. Resize the browser narrow (or use a phone) and confirm the hamburger menu button and footer links are easier to tap.
