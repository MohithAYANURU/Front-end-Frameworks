import { useState } from "react";
import { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { useOptionalAppContext } from "../context/AppContext";

type MovieCardProps = {
  movie: Movie;
  onMovieClick?: (movie: Movie) => void;
};

const MovieCard = ({ movie, onMovieClick }: MovieCardProps) => {
  const context = useOptionalAppContext();
  const [standaloneFavorite, setStandaloneFavorite] = useState(false);
  const isFavourite = context
    ? context.isFavorite(movie.id)
    : standaloneFavorite;

  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-label={movie.title}
    >
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path, "w500")}
          alt={movie.title}
          className="poster-img"
          loading="lazy"
        />

        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {movie.vote_average}
            </span>

            <button
              type="button"
              className={`favorite-btn ${isFavourite ? "is-favorite" : ""}`}
              title={isFavourite ? "Remove from favourites" : "Add to favourites"}
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
              onClick={(event) => {
                event.stopPropagation();
                if (context) {
                  context.toggleFavorite(movie);
                } else {
                  setStandaloneFavorite((current) => !current);
                }
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <span
            className="quick-view-hint"
            role="button"
            tabIndex={0}
            onClick={() => onMovieClick?.(movie)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onMovieClick?.(movie);
              }
            }}
          >
            View Details
          </span>
        </div>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div className="movie-card-meta">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>{movie.vote_count} votes</span>
        </div>

        <div className="movie-genres-tags">
          {movie.genre_ids?.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
