# The Desk — a categorized dashboard for Blog-X
Live - https://blog-x-u8gr.vercel.app/


A dashboard-style rebuild of the original Blog-X app: six categorized
"desks" (Sports, Health, Technology, Politics, Entertainment, Finance),
full CRUD per desk, a dashboard with live charts, dark mode, global
search, and Google Sign-In backed by Firebase.

## Features

- **Landing page** — public marketing page explaining the app, shown to
  anyone not signed in; signed-in users are redirected straight to the
  dashboard.
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

## Tech stack

| | |
|---|---|
| Build tool | Vite |
| UI | React 18, React Router DOM v6 |
| Styling | Tailwind CSS (custom "ink / paper / wire" design tokens) |
| Charts | Recharts |
| Icons | lucide-react |
| Backend | Firebase Auth (Google provider) + Firestore |

## Project structure


## Routes

| Path | Access | Renders |
|---|---|---|
| `/` | Public / Protected | `Landing` if signed out, `Dashboard` if signed in |
| `/login` | Public | Google sign-in |
| `/desk/:categoryId` | Protected | `CategoryPage` for that desk |

`categoryId` must match one of the `id`s in `constants/categories.js`
(`sports`, `health`, `technology`, `politics`, `entertainment`,
`finance`) — `Sidebar.jsx` links to these same paths, so if you ever add
a desk, add it in `categories.js` and it'll automatically get a working
route.

## Local setup

```bash
npm install
npm run dev
```

Open the printed `localhost` URL and sign in with Google.

Firebase config lives in `src/firebase.js`. It falls back to the
existing project's values inline, or reads `VITE_FIREBASE_*` env vars if
you set up a `.env` file (see `.env.example`).

**Before real use**, publish `firestore.rules` (repo root) in the
Firebase Console → Firestore Database → Rules — it scopes the `items`
collection so each signed-in user only ever sees their own items.

## A couple of fixes worth knowing about

- **`ItemsContext.jsx`** intentionally does **not** use
  `orderBy("createdAt")` in the Firestore query. Combining a `where`
  filter with an `orderBy` on a different field needs a Firestore
  composite index, which a fresh project doesn't have — Firestore
  rejects the query silently (from the UI's perspective) and nothing
  you add ever shows up. Items are filtered by `userId` only in the
  query and sorted client-side instead, so no index is required.
- **`App.jsx`** sets up `ThemeProvider` → `AuthProvider` → `ItemsProvider`
  → `Router`, wrapping an inner `AppShell` component that's the one
  actually calling `useAuth()`. Context hooks only work in components
  rendered *underneath* their provider — calling `useAuth()` in the same
  component that renders `<AuthProvider>` doesn't work, which is why
  that split exists.

## Deployment

### Vercel
```bash
npm i -g vercel
vercel            # first deploy
vercel --prod     # production
```
Framework preset: **Vite**. Build command: `npm run build`. Output
directory: `dist`.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --build
netlify deploy --build --prod
```
Build command `npm run build`, publish directory `dist`.

Either way: add your deployed domain to **Firebase Console →
Authentication → Settings → Authorized domains**, or Google Sign-In's
popup will fail on the live site.

## Data model

```js
// Firestore collection: items
{
  title: string,
  description: string,
  category: "sports" | "health" | "technology" | "politics" | "entertainment" | "finance",
  status: "pending" | "completed",
  userId: string,      // owner, matches auth.uid
  userName: string,
  createdAt: Timestamp
}
```

## Known limits

- Built without live network access during development, so
  `npm install` / `npm run build` should be run and verified locally —
  flag anything that doesn't compile.
- The old app's `posts` collection (from the original CRA version) is
  separate and untouched — it isn't migrated into `items`.
