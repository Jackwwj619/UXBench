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

- Picking a conversation from the sidebar on a phone now auto-closes the sidebar overlay so the chat is visible again, instead of leaving the navigation covering the message you just opened.
- The microphone button now confirms what's happening with two toasts ("Listening… speak now" → "Voice transcribed") and a visible listening state, so you're not left guessing whether the click registered.
- The "X" clear button inside the chat-history search box is now a real button with `aria-label="Clear search"` and a tooltip, so it's reachable by keyboard and screen readers.
- The login page now validates the email format inline. Submitting an empty or invalid email shows a red error under the field instead of silently doing nothing; submitting a valid one shows a "Login link sent to …" toast and locks the button into a "Check your email" state.
- The Google / Microsoft / Apple buttons on both login and signup pages now show a "… is not available in this demo" toast instead of pretending to be working SSO links.
- The sidebar toggle, message-action buttons (copy, thumbs, regenerate), and chat-history rows are now comfortably sized for tapping on a phone (44px targets).
- Sign-in and sign-up footer links (Terms / Privacy / "Forgot password?") now have proper 44px tap areas instead of being tiny inline text.

## How to test the changes

1. Open `index.html` and shrink the window to phone width. Open the sidebar, click any past conversation — the sidebar slides closed and the chat is visible again.
2. Click the microphone button in the composer — a "Listening… speak now" toast appears immediately, the icon turns red, and after about two seconds a second "Voice transcribed" toast appears with the sample text filled into the input.
3. Type something in the chat-history search box in the sidebar — an X appears. Hit Tab to focus it, then Enter to clear; the search resets.
4. Open `login.html`. Submit the form empty — a red "Please enter a valid email address." appears below the field. Type `bob@bob`, submit — same error. Type a real-looking address, submit — the button switches to "Check your email" and a toast confirms.
5. On `login.html` (or `signup.html`), click any of the "Continue with Google/Microsoft/Apple" buttons — a toast appears explaining the SSO isn't part of the demo.
6. On a phone-width window, tap the footer links on the login/signup page (Terms, Privacy, "Forgot password?") — they're all comfortable 44px tap targets instead of tiny inline text.
