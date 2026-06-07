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

- **The header button now actually starts a quote.** The top-right "Sign in" link on the home page is replaced with a clear "Get a quote" button that takes you straight into the wizard.
- **Friendly inline error messages instead of pop-up alerts.** If you try to continue without picking a pet, choosing a breed, entering an age, or selecting a condition, you now see a polite red message right inside that step rather than a system pop-up.
- **Pet type cards can be used with the keyboard.** You can now tab to the animal cards and press Space or Enter to pick one, which helps people who don't use a mouse.
- **Buttons and header links are bigger and easier to tap.** The "Get a quote" button, secondary buttons, and top-bar links are a little taller and roomier, so they're comfortable on phones.
- **Clearer focus highlight.** When you tab through the page, the currently focused button, link, or pet card now shows a strong green outline so you can see where you are.
- **Pet cards give better visual feedback.** Hovering a pet card now tints its border green, and the selected card gets a soft green glow so the choice is unmistakable.

## How to test the changes

1. Open `index.html` and look at the top right — click the green "Get a quote" button and confirm it takes you into the wizard.
2. On step 1, press the Continue button without picking an animal. A red message should appear inside the step instead of a browser pop-up. Pick an animal and the message disappears.
3. Use the Tab key to move focus through the pet cards, then press Space or Enter to select one without using the mouse.
4. Continue without picking a breed on step 2, without entering an age on step 3, and without selecting a condition on step 4 — each step should show its own inline red message.
5. Shrink the window to phone width and tap the header links and the main "Get a quote" button — they should feel large enough to tap without zooming in.
