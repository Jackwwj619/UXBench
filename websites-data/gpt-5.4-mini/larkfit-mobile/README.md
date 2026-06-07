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

- The time-range dropdown on the Activity tab (Last 30 days / This week / This year) now actually changes the numbers, the heatmap, and the heading. Picking "This week" shrinks the heatmap to 7 cells and renames the section to "7-day intensity"; "This year" relabels it to "12-month intensity" and shows much larger totals.
- The Workouts tab now shows a small line above the list saying how many workouts matched, like "4 workouts · run". If no workouts match your filter and search, you get a friendly "No workouts match" empty card instead of a blank screen.
- The today scheduled-workout cards now open the workout detail screen when you tap anywhere on the card, not just on the play button.
- The "Adjust goals" button on the You tab now slides up a bottom sheet with your Move / Workouts / Sleep / Stand-hours goals, and tapping outside it or pressing Done closes it (with a "Goals saved" confirmation).
- Pressing "Sign out" on the You tab now opens a confirmation popup ("Sign out of Lark? — Cancel / Sign out") instead of doing nothing.
- Lots of previously-dead buttons now give a small confirmation popup so you know your tap registered: the + on the Today tab, the gear on the Workouts and You tabs, the share icon on a workout, the Start workout button, and each preference row on the You tab.
- Tapping the tab you're already on (for example Today while on Today) now smoothly scrolls back to the top of that screen.
- The category pills, heatmap, and summary tiles briefly fade while they update, so changes feel responsive rather than abrupt.
- Buttons across the app (the + and gear icons, the back arrow, the play buttons, the filter pills, the bottom tabs) are larger and easier to hit, and they give a subtle press effect when tapped.

## How to test the changes

1. Open `index.html`. Switch to the **Activity** tab. Open the range dropdown at the top right and pick "This week" — the four big numbers should change to smaller weekly totals, the heatmap should shrink to 7 cells, and the heading should now say "7-day intensity". Pick "This year" — the numbers should jump much larger and the heading should change to "12-month intensity". A small popup at the bottom should confirm the new range each time.
2. Go to the **Workouts** tab. Tap "Run" — the result count line should update (for example "4 workouts · run"). Type something like "zzz" into the search box — the list should clear and show a friendly "No workouts match" card. Clear the search and tap "All" to restore.
3. Back on the **Today** tab, tap anywhere on one of the "Today's plan" cards (not just the green play circle) — it should jump to the workout detail screen.
4. Go to the **You** tab. Tap "Adjust goals" — a sheet should slide up from the bottom with your goals. Tap "Done" — a small "Goals saved" popup appears. Tap "Sign out" — a confirmation popup should appear with Cancel / Sign out buttons.
5. Tap the **+** in the top-right of Today, the gear on Workouts, the gear on You, the share icon on a workout detail, the big "Start workout" button, and any preference row on You — each should show a brief confirmation popup at the bottom.
6. While on the Today tab, scroll down a bit, then tap the Today tab in the bottom bar again — the screen should smoothly scroll back to the top.
