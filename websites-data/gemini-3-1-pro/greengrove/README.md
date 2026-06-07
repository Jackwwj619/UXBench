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

- The pet-type cards on step 1 are now a proper keyboard-accessible radio group. You can move between cats, dogs, and the others with the arrow keys, pick one with Space or Enter, and screen readers announce which animal is selected.
- The "Pick a pet type" error no longer fires a browser `alert()`. An inline red message appears below the grid and focus jumps back to the first card, so you can stay in the flow.
- The **Sign in** button in the top nav used to be a dead link. It now opens a small dialog that explains customer sign-in isn't part of the demo and points you to "Start a free quote" instead.
- Buttons and nav links across the site now meet a 44px touch target and have a clear keyboard focus ring (an orange outline), making the site usable with just a keyboard.
- On a phone-width window the top navigation wraps cleanly instead of overflowing, the pet-card grid drops to two columns so cards stay tappable, and the step navigation buttons stretch to fill the row.
- The pet cards show a visible focus ring when reached with Tab, so it's obvious which card has the keyboard's attention.

## How to test the changes

1. Open `index.html` and click **Get a quote**. On step 1, press Tab until a pet card is focused, then use the left/right arrow keys to move between animals and Space or Enter to confirm — the selection highlight follows the focus.
2. Without picking a pet, click **Continue**. A red "Please select a pet type to continue." message appears below the cards (no browser alert), and focus jumps back to the first card.
3. Return to the home page and click **Sign in** in the top nav. A modal dialog explains the demo doesn't support sign-in; click **Got it** to dismiss.
4. Tab through the top nav from the brand to **Sign in**. Each link shows a clear orange focus ring.
5. Resize the browser to a phone width. The top nav wraps to a second line without overflowing, the pet grid becomes two columns, and the **Back** / **Continue** buttons fill the bottom row.
