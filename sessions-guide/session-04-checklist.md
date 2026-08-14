# Session 04 — Checklist (React Router & UI Composition)

## Purpose

- Convert the single-view app into a routed SPA with client-side navigation.
- Build the full UI shell: Header, FilterBar, StatsBanner, MovieModal, ApiConfigModal.
- Upgrade movieService.js to support genre filtering, sorting, and runtime API key entry.

---

## What to implement

1. **Install lucide-react**
   - The finished project uses `lucide-react` for all icons (Search, X, Heart, Settings, Sun, Moon in Header; Heart in MovieCard; X, Heart, Youtube in MovieModal).
   - Run `npm install lucide-react` from `starter/` before building any of these components.
   - Acceptance: `import { Heart } from 'lucide-react'` resolves without error.

2. **Upgrade movieService.js**
   - This is the most important step of the session. The Session 03 version used a Bearer token from `.env`. Replace it with:
     - Read the API key at request time via `storage.getApiKey()` (so the runtime key from `ApiConfigModal` is used)
     - Use `?api_key=` query parameter instead of the `Authorization: Bearer` header (TMDB v3 key format)
     - Route genre-filtered requests to `GET /discover/movie?api_key=...&with_genres={genre}&page={page}`
     - Route search requests to `GET /search/movie?api_key=...&query={search}&page={page}`
     - Route unfiltered requests to `GET /movie/popular?api_key=...&page={page}`
     - Add a `sortMovies(movies, sort)` helper that sorts locally by `popularity`, `vote_average`, `release_date`, or `title`
     - When `onlyFavorites` is true: return `storage.getFavorites()` filtered by `search` — skip the API call
   - When no API key is stored: fall back to `SAMPLE_MOVIES` with local filtering by search and genre, and apply `sortMovies`.
   - Acceptance: clicking a genre pill updates the movie list to show only that genre; sort selector reorders results.
   - **Note:** the v3 API key (short) is different from the Read Access Token (long Bearer token) used in Session 03. Both are in your TMDB account under Settings → API.

3. **Routing**
   - Wrap the app in `BrowserRouter` and define `Routes` for:
     - `/` → `HomePage`
     - `/about` → `AboutPage`
     - `*` → `NotFoundPage` (wildcard fallback — must be last)
   - Acceptance: navigating to `/about` shows the about view without a full page reload; unknown paths render the 404 page.

4. **Split App into pages**
   - `src/pages/HomePage.tsx` — owns all movie state and handlers; renders Header, FilterBar, StatsBanner, the movie grid, MovieModal
   - `src/pages/AboutPage.tsx` — static info page
   - `src/pages/NotFoundPage.tsx` — 404 message with a "Back to Home" button using `useNavigate`
   - `src/App.tsx` becomes a ~20-line routing shell: `BrowserRouter` + `Routes` + theme initialisation from `storage.getTheme()` on mount
   - Acceptance: `App.tsx` contains no movie state; all data concerns live in `HomePage.tsx`.

5. **Header component**
   - Receives 8 props from `HomePage`: `search`, `onSearch`, `onlyFavorites`, `onToggleFavorites`, `theme`, `onToggleTheme`, `favCount`, `onOpenApiConfig`
   - Renders site title, a search input, theme toggle, favourites toggle with count, and an "API Key" button
   - Uses `NavLink` for navigation links; add `end` to the `/` link so it is not active on every page
   - Acceptance: `NavLink` active state works; search input is controlled; all callbacks fire correctly.

6. **FilterBar component**
   - Genre pills (one per genre from `genres.js`) — selected genre highlighted
   - Sort selector (`<select>`) for popularity / rating / release date / title
   - View toggle button (grid / list)
   - Acceptance: selecting a genre or sort option calls the handler prop and the movie list updates.

7. **StatsBanner component**
   - Read-only display: result count, average rating, active genre, and a live-API / local-data indicator
   - Acceptance: banner values update when filters change.

8. **MovieModal component**
   - Opens when a `MovieCard` is clicked; does not change the URL
   - Displays poster, backdrop, title, overview, rating, release date, genre tags, a watchlist toggle button, and a YouTube trailer search link
   - Close on: backdrop click (`e.target === e.currentTarget`), Escape key (`useEffect` with `keydown` listener and cleanup), or a close button
   - Restore `document.body.style.overflow` in cleanup to prevent stuck scroll
   - Acceptance: opening a modal does not change the URL; all filter and scroll state is preserved when the modal closes.

9. **ApiConfigModal component**
   - Overlay that accepts a TMDB v3 API key input and saves it via `storage.setApiKey()`
   - Opened via the "API Key" button in Header
   - Acceptance: entering a key and saving it causes subsequent movie fetches to use the live API.

---

## Files to create/modify

- `src/services/movieService.js` — upgraded with storage key, genre routing, sortMovies, onlyFavorites
- `src/App.tsx` — BrowserRouter + Routes + theme init; remove all movie state
- `src/pages/HomePage.tsx` — all movie/filter/modal state and handlers
- `src/pages/AboutPage.tsx`
- `src/pages/NotFoundPage.tsx`
- `src/components/Header.tsx`
- `src/components/FilterBar.tsx`
- `src/components/StatsBanner.tsx`
- `src/components/MovieModal.tsx`
- `src/components/ApiConfigModal.tsx`

### Dead code to remove

After this session two files become unused and can be deleted:
- `src/components/MovieList.tsx` — the movie grid is now rendered directly with `movies.map(...)` in `HomePage`
- `src/components/SearchBar.tsx` — the search input is now inside `Header.tsx`

---

## What the finished project has beyond what is required here

The following features exist in `assets/finished-project` but are polish, not core session requirements. Students who finish early can implement them; they are not needed for Milestone 2:

- **Search debounce** — Header debounces the search input by 300ms using `useEffect` + `setTimeout` + `useRef` to avoid firing a fetch on every keystroke
- **Skeleton loading cards** — instead of a `<p>Loading...</p>`, the loading state renders a grid of placeholder `<div>` elements with a CSS shimmer animation
- **Empty state** — when no movies match the active filters, a "No movies found" panel renders with a "Reset Filters & Show All" button
- **Pagination** — `HomePage` tracks `page`, `totalPages`, and renders Previous/Next buttons that scroll to the top on click
- **`compact` prop on MovieCard** — accepts a `compact?: boolean` prop that applies a condensed layout class for list view mode
- **`refreshKey` state** — a counter state in `HomePage` that is incremented when `ApiConfigModal` saves a new key, forcing the `useEffect` to re-fetch
- **CSS Modules on all components** — the finished project uses `.module.css` for every component and page, not just MovieCard and HomePage

## Pro tips

- The `movieService.js` upgrade (Step 1) must happen before genre filtering can be tested. Do not skip it.
- Header intentionally receives 8 props from `HomePage`. This is prop drilling — name this to students and tell them Session 05 eliminates most of it via Context.
- The modal vs route decision is worth a 5-minute discussion: the modal preserves filter state and scroll position on close; a `/movies/:id` route would reset everything on back-navigation. For a browse-heavy app, the modal is the better UX.
- The `*` wildcard route must be the last `<Route>` inside `<Routes>`. React Router stops at the first match — placing `*` first would render the 404 page for every URL.
