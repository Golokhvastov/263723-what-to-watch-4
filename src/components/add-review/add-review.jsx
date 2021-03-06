import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      movie,
      onSubmit,
      onLogoClick,
      onMovieTitleClick,
      authorizationStatus,
      userInfo,
      rating,
      isButtonDisabled,
      isFormDisabled,
      isServerError,
      onRatingChange,
      onReviewTextChange,
      onSignInClick,
      onAvatarClick
    } = this.props;

    const {
      title,
      posterImage,
      backgroundImage,
      backgroundColor,
    } = movie;

    const _renderStars = () => {
      let result = [];
      result[0] = (
        <input className="rating__input" id={`star-0`} type="radio" name="rating" value="0"
          checked={rating ? false : true}
          disabled={true}
          key={`rating ` + 0}
        />
      );
      for (let i = 0; i < 5; i++) {
        result[i + 1] = (
          <React.Fragment key={`rating ` + (i + 1)}>
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
              <a href="main.html" className="logo__link"
                onClick = {(evt) => {
                  evt.preventDefault();
                  onLogoClick();
                }}
              >
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
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
                    <a href="login.html" className="user-block__link"
                      onClick = {(evt) => {
                        evt.preventDefault();
                        onAvatarClick();
                      }}
                    >
                      <img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63" />
                    </a>
                  </div>
                )
                : (
                  <a href="sign-in.html" className="user-block__link"
                    onClick = {(evt) => {
                      evt.preventDefault();
                      onSignInClick();
                    }}
                  >Sign in</a>
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

            {isServerError && (
              <div>
                <p style={{color: `#FF0000`}}>The data saving operation failed.</p>
                <p style={{color: `#FF0000`}}>Change the request and try again in a few minutes.</p>
              </div>
            )}
          </form>
        </div>

      </section>
    );
  }
}

export default AddReview;

AddReview.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
  rating: PropTypes.string,
  reviewText: PropTypes.string,
  isButtonDisabled: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  isServerError: PropTypes.bool.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onReviewTextChange: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onAvatarClick: PropTypes.func.isRequired,
};
