import React, {createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const src = this.props.src;
    const video = this._videoRef.current;

    video.src = src;

    video.volume = 0;
    video.poster = this.props.posterSrc;

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
      progress: video.currentTime
    });
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
      video.currentTime = null;
      this.timerId = setTimeout(() => {
        video.src = video.src;
      }, 500);
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
    video = null;
  }

  render() {
    return (
      <video ref={this._videoRef} width={this.props.width} height={this.props.height}/>
    );
  }
}

export default VideoPlayer;

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};
