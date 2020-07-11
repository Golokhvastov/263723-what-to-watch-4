import React from "react";
import PropTypes from "prop-types";
import {Settings} from "../../const.js";
import {getNeedMovies} from "../../utils/utils.js";
import ShowMore from "../../components/show-more/show-more.jsx";

const withShowMoreButton = (Component) => {
  class WithShowMoreButton extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        shownMoviesCount: Settings.startMoviesCount,
        activeGenre: props.activeGenre,
      };
      this.showMoreButtonClickHandler = this.showMoreButtonClickHandler.bind(this);
    }

    showMoreButtonClickHandler() {
      this.setState(
          (prevState) => ({shownMoviesCount: prevState.shownMoviesCount + Settings.incrementMovieForButtonClick})
      );
    }

    componentDidUpdate() {
      if (this.props.activeGenre !== this.state.activeGenre) {
        this.setState({
          shownMoviesCount: Settings.startMoviesCount,
          activeGenre: this.props.activeGenre
        });
      }
    }

    render() {
      const {movies} = this.props;
      const {shownMoviesCount} = this.state;

      return (
        <>
          <Component
            {...this.props}
            movies = {getNeedMovies(movies, shownMoviesCount)}
          />
          {shownMoviesCount < movies.length &&
            <ShowMore
              onButtonClick = {this.showMoreButtonClickHandler}
            />
          }
        </>
      );
    }
  }

  WithShowMoreButton.propTypes = {
    movies: PropTypes.array.isRequired,
    activeGenre: PropTypes.string.isRequired,
  };

  return WithShowMoreButton;
};

export default withShowMoreButton;
