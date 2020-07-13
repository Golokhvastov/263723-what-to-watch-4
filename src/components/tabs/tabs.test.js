import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

const mocks = {
  movie: {
    title: `Test1`,
    previewImage: `test1.jpg`,
    genre: `Test genre`,
    year: 1999,
    rating: {
      score: 5.5,
      votes: 110
    },
    descriptions: [
      `Test description1`,
      `Test description2`,
    ],
    director: `Test director`,
    starring: [
      `Test starring 1`,
      `Test starring 2`,
      `Test starring 3`,
      `Test starring 4`,
    ],
    runTime: 120,
    preview: `Test4`,
    reviews: [
      {
        rating: 7.9,
        date: `December 10, 2010`,
        author: `Test5`,
        text: `Test5`
      },
      {
        rating: 8.0,
        date: `December 20, 2020`,
        author: `Test6`,
        text: `Test6`
      },
      {
        rating: 9.0,
        date: `December 30, 2030`,
        author: `Test7`,
        text: `Test7`
      }
    ]
  }
};

describe(`Tabs render correctly`, () => {
  it(`Tabs with Overview`, () => {
    const tree = renderer
      .create(
          <Tabs
            movie={mocks.movie}
            activeItem = "Overview"
            onActiveItemChange = {() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Tabs with Details`, () => {
    const tree = renderer
      .create(
          <Tabs
            movie={mocks.movie}
            activeItem = "Details"
            onActiveItemChange = {() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Tabs with Reviews`, () => {
    const tree = renderer
      .create(
          <Tabs
            movie={mocks.movie}
            activeItem = "Reviews"
            onActiveItemChange = {() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
