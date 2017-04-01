/**
 *
 */

import React, { Component, PropTypes } from 'react';
import history from '../../core/history';
import { APP_URL, MARCOM_APP_URL } from '../../config';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {
  constructor(props) {
    super(props);

    this.linkToMarcom = props.linkIsMarcom;
    this.handleClick = this.handleClick.bind(this);
  }

  // created this function because someone set to value in constructor :(
  // which means it can't ever be changed when props change for Link
  getToValue() {
    const to = this.props.to;
    if (to && to.length > 0) {
      return to.charAt(0) === '/' ? to : `/${to}`;
    }
    return '';
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.getToValue());
  }

  render() {
    const { children, className } = this.props;
    const { isMarcom } = this.context;
    let hrefValue = this.getToValue();
    if (!isMarcom && this.linkToMarcom) {
      // if on resumeTemplates and linking to marcom prepend fq domain
      hrefValue = `${MARCOM_APP_URL}${hrefValue}`;
      return <a href={hrefValue} className={className}>{children}</a>;
    } else if (isMarcom && !this.linkToMarcom) {
      // if on resumeTemplates and linking to marcom prepend fq domain
      hrefValue = `${APP_URL}${hrefValue}`;
      return <a href={hrefValue} className={className}>{children}</a>;
    }
    return <a href={hrefValue} className={className} onClick={this.handleClick}>{children}</a>;
  }

}

Link.defaultProps = {
  linkIsMarcom: false,
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
  linkIsMarcom: PropTypes.bool,
  className: PropTypes.string,
};

Link.contextTypes = { isMarcom: PropTypes.bool.isRequired };

export default Link;
