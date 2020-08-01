import {reducer, ActionCreator, ActionType} from "./page";
import {AppRoute} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    previousPath: null,
  });
});

it(`Reducer should change previousPath by a given value`, () => {
  expect(reducer({
    previousPath: AppRoute.ROOT,
  }, {
    type: ActionType.SAVE_PREVIOUS_PATH,
    payload: AppRoute.LOGIN,
  })).toEqual({
    previousPath: AppRoute.LOGIN,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for savePreviousPath returns correct action`, () => {
    expect(ActionCreator.savePreviousPath(AppRoute.MY_LIST)).toEqual({
      type: ActionType.SAVE_PREVIOUS_PATH,
      payload: AppRoute.MY_LIST,
    });

    expect(ActionCreator.savePreviousPath(AppRoute.ROOT)).toEqual({
      type: ActionType.SAVE_PREVIOUS_PATH,
      payload: AppRoute.ROOT,
    });
  });
});
