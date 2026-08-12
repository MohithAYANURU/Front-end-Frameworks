# Movie App — Exercises

EPITA Bachelor in Computer Science — S5
Front-End Frameworks (2627_BSI_CS_S05_PROG_FEF)

---

This branch covers **Exercises 1–9**: ES6+ fundamentals you need before building the React application. Complete the exercises, then run the test suite to validate your answers.

The app itself (React, TMDB API, routing, global state) is built in subsequent branches.

---

## Prerequisites

Node.js 18 or higher — https://nodejs.org

---

## Setup

```bash
npm install
```

---

## Exercises

Plain JS files in `exercises/` — no build step required. You can run them in the browser console or with Node 18+.

| File | Topic |
|---|---|
| `01.js` | `const` and `let` |
| `02.js` | Arrow functions |
| `03.js` | Template literals |
| `04.js` | Object destructuring |
| `05.js` | Array destructuring |
| `06.js` | Spread and rest |
| `07.js` | Array methods (`map`, `filter`, `find`, `some`, `sort`) |
| `08.js` | `async`/`await` and `fetch` |
| `09.js` | Optional chaining (`?.`) and nullish coalescing (`??`) |

---

## Running the Tests

```bash
npm run test:run         # run all tests once
npm run test:run:verbose # run all tests once with per-test detail
npm run test             # watch mode
```

## Submitting

When you are done with the exercises, push a tag to trigger the automated test run:

```bash
git tag submit
git push origin submit
```

> **Important:** Tags are unique — you cannot push the same tag twice. To resubmit, delete the old tag first and recreate it:
> ```bash
> git tag -d submit                # delete locally
> git push origin --delete submit  # delete on GitHub
> git tag submit                   # recreate
> git push origin submit           # push again
> ```
> Or use a different tag name each time (`submit-2`, `submit-3`, etc.).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + React Router 6 | UI library and client-side routing (used in later branches) |
| TypeScript 5 | Static typing |
| Vite 5 | Build tool and dev server |
| Vitest + Testing Library | Test runner and React component testing |
| TMDB API v3 | Movie data (used in later branches) |
