import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movie = {
  title: `Тест1`,
  previewImage: `test1.jpg`,
  preview: `test2.jpg`,
};

describe(`MovieCard render correctly`, () => {
  it(`isPlaying = true`, () => {
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
            isPlaying = {true}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`isPlaying = false`, () => {
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
            isPlaying = {false}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
