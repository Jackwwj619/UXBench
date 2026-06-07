# Atlas Tutor

Atlas Tutor is a demo AI tutor that helps students work through math, programming, physics, statistics, and linear algebra problems one step at a time. The example conversation walks through the chain rule in calculus, but the layout is built for any subject you'd ask a tutor about.

> Fictional product — replies are pre-written for the chain-rule walkthrough, not generated live.

## What you can do

- **Read a worked example.** The conversation in the center shows a full back-and-forth: a student asks about differentiating `sin(x²)`, and the tutor explains where the chain rule comes from, walks through a harder three-layer problem, and finishes by writing a Python helper using SymPy.
- **Practice on your own.** The right rail has six chain-rule problems with difficulty pills. Hit **Solve** to mark one as done; hit the hint button if you're stuck. Your progress bar updates as you finish problems.
- **Browse past chats and subjects.** The left rail groups your tutoring history by recency (Today / Last 7 days / Earlier) and lets you jump between subjects.
- **Ask follow-ups.** Type into the composer at the bottom (Cmd/Ctrl+Enter sends), or tap a suggestion chip to pre-fill the box. Each tutor reply shows briefly as "Thinking…" before the answer appears.
- **Copy or run code samples.** Code answers come with **Copy** and **Run** buttons; Run reveals a sample output panel inline.

## How to use it

Open `index.html` in any modern browser. Read through the existing chain-rule conversation, click the practice problems on the right to mark them solved, or type a new question into the composer to send another turn. Use the **Step-by-step mode** toggle in the chat header if you want the tutor to slow down its explanations.

## What was changed in this version

- The composer now sends on plain **Enter**, with **Shift+Enter** for a newline (the hint under the box has been updated to say so). Cmd/Ctrl+Enter still works too. Hitting Send with an empty box shows a small "Type a message first" message instead of doing nothing silently.
- While the tutor is "thinking", the send button visibly changes to a "…" state and is disabled, so it's obvious the message is in flight.
- The "⋯" button in the chat header is no longer dead — it opens a proper drop-down menu with Rename thread, Export conversation, Archive thread, Settings, Privacy & data, and Help & shortcuts. Esc or clicking outside closes it.
- Subject links in the left rail (Mathematics, Programming, etc.) and the past-thread items can now be clicked. Choosing a thread updates the chat title and shows a small confirmation; choosing a subject highlights it as the active one.
- The four "Concepts in this thread" links in the right rail now respond to clicks with a brief "Opening …" confirmation, instead of being dead links.
- Each practice problem now shows a small status pill (Ready / In progress / Checking / Correct). After you submit, the card briefly shows a spinning "Checking…" state before turning green.
- Message-action buttons (👍, 👎, Share, Copy, Try again) now actually do something visible — Copy puts the reply on your clipboard, Share copies a link, and each shows a short confirmation message.
- The Copy / Run buttons on code blocks now also show a small confirmation message at the bottom of the screen when used.
- On a phone or narrow window, the header buttons, message-action buttons, composer controls, send button, and practice Solve/Hint buttons are all larger and easier to tap.

## How to test the changes

1. Open `index.html`. Click into the composer at the bottom and press **Enter** with no text — a small message at the bottom should say "Type a message first". Type a short question and press Enter; the send button should momentarily show "…" while the reply is generated.
2. Press **Shift+Enter** inside the composer to confirm it now inserts a newline instead of sending.
3. In the chat header, click the **⋯** button. A menu should open with six options. Pick "Export conversation" — a small confirmation pops up at the bottom. Open it again and press Escape to close, or click anywhere outside.
4. In the left rail, click any subject (e.g. "Programming") — it should become the highlighted subject and show a brief confirmation. Click any past thread underneath; the chat title at the top of the conversation should change to that thread's name.
5. In the right rail, click any of the four "Concepts in this thread" links — each should show a short "Opening …" message at the bottom.
6. On a practice card, click **Solve** to enter "In progress", then **Submit** — the card should briefly show "Checking…" with a spinner before turning into "Correct ✓". The progress bar updates.
7. Below any tutor reply, click **📋 Copy** to copy the reply text, **⤴ Share** to copy a share link, or **👍 / 👎** — each should flash a confirmation. The Copy / Run buttons on the Python code card behave the same way.
8. Shrink the browser to phone width. Buttons in the header, the message-action row, the composer, and the practice cards should all be noticeably larger.
