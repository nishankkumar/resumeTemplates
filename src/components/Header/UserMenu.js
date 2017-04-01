import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './UserMenu.scss';

function renderUserImg(userPicture) {
  return <img src={userPicture || '/images/user_default_img.jpg'} alt="" />;
}


/**
 * Component function.
 */
function UserMenu() {
  return (
    <div className="headLinkWrap">
      <button className="headLinkBtn fs16">SIGN IN</button>
      <Link to="/subscribe" className="headLinkBtn fs16 active">SUBSCRIBE</Link>
    </div>
  );
}

export default withStyles(s)(UserMenu);
