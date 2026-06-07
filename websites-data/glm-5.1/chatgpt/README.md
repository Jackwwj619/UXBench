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

- On a phone, the left sidebar now starts collapsed so you can actually see the chat right away. Tapping the open button slides it in, and tapping outside the sidebar slides it back out.
- The login and sign-up forms now show a clear red message right under the email field if you leave it blank or type something that isn't a valid address. The field also turns red, and the error disappears as soon as you start fixing it.
- The Continue button on login and sign-up now briefly shows a spinner with "Signing in..." or "Creating account..." while it pretends to work, then a small dark toast pops up explaining "This is a demo clone — sign-in is not available."
- The Google / Apple / Microsoft sign-in buttons now also pop a toast telling you SSO isn't available in this demo, instead of looking like they should work but doing nothing.
- The "Contact sales" button on the Enterprise card in the pricing page now opens a pre-filled email instead of going to a dead link.
- The model selector at the top of the chat can now be opened with the keyboard (press Enter or Space when it's focused) and announces itself properly to screen readers.
- The big message-input box has a real label for screen readers and assistive tech.
- Buttons in the chat header, sidebar, and form pages are bigger on phones (at least 44 pixels tall) so they're easier to tap.

## How to test the changes

1. Open `index.html` on a narrow window or phone-sized viewport — the sidebar should be hidden by default and the chat should fill the screen. Tap the open-sidebar button and the sidebar should slide in; tap somewhere outside the sidebar and it should close again.
2. Open `login.html`. Click **Continue** with an empty email — a red "Email is required" message appears under the field and the field outline turns red. Type `bad-email` and click Continue — the message changes to "Please enter a valid email address." Start typing again and the red message clears.
3. Type a valid email like `you@example.com` and click Continue — the button shows a spinner, briefly says "Signing in...", then a dark toast slides up from the bottom saying this is a demo.
4. On `login.html`, click any of the Google / Apple / Microsoft buttons — each should briefly say "Connecting to..." and a toast should appear saying SSO is unavailable.
5. Repeat steps 2–4 on `signup.html` to confirm the same behaviour for sign-up.
6. Open `pricing.html`, scroll to the Enterprise card, and click **Contact sales** — your email client should open with a pre-filled subject line.
7. On `index.html`, click into the model name at the top of the chat then press **Enter** or **Space** on the keyboard — the model dropdown should open.
