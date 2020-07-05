import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const movies = [
  {
    title: `Тест1`,
    pictureSrc: `test1.jpg`,
    preview: `test1.mp4`
  },
  {
    title: `Тест2`,
    pictureSrc: `test2.jpg`,
    preview: `test2.mp4`
  },
  {
    title: `Тест3`,
    pictureSrc: `test3.jpg`,
    preview: `test3.mp4`
  },
];

it(`MoviesList render correctly`, () => {
  const tree = renderer
    .create(
        <MoviesList
          movies = {movies}
          onMovieTitleClick = {() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
