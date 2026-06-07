# Shopify Clone

A practice clone of the Shopify marketing → trial → admin funnel. Starts with the home page, walks through pricing, trial sign-up, and a multi-step form, and ends in an empty-state store admin you'd see right after activating a trial.

> Front-end demo only — the trial sign-up doesn't create a real store.

## What you can do

- **Read the pitch.** The home page has the hero ("Your business starts with Shopify" plus an email sign-up input), product features, customer success stories, customer logos, and a footer.
- **Compare plans.** Pricing has Basic / Shopify / Advanced tiers, a monthly/yearly toggle, a feature comparison table, and an FAQ.
- **Start a "trial".** The trial landing page introduces the flow in three steps and has a big **Start free trial** button. The sign-up form walks through email → password → store name → industry / experience questionnaire across multiple steps.
- **See the empty admin.** Once "activated," you land in an admin shell with a left nav (Home / Orders / Products / Customers / Analytics / Marketing / Apps / Settings) and an onboarding checklist with task cards like "Add your first product."
- **Find help and resources.** Trial-related FAQ, a blog/guides resource center, and a sales contact page for Plus/Enterprise are all available.

## How to use it

Open `index.html` in any modern browser. Click **Start free trial** to walk through the funnel into the admin, or jump into `pricing.html` or `resources.html` directly from the top nav.

## What was changed in this version

- The Monthly / Yearly toggle on the pricing page is now clearly off (grey) when monthly is selected and green when yearly is selected, instead of always looking switched on. The Monthly and Yearly labels themselves are also clickable and reachable with the keyboard.
- When you flip the pricing toggle, the prices briefly pulse and tint green so it's obvious which numbers just changed.
- The hamburger menu icon and the top-bar sign-in / sign-up buttons on the marketing pages are noticeably larger and easier to tap on a phone.
- The footer links collapse into a single column with comfortable tap targets on small screens, instead of being squashed together.
- Pricing cards, hero text, and side padding now adapt better at phone widths so nothing runs off the side of the screen.
- The "Start free trial" button now changes to "Starting…" and then "Redirecting…" a touch faster, with a less aggressive dim, so it feels more responsive.

## How to test the changes

1. Open `pricing.html`. The toggle should start grey with "Monthly" highlighted. Click the slider — it should turn green, slide to the right, and all four prices should briefly pulse green as they update. Click the word "Monthly" or "Yearly" directly to switch as well, and try tabbing to the toggle and pressing Space.
2. Shrink the browser window to phone width (or open the page on a phone). The hamburger button in the top right should be a comfortable square to tap, the sign-in / start-trial buttons should be taller, and the footer should stack into one easy-to-tap column.
3. On `pricing.html` at phone width, check that the hero heading, pricing cards, and side padding fit the screen without horizontal scrolling.
4. Click **Start free trial** anywhere — the button should quickly switch to "Starting…" then "Redirecting…" and take you to the trial form.
