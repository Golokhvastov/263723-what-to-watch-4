import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const movie = {
  id: 38,
  title: `Test1`,
  posterImage: `test1.jpg`,
  backgroundImage: `test1.jpg`,
  backgroundColor: `test1.jpg`,
};

it(`AddReview render correctly`, () => {
  const tree = renderer
    .create(
        <AddReview
          movie = {movie}
          onSubmit = {() => {}}
          onLogoClick = {() => {}}
          authorizationStatus = {AuthorizationStatus.AUTH}
          activeItem = {{
            rating: null,
            reviewText: null,
            isRatingChanged: null,
            isTextCorrect: null,
          }}
          onActiveItemChange = {() => {}}
          waitingRequest = {false}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
