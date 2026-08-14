# Session 01 — Checklist (ES6 Refresher + React Introduction)

## Purpose

- Ensure students have the modern JavaScript skills required for the course before React is introduced.
- End the session with a first working React component so students are not starting from zero in Session 02.

---

## Part 1 — ES6 Exercises (exercises/01.js – 09.js)

Run these in the browser console or Node 18+ — no build step required.

1. **const / let and basic scoping**
   - Short snippets showing values that are reassigned vs constant.
   - Acceptance: explain in a comment why `const` is used for values not reassigned.

2. **Arrow functions, concise bodies and object-literal returns**
   - Build small utilities (`formatTitle`, `isHighRated`) invokable from the console.
   - Acceptance: each function returns the expected primitive (string / boolean / array).

3. **Template literals and multi-line templates**
   - Interpolate variables and conditionally include parts of a string.
   - Acceptance: copy output into the console and confirm formatting.

4. **Destructuring (objects and arrays)**
   - Extract properties and nested values; use defaults for missing properties.
   - Acceptance: no runtime errors when extracting missing properties.

5. **Spread / Rest and shallow copying**
   - Use spread to copy arrays/objects and build modified versions.
   - Acceptance: originals remain unchanged after spread.

6. **Array methods — map, filter, find, some, sort**
   - Transform an array of movie-like objects with each method.
   - Acceptance: functions return expected lengths and values.

7. **async / await with fetch**
   - Write an async function that fetches data from a public URL and logs the result.
   - Acceptance: function resolves correctly and errors are caught with try/catch.

8. **Optional chaining (?.) and nullish coalescing (??)**
   - Access deeply nested properties that may be null or undefined safely.
   - Acceptance: no TypeError thrown when a property is missing; fallback value is used.

---

## Part 2 — First React Component

9. **Project bootstrap**
   - Confirm Vite + React is working in `starter/`.
   - Run `npm install` then `npm run dev` and verify the dev server starts.
   - Acceptance: browser shows the default page at `http://localhost:5173`.

10. **First MovieCard component**
    - Create `src/components/MovieCard.tsx`.
    - Accept a `movie` prop (use the `Movie` type from `src/types.ts` or a simple inline type for now) and render the title and a poster image.
    - Render it once in `App.tsx` with hardcoded data.
    - Acceptance: the browser shows a movie title and image without console errors.

---

## Files to create/modify

- `src/App.tsx` — render a single `<MovieCard />` with hardcoded props
- `src/components/MovieCard.tsx`

---

## Pro tips

- `map()` is the single most important array method for React — every list in the app is rendered with it. Make sure it is clear before Session 02.
- Optional chaining (`?.`) is needed from Session 02 onward: `poster_path` can be `null` in TMDB data and accessing it without a guard will crash the image render.
