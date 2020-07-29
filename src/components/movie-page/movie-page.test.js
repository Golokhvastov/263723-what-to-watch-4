import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mocks = {
  movie: {
    id: 31,
    isFavorite: true,
    title: `Test1`,
    posterImage: `test1.jpg`,
    backgroundImage: `test1.jpg`,
    backgroundColor: `test1.jpg`,
    previewImage: `test1.jpg`,
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
      posterImage: `test8.jpg`,
      backgroundImage: `test8.jpg`,
      previewImage: `test8.jpg`,
      preview: `test8.mp4`
    },
    {
      title: `Test9`,
      posterImage: `test9.jpg`,
      backgroundImage: `test9.jpg`,
      previewImage: `test9.jpg`,
      preview: `test9.mp4`
    },
    {
      title: `Test10`,
      posterImage: `test10.jpg`,
      backgroundImage: `test10.jpg`,
      previewImage: `test10.jpg`,
      preview: `test10.mp4`
    },
  ]
};

describe(`MoviePage render correctly`, () => {
  it(`with AUTH`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <MoviePage
              movie = {mocks.movie}
              onLogoClick = {() => {}}
              similarMovies = {mocks.movies}
              onMovieTitleClick = {() => {}}
              onPlayClick = {() => {}}
              authorizationStatus = {AuthorizationStatus.AUTH}
              addMovieInFavorite = {() => {}}
              removeMovieFromFavorite = {() => {}}
            />
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`with NO_AUTH`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <MoviePage
              movie = {mocks.movie}
              onLogoClick = {() => {}}
              similarMovies = {mocks.movies}
              onMovieTitleClick = {() => {}}
              onPlayClick = {() => {}}
              authorizationStatus = {AuthorizationStatus.NO_AUTH}
              addMovieInFavorite = {() => {}}
              removeMovieFromFavorite = {() => {}}
            />
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
