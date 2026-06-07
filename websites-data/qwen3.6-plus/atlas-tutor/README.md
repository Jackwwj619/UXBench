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

- **Settings now actually opens something.** Clicking the gear in the left rail (or the "⋯ More" button in the chat header) opens a settings panel with account info, privacy toggles, an export-your-data link, and a danger-coloured "Delete all chats" action.
- **Practice problems ask for your answer.** When you click **Solve** on a practice problem, a text box appears to type your answer into. If you click Submit with the box empty, the box turns red, gently shakes, and shows a "Please enter an answer" message instead of silently doing nothing.
- **Step-by-step toggle gives clearer feedback.** Turning step-by-step mode on now adds a green dot to the button, changes its label to "Steps · On", and briefly shows a small confirmation message at the bottom of the screen.
- **Practice problems on a phone.** On a narrow screen, the new "▶ Practice" button in the chat header opens the practice list as a bottom sheet so you don't have to scroll past the conversation to reach it.
- **Brief confirmation messages (toasts).** Several small actions (toggling step mode, jumping to practice, validating an empty answer) now show a short message at the bottom of the screen instead of changing silently.
- **Bigger touch targets on phones.** Chat-header buttons, message actions, copy/run code buttons, the composer's attach/mic/send buttons, and the practice hint button are all sized larger on small screens so they're easier to tap.
- **Escape closes pop-ups.** Pressing Escape closes the settings dialog or the mobile practice sheet, whichever is open.

## How to test the changes

1. Open `index.html` and click the gear icon at the bottom of the left rail — a Settings dialog should appear with sections for Account, Privacy, and Help. Try the "⋯" button in the chat header; it should open the same dialog. Press Escape to close it.
2. In the right-rail practice list, click **Solve** on any problem. A text box should appear. Click Submit while it's empty — the box turns red and shakes, and a small banner says "Please enter an answer". Type something, click Submit, and the card should turn green and the progress bar update.
3. Click the **Steps** button in the chat header. The button should highlight with a green dot and its label change to "Steps · On"; a short message slides up from the bottom. Click again and it turns off.
4. Resize the browser to phone width. The right rail should hide. Click the new **▶ Practice** button in the chat header — the practice list opens as a sheet from the bottom. Close it with the × or by pressing Escape.
5. On a phone-sized window, try tapping the chat-header buttons, the message reaction icons under the tutor replies, and the attach/mic/send icons in the composer — they should all feel comfortably large.
