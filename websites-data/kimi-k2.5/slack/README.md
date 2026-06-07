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

- The "View open positions" button on the About page now goes to a brand-new **Careers** page (with sample roles), instead of dumping you on the get-started form.
- A new **Careers** link has been added to the footer's Company column on the About page, so it's actually discoverable.
- The six feature cards on the features page (Channels, Connect, Huddles, Clips, Messaging, Enterprise Grid) now expand when you click them, revealing an extra paragraph of detail. Click again to collapse. They also respond to Enter and Space, so keyboard users can open them too.
- The "Continue with Google / Apple / GitHub" social sign-in buttons no longer silently do nothing. Clicking one briefly shows "Connecting to Google…" then a friendly yellow notice explaining sign-in is a demo, with a nudge to use the email field above.
- The whole top nav, footer links, and form dropdowns are now noticeably easier to tap on phones: link rows are 44 px tall and select boxes now display a proper chevron and don't get clipped on iOS.
- Feature cards now show a clear focus outline when reached by keyboard and tell screen readers what they do ("Learn more about Channels", with an expanded/collapsed state).

## How to test the changes

1. Open `about.html`. Scroll to the "View open positions" button and click it — you should land on a brand-new `careers.html` page instead of get-started. Scroll to the footer; under "Company" there's a new "Careers" link.
2. Open `features.html`. Click any feature card (e.g. "Channels") — the card expands to reveal an extra paragraph. Click it again to collapse. Tab to it with the keyboard and press Enter or Space — it expands the same way.
3. Open `signin.html` (or wherever the social buttons live). Click "Continue with Google" — the button briefly reads "Connecting to Google…", then a yellow notice appears explaining the sign-in is a demo. Try the Apple and GitHub buttons too.
4. Shrink the browser to phone width. Top-nav links, footer links, and form select boxes should all feel comfortably tappable with a finger. Select boxes show a proper chevron arrow.
