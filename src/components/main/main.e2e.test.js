import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [`Test1`, `Test2`, `Test3`]
};

it(`e2e test for Main`, () => {
  const main = shallow(
      <Main
        movieCardTitle = {mocks.movieCardTitle}
        movieCardGenre = {mocks.movieCardGenre}
        movieCardYear = {mocks.movieCardYear}
        movies = {mocks.movies}
      />
  );

  const moviesCards = main.find(`.small-movie-card`);
  expect(moviesCards.length).toBe(mocks.movies.length);
  for (let i = 0; i < moviesCards.length; i++) {
    expect(moviesCards.at(i).find(`a`).text()).toEqual(mocks.movies[i]);
  }
});
