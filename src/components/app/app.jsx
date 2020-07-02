import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
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
