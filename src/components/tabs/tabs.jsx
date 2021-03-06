import React from "react";
import PropTypes from "prop-types";
import TabOverview from "../tab-overview/tab-overview.jsx";
import TabDetails from "../tab-details/tab-details.jsx";
import TabReviews from "../tab-reviews/tab-reviews.jsx";

const TabNames = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

const TabNamesArray = [
  `Overview`,
  `Details`,
  `Reviews`
];

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      movie,
      reviews,
      activeItem: activeTab,
      onActiveItemChange: onActiveTabChange
    } = this.props;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {TabNamesArray.map((tabName, i) => {
              return (
                <li
                  key={tabName + i}
                  className={`movie-nav__item ${tabName === activeTab ? `movie-nav__item--active` : ``}`}
                >
                  <a
                    href="#"
                    className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      onActiveTabChange(tabName);
                    }}
                  >
                    {tabName}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {(activeTab === TabNames.OVERVIEW) && (
          <TabOverview
            movie={movie}
          />
        )}

        {(activeTab === TabNames.DETAILS) && (
          <TabDetails
            movie={movie}
          />
        )}

        {(activeTab === TabNames.REVIEWS) && (
          <TabReviews
            reviews={reviews}
          />
        )}

      </div>
    );
  }
}

export default Tabs;

Tabs.propTypes = {
  movie: PropTypes.shape({
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
    runTime: PropTypes.number.isRequired,
  }).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        text: PropTypes.string.isRequired
      })
  ),
};
