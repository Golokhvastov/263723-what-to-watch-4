import React from "react";
import renderer from "react-test-renderer";
import SingIn from "./sing-in.jsx";

it(`SingIn component render correctly`, () => {
  const tree = renderer.create(
      <SingIn
        onLogoClick={() => {}}
        onSubmit={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
