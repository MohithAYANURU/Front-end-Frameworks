import { Movie } from "../types";
import MovieCard from "./MovieCard";

type MovieListProps = {
    movies: Movie[];
    onMovieClick?: (movie: Movie) => void;
};

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
    if (movies.length === 0) {
        return <p>No movies found.</p>;     
    }
    return (
        <div className="movies-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={onMovieClick}
                />
            ))} 
        </div>  
    )
}

export default MovieList;