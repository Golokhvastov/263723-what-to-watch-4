import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

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
      reviews: [
        {
          rating: 8.9,
          date: `December 24, 2016`,
          author: `Kate Muir`,
          text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`
        },
        {
          rating: 7.6,
          date: `December 20, 2016`,
          author: `Paula Fleri-Soler`,
          text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`
        },
      ]
    },
    {
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
      reviews: [
        {
          rating: 7.9,
          date: `December 29, 2029`,
          author: `Test29`,
          text: `Test29 travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`
        },
      ]
    },
    {
      title: `Test3`,
      genre: `Test33`,
      year: 2030,
      previewImage: `test3.jpg`,
      preview: `test3.jpg`,
      src: `test300.jpg`,
    },
  ]
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
              movies = {mocks.movies}
              authorizationStatus = {AuthorizationStatus.AUTH}
              login = {() => {}}
              postReview = {() => {}}
              waitingRequest = {false}
              addMovieInFavorite = {() => {}}
              removeMovieFromFavorite = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
