import { SHOW_MODAL, HIDE_MODAL } from '../constants';

const initialState = {};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
    case HIDE_MODAL:
      return {
        ...state,
        [action.payload.key]: action.payload.state,
      };
    default:
      return state;
  }
};

export default modal;
