/**
 * @File Component for create link to Marcom article depend on content type.
 */

import { PropTypes } from 'react';
import Link from './Link';
import { CONTENT_TYPES_FOR_API } from '../../constants/api';


class ArticleLink extends Link {
  constructor(props) {
    super(props);
    this.checkContentType = this.checkContentType.bind(this);
    this.linkToMarcom = this.checkContentType();
  }

  checkContentType() {
    const { type } = this.props;
    if (type && type === CONTENT_TYPES_FOR_API.horizons) {
      return true;
    }
    return false;
  }
}

ArticleLink.propTypes = {
  type: PropTypes.string,
};

export default ArticleLink;
