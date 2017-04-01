
import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.scss';

function Loader({ className }) {
  return (
    <div className={cx(s.loader, className)}>
      <svg className={s.circular} viewBox="25 25 50 50">
        <circle
          className={s.path} cx="50" cy="50" r="20"
          fill="none" strokeWidth="2" strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Loader);
