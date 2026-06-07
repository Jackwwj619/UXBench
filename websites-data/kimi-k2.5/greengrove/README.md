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

- The pet-type cards and condition chips in the quote wizard are now proper buttons you can reach with the Tab key and pick with Enter or Space. They also announce their selected state to screen readers.
- The selected pet card and condition chips now have a soft green glow around them, so it's clearer which ones are picked.
- The FAQ accordion items now have a larger, easier-to-click question header and the **+** marker stays neatly on the right.
- The claims form fields now have proper names attached so your browser can remember entries between sessions.
- All buttons (Get a quote, Continue, Back, Submit claim, etc.) are taller and easier to tap on phones.
- When you Tab through the page, you can now see a clear green outline around the focused element, making keyboard navigation easier to follow.
- Top-nav links and the GreenGrove logo are now sized as tap-friendly targets on mobile.

## How to test the changes

1. Open `index.html` and click **Get a quote**. On step 1, press Tab until a pet card is highlighted with a green outline, then press Enter — that pet should be picked and outlined in green.
2. Walk through to step 4 (conditions). Tab to a condition chip and press Space — the chip turns green. Press Space again to unselect it.
3. Click any selected pet or condition — the new soft green glow should make the choice obvious.
4. Open `faq.html` and click any question — the answer expands. The clickable area now covers the full row.
5. Open `claims.html`. The form fields have names (`petName`, `visitDate`, etc.), so your browser can offer to remember previous entries.
6. Shrink the browser to phone width. The **Get a quote** button, step-navigation buttons, and form buttons should all be tall enough to tap easily.
