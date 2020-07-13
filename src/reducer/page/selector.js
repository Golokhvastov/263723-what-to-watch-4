import NameSpace from "../name-space.js";

export const getActiveMovie = (state) => {
  return state[NameSpace.PAGE].activeMovie;
};

export const getPlayingMovie = (state) => {
  return state[NameSpace.PAGE].playingMovie;
};
