/**
 *
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import helmet from 'helmet';
import crypto from 'crypto';
import queryString from 'qs';

// import reactCookie from 'react-cookie'; // Uncomment this if you need to set server-side cookie.
import App from './components/App';
import Html from './components/Html';
import ErrorPage from './routes/error/ErrorPage';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { host, port, FORUM_API_CLIENT_ID } from './config';
import { getCurrentUser } from './actions/session';
import { fetchData } from './core/api';
import fetch from './core/fetch';

const app = express();

/**
 * Generate an SSO string signature for passing in the callback for jsConnect for forum
 * @param array oUser The user to sso. (sort the keys alphabetically ascending)
 * @param string sSecret Your secret.
 * @return string
 */
function getSignature(user, secret) {
  const urlEncodedUser = `${queryString.stringify(user)}${secret}`;
  const shasum = crypto.createHash('sha1');
  shasum.update(urlEncodedUser);
  const hex = shasum.digest('hex');
  return `${hex}`;
}

function uploadAvatar(userId, userEmail, file) {
  return async () => {
    /*
    const requestData = JSON.stringify({
      'User.Email': userEmail,
      Picture: {
        filename: `user_${userId}_avatar.png`,
        file: file.replace('data:image/png;base64,', ''),
      },
    });
    */
    try {
      const image = await fetch(file);
      if (image) {
        const data = await fetchData('https://resumeTemplates.vanillacommunity.com/api/v1/users/photo.json?access_token=5c3de1e4de72298b44d4ace8a9ddfd67', {
          'Content-Type': 'multipart/form-data',
          method: 'POST',
          body: {
            'User.Email': userEmail,
            Picture: image.blob(),
          },
        });
        return data;
      }
      return null;
    } catch (e) {
      return null;
    }
  };
}

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let store = {};

app.use((req, res, next) => {
  try {
    // reactCookie.plugToRequest(req, res); // Uncomment this if you need to set server-side cookie.
    store = configureStore({},
      {
        cookie: req.headers.cookie,
      }
    );
    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));
    next();
  } catch (err) {
    next(err);
  }
});


/**
 * @todo Need description.
 */
app.get('/authenticate', async (req, res) => {
  // Get current user.
  const data = await store.dispatch(getCurrentUser(false));
  const { user } = data;

  if (user) {
    const oUser = {
      email: user.mail,
      name: user.field_display_name
        && user.field_display_name.und
        && user.field_display_name.und[0]
        && user.field_display_name.und[0].safe_value
        ? user.field_display_name.und[0].safe_value
        : user.name,
      photourl: '',
      /* photourl: (user.user_picture && user.user_picture !== 0) ? user.user_picture : '', */
      uniqueid: user.uid,
    };

    const signature = getSignature(oUser, 'bec099cd5a48adbfa5c5f5f75ce0e0bb'); // secret

    oUser.client_id = FORUM_API_CLIENT_ID;
    oUser.signature = signature;

    // Lets update the avatar now if it is defined since SSO won't take base64 image
    if (user.user_picture && user.user_picture !== 0) {
      uploadAvatar(user.uid, user.mail, user.user_picture);
    }

    res.jsonp(oUser);
  } else {
    res.jsonp({ name: '', photourl: '' });
  }

  /* Error MSG - TODO check client ID and check timestamp signature on request
  res.jsonp({
    error: 'invalid_client', // REQUIRED. A string identifier for the error.
    message: 'Client ID does not match.', // REQUIRED. A user-readable error message.
  });
  */
});

/**
 * @todo Need description.
 */
app.get('/avatar', async (req, res) => {
  // Get current user.
  const data = await store.dispatch(getCurrentUser(false));
  const { user } = data;

  if (user) {
    let uploadResult = {};

    // Lets update the avatar now if it is defined since SSO won't take base64 image
    if (user.user_picture && user.user_picture !== 0) {
      uploadResult = uploadAvatar(user.uid, user.mail, user.user_picture);
    }
    res.jsonp({ result: uploadResult });
  } else {
    res.jsonp({ result: 'no user error' });
  }
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
      siteName: 'resumeTemplates',
      isMarcom: false,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.style = [...css].join('');
    data.script = assets.worldview.js;
    data.css = assets.worldview.css;
    data.state = context.store.getState();
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const css = new Set();
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
  const context = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    },
    // Initialize a new Redux store
    // http://redux.js.org/docs/basics/UsageWithReact.html
    store,
    siteName: 'worldview',
    isMarcom: false,
  };
  const data = {};
  data.children = ReactDOM.renderToString(
    <App context={context}><ErrorPage error={err} /></App>
  );
  data.style = [...css].join('');
  data.script = assets.worldview.js;
  data.css = assets.worldview.css;
  data.state = context.store.getState();
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      {...data}
    />
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */

app.listen(port, host, () => {
  console.log(`The server is running at http://${host}:${port}/`);
});
/* eslint-enable no-console */
