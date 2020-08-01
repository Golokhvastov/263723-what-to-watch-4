import React from "react";
import PropTypes from "prop-types";

class ShowMore extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onButtonClick} = this.props;

    return (
      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={onButtonClick}>Show more</button>
      </div>
    );
  }
}

export default ShowMore;

ShowMore.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};
