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
        progress: Math.floor(video.currentTime),
      });
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          video.currentTime = null;
          video.play();
        }, 1000);
      } else {
        clearTimeout(this.timerId);
        video.pause();
        this.timerId = setTimeout(() => {
          video.src = video.src;
        }, 500);
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      clearTimeout(this.timerId);

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
      video.volume = null;
      video.src = null;
    }

    render() {
      return (
        <Component
          {...this.props}
        >
          <video ref={this._videoRef} width={this.props.width} height={this.props.height}/>
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    src: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  };

  return WithVideo;
};

export default withVideo;
