import {SAMPLE_MOVIES} from "./data/sampleMovies"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import {useState} from "react"

function App() {
  const [movies] = useState(SAMPLE_MOVIES);
  const [query, setQuery] = useState("");
  const [minRating] = useState(0);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    const matchesQuery =
      movie.title.toLowerCase().includes(normalizedQuery) ||
      movie.overview?.toLowerCase().includes(normalizedQuery);
    const matchesRating = (movie.vote_average ?? 0) >= minRating;

    return matchesQuery && matchesRating;
  });

  return (
    <div className="app-layout">
      <main className="main-container">
        <SearchBar query={query} onChange={setQuery} />
        <h1>Movie App</h1>
        
        <section>
          <MovieList movies={filteredMovies} />
      </section>
    </main>
    </div>
  );
};

export default App ;
