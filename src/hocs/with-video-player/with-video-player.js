import React from "react";
import Player from "../../components/player/player.jsx";
import withVideo from "../with-video/with-video.js";

const VideoPlayer = withVideo(Player);

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false,
      };
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

    renderVideo(src, posterSrc) {
      return (
        <VideoPlayer
          src = {src}
          posterSrc = {posterSrc}
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
          renderVideo = {(src, posterSrc) => this.renderVideo(src, posterSrc)}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
};

export default withVideoPlayer;
