import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const mocks = {
  genres: [
    `All genres`,
    `Comedies`,
    `Crime`,
    `Documentary`,
    `Dramas`,
    `Horror`,
    `Kids & Family`,
    `Romance`,
    `Sci-Fi`,
    `Thrillers`
  ]
};

it(`MoviePage render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          activeGenre = {`Romance`}
          genres = {mocks.genres}
          onGenreClick = {() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
