# Session 03 — Checklist (Side effects, data fetching, and custom hooks)

## Purpose

- Teach safe data fetching with useEffect, error/loading states, AbortController, and moving logic into a custom hook/service layer.

What to implement

1. First real fetch
   - Add a useEffect that fetches film data from TMDB (or a mocked/local endpoint if the API key is not available).
   - Use import.meta.env for API base and key (do not hardcode tokens).
   - Acceptance: app displays remote posters when running with a valid API key; otherwise students should see graceful fallback behaviour.

2. Loading and error handling
   - Manage isLoading and error state correctly; render a status message while loading or when an error occurs.
   - Acceptance: network failures produce an error message and isLoading finishes false.

3. AbortController cleanup
   - Attach signal to fetch and abort it in effect cleanup to avoid setting state on unmounted components.
   - Acceptance: rapid navigation away from the page cancels outstanding requests without console errors.

4. Extract useMovies hook
   - Move the three states and fetch logic into src/hooks/useMovies.ts.
   - App.tsx should consume useMovies() to get movies/isLoading/error.
   - Acceptance: behavior remains identical after refactor.

5. Service layer (bonus, recommended)
   - Create src/services/movieService.js that either queries TMDB or falls back to a local sample dataset.
   - Acceptance: switching between live API and local fallback requires only environment variables and not component changes.

Files students should create/modify

- src/hooks/useMovies.ts
- src/services/movieService.js (optional but recommended)
- src/App.tsx (replace inline fetch with the hook)

Pro tips:

- Always try using students design the hook interfaces
