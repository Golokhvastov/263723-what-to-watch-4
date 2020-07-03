import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      title: `Тест1`,
      pictureSrc: `test1.jpg`
    },
    {
      title: `Тест2`,
      pictureSrc: `test2.jpg`
    },
    {
      title: `Тест3`,
      pictureSrc: `test3.jpg`
    },
  ]
};

const onMovieTitleClick = () => {};

it(`App render correctly`, () => {
  const tree = renderer
    .create(
        <App
          movieCardTitle = {mocks.movieCardTitle}
          movieCardGenre = {mocks.movieCardGenre}
          movieCardYear = {mocks.movieCardYear}
          movies = {mocks.movies}
          onMovieTitleClick = {onMovieTitleClick}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});