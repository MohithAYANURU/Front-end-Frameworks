# Session 02 — Checklist (Components, Props & State)

## Purpose

- Build the first React UI pieces: components that receive props and local state with useState.
- Keep implementation incremental; students should adapt their vanilla JS project to React components rather than copying a finished app.

What to implement

1. Project bootstrap
   - Ensure a working React + Vite dev server in starter/.
   - Acceptance: `npm run dev` starts and shows index.html.

2. Basic components
   - MovieCard: render title, poster placeholder, and a click handler prop.
   - MovieList: accept an array of movies and render a grid/list of MovieCard components.
   - SearchBar: controlled input that lifts value via onChange.
   - Acceptance: props are used and changes to props update rendered output without throwing errors.

3. App.tsx: state and prop threading
   - App holds movies (initially from a small local array), query state, and passes props down to children.
   - Implement filtering by query in App and pass filtered results to MovieList.
   - Acceptance: typing in SearchBar filters displayed MovieCard items in real time.

4. Minimal styles
   - Add basic CSS to make the grid legible (students may use a local index.css).
   - Acceptance: grid displays responsively in the browser.

Files you should create/modify

- src/App.tsx — keep it minimal: state + render header, SearchBar, MovieList
- src/components/MovieCard.tsx
- src/components/MovieList.tsx
- src/components/SearchBar.tsx
- src/index.css

Pro tips:

- Emphasize controlled components and single source of truth for query state (App owns it).
- Avoid passing unnecessary props, keep components focused and small.
