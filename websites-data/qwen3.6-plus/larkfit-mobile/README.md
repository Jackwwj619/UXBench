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

- **The Start workout button actually starts a timer.** Tap it on any workout detail screen and the button turns dark green with a pulsing dot and a running "In progress · 0:12 · tap to end" counter. Tap again to end the session and reset the button.
- **Friendly empty state when no workouts match.** If your search or filter combination has no results, a centered card now appears with a magnifying-glass icon, a message that includes your filter and search text, and a green **Clear all filters** button — instead of just an empty list.
- **Bigger, finger-friendly buttons everywhere.** The round header icons, back button, play buttons on workout rows, the filter pills, the "Adjust goals" button, and the Sign out button are all noticeably larger so they're easier to tap accurately.
- **Header dropdowns look like dropdowns.** The range selector in the header now shows a small chevron arrow, making it obvious it opens a menu rather than looking like a plain button.
- **Smoother visual cue on the Start button.** The big lime Start workout button animates between its normal and active states instead of snapping abruptly.

## How to test the changes

1. Open `index.html`, go to the Workouts tab, and tap a workout card. On the detail screen tap **Start workout** — the button should turn darker green with a pulsing dot and show a running timer. Tap again to stop, and it returns to the original label.
2. On the Workouts tab, type a nonsense word like "zzz" into the search bar (or pick a filter pill with no matches) — you should see an empty-state card with an icon, a message mentioning your search/filter, and a **Clear all filters** button. Tapping it should clear both the text and the filter.
3. Try tapping the round buttons in the header, the back button on the detail screen, and the small play buttons next to "Today's plan" workouts — they should all feel comfortably large to hit.
4. On the Activity tab, look at the range selector (30 days / week / year) in the header — it should now show a small dropdown arrow.
5. Open the You tab and tap "Adjust goals" and "Sign out" — both buttons should be taller and easier to tap than before.
