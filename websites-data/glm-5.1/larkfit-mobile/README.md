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

- The big green **Start workout** button now opens a full-screen workout timer with Pause/Resume and "End workout" buttons. Ending the workout asks you to confirm, then shows how much time was saved.
- The **+** button in the Today header now opens a "Quick add" pop-up where you can log a workout, steps, water, or a mood note, with a confirmation toast at the bottom.
- The settings gear (⚙) on Today and Profile now opens a real "Settings" pop-up with notification, units, and auto-pause toggles, instead of doing nothing.
- The **Adjust goals** button on the Profile screen now opens a pop-up to edit your daily Move calories, weekly workouts, and nightly sleep hours.
- The share arrow on the workout detail screen now uses the phone's share sheet if available, or opens a "Share workout" pop-up with copy-link / message / email options.
- The **Sign out** button now asks "Sign out?" with a red confirm button before signing you out, and returns you to the Today screen with a confirmation toast.
- Small confirmation toasts now appear at the bottom of the screen after actions like adding a quick log, updating goals, or signing out, so it's clear something happened.
- All round icon buttons (back, +, gear, play) and pill buttons are larger and easier to tap on phones, with a small press-down animation when you tap them.
- Screen readers now read out proper labels for the unlabelled icon buttons (back, add, settings, share, period selector).

## How to test the changes

1. Open `index.html`. On the Today tab, tap the **+** button at the top right — a "Quick add" pop-up should appear. Pick a type, optionally type a note, and tap **Add** — a confirmation toast should slide up.
2. Still on Today, tap the gear (⚙) icon — a "Settings" pop-up should appear with three toggle rows.
3. Tap any workout card to open its detail screen, then tap **Start workout** — the button briefly shows "Starting", then a green full-screen timer appears. Tap **Pause** (it changes to **Resume**), then **End workout** — a confirm pop-up shows the time you'll save before returning you to Today with a "Workout saved" toast.
4. From a workout detail screen, tap the share arrow (⤴) at the top right — a "Share workout" pop-up should appear with copy-link / message / email options.
5. Go to the **You** tab. Tap **Adjust goals** — a pop-up should let you edit Move calories, workouts per week, and sleep hours. Save it and you should see a "Goals updated" toast.
6. Still on **You**, tap **Sign out** — a confirmation pop-up should appear with a red "Sign out" button and a "Stay signed in" option.
7. Try tapping the round back button on a detail screen, or the period dropdown on Activity — they should feel comfortably large with a subtle press animation.
