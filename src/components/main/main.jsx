import React from "react";
import PropTypes from "prop-types";
import MoviesCatalog from "../movies-catalog/movies-catalog.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Settings} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const MoviesCatalogWrapper = withActiveItem(MoviesCatalog);

const Main = (props) => {
  const {
    promoMovie,
    onMovieTitleClick,
    onPlayClick,
    authorizationStatus,
    userInfo,
    addMovieInFavorite,
    removeMovieFromFavorite,
    onSignInClick,
    onAvatarClick
  } = props;

  let id;
  let title;
  let genre;
  let year;
  let posterImage;
  let backgroundImage;
  let isFavorite;

  if (promoMovie) {
    id = promoMovie.id;
    title = promoMovie.title;
    genre = promoMovie.genre;
    year = promoMovie.year;
    posterImage = promoMovie.posterImage;
    backgroundImage = promoMovie.backgroundImage;
    isFavorite = promoMovie.isFavorite;
  }

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
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
            {authorizationStatus === AuthorizationStatus.AUTH
              ? (
                <div className="user-block__avatar" onClick={onAvatarClick}>
                  <img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63" />
                </div>
              )
              : (
                <a href="sign-in.html" className="user-block__link"
                  onClick = {(evt) => {
                    evt.preventDefault();
                    onSignInClick();
                  }}
                >Sign in</a>
              )
            }
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
            </div>

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
                  onClick={() => onPlayClick(promoMovie)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {isFavorite === true
                  ? (
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => removeMovieFromFavorite(id)}
                    >
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  )
                  : (
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => addMovieInFavorite(id)}
                    >
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <MoviesCatalogWrapper
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

export default Main;

Main.propTypes = {
  promoMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }),
  onMovieTitleClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
  }),
  addMovieInFavorite: PropTypes.func.isRequired,
  removeMovieFromFavorite: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onAvatarClick: PropTypes.func.isRequired,
};
