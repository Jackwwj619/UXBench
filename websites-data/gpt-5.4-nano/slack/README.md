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

- The **Continue with Google / Microsoft / Apple** buttons on the get-started page now show a clear "sign-in is unavailable in this preview, please use the email option above" message instead of silently doing nothing, and briefly show a spinner so it's clear they're being clicked.
- The email sign-up form on the get-started page now shows a brief "Sending…" spinner on the **Continue** button before flipping to the success screen, and the success screen now politely scrolls itself into view.
- The FAQ accordion (on the pricing page and others) now has a smoother open/close animation, the open question turns purple with a faint purple background row, and the +/− indicator rotates as it opens.
- When you open a FAQ item that's near the top of the screen, the page now scrolls it down a bit so you can read both the question and the answer comfortably.
- Footer links to **About Us** and **Trust & Security** across the contact, enterprise, features, pricing, and solutions pages now actually take you to the right page (`about.html` and `trust.html`) instead of going nowhere.
- The footer links, navigation buttons, and FAQ questions are now bigger and easier to tap on phones, with visible focus outlines for keyboard users.

## How to test the changes

1. Open `get-started.html`. Click **Continue with Google** — a small spinner appears, then a red "Google sign-in is unavailable in this preview…" message appears under the three buttons. Try **Microsoft** and **Apple** for the same effect.
2. On the same page, type any work email in the form and click **Continue** — the button briefly says "Sending…" with a spinner, then the success screen appears and the page scrolls to show it.
3. Open `pricing.html` and scroll to the FAQ. Click any question — it should expand smoothly, the question text should turn purple, the row should get a faint purple background, and the + sign should rotate to a −.
4. Scroll right to the bottom of `pricing.html`, `contact.html`, `enterprise.html`, `features.html`, or `solutions.html`. Click **About Us** in the Company column of the footer — you should land on the About page. Click **Trust & Security** — you should land on the Trust page.
5. Shrink the browser to phone width — the footer links, the FAQ questions, and the navigation buttons should all stay easy to tap.
