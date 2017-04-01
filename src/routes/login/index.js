/**
 * @File Login route.
 */
import React from 'react';
import Login from './Login';
import { getCurrentUser } from '../../actions/session';

export default {
  path: '/login',
  async action({ query, store }) {
    const data = await store.dispatch(getCurrentUser(false));
    const destination = query.redirect || query['?redirect'] || '/';
    const thisTitle = 'Login';

    if (data.user.uid !== 0 && destination) {
      return {
        redirect: destination,
      };
    }

    return {
      title: thisTitle,
      component: <Login destination={destination} />,
    };
  },
};
