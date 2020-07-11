import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Settings} from "../../const.js";

const TabsWrapper = withActiveItem(Tabs);

const MoviePage = (props) => {
  const {movie, onLogoClick, movies, onMovieTitleClick, onPlayClick} = props;
  const {
    title,
    pictureSrc,
    genre,
    year
  } = movie;

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={`img/${pictureSrc}`} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div
              className="logo"
              onClick={(evt) => {
                evt.preventDefault();
                onLogoClick();
              }}
            >
              <a href="main.html" className="logo__link">
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
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => onPlayClick(movie)}
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
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={`img/${pictureSrc}`} alt={`${title} poster`} width="218" height="327" />
            </div>

            <TabsWrapper
              movie={movie}
              startItem = {Settings.startMoviePageTab}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList
            movies = {movies}
            onMovieTitleClick = {onMovieTitleClick}
          />
        </section>

        <footer className="page-footer">
          <div
            className="logo"
            onClick={(evt) => {
              evt.preventDefault();
              onLogoClick();
            }}
          >
            <a href="main.html" className="logo__link logo__link--light">
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

export default MoviePage;

MoviePage.propTypes = {
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
  }).isRequired,
  onLogoClick: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};
