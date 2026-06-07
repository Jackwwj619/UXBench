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

- The **Sign in**, **Start free trial**, **Get started**, **Start trial**, and **Talk to sales** buttons on the pricing page used to do nothing. Now each one opens a small confirmation pop-up that tells you what it would do in the real product — including a "email sales@codekite.dev" hint for the sales button.
- The pop-up can be closed by clicking the **×**, clicking outside the box, pressing the **Got it** button, or pressing **Escape**.
- The FAQ questions are now keyboard-friendly — you can tab to each question and press **Enter** or **Space** to open and close it, and the open/closed state is announced for screen readers.
- The three add-on checkboxes (ARM / macOS / GPU runners) and the entire row around each one are now much bigger and easier to tap, with a soft blue background on hover.
- Each slider in the calculator now has a proper text label that screen readers can announce, and the matching number box also has its own descriptive label.
- On phones, the slider rows now lay out so the slider takes the full width and the number box sits beside it at a sensible size, rather than getting squashed.
- The navigation links at the top of the page are sized for comfortable tapping and get a soft background tint when hovered.

## How to test the changes

1. Open `pricing.html`. Click **Sign in** in the top-right — a pop-up should appear explaining sign-in isn't part of this demo. Close it with the **×**, then press **Escape** to confirm that also closes it.
2. Click **Start free trial** in the top nav — a different pop-up appears saying "You're on the list". Try **Get started** on the Free plan card, **Start trial** on the Team card, and **Talk to sales** on the Enterprise card — each shows the right message.
3. Try ticking the **Linux ARM runners** add-on — the entire row should be tappable (not just the small square), and it should highlight when you hover.
4. Drag any of the three sliders or type into the number boxes — the right-hand monthly total and recommended plan should update in real time.
5. Scroll to the FAQ. Tab to a question with your keyboard and press **Space** or **Enter** — it should open. Press it again to close it.
6. Shrink the browser to phone width — the sliders, number boxes, and add-on checkboxes should still be easy to use.
