/**
 *
 */

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./latest').default,
    require('./search').default,
    require('./forecasts').default,
    require('./assessments').default,
    require('./snapshot').default,
    require('./columns').default,
    require('./media').default,
    require('./situation-reports').default,
    require('./global-perspectives').default,
    require('./people').default,
    require('./partners').default,
    require('./themes').default,
    require('./topics').default,
    require('./series').default,
    require('./regions').default,
    require('./resetPassword').default,
    require('./account').default,
    require('./subscribe').default,
    require('./account/myreports').default,
    require('./privacy-policy').default,
    require('./login').default,
    require('./terms-of-use').default,
    require('../routes-marcom/contact-us').default,
    require('./profile').default,

    // WWW Marcom routes moved to another folder. @see routes-marcom folder.

    // place new routes before...
    require('./article').default,
    require('./notFound').default,
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - Your Own Resume`;
    route.description = route.description || '';
    route.meta = route.meta || {};

    return route;
  },

};
