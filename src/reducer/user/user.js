import {extend} from "../../utils/utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const ActionType = {
  CHANGE_AUTHORIZATION_STATUS: `CHANGE_AUTHORIZATION_STATUS`
};

const ActionCreator = {
  requireAuthorization: (authorizationStatus) => ({
    type: ActionType.CHANGE_AUTHORIZATION_STATUS,
    payload: authorizationStatus
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return extend(state, {
        authorizationStatus: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus};
