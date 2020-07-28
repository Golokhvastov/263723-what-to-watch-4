import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullscreenPlayer from "../fullscreen-player/fullscreen-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {Settings} from "../../const.js";
import {ActionCreator as PageActionCreator} from "../../reducer/page/page.js";
import {getMovies, getNumberOfMovies, getFilteredMovies, getWaitingRequest} from "../../reducer/data/selector.js";
import {getActiveMovie, getPlayingMovie} from "../../reducer/page/selector.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import withVideo from "../../hocs/with-video/with-video.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "../../reducer/data/data.js";

import mockMovies from "../../mocks/films.js";

const FullscreenPlayerWrapper = withVideo(FullscreenPlayer);
const SignInWrapper = withActiveItem(SignIn);
const AddReviewWrapper = withActiveItem(AddReview);

const App = (props) => {
  const {
    movies,
    activeMovie,
    selectMovie,
    playingMovie,
    playMovie,
    authorizationStatus,
    login,
    waitingRequest,
    postReview
  } = props;

  const _renderApp = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      if (!activeMovie && !playingMovie && movies.length > 0) {
        return (
          <Main
            mainMovie = {movies[0]}
            onMovieTitleClick = {selectMovie}
            onPlayClick = {playMovie}
            authorizationStatus = {authorizationStatus}
          />
        );
      }

      if (activeMovie && !playingMovie) {
        return (
          <MoviePage
            movie = {activeMovie}
            onLogoClick = {() => selectMovie(null)}
            movies = {getNumberOfMovies(getFilteredMovies(movies, activeMovie.genre), Settings.maxSimilarMovies)}
            onMovieTitleClick = {selectMovie}
            onPlayClick = {playMovie}
            authorizationStatus = {authorizationStatus}
          />
        );
      }

      if (playingMovie) {
        return (
          <FullscreenPlayerWrapper
            movie = {playingMovie}
            src = {playingMovie.src}
            posterSrc = {playingMovie.previewImage}
            isPlaying = {false}
            onExitClick = {() => playMovie(null)}
            videoClassName = {`player__video`}
          />
        );
      }
    } else {
      return (
        <SignInWrapper
          onSubmit = {login}
          onLogoClick = {() => {}}
          startItem = {true}
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
        <Route exact path="/dev">
          <SignInWrapper
            onSubmit = {login}
            onLogoClick = {() => {}}
            startItem = {true}
          />
        </Route>
        <Route exact path="/dev-review">
          <AddReviewWrapper
            movie = {mockMovies[0]}
            onSubmit = {postReview}
            onLogoClick = {() => {}}
            authorizationStatus = {AuthorizationStatus.NO_AUTH}
            startItem = {{
              rating: null,
              reviewText: null,
            }}
            waitingRequest = {waitingRequest}
          />
        </Route>
        <Route exact path="/dev-movie-page">
          <MoviePage
            movie = {mockMovies[0]}
            onLogoClick = {() => {}}
            movies = {getNumberOfMovies(getFilteredMovies(mockMovies, mockMovies[0].genre), Settings.maxSimilarMovies)}
            onMovieTitleClick = {() => {}}
            onPlayClick = {() => {}}
            authorizationStatus = {AuthorizationStatus.NO_AUTH}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  activeMovie: getActiveMovie(state),
  playingMovie: getPlayingMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  waitingRequest: getWaitingRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectMovie: (movie) => {
    dispatch(PageActionCreator.selectMovie(movie));
  },
  playMovie: (movie) => {
    dispatch(PageActionCreator.playMovie(movie));
  },
  login: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  postReview: (newReviewData, filmId) => {
    dispatch(DataActionCreator.startWaitingRequest());
    dispatch(DataOperation.postReview(newReviewData, filmId));
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
        previewImage: PropTypes.string.isRequired,
      })
  ).isRequired,
  activeMovie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
  }),
  selectMovie: PropTypes.func.isRequired,
  playingMovie: PropTypes.shape({
    src: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }),
  playMovie: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  waitingRequest: PropTypes.bool.isRequired,
};
