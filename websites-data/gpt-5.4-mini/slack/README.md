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

- Footer links that previously pointed nowhere ("Help Centre", "Developers", "Blog", "About Us", "Trust & Security", "Privacy", "Terms", "Cookie Preferences", "Partners") now go to the right page (Resources, About, Trust). The social-media icons in the footer now link out to the real Slack accounts on X, LinkedIn and YouTube.
- The six Resources cards (Help Centre, What's New, Developers, Community, Blog, Partners) used to all loop back to the same page. They now jump down to a real explainer section for each topic underneath the card grid.
- On the Enterprise page the second hero button ("Watch demo") no longer goes nowhere — it takes you to the Features page.
- On the pricing page the long feature comparison table now collapses behind a "Compare all features (Tap to expand)" panel on phones, so the page is much easier to scroll on a small screen. On desktop it's still open by default.
- Tapping a category filter ("Productivity", "Security", etc.) on the pricing comparison now shows a "Showing X features" label and briefly highlights the matching rows so it's obvious the filter changed something.
- Tapping a feature tab on the Features page (e.g. "Channels", "Canvas") now smoothly scrolls to that section and briefly highlights it, instead of just changing the tab style.
- The yearly/monthly toggle on pricing is bigger, with a larger knob and more obvious slide animation, making it easier to hit on touch screens.
- The "Change email address" link on the sign-up confirmation screen is now a proper clickable button instead of a dead text link.
- Buttons across the top nav, billing toggle, comparison tabs and auth screens are all noticeably larger and easier to tap on a phone.

## How to test the changes

1. Scroll to the footer on any page (try `index.html`, `pricing.html`, `enterprise.html`) and click "Help Centre", "About Us", "Trust & Security", or "Privacy" — each should take you to a real page (Resources, About, or Trust) instead of doing nothing.
2. Click the X / in / YT icons in the footer — each should open the real Slack account in a new tab.
3. Open `resources.html` and click any of the six cards (Help Centre, What's New, Developers, Community, Blog, Partners) — the page should now scroll down to a detail section for that topic and briefly highlight it.
4. Open `enterprise.html` and click **Watch demo** in the hero — you should be taken to the Features page instead of staying put.
5. Open `pricing.html` on a phone (or shrink the browser narrow). The big feature comparison should be collapsed behind a "Compare all features (Tap to expand)" header. Tap to open it. Then click one of the category buttons (Productivity, Security, AI) and watch the "Showing X features" label appear and the matching rows briefly flash.
6. Toggle the pricing page's Monthly / Yearly switch — the knob should slide further and the toggle should feel easier to hit.
7. Open `features.html` and click the "Channels" / "Canvas" / "Huddles" tabs at the top — the page should smoothly scroll to and briefly highlight that section.
8. Open `get-started.html`, enter an email and submit, then click "Change email address" on the confirmation — it should behave like a real button.
