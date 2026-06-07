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

- The **Start workout** button on a workout's detail screen now actually does something. Tap it once to start a timer (with a small pulsing dot showing the workout is running), tap it again to stop and save with a confirmation message showing your elapsed time.
- The **Adjust goals** button on the You tab now opens a sheet with sliders for daily move calories, weekly workouts, and sleep target. Saving shows a small "Goals updated" message.
- The Preferences list on the You tab is now interactive. Tapping **Units** lets you switch between Imperial and Metric; **Notifications** opens toggles for daily reminders, workout summaries, streak alerts, and coach replies; **Privacy & sharing** lets you set your profile to private / friends / public; and **Data export** lets you grab a workouts CSV, GPS bundle, or full archive.
- The gear icon at the top of the Workouts and You screens now opens a settings sheet that jumps you into Units, Notifications, or Privacy.
- Tap targets across the app are now larger and easier to hit on a real phone — header icons, filter pills, and preference rows all meet the 44-pixel minimum touch size.
- Sheets slide up from the bottom with a small grab-handle, and a tap outside the sheet or the Escape key closes them.
- Small confirmation toasts now appear at the bottom of the screen after you save settings or finish a workout.

## How to test the changes

1. Open `index.html`. Tap any workout card to open its detail screen, then tap **Start workout** — the button turns dark and shows a running timer. Tap it again to stop and see a "Workout saved" message with your time.
2. Go to the You tab (bottom right). Tap **Adjust goals** — a sheet slides up with three sliders. Drag any of them, then tap **Save goals** to see the saved confirmation.
3. Still on the You tab, tap **Units · imperial** in the Preferences list — pick Metric to see the label change. Tap **Notifications · 3 enabled** and toggle one of the rows to watch the count update.
4. Tap **Privacy & sharing** and tap the Profile visibility row a couple of times to cycle through private / friends / public.
5. Tap **Data export** and pick the full archive option — you should see a confirmation that the request was queued.
6. Tap the gear icon at the top right of the Workouts tab or the You tab — a quick settings sheet appears with shortcuts into Units, Notifications, and Privacy.
7. Open any sheet and tap outside the sheet or press Escape — the sheet should close.
