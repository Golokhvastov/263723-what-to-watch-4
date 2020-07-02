import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [`Test1`, `Test2`, `Test3`]
};

const onMovieTitleClick = () => {};

it(`Main render correctly`, () => {
  const tree = renderer
    .create(
        <Main
          movieCardTitle = {mocks.movieCardTitle}
          movieCardGenre = {mocks.movieCardGenre}
          movieCardYear = {mocks.movieCardYear}
          movies = {mocks.movies}
          onMovieTitleClick = {onMovieTitleClick}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
