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

- The big **+** button on the Today screen now opens a "Log activity" sheet where you can pick an activity type and minutes, and confirm to log it. Previously the button did nothing.
- The **Start workout** button on a workout's detail page now starts a live timer overlay that counts up by the second, with an **End workout** button that logs the minutes when you stop.
- The settings gears on the Workouts and Profile screens, the share arrow on the workout detail screen, the "Adjust goals" button, the preference rows (Units, Notifications, Privacy & sharing, Data export), and **Sign out** all now open real sheets / confirmations instead of doing nothing.
- The time-range dropdown on the Activity screen (30 days / This week / This year) now actually updates the workouts, time, distance, and calories tiles when you change it.
- The 30-day intensity heatmap now visibly distinguishes rest days, so you can see your days off rather than guessing.
- Routine actions throughout the app confirm with a small toast at the bottom of the phone instead of silently doing nothing.
- The bottom tab bar, search box, filter pills, and icon buttons are now properly labelled for screen readers and keyboard users.

## How to test the changes

Open `index.html` in any modern browser (or resize to a narrow phone width).

- On the **Today** tab, tap the **+** button in the top-right — a "Log activity" sheet should slide in. Pick a type and minutes and tap **Log**; a toast confirms it was logged.
- Tap a workout under "Today's plan" (or on the Workouts tab) to open its detail screen, then tap **Start workout** — a green panel covers the screen showing a live counting timer. Tap **End workout** and the timer should disappear with a toast.
- On the workout detail screen, tap the share arrow in the top-right — a "Share workout" sheet should open.
- On the **You** tab, tap **Adjust goals** — a sheet should appear with editable goal numbers. Save it and a toast confirms.
- Still on **You**, tap any row in the Preferences list (Units, Notifications, etc.) — each opens a corresponding sheet. Tap **Sign out** at the bottom — a confirmation sheet asks before signing you out.
- Tap the **Activity** tab and change the dropdown at the top from "Last 30 days" to "This week" or "This year" — the four summary tiles should update with different numbers.
- On the same Activity screen, look at the 30-day heatmap — lighter, hollow cells indicate rest days.
