import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";

const MyList = (props) => {
  const {
    favoriteMovies,
    userInfo,
    onLogoClick,
    onMovieTitleClick,
  } = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link"
            onClick = {(evt) => {
              evt.preventDefault();
              onLogoClick();
            }}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList
          movies = {favoriteMovies}
          onMovieTitleClick = {onMovieTitleClick}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light"
            onClick = {(evt) => {
              evt.preventDefault();
              onLogoClick();
            }}
          >
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
  );
};

export default MyList;

MyList.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
      })
  ).isRequired,
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
  }),
  onLogoClick: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};
