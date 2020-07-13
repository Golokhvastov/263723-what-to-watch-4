import NameSpace from "../name-space.js";

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};
