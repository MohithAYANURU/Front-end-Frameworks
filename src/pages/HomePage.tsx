import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { movieService } from "../services/movieService";
import type { Movie } from "../types";

type HomePageProps = {
  initialMovies?: Movie[];
  searchQuery?: string;
};

export default function HomePage({
  initialMovies = [],
  searchQuery = "",
}: HomePageProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      try {
        const response = await movieService.fetchMovies({ signal: controller.signal });
        setMovies(response.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load movies.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }
    void loadMovies();
    return () => controller.abort();
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedQuery),
  );

  return (
    <>
      <main className="main-container">
        <h1>Movie App</h1>
        {isLoading && <p role="status">Loading movies...</p>}
        {error && <p role="alert">{error}</p>}
        {!isLoading && !error && (
          <>
            <MovieList
              movies={filteredMovies}
              onMovieClick={setSelectedMovie}
            />
            {selectedMovie && (
              <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}
