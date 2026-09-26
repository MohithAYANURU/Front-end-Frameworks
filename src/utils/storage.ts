import type { Movie, Theme } from "../types";

const FAVORITES_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";
const API_KEY = "tmdb_api_key";

export function getFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? (parsed as Movie[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(movie: Movie): Movie[] {
  const favorites = getFavorites();
  const nextFavorites = favorites.some((favorite) => favorite.id === movie.id)
    ? favorites.filter((favorite) => favorite.id !== movie.id)
    : [...favorites, movie];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  return nextFavorites;
}

export function getTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function getApiKey(): string {
  try {
    return localStorage.getItem(API_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setApiKey(key: string): void {
  localStorage.setItem(API_KEY, key.trim());
}
