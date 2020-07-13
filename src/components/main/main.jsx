import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Settings} from "../../const.js";
import {getMovies} from "../../reducer/data/selector.js";

const MoviesCatalogWrapper = withActiveItem(MoviesCatalog);

const Main = (props) => {
  const {
    movieCardTitle,
    movieCardGenre,
    movieCardYear,
    movies,
    onMovieTitleClick,
    onPlayClick
  } = props;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movieCardTitle}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movieCardGenre}</span>
                <span className="movie-card__year">{movieCardYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => onPlayClick(movies[0])}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <MoviesCatalogWrapper
          movies = {movies}
          onMovieTitleClick = {onMovieTitleClick}
          startItem = {Settings.allGenres}
        />

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  movies: getMovies(state)
});

export {Main};
export default connect(
    mapStateToProps
)(Main);

Main.propTypes = {
  movieCardTitle: PropTypes.string.isRequired,
  movieCardGenre: PropTypes.string.isRequired,
  movieCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired
      })
  ).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired
};
