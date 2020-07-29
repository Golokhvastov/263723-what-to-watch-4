import React from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullscreenPlayer from "../fullscreen-player/fullscreen-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {Settings, AppRoute} from "../../const.js";
import {getMovies, getPromoMovie, getFavoriteMovies, getWaitingRequest} from "../../reducer/data/selector.js";
import {getAuthorizationStatus} from "../../reducer/user/selector.js";
import withVideo from "../../hocs/with-video/with-video.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import history from "../../history.js";
import {getNumberOfMovies, getFilteredMovies} from "../../reducer/data/selector.js";

import mockMovies from "../../mocks/films.js";

const FullscreenPlayerWrapper = withVideo(FullscreenPlayer);
const SignInWrapper = withActiveItem(SignIn);
const AddReviewWrapper = withActiveItem(AddReview);

const App = (props) => {
  const {
    movies,
    promoMovie,
    favoriteMovies,
    authorizationStatus,
    login,
    waitingRequest,
    postReview,
    addMovieInFavorite,
    removeMovieFromFavorite
  } = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            promoMovie = {promoMovie}
            authorizationStatus = {authorizationStatus}
            addMovieInFavorite = {addMovieInFavorite}
            removeMovieFromFavorite = {removeMovieFromFavorite}
            onMovieTitleClick = {(movie) =>
              history.push(`${AppRoute.FILM}/${movie.id}`)
            }
            onPlayClick = {(movie) =>
              history.push(`${AppRoute.FILM}/${movie.id}${AppRoute.PLAYER}`)
            }
          />
        </Route>

        <Route
          exact
          path={`${AppRoute.FILM}/:id`}
          render={(routeProps) => {
            const activeMovie = movies.find((movie) => movie.id === Number(routeProps.match.params.id));
            let similarMovies = [];
            if (activeMovie) {
              similarMovies = getNumberOfMovies(getFilteredMovies(movies, activeMovie.genre), Settings.maxSimilarMovies);
            }

            return (
              <MoviePage
                movie = {
                  activeMovie
                }
                similarMovies = {similarMovies}
                authorizationStatus = {authorizationStatus}
                addMovieInFavorite = {addMovieInFavorite}
                removeMovieFromFavorite = {removeMovieFromFavorite}
                onLogoClick = {() =>
                  history.push(AppRoute.ROOT)
                }
                onMovieTitleClick = {(movie) =>
                  history.push(`${AppRoute.FILM}/${movie.id}`)
                }
                onPlayClick = {(movie) =>
                  history.push(`${AppRoute.FILM}/${movie.id}${AppRoute.PLAYER}`)
                }
              />
            );
          }}
        />

        <Route
          exact
          path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`}
          render={() => (
            <AddReviewWrapper
              movie = {mockMovies[0]}
              authorizationStatus = {AuthorizationStatus.NO_AUTH}
              startItem = {{
                rating: null,
                reviewText: null,
              }}
              waitingRequest = {waitingRequest}
              onSubmit = {postReview}
              onLogoClick = {() =>
                history.push(AppRoute.ROOT)
              }
            />
          )}
        />

        <Route
          exact
          path={`${AppRoute.FILM}/:id${AppRoute.PLAYER}`}
          render={(routeProps) => (
            <FullscreenPlayerWrapper
              movie = {
                movies.find((movie) => movie.id === Number(routeProps.match.params.id))
              }
              isPlaying = {false}
              videoClassName = {`player__video`}
              onExitClick = {() =>
                history.goBack()
              }
            />
          )}
        />

        <Route exact path={AppRoute.MY_LIST}>

        </Route>

        <Route exact path={AppRoute.LOGIN}>
          <SignInWrapper
            onSubmit = {login}
            startItem = {true}
            onLogoClick = {() =>
              history.push(AppRoute.ROOT)
            }
          />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
  favoriteMovies: getFavoriteMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  waitingRequest: getWaitingRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  postReview: (newReviewData, filmId) => {
    dispatch(DataActionCreator.startWaitingRequest());
    dispatch(DataOperation.postReview(newReviewData, filmId));
  },
  addMovieInFavorite: (filmId) => {
    dispatch(DataOperation.addMovieToFavoriteMovies(filmId));
  },
  removeMovieFromFavorite: (filmId) => {
    dispatch(DataOperation.removeMovieFromFavoriteMovies(filmId));
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
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
  favoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
      })
  ).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  waitingRequest: PropTypes.bool.isRequired,
  addMovieInFavorite: PropTypes.func.isRequired,
  removeMovieFromFavorite: PropTypes.func.isRequired,
};
