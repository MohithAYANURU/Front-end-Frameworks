import { useEffect, useState } from "react";
import { SAMPLE_MOVIES } from "../data/sampleMovies";
import { movieService } from "../services/movieService";
import type { Movie } from "../types";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>(SAMPLE_MOVIES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setIsLoading(true);
      setError(null);
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

  return { movies, isLoading, error };
}
