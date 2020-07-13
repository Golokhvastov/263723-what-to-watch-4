import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {Settings} from "../../const.js";

const NAME_SPACE = NameSpace.DATA;

const adaptMovies = (movies) => {
  const result = movies.map((movie) => {
    if (movie.video_link) {
      return {
        id: movie.id,
        posterImage: movie.poster_image,
        previewImage: movie.preview_image,
        backgroundImage: movie.background_image,
        backgroundColor: movie.background_color,
        isFavorite: movie.is_favorite,
        descriptions: [
          movie.description
        ],
        director: movie.director,
        genre: movie.genre,
        preview: movie.preview_video_link,
        rating: {
          score: movie.rating,
          votes: movie.scores_count,
        },
        reviews: [
          {
            rating: 7.6,
            date: `December 20, 2016`,
            author: `Paula Fleri-Soler`,
            text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`
          }
        ],
        runTime: movie.run_time,
        src: movie.video_link,
        starring: movie.starring,
        title: movie.name,
        year: movie.released,
      };
    }
    return movie;
  });

  return result;
};

export const getMovies = (state) => {
  return adaptMovies(state[NAME_SPACE].movies);
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
