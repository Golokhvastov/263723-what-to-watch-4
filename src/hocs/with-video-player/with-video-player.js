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
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.setState({isPlaying: true});
      }, 1000);
    }

    cardMouseLeaveHandler() {
      clearTimeout(this.timerId);
      this.setState({isPlaying: false});
    }

    componentWillUnmount() {
      clearTimeout(this.timerId);
    }

    renderVideo(src, posterSrc) {
      return (
        <VideoPlayer
          movie = {{
            src,
            posterImage: posterSrc,
          }}
          isPlaying = {this.state.isPlaying}
          width={`100%`}
          height={`100%`}
          volume={0}
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
          isPlaying = {this.state.isPlaying}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
};

export default withVideoPlayer;
