import {extend} from "../../utils/utils.js";

const initialState = {
  selectedMovieId: null,
  previousPath: null,
  currentPath: null
};

const ActionType = {
  SELECT_MOVIE_ID: `SELECT_MOVIE_ID`,
  REMEMBER_PREVIOUS_PATH: `REMEMBER_PREVIOUS_PATH`,
  REMEMBER_CURRENT_PATH: `REMEMBER_CURRENT_PATH`
};

const ActionCreator = {
  selectMovieId: (filmId) => ({
    type: ActionType.SELECT_MOVIE_ID,
    payload: filmId
  }),
  rememberPreviousPath: (leavingPath) => ({
    type: ActionType.REMEMBER_PREVIOUS_PATH,
    payload: leavingPath
  }),
  rememberCurrentPath: (newPagePath) => ({
    type: ActionType.REMEMBER_CURRENT_PATH,
    payload: newPagePath
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_MOVIE_ID:
      return extend(state, {
        activeMovie: action.payload
      });
    case ActionType.REMEMBER_PREVIOUS_PATH:
      return extend(state, {
        previousPath: action.payload
      });
    case ActionType.REMEMBER_CURRENT_PATH:
      return extend(state, {
        currentPath: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
