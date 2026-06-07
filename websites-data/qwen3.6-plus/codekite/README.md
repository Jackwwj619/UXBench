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

- **"Talk to sales" actually opens an email.** Clicking the Enterprise card's "Talk to sales" button now opens your email program with a pre-filled message to the sales address, instead of going nowhere.
- **Plan recommendation is smarter at zero usage.** If you slide every usage option down to zero (no minutes, no extra storage, no add-ons), the quote card now clearly says "zero usage — Free tier covers it" instead of suggesting a paid plan. Picking add-ons or going above the free caps still bumps the recommendation to Team or Enterprise, with a short note explaining why.
- **Helpful examples inside the calculator number boxes.** The three number inputs (build minutes, concurrent builds, storage GB) now show example values like "e.g. 20000" as placeholder hints so it's obvious what to type.
- **Add-on runners are easier to tick.** The Linux ARM, macOS, and GPU rows have bigger checkboxes, more padding, and a subtle blue highlight when you hover over them — much friendlier on a touch screen.
- **Top-bar links feel like real buttons.** The Sign in and Start free trial links in the header have a comfortable tap height and the trial buttons across the pricing cards all point to the same "start trial" anchor so the call-to-action is consistent.
- **Better screen-reader labelling on the calculator.** Each slider, number box, and add-on now has a clear name announced by assistive tech, so the form is usable without seeing the screen.

## How to test the changes

1. Open `pricing.html` and slide every slider to zero and untick all three runner add-ons. The right-hand quote card should recommend the Free plan with a note saying "zero usage — Free tier covers it".
2. Tick the macOS runner add-on. The recommendation should jump to Team with a note about "covers add-ons / over Free caps". Tick GPU runners and the plan should switch to Enterprise.
3. Click into any of the three number boxes in the calculator and clear it — a faint "e.g. 20000" / "e.g. 4" / "e.g. 50" hint should appear.
4. Hover over any of the Linux ARM / macOS / GPU rows — the whole row should highlight in light blue and the checkbox should feel noticeably larger when you click it.
5. Scroll to the Enterprise pricing card and click "Talk to sales". Your email client should open a draft to the sales address with "Enterprise inquiry" already in the subject line.
