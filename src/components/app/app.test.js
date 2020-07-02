import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [`Test1`, `Test2`, `Test3`]
};

it(`App render correctly`, () => {
  const tree = renderer
    .create(
        <App
          movieCardTitle = {mocks.movieCardTitle}
          movieCardGenre = {mocks.movieCardGenre}
          movieCardYear = {mocks.movieCardYear}
          movies = {mocks.movies}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
