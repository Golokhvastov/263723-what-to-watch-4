import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as page} from "./page/page.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";

export const reducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.PAGE]: page,
  [NameSpace.USER]: user,
});
