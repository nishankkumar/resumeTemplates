import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import invariant from 'invariant';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LazyLoadImg.scss';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let lazySizes = null;

if (canUseDOM) {
  /* Note: probably need to use react-asynch-script-loader instead but this code requires
   * handle to the return from library - this code was copied from react-lazysizes and
   * modified to support picture element
   */
  lazySizes = require('lazysizes'); // eslint-disable-line global-require
}

class LazyLoadImg extends React.Component {
  componentWillMount = () => {
    const { iframe, dataSrc } = this.props;
    if (iframe && !dataSrc) {
      invariant(false, 'Prop dataSrc is required on iframe.');
    }
  };

  componentWillUpdate = (nextProps) => {
    let propsChanged = false;
    for (const propName of ['src', 'dataSizes', 'dataSrc', 'dataSrcSet', 'className', 'iframe']) {
      const prop = propName === 'dataSrcSet' ? this.handleSrcSet(this.props[propName]) : this.props[propName];
      const nextProp = propName === 'dataSrcSet' ? this.handleSrcSet(nextProps[propName]) : nextProps[propName];
      if (prop !== nextProp) {
        propsChanged = true;
        break;
      }
    }
    if (propsChanged && lazySizes) {
      const lazyElement = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (lazySizes.hC(lazyElement, 'lazyloaded')) {
        lazySizes.rC(lazyElement, 'lazyloaded');
      }
    }
  };

  componentDidUpdate = () => {
    if (!lazySizes) {
      return;
    }
    const lazyElement = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    if (!lazySizes.hC(lazyElement, 'lazyloaded') && !lazySizes.hC(lazyElement, 'lazyload')) {
      lazySizes.aC(lazyElement, 'lazyload');
    }
  };

  handleSrcSet = (srcSet) => {
    let result = srcSet;
    if (typeof srcSet === 'object') {
      if (!Array.isArray(srcSet)) {
        result = [];
        srcSet.forEach((variant) => {
          if (Object.prototype.hasOwnProperty.call(srcSet, variant)) {
            result.push({
              variant,
              src: srcSet[variant],
            });
          }
        });
      }
      result = result.map(item => (`${item.src} ${item.variant}`)).join(', ');
    }
    return result;
  };

  createPictureMarkup = () => {
    const {
      src,
      dataSizes,
      dataSrc,
      dataSrcSet,
      className,
      alt,
      title,
      pictureSrcSetDesktop,
      pictureSrcSetTablet,
      pictureSrcSetPhone,
      pictureSizesDesktop,
      pictureSizesTablet,
      pictureSizesPhone,
      ...other } = this.props;
    const thisDataSrcSet = this.handleSrcSet(dataSrcSet);
    const classes = cx(['lazyload', className]).trim();
    return { __html:
      `<!--[if IE 9]><video style="display: none;><![endif]-->
        <source
          media="(max-width: 767px)"
          data-srcset="${pictureSrcSetPhone}"
          data-sizes="${pictureSizesPhone}" />
        <source
          media="(max-width: 1023px)"
          data-srcset="${pictureSrcSetTablet}"
          data-sizes="${pictureSizesTablet}" />
        <source
          data-srcset="${pictureSrcSetDesktop}"
          data-sizes="${pictureSizesDesktop}" />
        <!--[if IE 9]></video><![endif]-->
        <img ${other}
          src="${src}"
          data-src="${dataSrc}"
          data-sizes="${dataSizes}"
          data-srcset="${thisDataSrcSet}"
          alt="${alt}"
          title="${title}"
          class="${classes}"
        />`,
    };
  };

  render() {
    const {
      src,
      dataSizes,
      dataSrc,
      dataSrcSet,
      className,
      iframe,
      alt,
      title,
      pictureType,
      ...other } = this.props;
    const thisDataSrcSet = this.handleSrcSet(dataSrcSet);
    const classes = cx(['lazyload', className]).trim();
    if (iframe) {
      return (
        <iframe
          {...other}
          src={dataSrc ? '' : src}
          data-src={dataSrc}
          className={classes}
        />
      );
    }

    if (pictureType) {
      return (
        <picture dangerouslySetInnerHTML={this.createPictureMarkup()} />
      );
    }
    return (
      <img
        {...other}
        alt={alt}
        title={title}
        src={src}
        data-src={dataSrc}
        data-sizes={dataSizes}
        data-srcset={thisDataSrcSet}
        className={classes}
      />
    );
  }
}

LazyLoadImg.defaultProps = {
  src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  dataSizes: 'auto',
  iframe: false,
  pictureType: false,
};

LazyLoadImg.propTypes = {
  src: PropTypes.string,
  dataSizes: PropTypes.string,
  dataSrc: PropTypes.string,
  dataSrcSet: PropTypes.any,
  className: PropTypes.string,
  iframe: PropTypes.bool,
  alt: PropTypes.string,
  title: PropTypes.string,
  pictureType: PropTypes.bool,
  pictureSrcSetDesktop: PropTypes.string,
  pictureSrcSetTablet: PropTypes.string,
  pictureSrcSetPhone: PropTypes.string,
  pictureSizesDesktop: PropTypes.string,
  pictureSizesTablet: PropTypes.string,
  pictureSizesPhone: PropTypes.string,
};

export default withStyles(s)(LazyLoadImg);
