import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

const MoviesList = (props) => {
  const {movies, onMovieTitleClick} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => {
        return (
          <MovieCard
            key = {movie.title}
            movie = {movie}
            onTitleClick = {onMovieTitleClick}
            onMouseEnter = {() => {}}
            onMouseLeave = {() => {}}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired
      })
  ).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};
