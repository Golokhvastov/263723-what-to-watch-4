import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.PAGE;

export const getSelectedMovieId = (state) => {
  return state[NAME_SPACE].selectMovieId;
};

export const getPlayingMovie = (state) => {
  return state[NAME_SPACE].playingMovie;
};
