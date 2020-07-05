import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

const movie = {
  title: `Тест1`,
  pictureSrc: `test1.jpg`,
  preview: `test2.jpg`,
};

it(`VideoPlayer render correctly`, () => {
  const tree = renderer
    .create(
        <VideoPlayer
          src = {movie.preview}
          posterSrc = {movie.pictureSrc}
          isPlaying = {true}
          width={`100%`}
          height={`100%`}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
