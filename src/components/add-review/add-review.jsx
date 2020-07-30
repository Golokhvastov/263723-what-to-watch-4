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
    activeItem,
    onActiveItemChange,
    waitingRequest
  } = props;

  let id;
  let title;
  let posterImage;
  let backgroundImage;
  let backgroundColor;

  if (movie) {
    id = movie.id;
    title = movie.title;
    posterImage = movie.posterImage;
    backgroundImage = movie.backgroundImage;
    backgroundColor = movie.backgroundColor;
  }

  const {
    rating,
    reviewText,
    isRatingChanged,
    isTextCorrect
  } = activeItem;

  const _renderStars = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result[i] = (
        <React.Fragment key={i}>
          <input className="rating__input" id={`star-${i + 1}`} type="radio" name="rating" value={i + 1}
            onChange={(evt) => {
              onActiveItemChange({
                rating: evt.target.value,
                reviewText,
                isRatingChanged: true,
                isTextCorrect
              });
            }}
            checked={String(i + 1) === rating ? true : false}
            disabled={waitingRequest}
          />
          <label className="rating__label" htmlFor={`star-${i + 1}`}>{`Rating ${i + 1}`}</label>
        </React.Fragment>
      );
    }
    return result;
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (isRatingChanged && isTextCorrect) {
      onSubmit({
        rating,
        comment: reviewText,
      }, id);
    }
  };

  const checkText = (text) => {
    if (text.length >= 50 && text.length <= 400) {
      return true;
    }
    return false;
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
                <div className="user-block__avatar">
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
        <form action="#" className="add-review__form" onSubmit={submitHandler}>
          <div className="rating">
            <div className="rating__stars">
              {_renderStars()}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              onChange={(evt) => {
                onActiveItemChange({
                  rating,
                  reviewText: evt.target.value,
                  isRatingChanged,
                  isTextCorrect: checkText(evt.target.value)
                });
              }}
              disabled={waitingRequest}
            ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit"
                disabled={(isRatingChanged && isTextCorrect && !waitingRequest) ? false : true}
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  activeItem: PropTypes.shape({
    rating: PropTypes.string,
    reviewText: PropTypes.string,
    isRatingChanged: PropTypes.bool,
    isTextCorrect: PropTypes.bool,
  }).isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
  waitingRequest: PropTypes.bool.isRequired,
};
