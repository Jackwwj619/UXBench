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

- On phones, a top bar with two icon buttons now lets you slide the left history rail and right practice rail in and out — they used to just disappear on smaller screens.
- Tapping a suggestion chip under the composer now sends that question straight away instead of just typing it into the box for you.
- The "New chat" button in the left rail actually clears the conversation, resets the header, and pops up a small confirmation toast.
- Clicking the gear icon next to your profile opens a real settings panel with Account, Privacy, Appearance, and Model sections you can browse and save.
- Action buttons under each tutor reply now do something visible — Share copies a link, Copy copies the message text, thumbs up/down record feedback, and Try again "regenerates", each with a small confirmation message at the bottom of the screen.
- Concept links in the right rail (Chain rule, Derivatives of trig functions, etc.) now expand a short plain-English definition right under the link when you click them, and collapse it when you click again.
- Hint buttons on practice problems now toggle — click once to show the hint, click again to hide it.
- The progress bar on the right rail now starts at "4 / 10" (matching the problems already shown as done) and fills as you solve more, instead of starting empty and being off-by-one.
- Friendly confirmation toasts appear at the bottom for actions like "Code copied to clipboard", "Step-by-step mode on", "Started a new chat", and "Settings saved".
- Threads in the left rail and subject links highlight when you click them, so it's clear which one is currently active.

## How to test the changes

1. Open `index.html` and shrink the browser to phone width. A new top bar with a menu icon and a play icon appears — tap the menu icon to slide in the chat history, then the play icon to slide in the practice panel.
2. Under the composer, click any of the suggestion chips (like "Try a 3-layer example") — the tutor should answer right away instead of only filling in the box.
3. Click the gear icon next to "Selene Aiyer" in the bottom-left. A settings dialog should open with Account, Privacy, Appearance, and Model sections. Press Save changes and you'll see a "Settings saved" toast.
4. Click "New chat" at the top-left — the conversation should clear and the header should change to "New conversation".
5. Under any tutor reply, click Share — a "Link copied to clipboard" toast appears. Click Copy, then the thumbs-up/down icons, and Try again — each shows a different confirmation toast.
6. In the right rail, click the "Chain rule" link under Concepts — a short definition should appear right under it. Click again to hide it. Then click the hint button on any practice problem and watch the amber hint toggle on and off.
7. Mark a couple of practice problems as Solve → done — the progress bar at the bottom of the right rail should grow toward 10/10.
