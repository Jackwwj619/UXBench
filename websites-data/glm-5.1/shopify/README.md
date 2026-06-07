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

- The email you type into the home-page hero is now carried over to the sign-up form, so you don't have to type it twice.
- The home-page email sign-up now checks that the address looks valid before sending you on. Empty or malformed addresses show a friendly red message under the field instead of just spinning forever.
- The admin login page now validates the store URL, email, and password before letting you in. Each missing or invalid field shows a clear message at the top and jumps focus to the field that needs attention.
- The "Forgot password?" link on the admin login actually works now — it opens an inline reset form, and after submitting you get a "Check your inbox" confirmation card.
- The Apple / Google / Facebook buttons on the login page are now labelled as social sign-in (instead of looking like duplicates of the regular log-in button).
- The contact-sales form now validates required fields. Submitting empty fields shows a red banner listing what's missing, marks the required fields with a red asterisk, and the work-email field is checked for a valid format.
- Three "card" links on the resources page that previously went nowhere now actually link to the help page and the free-trial page.
- Buttons, footer links, and the mobile menu items are taller and easier to tap on a phone. Pages no longer scroll sideways on small screens, and the email sign-up stacks the button under the input.

## How to test the changes

1. Open `index.html`, type an email like `me@example.com` into the hero sign-up, and click **Start free trial**. On `free-trial-form.html` the email field should already be filled in for you.
2. Back on `index.html`, try the email sign-up with the field blank, then with a clearly broken address like `not-an-email` — both should show a red message right under the input.
3. Open `admin.html`. Click **Log in** with the form completely empty — a red banner should appear and the cursor should jump to the store-URL field. Fix that, try again with a bad email like `abc`, and you should see a "valid email address" message.
4. On `admin.html`, click **Forgot password?** — the form should swap to a "Reset your password" card. Submit it empty, then with a valid email, and you should land on a "Check your inbox" confirmation. Use **Back to log in** to return.
5. Open `sales.html` and click **Submit** with empty fields. A red banner should list every missing required field by name. The required labels should now have a red asterisk.
6. Open `resources.html` and click any of the three resource cards in the lower section — they should take you to a real page (`help-trial.html` or `free-trial.html`) instead of doing nothing.
7. Shrink the browser to phone width on `index.html`. The page should not scroll sideways, the email input and button should stack vertically, and the footer links should each be tap-sized.
