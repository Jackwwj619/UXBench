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

- The multi-step trial sign-up form now shows a clear "Step 1 of 4" label under the progress dots, so you always know how far along you are. When you finish, it shows "All set!"
- When you click **Next** to move between steps, the page now scrolls smoothly to the top of the next step instead of leaving you scrolled where you were.
- The **Skip** and **Skip all** links between steps are now proper clickable buttons. They are tall enough to tap on phones, get an underline, and visibly respond when hovered or focused.
- Submitting the final form now goes straight to the next page instead of pausing for nearly a second on "Starting…" / "Redirecting…".
- The top-bar Shopify logo is now sized as a proper tap target on mobile.
- On phone-sized screens, all buttons, top-nav links, mobile menu items, and the onboarding skip/option buttons are taller (at least 44px) so they're easy to tap.

## How to test the changes

1. Open `free-trial-form.html`. Below the progress dots, a label reads "Step 1 of 4". Click **Next** — the label updates to "Step 2 of 4" and the page scrolls smoothly up to the next step.
2. Continue through all the steps. On the final step the label changes to "All set!".
3. On step 1, click the **Skip all** link. It is now a real button — Tab to it and press Enter from the keyboard, or hover to see the underline / background change. It jumps straight to the last step.
4. Submit the form on the last step. The next page should load immediately rather than waiting nearly a second on a "Redirecting…" message.
5. Shrink the browser to phone width. The top-bar logo, nav links, and the Skip / Next / option buttons should all be tall enough to tap comfortably.
