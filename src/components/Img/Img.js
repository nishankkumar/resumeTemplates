/**
 * @file Component to render image from api object.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import LazyLoadImg from '../../components/LazyLoadImg';
import Noscript from '../Noscript';

import { API_IMG_ROOT } from '../../constants/api';
import { API_URL, APP_URL } from '../../config';

/**
 * "promo_image": {
 *  "alt": "",
 *  "title": "",
 *  "caption": "",
 *  "sizes": {
 *    "16x9": {
 *      "tiny": "16x9_tiny/public/968361.jpg?itok=lyCYRzV1",
 *      "small": "16x9_small/public/968361.jpg?itok=W9DfqmrY",
 *      "medium": "16x9_medium/public/968361.jpg?itok=RQrzsDdv",
 *      "large": "16x9_large/public/968361.jpg?itok=YK3YR_KW",
 *      "full": "16x9_full/public/968361.jpg?itok=CE-cSnjJ"
 *    },
 *    "square": {
 *      "tiny": "square_tiny/public/968361.jpg?itok=iDLgKUlW",
 *      "small": "square_small/public/968361.jpg?itok=u_KZ7YpB",
 *      "medium": "square_medium/public/968361.jpg?itok=FLuX-CnM",
 *      "large": "square_large/public/968361.jpg?itok=4Q6avL-F",
 *      "full": "square_full/public/968361.jpg?itok=3EJbt6Ls"
 *    },
 *    "article": {
 *      "tiny": "article_tiny/public/968361.jpg?itok=ejCX-WMv",
 *      "small": "article_small/public/968361.jpg?itok=FpZkEMkz",
 *      "medium": "article_medium/public/968361.jpg?itok=GKU8zK7a",
 *      "large": "article_large/public/968361.jpg?itok=QN3-mtAB",
 *      "full": "article_full/public/968361.jpg?itok=n5I6eYUZ"
 *    }
 *  }
 * },
 */

/**
 * Img component.
 * NOTE:
 * imgStyle: optional values are:
 *   'full' : if using image in full browser width
 *   '1-column' : if using image in 1 column width place (based on desktop layout)
 *   '2-column' : if using image in 2 column width place (based on desktop layout)
 *   '3-column' : if using image in 3 column width place (based on desktop layout)
 *   '4-column' : if using image in 4 column width place (based on desktop layout)
 *   'splitHeader' : if using image in the splitHeader area
 *   'fullHeader' : if using image in fullImage header area
 * imgObj: required prop with a full promo image object from API response.  It should
 *   include the type ('article', '16x9', 'square') sub-objects and each of those with
 *   string properties to indicate sizes ('full', 'large', 'medium', 'small', 'tiny')
 *   'full' image path is required - all others are optional however if excluded will just
 *   use full image everywhere.
 * type: property to indicate which type of image you want to use valid values are:
 *   'article' : used on header of article pages and landing pages
 *   '16x9' : used in content cards which are not full image backgrounds (ie: split cards)
 *   'square' : used in content cards which are full image backgrounds
 *  TODO : need to add support to Drupal Admin for generating and providing 5 different
 *    sizes of images uploaded for content blocks of an Article page with standard widths.
 * imgObj.alt: This should have the alt text for the image tag - it should be helpful and well-
 *    formed with thought put toward keyword targeting for SEO
 * imgObj.title: This is the hover title text used for the image
 * size: is no longer needed.
 */

class Img extends Component {
  constructor(props) {
    super(props);
    this.state = this.updateStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      this.setState(this.updateStateFromProps(nextProps));
    }
  }

  getSrcSet(thisType, thisImgObj) {
    const type = thisType || this.props.type;
    const imgObj = thisImgObj || this.props.imgObj;

    const full = imgObj.sizes[type].full;
    const fullImg = full && (full.indexOf('https:/') >= 0 || full.indexOf('http:/') >= 0)
      ? full
      : `${API_IMG_ROOT}/${full}`;
    const large = imgObj.sizes[type].large || full;
    const largeImg = large && (large.indexOf('https:/') >= 0 || large.indexOf('http:/') >= 0)
      ? large
      : `${API_IMG_ROOT}/${large}`;
    const medium = imgObj.sizes[type].medium || full;
    const mediumImg = medium && (medium.indexOf('https:/') >= 0 || medium.indexOf('http:/') >= 0)
      ? medium
      : `${API_IMG_ROOT}/${medium}`;

    const small = imgObj.sizes[type].small || full;
    const smallImg = small && (small.indexOf('https:/') >= 0 || small.indexOf('http:/') >= 0)
      ? small
      : `${API_IMG_ROOT}/${small}`;
    const tiny = imgObj.sizes[type].tiny || full;
    const tinyImg = tiny && (tiny.indexOf('https:/') >= 0 || tiny.indexOf('http:/') >= 0)
      ? tiny
      : `${API_IMG_ROOT}/${tiny}`;

    // article or 16x9 type:
    // full = 1920w
    // large = 1440w
    // medium = 1021w
    // small = 766w
    // tiny = 320w
    // *************
    // square type:
    // full = 1024w
    // large = 810w
    // medium = 576w
    // small = 432w
    // tiny = 180w

    let srcset = `${fullImg} 1920w,
                    ${largeImg} 1440w,
                    ${mediumImg} 1021w,
                    ${smallImg} 766w,
                    ${tinyImg} 320w`;
    if (type === 'square') {
      srcset = `${fullImg} 1024w,
                    ${largeImg} 810w,
                    ${mediumImg} 576w,
                    ${smallImg} 432w,
                    ${tinyImg} 180w`;
    }
    // tiny: 320w, small: 784w, medium: 1024w,  large: 1480w,  Full: original
    if (type === 'inline') {
      srcset = `${fullImg} 1920w,
                    ${largeImg} 1480w,
                    ${mediumImg} 1024w,
                    ${smallImg} 784w,
                    ${tinyImg} 320w`;
    }

    const srcsetObj = {
      srcset,
      fullImg,
      largeImg,
      mediumImg,
      smallImg,
      tinyImg,
    };

    return srcsetObj;
  }

  updateStateFromProps(thisProps) {
    const { imgObj, type, imgStyle, className, containerClass, usePicture } = thisProps;

    let setDefaults = false;
    if (typeof this.props.imgObj !== 'object' || typeof imgObj !== 'object') {
      setDefaults = true;
    }

    const altText = imgObj.alt || '';
    const titleText = imgObj.title || '';
    const styleType = imgStyle || 'full';

    // checks if there is a relative path for img
    if (typeof imgObj === 'object' && imgObj.relPath) {
      return {
        imageSrc: imgObj.relPath,
        imageSrcSet: '',
        sizes: '',
        altText,
        titleText,
        styleType,
        className,
        containerClass,
        usePicture,
      };
    } else if (typeof imgObj === 'object' && typeof imgObj.sizes !== 'undefined') {
      if (typeof imgObj.sizes[type] !== 'undefined') {
        if (typeof imgObj.sizes[type].full === 'undefined') {
          setDefaults = true; // Check full is not defined.
        }
      } else {
        setDefaults = true; // Check type is not object.
      }
    } else {
      setDefaults = true; // Check is not object.
    }
    if (setDefaults) {
      return {
        imageSrc: typeof imgObj === 'string' ? imgObj : '',
        imageSrcSet: '',
        sizes: '',
        altText,
        titleText,
        styleType,
        className,
        containerClass,
        usePicture,
      };
    }
    // Load the srcset
    const srcsetObj = this.getSrcSet(type, imgObj);
    const srcset = srcsetObj.srcset;

    // setup default as 'full' width
    let sizes = `(min-width: 1024px) 100vw,
                  (min-width: 768px) 100vw,
                  100vw`;

    let defaultImageSrc = srcsetObj.fullImg;
    let thisUsePicture = usePicture;
    let pictureSrcSetDesktop = '';
    let pictureSrcSetTablet = '';
    let pictureSrcSetPhone = '';
    let pictureSizesDesktop = '';
    let pictureSizesTablet = '';
    let pictureSizesPhone = '';

    switch (imgStyle) {
      case '1-column' :
        defaultImageSrc = srcsetObj.tinyImg;
        sizes = `(min-width: 1024px) 22.5vw,
        (min-width: 768px) 29vw,
        90vw`;
        break;
      case '2-column' :
        defaultImageSrc = srcsetObj.smallImg;
        sizes = `(min-width: 1024px) 42vw,
        (min-width: 768px) 60vw,
        90vw`;
        break;
      case '3-column' :
        defaultImageSrc = srcsetObj.mediumImg;
        sizes = `(min-width: 1024px) 63.5vw,
        (min-width: 768px) 90vw,
        90vw`;
        break;
      case '4-column' :
        defaultImageSrc = srcsetObj.largeImg;
        sizes = `(min-width: 1024px) 90vw,
        (min-width: 768px) 90vw,
        90vw`;
        break;
      case 'splitHeader' :
        defaultImageSrc = srcsetObj.largeImg;
        sizes = `(min-width: 1024px) 90vw,
          (min-width: 768px) 90vw,
          90vw`;
        thisUsePicture = true;
        pictureSrcSetDesktop = this.getSrcSet('2x1', imgObj).srcset;
        pictureSrcSetTablet = this.getSrcSet('16x9', imgObj).srcset;
        pictureSrcSetPhone = this.getSrcSet('square', imgObj).srcset;
        pictureSizesDesktop = '60vw';
        pictureSizesTablet = '55vw';
        pictureSizesPhone = '100vw';
        break;
      case 'fullHeader' :
        defaultImageSrc = srcsetObj.largeImg;
        sizes = `(min-width: 1024px) 90vw,
        (min-width: 768px) 90vw,
        90vw`;
        thisUsePicture = true;
        pictureSrcSetDesktop = this.getSrcSet('article', imgObj).srcset;
        pictureSrcSetTablet = this.getSrcSet('2x1', imgObj).srcset;
        pictureSrcSetPhone = this.getSrcSet('square', imgObj).srcset;
        pictureSizesDesktop = '100vw';
        pictureSizesTablet = '100vw';
        pictureSizesPhone = '100vw';
        break;
      default : break;
    }

    return {
      imageSrc: defaultImageSrc,
      imageSrcSet: srcset,
      imageSrcForNoScript: srcsetObj.tinyImg,
      sizes,
      altText,
      titleText,
      styleType,
      className,
      containerClass,
      usePicture: thisUsePicture,
      pictureSrcSetDesktop,
      pictureSrcSetTablet,
      pictureSrcSetPhone,
      pictureSizesDesktop,
      pictureSizesTablet,
      pictureSizesPhone,
    };
  }

  render() {
    const imageSrc = this.state.imageSrc;
    const imageSrcSet = this.state.imageSrcSet;
    const sizes = this.state.sizes;
    const altText = this.state.altText;
    const titleText = this.state.titleText;
    const className = this.state.className;
    const containerClass = this.state.containerClass;
    const { usePicture,
      pictureSrcSetDesktop,
      pictureSrcSetTablet,
      pictureSrcSetPhone,
      pictureSizesDesktop,
      pictureSizesTablet,
      pictureSizesPhone,
    } = this.state;
    const { imgObj } = this.props;
    let imgRefLS;

    if (imgObj === '' || (imgObj instanceof Array && imgObj.length <= 0)
      || (imageSrc === '')) {
      return null;
    }

    const imgError = (newSrcDNS) => {
      const imgRef = imgRefLS.props;
      if (imgRef.dataSrc && imgRef.dataSrc.indexOf('data:image/gif') >= 0) {
        // do nothing?  This should not happen since this file should always load
      } else if (imgRef.dataSrc && imgRef.dataSrc.indexOf(newSrcDNS) >= 0) {
        // If we failed to load image and it is pointed at the API server then we should
        // load the pixel
        this.setState({
          imageSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          imageSrcSet: ' ',
        });
      } else {
        // otherwise we might be trying to load the image from the front-end webserver
        // like by a relative path....so lets prepend the full domain.
        const newSrc = imgRef.dataSrc ? imgRef.dataSrc.replace(APP_URL, '') : '';
        const newSrcset = imgRef.dataSrcSet ? imgRef.dataSrcSet.replace(APP_URL, newSrcDNS) : ' ';
        this.setState({ /* Update component state. */
          imageSrc: newSrcDNS.concat(newSrc),
          imageSrcSet: newSrcset,
        });
      }
    };

    return (
      <div className={cx(containerClass)}>
        <Noscript>
          <img src={this.state.imageSrcForNoScript} alt={altText} title={titleText} />
        </Noscript>
        {usePicture
          ?
            <LazyLoadImg
              className={cx(className, 'img')}
              dataSrc={imageSrc}
              dataSrcSet={imageSrcSet}
              dataSizes={sizes}
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              alt={altText}
              title={titleText}
              pictureType={usePicture}
              pictureSrcSetDesktop={pictureSrcSetDesktop}
              pictureSrcSetTablet={pictureSrcSetTablet}
              pictureSrcSetPhone={pictureSrcSetPhone}
              pictureSizesDesktop={pictureSizesDesktop}
              pictureSizesTablet={pictureSizesTablet}
              pictureSizesPhone={pictureSizesPhone}
            />
          :
            <LazyLoadImg
              className={cx(className, 'img')}
              dataSrc={imageSrc}
              dataSrcSet={imageSrcSet}
              dataSizes={sizes}
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              alt={altText}
              title={titleText}
              onError={() => { imgError(API_URL); }}
              ref={el => { imgRefLS = el; }}
            />
        }
      </div>
    );
  }
}

// Component props.
Img.propTypes = {
  imgObj: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.shape({
      alt: PropTypes.string,
      title: PropTypes.string,
      caption: PropTypes.string,
      sizes: PropTypes.object,
    }),
  ]).isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  imgStyle: PropTypes.string,
  containerClass: PropTypes.string,
  className: PropTypes.string,
  usePicture: PropTypes.bool,
};

Img.defaultProps = {
  imgObj: {},
  imgStyle: 'full',
  type: '16x9',
  usePicture: false,
};

export default Img;
