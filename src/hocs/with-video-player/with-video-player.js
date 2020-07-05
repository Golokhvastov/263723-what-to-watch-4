import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../../components/video-player/video-player.jsx";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false,
      }
      this.cardMouseEnterHandler = this.cardMouseEnterHandler.bind(this);
      this.cardMouseLeaveHandler = this.cardMouseLeaveHandler.bind(this);
      this.renderVideo = this.renderVideo.bind(this);
    }

    cardMouseEnterHandler() {
      this.setState({isPlaying: true});
    }

    cardMouseLeaveHandler() {
      this.setState({isPlaying: false});
    }

    renderVideo(src) {
      return (
        <VideoPlayer
          src = {src}
          isPlaying = {this.state.isPlaying}
          width={`100%`}
          height={`100%`}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          onCardMouseEnter = {this.cardMouseEnterHandler}
          onCardMouseLeave = {this.cardMouseLeaveHandler}
          renderVideo = {(src) => this.renderVideo(src)}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
}

export default withVideoPlayer;
