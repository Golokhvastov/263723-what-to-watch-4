import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.PAGE;

export const getSelectedMovieId = (state) => {
  return state[NAME_SPACE].selectMovieId;
};

export const getPreviousPath = (state) => {
  return state[NAME_SPACE].previousPath;
};

export const getСurrentPath = (state) => {
  return state[NAME_SPACE].currentPath;
};
