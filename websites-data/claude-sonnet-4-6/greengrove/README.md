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

- On a phone, the top menu now collapses into a hamburger button. Tap it to expand the navigation links and "Sign in" full-width.
- A new **Sign in** button has been added to the top menu on every page.
- The first step of the quote wizard no longer pops up an ugly browser alert when you forget to pick a pet type. Instead, the pet grid politely shakes, a friendly red error message appears just below it, and the "Continue" button looks dimmed until you make a choice.
- The Claims form now validates inline: missing or invalid fields turn red and the page jumps to the first one. Missing the vet invoice file shows a clear inline message instead of a generic browser warning, and there is helper text reminding you of the file types and size limit.
- The "Total paid" box on the claims form now shows a dollar sign at the left and a small hint reading "Enter the total you paid the vet, including tax."
- The FAQ page now ends with a "Still have questions?" prompt and two big buttons that send you straight to a fresh quote or to filing a claim.
- The pet-type cards on the quote page are now proper buttons you can pick with the keyboard (Tab and Space/Enter).

## How to test the changes

Open `index.html` in any modern browser.

- Shrink the window narrow (or open on a phone) — the top menu collapses into a hamburger. Tap it and the menu expands.
- Notice the new **Sign in** pill in the top-right corner on every page.
- Open `quote.html`, click **Continue** without picking a pet — the grid should shake, a red error message should appear under it, and the Continue button should look greyed-out until you click an animal.
- Open `claims.html`. Submit the form with nothing filled in — invalid fields go red and the page jumps to the first one. Try submitting without attaching a file — the inline message under the upload should explain what's wrong.
- On the same claims form, look at the "Total paid" box — you should see a "$" prefix inside the box and helper text below it.
- Open `faq.html` and scroll to the bottom — there should be a soft-green prompt with "Start a free quote" and "File a claim" buttons.
- Tab through the quote page's pet grid — each card is highlighted with a green focus ring and can be picked with the space bar.
