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

- The pet-type cards on step 1 of the quote now act like a proper group of choices: you can move between them with the keyboard, press Space or Enter to pick one, and the selected card shows a green checkmark in its corner.
- The "Continue" button on step 1 is greyed out until you actually pick a pet type, so you can't accidentally move on with nothing selected.
- The pre-existing-conditions chips on step 4 now look and act like proper buttons (keyboard-friendly, accessible to screen readers), and ticking "None of these" instantly clears the chips you'd picked.
- When you try to move forward without filling something in (no pet picked, no breed, invalid age, no conditions chosen), you now see an inline red error message under the relevant field instead of a generic browser popup, and the page scrolls to the missing field.
- The claims page form no longer shows a generic browser popup when submitted — the form hides and a friendly green confirmation panel appears in its place.
- The FAQ accordion is more polished: each question is a proper full-width pill with a circular +/− button, a soft hover state, a clear focus outline, and an opened item picks up a subtle shadow.
- Navigation links, primary buttons, pet cards, and condition chips are all noticeably larger and easier to tap on a phone.

## How to test the changes

1. Open `index.html` and click "Get a quote" to open `quote.html`. On step 1, notice the "Continue" button is greyed out. Use Tab to focus the pet grid, then Arrow keys / Space to pick a pet — a green check appears on the chosen card and Continue lights up.
2. Without picking a pet (reload to reset), click "Continue" — a red error banner reading "Please pick a pet type to continue." appears under the grid and the page scrolls to it.
3. Move forward to step 2 (breed) and click Continue with the breed field empty — an inline hint appears under the field and the cursor jumps into the breed box (no popup).
4. On step 3 (age), clear the age box and click Continue — an inline red message appears under the age input instead of a popup.
5. On step 4 (conditions), click a few condition chips, then click "None of these" — your chips clear immediately. Try clicking Continue with nothing picked — an inline red message appears.
6. Open `claims.html`, fill in the demo form and click Submit. The form hides and a green "Claim submitted" confirmation panel appears in its place (no browser popup).
7. Open `faq.html`. Click any question — the panel opens with a smooth feel; the round + icon turns into a − on a green background. Tab through and notice the visible green focus outline on each question.
8. Resize the browser to phone width on `quote.html` — the navigation, primary buttons, pet cards, and condition chips all grow to comfortable tap sizes.
