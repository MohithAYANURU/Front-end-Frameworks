# Session 02 — Checklist (Components, Props & State)

## Purpose

- Build the first interactive React UI: components that receive props, a shared data type, hardcoded sample data, and local state with `useState`.
- By the end of this session students should have a working movie list with real-time search filtering and a per-card favourites toggle.

---

## What to implement

1. **Type definition**
   - Create `src/types.ts` with the following exports:
     - `Movie` interface: `id`, `title`, `original_title`, `overview`, `poster_path` (string | null), `backdrop_path` (string | null), `genre_ids`, `release_date`, `vote_average`, `vote_count`, `popularity`, `adult`
     - `type SortOption = 'popularity' | 'rating' | 'release_date' | 'title'`
     - `type ViewMode = 'grid' | 'list'`
     - `type Theme = 'dark' | 'light'`
   - Acceptance: `Movie` is importable and used as the prop type for `MovieCard`; the other types are used from Session 04 onward.

2. **Sample data and image helpers**
   - Create `src/data/sampleMovies.ts` (or `.js`) exporting:
     - `SAMPLE_MOVIES` — an array of at least 5 hardcoded `Movie` objects with realistic TMDB-shaped fields
     - `TMDB_IMAGE_BASE` — `'https://image.tmdb.org/t/p/w500'`
     - `TMDB_BACKDROP_BASE` — `'https://image.tmdb.org/t/p/w1280'`
     - `getPosterUrl(path, width?)` — returns the full TMDB poster URL, or a placeholder if `path` is null
     - `getBackdropUrl(path, width?)` — returns the full TMDB backdrop URL, or a placeholder if `path` is null
     - `getPlaceholderPoster(title?)` — returns a fallback image URL when `poster_path` is null
     - `getPlaceholderBackdrop()` — returns a fallback backdrop URL
   - `MovieCard` and `MovieModal` import these helpers to build image URLs — without them those components will fail to compile.
   - Acceptance: data can be imported and rendered without a network request; image helpers return usable strings for all inputs including null.
   - **Important:** this file stays in the project for the entire course as the offline fallback — do not delete it.

3. **MovieCard component**
   - Render title, poster image (fallback to a placeholder if `poster_path` is null), and a vote average badge.
   - Add a local `isFavourite` state (boolean, `useState`) and a toggle button that flips it.
   - Accept an `onClick` prop called when the card body is clicked (used in Session 04 to open the modal).
   - Acceptance: clicking the favourite button toggles the visual state without affecting other cards; clicking the card body calls `onClick`.

4. **MovieList component**
   - Accept a `movies: Movie[]` prop and render a grid of `<MovieCard />` components.
   - Pass a `key` prop (use `movie.id`) to each card.
   - Acceptance: adding or removing items from the array updates the rendered list correctly.

5. **SearchBar component**
   - Controlled input that lifts its value via an `onChange` prop.
   - Acceptance: `App` owns the `query` state; typing updates the displayed movie list in real time.

6. **App.tsx — state and prop threading**
   - Hold `movies` (initially from `SAMPLE_MOVIES`), `query`, and a `minRating` filter in state.
   - Derive `filteredMovies` (do not store in state — compute from `movies` + `query` + `minRating` on every render).
   - Pass `filteredMovies` to `MovieList` and `query`/`onChange` to `SearchBar`.
   - Acceptance: typing in `SearchBar` filters displayed cards in real time without extra state.

7. **Minimal styles**
   - Add basic CSS to `src/index.css` to make the card grid legible.
   - Acceptance: grid displays responsively at common desktop and mobile widths.

---

## Files to create/modify

- `src/types.ts` — `Movie` interface
- `src/data/sampleMovies.ts` — `SAMPLE_MOVIES` array
- `src/App.tsx` — state, filtering, prop threading
- `src/components/MovieCard.tsx` — display + local `isFavourite` toggle
- `src/components/MovieList.tsx` — renders a grid of cards
- `src/components/SearchBar.tsx` — controlled search input
- `src/index.css` — grid layout and card styles

---

## Pro tips

- `filteredMovies` should be derived from state, not stored in state. If you `useState` for the filtered list, you will have to keep it in sync manually — that is the "derived state" pitfall. Compute it inline instead.
- The `isFavourite` toggle living locally in `MovieCard` is intentional at this stage. In Session 05 it will move into a global context. Don't jump ahead.
- Prop drilling from `App` → `MovieList` → `MovieCard` feels manageable with 3 components. By Session 04 it will feel painful with 8+ props on `Header`. That pain motivates Session 05's Context API — name it aloud to students.
