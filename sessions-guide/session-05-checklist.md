# Session 05 — Checklist (Global State with Context + useReducer)

## Purpose

- Remove prop drilling by lifting `theme` and `favourites` state out of `HomePage` into a central `AppContext`.
- Use `useReducer` for structured state transitions. `storage.js` (built in Session 03) handles persistence.
- After this session the app should be functionally identical to the finished project.

---

## What to implement

1. **AppContext — useState version first (Exercise 1 in lab)**
   - Create `src/context/AppContext.tsx` starting with `useState` for both `theme` and `favorites`.
   - Context value provides: `theme`, `toggleTheme()`, `favorites`, `toggleFavorite(movie)`, `isFavorite(id)`.
   - `AppProvider` applies the theme in a `useEffect` on `theme` that calls `storage.setTheme(theme)`.
   - Export `useAppContext()` with a null guard that throws if called outside the provider.
   - Acceptance: consuming components can call `useAppContext()` to access theme/favourites without prop threading.

2. **AppProvider and useAppContext hook**
   - Export `useAppContext()` that throws a clear error if used outside `AppProvider`.
   - Pass helper functions (`toggleFavorite`, `toggleTheme`) as the context value, not `dispatch` — consumers call `toggleFavorite(movie)`, not `dispatch({ type: ... })`.
   - Acceptance: calling `useAppContext()` outside the provider throws immediately with a readable error message.

3. **Wrap App with AppProvider**
   - In `src/App.tsx`, render `<AppProvider>` as the outermost wrapper, enclosing `<BrowserRouter>` and all routes.
   - Remove the theme initialisation `useEffect` that was previously in `App.tsx` — `AppProvider` now handles it.
   - Acceptance: any component anywhere in the tree can call `useAppContext()` without throwing.

4. **Upgrade to useReducer (Exercise 3 in lab)**
   - Replace the two `useState` calls in `AppProvider` with `useReducer`:
     - `State = { favorites: Movie[]; theme: 'dark' | 'light' }`
     - `Action = TOGGLE_FAVOURITE (payload: Movie) | SET_THEME (payload: Theme)`
   - Note: state key is `favorites` (American, matching `storage.getFavorites()`); action type strings use British spelling.
   - Reducer cases:
     - `TOGGLE_FAVOURITE` — call `storage.toggleFavorite(action.payload)` then return `{ ...state, favorites: storage.getFavorites() }` (impure — see note below)
     - `SET_THEME` — return `{ ...state, theme: action.payload }` only; do NOT call `storage.setTheme()` here
   - Keep the `useEffect` on `state.theme` that calls `storage.setTheme(state.theme)`.
   - Acceptance: no consumer component changes are needed; all behaviour is identical before and after the switch.
   - **Note on the two patterns:** `TOGGLE_FAVOURITE` calls `storage.toggleFavorite()` inside the reducer (impure, avoids a re-render cycle). `SET_THEME` keeps the reducer pure and uses `useEffect` for persistence. Raise this contrast with students explicitly.

5. **Simplify HomePage**
   - Remove `theme`, `onToggleTheme`, `favourites`, `favCount`, and `onToggleFavourites` from `HomePage`'s state and handlers — these now come from context.
   - Acceptance: `HomePage` no longer manages theme or favourites state.

6. **Simplify Header**
   - Remove `theme`, `onToggleTheme`, and `favCount` from Header's props — these now come from `useAppContext()`.
   - Keep `onToggleFavorites` as a prop — it controls the "show only favourites" filter which is local state in `HomePage`.
   - Header's prop count drops from 8 to 5 (`search`, `onSearch`, `onlyFavorites`, `onToggleFavorites`, `onOpenApiConfig`).
   - Acceptance: Header renders correctly without receiving theme or favourite props from `HomePage`.

7. **Wire MovieCard to context**
   - Remove `isFavourite` local state from `MovieCard`.
   - Call `isFavorite(movie.id)` and `toggleFavorite(movie)` from `useAppContext()` instead.
   - Acceptance: toggling a favourite on a card updates the Header count immediately and persists across page reloads.

8. **Wire MovieModal to context**
   - Add a watchlist toggle button inside `MovieModal` that calls `toggleFavorite(movie)` and shows the current `isFavorite(movie.id)` state from `useAppContext()`.
   - Acceptance: toggling a favourite inside the modal is reflected on the card and in the Header count.

9. **CSS Modules (bonus)**
   - Convert at least one component's styles to a `.module.css` file and import it with `import styles from './Component.module.css'`.
   - Use `styles.className` in JSX instead of string class names.
   - Acceptance: styles apply correctly and a typo in `styles.nonExistentClass` is caught by TypeScript at compile time.

---

## Files to create/modify

- `src/context/AppContext.tsx` — context, reducer, AppProvider, useAppContext
- `src/App.tsx` — add AppProvider wrapper; remove theme init useEffect
- `src/pages/HomePage.tsx` — remove theme + favourites state and handlers
- `src/components/Header.tsx` — remove 4 props; read from useAppContext
- `src/components/MovieCard.tsx` — remove local isFavourite; read from useAppContext
- `src/components/MovieModal.tsx` — add watchlist toggle via useAppContext

---

## Verification checklist (must pass by end of session)

- Toggle theme: UI updates and theme persists on page reload.
- Toggle favourite on a card: card shows favourite state, Header count updates, persists on reload.
- Toggle favourite inside the modal: same result as toggling on the card.
- `Header` no longer receives theme or favourite props from `HomePage`.
- `useAppContext()` called outside `AppProvider` throws a clear error.
- All routes (`/`, `/about`, `*`) remain functional.

---

## Pro tips

- `useReducer` is required for Milestone 3 — it is not optional. The milestone specification explicitly requires `TOGGLE_FAVOURITE` and `SET_THEME` action types.
- Pass helper functions (`toggleFavorite`, `toggleTheme`) as the context value, not `dispatch` directly. If the action shape changes later, only `AppProvider` needs updating — no consumer changes required.
- `storage.js` already exists from Session 03. Do not recreate it. The reducer imports and uses it for both reads (initial state) and writes (inside each case).
