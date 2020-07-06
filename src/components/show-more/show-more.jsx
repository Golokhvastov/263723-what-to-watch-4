import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {onButtonClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onButtonClick}>Show more</button>
    </div>
  );
};

export default ShowMore;

ShowMore.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};
