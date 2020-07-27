import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter()
});

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      title: `Test1`,
      genre: `Test11`,
      previewImage: `test1.jpg`,
      preview: `test1.jpg`,
      year: 1981,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      previewImage: `test2.jpg`,
      preview: `test2.jpg`,
      year: 1982,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      previewImage: `test3.jpg`,
      preview: `test3.jpg`,
      year: 1983,
    },
  ]
};

it(`e2e test for Main`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {movies: mocks.movies},
  });

  const movieTitleClickHandler = jest.fn();

  const main = mount(
      <Provider store={store}>
        <Main
          mainMovie = {mocks.movies[0]}
          onMovieTitleClick = {movieTitleClickHandler}
          onPlayClick = {() => {}}
          authorizationStatus = {AuthorizationStatus.AUTH}
        />
      </Provider>
  );

  const moviesCards = main.find(`.small-movie-card`);
  expect(moviesCards.length).toBe(mocks.movies.length);

  moviesCards.at(0).find(`h3`).simulate(`click`);
  expect(movieTitleClickHandler.mock.calls.length).toBe(1);

  for (let i = 0; i < moviesCards.length; i++) {
    moviesCards.at(i).find(`h3`).simulate(`click`);
  }
  expect(movieTitleClickHandler.mock.calls.length).toBe(mocks.movies.length + 1);
});
