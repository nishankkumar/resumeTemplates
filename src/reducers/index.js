import { combineReducers } from 'redux';
import runtime from './runtime';
import carousel from './carousel';
import modal from './modal';
import session from './session';
import filter from './filter';
import error from './error';

export default combineReducers({
  // System reducers.
  runtime,
  session,
  error,

  // Appliction's' goes below.
  carousel,
  modal,
  filter,
});
