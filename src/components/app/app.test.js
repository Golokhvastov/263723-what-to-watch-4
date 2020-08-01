import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {ServerStatus} from "../../reducer/data/data.js";

const mockStore = configureStore([]);

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      id: 38,
      isFavorite: true,
      title: `Test1`,
      previewImage: `test1.jpg`,
      posterImage: `test1.jpg`,
      backgroundImage: `test1.jpg`,
      backgroundColor: `test1.jpg`,
      genre: `Drama`,
      year: 2016,
      rating: {
        score: 9.5,
        votes: 428
      },
      descriptions: [
        `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.`,
        `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
      ],
      director: `Dima Beelan`,
      starring: [
        `Bill Murray`,
        `Edward Norton`,
        `Jude Law`,
        `Willem Dafoe`
      ],
      preview: `test1.jpg`,
      src: `test100.jpg`,
      runTime: 19,
    },
    {
      id: 2,
      isFavorite: false,
      title: `Test2`,
      previewImage: `test2.jpg`,
      posterImage: `test2.jpg`,
      backgroundImage: `test2.jpg`,
      backgroundColor: `test2.jpg`,
      genre: `Test22`,
      year: 2020,
      rating: {
        score: 8.5,
        votes: 48
      },
      descriptions: [
        `Gustave prides himself on providing first-className service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
      ],
      director: `Test23`,
      starring: [
        `Test24`,
        `Test25`,
        `Test26`,
        `Test27 Test27`
      ],
      preview: `test2.jpg`,
      src: `test200.jpg`,
      runTime: 28,
    },
  ],
  reviews: [
    {
      rating: 7.9,
      date: `December 10, 2010`,
      author: {
        name: `Test author 1`,
      },
      text: `Test text 1`
    },
    {
      rating: 8.0,
      date: `December 20, 2020`,
      author: {
        name: `Test author 2`,
      },
      text: `Test text 2`
    },
    {
      rating: 9.0,
      date: `December 30, 2030`,
      author: {
        name: `Test author 3`,
      },
      text: `Test text 3`
    }
  ],
  userInfo: {
    avatarUrl: `test avatarUrl.jpg`,
  },
};

describe(`App render correctly`, () => {
  it(`with AUTH`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {movies: mocks.movies},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              serverStatus = {ServerStatus.AVAILABLE}
              movies = {mocks.movies}
              promoMovie = {mocks.movies[0]}
              favoriteMovies = {mocks.movies}
              reviews = {mocks.reviews}
              authorizationStatus = {AuthorizationStatus.AUTH}
              userInfo = {mocks.userInfo}
              login = {() => {}}
              loadReviewsForId = {() => {}}
              loadFavoriteMovies = {() => {}}
              postReview = {() => {}}
              addMovieInFavorite = {() => {}}
              removeMovieFromFavorite = {() => {}}
              previousPath = {`/`}
              savePreviousPath = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
