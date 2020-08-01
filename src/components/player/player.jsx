import React from "react";
import PropTypes from "prop-types";

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return (
      <>
        {children}
      </>
    );
  }
}

export default Player;

Player.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
