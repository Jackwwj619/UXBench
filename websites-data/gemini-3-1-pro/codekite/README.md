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

- The estimated-monthly card now explains what the number actually covers. When the recommended plan is Team or Enterprise, a small note clarifies that base-plan fees (e.g. "Team base plan: 5 users × $39") are or aren't included, so the number isn't misleading.
- The card's label is now "Estimated monthly usage" instead of just "Estimated monthly", making it clearer that the figure is a usage estimate, not a final invoice.
- All three slider+number pairs in the calculator now have proper `<label for=…>` associations and aria-labels, so screen readers announce each input and clicking the field label focuses the right control.
- Add-on runner checkboxes (Linux ARM, macOS, GPU) are now full 44px-tall touch targets with a hover state and a larger 20px checkbox, making them easy to tap on a phone.
- Top navigation links and footer links now have 44px touch targets and a bit of padding, so they're comfortably tappable on small screens.
- The number-input twins on each slider have visually hidden labels so assistive tech can tell them apart from the slider above.

## How to test the changes

1. Open `pricing.html`. Drag the "Build minutes" slider far to the right — the right-hand card label reads "Estimated monthly usage", and the note below the price changes to mention the Team or Enterprise base plan as the recommended plan changes.
2. Bring the sliders back to zero — the recommended plan returns to Free and the note becomes "Within Free tier — no base plan fee."
3. Click directly on each label text ("Build minutes per month", "Concurrent builds", "Artifact storage (GB)") — focus should jump to the matching slider.
4. Tab through the calculator with the keyboard — screen readers (or the accessibility inspector) read out a distinct label for each slider and its paired number field.
5. Resize to phone width and tap the three add-on checkboxes — each row has a comfortable tap area with a hover/focus highlight.
6. Resize to phone width and tap top-nav and footer links — each link has a 44px tap area.
