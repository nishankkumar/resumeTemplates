/**
  * Form to make forgot password request
**/

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './ForgotPasswordForm.scss';
import { forgotPassword } from '../../../actions/session';
import { checkEmail } from '../../../constants';

class ForgotPasswordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestInProgress: false,
      successMessage: null,
      error: null,
      isErrorWrap: false,
    };
  }

  async handelSubmit(e) {
    e.preventDefault();
    if (!this.state.requestInProgress) {
      const email = e.target.username.value;
      const isEmailValid = checkEmail(email);

      // Hide previous error or success message and set requestInProgress to true
      this.setState({
        requestInProgress: true,
        successMessage: null,
        error: null,
        isErrorWrap: false,
      });

      if (!isEmailValid) {  // if email is not valid
        this.setState({
          error: 'Please enter a valid email',
          requestInProgress: false,
          isErrorWrap: true,
        });
        return false;
      }

      const response = await this.props.forgotPassword(email);
      if (response.success) {
        this.setState({
          requestInProgress: false,
          successMessage: 'Password reset email sent. Please check your inbox.',
        });
      } else {
        this.setState({ requestInProgress: false, error: response.error || '', isErrorWrap: true });
      }
    }
    return true;
  }

  renderError() {
    const { error } = this.state;

    if (!error) return false;

    function innerHtml() {
      return { __html: error };
    }

    return (<div className={s.errorMsgWrap} dangerouslySetInnerHTML={innerHtml()} />);
  }

  renderSuccessMsg() {
    if (this.state.successMessage) {
      return (<div className={s.successMessageWrap}><p>{this.state.successMessage}</p></div>);
    }
    return null;
  }

  render() {
    const isErrorWrap = this.state.isErrorWrap;
    return (
      <div className={cx(s.wrap, s[this.props.className])}>
        {this.renderSuccessMsg()}
        <p>
          If you forget your password, please enter the email address associsted with
          your account to resert your password.
        </p>
        <form
          action="/login"
          method="POST"
          onSubmit={(e) => this.handelSubmit(e)}
        >
          <div className={cx(s.formGroup, isErrorWrap ? s.errorWrap : null)}>
            <label className={s.label} htmlFor="usernameOrEmail">
              Email
            </label>
            <input
              className={s.inputTextDefault}
              id="usernameOrEmail"
              type="text"
              name="username"
            />
            <i className={cx(s.iconWrap, isErrorWrap ? 'icon-close' : null)} />
            {this.renderError()}
          </div>
          <div className={cx(s.formGroup, s.bottomButtonWrapper)}>
            <button
              id="submit"
              className="btnStyle transpDefault"
              type="submit"
            >
              Send Reset Email
            </button>
          </div>
          <div className={s.wrapFormLinkSmall}>
            <button
              type="button"
              className={s.smallText}
              disabled={this.state.requestInProgress}
              onClick={(e) => {
                e.preventDefault();
                this.props.showLoginForm();
              }}
            >Back to Sign in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  showLoginForm: PropTypes.func,  // function to triger when link 'Back to Sign in' is clicked
  // Redux actions.
  forgotPassword: PropTypes.func,
  className: PropTypes.string,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { forgotPassword })(withStyles(s)(ForgotPasswordForm));
