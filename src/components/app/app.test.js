import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const mocks = {
  movieCardTitle: `Test`,
  movieCardGenre: `Comedy`,
  movieCardYear: 2011,
  movies: [
    {
      title: `Test1`,
      pictureSrc: `test1.jpg`,
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
    },
    {
      title: `Test2`,
      genre: `Test22`,
      year: 2020,
      pictureSrc: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      genre: `Test33`,
      year: 2030,
      pictureSrc: `test3.jpg`,
      preview: `test3.jpg`,
    },
  ]
};

it(`App render correctly`, () => {
  const store = mockStore({
    activeMovie: null,
    movies: mocks.movies,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            movies = {mocks.movies}
            activeMovie = {null}
            selectMovie = {() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
