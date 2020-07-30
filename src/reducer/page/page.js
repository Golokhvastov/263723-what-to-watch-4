import {extend} from "../../utils/utils.js";

const initialState = {
  selectedMovieId: null,
  playingMovie: null
};

const ActionType = {
  SELECT_MOVIE_ID: `SELECT_MOVIE_ID`,
  PLAYING_MOVIE: `PLAYING_MOVIE`
};

const ActionCreator = {
  selectMovieId: (filmId) => ({
    type: ActionType.SELECT_MOVIE_ID,
    payload: filmId
  }),
  playMovie: (movie) => ({
    type: ActionType.PLAYING_MOVIE,
    payload: movie
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_MOVIE_ID:
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
