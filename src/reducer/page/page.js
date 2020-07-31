import {extend} from "../../utils/utils.js";

const initialState = {
  previousPath: null,
};

const ActionType = {
  SAVE_PREVIOUS_PATH: `REMEMBER_PREVIOUS_PATH`,
};

const ActionCreator = {
  savePreviousPath: (leavingPath) => ({
    type: ActionType.SAVE_PREVIOUS_PATH,
    payload: leavingPath
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_PREVIOUS_PATH:
      return extend(state, {
        previousPath: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
