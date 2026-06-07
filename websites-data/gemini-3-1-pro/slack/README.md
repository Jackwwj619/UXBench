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

- The Contact form (`contact.html`) now validates every required field inline. Required fields show their own message when empty ("Please enter your first name."), the email field checks for a real address, the consent checkbox is enforced, and a red summary appears at the top of the form when there are problems. Errors clear as soon as you correct the field.
- The Get Started email signup (`get-started.html`) checks for a valid work email before pretending to send the link, and shows a friendly inline error if the field is empty or malformed.
- SSO buttons ("Continue with Google / Microsoft / Apple") on the Get Started page now show a "Connecting to Google…" loading state when clicked, then a clear stub message under the buttons explaining the demo can't complete SSO, instead of being silently dead.
- The "View open positions" button on the About page now actually scrolls to a real careers list with four sample roles, each with an "Apply now" link, instead of bouncing you to the sign-up page.
- The resource-center cards (Help Centre, What's New, Developers, Community, Blog, Partners) now use proper SVG icons instead of placeholder letters like "?", "N", "</>", "C", "B", "P".
- Smooth anchor scrolling no longer breaks on bare `#` links — those are now ignored so the page doesn't jump to the top when you click a placeholder anchor.
- Long checkbox labels and Compare-plans tabs are now properly sized for touch: the consent checkbox grows to 22px, the sticky comparison tabs sit above the sticky table header without overlapping, and nav links and mobile menu buttons all hit a 44px tap target.

## How to test the changes

1. Open `contact.html`. Press "Submit" without filling anything in — each required field shows its own red inline error and a summary appears in red at the bottom of the form. Start typing in any erroring field and its error clears immediately.
2. In the same form, type `bob@bob` in the email field and tab away — the email field shows "Please enter a valid email address." Replace it with `bob@bob.com` and the error disappears.
3. Open `get-started.html`. Press "Continue" with an empty email field — an inline error appears. Try `xyz` — the format error appears. Enter a valid email and the success screen appears as before.
4. On the same page, click "Continue with Google" — the button label switches to "Connecting to Google…" for a moment, then a status message under the buttons explains the demo can't complete sign-in.
5. Open `about.html` and click "View open positions" in the Careers card — the page scrolls down to a list of four sample job postings with "Apply now" links, instead of redirecting to the sign-up page.
6. Open `resources.html` — the six resource cards show proper line-icon SVGs (question mark, code brackets, people, etc.) instead of placeholder letters.
7. Open `pricing.html` and scroll the comparison table — the tab strip and the sticky table header now sit one above the other without overlapping.
