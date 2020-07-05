import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      title: `Тест1`,
      pictureSrc: `test1.jpg`,
      preview: `test1.jpg`,
    },
    {
      title: `Тест2`,
      pictureSrc: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Тест3`,
      pictureSrc: `test3.jpg`,
      preview: `test3.jpg`,
    },
  ]
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
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
