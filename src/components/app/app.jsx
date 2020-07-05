import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {getSimilarMovies} from "../../utils/utils.js";

const Settings = {
  maxSimilarMovies: 4,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null
    };
    this.movieTitleClickHandler = this.movieTitleClickHandler.bind(this);
    this.logoClickHandler = this.logoClickHandler.bind(this);
    this._renderApp = this._renderApp.bind(this);
  }

  movieTitleClickHandler(selectedMovie) {
    this.setState({selectedMovie});
  }

  logoClickHandler() {
    this.setState({selectedMovie: null});
  }

  _renderApp() {
    const {movieCardTitle, movieCardGenre, movieCardYear, movies} = this.props;
    const {selectedMovie} = this.state;

    if (!selectedMovie) {
      return (
        <Main
          movieCardTitle = {movieCardTitle}
          movieCardGenre = {movieCardGenre}
          movieCardYear = {movieCardYear}
          movies = {movies}
          onMovieTitleClick = {this.movieTitleClickHandler}
        />
      );
    } else {
      return (
        <MoviePage
          movie = {selectedMovie}
          onLogoClick = {this.logoClickHandler}
          movies = {getSimilarMovies(movies, selectedMovie, Settings.maxSimilarMovies)}
          onMovieTitleClick = {this.movieTitleClickHandler}
        />
      );
    }
  }

  render() {
    const {movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage
              movie = {movies[0]}
              onLogoClick = {this.logoClickHandler}
              movies = {getSimilarMovies(movies, movies[0], Settings.maxSimilarMovies)}
              onMovieTitleClick = {this.movieTitleClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

App.propTypes = {
  movieCardTitle: PropTypes.string.isRequired,
  movieCardGenre: PropTypes.string.isRequired,
  movieCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired
      })
  ).isRequired,
};
