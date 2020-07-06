import React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {activeGenre, genres, onGenreClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, i) => {
        return (
          <li
            className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`}
            key={genre + i}>
            <a
              href="#"
              className="catalog__genres-link"
              onClick = {(evt) => {
                evt.preventDefault();
                onGenreClick(genre);
              }}
            >{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default GenresList;

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  onGenreClick: PropTypes.func.isRequired
};
