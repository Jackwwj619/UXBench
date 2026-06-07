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

- The hero email box on the home page and the pricing page no longer forces you to enter an email — it now says "(optional)" and the helper line clarifies "No credit card required. Email is optional — you can add it during signup."
- The pricing page now explains up front that prices shown are the standard ongoing rates after the £1/month introductory period, and that Shopify Plus uses a separate contract — with a link to contact sales.
- The home-page FAQ answer about cost now gives the real numbers: a free 3-day trial, then £1/month for 3 months, then standard plans starting at £25/month.
- The trial questionnaire screens now mark each onboarding question as "(Optional)" and replace the "Skip all" shortcut with a per-step "Skip this question" link.
- If you press Next on an onboarding question without picking anything, a soft note appears saying "No selection — we'll skip this question. Tap Next again to continue." instead of silently jumping ahead.
- The "Create your Shopify account" step now validates your inputs: a missing or malformed email and a too-short or letters-only password show clear messages, and a red banner at the top tells you to fix the highlighted fields.
- The admin log-in form now shows per-field error messages when the store name, email, or password is missing or invalid, plus a red summary banner — instead of letting you "log in" with empty fields.
- The Apple / Google / Facebook log-in buttons on the admin page now show a friendly message that social sign-in isn't available in this demo, instead of acting like a normal log-in.
- Tap targets across the site are larger on phones: the mobile menu button, the "Forgot password?" and "Log in" links, the onboarding skip link, and the social log-in buttons are all at least 44 pixels tall.
- On phones, the email sign-up bar stacks vertically (input above button, both full width) and the side padding on hero, pricing, and brand-logo sections is tighter so nothing gets clipped by the edge of the screen.

## How to test the changes

1. Open `index.html`. Look at the email box in the hero — the placeholder ends in "(optional)" and the line under it says no credit card is required. Click **Start free trial** with the box empty and the flow still proceeds.
2. Open the home-page FAQ and expand "How much does Shopify cost?" — the answer now mentions the £1/month introductory period and the £25/month standard starting price.
3. Open `pricing.html`. Above the plan cards you'll see new explanatory paragraphs about the introductory £1/month rate and a note that Plus uses a separate contract, with a "contact sales" link.
4. Click **Start free trial** to go to `free-trial-form.html`. Each of the first two questions now has "(Optional)" next to the description and a "Skip this question" link instead of "Skip all".
5. On step 1, click **Next** without picking an answer — a small grey note appears under the options saying it will be skipped. Click **Next** again to advance.
6. Walk to the "Create your Shopify account" step. Click **Create your store** with both fields empty — you'll see a red banner and red text under each field. Try an email like "alice@" or a password like "abcdef" to see the validation messages.
7. Open `admin.html`. Click **Log in** with empty fields — each field shows a red message and a red banner appears at the top. Click **Apple**, **Google**, or **Facebook** — a message says social sign-in isn't available in this demo.
8. Shrink the browser to phone width. The email sign-up bar on the home page and pricing page stacks vertically with full-width input and button, and the menu button at the top right is now a clearly tappable square.
