import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

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
        <Router
          history={history}
        >
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
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
