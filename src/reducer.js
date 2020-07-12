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
  })
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
        playingMovie: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus};
