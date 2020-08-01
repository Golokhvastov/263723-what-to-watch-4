import React from "react";
import PropTypes from "prop-types";

class TabOverview extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;
    const reviewsPart1 = reviews.slice(0, (reviews.length + 1) / 2);
    const reviewsPart2 = reviews.slice((reviews.length + 1) / 2, reviews.length);

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviewsPart1.map((review, i) => {
            return (
              <div className="review" key={review + i}>
                <blockquote className="review__quote">
                  <p className="review__text">{review.text}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.author.name}</cite>
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
                    <cite className="review__author">{review.author.name}</cite>
                    <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TabOverview;

TabOverview.propTypes = {

  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        text: PropTypes.string.isRequired
      })
  ).isRequired
};
