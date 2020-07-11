import films from "./mocks/films.js";
import {extend} from "./utils/utils.js";

const initialState = {
  activeMovie: null,
  movies: films,
};

const ActionType = {
  SELECT_MOVIE: `SELECT_MOVIE`,
};

const ActionCreator = {
  selectMovie: (movie) => ({
    type: ActionType.SELECT_MOVIE,
    payload: movie
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_MOVIE:
      return extend(state, {
        activeMovie: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
