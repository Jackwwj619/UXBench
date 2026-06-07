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

- **Sign in** and **Start free trial** buttons (and the per-plan "Get started" / "Start trial" / "Talk to sales" buttons) used to lead to dead `#` links. They now scroll to a real "Start your free trial" panel on the pricing page where you can enter an email and submit a demo sign-up.
- The new sign-up panel at the bottom of the pricing page shows a confirmation message after you submit ("Thanks — check your inbox for the magic link") instead of doing nothing.
- Top-nav links and the brand logo are bigger, with a soft hover background, so they're easier to tap on a phone.
- The pricing sliders are taller and the number inputs are bigger, so dragging or typing is easier on touch screens.
- The add-on runner checkboxes (Linux ARM, macOS, GPU) now have larger boxes, a hover highlight on the whole row, and clearer labelling — they're grouped under an "Add-on runners" heading.
- The FAQ items now have a bigger tap area, and the question you've opened gets a subtle blue outline so it stands out.
- Footer "Resources" and "Company" links that were stubs now show a "· soon" suffix and aren't clickable, so it's clear those pages don't exist yet. The Product column links to a real Overview, Pricing and Docs page.
- On a narrow / phone screen the top nav now wraps onto its own row instead of hiding the menu items.

## How to test the changes

1. Open `index.html`. Click **Sign in** in the top nav — you should land on the pricing page and the page should scroll down to a "Start your free trial" panel near the bottom.
2. On `pricing.html`, click **Get started** on the Free plan card, then **Start trial** on Team, then **Talk to sales** on Enterprise — all three should now scroll to the same sign-up panel.
3. In the sign-up panel, enter an email and click **Create account** — you should see a green "Thanks — check your inbox" confirmation appear under the form.
4. Drag any of the three sliders (Build minutes, Concurrent builds, Artifact storage). The number box next to it should update; type into the box and the slider should move to match.
5. Tick the **macOS runners** and **GPU runners** add-ons. The row should highlight as you hover; the checkboxes themselves should be visibly larger; and the line-item breakdown on the right should pick up the new cost.
6. Open and close a couple of FAQ items — open ones should get a soft blue outline.
7. Look at the footer — "Changelog", "Status", "About", "Blog" and "Careers" should show "· soon" and not be clickable, while "Overview", "Pricing" and "Docs" should be working links.
8. Shrink the browser window to phone width. The top nav should wrap to a second row with full-size tap targets rather than hiding links.
