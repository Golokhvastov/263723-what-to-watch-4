import React, {createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getAuthorizationErrorStatus} from "../../reducer/user/selector.js";
import {checkEmail} from "../../utils/utils.js";
import {AppRoute} from "../../const.js";

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(evt) {
    const {
      onSubmit,
      activeItem: isEmailValid,
      onActiveItemChange: onEmailValidChange
    } = this.props;

    evt.preventDefault();

    if (checkEmail(this.loginRef.current.value) === true) {
      onSubmit({
        login: this.loginRef.current.value,
        password: this.passwordRef.current.value,
      });
      if (isEmailValid !== true) {
        onEmailValidChange(true);
      }
    } else {
      onEmailValidChange(false);
    }
  }

  render() {
    const {
      onLogoClick,
      authorizationErrorStatus: errorStatus,
      activeItem: isEmailValid,
    } = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link className="logo__link" to={AppRoute.ROOT}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this.submitHandler}>
            {isEmailValid === false && (
              <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div>)
            }
            {(errorStatus === 400 && isEmailValid === true) && (
              <div className="sign-in__message">
                <p>We can’t recognize this email <br /> and password combination. Please try again.</p>
              </div>)
            }
            <div className="sign-in__fields">
              <div className={`sign-in__field ${isEmailValid ? `` : `sign-in__field--error`}`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                  ref={this.loginRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to={AppRoute.ROOT}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationErrorStatus: getAuthorizationErrorStatus(state),
});

export {SignIn};
export default connect(
    mapStateToProps
)(SignIn);

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  authorizationErrorStatus: PropTypes.number,
  activeItem: PropTypes.bool.isRequired,
  onActiveItemChange: PropTypes.func.isRequired,
};
