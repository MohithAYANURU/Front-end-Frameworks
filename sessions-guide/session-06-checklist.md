# Session 06 — Checklist (Presentations)

## Purpose

- Students present the single-page application built progressively across the course.
- No new implementation is required during this session. The deliverable is the running application and the codebase.

---

## Presentation format (10–15 minutes per student)

1. **Live demo** — run `npm run dev` and walk through the application in the browser:
   - Load the home page and show movies (live API or fallback data)
   - Search for a movie by title
   - Filter by genre and sort results
   - Open a movie modal and toggle the watchlist
   - Toggle the theme (dark / light) and confirm it persists on reload
   - Navigate to `/about` and to an unknown URL (404 page)

2. **Component architecture walkthrough** — open the codebase and explain:
   - How `App.tsx` is structured (routing + AppProvider)
   - Where state lives: what is local (`HomePage`) vs global (`AppContext`)
   - How `movieService.js` decides between live API and local fallback

3. **State management explanation** — be ready to answer:
   - Why did you choose Context + useReducer rather than prop drilling?
   - What does `TOGGLE_FAVOURITE` do in the reducer?
   - Why does `isFavorite` use American spelling but the action type uses British (`TOGGLE_FAVOURITE`)?

4. **Reflection** — one or two things that were harder than expected, and what you would do differently.

No slides are required. Peer questions are encouraged after each presentation.

---

## Pre-session checklist (complete before Session 06)

These are the items to finish during the homework window after Session 05:

- [ ] `npm run dev` starts and all routes work without console errors
- [ ] `npm run type-check` passes with no errors
- [ ] `npm run test:run` passes (if tests exist)
- [ ] `npm run build` succeeds and `npm run preview` serves the production bundle correctly
- [ ] Theme toggle persists across page reloads
- [ ] Favourites toggle persists across page reloads
- [ ] MovieModal opens and closes without changing the URL
- [ ] Genre filtering and sort work (requires the updated `movieService.js` from Session 04)
- [ ] `AppProvider` wraps `BrowserRouter` in `App.tsx`
- [ ] `Header` reads theme and favourites from `useAppContext()` — not from `HomePage` props
- [ ] `MovieCard` and `MovieModal` read `isFavorite` and `toggleFavorite` from `useAppContext()`
- [ ] `MovieList.tsx` and `SearchBar.tsx` have been removed (they became dead code in Session 04)
- [ ] A short README exists explaining how to run the app and what `VITE_TMDB_API_KEY` is for

---

## Behavioral parity with the finished project

The app should match `assets/finished-project` for the following flows:

| Flow | Expected behaviour |
|------|--------------------|
| Home page load | Movies appear (TMDB or fallback) |
| Search | Results filter in real time |
| Genre pill | List updates to that genre only |
| Sort | Results reorder by the selected criterion |
| Movie card click | Modal opens; URL does not change |
| Modal close | Returns to same filtered list and scroll position |
| Watchlist toggle (card or modal) | State updates immediately; Header count changes; persists on reload |
| Theme toggle | UI switches; persists on reload |
| `/about` | Static about page renders |
| Unknown URL | 404 page renders with a back-navigation option |
