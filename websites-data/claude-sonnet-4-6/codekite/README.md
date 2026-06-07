# CodeKite CI

CodeKite CI is a demo marketing site for a fictional cloud CI/CD service. The interesting part is the pricing-page calculator: pick how much you build, how many parallel jobs you need, and how much storage you use, and the page recommends a plan and breaks down what you'd pay.

> Fictional product — pricing and feature lists are illustrative.

## What you can do

- **Skim the pitch.** The home page has a short hero with a YAML example showing what a CodeKite pipeline looks like, three feature cards, and a button down to pricing.
- **Estimate what it would cost.** On the pricing page, the usage calculator has three sliders (build minutes, concurrency, storage) paired with number inputs — drag a slider or type a number, they stay in sync. Tick checkboxes for ARM, macOS, or GPU runners.
- **See your monthly total.** A sticky card on the right shows the running total, recommends a plan (Free / Team / Enterprise), and lists each line item so you can see why the number is what it is.
- **Compare plans in detail.** Below the calculator, a 16-row feature table compares everything across the three plans, with a 10-question FAQ below that.
- **Glance at the docs.** A placeholder quickstart shows what writing a pipeline file would look like.

## How to use it

Open `index.html` in any modern browser. Click through to `pricing.html` and play with the sliders — the right-hand quote and recommended plan update as you change usage. The Free plan covers a generous baseline; sliding past it shows the overage costs broken out by runner type.

## What was changed in this version

- The "Sign in", "Start free trial", "Get started", "Start trial", and "Talk to sales" buttons used to go nowhere. They now lead to real sign-in, sign-up, and contact pages with working forms (you'll see a confirmation message after submitting).
- Footer links that pointed nowhere now display as "coming soon" labels so it's clear what isn't built out yet.
- In the pricing calculator, typing a blank or invalid number into a slider's number box used to silently break the total — it now restores a sensible value when you click away.
- The docs page is no longer a one-line stub: it now has a small left-side table of contents (Quickstart / .codekite.yml / Parallel jobs / Next steps) you can jump between.
- On phones and tablets, the top navigation, buttons, and feature comparison table now wrap, scroll, and resize correctly instead of overflowing or shrinking the bar buttons until they disappear.

## How to test the changes

1. From any page, click "Sign in" in the top bar and submit the form — you should see a success message. Repeat with "Start free trial" and (from pricing) "Talk to sales".
2. Open `pricing.html`. In the "Build minutes per month" number box, clear it and click outside; the value should snap back and the monthly total should stay accurate.
3. Open `docs.html` and click the left-side links to jump between sections.
4. Shrink the browser to phone width and confirm the top nav wraps to a second row and the plan comparison table can be scrolled sideways.
