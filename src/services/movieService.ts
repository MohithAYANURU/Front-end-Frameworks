import { SAMPLE_MOVIES } from "../data/sampleMovies";
import type { Movie, SortOption } from "../types";

type FetchMoviesOptions = {
  search?: string;
  genre?: number | string;
  sort?: SortOption;
  onlyFavorites?: boolean;
  page?: number;
  signal?: AbortSignal;
};

export type MovieResponse = {
  results: Movie[];
  total_pages: number;
  total_results: number;
  isLiveApi: boolean;
};

const API_URL = "https://api.themoviedb.org/3";

export const movieService = {
  async fetchMovies({ search = "", page = 1, signal }: FetchMoviesOptions = {}): Promise<MovieResponse> {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) {
      const normalizedSearch = search.trim().toLowerCase();
      const results = normalizedSearch
        ? SAMPLE_MOVIES.filter((movie) =>
            movie.title.toLowerCase().includes(normalizedSearch),
          )
        : SAMPLE_MOVIES;
      return {
        results,
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      };
    }

    const endpoint = search.trim() ? "/search/movie" : "/movie/popular";
    const params = new URLSearchParams({ language: "en-US", page: String(page) });
    if (search.trim()) params.set("query", search.trim());
    const response = await fetch(`${API_URL}${endpoint}?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}`, accept: "application/json" },
      signal,
    });
    if (!response.ok) {
      throw new Error(`Movie request failed (${response.status})`);
    }
    const data = await response.json();
    return {
      results: data.results ?? [],
      total_pages: data.total_pages ?? 1,
      total_results: data.total_results ?? 0,
      isLiveApi: true,
    };
  },
};
