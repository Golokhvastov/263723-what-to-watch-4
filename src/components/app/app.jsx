import React from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullscreenPlayer from "../fullscreen-player/fullscreen-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {AppRoute} from "../../const.js";
import {ActionCreator as PageActionCreator} from "../../reducer/page/page.js";
import {getMovies, getWaitingRequest} from "../../reducer/data/selector.js";
import {getActiveMovie, getPlayingMovie} from "../../reducer/page/selector.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import withVideo from "../../hocs/with-video/with-video.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import history from "../../history.js";

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
      return history.push(AppRoute.FILM);
    }

    if (playingMovie) {
      return history.push(AppRoute.PLAYER);
    }

    return null;
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          {_renderApp()}
        </Route>
        <Route exact path={AppRoute.ADD_REVIEW}>
          <AddReviewWrapper
            movie = {mockMovies[0]}
            onSubmit = {postReview}
            onLogoClick = {() => selectMovie(null)}
            authorizationStatus = {AuthorizationStatus.NO_AUTH}
            startItem = {{
              rating: null,
              reviewText: null,
            }}
            waitingRequest = {waitingRequest}
          />
        </Route>
        <Route exact path={AppRoute.FILM}>
          <MoviePage
            movie = {activeMovie}
            onLogoClick = {() => selectMovie(null)}
            movies = {movies}
            onMovieTitleClick = {selectMovie}
            onPlayClick = {playMovie}
            authorizationStatus = {authorizationStatus}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignInWrapper
            onSubmit = {login}
            onLogoClick = {() => selectMovie(null)}
            startItem = {true}
          />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>

        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <FullscreenPlayerWrapper
            movie = {playingMovie}
            isPlaying = {false}
            onExitClick = {() => playMovie(null)}
            videoClassName = {`player__video`}
          />
        </Route>
      </Switch>
    </Router>
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
