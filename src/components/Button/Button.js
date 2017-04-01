import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../Link';
import s from './Button.scss';

const TYPE = {
  primary: s.primary,
  secondary: s.secondary,
};

function Button({ customClass = 'primary', ...props }) {
  const btnType = TYPE[customClass];
  // if defined attribute href need render Link with button style
  if (props.to) {
    return <Link className={btnType} {...props}>{props.children}</Link>;
  }

  return <button className={btnType} type="button" {...props} />;
}

Button.propTypes = {
  to: PropTypes.string, // if need link functionality
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  customClass: PropTypes.string,
};

Button.defaultProps = {
  to: null,
};

export default withStyles(s)(Button);
