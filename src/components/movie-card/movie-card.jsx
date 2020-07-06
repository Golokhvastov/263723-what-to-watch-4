import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {movie, onTitleClick, onCardMouseEnter, onCardMouseLeave, renderVideo} = props;

  const videoSrc = movie.preview;
  const videoPosterSrc = `img/${movie.pictureSrc}`;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onCardMouseEnter}
      onMouseLeave={onCardMouseLeave}
      onClick = {(evt) => {
        evt.preventDefault();
        onTitleClick(movie);
      }}
    >
      <div className="small-movie-card__image">
        {renderVideo(videoSrc, videoPosterSrc)}
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
    pictureSrc: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  renderVideo: PropTypes.func.isRequired,
};

// <img src={`img/${movie.pictureSrc}`} alt={movie.title} width="280" height="175" />
