import { getBackdropUrl, getPosterUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { useAppContext } from "../context/AppContext";
import { Movie } from "../types";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const { toggleFavorite, isFavorite } = useAppContext();
  const movieIsFavorite = isFavorite(movie.id);
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Release Date";
  const genres = getGenreNames(movie.genre_ids);

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-movie-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          x
        </button>

        <div
          className="modal-backdrop-hero"
          style={{ backgroundImage: `url("${getBackdropUrl(movie.backdrop_path)}")` }}
        />

        <div className="modal-body">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="modal-poster"
          />

          <div className="modal-content-details">
            <h2 className="modal-title" id="modal-movie-title">
              {movie.title}
            </h2>

            {movie.original_title && movie.original_title !== movie.title && (
              <div className="modal-original-title">
                Original Title: {movie.original_title}
              </div>
            )}

            <div className="modal-meta-row">
              <span className="rating-badge">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {rating} / 10
              </span>
              {movie.vote_count !== undefined && movie.vote_count > 0 && (
                <span className="modal-meta-item">
                  {movie.vote_count.toLocaleString()} Ratings
                </span>
              )}
              <span className="modal-meta-item">📅 {releaseDate}</span>
              {movie.popularity !== undefined && movie.popularity > 0 && (
                <span className="modal-meta-item">
                  🔥 Popularity: {Math.round(movie.popularity)}
                </span>
              )}
            </div>

            <div className="movie-genres-tags">
              {genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>

            <div className="modal-overview">
              <h4 className="modal-overview-heading">Overview</h4>
              <p>{movie.overview || "No plot synopsis available."}</p>
            </div>

            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => toggleFavorite(movie)}
              >
                {movieIsFavorite ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  `${movie.title} trailer ${movie.release_date?.slice(0, 4) ?? ""}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;