import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import {getPreviousPath} from "../../reducer/page/selector.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";

const GuestRoute = (props) => {
  const {render, path, exact, authorizationStatus, previousPath} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
          return render(routeProps);
        } else {
          return (
            previousPath
              ? <Redirect to={previousPath} />
              : <Redirect to={AppRoute.ROOT} />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  previousPath: getPreviousPath(state),
});

export {GuestRoute};
export default connect(
    mapStateToProps
)(GuestRoute);

GuestRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  previousPath: PropTypes.string.isRequired,
};
