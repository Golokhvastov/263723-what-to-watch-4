import {extend} from "../../utils/utils.js";

const initialState = {
  movies: [],
  favoriteMovies: [],
  waitingRequest: false,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  CHANGE_FILM_IN_MOVIES: `CHANGE_FILM_IN_MOVIES`,
  ADD_FILM_IN_FAVORITE_MOVIES: `ADD_FILM_IN_FAVORITE_MOVIES`,
  REMOVE_FILM_FROM_FAVORITE_MOVIES: `REMOVE_FILM_FROM_FAVORITE_MOVIES`,
  START_WAITING_REQUEST: `START_WAITING_REQUEST`,
  STOP_WAITING_REQUEST: `STOP_WAITING_REQUEST`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
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
  startWaitingRequest: () => ({
    type: ActionType.START_WAITING_REQUEST
  }),
  stopWaitingRequest: () => ({
    type: ActionType.STOP_WAITING_REQUEST
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
    });
  },

  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(ActionCreator.loadFavoriteMovies(response.data));
    });
  },

  addMovieToFavoriteMovies: (filmId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/1`)
      .then((response) => {
        dispatch(ActionCreator.changeFilmInMovies(response.data));
        dispatch(ActionCreator.addFilmInFavoriteMovies(response.data));
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
      })
      .catch((err) => {
        throw err;
      });
  },

  postReview: (newReviewData, filmId) => (dispatch, getState, api) => {
    return api.post(`/comments/${filmId}`, {
      rating: newReviewData.rating,
      comment: newReviewData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.stopWaitingRequest());
      })
      .catch((err) => {
        dispatch(ActionCreator.stopWaitingRequest());
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload
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
    case ActionType.START_WAITING_REQUEST:
      return extend(state, {
        waitingRequest: true
      });
    case ActionType.STOP_WAITING_REQUEST:
      return extend(state, {
        waitingRequest: false
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
