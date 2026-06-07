# GreenGrove

GreenGrove is a demo marketing site for a fictional pet insurance company. The centerpiece is a six-step quote wizard that asks about your pet and gives you a monthly price across three coverage tiers.

> Fictional product — quotes are illustrative; no policy is actually issued.

## What you can do

- **Read the pitch.** The home page has a hand-drawn dog illustration, three value props, and a few customer reviews.
- **Get a quote in six steps.**
  1. Pick the pet type — six animal cards.
  2. Pick the breed — searchable dropdown covering 200+ dogs, 60+ cats, and other species.
  3. Enter age — year/month toggle with steppers.
  4. Flag any pre-existing conditions — 19 condition chips you can multi-select, plus a *None* option.
  5. Choose a plan — three tier cards (Sprout / Sapling / Oak) with a deductible dropdown, a side-by-side comparison table you can expand, and a live monthly price for each tier.
  6. See your quote — monthly fee, annual total, what's included, and a 14-day price lock.
- **Jump back to fix things.** The step dots at the top let you go back to any earlier step without losing what you entered.
- **Read the fine print.** The FAQ page has 12 common questions in an accordion. The claims page explains how claims work in three steps with a sample form.

## How to use it

Open `index.html` in any modern browser. Click **Get a quote** and walk through the steps; the back/continue bar at the bottom is always available. The breed dropdown supports keyboard search — start typing and use the arrow keys to pick.

## What was changed in this version

- The big button in the top-right corner of the home page now says "Get a quote" and actually takes you to the quote wizard, instead of being a dead "Sign in" link.
- The FAQ page heading is now the full phrase "Frequently asked questions" instead of just "Frequently asked".
- When you try to move forward in the quote wizard without filling something in, you now see a friendly red message right under that step (for example "Please select a pet type to continue") instead of a generic browser popup. The problem area is also outlined so it's easy to spot.
- The claims page form no longer pretends to submit on incomplete data. Missing required fields are highlighted in red, a red banner at the top lists exactly what's missing, and the cursor jumps to the first field you need to fix.
- After a successful claim submission, the form shows a green "Thanks — we'll email you within 5 business days" message inline, instead of a browser alert popup.
- Buttons and top-bar links are taller and have more padding, so they're easier to tap on a phone. The top navigation also wraps neatly on small screens.
- FAQ accordion items have a clearer focus ring and a bigger tap area when you open and close them with the keyboard.

## How to test the changes

1. Open `index.html`. The green button at the top-right should now read "Get a quote" — click it and you should land on `quote.html`.
2. On `quote.html`, click **Continue** without picking a pet. A red message "Please select a pet type to continue" should appear and the pet grid should be outlined in red.
3. Pick a pet, click Continue, then on the breed step try Continue again without picking a breed — a red hint should appear beside the breed input and the cursor should jump there.
4. On the conditions step, click Continue without checking anything — a red message asks you to pick at least one or check "None of these".
5. Open `claims.html`, leave every field blank, and click **Submit claim**. A red banner should list the missing fields by name, and the first missing field should be focused. Fill them all in and submit — you should see a green success message instead of a popup.
6. Open `faq.html` and confirm the heading reads "Frequently asked questions". Tab through the questions and look for a green focus outline around the selected one.
7. Shrink the browser window to phone width — the top-bar links should wrap onto multiple lines and remain easy to tap.
