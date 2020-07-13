import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";

const MovieCardWrapper = withVideoPlayer(MovieCard);

const MoviesList = (props) => {
  const {movies, onMovieTitleClick} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, i) => {
        return (
          <MovieCardWrapper
            key = {movie.title + i}
            movie = {movie}
            onTitleClick = {onMovieTitleClick}
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
        previewImage: PropTypes.string.isRequired
      })
  ).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};
