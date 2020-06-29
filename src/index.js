import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const movieCardInfo = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

ReactDOM.render(
    <App
      movieCardTitle = {movieCardInfo.TITLE}
      movieCardGenre = {movieCardInfo.GENRE}
      movieCardYear = {movieCardInfo.YEAR}
    />,
    document.querySelector(`#root`)
);
