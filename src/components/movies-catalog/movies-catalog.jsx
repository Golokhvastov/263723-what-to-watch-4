import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import withShowMoreButton from "../../hocs/with-show-more-button/with-show-more-button.js";
import {getAllFilteredMovies, getGenresList} from "../../utils/utils.js";

const MoviesListWrapper = withShowMoreButton(MoviesList);

const MoviesCatalog = (props) => {
  const {
    movies,
    activeItem: activeGenre,
    onActiveItemChange: selectGenre,
    onMovieTitleClick
  } = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList
        activeGenre = {activeGenre}
        genres = {getGenresList(movies)}
        onGenreClick = {(selectedGenre) => {
          selectGenre(selectedGenre);
        }}
      />

      <MoviesListWrapper
        movies = {getAllFilteredMovies(movies, activeGenre)}
        onMovieTitleClick = {onMovieTitleClick}
        activeGenre = {activeGenre}
      />
    </section>
  );
};

export default MoviesCatalog;

MoviesCatalog.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired
      })
  ).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};
