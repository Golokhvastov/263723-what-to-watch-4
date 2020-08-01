import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";

class TechInfoPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      authorizationStatus,
      userInfo,
      onLogoClick,
      onSignInClick,
      onAvatarClick
    } = this.props;

    return (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
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

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
              </div>

              {children}
            </div>
          </div>
        </section>

        <div className="page-content">

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <ul className="catalog__genres-list">
              <li className="catalog__genres-item catalog__genres-item--active">
                <a
                  href="#"
                  className="catalog__genres-link"
                >All genres</a>
              </li>
            </ul>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light"
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

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default TechInfoPage;

TechInfoPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  authorizationStatus: PropTypes.string,
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
  onLogoClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  onAvatarClick: PropTypes.func.isRequired
};
