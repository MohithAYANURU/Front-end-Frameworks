# Session 06 — Checklist (Polish, accessibility, and final verification)

## Purpose

- Final polishing: styles, accessibility improvements, small bug fixes, and preparing the project for submission.
- Verify parity with the finished project in assets/finished-project.

What to implement

1. Visual polish
   - Improve spacing, typography, and card layouts. Ensure images have alt attributes.
   - Acceptance: UI looks consistent across common desktop and mobile viewports.

2. Accessibility
   - Ensure keyboard navigation: cards are keyboard-focusable; modal traps focus where appropriate or at minimum supports ESC to close.
   - Use semantic HTML (main, header, nav, article, button) and ARIA attributes only where needed.
   - Acceptance: basic keyboard-driven flows work without a mouse.

3. Tests and type-checking
   - Run `npm run type-check` and `npm run test:run` (if tests exist in starter). Fix any TypeScript errors and failing tests introduced by refactor.
   - Acceptance: TypeScript passes and any included tests pass.

4. Build verification
   - Run `npm run build` and `npm run preview` to sanity-check production build.
   - Acceptance: build succeeds and preview serves a working production bundle.

5. Final parity check (how to verify the app is identical to the finished project)
   - File-level: compare the following key files and folders to the finished project to ensure equivalent structure and behaviour (do NOT copy code):
     - src/App.tsx — routing + provider
     - src/pages/\* — HomePage, AboutPage, NotFoundPage
     - src/components/\* — Header, MovieCard, MovieList, MovieModal, FilterBar, StatsBanner
     - src/context/AppContext.tsx and src/utils/storage.js
     - src/hooks/useMovies.ts and src/services/movieService.js
     - src/index.css and any CSS Modules under src/components/
   - Behavioral: the app should match the finished project for the following flows:
     - Load home page and see movies (live API or fallback)
     - Search filters results
     - Open and close modal (no navigation)
     - Toggle theme and favourites (persisted)
     - Navigate to /about and unknown routes behave correctly
   - Commands to run for verification:
     - npm run dev
     - npm run type-check
     - npm run test:run
     - npm run build && npm run preview

6. Submission checklist for students
   - Ensure the app runs locally with `npm run dev`.
   - Confirm no console errors in the browser for primary user flows.
   - Add a short README describing how to run the app and any env variables required (e.g., VITE_TMDB_API_KEY or instructions to use the local fallback).

Verification

- When all checklist items pass and the verification commands succeed, the project is considered equivalent to the finished project for the course learning outcomes.
