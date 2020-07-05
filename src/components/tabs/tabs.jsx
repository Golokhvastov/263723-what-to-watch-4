import React from "react";
import PropTypes from "prop-types";
import {getTextRating} from "../../utils/utils.js";

const TabNames = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TabNames.OVERVIEW,
    };
    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(evt, tabName) {
    evt.preventDefault();
    this.setState({
      activeTab: tabName
    });
  }

  render() {
    const {activeTab} = this.state;
    const {movie} = this.props;
    const {
      genre,
      year,
      rating,
      runTime,
      descriptions,
      director,
      starring,
      reviews
    } = movie;
    const reviewsPart1 = reviews.slice(0, (reviews.length + 1) / 2);
    const reviewsPart2 = reviews.slice((reviews.length + 1) / 2, reviews.length);

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={`movie-nav__item ${activeTab === TabNames.OVERVIEW ? `movie-nav__item--active` : ``}`}>
              <a
                href="#"
                className="movie-nav__link"
                onClick={(evt) => this.onTabClick(evt, TabNames.OVERVIEW)}
              >
                Overview
              </a>
            </li>
            <li className={`movie-nav__item ${activeTab === TabNames.DETAILS ? `movie-nav__item--active` : ``}`}>
              <a
                href="#"
                className="movie-nav__link"
                onClick={(evt) => this.onTabClick(evt, TabNames.DETAILS)}
              >
                Details
              </a>
            </li>
            <li className={`movie-nav__item ${activeTab === TabNames.REVIEWS ? `movie-nav__item--active` : ``}`}>
              <a
                href="#"
                className="movie-nav__link"
                onClick={(evt) => this.onTabClick(evt, TabNames.REVIEWS)}
              >
                Reviews
              </a>
            </li>
          </ul>
        </nav>

        {activeTab === TabNames.OVERVIEW && (
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
        )}

        {activeTab === TabNames.DETAILS && (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring.map((star, i, array) => {
                    return (
                      <React.Fragment key={star + i}>
                        {star}
                        {i < (array.length - 1) && `,`}
                        {i < (array.length - 1) && <br />}
                      </React.Fragment>
                    );
                  })}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{runTime}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{year}</span>
              </p>
            </div>
          </div>
        )}

        {activeTab === TabNames.REVIEWS && (
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {reviewsPart1.map((review, i) => {
                return (
                  <div className="review" key={review + i}>
                    <blockquote className="review__quote">
                      <p className="review__text">{review.text}</p>

                      <footer className="review__details">
                        <cite className="review__author">{review.author}</cite>
                        <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{review.rating}</div>
                  </div>
                );
              })}
            </div>
            <div className="movie-card__reviews-col">
              {reviewsPart2.map((review, i) => {
                return (
                  <div className="review" key={review + i}>
                    <blockquote className="review__quote">
                      <p className="review__text">{review.text}</p>

                      <footer className="review__details">
                        <cite className="review__author">{review.author}</cite>
                        <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{review.rating}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Tabs;

Tabs.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    pictureSrc: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
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
    ).isRequired,
    runTime: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        })
    )
  }).isRequired,
};
