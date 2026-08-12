# Movie App — Starter Repository

EPITA Bachelor in Computer Science — S5
Front-End Frameworks (2627_BSI_CS_S05_PROG_FEF)

---

## Prerequisites

- Node.js 18 or higher — https://nodejs.org
- A TMDB API key (free) — see below

---

## Get a TMDB API Key

1. Create a free account at https://www.themoviedb.org
2. Go to Settings > API
3. Request a Developer API key
4. Copy the **API Read Access Token** (the long Bearer token) — you will use this in step 3 below

---

## Setup

**1. Clone the repository**
```bash
git clone <repository-url>
cd into the cloned repository
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```
Open `.env` and replace `your_api_key_here` with your TMDB API key.

**4. Start the development server**
```bash
npm run dev
```

The app will be available at http://localhost:5173

---

## Project Structure

```
exercises/
  01–09.js       <- Plain JS files for exercises
src/
  App.tsx        <- Root component — you will build from here
  main.tsx       <- Entry point — do not modify
  index.css      <- Global reset — add your styles below the existing rules
```

You will create all folders and components yourself as the course progresses.
Do not modify `main.tsx`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check without emitting |

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18 | UI library |
| React Router | 6 | Client-side routing |
| TypeScript | 5 | Static typing |
| Vite | 5 | Build tool and dev server |
| TMDB API | v3 | Movie data |
