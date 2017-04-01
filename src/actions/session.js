/**
 * @File Session actions.
 */
import cookie from 'react-cookie';
import { setError } from './error';
import { API_URL_FOR } from '../constants/api';
import { SESS_TOKEN, SESS_USER, SESS_INIT, SESS_USER_EMAIL_SETTINGS,
  CLEAR_BOOKMARKS } from '../constants';
import { APP_URL } from '../config';
import { isUserSubscriber } from './user.js';

/**
 * Method for update CSRF token.
 * @param `force` boolean. Use it to fetch token from API insted of cookie.
 */
export function getCsrfToken(force = false) {
  return async (dispatch, _, { fetch }) => {
    const token = cookie.load('X-CSRF-Token');

    // Just return value from cookie.
    if (!force && token) {
      return token;
    }

    const resp = await fetch(API_URL_FOR.userToken, { credentials: 'include' });
    const data = await resp.json();

    if (!data || !data.token) {
      dispatch(
        setError('Failed to fetch CSRF token.', 'sess')
      );
      return false;
    }

    // Update token cookie.
    if (token !== data.token) {
      cookie.save('X-CSRF-Token', data.token, { path: '/' });
    }

    dispatch({
      type: SESS_TOKEN,
      payload: data.token,
    });

    return data;
  };
}

/**
 * Method to login user based on ip address.
 */
export function ipLogin() {
  return async (dispatch, _, { fetchData }) => {
    let data = {};
    try {
      data = await fetchData(API_URL_FOR.ipLogin, {
        credentials: 'include',
        method: 'POST',
      });
    } catch (e) {
      dispatch(
        setError('Failed to fetch user profile.', 'sess')
      );
      // @Todo adds loging error.
    }

    if (data && data.user) {
      // Update csrf token, because session regenerated on Drupal side.
      dispatch(getCsrfToken(true));
      return data;
    }

    return false;
  };
}

/**
 * Method to fetch current user from api.
 * @param useStore boolean Use this param to avoid save data in redux.
 * @param lastTime boolean Internal variable to avoid reqursion.
 */
export function getCurrentUser(useStore = true, lasttime = false) {
  return async (dispatch, _, { fetchData }) => {
    let data = {};

    try {
      data = await fetchData(API_URL_FOR.userCurrent, {
        credentials: 'include',
        method: 'POST',
      });
    } catch (e) {
      if (e.status && e.status === 401 && !lasttime) {
        await dispatch(getCsrfToken(true));
        return await dispatch(getCurrentUser(useStore, true));
      }
      // @Todo adds loging error.
    }

    if (!data || !data.user) {
      dispatch(
        setError('Failed to fetch user profile.', 'sess')
      );
      return false;
    }

    if (data.user.uid === 0) {
      const userByIp = await dispatch(ipLogin());
      if (userByIp) {
        data = userByIp;
      }
    }

    if (useStore) { // Set this variable to `false` if you using it on server side.
      // We don't need all field from api in redux storrage.
      const { uid, name, mail, user_picture, user_ref, roles, forumKey,
        field_display_name, field_first_name, field_last_name } = data.user;
      if (uid !== 0) {
        dispatch({
          type: SESS_USER,
          payload: {
            uid,
            name,
            mail,
            user_picture,
            user_ref,
            roles,
            forumKey,
            field_display_name,
            field_first_name,
            field_last_name,
          },
        });
      }

      dispatch({
        type: SESS_INIT,
        payload: true,
      });

      // Adding method to get user's email settings after getting user object
      if (data.user && uid !== 0 && isUserSubscriber(data.user)) {
        const emailSettings = await fetchData(API_URL_FOR.loadEmailSettings, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({ uid }),
        });
        dispatch({
          type: SESS_USER_EMAIL_SETTINGS,
          payload: emailSettings,
        });
      }
    }

    // Return full api response.
    return data;
  };
}

// call this anytime user changes settings in order to update redux storage state
export function setSessionEmailSettings(emailSettings) {
  return async (dispatch) => {
    dispatch({
      type: SESS_USER_EMAIL_SETTINGS,
      payload: emailSettings,
    });
  };
}

/**
 * Method to login user ussing api.
 */
export function signIn(username, password) {
  return async (dispatch, _, { fetchData }) => {
    try {
      const data = await fetchData(API_URL_FOR.userLogin, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      // We don't need all field from api.
      const { uid, name, mail, user_picture, user_ref, roles } = data.user;
      if (uid !== 0) {
        await dispatch(getCsrfToken(true));
        dispatch({
          type: SESS_USER,
          payload: { uid, name, mail, user_picture, user_ref, roles },
        });
      }
      return data;
    } catch (e) {
      dispatch(
        setError(e.message, 'login')
      );
      return false;
    }
  };
}

/**
 * Method to logout user ussing api.
 */
export function signOut() {
  return async (dispatch, _, { fetchData }) => {
    const data = await fetchData(API_URL_FOR.userLogout, {
      credentials: 'include',
      method: 'POST',
    });

    dispatch({
      type: SESS_USER,
      payload: null,
    });
    dispatch({
      type: CLEAR_BOOKMARKS,
    });

    return data;
  };
}

/**
 * Method to make forgot password request
 * PARAMS:
  *email:  email of the user who is making forgot parrword request
 */
export function forgotPassword(email) {
  return async (dispatch, _, { fetch }) => {
    const resp = await fetch(API_URL_FOR.forgotPassword, {
      method: 'POST',
      body: JSON.stringify({
        name: email,
        url: `${APP_URL}/password/reset`,
        site: 'resumeTemplates',
      }),
    });

    if (resp.status === 200) {
      return { success: true };
    }
    const data = await resp.json();
    return { success: false, error: data.message };
  };
}

/**
 * Method to reset user password
 * PARAMS:
  *uid:  User Id received from url.
  *timestamp:  timestamp received from url.
  *hashPass:  hash pass received from url.
  *pass:  New password.
 */
export function resetPassword({ uid, timestamp, hashPass, pass }) {
  return async (dispatch, _, { fetch }) => {
    const resp = await fetch(API_URL_FOR.resetPassword, {
      method: 'POST',
      body: JSON.stringify({
        uid,
        timestamp,
        pass,
        hashed_pass: hashPass,
        site: 'resumeTemplates',
      }),
    });

    const data = await resp.json();

    if (resp.status === 200) {
      return { success: true, data };
    }
    return { success: false, error: data.message };
  };
}


/**
 * Method to register user
 * PARAMS:
  *email:  user email address.
  *firstName:  user first name.
  *lastName:  user last name.
 */
export function registerUser({ email, firstName, lastName }) {
  return async (dispatch, _, { fetchData }) => {
    const data = await fetchData(API_URL_FOR.register, {
      method: 'POST',
      body: JSON.stringify({
        account: {
          email,
          first_name: firstName,
          last_name: lastName,
        },
        url: `${APP_URL}/password/reset`,
      }),
    });

    // Can't use try catch here. API returns error message with status 200
    if (!data || !data.uid) {
      dispatch(
        setError('Failed to fetch user profile.', 'sess')
      );
      return { success: false, error: data.message };
    }
    return { success: true, result: data };
  };
}
