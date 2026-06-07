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

- Footer links that used to go nowhere (Help Centre, Developers, Blog, About Us, Trust & Security, Privacy, Terms, Cookie Preferences) now open the matching real pages on this site.
- On the Contact Sales form, each required field now shows its own red error message right under the field if you leave it blank or type an invalid email, instead of a generic browser popup. A red summary appears at the top of the form when you submit with errors, and your cursor jumps to the first field that needs fixing.
- On the "Create your Slack workspace" page, the email box now shows a clear inline error like "Please include a valid email address" before letting you continue.
- The Google, Microsoft, and Apple sign-in buttons on the sign-up page now show a friendly "Single sign-on with X is coming soon" note and put your cursor back in the email box instead of doing nothing.
- The Resources page cards now use colorful labeled icons (Help, New, API, Com, Blog, Pro) and end with a "Browse features →" style link, and each card now leads somewhere relevant on the site instead of just reloading the Resources page.
- The eight cards on the Solutions page now each take you to a more relevant section (Engineering and Sales to integrations, IT and Security to Enterprise, etc.) rather than all dropping you on the same generic features page.
- On the Enterprise page, the "Watch demo" button has been renamed "See it in action" and now jumps to the AI section of the features page.
- On the About page, the Careers "View open positions" button now reads "Get in touch with our team" and links to the contact page.
- On the home page the AI feature card now reads "Explore Intelligence in Slack" instead of "Explore AI in Slack".
- The category tabs on the Features page now stay pinned to the top of the screen as you scroll so you can switch sections without scrolling back up.
- On phones and tablets, navigation links, buttons, the pricing toggle, form fields, and checkboxes are all larger and easier to tap.

## How to test the changes

1. Open `index.html`, scroll to the very bottom, and click "Privacy", "About Us", or "Help Centre" in the footer — each now opens a real page instead of doing nothing.
2. Open `contact.html` and click Submit with the form empty. Red messages appear under each required field, a red banner appears above the button, and the cursor jumps to the first empty field. Type a bad email like "alice@" to see a specific email error.
3. Open `get-started.html`, leave the email blank, and click Continue — you get an inline message under the box. Then click "Continue with Google" — a small note explains SSO is coming soon and your cursor goes back to the email box.
4. Open `resources.html`. Each card now has a colored icon, a "→" link at the bottom, and clicking one takes you to a related page (e.g. Help Centre opens the Features page).
5. Open `solutions.html` and click the Engineering card — it scrolls to the integrations section on Features. Compare with IT, which takes you to the Enterprise page instead.
6. Open `enterprise.html` and click the "See it in action" button under the hero — it jumps to the AI feature.
7. Open `about.html`, scroll to the Careers card, and click the button — it now opens the Contact page.
8. Open `features.html` and scroll down — the row of category tabs stays stuck to the top as you scroll past the page.
9. Resize the browser to phone width on any page — the navigation, buttons, and form fields are noticeably taller and easier to tap.
