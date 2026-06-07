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

- The "Start free trial" button now reliably moves you to the next page. The submit handler no longer leaves you stuck on a "Starting..." button — it redirects immediately once submitted.
- The onboarding questionnaire on the trial sign-up form is now keyboard-friendly. Each option is a real button you can tab to and toggle with Space or Enter, the "Where would you like to sell?" step behaves as a multi-select, and the "What are you planning to sell?" step behaves as a single-select.
- Sign-up form fields finally have proper labels — Email, Password, and the Country / Region dropdown each pair to their input so screen readers, autofill, and password managers know what they're for.
- The Help Center search box now does something. Submitting a query swaps in an inline "No exact matches" panel that links to the four most-used help sections, instead of silently dropping the search.
- Footer placeholder links (About, Careers, Blog, Investors, "Shopify Plus", "Hire a Partner", "Compare Plans", etc.) now point to real pages within the demo — `resources.html`, `sales.html`, or `pricing.html` — instead of dead `#` anchors.
- FAQ accordion buttons no longer cause the page to jump to the top of the section when clicked; the click handler now suppresses the default.
- The mobile menu button announces its open/closed state via `aria-expanded`, and now sits inside a comfortable 44px tap target.
- Tap targets across the marketing site — FAQ rows, footer links, onboarding options, and the help-center sidebar — were enlarged to 44–48px so they're easier to hit on phones, and the page no longer scrolls horizontally on narrow screens.

## How to test the changes

1. Open `index.html`. Enter an email in the hero and press "Start free trial" — you should land on `free-trial.html` without seeing the submit button stuck in a "Starting..." state.
2. From there, click "Start free trial" again to reach `free-trial-form.html`. Tab through the options on the first step, press Space to toggle multiple selections, and watch the chosen options highlight in green.
3. On step 3 of the form, the Country / Region dropdown now has a visible label and accepts focus from a screen reader / autofill.
4. Open `help-trial.html`. Type "refunds" in the search box at the top and press Enter — an inline result panel appears below the title listing popular topics, instead of nothing happening.
5. Scroll to the footer on `index.html` or `pricing.html` and click "About", "Careers", "Blog", or "Shopify Plus" — each now navigates to the resources or sales page instead of staying on the same URL with a "#".
6. On `index.html`, click an FAQ question — the page no longer jumps to the top before expanding the answer.
7. Shrink the window to phone width — the mobile menu button is bigger and tapping it flips `aria-expanded`; FAQ rows, footer links, and help-sidebar links are all comfortably tappable; the page doesn't scroll sideways.
