import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { GENRES } from "../data/genres";
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
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
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
  const availableGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genre_ids ?? [])),
  ).sort((first, second) =>
    (GENRES[first] ?? "Other").localeCompare(GENRES[second] ?? "Other"),
  );
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(normalizedQuery);
    const matchesGenre =
      selectedGenre === null || movie.genre_ids?.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <>
      <main className="main-container">
        <h1>Movie App</h1>
        {isLoading && <p role="status">Loading movies...</p>}
        {error && <p role="alert">{error}</p>}
        {!error && (!isLoading || initialMovies.length > 0) && (
          <>
            <div className="genre-filter" aria-label="Filter movies by genre">
              <span className="genre-filter-label">Genres</span>
              <div className="genre-filter-options">
                <button
                  type="button"
                  className={`genre-filter-pill ${
                    selectedGenre === null ? "active" : ""
                  }`}
                  onClick={() => setSelectedGenre(null)}
                  aria-pressed={selectedGenre === null}
                >
                  All
                </button>
                {availableGenres.map((genreId) => (
                  <button
                    type="button"
                    className={`genre-filter-pill ${
                      selectedGenre === genreId ? "active" : ""
                    }`}
                    key={genreId}
                    onClick={() => setSelectedGenre(genreId)}
                    aria-pressed={selectedGenre === genreId}
                  >
                    {GENRES[genreId] ?? "Other"}
                  </button>
                ))}
              </div>
            </div>
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
