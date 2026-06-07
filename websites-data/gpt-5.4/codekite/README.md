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

- "Sign in", "Start free trial", "Talk to sales", "Get started", "Start trial", and the footer links no longer dead-end on a "#" — they all open real new pages (sign-in, sign-up, contact, about, blog, careers, status, security, changelog).
- Each add-on runner (ARM, macOS, GPU) now has its own "Share of minutes" percent box next to the checkbox, so you can adjust how much of your build time uses that runner instead of being stuck with fixed 25%/15%/5% defaults. The percent box is greyed out until you tick the runner.
- A small "How this estimate is calculated" panel now appears below the calculator, with an inline link from the calculator heading that scrolls you to it.
- The calculator now shows a yellow notice if you type a number that's outside the allowed range (it snaps you back) or if your ARM/macOS/GPU shares add up to more than 100%.
- The breakdown lines on the right are now more specific — they say things like "Linux build min (16,000 billable above 4,000 free)" and "5 extra concurrent slots @ $12/slot/mo" instead of generic labels.
- A new "Start free trial" and "Talk to sales" button pair appears under the cost card on the pricing page.
- On narrow screens the plan comparison table now scrolls sideways with a "swipe horizontally" hint, instead of squishing into unreadable columns. The first column also stays pinned as you scroll.
- The docs page now has a sticky "On this page" sidebar with three jump-links, plus a "Pick the right plan as you scale" panel at the bottom with buttons to pricing, trial, and contact.
- The FAQ rows on the pricing page now have a bigger click target and the +/− indicator is easier to see, plus a clear keyboard focus ring.
- Buttons, navigation links, form fields, and footer links across the site are taller and easier to tap on phones.

## How to test the changes

1. Open `index.html` and click "Sign in", "Start free trial", or any footer link (About, Blog, Careers, Changelog, Status, Security) — each opens a real page instead of doing nothing.
2. Open `pricing.html`. Tick the "Linux ARM runners" checkbox — the "Share of minutes" percent box next to it lights up. Change the percentage and watch the cost line update.
3. Type "999999" into the build minutes box — the value snaps back to 200,000 and a yellow notice appears explaining the change.
4. Tick all three add-on runners and set each share to 50% — a yellow notice warns the shares total 150%.
5. Click "See assumptions ↓" next to the calculator heading — the page scrolls to the new "How this estimate is calculated" panel.
6. Below the cost card on the pricing page, click the new "Start free trial" or "Talk to sales" button — each opens the matching page.
7. Resize the browser narrow and scroll to the plan comparison table — a hint says to swipe sideways and the table now scrolls horizontally with the feature column staying pinned.
8. Open `docs.html` — there's now a left sidebar with three jump-links and a "Pick the right plan as you scale" panel at the bottom with buttons.
9. On `pricing.html`, click any FAQ row — the bigger target and clearer +/− indicator make it easier to use. Tab to a row with the keyboard to see the focus ring.
