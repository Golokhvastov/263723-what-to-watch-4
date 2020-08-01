import React from "react";
import renderer from "react-test-renderer";
import TabReviews from "./tab-reviews.jsx";

const mocks = {
  movie: {
    id: 11,
    posterImage: `test posterImage 1.jpg`,
    previewImage: `test previewImage 1.jpg`,
    backgroundImage: `test backgroundImage 1.jpg`,
    backgroundColor: `test backgroundColor 1.jpg`,
    isFavorite: false,
    descriptions: [
      `Test description 1-1`,
      `Test description 1-2`,
    ],
    director: `Test director 1`,
    genre: `Test genre 1`,
    preview: `Test preview 1`,
    rating: {
      score: 1.0,
      votes: 112
    },
    runTime: 113,
    src: `Test src 1`,
    starring: [
      `Test starring 1-1`,
      `Test starring 1-2`,
      `Test starring 1-3`,
      `Test starring 1-4`,
    ],
    title: `Test1`,
    year: 2001,
  },
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
  ]
};

it(`TabReviews render correctly`, () => {
  const tree = renderer
    .create(
        <TabReviews
          reviews={mocks.reviews}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
