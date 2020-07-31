import {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";

const api = createAPI(() => {});

const testUserInfo = {
  avatarUrl: `test1.jpg`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userInfo: {},
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should change userInfo by a given value`, () => {
  expect(reducer({
    userInfo: {},
  }, {
    type: ActionType.LOAD_USER_INFO,
    payload: testUserInfo,
  })).toEqual({
    userInfo: testUserInfo,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });

    expect(ActionCreator.loadUserInfo(testUserInfo)).toEqual({
      type: ActionType.LOAD_USER_INFO,
      payload: testUserInfo,
    });
  });
});

it(`Should make a correct API call post to /login`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const login = Operation.login({
    login: `test@111.ru`,
    password: `11111`
  }, onSuccess, onError);

  apiMock.onPost(`/login`).reply(200, testUserInfo);

  return login(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.LOAD_USER_INFO,
      payload: testUserInfo
    });
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(0);
  })
  .catch(() => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledTimes(0);
  });
});

it(`Should make a error API call post to /login`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const login = Operation.login({
    login: `test@111`,
    password: `11111`
  }, onSuccess, onError);

  apiMock.onPost(`/login`).reply(400);

  return login(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledTimes(0);
  })
  .catch(() => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(0);
    expect(onError).toHaveBeenCalledTimes(1);
  });
});

it(`Should make a correct API call get to /login`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const login = Operation.checkAuth();

  apiMock.onGet(`/login`).reply(200, testUserInfo);

  return login(dispatch, () => {}, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.LOAD_USER_INFO,
      payload: testUserInfo
    });
  });
});
