import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.PAGE;

export const getActiveMovie = (state) => {
  return state[NAME_SPACE].activeMovie;
};

export const getPlayingMovie = (state) => {
  return state[NAME_SPACE].playingMovie;
};
