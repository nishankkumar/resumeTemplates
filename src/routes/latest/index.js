/**
 *
 */

import React from 'react';
import Latest from './Latest';

export default {

  path: '/',

  async action() {
    return {
      title: 'Latest',
      component: <Latest />,
    };
  },

};
