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

- Tapping the **+** button in the top-right of the Today screen now opens a "Add to today" sheet with three options (log a workout, start a timer, add a note). The play button next to the second scheduled workout now also opens the workout detail screen.
- The **Start workout** button on a workout's detail screen now reacts when pressed — it turns dark green, changes to "Workout started", and a small toast confirms the timer has started, then it resets after a couple of seconds.
- The share button in the workout-detail header now confirms with a "Link copied to clipboard" toast.
- Tapping **Sign out** at the bottom of the You screen now pops up a confirmation sheet asking "Sign out of Lark?" before completing, with a "Signed out" toast on confirm.
- The Workouts list now shows a friendly empty state when no workouts match your search or filter, with a "Clear filters" button that resets the search and category in one tap.
- Leaving the Workouts tab now clears the search box and resets the category to "All", so when you come back you see the full list again rather than your previous filter.
- The search box, gear icons, share button, range picker, sign-out button, and per-item buttons now have proper labels so a screen reader can describe them.
- Buttons, icons, filter pills, and the play button on scheduled workouts are now larger and easier to tap accurately on a real phone.
- Settings gears, profile-row items, "Adjust goals", and connection rows that previously did nothing now respond with a small "coming soon" toast so you can tell they were registered.

## How to test the changes

1. Open `index.html`. On the Today screen, tap the **+** in the top-right — a sheet slides up with "Log a workout / Start timer / Add a note". Tap any item and a toast appears, then tap **Close** or outside the sheet to dismiss.
2. Tap any workout card to open its detail, then tap **Start workout** — the button turns dark green and reads "Workout started", a toast confirms it, and the button resets a couple of seconds later.
3. On the workout-detail screen, tap the share icon (top-right arrow) — a "Link copied to clipboard" toast appears.
4. Go to the You tab and tap **Sign out** — a confirmation sheet pops up. Tap **Cancel** to dismiss or **Sign out** to confirm with a "Signed out" toast.
5. On the Workouts tab, type something nonsense into the search box (for example "zzz") — the friendly empty-state card appears with a "Clear filters" button that resets everything.
6. Filter Workouts by a category, switch to another tab, then come back to Workouts — the list is reset to "All" rather than keeping your previous filter.
7. Tap the **▶** play button next to "Hip-mobility flow" on the Today screen — it now opens the workout detail screen just like the other play button does.
8. Shrink the browser or open on a phone — header icons, filter pills, the play button, and the bottom buttons are noticeably bigger and easier to tap.
9. Tap a gear icon in any screen header, or any row on the You screen (Preferences, Connected services, Adjust goals) — a small toast confirms the tap with a "coming soon" message.
