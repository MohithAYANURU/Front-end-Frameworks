# Session 05 — Checklist (Global State with Context + useReducer)

## Purpose

- Remove prop-drilling by introducing a central AppContext that stores theme and favourites, persisted via a storage utility.
- After this session the app should match the finished project's behaviour for theme and favourites (but students must write the code themselves).

What to implement

1. storage utility
   - Create src/utils/storage.js (or .ts) with functions: getTheme, setTheme, getFavorites, toggleFavorite. Keep implementation focused on localStorage and small helpers.
   - Acceptance: theme and favorites persist across page reloads.

2. AppContext (initially useState, then refactor to useReducer)
   - Implement src/context/AppContext.tsx. The context value should provide: favorites, theme, toggleFavorite(movie), isFavorite(id), toggleTheme().
   - Start with useState version for clarity, then refactor to useReducer for the final behaviour.
   - Acceptance: consuming components can call useAppContext() to access theme/favourites and handlers without prop threading.

3. Wrap App with provider
   - Update src/App.tsx to render <AppProvider> at the top level (provider must wrap BrowserRouter and pages).
   - Acceptance: any component deeper in the tree can call useAppContext() without throwing.

4. Connect MovieCard and Header to context
   - MovieCard should call toggleFavorite when the user toggles a favourite; Header should read favourites.length and toggleTheme.
   - Acceptance: toggling a favourite updates UI immediately and persists to storage.

5. CSS Modules (bonus)
   - Convert at least one component style to a CSS Module (.module.css) and import it in the component.
   - Acceptance: styles work and TypeScript does not raise errors (if using TS).

Files students should create/modify

- src/utils/storage.js
- src/context/AppContext.tsx
- src/components/Header.tsx (now reads from context)
- src/components/MovieCard.tsx (now reads from context)

Pro tips:

- The guard pattern in useAppContext() that throws when the consumer is outside the Provider — this surfaces mistakes early.
- The reducer version is optional as an exercise; both useState and useReducer variants are acceptable so long as external behaviour is identical.

Verification checklist (must pass by end of session 5)

- Toggle theme: UI updates and theme persists on refresh.
- Toggle favorites: MovieCard shows favorite state, and favorites count in Header updates.
- App behavior matches finished-project for theme and favorites (no other required features needed to match exactly).

Developer note

- By the end of Session 5, the project should be functionally identical to the finished project with regard to routing, data-layer hook, and global state (theme and favorites). Remaining tasks such as polish and accessibility are reserved for Session 6.
