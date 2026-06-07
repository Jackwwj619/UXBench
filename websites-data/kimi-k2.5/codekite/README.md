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

- The **Sign in**, **Start free trial**, **Get started**, **Start trial**, and **Talk to sales** buttons on the pricing page no longer silently do nothing. Sign in shows a small toast at the bottom ("Sign-in is disabled in this demo"), and the others open a friendly confirmation dialog naming the plan you picked.
- The confirmation dialog can be closed by clicking the ×, the "Got it" button, the dim background behind it, or by pressing Escape.
- The line items in the right-side quote card are clearer about percentages — "ARM runners (25% of total build minutes)" instead of "(~25% of minutes)" — so you understand the breakdown.
- The FAQ at the bottom of the pricing page now works with the keyboard: Tab to a question, press Enter or Space to expand, and a clear blue focus ring shows where you are.
- The Docs page Sign-in link now shows the same friendly "Sign-in is disabled in this demo" toast instead of leading to "#".
- A small blue/orange CodeKite logo now appears next to the "CodeKite" wordmark on the Docs page (the homepage already had one).
- Every slider, number box, and checkbox in the calculator is now properly labelled for screen readers (e.g. "Enable Linux ARM runners add-on").
- On phones, all the buttons, top-nav links, footer links, FAQ questions, and add-on checkboxes are now at least 44 px tall for easier tapping.

## How to test the changes

1. Open `pricing.html`. Click **Start free trial** at the top-right — a dialog appears titled "Starting your free trial". Click the × in the corner, "Got it", the dim background, or press Escape to dismiss it.
2. Click **Get started** on the Free plan card — a dialog reading "Welcome to CodeKite Free" appears. Click **Start trial** on the Team card — the dialog now says "Starting your Team trial".
3. Click **Talk to sales** on the Enterprise card — a dialog appears mentioning "Enterprise options".
4. Click **Sign in** in the top-right — a small dark toast appears at the bottom of the screen reading "Sign-in is disabled in this demo." (instead of doing nothing).
5. On the calculator, tick the **macOS runners** add-on. The breakdown card on the right now reads "macOS runners (15% of total build minutes)" instead of the vaguer "~15%".
6. Tab to a question in the FAQ — a clear blue outline appears around it. Press Enter or Space to expand or collapse the answer.
7. Open `docs.html` and click **Sign in** — the same demo toast appears at the bottom. Notice the small blue/orange logo next to the "CodeKite" wordmark.
8. Shrink the browser to phone width — all the buttons, nav links, FAQ questions, and add-on checkboxes are large enough to tap comfortably.
