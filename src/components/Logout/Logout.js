import React, { Component, PropTypes } from 'react';
import Link from '../Link';

class Logout extends Component {

  static propTypes = {
    error: PropTypes.string,
    user: PropTypes.object,
  };

  render() {
    const { user } = this.props;
    if (user !== null) {
      return (
        <Link to="/logout">Sign Out</Link>
      );
    }
    return null;
  }
}

export default Logout;
