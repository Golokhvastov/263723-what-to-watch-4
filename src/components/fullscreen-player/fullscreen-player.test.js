import React from "react";
import renderer from "react-test-renderer";
import FullscreenPlayer from "./fullscreen-player.jsx";

const movie = {
  title: `Test1`,
  previewImage: `test2.jpg`,
  preview: `test3.jpg`,
  src: `test4.jpg`,
  runTime: 55,
};

describe(`FullscreenPlayer render correctly`, () => {
  it(`progress = 0, isLoading = false, isPlaying = true`, () => {
    const tree = renderer
      .create(
          <FullscreenPlayer
            movie = {movie}
            onExitClick = {() => {}}
            progress = {0}
            isLoading = {false}
            isPlaying = {true}
            onPlayClick = {() => {}}
            onPauseClick = {() => {}}
          >
            <video />
          </FullscreenPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`progress = 11, isLoading = false, isPlaying = false`, () => {
    const tree = renderer
      .create(
          <FullscreenPlayer
            movie = {movie}
            onExitClick = {() => {}}
            progress = {11}
            isLoading = {false}
            isPlaying = {false}
            onPlayClick = {() => {}}
            onPauseClick = {() => {}}
          >
            <video />
          </FullscreenPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`progress = 22, isLoading = true, isPlaying = true`, () => {
    const tree = renderer
      .create(
          <FullscreenPlayer
            movie = {movie}
            onExitClick = {() => {}}
            progress = {22}
            isLoading = {true}
            isPlaying = {true}
            onPlayClick = {() => {}}
            onPauseClick = {() => {}}
          >
            <video />
          </FullscreenPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`progress = 100, isLoading = true, isPlaying = false`, () => {
    const tree = renderer
      .create(
          <FullscreenPlayer
            movie = {movie}
            onExitClick = {() => {}}
            progress = {100}
            isLoading = {true}
            isPlaying = {false}
            onPlayClick = {() => {}}
            onPauseClick = {() => {}}
          >
            <video />
          </FullscreenPlayer>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
