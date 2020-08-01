import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {Settings} from "../../const.js";
import {formatReviewDate} from "../../utils/utils.js";

const NAME_SPACE = NameSpace.DATA;

export const getServerStatus = (state) => {
  return state[NAME_SPACE].serverStatus;
};

const adaptMovie = (movie) => {
  if (movie) {
    if (movie.video_link) {
      return {
        id: movie.id,
        backgroundImage: movie.background_image,
        backgroundColor: movie.background_color,
        descriptions: [
          movie.description
        ],
        director: movie.director,
        genre: movie.genre,
        isFavorite: movie.is_favorite,
        preview: movie.preview_video_link,
        previewImage: movie.preview_image,
        posterImage: movie.poster_image,
        rating: {
          score: movie.rating,
          votes: movie.scores_count,
        },
        runTime: movie.run_time,
        src: movie.video_link,
        starring: movie.starring,
        title: movie.name,
        year: movie.released,
      };
    }
  }

  return movie;
};

const adaptMovies = (movies) => {
  return movies.map((movie) => adaptMovie(movie));
};

export const getMovies = (state) => {
  return adaptMovies(state[NAME_SPACE].movies);
};

export const getPromoMovie = (state) => {
  return adaptMovie(state[NAME_SPACE].promoMovie);
};

export const getFavoriteMovies = (state) => {
  return adaptMovies(state[NAME_SPACE].favoriteMovies);
};

const adaptReview = (review) => {
  if (review) {
    if (review.user) {
      return {
        id: review.id,
        author: {
          id: review.user.id,
          name: review.user.name,
        },
        date: formatReviewDate(review.date),
        rating: review.rating,
        text: review.comment,
      };
    }
  }

  return review;
};

const adaptReviews = (reviews) => {
  return reviews.map((review) => adaptReview(review));
};

export const getReviews = (state) => {
  return adaptReviews(state[NAME_SPACE].reviewsForId);
};

export const getTextRating = (value) => {
  if (value >= 0 && value < 3) {
    return `Bad`;
  } else if (value >= 3 && value < 5) {
    return `Normal`;
  } else if (value >= 5 && value < 8) {
    return `Good`;
  } else if (value >= 8 && value < 10) {
    return `Very good`;
  } else if (value === 10) {
    return `Amesome`;
  }

  return ``;
};

const getArg = (arg) => arg;
const getArg2 = (arg1, arg2) => arg2;

export const getFilteredMovies = createSelector(
    [getArg, getArg2],
    (movies, genre) => {
      if (genre !== Settings.ALL_GENRES) {
        return movies.filter((movie) => movie.genre === genre);
      }
      return movies;
    }
);

export const getNumberOfMovies = (movies, maxMovies) => {
  return movies.slice(0, maxMovies);
};

export const getSimilarMovies = (movies, prototypeMovie, maxMovies) => {
  const filteredMovies = getFilteredMovies(movies, prototypeMovie.genre);
  const moviesWithoutPrototype = filteredMovies.filter((movie) => movie.id !== prototypeMovie.id);

  return getNumberOfMovies(moviesWithoutPrototype, maxMovies);
};

export const getGenresList = createSelector(
    getMovies,
    (movies) => {
      const genres = movies.map((movie) => movie.genre);
      let uniqueGenres = genres.filter((value, index, array) => array.indexOf(value) === index);
      uniqueGenres.unshift(Settings.ALL_GENRES);

      return uniqueGenres.slice(0, Settings.MAX_GENRES_IN_MAIN);
    }
);
