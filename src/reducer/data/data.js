import {extend} from "../../utils/utils.js";

const initialState = {
  movies: []
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
