import React from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: props.startItem,
      };
      this.activeItemChangeHandler = this.activeItemChangeHandler.bind(this);
    }

    activeItemChangeHandler(newActiveItem) {
      this.setState({activeItem: newActiveItem});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem = {this.state.activeItem}
          onActiveItemChange = {this.activeItemChangeHandler}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    startItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
