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

- The "Sign in" link in the top bar now opens a small pop-up explaining that the member portal is coming soon, with a link to start a quote — instead of being a dead link.
- The pet-type cards (Step 1) now show a green checkmark in the top-right corner when selected, with a stronger green border, lift on hover, and clear focus highlight. You can also move between cards with the arrow keys and pick one with Space or Enter.
- If you try to continue past Step 1 without picking a pet type, a friendly red hint ("Choose a pet type to continue.") appears below the cards instead of a generic browser alert.
- The pre-existing-conditions chips (Step 4) are keyboard-accessible — you can Tab to each chip and toggle it with Space or Enter.
- Trying to continue past Step 4 with no condition selected (and "None of these" unchecked) now shows a red hint below the chips instead of a browser alert.
- The breed picker (Step 2) hint now turns red and bold when validation fails, and clears as soon as you start typing again.
- The claims-page submission form now does inline validation: empty or invalid fields are outlined in red with a specific message under each one, a red summary banner lists everything that's missing, and the first invalid field is scrolled into view and focused — no more generic browser pop-up.
- The FAQ page now starts with a row of "jump" links (Coverage / Eligibility / Claims & vets / Billing & support) that stay stuck at the top while you scroll, and the questions are grouped under those four section headings instead of one long list.
- Top-bar navigation, buttons, and FAQ rows are noticeably bigger and easier to tap, and the layout adjusts on small screens (top-bar links wrap, pet cards become a 2-column grid).

## How to test the changes

1. Open `index.html`. Click "Sign in" in the top bar — a "Member portal coming soon" dialog appears with a "Got it" button.
2. Click "Get a quote". On Step 1, click "Continue" without picking a pet — a red "Choose a pet type to continue." hint appears below the cards (no browser alert).
3. Use Tab to focus a pet card, then arrow keys to move between cards, and Space to select — the selected card gets a green border, a soft halo, and a green checkmark in the top-right.
4. Continue to Step 2. Click Continue with the breed box empty — the hint turns red and bold ("Pick a breed from the suggestions"). Start typing and the hint clears.
5. Continue to Step 4. With nothing checked, click Continue — a red "Pick at least one — or check 'None of these'." hint appears below the chips. Tab into a chip and press Space — it toggles.
6. Open `claims.html` from the top nav. Click "Submit claim" with the form blank — a red banner appears listing every missing field, each empty field is outlined in red with a specific message under it, and the first one is scrolled into view and focused.
7. Open `faq.html`. At the top, you'll see a row of jump-link pills (Coverage / Eligibility / Claims & vets / Billing & support); click one to scroll to the matching section. The pills stay stuck at the top of the page while you scroll.
8. Shrink the browser to phone width — the top-bar links wrap onto a second row, the pet-type grid becomes 2 columns, and buttons get noticeably taller.
