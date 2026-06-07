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

- The chat history items in the left sidebar now load the right conversation when you click them. Each titled chat (Python debug help, Dinner recipe ideas, Email draft, Async/await) now shows its own matching user question and AI reply instead of the same canned demo.
- The sidebar search now hides the "Today", "Yesterday", "Last 7 days" section headers when none of their items match your search, so you don't see empty section labels. The "clear search" X button also has a proper label for screen readers.
- The "Continue with Google / Apple / Microsoft" buttons on the log-in and sign-up pages now explain clearly that social sign-in isn't available in this demo, instead of doing nothing when clicked.
- The sign-up form now shows inline error messages directly under the email field (with red highlighting) rather than inserting a floating error block, and errors clear as soon as you fix the field.
- The pricing page buttons now carry the plan name through to sign-up. Clicking "Upgrade to Plus" on pricing takes you to a sign-up page that shows a "Selected plan: ChatGPT Plus · $20/month" banner and a personalized headline.
- The "Contact sales" button on the Enterprise card now opens a pre-filled email to sales@example.com and shows a brief toast telling you what's happening, instead of being a dead link.
- The Microsoft sign-in icon has been replaced with the proper four-square Microsoft logo (it was incorrect before).

## How to test the changes

1. Open `index.html`. In the left sidebar, click "Python script debug help" — the chat area now shows a Python TypeError question with a debugging-focused answer. Click "Dinner recipe ideas" — a different conversation about chicken/broccoli/rice appears. Try the other two history items too.
2. Type something into the sidebar search like "qq" — the section headings (Today / Yesterday / Last 7 days) hide along with their empty contents. Click the X in the search box to clear it.
3. Open `login.html`. Click "Continue with Google" — a polite notice appears below explaining the demo limitation. Try clicking Continue with an empty or invalid email — a clear red inline error shows up under the field.
4. Open `pricing.html` and click "Upgrade to Plus". The sign-up page shows a "Selected plan: ChatGPT Plus" banner at the top and a personalized title. Then click "Contact sales" on the Enterprise card — your email client opens a draft to sales@example.com and a toast appears at the bottom.
