import React from "react";
import PropTypes from "prop-types";

const Player = (props) => {
  const {children} = props;

  return (
    <>
      {children}
    </>
  );
};

export default Player;

Player.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
