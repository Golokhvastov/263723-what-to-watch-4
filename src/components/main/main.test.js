import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import Main from "./main.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      id: 1,
      title: `Test1`,
      genre: `Test11`,
      previewImage: `test1.jpg`,
      posterImage: `test12.jpg`,
      backgroundImage: `test13.jpg`,
      preview: `test1.jpg`,
      year: 1981,
      isFavorite: false,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      previewImage: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      previewImage: `test3.jpg`,
      preview: `test3.jpg`,
    },
    {
      title: `Test1`,
      genre: `Test11`,
      previewImage: `test1.jpg`,
      preview: `test1.jpg`,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      previewImage: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      previewImage: `test3.jpg`,
      preview: `test3.jpg`,
    },
    {
      title: `Test1`,
      genre: `Test11`,
      previewImage: `test1.jpg`,
      preview: `test1.jpg`,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      previewImage: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      previewImage: `test3.jpg`,
      preview: `test3.jpg`,
    },
  ],
  userInfo: {
    avatarUrl: `test avatarUrl.jpg`,
  },
};

describe(`Main render correctly`, () => {
  it(`with AUTH`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {movies: mocks.movies},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router
              history={history}
            >
              <Main
                promoMovie = {mocks.movies[0]}
                onMovieTitleClick = {() => {}}
                onPlayClick = {() => {}}
                authorizationStatus = {AuthorizationStatus.AUTH}
                userInfo = {mocks.userInfo}
                addMovieInFavorite = {() => {}}
                removeMovieFromFavorite = {() => {}}
                onSignInClick = {() => {}}
                onAvatarClick = {() => {}}
              />
            </Router>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`with NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {movies: mocks.movies},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Router
              history={history}
            >
              <Main
                promoMovie = {mocks.movies[0]}
                onMovieTitleClick = {() => {}}
                onPlayClick = {() => {}}
                authorizationStatus = {AuthorizationStatus.NO_AUTH}
                userInfo = {null}
                addMovieInFavorite = {() => {}}
                removeMovieFromFavorite = {() => {}}
                onSignInClick = {() => {}}
                onAvatarClick = {() => {}}
              />
            </Router>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
