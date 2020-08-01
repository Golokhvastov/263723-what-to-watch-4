import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/page/page.js";

class RedirectWithSavePath extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {savePreviousPath, lastPath} = this.props;

    savePreviousPath(lastPath);
  }

  render() {
    const {newPath} = this.props;

    return (
      <Redirect to={newPath} />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  savePreviousPath: (leavingPath) => {
    dispatch(ActionCreator.savePreviousPath(leavingPath));
  },
});

export {RedirectWithSavePath};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RedirectWithSavePath);

RedirectWithSavePath.propTypes = {
  lastPath: PropTypes.string,
  newPath: PropTypes.string.isRequired,
  savePreviousPath: PropTypes.func.isRequired,
};
