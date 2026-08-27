# The Desk — a categorized dashboard for Blog-X

A dashboard-style rebuild of the original Blog-X app: six categorized
"desks" (Sports, Health, Technology, Politics, Entertainment, Finance),
full CRUD per desk, a dashboard with live charts, dark mode, global
search, and Google Sign-In backed by Firebase.

---

## ✨ Features

- **Landing page** – public marketing page explaining the app, shown to
  anyone not signed in; signed-in users are redirected straight to the
  dashboard. **It now includes a highlighted "Developer Setup Required"**
  notice for anyone cloning the repo, reminding them to configure Firebase
  environment variables.
- **Google Sign-In** via Firebase Auth, with session persistence across
  refreshes and tabs.
- **6 desks**: Sports, Health, Technology, Politics, Entertainment,
  Finance — each with full Create / Read / Update / Delete.
- **Dashboard**: bar chart of items per desk, pie chart of completion
  status, stat cards, a scrolling "wire" ticker of recent activity —
  all update live, no page refresh needed.
- **Global search** across every desk from the navbar.
- **Dark mode**, persisted, with a real color system (not just an
  inverted palette).
- **Realtime data** — every list, chart, and count reads from the same
  Firestore `onSnapshot` listener, so adding/editing/deleting an item
  updates the whole UI instantly.

---

## 🧰 Tech Stack

| | |
|---|---|
| Build tool | Vite |
| UI | React 18, React Router DOM v6 |
| Styling | Tailwind CSS (custom "ink / paper / wire" design tokens) |
| Charts | Recharts |
| Icons | lucide-react |
| Backend | Firebase Auth (Google provider) + Firestore |

---

## 📁 Project Structure
