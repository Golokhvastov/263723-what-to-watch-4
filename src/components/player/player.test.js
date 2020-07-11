import React from "react";
import renderer from "react-test-renderer";
import Player from "./player.jsx";

it(`Player render correctly`, () => {
  const tree = renderer
    .create(
        <Player>
          <div></div>
        </Player>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
