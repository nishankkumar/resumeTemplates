/* eslint-disable import/prefer-default-export */

import { SET_ERROR } from '../constants';

export function setError(msg, type = 'all') {
  return {
    type: SET_ERROR,
    payload: {
      type,
      msg,
    },
  };
}
