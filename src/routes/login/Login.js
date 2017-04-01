import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import LoginForm from '../../components/Forms/LoginForm';
import Link from '../../components/Link';
import s from './Login.scss';
import Layout from '../../components/Layout';
import * as actionCreator from '../../actions/modal';

function onSuccess() {
  if (process.env.BROWSER) {
    window.location.reload();
  }
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingLoginForm: true,
    };
  }

  componentWillMount() {
    this.setState({ showingLoginForm: true });
  }

  getFormHeader() {
    if (this.state.showingLoginForm) {
      return 'Your World. <span>In Context</span>';
    }
    return 'Forgot your password?';
  }

  showLoginForm(value = true) {
    this.setState({ showingLoginForm: value });
  }

  render() {
    const formHeader = this.getFormHeader();
    return (
      <Layout>
        <div>
          <div className={cx(s.loginWrap, 'contentWrap', 'clearfix')}>
            <h1 className={s.loginPageHeader} dangerouslySetInnerHTML={{ __html: formHeader }} />
            <div className={s.formWrapper}>
              {this.state.showingLoginForm &&
                <LoginForm
                  className={s.loginForm}
                  showLoginForm={() => this.showLoginForm(false)}
                  onSuccess={onSuccess}
                />
              }
              {!this.state.showingLoginForm &&
                <ForgotPasswordForm
                  showLoginForm={() => this.showLoginForm(true)} className="forgetPassModal"
                />
              }
            </div>
            <div className={s.loginFooterText}>
              <p><i>Don’t have an account? </i></p>
              <span>
                <Link
                  to="/register"
                  alt="Register"
                >Register</Link> or <Link to="/subscribe" alt="Subscribe">Subscribe</Link>
              </span> or call us at 1-512-744-4300 option 2
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Login.propTypes = {
  destination: PropTypes.string,

  // Redux variables.
  error: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      user_picture: PropTypes.string,
    }),
    PropTypes.bool,
  ]),

  // Redux actions.
  signIn: PropTypes.func,
};

// Redux state
const mapStateToProps = (state) => ({
  user: state.session.user,
  error: state.error.login,
});

export default connect(mapStateToProps, actionCreator)(withStyles(s)(Login));
