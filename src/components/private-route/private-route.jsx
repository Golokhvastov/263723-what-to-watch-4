import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import RedirectWithSavePath from "../redirect-with-save-path/redirect-with-save-path.jsx";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (authorizationStatus === AuthorizationStatus.AUTH) {
          return render(routeProps);
        } else {
          return (
            <RedirectWithSavePath
              lastPath = {routeProps.location.pathname}
              newPath = {AppRoute.LOGIN}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(
    mapStateToProps
)(PrivateRoute);

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};
