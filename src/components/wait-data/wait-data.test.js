import React from "react";
import renderer from "react-test-renderer";
import WaitData from "./wait-data.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mocks = {
  userInfo: {
    avatarUrl: `test avatarUrl.jpg`,
  },
};

it(`WaitData render correctly`, () => {
  const tree = renderer
    .create(
        <WaitData
          authorizationStatus = {AuthorizationStatus.AUTH}
          userInfo = {mocks.userInfo}
          onLogoClick = {() => {}}
          onSignInClick = {() => {}}
          onAvatarClick = {() => {}}
        >
          <div>Test1</div>
        </WaitData>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
