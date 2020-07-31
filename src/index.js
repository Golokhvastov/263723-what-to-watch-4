import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {ActionCreator as PageActionCreator} from "./reducer/page/page.js";
import {ActionCreator as DataActionCreator, ServerStatus} from "./reducer/data/data.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
import {createAPI} from "./api.js";
import history from "./history.js";
import {AppRoute} from "./const.js";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  if (history.location.pathname !== AppRoute.LOGIN) {
    store.dispatch(PageActionCreator.rememberPreviousPath(history.location.pathname));
    history.push(AppRoute.LOGIN);
  }
};

const onServerUnavailable = () => {
  store.dispatch(DataActionCreator.saveServerStatus(ServerStatus.NOT_AVAILABLE));
};

const api = createAPI(onUnauthorized, onServerUnavailable);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadFavoriteMovies());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
