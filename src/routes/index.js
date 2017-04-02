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
    require('./login').default,

    // WWW Marcom routes moved to another folder. @see routes-marcom folder.

    // place new routes before...
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
