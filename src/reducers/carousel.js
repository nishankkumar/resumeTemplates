import { SET_SLIDE } from '../constants';

const initialState = {
  slideIndex: 0,
};

const carousel = (state = initialState, action) => {
  switch (action.type) {
    case SET_SLIDE:
      return {
        ...state,
        slideIndex: action.slideIndex,
      };
    default:
      return state;
  }
};

export default carousel;
