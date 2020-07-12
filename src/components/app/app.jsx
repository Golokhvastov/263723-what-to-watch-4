import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullscreenPlayer from "../fullscreen-player/fullscreen-player.jsx";
import {getNeedMovies, getAllFilteredMovies} from "../../utils/utils.js";
import {Settings} from "../../const.js";
import {ActionCreator} from "../../reducer.js";
import withVideo from "../../hocs/with-video/with-video.js";

const FullscreenPlayerWrapper = withVideo(FullscreenPlayer);

const App = (props) => {
  const {movies, activeMovie, selectMovie, playingMovie, playMovie} = props;
  console.log(movies);

  const _renderApp = () => {
    if (!activeMovie && !playingMovie) {
      return (
        <Main
          movieCardTitle = {movies[0].title}
          movieCardGenre = {movies[0].genre}
          movieCardYear = {movies[0].year}
          onMovieTitleClick = {selectMovie}
          onPlayClick = {playMovie}
        />
      );
    }

    if (activeMovie && !playingMovie) {
      return (
        <MoviePage
          movie = {activeMovie}
          onLogoClick = {() => selectMovie(null)}
          movies = {getNeedMovies(getAllFilteredMovies(movies, activeMovie.genre), Settings.maxSimilarMovies)}
          onMovieTitleClick = {selectMovie}
          onPlayClick = {playMovie}
        />
      );
    }

    if (playingMovie) {
      return (
        <FullscreenPlayerWrapper
          movie = {playingMovie}
          src = {playingMovie.src}
          posterSrc = {`img/${playingMovie.pictureSrc}`}
          isPlaying = {false}
          onExitClick = {() => playMovie(null)}
          videoClassName = {`player__video`}
        />
      );
    }

    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {_renderApp()}
        </Route>
        <Route exact path="/dev-movie-page">
          <MoviePage
            movie = {movies[0]}
            onLogoClick = {() => {}}
            movies = {getNeedMovies(getAllFilteredMovies(movies, movies[0].genre), Settings.maxSimilarMovies)}
            onMovieTitleClick = {() => {}}
            onPlayClick = {() => {}}
          />
        </Route>
        <Route exact path="/dev-player">
          <FullscreenPlayerWrapper
            movie = {movies[0]}
            src = {movies[0].src}
            posterSrc = {movies[0].pictureSrc}
            isPlaying = {true}
            onExitClick = {() => {}}
            videoClassName = {`player__video`}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  activeMovie: state.activeMovie,
  playingMovie: state.playingMovie,
});

const mapDispatchToProps = (dispatch) => ({
  selectMovie: (movie) => {
    dispatch(ActionCreator.selectMovie(movie));
  },
  playMovie: (movie) => {
    dispatch(ActionCreator.playMovie(movie));
  },
});

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired,
      })
  ).isRequired,
  activeMovie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
  }),
  selectMovie: PropTypes.func.isRequired,
  playingMovie: PropTypes.shape({
    src: PropTypes.string.isRequired,
    pictureSrc: PropTypes.string.isRequired,
  }),
  playMovie: PropTypes.func.isRequired,
};
