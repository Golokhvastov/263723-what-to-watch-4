import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list.jsx";

const mocks = {
  movies: [
    {
      title: `Test1`,
      previewImage: `test1.jpg`,
      preview: `test1.jpg`,
    },
    {
      title: `Test2`,
      previewImage: `test2.jpg`,
      preview: `test2.jpg`,
    },
    {
      title: `Test3`,
      previewImage: `test3.jpg`,
      preview: `test3.jpg`,
    },
  ],
  userInfo: {
    avatarUrl: `test avatarUrl.jpg`,
  },
};

it(`MyList render correctly`, () => {
  const tree = renderer
    .create(
        <MyList
          favoriteMovies = {mocks.movies}
          userInfo = {mocks.userInfo}
          onLogoClick = {() => {}}
          onMovieTitleClick = {() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
