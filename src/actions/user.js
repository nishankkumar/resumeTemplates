import queryString from 'qs';
import { API_URL_FOR, ROLES_FOR_SUBSCRIBERS, ROLES_FOR_ENTERPRISE } from '../constants/api';
import { APP_URL } from '../config';
import { UPDATE_AVATAR } from '../constants';

/**
 * Method to fetch .
 */
export function changePassword({ uid = '', oldPassword = '', newPassword = '' }) {
  return async (dispatch, _, { fetchData }) => {
    try {
      await fetchData(`${API_URL_FOR.changePassword}/${uid}`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
          current_pass: oldPassword,
          pass: newPassword,
        }),
      });
      return { success: true };
    } catch (e) {
      if (e.status === 406) {
        return { success: false, error: 'Your current password is incorrect' };
      }
      return { success: false, error: 'Something went wrong' };
    }
  };
}

// Function to update user pictue in store
function updateUserPicture(url) {
  return {
    type: UPDATE_AVATAR,
    payload: {
      url: url || null,
    },
  };
}

// function to make upload avatar call
// userId: ID of current user
// file: Image bas64
export function uploadAvatar(userId, file) {
  return async (dispatch, _, { fetchData }) => {
    const requestData = JSON.stringify({
      file: {
        filename: `user_${userId}_avatar.png`,
        file: file.replace('data:image/png;base64,', ''),
      },
    });
    try {
      const data = await fetchData(`${API_URL_FOR.uploadProfilePicture}`, {
        credentials: 'include',
        method: 'POST',
        body: requestData,
      });
      dispatch(updateUserPicture(data.user_picture));
      return { success: true, avatar: data.user_picture };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };
}

// function to detele avatar from the server
export function deleteAvatar(userId) {
  return async (dispatch, _, { fetchData }) => {
    try {
      await fetchData(`${API_URL_FOR.deleteProfilePicture}/${userId}`, {
        credentials: 'include',
        method: 'DELETE',
      });
      dispatch(updateUserPicture(null));
    } catch (error) {
      return false;
    }
    return true;
  };
}

// Action to fetch/retrieve user profile details
export function retrieveUserInformation(uid) {
  return async (dispatch, _, { fetchData }) => {
    const data = fetchData(`${API_URL_FOR.getUserDetails}/${uid}`, {
      credentials: 'include',
      method: 'GET',
    });
    return data;
  };
}

// Action to update user profile
export function updateUserInformation(uid, profileData) {
  return async (dispatch, _, { fetchData }) => {
    try {
      const data = await fetchData(`${API_URL_FOR.getUserDetails}/${uid}`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ profile: profileData }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

export function fetchChildAccountList(status = 1) {
  // Action to fetch all the active users
  return async (dispatch, _, { fetchData }) => {
    const stringQuery = {
      status,
      site: 'worldview',
    };
    try {
      const data = await fetchData(`${API_URL_FOR.team_members}?${queryString.stringify(stringQuery)}`, {
        credentials: 'include',
        method: 'GET',
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

export function removeTeamMemberAccount(user) {
  // Action to remove team member
  return async (dispatch, _, { fetchData }) => {
    try {
      const data = await fetchData(`${API_URL_FOR.team_members}/${user.uid}?site=worldview`, {
        credentials: 'include',
        method: 'DELETE',
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

export function resendInvitation(user) {
  // Action to resend invite to the user
  return async (dispatch, _, { fetchData }) => {
    try {
      const data = await fetchData(`${API_URL_FOR.team_members}/resend_invitation`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          uid: user.uid,
          site: 'worldview',
        }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

export function addNewTeamMember(userDetails) {
  // Action to resend invite to the user
  return async (dispatch, _, { fetchData }) => {
    try {
      const data = await fetchData(`${API_URL_FOR.team_members}`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          site: 'worldview',
          account: userDetails,
          url: `${APP_URL}/password/reset`,
        }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}

export function isUserEnterprise(user) {
  return (user &&
    typeof user.roles === 'object' &&
    Object.keys(user.roles) &&
    Object.keys(user.roles).find(key => ROLES_FOR_ENTERPRISE[key]));
}

export function isUserSubscriber(user) {
  return (user &&
    typeof user.roles === 'object' &&
    Object.keys(user.roles) &&
    Object.keys(user.roles).find(key => ROLES_FOR_SUBSCRIBERS[key]));
}
