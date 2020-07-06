import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import {getFilteredMovies, getAllFilteredMovies, getGenresList} from "../../utils/utils.js";
import {Settings} from "../../const.js";
import {ActionCreator} from "../../reducer.js";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shownMoviesCount: Settings.startMoviesCount
    };
    this.showMoreButtonClickHandler = this.showMoreButtonClickHandler.bind(this);
  }

  showMoreButtonClickHandler() {
    this.setState(
        (prevState) => ({shownMoviesCount: prevState.shownMoviesCount + Settings.incrementMovieForButtonClick})
    );
  }

  render() {
    const {
      movieCardTitle,
      movieCardGenre,
      movieCardYear,
      movies,
      activeGenre,
      selectGenre,
      onMovieTitleClick} = this.props;
    const {shownMoviesCount} = this.state;

    return (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movieCardTitle}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movieCardGenre}</span>
                  <span className="movie-card__year">{movieCardYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList
              activeGenre = {activeGenre}
              genres = {getGenresList(movies)}
              onGenreClick = {(selectedGenre) => {
                this.setState(
                    {shownMoviesCount: Settings.startMoviesCount}
                );
                selectGenre(selectedGenre);
              }}
            />

            <MoviesList
              movies = {getFilteredMovies(movies, activeGenre, shownMoviesCount)}
              onMovieTitleClick = {onMovieTitleClick}
            />

            {shownMoviesCount < getAllFilteredMovies(movies, activeGenre).length &&
              <ShowMore
                onButtonClick = {this.showMoreButtonClickHandler}
              />
            }
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  activeGenre: state.activeGenre
});

const mapDispatchToProps = (dispatch) => ({
  selectGenre: (selectedGenre) => {
    dispatch(ActionCreator.selectGenre(selectedGenre));
  }
});

export {Main};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

Main.propTypes = {
  movieCardTitle: PropTypes.string.isRequired,
  movieCardGenre: PropTypes.string.isRequired,
  movieCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        pictureSrc: PropTypes.string.isRequired
      })
  ).isRequired,
  activeGenre: PropTypes.string.isRequired,
  selectGenre: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};
