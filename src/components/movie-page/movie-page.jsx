import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Settings, AppRoute} from "../../const.js";

const TabsWrapper = withActiveItem(Tabs);

const MoviePage = (props) => {
  const {
    movie,
    onLogoClick,
    similarMovies,
    onMovieTitleClick,
    onPlayClick,
    authorizationStatus,
    addMovieInFavorite,
    removeMovieFromFavorite
  } = props;

  let title;
  let genre;
  let year;
  let posterImage;
  let backgroundImage;
  let backgroundColor;
  let isFavorite;

  if (movie) {
    title = movie.title;
    genre = movie.genre;
    year = movie.year;
    posterImage = movie.posterImage;
    backgroundImage = movie.backgroundImage;
    backgroundColor = movie.backgroundColor;
    isFavorite = movie.isFavorite;
  }

  return (
    <>
      <section className="movie-card movie-card--full" style={{background: backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link className="logo__link" to={AppRoute.ROOT} onClick={onLogoClick}>
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH
                ? (
                  <div className="user-block__avatar">
                    <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                  </div>
                )
                : (
                  <Link className="user-block__link" to={AppRoute.LOGIN}>Sign in</Link>
                )
              }
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
                {isFavorite === true
                  ? (
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => removeMovieFromFavorite(movie.id)}
                    >
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  )
                  : (
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => addMovieInFavorite(movie.id)}
                    >
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  )
                }
                {authorizationStatus === AuthorizationStatus.AUTH && (
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
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
            movies = {similarMovies}
            onMovieTitleClick = {onMovieTitleClick}
          />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to={AppRoute.ROOT} onClick={onLogoClick}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
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
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
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
  similarMovies: PropTypes.array.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  addMovieInFavorite: PropTypes.func.isRequired,
  removeMovieFromFavorite: PropTypes.func.isRequired,
};
