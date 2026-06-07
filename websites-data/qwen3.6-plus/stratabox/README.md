# Stratabox

Stratabox is a demo marketing site for a fictional headless content platform (in the Contentful / Sanity family). The interesting part is a working block-builder that lets you reorder, add, delete, and edit content blocks live on the page.

> Fictional product — SDK keys, customer logos, and integrations are illustrative.

## What you can do

- **Read the pitch.** The hero has an editor-vs-live-preview split panel that periodically swaps blocks. Below it: a trusted-by logo strip, a count-up stat row that animates when it scrolls into view, and three feature cards.
- **Try the block builder.** A two-pane editor on the left, live render on the right. Drag blocks to reorder them, switch the block type, add or delete blocks; an "auto-saved" status updates in the background as you edit.
- **See what calling the API looks like.** Code tabs for JavaScript, Python, Ruby, and curl share the same example, with a copy button on each.
- **Browse integrations.** A 24-card grid you can search; matches by name and category, with a live count.
- **Read customer quotes and pricing.** Three customer quote cards and a gradient pricing teaser further down the page, plus a dark four-column footer.

## How to use it

Open `index.html` in any modern browser. Try dragging blocks around in the live builder, switching block types, and watching the right pane re-render. Click the SDK tabs to swap languages, and use the integrations search to filter the 24-card grid.

## What was changed in this version

- **The "Start free", "Book a demo", and "Contact" buttons now open a real sign-up dialog.** Instead of jumping nowhere, every primary call-to-action pops up a friendly modal that asks for a work email and team size and confirms with a green tick when you submit. The dialog wording adapts to what you clicked (start free, book a demo, see full plans, contact us).
- **Email is checked before you submit.** If you type something that isn't a valid email, the field turns red and a "Please enter a valid work email" message appears right under the input.
- **You can close the sign-up dialog naturally.** Click the X, click outside the dialog, or press the Escape key — any of these will dismiss it and put your cursor back on whatever you clicked.
- **The block builder shows a clear "offline" state.** If your connection drops while editing, the auto-save status turns orange and says your changes will save when you reconnect, with a Retry button. When you come back online, saving resumes automatically.
- **Bigger, easier-to-tap controls in the builder.** The drag handle, block type dropdown, content field, and delete button are all larger with more breathing room, so they're comfortable on a touch screen.
- **Footer and nav links now point to plausible destinations.** Docs, API reference, Changelog, Status, CLI, Security, Careers, and Terms links lead to real-looking documentation URLs, while in-page links (Studio, Pricing, Customers) scroll to the matching section.
- **On phones, builder rows reflow.** The block content input drops onto its own line below the handle, type, and delete controls so nothing gets squeezed.

## How to test the changes

1. Open `index.html` and click "Start free" in the top right. A dialog should appear asking for your work email and team size. Try submitting with "alice@" — a red error should appear under the email field.
2. Type a proper email and submit. The dialog should swap to a green confirmation saying "You're on the list." Press Escape to close it.
3. Click "Book a demo" in the hero — the same dialog should open but with wording about booking a demo. Click outside the dialog to close it.
4. Scroll to the live block builder. Watch the small status next to the toolbar as you edit — it should cycle through "saving…" and "auto-saved just now". Open your browser's network panel and switch to offline mode; the status should turn orange and offer a Retry button.
5. On a phone-width window, look at any block row in the builder — the text input should drop onto its own line beneath the type dropdown and delete button, and every control should feel finger-sized.
6. Scroll to the footer and click any link such as Docs or Status — they should lead to a real-looking URL rather than staying on the same page.
