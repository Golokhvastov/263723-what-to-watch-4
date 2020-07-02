import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const MovieCardInfo = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};
const MOVIES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

ReactDOM.render(
    <App
      movieCardTitle = {MovieCardInfo.TITLE}
      movieCardGenre = {MovieCardInfo.GENRE}
      movieCardYear = {MovieCardInfo.YEAR}
      movies = {MOVIES}
    />,
    document.querySelector(`#root`)
);
