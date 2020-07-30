import React from "react";
import PropTypes from "prop-types";
import {checkEmail} from "../../utils/utils.js";

const withLoginSubmit = (Component) => {
  class WithLoginSubmit extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isEmailValid: true,
        isPasswordValid: true,
      };
      this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(login, password) {
      const {
        onSubmit
      } = this.props;

      const authData = {
        login,
        password,
      };
      const onSuccess = () => {
        this.setState({isPasswordValid: true});
        this.props.onSuccess();
      };
      const onError = () => {
        this.setState({isPasswordValid: false});
      };

      if (checkEmail(login) === true) {
        onSubmit(authData, onSuccess, onError);
        if (this.state.isEmailValid !== true) {
          this.setState({isEmailValid: true});
        }
      } else {
        if (this.state.isEmailValid) {
          this.setState({isEmailValid: false});
        }
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          isEmailValid = {this.state.isEmailValid}
          isPasswordValid = {this.state.isPasswordValid}
          onSubmit = {this.submitHandler}
        />
      );
    }
  }

  WithLoginSubmit.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  return WithLoginSubmit;
};

export default withLoginSubmit;
