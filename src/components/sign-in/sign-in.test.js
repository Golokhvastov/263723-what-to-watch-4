import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

describe(`SignIn render correctly`, () => {
  it(`with authorizationErrorStatus = null, activeItem = true`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            authorizationErrorStatus={null}
            activeItem={true}
            onActiveItemChange={() => {}}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with authorizationErrorStatus = 400, activeItem = true`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            authorizationErrorStatus={400}
            activeItem={true}
            onActiveItemChange={() => {}}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with authorizationErrorStatus = null, activeItem = false`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            authorizationErrorStatus={null}
            activeItem={false}
            onActiveItemChange={() => {}}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with authorizationErrorStatus = 400, activeItem = false`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            authorizationErrorStatus={400}
            activeItem={false}
            onActiveItemChange={() => {}}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
