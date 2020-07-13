import React from "react";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";

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
  ],
  genresList: [
    `All genres`,
    `Test11`,
    `Test22`,
    `Test33`,
  ]
};

describe(`MoviesCatalog render correctly`, () => {
  it(`with genre: All genres`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {movies: mocks.movies},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviesCatalog
              movies = {mocks.movies}
              activeItem = {`All genres`}
              genresList = {mocks.genresList}
              onActiveItemChange = {() => {}}
              onMovieTitleClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`with genre: Test11`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {movies: mocks.movies},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviesCatalog
              movies = {mocks.movies}
              activeItem = {`Test11`}
              genresList = {mocks.genresList}
              onActiveItemChange = {() => {}}
              onMovieTitleClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
