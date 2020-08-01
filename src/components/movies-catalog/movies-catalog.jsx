import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import withShowMoreButton from "../../hocs/with-show-more-button/with-show-more-button.js";
import {getMovies, getGenresList, getFilteredMovies} from "../../reducer/data/selector.js";

const MoviesListWrapper = withShowMoreButton(MoviesList);

const MoviesCatalog = (props) => {
  const {
    movies,
    genresList,
    activeItem: activeGenre,
    onActiveItemChange: selectGenre,
    onMovieTitleClick
  } = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList
        activeGenre = {activeGenre}
        genres = {genresList}
        onGenreClick = {(selectedGenre) => {
          selectGenre(selectedGenre);
        }}
      />

      <MoviesListWrapper
        movies = {getFilteredMovies(movies, activeGenre)}
        onMovieTitleClick = {onMovieTitleClick}
        activeGenre = {activeGenre}
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genresList: getGenresList(state),
});

export {MoviesCatalog};
export default connect(
    mapStateToProps
)(MoviesCatalog);

MoviesCatalog.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired
      })
  ).isRequired,
  genresList: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};
