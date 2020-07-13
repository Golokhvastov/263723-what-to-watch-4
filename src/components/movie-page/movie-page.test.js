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
    ],
    runTime: 120,
    preview: `Test4`,
    reviews: [
      {
        rating: 7.9,
        date: `December 10, 2010`,
        author: `Test5`,
        text: `Test5`
      },
      {
        rating: 8.0,
        date: `December 20, 2020`,
        author: `Test6`,
        text: `Test6`
      },
      {
        rating: 9.0,
        date: `December 30, 2030`,
        author: `Test7`,
        text: `Test7`
      }
    ]
  },
  movies: [
    {
      title: `Test8`,
      pictureSrc: `test8.jpg`,
      preview: `test8.mp4`
    },
    {
      title: `Test9`,
      pictureSrc: `test9.jpg`,
      preview: `test9.mp4`
    },
    {
      title: `Test10`,
      pictureSrc: `test10.jpg`,
      preview: `test10.mp4`
    },
  ]
};

it(`MoviePage render correctly`, () => {
  const tree = renderer
    .create(
        <MoviePage
          movie = {mocks.movie}
          onLogoClick = {() => {}}
          movies = {mocks.movies}
          onMovieTitleClick = {() => {}}
          onPlayClick = {() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
