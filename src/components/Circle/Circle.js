import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Circle.scss';

/**
 * TODO: Make it more generic rather than needed body/subbody to it
 *
 * Cricle component makes it easy to add generic circle on the page
 *
 * @param {object}  arguments - Props of options that can be passed
 * @return {object} - JSX Element
 */
function Circle({ body, subBody }) {
  return (
    <div className={cx(s.circle)}>
      <div className={cx(s.circle, s.centerBody)}>
        <div className={s.text}>
          {body}
        </div>
        <div className={s.subText}>
          {subBody}
        </div>
      </div>
    </div>
  );
}

Circle.propTypes = {
  body: PropTypes.string, // First text to appear inside the circle
  subBody: PropTypes.string, // Smaller text to appear inside the circle
};

export default withStyles(s)(Circle);
