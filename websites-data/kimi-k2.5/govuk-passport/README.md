# GOV.UK Passport Clone

A practice clone of a GOV.UK-style passport application form — the kind of long, multi-step form a UK citizen would fill out to apply for, renew, or replace a passport. Everything lives in a single page, but moves you through one step at a time in the GOV.UK Design System style.

> Front-end demo only — applications go nowhere, and the flow stops before payment.

## What you can do

- **Read what you need before you start.** The opening page explains eligibility, fees, and what materials to have ready.
- **Walk through the application.** Pick the application type (new / renew / replace), then enter your personal information, address, previous passport details, and upload a photo. Each step is its own section with hint text below the labels.
- **See errors clearly when you slip up.** Invalid fields show inline error messages, and a summary at the top of the page lists everything that needs fixing.
- **Save where you are and come back.** Your progress is saved in your browser so you can leave and resume without losing what you've entered.
- **Review before "submitting".** A review step lets you check every section before the form would normally hand you off to payment — the demo stops there.

## How to use it

Open `index.html` in any modern browser. Click **Start** and follow the steps in order. The left/top step indicator shows where you are; use **Save and continue** to move forward or **Cancel** to back out.

## What was changed in this version

- Footer links like Help, Privacy, Accessibility statement, and Cookies now actually open real placeholder pages explaining what each one would cover — instead of all sending you back to the start page.
- Top-bar category links (Benefits, Departments, News, Guidance and regulation, and so on) also open their own placeholder pages now, with breadcrumbs back to the start.
- The "feedback" link in the phase banner ("This is a new service — your feedback will help us improve it") now opens a feedback page instead of going nowhere.
- The photo upload step now lets you actually pick a file from your device. The page shows the chosen filename to confirm it was selected. There's also a new **Use demo photo** button if you don't want to pick a real file.
- The step indicator on small screens is more compact, and the steps are taller and easier to tap on a phone.

## How to test the changes

1. Open `index.html`. Scroll to the very bottom and click **Help** in the footer — a Help page should load with breadcrumbs and a link back to the start. Click **Privacy**, **Accessibility statement**, and **Cookies** in turn to see their own pages.
2. From the start page, click the top-bar link **Departments** — a Departments page should load. Try **News** and **Guidance and regulation** too.
3. Find the small "feedback" link near the top of the page (in the "This is a new service" banner) — clicking it should open a feedback page.
4. Click **Start** and choose an application type. Step through the form until you reach the photo upload page. Click the file picker and choose any image from your device — you should see "Selected demo file: [your file name]" appear below.
5. On the same step, click **Use demo photo** instead. The text should change to "Selected demo file: demo-passport-photo.jpg" and any "must upload a photo" error should clear.
6. Shrink the browser to phone width — the step indicator at the top should remain readable, and the steps should be tall enough to tap.
