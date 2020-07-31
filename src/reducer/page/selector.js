import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.PAGE;

export const getPreviousPath = (state) => {
  return state[NAME_SPACE].previousPath;
};
