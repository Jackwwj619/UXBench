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

- The single sign-on buttons on the sign-in and get-started pages (Continue with Google / Apple / GitHub) now show a clear "SSO is coming soon — please use your email" notice and a popup confirmation, instead of doing nothing silently.
- The "Forgot password?" flow on the sign-in page now confirms which email the link was sent to, lets you click "Wrong email? Try again" to go back, and has a working **Resend link** button with a 30-second countdown so you can't spam it.
- On the pricing page, the discounted Pro and Business+ prices now show the regular price next to them with a clearer "*Promo applies to first 3 months only — then $19/user/month" note underneath.
- The Enterprise+ pricing card now shows "Custom pricing" and explains it's typically for 500+ employee organisations, and the **Contact sales** button is now styled as a primary call-to-action.
- The Resources cards now have real coloured icons (instead of plain letters) and a "Browse features →" / "Read articles →" hint, and they actually link to the right page (Features, Solutions, About) instead of all going to the same resources page.
- Footer links that previously pointed nowhere ("Help Centre", "Developers", "Blog", "About Us", "Trust & Security", "Privacy", "Terms") now go to the right page on the site.
- The Enterprise page hero now points the second button to **Compare plans** (instead of a dead "Watch demo") and shows an "Already a customer? Sign in" link.
- Various buttons and links are bigger and easier to tap on phones, and the privacy-policy checkbox on contact forms is now a real checkbox.

## How to test the changes

Open `signin.html` and click **Continue with Google** (or Apple / GitHub) to see the new SSO notice. Click **Forgot password?**, enter an email, and submit — you should see the confirmation with your email, the Resend countdown, and a "Wrong email? Try again" link. Open `pricing.html` to see the new crossed-out regular prices and the Enterprise+ "Custom pricing" wording. Open `resources.html` and click any of the resource cards — they should now take you to Features, Solutions, or About rather than looping back. Scroll to the footer on any page and click "Help Centre" or "Privacy" to confirm they go somewhere real.
