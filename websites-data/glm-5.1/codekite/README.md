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

- Placeholder links like "Sign in", "Start free trial", "Get started", "Changelog", "About" and so on now pop up a friendly "coming soon — this is a UXBench demo" message instead of silently jumping to the top of the page.
- The Enterprise "Talk to sales" button on the pricing page now opens your email client with a pre-filled subject line so you can actually send an inquiry.
- The pricing page now has three pill-shaped quick-jump links at the top — "Cost calculator", "Compare plans", "FAQ" — that scroll you straight to each section.
- The three add-on checkboxes (Linux ARM, macOS, GPU) on the calculator now sit in their own framed rows with bigger boxes and a hover outline, making them easier to tick on phones.
- The top-nav links throughout the site have larger tap areas with a soft hover background.
- Page headings shrink on phone-sized screens so they don't overflow.
- The footer "Overview" link now correctly returns to the home page instead of going nowhere.

## How to test the changes

1. Open `index.html` and click "Sign in" in the top-right — a small alert says "Sign in — coming soon. This is a UXBench demo." instead of jumping the page.
2. Go to `pricing.html` and click "Start free trial" in the top nav, then "Get started" on the Free plan card — each one shows a tailored coming-soon message.
3. On the Enterprise plan card on `pricing.html`, click "Talk to sales" — your email client opens with the address `sales@codekite.dev` and the subject already filled in.
4. At the top of `pricing.html`, click each of the three pill buttons ("Cost calculator", "Compare plans", "FAQ") — the page jumps to each section.
5. Scroll to the add-ons in the calculator — each checkbox row now has a visible border that turns blue when you hover over it, and the boxes themselves are larger and easier to tap.
6. Shrink the browser to phone width — the top-nav links retain comfortable spacing and the page headline shrinks to fit.
7. Scroll to the footer on any page and click "Overview" — it now goes back to `index.html` instead of doing nothing.
