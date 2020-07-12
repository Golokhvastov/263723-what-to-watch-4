import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";

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

it(`e2e test for Main`, () => {
  const movieTitleClickHandler = jest.fn();

  const main = mount(
      <Main
        movieCardTitle = {mocks.movieCardTitle}
        movieCardGenre = {mocks.movieCardGenre}
        movieCardYear = {mocks.movieCardYear}
        movies = {mocks.movies}
        activeGenre = {`All genres`}
        selectGenre = {() => {}}
        onMovieTitleClick = {movieTitleClickHandler}
        onPlayClick = {() => {}}
      />
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
