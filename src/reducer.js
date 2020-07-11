import films from "./mocks/films.js";
import {extend} from "./utils/utils.js";

const initialState = {
  activeMovie: null,
  playingMovie: null,
  movies: films,
};

const ActionType = {
  SELECT_MOVIE: `SELECT_MOVIE`,
  PLAYING_MOVIE: `PLAYING_MOVIE`,
};

const ActionCreator = {
  selectMovie: (movie) => ({
    type: ActionType.SELECT_MOVIE,
    payload: movie
  }),
  playMovie: (movie) => ({
    type: ActionType.PLAYING_MOVIE,
    payload: movie
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
