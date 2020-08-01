import {extend} from "../../utils/utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_USER_INFO: `LOAD_USER_INFO`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  loadUserInfo: (userData) => ({
    type: ActionType.LOAD_USER_INFO,
    payload: userData
  }),
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadUserInfo(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadUserInfo(response.data));
        onSuccess();
      })
      .catch((err) => {
        onError();
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.LOAD_USER_INFO:
      return extend(state, {
        userInfo: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, AuthorizationStatus, Operation};
