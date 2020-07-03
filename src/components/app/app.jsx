import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null
    };
    this.movieTitleClickHandler = this.movieTitleClickHandler.bind(this);
    this._renderApp = this._renderApp.bind(this);
  }

  movieTitleClickHandler(selectedMovie) {
    this.setState({selectedMovie});
  }

  _renderApp() {
    const {movieCardTitle, movieCardGenre, movieCardYear, movies} = this.props;

    if (!this.state.selectedMovie) {
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
        <MoviePage />
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage />
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
