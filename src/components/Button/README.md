# Button component

## Example usage:

```JavaScript
import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NextSectionButton.scss';
import Button from '../../Button';

<Button className={cx('btnStyle', 'tealDefault', s.next_section)}>Text</Button>

 // or if need link functionality
 
<Button to={nextSection.path_alias} className={cx('btnStyle', 'tealDefault', s.next_section)}>
  Text
</Button>
     

```
