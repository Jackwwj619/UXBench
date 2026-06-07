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

- The pet-type cards on step 1 of the quote now show a clear green checkmark and a soft glow when selected, and you can reach and pick them using the keyboard.
- If you click **Continue** on step 1 without picking a pet, a friendly orange hint now appears under the cards instead of a browser popup alert.
- The claim form on the claims page no longer uses a generic browser alert. Submit with empty fields and you'll see a red banner at the top plus red highlights next to each missing field, and a green success message appears after a valid submit.
- The three "how a claim works" steps on the claims page are numbered and arranged in a tidier three-column row on wide screens, stacking into a single column on phones.
- The FAQ accordion is easier to use — bigger tap area, a clearer plus/minus indicator on the right, and a soft green hover so you can tell what you're about to open.
- Buttons and navigation links across the site are taller and easier to tap, with a subtle green hover state on top-nav links.
- On narrow screens, the top nav wraps neatly and stays usable instead of overflowing.

## How to test the changes

1. Open `index.html`, click **Get a quote**, and on step 1 try clicking **Continue** without picking a pet — the new orange hint should appear under the cards. Then click a pet card to see the green checkmark and outline. Try tabbing to a card with the keyboard and pressing Enter or Space to pick it.
2. Open `claims.html`. Without filling anything in, click **Submit claim** — you should see the red banner at the top listing how many fields are missing, plus a red highlight on each empty field. Fill them in correctly and submit again to see the green success message.
3. Still on `claims.html`, resize the browser wide and narrow — the three numbered steps should sit in a row on wide screens and stack vertically on a phone.
4. Open `faq.html` and click any question — the row should highlight on hover and the plus turn into a minus as it opens.
5. Shrink the browser to phone width on any page — the top nav should stay readable with no items running off the edge.
