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

const Tabs = (props) => {
  const {
    movie,
    activeItem: activeTab,
    onActiveItemChange: onActiveTabChange
  } = props;

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

      {(activeTab === TabNames.OVERVIEW && movie) && (
        <TabOverview
          movie={movie}
        />
      )}

      {(activeTab === TabNames.DETAILS && movie) && (
        <TabDetails
          movie={movie}
        />
      )}

      {(activeTab === TabNames.REVIEWS && movie) && (
        <TabReviews
          movie={movie}
        />
      )}

    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
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
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        })
    ).isRequired
  }).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired
};
