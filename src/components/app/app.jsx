import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {getNeedMovies, getAllFilteredMovies} from "../../utils/utils.js";
import {Settings} from "../../const.js";
import {ActionCreator} from "../../reducer.js";

const App = (props) => {
  const {movies, activeMovie, selectMovie} = props;

  const _renderApp = () => {
    if (!activeMovie) {
      return (
        <Main
          movieCardTitle = {movies[0].title}
          movieCardGenre = {movies[0].genre}
          movieCardYear = {movies[0].year}
          onMovieTitleClick = {selectMovie}
        />
      );
    } else {
      return (
        <MoviePage
          movie = {activeMovie}
          onLogoClick = {() => selectMovie(null)}
          movies = {getNeedMovies(getAllFilteredMovies(movies, activeMovie.genre), Settings.maxSimilarMovies)}
          onMovieTitleClick = {selectMovie}
        />
      );
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {_renderApp()}
        </Route>
        <Route exact path="/dev-movie-page">
          <MoviePage
            movie = {movies[0]}
            onLogoClick = {() => {}}
            movies = {getNeedMovies(getAllFilteredMovies(movies, movies[0].genre), Settings.maxSimilarMovies)}
            onMovieTitleClick = {() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  activeMovie: state.activeMovie,
});

const mapDispatchToProps = (dispatch) => ({
  selectMovie: (selectedMovie) => {
    dispatch(ActionCreator.selectMovie(selectedMovie));
  },
});

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })
  ).isRequired,
  activeMovie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
  }),
  selectMovie: PropTypes.func.isRequired,
};
