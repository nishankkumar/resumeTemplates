import { SET_ERROR } from '../constants';

const initialState = {
  all: null,
  sess: null,
  login: null,
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        [action.payload.type]: action.payload.msg,
      };
    default:
      return initialState;
      // return state;
  }
}
