import React from "react";
import PropTypes from "prop-types";

class MovieCard extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      movie,
      onTitleClick,
      onCardMouseEnter,
      onCardMouseLeave,
      renderVideo,
      isPlaying
    } = this.props;

    const videoSrc = movie.preview;
    const videoPosterSrc = movie.previewImage;

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
          {isPlaying
            ? (renderVideo(videoSrc, videoPosterSrc))
            : (<img src={movie.previewImage} alt={movie.title} width="280" height="175" />)
          }
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  renderVideo: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
