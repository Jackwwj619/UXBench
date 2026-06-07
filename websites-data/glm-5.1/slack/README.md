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

- The sign-up form on the "Get started" page now checks your email before submitting — a clear red message appears under the field if it's blank or doesn't look like a real address, and the field outline turns red.
- The six resource cards on the home page now jump directly to the matching section on the resources page instead of dumping you at the top.
- Clicking a feature tab on the features page now smoothly scrolls to that feature's section, and arriving with a `#feature` URL also scrolls to (and briefly highlights) the right section instead of leaving you at the top.
- The pricing page's yearly/monthly toggle switch is larger and more obvious, with a bigger knob that's easier to flick on phones.
- Footer links and footer-bottom links now have bigger tap targets so they're easier to hit on mobile.
- The checkbox in the sign-up form has a larger box with comfortable padding around its label, so you can tap either the box or the words to tick it.
- The "X" close button on the mega-menu / nav is now a proper 44 by 44 pixel hit area, centred neatly.

## How to test the changes

1. Open `get-started.html`, leave the email blank, and click the submit button — a red message "Please enter your work email." appears under the field and the box turns red. Type "alice@" and tab away — the message updates to "Enter a valid email address". Type "alice@company.com" and the error disappears.
2. Open `index.html` and scroll to the resources/cards section. Click "Help Center" — you land on `resources.html` already scrolled to (and briefly highlighting) the Help section, not the top of the page.
3. Open `features.html`, click any feature tab in the secondary nav (e.g., "Canvas") — the page smoothly scrolls down to that section. Now visit `features.html#huddles` directly — it scrolls to and highlights the Huddles section.
4. Open `pricing.html` and click the yearly/monthly toggle — the switch is visibly larger, with a bigger sliding knob.
5. Shrink the browser to phone width on any page with a footer; the footer links and bottom links have noticeably more vertical space around them, easier to tap.
6. On `get-started.html`, try tapping the words next to the form checkbox — the checkbox now toggles whether you click the box or the label.
