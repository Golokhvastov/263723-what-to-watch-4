import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";

describe(`SignIn render correctly`, () => {
  it(`with authorizationErrorStatus = null, activeItem = true`, () => {
    const tree = renderer.create(
        <SignIn
          onSubmit={() => {}}
          onLogoClick={() => {}}
          authorizationErrorStatus={null}
          activeItem={true}
          onActiveItemChange={() => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with authorizationErrorStatus = 400, activeItem = true`, () => {
    const tree = renderer.create(
        <SignIn
          onSubmit={() => {}}
          onLogoClick={() => {}}
          authorizationErrorStatus={400}
          activeItem={true}
          onActiveItemChange={() => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with authorizationErrorStatus = null, activeItem = false`, () => {
    const tree = renderer.create(
        <SignIn
          onSubmit={() => {}}
          onLogoClick={() => {}}
          authorizationErrorStatus={null}
          activeItem={false}
          onActiveItemChange={() => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`with authorizationErrorStatus = 400, activeItem = false`, () => {
    const tree = renderer.create(
        <SignIn
          onSubmit={() => {}}
          onLogoClick={() => {}}
          authorizationErrorStatus={400}
          activeItem={false}
          onActiveItemChange={() => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
