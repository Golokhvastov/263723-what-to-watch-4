import React from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullscreenPlayer from "../fullscreen-player/fullscreen-player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import GuestRoute from "../guest-route/guest-route.jsx";
import WaitData from "../wait-data/wait-data.jsx";
import {Settings, AppRoute} from "../../const.js";
import {getServerStatus, getMovies, getPromoMovie, getFavoriteMovies, getReviews} from "../../reducer/data/selector.js";
import {getPreviousPath} from "../../reducer/page/selector.js";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selector.js";
import withVideo from "../../hocs/with-video/with-video.js";
import withLoginSubmit from "../../hocs/with-login-submit/with-login-submit.js";
import withAddReviewState from "../../hocs/with-add-review-state/with-add-review-state.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation, ServerStatus} from "../../reducer/data/data.js";
import {ActionCreator as PageActionCreator} from "../../reducer/page/page.js";
import history from "../../history.js";
import {getSimilarMovies} from "../../reducer/data/selector.js";

const FullscreenPlayerWrapper = withVideo(FullscreenPlayer);
const SignInWrapper = withLoginSubmit(SignIn);
const AddReviewWrapper = withAddReviewState(AddReview);

const App = (props) => {
  const {
    serverStatus,
    movies,
    promoMovie,
    favoriteMovies,
    reviews,
    authorizationStatus,
    userInfo,
    login,
    loadReviewsForId,
    loadFavoriteMovies,
    postReview,
    addMovieInFavorite,
    removeMovieFromFavorite,
    previousPath,
    savePreviousPath
  } = props;

  const historyPushWithSavePath = (newPagePath) => {
    savePreviousPath(history.location.pathname);
    history.push(newPagePath);
  };

  const goTo404 = () => {
    return <Redirect to={AppRoute.ERROR} />;
  };

  return (
    <Router history={history}>
      {serverStatus === ServerStatus.NOT_AVAILABLE && (
        <div>
          <p style={{color: `#FF0000`}}>Unfortunately, the server is temporarily unavailable.</p>
          <p style={{color: `#FF0000`}}>Try again later.</p>
        </div>
      )}

      {movies.length === 0 || !promoMovie
        ? (
          <WaitData
            promoMovie = {promoMovie}
            movies = {movies}
            authorizationStatus = {authorizationStatus}
            userInfo = {userInfo}
            onLogoClick = {() =>
              historyPushWithSavePath(AppRoute.ROOT)
            }
            onSignInClick = {() =>
              historyPushWithSavePath(AppRoute.LOGIN)
            }
            onAvatarClick = {() =>
              historyPushWithSavePath(AppRoute.MY_LIST)
            }
          >
            <div className="movie-card__desc">
              <h2 className="movie-card__title">Ожидаем данные с сервера.</h2>
              <p className="movie-card__meta"></p>
              <p className="movie-card__meta">{`Данные промофильма ${promoMovie ? `получены` : `ожидаются`}.`}</p>
              <p className="movie-card__meta">{`Загруженно фильмов: ${movies.length}`}</p>
              <p className="movie-card__meta"></p>
              <p className="movie-card__meta"></p>
              <p className="movie-card__meta">Вы будете перенаправлены на запрошеную страницу после получения данных.</p>
            </div>
          </WaitData>
        )
        : (
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <Main
                promoMovie = {promoMovie}
                authorizationStatus = {authorizationStatus}
                userInfo = {userInfo}
                addMovieInFavorite = {addMovieInFavorite}
                removeMovieFromFavorite = {removeMovieFromFavorite}
                onMovieTitleClick = {(movie) => {
                  loadReviewsForId(Number(movie.id));
                  historyPushWithSavePath(`${AppRoute.FILM}/${movie.id}`);
                }}
                onPlayClick = {(movie) =>
                  historyPushWithSavePath(`${AppRoute.PLAYER}/${movie.id}`)
                }
                onSignInClick = {() =>
                  historyPushWithSavePath(AppRoute.LOGIN)
                }
                onAvatarClick = {() =>
                  historyPushWithSavePath(AppRoute.MY_LIST)
                }
              />
            </Route>

            <Route
              exact
              path={`${AppRoute.FILM}/:id`}
              render={(routeProps) => {
                const activeMovie = movies.find((movie) => movie.id === Number(routeProps.match.params.id));

                if (activeMovie) {
                  const similarMovies = getSimilarMovies(movies, activeMovie, Settings.MAX_SIMILAR_MOVIES);
                  return (
                    <MoviePage
                      movie = {activeMovie}
                      similarMovies = {similarMovies}
                      reviews = {reviews}
                      authorizationStatus = {authorizationStatus}
                      userInfo = {userInfo}
                      addMovieInFavorite = {addMovieInFavorite}
                      removeMovieFromFavorite = {removeMovieFromFavorite}
                      onLogoClick = {() =>
                        historyPushWithSavePath(AppRoute.ROOT)
                      }
                      onMovieTitleClick = {(movie) => {
                        loadReviewsForId(Number(movie.id));
                        historyPushWithSavePath(`${AppRoute.FILM}/${movie.id}`);
                      }}
                      onPlayClick = {(movie) =>
                        historyPushWithSavePath(`${AppRoute.PLAYER}/${movie.id}`)
                      }
                      onAddReviewButtonClick = {(movie) => {
                        historyPushWithSavePath(`${AppRoute.FILM}/${movie.id}${AppRoute.ADD_REVIEW}`);
                      }}
                      loadReviews = {() =>
                        loadReviewsForId(Number(routeProps.match.params.id))
                      }
                      onSignInClick = {() =>
                        historyPushWithSavePath(AppRoute.LOGIN)
                      }
                      onAvatarClick = {() =>
                        historyPushWithSavePath(AppRoute.MY_LIST)
                      }
                    />
                  );
                } else {
                  return goTo404();
                }
              }}
            />

            <PrivateRoute
              exact
              path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`}
              render={(routeProps) => {
                const activeMovie = movies.find((movie) => movie.id === Number(routeProps.match.params.id));

                if (activeMovie) {
                  return (
                    <AddReviewWrapper
                      movie = {activeMovie}
                      authorizationStatus = {authorizationStatus}
                      userInfo = {userInfo}
                      onSubmit = {postReview}
                      onSuccess = {() => {
                        loadReviewsForId(Number(routeProps.match.params.id));
                        historyPushWithSavePath(`${AppRoute.FILM}/${routeProps.match.params.id}`);
                      }}
                      onLogoClick = {() =>
                        historyPushWithSavePath(AppRoute.ROOT)
                      }
                      onMovieTitleClick = {(movie) => {
                        loadReviewsForId(Number(movie.id));
                        historyPushWithSavePath(`${AppRoute.FILM}/${movie.id}`);
                      }}
                      onSignInClick = {() =>
                        historyPushWithSavePath(AppRoute.LOGIN)
                      }
                      onAvatarClick = {() =>
                        historyPushWithSavePath(AppRoute.MY_LIST)
                      }
                    />
                  );
                } else {
                  return goTo404();
                }
              }}
            />

            <Route
              exact
              path={`${AppRoute.PLAYER}/:id`}
              render={(routeProps) => {
                const activeMovie = movies.find((movie) => movie.id === Number(routeProps.match.params.id));

                if (activeMovie) {
                  return (
                    <FullscreenPlayerWrapper
                      movie = {activeMovie}
                      isPlaying = {true}
                      videoClassName = {`player__video`}
                      onExitClick = {() => {
                        if (previousPath) {
                          historyPushWithSavePath(previousPath);
                        } else {
                          historyPushWithSavePath(`${AppRoute.FILM}/${routeProps.match.params.id}`);
                        }
                      }}
                    />
                  );
                } else {
                  return goTo404();
                }
              }}
            />

            <PrivateRoute
              exact
              path={AppRoute.MY_LIST}
              render={() => (
                <MyList
                  favoriteMovies = {favoriteMovies}
                  userInfo = {userInfo}
                  onLogoClick = {() =>
                    historyPushWithSavePath(AppRoute.ROOT)
                  }
                  onMovieTitleClick = {(movie) => {
                    loadReviewsForId(Number(movie.id));
                    historyPushWithSavePath(`${AppRoute.FILM}/${movie.id}`);
                  }}
                />
              )}
            />

            <GuestRoute
              exact
              path={AppRoute.LOGIN}
              render={() => (
                <SignInWrapper
                  onSubmit = {login}
                  onSuccess = {() => {
                    loadFavoriteMovies();
                    if (previousPath) {
                      historyPushWithSavePath(previousPath);
                    } else {
                      historyPushWithSavePath(AppRoute.ROOT);
                    }
                  }}
                  startItem = {true}
                  onLogoClick = {() =>
                    historyPushWithSavePath(AppRoute.ROOT)
                  }
                />
              )}
            />

            <Route
              render={() => (
                <WaitData
                  promoMovie = {promoMovie}
                  movies = {movies}
                  authorizationStatus = {authorizationStatus}
                  userInfo = {userInfo}
                  onLogoClick = {() =>
                    historyPushWithSavePath(AppRoute.ROOT)
                  }
                  onSignInClick = {() =>
                    historyPushWithSavePath(AppRoute.LOGIN)
                  }
                  onAvatarClick = {() =>
                    historyPushWithSavePath(AppRoute.MY_LIST)
                  }
                >
                  <div className="movie-card__desc">
                    <h2 className="movie-card__title">404.</h2>
                    <p className="movie-card__meta">Page not found</p>
                    <p className="movie-card__meta"></p>
                    <p className="movie-card__meta"></p>
                    <a href="main.html"
                      onClick = {(evt) => {
                        evt.preventDefault();
                        historyPushWithSavePath(AppRoute.ROOT);
                      }}
                    >
                      Go to main page
                    </a>
                  </div>
                </WaitData>
              )}
            />
          </Switch>
        )
      }
    </Router>
  );
};

const mapStateToProps = (state) => ({
  serverStatus: getServerStatus(state),
  movies: getMovies(state),
  promoMovie: getPromoMovie(state),
  favoriteMovies: getFavoriteMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
  reviews: getReviews(state),
  previousPath: getPreviousPath(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (authData, onSuccess, onError) => {
    dispatch(UserOperation.login(authData, onSuccess, onError));
  },
  loadReviewsForId: (filmId) => {
    dispatch(DataOperation.loadReviewsForId(filmId));
  },
  loadFavoriteMovies: () => {
    dispatch(DataOperation.loadFavoriteMovies());
  },
  postReview: (commentData, onSuccess, onError) => {
    dispatch(DataOperation.postReview(commentData, onSuccess, onError));
  },
  addMovieInFavorite: (filmId) => {
    dispatch(DataOperation.addMovieToFavoriteMovies(filmId));
  },
  removeMovieFromFavorite: (filmId) => {
    dispatch(DataOperation.removeMovieFromFavoriteMovies(filmId));
  },
  savePreviousPath: (leavingPath) => {
    dispatch(PageActionCreator.savePreviousPath(leavingPath));
  },
});

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

App.propTypes = {
  serverStatus: PropTypes.string.isRequired,
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
  }),
  favoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
      })
  ).isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
  ),
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
  login: PropTypes.func.isRequired,
  loadReviewsForId: PropTypes.func.isRequired,
  loadFavoriteMovies: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  addMovieInFavorite: PropTypes.func.isRequired,
  removeMovieFromFavorite: PropTypes.func.isRequired,
  previousPath: PropTypes.string,
  savePreviousPath: PropTypes.func.isRequired,
};
