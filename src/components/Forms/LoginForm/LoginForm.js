/**
  * Login Form
**/
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import scriptLoader from 'react-async-script-loader';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginForm.scss';
import { signIn } from '../../../actions/session';
import { RECAPTCHA_SITE_KEY } from '../../../config';

const COUNT_ERRORS = 3; // Number submits wothout captcha.

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isButtonDisabled: false,
      showCaptcha: false,
      countSubmit: 0,
      error: null,
    };

    // Bindings
    this.captchaVerify = this.captchaVerify.bind(this);
    this.captchaExpired = this.captchaExpired.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (this.props.error !== error && error) { // Check error response from api.
      this.setState({ error });
    }
  }

  showCaptcha() {
    this.setState({ showCaptcha: true, countSubmit: this.state.countSubmit + 1 });
  }

  increaseCounter() {
    this.setState({ countSubmit: this.state.countSubmit + 1 });
  }

  /**
   * Define captcha callbacks.
   */
  captchaVerify() {
    this.setState({ isButtonDisabled: false, error: null });
  }

  captchaExpired() {
    this.setState({ isButtonDisabled: true });
  }

  async handleLoginSubmit(e) {
    e.preventDefault();
    if (!this.state.isButtonDisabled) {
      const data = await this.props.signIn(e.target.username.value, e.target.password.value);
      if (data && data.user && (typeof this.props.onSuccess === 'function')) {
        this.props.onSuccess();
      }
    }
  }

  loginMethod(e) {
    const { countSubmit } = this.state;

    // +1 need to prohibit 1 extra attempt to login
    if (countSubmit + 1 >= COUNT_ERRORS) {
      this.showCaptcha();
    } else {
      this.increaseCounter();
    }

    if (this.props.handleLoginMethod) {
      this.props.handleLoginMethod(e);
    } else {
      this.handleLoginSubmit(e);
    }
  }

  renderCaptcha() {
    const { showCaptcha } = this.state;

    if (!showCaptcha) return null;

    return (
      <div className={s.formGroup}>
        <Recaptcha
          sitekey={RECAPTCHA_SITE_KEY}
          render="explicit"
          verifyCallback={this.captchaVerify}
          onloadCallback={this.captchaExpired}
          expiredCallback={this.captchaExpired}
        />
      </div>
    );
  }

  renderForm() {
    const { error } = this.state;

    return (<form
      action="/login"
      method="POST"
      onSubmit={(e) => { this.loginMethod(e); }}
    >
      <div className={'error'} dangerouslySetInnerHTML={{ __html: error }} />

      <div className={s.formGroup}>
        <label className={s.label} htmlFor="usernameOrEmail">
          Email
        </label>
        <input
          className={s.inputTextDefault}
          id="usernameOrEmail"
          type="text"
          name="username"
        />
      </div>
      <div className={s.formGroup}>
        <label className={s.label} htmlFor="password">
          Password
        </label>
        <input
          className={s.inputTextDefault}
          id="password"
          type="password"
          name="password"
        />
      </div>

      {this.renderCaptcha()}

      <div className={cx(s.formGroup, s.bottomButtonWrapper)}>
        <button
          id="submit"
          className={s.buttonLogin}
          type="submit"
          disabled={this.state.isButtonDisabled}
        >
          Sign in
        </button>
      </div>
      <div className={s.wrapFormLinkSmall}>
        <button
          type="button"
          className={s.smallText}
          onClick={
            (e) => {
              e.preventDefault();
              this.props.showLoginForm(false);
            }
          }
        >Forgot password?</button>
      </div>
    </form>);
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

LoginForm.propTypes = {
  showLoginForm: PropTypes.func,

  // Redux variable.
  error: PropTypes.string,
  // Redux actions.
  signIn: PropTypes.func,
  handleLoginMethod: PropTypes.func,
  onSuccess: PropTypes.func,
};

const mapStateToProps = (state) => ({
  error: state.error.login,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ signIn }, dispatch)
);

export default scriptLoader('https://www.google.com/recaptcha/api.js')(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(LoginForm))
  );
