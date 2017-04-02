import React from 'react';
// import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Latest.scss';
import Layout from '../../components/Layout';

function Latest() {
  return (
    <Layout>
      <div className={'contentWrap clearfix'}>
        Welcome to the Home Page
      </div>
    </Layout>
  );
}

export default withStyles(s)(Latest);
