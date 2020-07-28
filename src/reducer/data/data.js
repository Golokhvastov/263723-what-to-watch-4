import {extend} from "../../utils/utils.js";

const initialState = {
  movies: [],
  waitingRequest: false,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  START_WAITING_REQUEST: `START_WAITING_REQUEST`,
  STOP_WAITING_REQUEST: `STOP_WAITING_REQUEST`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
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
