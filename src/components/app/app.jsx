import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const movieTitleClickHandler = () => {};

const App = (props) => {
  const {movieCardTitle, movieCardGenre, movieCardYear, movies} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            movieCardTitle = {movieCardTitle}
            movieCardGenre = {movieCardGenre}
            movieCardYear = {movieCardYear}
            movies = {movies}
            onMovieTitleClick = {movieTitleClickHandler}
          />
        </Route>
        <Route exact path="/dev-movie-page">
          <MoviePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

App.propTypes = {
  movieCardTitle: PropTypes.string.isRequired,
  movieCardGenre: PropTypes.string.isRequired,
  movieCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired
      })
  ).isRequired,
};
