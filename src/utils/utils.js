import {Settings} from "../const.js";

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

export const getFilteredMovies = (movies, genre, maxMovies = Settings.startCountMovies) => {
  if (genre !== Settings.allGenres) {
    const allFilteredMovies = movies.filter((movie) => movie.genre === genre);
    return allFilteredMovies.slice(0, maxMovies);
  }
  return movies;
};

export const getGenresList = (movies) => {
  const genres = movies.map((movie) => movie.genre);
  let uniqueGenres = genres.filter((value, index, array) => array.indexOf(value) === index);
  uniqueGenres.unshift(Settings.allGenres);

  return uniqueGenres.slice(0, Settings.maxFiltersInMain);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
