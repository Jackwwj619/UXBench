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

- The **Log in** page now actually validates the form. Empty fields, a missing store URL, an invalid email, or a too-short password show clear red error messages right under each field instead of letting you submit nothing.
- The **Forgot password?** link on the log-in page now opens a real reset dialog where you can enter your email and get a confirmation message.
- Social log-in buttons (Apple, Google, Facebook) now open a "Demo mode" notice explaining the real provider isn't connected, instead of silently logging you in.
- The free-trial sign-up form now has **Sign up with Google / Apple** buttons (with the same demo-mode notice), a password strength meter (Weak / Medium / Strong), and a hint that passwords need at least 8 characters with a number.
- The marketing-emails opt-in is now an actual checkbox you can untick instead of a forced statement.
- The email you type into the home-page hero now carries over and pre-fills the sign-up form on the next page.
- The home page and sales page now have a working **mobile menu** (the hamburger icon at the top-right) for narrow screens.
- The "Contact sales" form now validates the name, email, company size, and topic fields and shows inline error messages.
- The help-center search box now filters and jumps to matching topics as you type, with a "No results" message if nothing matches.

## How to test the changes

Open `index.html` for the home page; type an email in the hero and click **Start free trial** — your email should appear pre-filled on the next page. Open `admin.html` (which is the log-in page) and try clicking **Log in** with empty fields to see the new inline errors; then click **Forgot password?** and **Apple / Google / Facebook** to see the new dialogs. Open `free-trial-form.html` and type into the password field to see the strength meter. Open `sales.html` and submit the form blank to see field errors. Open `help-trial.html` and type into the help search to see live filtering. On a narrow window, click the hamburger icon at the top of the home or sales page to see the new mobile menu.
