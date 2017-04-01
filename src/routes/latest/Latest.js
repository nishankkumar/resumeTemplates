import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import qs from 'qs';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
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
