import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = (props) => {
  const {movie, onTitleClick, onMouseEnter, onMouseLeave,
    isPlaying, onCardMouseEnter, onCardMouseLeave} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMouseEnter();
        onCardMouseEnter();
      }}
      onMouseLeave={() => {
        onMouseLeave();
        onCardMouseLeave();
      }}
      onClick = {(evt) => {
        evt.preventDefault();
        onTitleClick(movie);
      }}
    >
      <div className="small-movie-card__image">
        <VideoPlayer src = {movie.preview} isPlaying = {isPlaying} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
      </h3>
    </article>
  );
};

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    pictureSrc: PropTypes.string.isRequired
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

// <img src={`img/${movie.pictureSrc}`} alt={movie.title} width="280" height="175" />
