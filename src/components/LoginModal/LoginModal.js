/**
  * Modal to render login and forgot password form.
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LOGIN_MODAL } from '../../constants/modal';
import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
import LoginForm from '../Forms/LoginForm';
import Modal from '../Modal';
import * as actionCreator from '../../actions/modal';


// Component for modal Login Form
class LoginModal extends Component {
  componentWillMount() {
    this.setState({ showingLoginForm: true });
  }

  onSuccess() {
    this.props.hideModal(LOGIN_MODAL);
  }

  getFormHeader() {
    if (this.state.showingLoginForm) {
      return 'Your World. <span>In Context</span>';
    }
    return 'Forget your password?';
  }

  showLoginForm(value = true) {
    this.setState({ showingLoginForm: value });
  }

  render() {
    return (
      <Modal
        modalKey={LOGIN_MODAL}
        header={this.getFormHeader()}
        footer="<i>No account? </i> <span><a to='/register' alt='Register'>Register</a> or <a href='/subscribe' alt='Subscribe'>Subscribe</a></span> or call us at 1-512-744-4300"
      >
        <div>
          {this.state.showingLoginForm &&
            <LoginForm
              className="loginForm"
              showLoginForm={() => this.showLoginForm(false)}
              onSuccess={() => this.onSuccess()}
            />
          }
          {!this.state.showingLoginForm &&
            <ForgotPasswordForm
              showLoginForm={() => this.showLoginForm(true)} className="forgetPassModal"
            />
          }
        </div>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  // Redux variable.
  error: PropTypes.string,
  // Redux actions.
  signIn: PropTypes.func,
  hideModal: PropTypes.func,
};

// Redux state
const mapStateToProps = (state, props) => (props);

export default connect(mapStateToProps, actionCreator)(LoginModal);
