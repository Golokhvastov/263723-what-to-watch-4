import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const movies = [
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
];

it(`MovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <MoviesList
          movies = {movies}
          onMovieTitleClick = {() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
