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

- The tutor's mock replies are now topic-aware. Ask about Markov chains, eigenvalues, Big-O, Bayes' theorem, or complex numbers and you get a tailored answer instead of the same chain-rule paragraph for every prompt.
- Practice problems now ask for your actual answer. Clicking **Solve** opens an inline input labelled with the equation; clicking **Submit** with an empty field shows a red "Enter an answer before submitting" error and won't tick the problem off until you've typed something.
- The "+ New chat" button now resets the conversation to a fresh "New chat" greeting and clears the active thread highlight, so you can actually start over instead of being stuck in the chain-rule transcript.
- The gear icon in the left rail now opens a proper Settings modal (model, theme, default step-by-step mode, sound). You can close it by clicking the backdrop, the X, Cancel, Save, or by pressing Escape.
- The chat-header `⋯` button now opens a small popover with "Rename chat / Pin to top / Export transcript / Delete chat" on desktop, and on phones it opens the left-rail drawer instead.
- The left and right rails are now reachable on phones. The chat header's hamburger toggles the chats list, the ▶ Practice button toggles the practice rail, and a dark scrim closes either drawer when tapped.
- The chat-search box in the left rail actually filters threads as you type, and hides section headers (Today / Last 7 days / Earlier) when none of their chats match.
- Clicking the **▶ Practice** button on a wide screen now scrolls the first practice problem into view with a brief highlight flash, so you can see where it landed.
- Clicking a subject link in the left rail (Math / CS / Physics …) now visibly highlights the active subject.

## How to test the changes

1. Open `index.html`. In the composer, type "What is a Markov chain?" and press Cmd/Ctrl+Enter — after the "Thinking…" pause you get a Markov-specific answer with bullet steps, not the chain-rule canned reply. Try "How do I find eigenvalues?" or "Explain Big-O of merge sort" for different topic-aware replies.
2. In the right rail, click **Solve** on any practice problem — an inline answer box appears. Click **Submit** without typing anything and a red error appears. Type any answer, click **Submit**, and the problem turns green and the progress bar advances.
3. Click **+ New chat** in the left rail — the transcript clears to a fresh greeting and the header reads "New chat".
4. Click the gear icon at the bottom of the left rail — a Settings modal opens. Press Escape to close it, then reopen and click outside the card to close.
5. Click the `⋯` button in the chat header — a popover appears with Rename / Pin / Export / Delete options. Click anywhere outside to dismiss.
6. Shrink the window to phone width. The header's hamburger opens the chats drawer; the ▶ Practice button opens the practice drawer. Tap the dark scrim to close either.
7. Type "sym" or "calc" into the chat-search box at the top of the left rail — threads filter in real time and empty section headers disappear.
