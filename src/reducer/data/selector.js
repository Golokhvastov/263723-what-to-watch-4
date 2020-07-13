import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {Settings} from "../../const.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getTextRating = (value) => {
  if (value >= 0 && value < 3) {
    return `Bad`;
  } else if (value >= 3 && value < 5) {
    return `Normal`;
  } else if (value >= 5 && value < 8) {
    return `Good`;
  } else if (value >= 8 && value <= 10) {
    return `Very good`;
  }

  return ``;
};

const getArg = (arg) => arg;
const getArg2 = (arg1, arg2) => arg2;

export const getFilteredMovies = createSelector(
    [getArg, getArg2],
    (movies, genre) => {
      if (genre !== Settings.allGenres) {
        return movies.filter((movie) => movie.genre === genre);
      }
      return movies;
    }
);

export const getNumberOfMovies = (movies, maxMovies) => {
  return movies.slice(0, maxMovies);
};

export const getGenresList = createSelector(
    getMovies,
    (movies) => {
      const genres = movies.map((movie) => movie.genre);
      let uniqueGenres = genres.filter((value, index, array) => array.indexOf(value) === index);
      uniqueGenres.unshift(Settings.allGenres);

      return uniqueGenres.slice(0, Settings.maxFiltersInMain);
    }
);
