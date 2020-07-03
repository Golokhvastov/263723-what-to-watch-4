import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const mocks = {
  movie: {
    title: `Test1`,
    pictureSrc: `test1.jpg`,
    genre: `Test genre`,
    year: 1999,
    rating: {
      score: 5.5,
      votes: 110
    },
    descriptions: [
      `Test description1`,
      `Test description2`,
    ],
    director: `Test director`,
    starring: [
      `Test starring 1`,
      `Test starring 2`,
      `Test starring 3`,
      `Test starring 4`,
    ]
  }
};

it(`MoviePage render correctly`, () => {
  const tree = renderer
    .create(
        <MoviePage
          movie = {mocks.movie}
          onLogoClick = {() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
