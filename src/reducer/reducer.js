import {combineReducers} from "redux";
import {reducer as dataReducer} from "./data/data.js";
import {reducer as pageReducer} from "./page/page.js";
import {reducer as userReducer} from "./user/user.js";

export const reducer = combineReducers({
  data: dataReducer,
  page: pageReducer,
  user: userReducer,
});
