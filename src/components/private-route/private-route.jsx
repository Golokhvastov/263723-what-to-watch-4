import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import {ActionCreator} from "../../reducer/page/page.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus, rememberPreviousPath} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (authorizationStatus === AuthorizationStatus.AUTH) {
          return render(routeProps);
        } else {
          rememberPreviousPath(routeProps.location.pathname);
          return <Redirect to={AppRoute.LOGIN} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  rememberPreviousPath: (leavingPath) => {
    dispatch(ActionCreator.rememberPreviousPath(leavingPath));
  },
});

export {PrivateRoute};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute);

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  rememberPreviousPath: PropTypes.func.isRequired,
};
