/**
 *
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.scss';
import Layout from '../../components/Layout';
import Link from '../../components/Link';

function getErrorBgClass(errorStatus) {
  if (errorStatus === 404) {
    return s.error404Wrap;
  } else if (errorStatus === 500) {
    return s.error500Wrap;
  }
  return null;
}

function ErrorPage({ error }) {
  if (process.env.NODE_ENV !== 'production') {
    return (
      <Layout>
        <div className={cx('contentWrap clearfix', s.container)}>
          <div className={cx(s.errorPageWrap, getErrorBgClass(error.status))}>
            { error.status === 404 &&
              <div className="container">
                <p className={s.errorPageTitle}>sorry, this page can&#39;t be found...</p>
                <div className={s.errorBottomSection}>
                  <p className={s.errorMsgWrap}>Page Not Found</p>
                  <Link to="/" className="btnStyle whiteDefault">Return to Homepage</Link>
                </div>
              </div>
            }
            { error.status === 500 &&
              <div className="container">
                <p className={s.errorPageTitle}>sorry, this page can&#39;t be found...</p>
                <div className={s.errorBottomSection}>
                  <p className={s.errorMsgWrap}>Page Not Found</p>
                  <Link to="/" className="btnStyle whiteDefault">Return to Homepage</Link>
                </div>
              </div>
            }
            { error.status !== 404 && error.status !== 500 &&
              <div className="container">
                <p className={s.errorPageTitle}>{error.message}</p>
              </div>
            }
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <h1>Error</h1>
      <p>Sorry, a critical error occurred on this page.</p>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.object.isRequired,
};

export default withStyles(s)(ErrorPage);
