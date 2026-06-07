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

- **The onboarding questions now require an answer.** On the trial sign-up, the "What do you sell?" and "Where do you sell?" steps each start with a sensible default selected. If you somehow clear all options and try to continue, a polite red message asks you to pick at least one — and the "Skip" shortcut is gone, so the questions are actually answered.
- **The social login buttons now say which one you used.** On the admin login screen, after clicking Apple, Google, or Facebook, the success screen names the provider you signed in with instead of showing a generic "Login successful" message.
- **Form fields have proper labels.** Every text box, dropdown, and email field on the trial sign-up and sales contact pages is now properly tied to its label, so screen readers announce the right name and clicking the label puts the cursor in the field.
- **The page no longer scrolls sideways on phones.** Wide cards and feature visuals are constrained so the page fits neatly on a narrow screen without a stray horizontal scroll bar.
- **Top-nav links and footer links are easier to tap.** Header navigation entries and footer links are taller and have more padding, giving a comfortable tap target on phones.
- **Friendly reassurance under the onboarding "Next" button.** The note under the questionnaire now says "Pick at least one to continue. You can adjust these later in your admin." so it's clear the choice isn't final.

## How to test the changes

1. Open `free-trial-form.html` and look at step 1 ("What do you sell?"). One option is already selected. Click it to deselect everything, then press **Next** — a red message should appear asking you to pick at least one. There should be no "Skip all" link.
2. Repeat the same check on step 2 ("Where do you sell?") — it should behave the same way.
3. Open `admin.html` and on the login card click the **Google** button (or Apple / Facebook). The confirmation that appears should mention the provider by name, e.g. "Logged in successfully with Google".
4. On `free-trial-form.html` and `sales.html`, click directly on a field label like "Email" or "Full name" — the cursor should jump into the matching input.
5. Resize the browser to a narrow phone width on `index.html` and `pricing.html`. The page should not scroll horizontally, and the top navigation and footer links should feel large enough to tap.
