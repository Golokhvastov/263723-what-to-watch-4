import films from "./mocks/films.js";
import {extend} from "./utils/utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  activeMovie: null,
  playingMovie: null,
  movies: films,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const ActionType = {
  SELECT_MOVIE: `SELECT_MOVIE`,
  PLAYING_MOVIE: `PLAYING_MOVIE`,
  CHANGE_AUTHORIZATION_STATUS: `CHANGE_AUTHORIZATION_STATUS`,
  LOAD_MOVIES: `LOAD_MOVIES`,
};

const ActionCreator = {
  selectMovie: (movie) => ({
    type: ActionType.SELECT_MOVIE,
    payload: movie
  }),
  playMovie: (movie) => ({
    type: ActionType.PLAYING_MOVIE,
    payload: movie
  }),
  requireAuthorization: (authorizationStatus) => ({
    type: ActionType.CHANGE_AUTHORIZATION_STATUS,
    payload: authorizationStatus
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_MOVIE:
      return extend(state, {
        activeMovie: action.payload
      });
    case ActionType.PLAYING_MOVIE:
      return extend(state, {
        playingMovie: action.payload
      });
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus};
