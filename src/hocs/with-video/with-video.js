import React, {createRef} from "react";
import PropTypes from "prop-types";

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = createRef();
      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
        startIsPlaying: props.isPlaying
      };
      this.playClickHandler = this.playClickHandler.bind(this);
      this.pauseClickHandler = this.pauseClickHandler.bind(this);
      this.fullscreenButtonHandler = this.fullscreenButtonHandler.bind(this);
    }

    playClickHandler() {
      this.setState({
        isPlaying: true
      });
    }

    pauseClickHandler() {
      this.setState({
        isPlaying: false
      });
    }

    componentDidMount() {
      const video = this._videoRef.current;

      if (this.props.movie) {
        video.src = this.props.movie.src;
        video.poster = this.props.movie.posterImage;
      }

      if (this.props.volume >= 0) {
        video.volume = this.props.volume;
      }

      video.oncanplaythrough = () => this.setState({
        isLoading: false
      });

      video.onplay = () => this.setState({
        isPlaying: true
      });

      video.onpause = () => this.setState({
        isPlaying: false
      });

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.movie) {
        if (video.src !== this.props.movie.src) {
          video.src = this.props.movie.src;
        }
        if (video.poster !== this.props.movie.posterImage) {
          video.poster = this.props.movie.posterImage;
        }
      }

      if (this.props.isPlaying !== this.state.startIsPlaying) {
        this.setState({
          isPlaying: this.props.isPlaying,
          startIsPlaying: this.props.isPlaying,
        });
      }

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
        // video.src = video.src;
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.volume = null;
      video.src = null;
    }

    render() {
      const {progress, isLoading, isPlaying} = this.state;
      const {controls} = this.props;

      return (
        <Component
          {...this.props}
          progress = {progress}
          isLoading = {isLoading}
          isPlaying = {isPlaying}
          onPlayClick = {this.playClickHandler}
          onPauseClick = {this.pauseClickHandler}
          onFullscreen = {this.fullscreenButtonHandler}
        >
          <video ref={this._videoRef} width={this.props.width} height={this.props.height}
            className={this.props.videoClassName}
            controls={controls}
          />
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    movie: PropTypes.shape({
      src: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
    }),
    isPlaying: PropTypes.bool.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    videoClassName: PropTypes.string,
    volume: PropTypes.number,
    controls: PropTypes.bool,
  };

  return WithVideo;
};

export default withVideo;

// if (this.props.isPlaying) {
//   clearTimeout(this.timerId);
//   this.timerId = setTimeout(() => {
//     video.currentTime = null;
//     video.play();
//   }, 1000);
// } else {
//   clearTimeout(this.timerId);
//   video.pause();
//   this.timerId = setTimeout(() => {
//     video.src = video.src;
//   }, 500);
// }
