import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {getNeedMovies, getAllFilteredMovies} from "../../utils/utils.js";
import {Settings} from "../../const.js";

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
    const {movies} = this.props;
    const {selectedMovie} = this.state;

    if (!selectedMovie) {
      return (
        <Main
          movieCardTitle = {movies[0].title}
          movieCardGenre = {movies[0].genre}
          movieCardYear = {movies[0].year}
          onMovieTitleClick = {this.movieTitleClickHandler}
        />
      );
    } else {
      return (
        <MoviePage
          movie = {selectedMovie}
          onLogoClick = {this.logoClickHandler}
          movies = {getNeedMovies(getAllFilteredMovies(movies, selectedMovie.genre), Settings.maxSimilarMovies)}
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
              movies = {getNeedMovies(getAllFilteredMovies(movies, movies[0].genre), Settings.maxSimilarMovies)}
              onMovieTitleClick = {this.movieTitleClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
});

export {App};
export default connect(
    mapStateToProps
)(App);

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })
  ).isRequired,
};
