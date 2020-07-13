import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import Main from "./main.jsx";

const mockStore = configureStore([]);

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      title: `Test1`,
      genre: `Test11`,
      pictureSrc: `test1.jpg`,
      preview: `test1.jpg`,
      year: 1981,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      pictureSrc: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      pictureSrc: `test3.jpg`,
      preview: `test3.jpg`,
    },
    {
      title: `Test1`,
      genre: `Test11`,
      pictureSrc: `test1.jpg`,
      preview: `test1.jpg`,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      pictureSrc: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      pictureSrc: `test3.jpg`,
      preview: `test3.jpg`,
    },
    {
      title: `Test1`,
      genre: `Test11`,
      pictureSrc: `test1.jpg`,
      preview: `test1.jpg`,
    },
    {
      title: `Test2`,
      genre: `Test22`,
      pictureSrc: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      pictureSrc: `test3.jpg`,
      preview: `test3.jpg`,
    },
  ]
};

it(`Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {movies: mocks.movies},
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            mainMovie = {mocks.movies[0]}
            onMovieTitleClick = {() => {}}
            onPlayClick = {() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
