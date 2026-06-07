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

- The send button now responds reliably to a single tap on phones and tablets — previously the first tap was sometimes swallowed when the keyboard was open.
- The **Step-by-step mode** toggle in the chat header now actually does something visible: a banner appears under the header, the steps in the example get highlighted with a teal outline, and the page scrolls to show them.
- The **⋯** (more) button in the chat header now opens a dropdown menu with four useful actions (Rename thread, Pin to top, Export as PDF, Delete thread). Each item briefly flashes a checkmark when picked.
- On phone or tablet screens, the **▶ Practice** button now slides the practice-problems panel in from the right as a drawer, with a dim overlay you can tap to close it. On the original it was hidden with no way to open it.
- When you click **Solve** on a practice problem, the card now briefly pulses so you can see exactly which one updated.
- The "key concepts" links in the right rail now actually do something. Clicking one opens a small inline preview underneath; clicking it again closes it.
- Past chats and subject links in the left rail now visibly highlight when clicked, so it's clear which one is selected.
- All buttons in the chat header and message actions are larger and easier to tap on phones.

## How to test the changes

1. Open `index.html` on a phone-sized window (or use the browser's responsive mode). Tap the send arrow once with text in the box — the message should send on the first tap.
2. Click the **⌥ Steps** button in the chat header. A teal banner appears under the header, and the example's numbered steps get a teal outline. Click it again to turn it off.
3. In the chat header, click the **⋯** button. A dropdown menu appears with Rename thread, Pin to top, Export as PDF, and Delete thread. Click any item to see the checkmark flash.
4. Resize the window narrow (or use a phone). Tap **▶ Practice** in the chat header — the practice panel slides in from the right with a dim overlay. Tap the overlay to close.
5. In the right rail, click **Solve** on any practice problem — the card briefly pulses with a teal ring.
6. In the right rail under "Key concepts", click "Chain rule" (or any other concept). A short preview line appears below it; click again to hide it.
7. In the left rail, click on any past chat or subject — it should become highlighted as the active one.
