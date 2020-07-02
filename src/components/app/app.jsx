import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {movieCardTitle, movieCardGenre, movieCardYear, movies} = props;

  return (
    <Main
      movieCardTitle = {movieCardTitle}
      movieCardGenre = {movieCardGenre}
      movieCardYear = {movieCardYear}
      movies = {movies}
    />
  );
};

export default App;

App.propTypes = {
  movieCardTitle: PropTypes.string.isRequired,
  movieCardGenre: PropTypes.string.isRequired,
  movieCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.String.isRequired
  ).isRequired
};
