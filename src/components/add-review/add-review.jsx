import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";

const AddReview = (props) => {
  const {
    movie,
    onSubmit,
    onLogoClick,
    onMovieTitleClick,
    authorizationStatus,
    rating,
    isButtonDisabled,
    isFormDisabled,
    onRatingChange,
    onReviewTextChange,
    onAvatarClick
  } = props;

  let title;
  let posterImage;
  let backgroundImage;
  let backgroundColor;

  if (movie) {
    title = movie.title;
    posterImage = movie.posterImage;
    backgroundImage = movie.backgroundImage;
    backgroundColor = movie.backgroundColor;
  }

  const _renderStars = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result[i] = (
        <React.Fragment key={i}>
          <input className="rating__input" id={`star-${i + 1}`} type="radio" name="rating" value={i + 1}
            onChange={(evt) => {
              onRatingChange(evt.target.value);
            }}
            checked={String(i + 1) === rating ? true : false}
            disabled={isFormDisabled}
          />
          <label className="rating__label" htmlFor={`star-${i + 1}`}>{`Rating ${i + 1}`}</label>
        </React.Fragment>
      );
    }
    return result;
  };

  return (
    <section className="movie-card movie-card--full" style={{background: backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link className="logo__link" to={AppRoute.ROOT} onClick={onLogoClick}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link"
                  onClick = {(evt) => {
                    evt.preventDefault();
                    onMovieTitleClick(movie);
                  }}
                >{title}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            {authorizationStatus === AuthorizationStatus.AUTH
              ? (
                <div className="user-block__avatar" onClick={onAvatarClick}>
                  <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              )
              : (
                <Link className="user-block__link" to={AppRoute.LOGIN}>Sign in</Link>
              )
            }
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form"
          onSubmit = {(evt) => {
            evt.preventDefault();
            onSubmit();
          }}
        >
          <div className="rating">
            <div className="rating__stars">
              {_renderStars()}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              onChange={(evt) => {
                onReviewTextChange(evt.target.value);
              }}
              disabled={isFormDisabled}
            ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit"
                disabled={(isButtonDisabled || isFormDisabled) ? true : false}
              >Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

export default AddReview;

AddReview.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  rating: PropTypes.string,
  reviewText: PropTypes.string,
  isButtonDisabled: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onReviewTextChange: PropTypes.func.isRequired,
  onAvatarClick: PropTypes.func.isRequired,
};
