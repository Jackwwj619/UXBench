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

- The **Forgot password?** link on the log-in page now opens a real reset screen where you can type your email and get a "Check your inbox" confirmation, instead of being a dead link.
- The multi-step onboarding form on the free-trial sign-up now shows clear, friendly messages: a red warning if you skip a required choice, and a green "Saved — moving to the next step" note when you continue.
- The final step of the sign-up form now requires a valid email and a password of at least 6 characters, and shows inline red errors right under the field if you try to continue without filling them in.
- The **Skip** and **Skip all** links on the sign-up steps are now proper buttons that give a brief green confirmation ("Skipped — you can set this up later") before moving on.
- The onboarding option cards (Physical products / Digital products / etc.) can now be selected with the keyboard (Tab to focus, then Enter or Space), not just by mouse.
- FAQ accordions on pricing and other pages now respond reliably to taps on touch devices, with a visible highlight when you tap a question.
- Navigation links, footer links, and FAQ questions now have larger, easier-to-tap areas, especially on phones.
- When you move between sign-up steps, the page now smoothly scrolls the new step into view so it's easy to see on a phone.

## How to test the changes

1. Open `admin.html` and click **Forgot password?** — a "Reset your password" card appears. Submit it empty to see the inline email error, then type a valid email and click **Send reset link** to see the "Check your inbox" confirmation.
2. Open `free-trial-form.html`. On step 1, click **Next** without choosing any option — a red warning appears asking you to pick one or use Skip. Click any option card and click **Next** again — a green "Saved" message appears briefly before the next step loads.
3. On step 1, press Tab until one of the option cards is highlighted, then press Space or Enter — the option toggles on and off without needing the mouse.
4. Click **Skip** on any step — a brief green "Skipped" confirmation flashes before the next step appears.
5. Continue to the last step (account email/password). Click **Create your store** with both fields empty — red inline errors appear under each field. Type a valid email and a 6-character password to clear the errors and continue.
6. Open `pricing.html` and tap any FAQ question on a phone-sized window — it expands smoothly with a brief highlight.
