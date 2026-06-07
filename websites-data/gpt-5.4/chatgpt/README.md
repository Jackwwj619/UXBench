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

- The login page now has a small note at the top saying "This is a demo experience — no real account is created.", so you know up front nothing is really being signed in to.
- Submitting the login form with an empty box or a bad email (like "alice@") now shows a clear "Please enter a valid email address." message instead of relying on the browser's built-in popup.
- After you submit a valid-looking email, the **Continue** button shows "Signing in…", then briefly switches to "Demo only — no account is created" before resetting, so the demo's behaviour is obvious.
- The **Continue with Google / Apple / Microsoft** buttons now actually respond when clicked: each one briefly shows "Connecting to Google…", then "Google sign-in is unavailable in this demo" before resetting — instead of doing nothing at all.

## How to test the changes

1. Open `login.html` in a browser. A small note appears above the email box explaining this is a demo and no real account is created.
2. Leave the email box empty and click **Continue** — a red "Please enter a valid email address." message appears under the field. Try "alice@" and you'll see the same message.
3. Type a valid email (e.g. `you@example.com`) and click **Continue** — the button text changes to "Signing in…", then to "Demo only — no account is created", and then returns to "Continue" after a couple of seconds.
4. Click **Continue with Google** (or Apple, or Microsoft) — the button text shows "Connecting to Google…", then "Google sign-in is unavailable in this demo", before going back to its original label.
