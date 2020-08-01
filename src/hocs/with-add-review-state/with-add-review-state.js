import React from "react";
import PropTypes from "prop-types";
import {checkText} from "../../utils/utils.js";

const withAddReviewState = (Component) => {
  class WithAddReviewState extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: null,
        reviewText: ``,
        isButtonDisabled: true,
        isFormDisabled: false,
        isServerError: false,
      };
      this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
      this.reviewTextChangeHandler = this.reviewTextChangeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
    }

    ratingChangeHandler(newRating) {
      this.setState({rating: newRating});
    }

    reviewTextChangeHandler(newReviewText) {
      this.setState({reviewText: newReviewText});
    }

    submitHandler() {
      const {
        movie,
        onSubmit,
        onSuccess
      } = this.props;

      const commentData = {
        filmId: movie.id,
        rating: this.state.rating,
        comment: this.state.reviewText,
      };
      const onError = () => {
        this.setState({isFormDisabled: false});
        this.setState({isServerError: true});
      };

      if (!this.state.isButtonDisabled) {
        onSubmit(commentData, onSuccess, onError);
        this.setState({isFormDisabled: true});
      }
    }

    componentDidUpdate() {
      if (this.state.isButtonDisabled && this.state.rating && checkText(this.state.reviewText)) {
        this.setState({isButtonDisabled: false});
      }
      if (!this.state.isButtonDisabled && (!this.state.rating || !checkText(this.state.reviewText))) {
        this.setState({isButtonDisabled: true});
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          rating = {this.state.rating}
          reviewText = {this.state.reviewText}
          isButtonDisabled = {this.state.isButtonDisabled}
          isFormDisabled = {this.state.isFormDisabled}
          isServerError = {this.state.isServerError}
          onRatingChange = {this.ratingChangeHandler}
          onReviewTextChange = {this.reviewTextChangeHandler}
          onSubmit = {this.submitHandler}
        />
      );
    }
  }

  WithAddReviewState.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  return WithAddReviewState;
};

export default withAddReviewState;
