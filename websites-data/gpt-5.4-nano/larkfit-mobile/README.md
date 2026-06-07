# Lark

Lark is a demo iOS-style fitness tracker — the kind of app you'd use to see whether you closed your activity rings today, follow a workout, and look back over your last month of training. The layout simulates a phone (390 × 844) on a desktop, and goes edge-to-edge on a real phone.

> Fictional product — workouts, history, and connected services are sample data.

## What you can do

- **See today's activity.** Three animated rings show Move (137%), Exercise (113%), and Stand (75%) progress. Below: steps, distance, resting heart rate, and sleep tiles, your scheduled workouts for today, and a 14-day streak strip with this week highlighted.
- **Pick a workout.** Browse 12 workouts in a grid with covers, types, coaches, and meta. Filter pills (All / Run / Bike / Strength / Yoga / HIIT / Recovery) and a search bar let you combine filters.
- **Read a workout's plan.** Each workout's detail screen shows the description, a 4-step plan with timestamps, what you'll need, and a big **Start workout** button.
- **Look back at your training.** The activity screen has 30-day / week / year ranges, summary tiles (workouts, time, distance, calories), a 30-day intensity heatmap with a 5-level color scale, and a list of recent sessions with location and effort.
- **Manage your profile.** Goals progress bars (move, workouts, sleep), connected services (Lark Watch S2, Apple Health, Strava, MyPlate) with on/off badges, preferences, and sign-out.

## How to use it

Open `index.html` in any modern browser. The activity rings on the Today tab animate as the page loads. Use the tab bar (Today / Workouts / Activity / You) to switch screens, and tap any workout card or recent session to open the workout detail screen.

## What was changed in this version

- Each workout card in the Workouts grid now has its own clearly visible green **Start** button on the right, so you don't have to guess that the whole card is tappable.
- The whole card is still tappable too, and tapping anywhere on a card briefly shows a "Loading…" message at the bottom of the phone screen as it opens the workout details.
- The little play arrows on Today's scheduled workouts now actually take you to the workout detail screen.
- The gear icon on the workouts screen and on the profile screen now opens a settings panel that slides up from the bottom, with options like default workout view, auto-pause, audio cues, heart-rate zones, units, and notifications. You can close it with its X button, by tapping outside it, or by pressing Escape.
- The "+" button in the top corner of the Today tab now shows a small "Quick log — coming soon" message instead of doing nothing, and the share arrow on the workout detail screen shows a "Share link copied" message.
- The big green **Start workout** button on the detail screen now shows a "Workout starting…" message so you can tell the tap registered.
- Buttons, tabs, back arrows, and filter pills are all bigger now so they're easier to tap with a thumb on a real phone, and they give a small press-down animation when tapped.
- Icon-only buttons (the +, the share arrow, the back arrow, the gear, the play buttons, and so on) now have hidden labels so screen readers can announce what each one does, and workout cards can be opened from the keyboard with Enter or Space.

## How to test the changes

1. Open `index.html` and tap **Workouts** in the bottom tab bar. Each workout card now has a green pill-shaped **Start** button on the right next to the title — click one and a small black message appears at the bottom saying "Loading …" before the detail screen opens.
2. On the Workouts screen, click the gear icon in the top-right of the header. A panel slides up from the bottom titled "Workout settings" with options like Auto-pause and Units. Press Escape — the panel slides away.
3. Go to the **You** tab and click its gear icon — the same panel slides up, this time titled "Settings". Close it by clicking outside it on the dimmed background.
4. On the Today tab, click the "+" button in the top-right. A "Quick log — coming soon" message appears at the bottom.
5. Open any workout detail screen and click the big green **Start workout** button. A "Workout starting…" message appears, and the share arrow at the top shows "Share link copied" when clicked.
6. On the Today tab, click either of the small play arrows next to today's scheduled workouts — they now open the workout detail screen instead of doing nothing.
7. Resize the browser to a narrow phone-width window — the bottom tab bar, header buttons, filter pills, and play buttons are all noticeably bigger and easier to tap.
