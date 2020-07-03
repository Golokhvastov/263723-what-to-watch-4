import React from "react";
import ReactDOM from "react-dom";
import films from "./mocks/films.js";
import App from "./components/app/app.jsx";

const MovieCardInfo = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

ReactDOM.render(
    <App
      movieCardTitle = {MovieCardInfo.TITLE}
      movieCardGenre = {MovieCardInfo.GENRE}
      movieCardYear = {MovieCardInfo.YEAR}
      movies = {films}
    />,
    document.querySelector(`#root`)
);
