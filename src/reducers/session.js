import { SESS_TOKEN, SESS_USER, SESS_INIT, SESS_USER_EMAIL_SETTINGS,
  UPDATE_AVATAR } from '../constants';

const initialState = {
  token: null,
  user: null,
  userEmailSettings: null,
  init: false,
};

function updateAvatar(user, payload) {
  return { ...user, user_picture: payload.url, error_picture: null };
}


export default function runtime(state = initialState, action) {
  switch (action.type) {
    case SESS_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SESS_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SESS_USER_EMAIL_SETTINGS:
      return {
        ...state,
        userEmailSettings: action.payload,
      };
    case SESS_INIT:
      return {
        ...state,
        init: action.payload,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        user: updateAvatar(state.user, action.payload),
      };
    default:
      return state;
  }
}
