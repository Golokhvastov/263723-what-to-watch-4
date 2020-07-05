import React from "react";
import PropTypes from "prop-types";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false,
      }
      this.cardMouseEnterHandler = this.cardMouseEnterHandler.bind(this);
      this.cardMouseLeaveHandler = this.cardMouseLeaveHandler.bind(this);
    }

    cardMouseEnterHandler() {
      this.setState({isPlaying: true});
    }

    cardMouseLeaveHandler() {
      this.setState({isPlaying: false});
    }

    render() {
      const {isPlaying} = this.state;
      return (
        <Component
          {...this.props}
          isPlaying = {isPlaying}
          onCardMouseEnter = {this.cardMouseEnterHandler}
          onCardMouseLeave = {this.cardMouseLeaveHandler}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
}

export default withVideoPlayer;
