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

- The send arrow next to the message box is now disabled until you actually type something. If you try to send an empty message, the button shakes and a small "Type a message to send" toast appears.
- The gear icon at the bottom of the left rail now opens a real Settings dialog with Account, Notifications, Data & Privacy, and Appearance sections. Press Escape or click outside to close it; "Save changes" shows a "Settings saved" toast.
- The "..." more-options button next to Practice in the chat header now opens a menu with Settings, Practice problems, Export thread, Rename chat, and Delete chat.
- The hint button on practice problems now toggles — click it once to show the hint, click again to hide it.
- "New chat" in the left rail now actually clears the conversation, retitles the chat header, and puts your cursor in the message box.
- The "key concepts" links in the right rail now do something. Clicking one (e.g. "Chain rule") pre-fills the composer with a question about that topic and focuses it, ready to send.
- The paperclip attach button no longer feels broken. Clicking it shows a clear "Attachments coming soon" toast.
- On a phone or narrow window, the Practice problems panel now slides up from the bottom as a sheet when you tap the "▶ Practice" button in the chat header, instead of being hidden off-screen.

## How to test the changes

1. Open `index.html`. The send arrow is greyed out. Click it once with an empty box — the button shakes and a toast appears. Then type any text and watch the arrow turn active.
2. Click the gear icon in the bottom-left. The Settings dialog appears with four sections. Press Escape to close, or click "Save changes" to see the saved toast.
3. In the chat header (top right of the conversation), click the "..." button. A menu drops down with five items. Pick "Export thread" or "Rename chat" to see the corresponding toast.
4. In the right rail, click "💡 Hint" on a practice problem — a yellow hint appears. Click it again and the hint hides and the label resets.
5. In the left rail, click "+ New chat" near the top. The conversation clears and the chat header changes to "New chat".
6. Under "Key concepts" (lower right rail), click "Chain rule". The message box fills with a ready-to-send prompt.
7. Click the paperclip in the message box — a "coming soon" toast appears.
8. Resize the window narrow (phone-size) and click "▶ Practice" in the chat header — the practice panel slides up as a sheet.
