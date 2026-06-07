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

- Pressing **Send** with an empty message box no longer does nothing silently — the box briefly shakes, a small "Type a message to send" toast appears, and the cursor jumps back into the input.
- The Send button now visibly shows progress while a reply is being generated (a "sending" look), and goes back to normal when the reply finishes.
- When you click a past conversation in the sidebar, the title of that chat now appears in the loaded preview ("This is a previous conversation: **Dinner recipe ideas**"), a small toast confirms which one you opened, and on a phone the sidebar slides shut automatically so you can read the chat.
- The voice button now turns red and pulses while it's "listening," shows a "Listening…" toast, and ends with a "Transcribed — review and send" toast — instead of silently flipping color.
- The user menu and the model selector at the top can now be opened with the keyboard (Tab to focus, Enter to open), not just by mouse, and the model selector shows a "Switch model" tooltip on hover.
- On phone-sized screens, all the small icon buttons (sidebar toggle, attach, voice, send, history items) now have larger, easier-to-tap areas, and opening the sidebar dims the chat area behind it so it feels like a proper overlay.
- A subtle hover highlight has been added to the voice and attach buttons so you can see when you're about to click them.

## How to test the changes

1. Open `index.html`. Click **Send** with an empty input — the box shakes briefly, a "Type a message to send" toast appears at the bottom, and the cursor jumps back into the box.
2. Type "Tokyo trip" and click **Send**. While the reply is streaming in, the Send button looks dimmed and busy; once the reply finishes, it returns to its normal look.
3. In the left sidebar, click any past conversation (e.g. "Dinner recipe ideas"). The chat area now shows a line including the conversation title, and a small "Opened: …" toast appears.
4. Resize the window to a phone width, open the sidebar via the menu button, and tap a past conversation — the sidebar slides shut on its own and the chat is visible.
5. Click the microphone icon in the input bar — it turns red and pulses, a "Listening…" toast shows, and after a moment a "Transcribed — review and send" toast appears with placeholder text dropped in the input.
6. Press Tab repeatedly until the user avatar (bottom left of the sidebar) or the model name (top of the page) is highlighted, then press Enter — the menu/list opens just like clicking.
7. Hover over the model name at the top of the page — a "Switch model" tooltip appears.
