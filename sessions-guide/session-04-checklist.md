# Session 04 — Checklist (React Router & UI composition)

## Purpose

- Convert the single-page UI to a routed SPA and build composed components (Header, FilterBar, StatsBanner, MovieModal).

What to implement

1. Routing
   - Wrap the app in BrowserRouter and define Routes for:
     - `/` → HomePage
     - `/about` → AboutPage
     - `*` → NotFoundPage (wildcard fallback, last route)
   - Acceptance: navigating to `/about` shows the about view without a full reload; visiting unknown paths shows a 404 page.

2. Split App into pages
   - Move page-specific UI and logic into src/pages/HomePage.tsx and src/pages/AboutPage.tsx.
   - HomePage owns search state and uses useMovies / movieService to fetch results.
   - Acceptance: the app structure is modular and easy to navigate.

3. Header component
   - Build a Header that accepts search/handlers and renders navigation via NavLink (use `end` on `/`).
   - Acceptance: NavLink active state works as expected and the search field flows to HomePage.

4. FilterBar and StatsBanner
   - FilterBar: genre pills, sort select, view toggle (these are UI controls only — implement behavior gradually).
   - StatsBanner: read-only component displaying the current page summary (count, page number, live-api flag).
   - Acceptance: controls render and can change local state; StatsBanner reflects state when wired.

5. MovieModal
   - Implement a modal overlay for movie details that opens without navigating away.
   - Accessibility: close on ESC, click-outside (e.target === e.currentTarget), and restore body scroll on close.
   - Acceptance: opening a modal does not change the URL and preserves scroll/filters on close.

Files students should create/modify

- src/App.tsx — BrowserRouter + Routes
- src/pages/HomePage.tsx
- src/pages/AboutPage.tsx
- src/pages/NotFoundPage.tsx
- src/components/Header.tsx
- src/components/FilterBar.tsx
- src/components/StatsBanner.tsx
- src/components/MovieModal.tsx

Pro tips:

- Important decision: modal vs route; (shareability vs transient detail view).
- Keep the modal UX simple and robust; small accessibility wins are high impact.

Verification

- Run `npm run dev`, navigate between routes using Links, and show the modal UX works as described. No code solutions included — students must implement components themselves.
