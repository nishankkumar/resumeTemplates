/**
 *
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import picturefill from 'picturefill';
import UniversalRouter from 'universal-router';
import qs from 'qs';
import Promise from 'bluebird';
import history from './core/history';
import App from './components/App';
import configureStore from './store/configureStore';
import { getCurrentUser, getCsrfToken } from './actions/session';
import { showModal } from './actions/modal';
import { LOGIN_MODAL } from './constants/modal';


// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  // Initialize a new Redux store
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: configureStore(window.APP_STATE, { history }),
  siteName: 'resumeTemplates',
  isMarcom: false,
};

function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}
function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}
function updateCustomMeta(property, content) { // eslint-disable-line no-unused-vars
  updateTag('meta', 'property', property, 'content', content);
}
function updateLink(rel, href) { // eslint-disable-line no-unused-vars
  updateTag('link', 'rel', rel, 'href', href);
}

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title;

    updateMeta('description', route.description);
    // Update necessary tags in <head> at runtime here, ie:
    // updateMeta('keywords', route.keywords);
    // updateCustomMeta('og:url', route.canonicalUrl);
    // updateCustomMeta('og:image', route.imageUrl);
    // updateLink('canonical', route.canonicalUrl);
    // etc.

    const metaTags = Object.keys(route.meta);

    if (metaTags.length) {
      metaTags.forEach((groupKey) => {
        const group = route.meta[groupKey];
        const keysForRendering = Object.keys(group);

        if (keysForRendering.length) {
          keysForRendering.forEach((itemKey) => {
            // to prevent render empty meta tags
            if (group[itemKey]) {
              updateCustomMeta(`${groupKey}:${itemKey}`, group[itemKey]);
            }
          });
        }
      });
    }

    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    // Restore the scroll position if it was saved into the state
    // or scroll to the given #hash anchor
    // or scroll to top of the page
    window.scrollTo(scrollX, scrollY);
  };
};

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);
// @see http://scottjehl.github.io/picturefill/
picturefill({ reevaluate: true });

const container = document.getElementById('app');
let currentLocation = history.location;
let routes = require('./routes').default;

// Re-render the app when window.location changes
async function onLocationChange(location) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (history.action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  try {
    // Initialize user session.
    const { dispatch } = context.store;
    const { init } = context.store.getState().session;
    if (!init) { // Check current session state.
      await Promise.all([
        dispatch(getCsrfToken()),
        dispatch(getCurrentUser()),
      ]);
    }
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: location.pathname,
      query: qs.parse(location.search),
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location)
    );
  } catch (err) {
    if (err.status && err.status === 403) { // Catch access denied exception.
      // history.push('/login'); // Other way is redirect to login page.
      context.store.dispatch(showModal(LOGIN_MODAL));
    } else if (process.env.NODE_ENV !== 'production') {
      throw err;
    }

    // Avoid broken navigation in production mode by a full page reload on error
    console.error(err); // eslint-disable-line no-console
    // window.location.reload();
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require('./routes').default; // eslint-disable-line global-require

    onLocationChange(currentLocation);
  });
}
