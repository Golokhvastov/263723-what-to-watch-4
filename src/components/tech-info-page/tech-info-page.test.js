import React from "react";
import renderer from "react-test-renderer";
import TechInfoPage from "./tech-info-page.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mocks = {
  userInfo: {
    avatarUrl: `test avatarUrl.jpg`,
  },
};

it(`TechInfoPage render correctly`, () => {
  const tree = renderer
    .create(
        <TechInfoPage
          authorizationStatus = {AuthorizationStatus.AUTH}
          userInfo = {mocks.userInfo}
          onLogoClick = {() => {}}
          onSignInClick = {() => {}}
          onAvatarClick = {() => {}}
        >
          <div>Test1</div>
        </TechInfoPage>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
