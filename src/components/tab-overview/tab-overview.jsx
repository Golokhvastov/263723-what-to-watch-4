import React from "react";
import PropTypes from "prop-types";
import {getTextRating} from "../../reducer/data/selector.js";

class TabOverview extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movie} = this.props;
    const {
      rating,
      descriptions,
      director,
      starring
    } = movie;

    return (
      <>
        <div className="movie-rating">
          <div className="movie-rating__score">{rating.score}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getTextRating(rating.score)}</span>
            <span className="movie-rating__count">{rating.votes} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          {descriptions.map((description, i) => {
            return (
              <p key={description + i}>{description}</p>
            );
          })}
          <p className="movie-card__director"><strong>Director: {director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
        </div>
      </>
    );
  }
}

export default TabOverview;

TabOverview.propTypes = {
  movie: PropTypes.shape({
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      votes: PropTypes.number.isRequired
    }).isRequired,
    descriptions: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired
  }).isRequired,
};
