# Slack Clone

A practice clone of the Slack marketing site — the public-facing pages a prospective customer would visit before signing up. Home, features, solutions, enterprise, trust, pricing, and the surrounding marketing pages are all here.

> Front-end demo only — none of the CTAs lead to a real Slack workspace.

## What you can do

- **Read the pitch.** The home page leads with "Made for people. Built for productivity." plus a product demo animation, customer logos, product modules (Channels / Huddles / Canvas / Workflow / AI), and customer stories.
- **Compare plans.** Four columns — Free / Pro / Business+ / Enterprise+ — with a yearly/monthly toggle, a feature comparison covering message history, Slack Connect, Workflow Builder, AI, and support, and an FAQ.
- **Explore features in depth.** The features page has its own modules for Channels, Canvas, Clips, Huddles, Workflows, and AI.
- **See solutions by industry and team.** Engineering, Marketing, Sales, and Customer Support each have their own takes.
- **Read about the company.** Enterprise plan + sales contact, a Trust page for security and compliance with badges and whitepaper downloads, an About page, a resource center / blog, get-started for new users, sign-in (including SSO), and contact us.

## How to use it

Open `index.html` in any modern browser. Use the top nav (with mega-menu) to move between pages. Try the monthly/yearly toggle on pricing, and the FAQ collapses on any page that has them.

## What was changed in this version

- **"Watch demo" on the Enterprise page now actually opens something.** Clicking it pops up a small dialog with a product-tour placeholder, a short description, and a "Book a live demo" button. You can close it by clicking the X, the Close button, the dark area around it, or pressing Escape.
- **The Google/Microsoft SSO buttons on Sign in now give feedback.** Clicking them shows a friendly status line saying "Connecting to Google… (demo only — SSO is not enabled in this preview)" instead of doing nothing silently.
- **Forgot-password email is validated.** Submitting the form with an empty or malformed email now highlights the field in red and shows an inline message like "Please enter a valid email address" right under the input, instead of relying on the browser's default popup. The error clears as soon as you start typing.
- **Pricing yearly/monthly toggle is easier to use.** The toggle is bigger and the "Monthly" / "Yearly" labels next to it are now clickable too. Whenever the price changes it briefly pulses green so it's obvious the numbers updated, and old prices show with a clearer struck-through style.
- **Clicking placeholder links no longer flings you to the top of the page.** Empty "#" anchors are now ignored. Real in-page links scroll smoothly and stop just below the sticky navbar instead of hiding under it.
- **Bigger tap targets throughout.** Navigation links, the billing toggle, SSO buttons, social sign-in buttons, and form fields are all sized to be comfortable on a touch screen.

## How to test the changes

1. Open `enterprise.html` and click "Watch demo" in the hero. A dialog with "Slack Enterprise – product tour" should appear. Try closing it with the X, with Escape, and by clicking outside it.
2. Open `signin.html` and click "Continue with Google" or "Continue with Microsoft". A grey status box should appear under the buttons explaining this is a demo and SSO is not enabled.
3. Still on `signin.html`, click "Forgot password?" and submit the form with the email field empty — a red "Email is required" message should appear right under the field. Try "alice@" and you should see "Please enter a valid email address". Type a real email and the error should clear.
4. Open `pricing.html` and click the "Monthly" / "Yearly" labels next to the toggle (not just the toggle itself) — both should flip the toggle. Watch the prices: they should briefly pulse green each time they change.
5. Click any link in the top navigation with a `#` anchor that points to a section on the current page — it should smoothly scroll so the section sits just below the navbar, not behind it. Click any placeholder "#" link and the page should stay where it is.
