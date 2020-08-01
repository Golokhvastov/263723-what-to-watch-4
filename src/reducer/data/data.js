import {extend} from "../../utils/utils.js";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

const ServerStatus = {
  AVAILABLE: `AVAILABLE`,
  NOT_AVAILABLE: `NOT_AVAILABLE`,
};

const initialState = {
  serverStatus: ServerStatus.AVAILABLE,
  movies: [],
  promoMovie: null,
  favoriteMovies: [],
  reviewsForId: [],
};

const ActionType = {
  SAVE_SERVER_STATUS: `SAVE_SERVER_STATUS`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  LOAD_REVIEWS_FOR_ID: `LOAD_REVIEWS_FOR_ID`,
  CHANGE_FILM_IN_MOVIES: `CHANGE_FILM_IN_MOVIES`,
  ADD_FILM_IN_FAVORITE_MOVIES: `ADD_FILM_IN_FAVORITE_MOVIES`,
  REMOVE_FILM_FROM_FAVORITE_MOVIES: `REMOVE_FILM_FROM_FAVORITE_MOVIES`,
};

const ActionCreator = {
  saveServerStatus: (newStatus) => ({
    type: ActionType.SAVE_SERVER_STATUS,
    payload: newStatus
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  loadPromoMovie: (movies) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movies
  }),
  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies
  }),
  loadReviewsForId: (movies) => ({
    type: ActionType.LOAD_REVIEWS_FOR_ID,
    payload: movies
  }),
  changeFilmInMovies: (movie) => ({
    type: ActionType.CHANGE_FILM_IN_MOVIES,
    payload: movie
  }),
  addFilmInFavoriteMovies: (movie) => ({
    type: ActionType.ADD_FILM_IN_FAVORITE_MOVIES,
    payload: movie
  }),
  removeFilmFromFavoriteMovies: (movie) => ({
    type: ActionType.REMOVE_FILM_FROM_FAVORITE_MOVIES,
    payload: movie
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
    });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      dispatch(ActionCreator.loadPromoMovie(response.data));
    });
  },

  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(ActionCreator.loadFavoriteMovies(response.data));
    });
  },

  loadReviewsForId: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`).then((response) => {
      dispatch(ActionCreator.loadReviewsForId(response.data));
    });
  },

  addMovieToFavoriteMovies: (filmId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/1`)
      .then((response) => {
        dispatch(ActionCreator.changeFilmInMovies(response.data));
        dispatch(ActionCreator.addFilmInFavoriteMovies(response.data));
        if (filmId === getState()[NAME_SPACE].promoMovie.id) {
          dispatch(ActionCreator.loadPromoMovie(response.data));
        }
      })
      .catch((err) => {
        throw err;
      });
  },

  removeMovieFromFavoriteMovies: (filmId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/0`)
      .then((response) => {
        dispatch(ActionCreator.changeFilmInMovies(response.data));
        dispatch(ActionCreator.removeFilmFromFavoriteMovies(response.data));
        if (filmId === getState()[NAME_SPACE].promoMovie.id) {
          dispatch(ActionCreator.loadPromoMovie(response.data));
        }
      })
      .catch((err) => {
        throw err;
      });
  },

  postReview: (commentData, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/comments/${commentData.filmId}`, {
      rating: commentData.rating,
      comment: commentData.comment,
    })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        onError();
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_SERVER_STATUS:
      return extend(state, {
        serverStatus: action.payload
      });
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload
      });
    case ActionType.LOAD_REVIEWS_FOR_ID:
      return extend(state, {
        reviewsForId: action.payload
      });
    case ActionType.CHANGE_FILM_IN_MOVIES:
      return extend(state, {
        movies: [
          ...state.movies.filter((movie) => movie.id < action.payload.id),
          action.payload,
          ...state.movies.filter((movie) => movie.id > action.payload.id),
        ]
      });
    case ActionType.ADD_FILM_IN_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: [
          ...state.favoriteMovies.filter((movie) => movie.id !== action.payload.id),
          action.payload
        ]
      });
    case ActionType.REMOVE_FILM_FROM_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: [
          ...state.favoriteMovies.filter((movie) => movie.id !== action.payload.id)
        ]
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation, ServerStatus};
