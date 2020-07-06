import films from "./mocks/films.js";
import {extend} from "./utils/utils.js";

const initialState = {
  genre: `All genres`,
  movies: films,
};

const ActionType = {
  SELECT_GENRE: `SELECT_GENRE`,
}

const ActionCreator = {
  selectGenre: (genre) => ({
    type: ActionType.SELECT_GENRE,
    payload: genre
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_GENRE:
      return extend(state, {
        genre: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
