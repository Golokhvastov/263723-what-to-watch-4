import React from "react";
import PropTypes from "prop-types";

const FullscreenPlayer = (props) => {
  const {
    movie,
    onExitClick,
    progress,
    isLoading,
    isPlaying,
    onPlayClick,
    onPauseClick,
    children
  } = props;

  let title;
  let runTime = 1;

  if (movie) {
    title = movie.title;
    runTime = movie.runTime;
  }

  let seconds = progress % 60;
  let minutes = Math.floor(progress / 60) % 60;
  let hours = Math.floor(progress / 360) % 60;

  if (seconds <= 9) {
    seconds = `0` + seconds;
  }
  if (minutes <= 9) {
    minutes = `0` + minutes;
  }
  if (hours <= 9) {
    hours = `0` + hours;
  }

  const toggleProgress = (progress / (runTime * 60)) * 100;

  return (
    <div className="player">
      {children}

      <button type="button" className="player__exit"
        onClick={onExitClick}
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={runTime * 60}></progress>
            <div className="player__toggler" style={{left: `${toggleProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{`${hours}:${minutes}:${seconds}`}</div>
        </div>

        <div className="player__controls-row">
          {isPlaying
            ? (
              <button
                type="button"
                className="player__play"
                onClick={onPauseClick}
              >
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>)
            : (
              <button
                type="button"
                className="player__play"
                disabled={isLoading}
                onClick={onPlayClick}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>)
          }

          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen" onClick={(evt) => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              evt.target.parentElement.parentElement.parentElement.parentElement.requestFullscreen();
            }
          }}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenPlayer;

FullscreenPlayer.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }),
  onExitClick: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

// <video src="#" className="player__video" poster="img/player-poster.jpg"></video>

// <svg viewBox="0 0 14 21" width="14" height="21">
//   <use xlink:href="#pause"></use>
// </svg>
// <span>Pause</span>
