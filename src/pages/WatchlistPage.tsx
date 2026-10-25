import { useState } from "react";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useAppContext } from "../context/AppContext";
import type { Movie } from "../types";

export default function WatchlistPage() {
  const { favorites } = useAppContext();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <main className="main-container">
      <h1>My Watchlist</h1>
      {favorites.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <MovieList
          movies={favorites}
          onMovieClick={setSelectedMovie}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}
