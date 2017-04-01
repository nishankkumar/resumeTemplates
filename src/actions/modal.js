/**
 * @File Actions for Modal component.
 */
import { SHOW_MODAL, HIDE_MODAL } from '../constants';

export function showModal(key) {
  return {
    type: SHOW_MODAL,
    payload: { key, state: true },
  };
}

export function hideModal(key) {
  return {
    type: HIDE_MODAL,
    payload: { key, state: false },
  };
}
