import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  title: `Тест1`,
  pictureSrc: `test1.jpg`,
  preview: `test2.jpg`,
};

it(`MovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <MovieCard
          movie = {movie}
          onTitleClick = {() => {}}
          onMouseEnter = {() => {}}
          onMouseLeave = {() => {}}
          onCardMouseEnter = {() => {}}
          onCardMouseLeave = {() => {}}
          renderVideo = {() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
