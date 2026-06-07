# ChatGPT Clone

A practice clone of the ChatGPT main chat interface, sign-in, sign-up, and pricing pages. You can type a message and get a reply, switch between past conversations, and walk through the marketing pages — all without an internet connection.

> Front-end demo only — there's no real model behind the chat. Replies are pre-written and chosen by matching keywords in what you type; "streaming" is a typewriter effect, not a real network stream. No API key needed.

## What you can do

- **Chat with the mock assistant.** Type in the box at the bottom and hit send. You'll see a streaming-style typewriter reply appear above. Try keywords like *Tokyo*, *email*, *quantum*, *debug*, *budget*, or *weekend trip* to see different pre-written answers.
- **Switch conversations.** The left sidebar lists recent chats; click any to swap context. Use **New chat** to start over.
- **Try the mock controls.** Copy, thumbs up, thumbs down, regenerate, voice input, and attachments all show a confirmation toast, but they don't actually do anything (deliberately — this is a UI demo).
- **Browse the marketing pages.** The sign-in, sign-up (multi-step), and pricing (Free / Plus / Pro / Business / Enterprise with feature comparison and FAQ) pages are all included.

## How to use it

Open `index.html` in any modern browser. Type a question and press Send — try mixing in one of the trigger keywords above to see the relevant pre-written reply. Use the sidebar to switch between sample conversations, or visit `login.html`, `signup.html`, or `pricing.html` for the surrounding flows.

## What was changed in this version

- The thumbs-up and thumbs-down buttons under each assistant reply now look pressed (with a green or red background) when you tap them, so you can tell which one you picked, and tapping again removes the feedback. Picking one un-picks the other.
- The microphone button now shows a clear pulsing red state while "listening" and a friendly "Listening… tap mic again to stop" toast, and you can stop it manually instead of waiting for the fake transcription.
- On phones, closing the sidebar now slides it out with a smooth animation and a dark dim behind the chat. Tapping the dimmed area closes the sidebar, which makes it feel like a proper drawer.
- The login page now validates your email before submitting — you'll see an inline red error like "That doesn't look like a valid email" instead of a silent failure, and the button briefly says "Signing in…" after a valid submit.
- The login page also shows a small helper line under the email field ("Enter the email you used to sign up.") so you know what to type.
- Top-nav links on the pricing page, footer links on the auth pages, and the chat composer's mic / send / attach buttons all have noticeably bigger tap areas on phones.
- The "Open link" button in the Share dialog now briefly says "Opening…" and shows a confirmation toast when clicked, rather than doing nothing visible.

## How to test the changes

1. Open `index.html` and send any message. Once a reply appears, click the thumbs-up under it — the button should turn green and stay pressed, and a toast says "Thanks — glad it helped!". Click it again to un-pick. Then click thumbs-down — it should turn red and the thumbs-up should release automatically.
2. Click the microphone icon in the composer — it should turn red and pulse while a toast says "Listening…". Click it again before two seconds is up to stop early, or wait for it to auto-fill the budget question.
3. Shrink the browser to phone width and toggle the sidebar — it should slide out with a smooth animation, and the rest of the page should dim. Tap the dim area to close it.
4. Open `login.html`. Submit with the field blank, then with something like `not-an-email` — each should show an inline red error and the Continue button should not load. Enter a valid email like `you@example.com` and the button should briefly say "Signing in…".
5. Open the Share dialog from any chat and click the "Open link" button — it should briefly read "Opening…" and a toast confirms.
6. On a phone or narrow window, check that the top-nav links on `pricing.html` and the composer's mic / send buttons on `index.html` are large enough to comfortably tap.
