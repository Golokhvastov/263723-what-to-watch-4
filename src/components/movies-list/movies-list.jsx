import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCardId: null,
    };
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  mouseEnterHandler(movie) {
    this.setState({activeCardId: movie});
  }

  mouseLeaveHandler() {
    this.setState({activeCardId: null});
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          return (
            <MovieCard
              key = {movie.title}
              movie = {movie}
              onTitleClick = {onMovieTitleClick}
              onMouseEnter = {() => this.mouseEnterHandler(index)}
              onMouseLeave = {this.mouseLeaveHandler}
            />
          );
        })}
      </div>
    );
  }
}

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
