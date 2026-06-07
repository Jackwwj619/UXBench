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

- Clicking a past chat in the left sidebar (like the Python debug or recipe ones) now loads a real example back-and-forth instead of the same generic "this is a previous conversation" placeholder for every chat.
- Clicking a past chat first shows a brief "typing" indicator before the conversation appears, so the click feels like it registered.
- The send arrow now ignores empty messages, and if the assistant is still typing a reply, pressing send again shows a small "Still generating — try again in a moment" hint instead of sending the message twice.
- On the login and sign-up pages, the **Continue with Google / Apple / Microsoft** buttons now show a small "Demo" tag and, when clicked, briefly say "Connecting…" before showing a friendly toast explaining that social sign-in isn't connected on this static site.
- The suggestion cards on the empty chat screen ("Plan a trip", "Write an email", etc.) are now real buttons with screen-reader labels, so a keyboard or assistive tech user can pick them.
- The four "Explore GPTs" cards (DALL-E, Data Analyst, Creative Writing Coach, Math Tutor) now respond to a click with a small "Opening…" toast instead of doing nothing.

## How to test the changes

1. Open `index.html`. In the left sidebar, click any chat under "Yesterday" or "Last 7 days" (for example "Python script debugging" or "Recipe suggestions") — a typing indicator should flash, then a real example conversation appears.
2. With the message box empty, click the send arrow — nothing happens. Type a message and click send; while the typewriter reply is still streaming, click send again with new text — you should see the "Still generating" toast.
3. Open `login.html`. Click **Continue with Google**. The button briefly says "Connecting to Google…" then a toast appears explaining the demo mode. Try the Apple and Microsoft buttons the same way. Repeat on `signup.html`.
4. On the empty chat in `index.html`, scroll down to the "Explore GPTs" section and click any of the four cards — a toast appears saying "Opening …".
