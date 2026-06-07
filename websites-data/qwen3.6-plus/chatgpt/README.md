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

- **Past conversations actually have content now.** Clicking any of the sample chats in the sidebar opens a believable previous exchange — a Python error question, vegetarian dinners, a follow-up email draft, or an async JavaScript pattern — instead of a generic "This is a previous conversation" placeholder.
- **Voice input is now honestly labelled.** Tapping the microphone briefly turns it red and shows a toast saying "Voice input is not supported in this demo", instead of silently typing a fake message into the box.
- **The attach button now signals it's locked.** A tiny lock icon sits on the paperclip, and its tooltip explains that attachments are a Plus-plan feature in this mock, so you know up front it's not a working control.
- **The sidebar gets out of your way on phones.** When you tap a past chat on a small screen, the sidebar slides closed so the conversation fills the screen, just like the real app.
- **Buttons in the chat are easier to tap.** The send button, voice button, attach button, sidebar toggle, message actions (copy, thumbs up/down, regenerate), and sidebar items are all bigger on phones — meeting the comfortable 44px tap target you expect from a real mobile app.
- **Clearer keyboard focus.** Tabbing through the chat controls now shows a visible green outline around the focused button so you don't lose your place when using a keyboard.

## How to test the changes

1. Open `index.html` and click one of the past conversations in the left sidebar — you should see a realistic question and assistant reply (e.g. a Python error with a worked explanation), not a placeholder.
2. Click the microphone button in the input area. It should briefly turn red and a toast should appear saying voice input isn't supported. Nothing should be typed into the box.
3. Hover the paperclip (attach) button — the tooltip should mention the Plus plan, and the icon should have a small lock badge on it.
4. Shrink the browser to phone width, open the sidebar, and click a past conversation — the sidebar should automatically slide closed so the chat takes the full screen.
5. With the window still narrow, try tapping the send, voice, attach, and message-action buttons — each should feel comfortable to tap (no fiddly hits).
6. Use the Tab key to step through the input controls — each focused button should show a clear outline.
