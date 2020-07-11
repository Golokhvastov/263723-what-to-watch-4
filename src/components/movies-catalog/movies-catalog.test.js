import React from "react";
import renderer from "react-test-renderer";
import MoviesCatalog from "./movies-catalog.jsx";

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
  ]
};


describe(`MoviesCatalog render correctly`, () => {
  it(`with genre: All genres`, () => {
    const tree = renderer
      .create(
          <MoviesCatalog
            movies = {mocks.movies}
            activeItem = {`All genres`}
            onActiveItemChange = {() => {}}
            onMovieTitleClick = {() => {}}
          />, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`with genre: Test11`, () => {
    const tree = renderer
      .create(
          <MoviesCatalog
            movies = {mocks.movies}
            activeItem = {`Test11`}
            onActiveItemChange = {() => {}}
            onMovieTitleClick = {() => {}}
          />, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});