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

- The Workouts screen now shows a clear "No workouts found" empty state with a magnifying-glass icon when your search and filter combination matches nothing — explaining whether it's the search term, the filter, or both that ruled everything out.
- The 30-day / This-week / This-year dropdown on the Activity screen now actually changes the numbers. Picking "This week" updates the workouts, time, distance, and calorie tiles, and the "30-day intensity" heading retitles itself to match.
- Buttons that don't lead anywhere yet (the `+` quick-add, settings cog, share button, hip-mobility play, "Start workout", "Adjust goals", "Sign out") now show a friendly toast like "Workout starting — coming soon" instead of doing nothing, so you can tell your tap was registered.
- Every icon button across the app now has a proper `aria-label` (Settings, Share, Go back, View workout details, etc.), so screen readers can name what they do.
- All tap targets — head icons, back button, play buttons, filter pills, the sign-out and "Adjust goals" buttons, and the bottom tab bar — were enlarged to a 44px minimum so they're comfortable to thumb.
- Workout titles, coach names, and meta are now properly escaped before being inserted into the page, so unusual characters in a name no longer break the layout.

## How to test the changes

1. Open `index.html` and tap the **Workouts** tab. Type a nonsense query like "zzz" in the search bar — the workout list is replaced by a "No workouts found" card explaining what didn't match.
2. With "zzz" still in the box, tap the **Yoga** filter pill — the empty-state message now mentions both the search term and the category.
3. Tap the **Activity** tab. Open the dropdown in the header and pick "This week" — the four summary tiles change to weekly numbers and the "30-day intensity" heading becomes "This week intensity".
4. Tap the `+` button on the Today screen, or **Start workout** inside a workout detail — a small black toast appears at the bottom of the phone confirming the action is a demo stub.
5. Tab through the page with a screen reader (or hover the icon buttons) and confirm the gear, back, and share buttons all announce a name.
6. Resize the window to phone width and confirm filter pills, the play buttons next to the day's plans, and the bottom tab bar are all easy to tap with a thumb.
