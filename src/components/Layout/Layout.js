/**
 *
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '../Header';
import Footer from '../Footer';
import '../../theme/main.scss';
import s from './Layout.scss';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {React.Children.only(children)}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
