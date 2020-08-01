import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mocks = {
  movie: {
    id: 38,
    title: `Test1`,
    posterImage: `test1.jpg`,
    backgroundImage: `test1.jpg`,
    backgroundColor: `test1.jpg`,
  },
  userInfo: {
    avatarUrl: `test avatarUrl.jpg`,
  },
};

it(`AddReview render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <AddReview
            movie = {mocks.movie}
            onSubmit = {() => {}}
            onLogoClick = {() => {}}
            onMovieTitleClick = {() => {}}
            authorizationStatus = {AuthorizationStatus.AUTH}
            userInfo = {mocks.userInfo}
            rating = {null}
            reviewText = {null}
            isButtonDisabled = {true}
            isFormDisabled = {false}
            isServerError = {false}
            onRatingChange = {() => {}}
            onReviewTextChange = {() => {}}
            onSignInClick = {() => {}}
            onAvatarClick = {() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
