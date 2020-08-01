import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

describe(`SignIn render correctly`, () => {
  it(`with isEmailValid = true, isPasswordValid = true`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            isEmailValid={true}
            isPasswordValid={true}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with isEmailValid = false, isPasswordValid = true`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            isEmailValid={false}
            isPasswordValid={true}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with isEmailValid = true, isPasswordValid = false`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            isEmailValid={true}
            isPasswordValid={false}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with isEmailValid = false, isPasswordValid = false`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <SignIn
            onSubmit={() => {}}
            onLogoClick={() => {}}
            isEmailValid={false}
            isPasswordValid={false}
          />
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
