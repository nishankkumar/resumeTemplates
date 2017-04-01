/* eslint-disable import/prefer-default-export */
import { SET_SLIDE } from '../constants';

export function setSliderIndex(index) {
  return {
    type: SET_SLIDE,
    slideIndex: index,
  };
}
