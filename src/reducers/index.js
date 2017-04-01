import { combineReducers } from 'redux';
import runtime from './runtime';
import bookmark from './bookmark';
import carousel from './carousel';
import modal from './modal';
import session from './session';
import filter from './filter';
import error from './error';
import globalPerspectives from './globalPerspectives';
import geography from './geography';
import connectedTaxonomies from './connectedTaxonomies';
import navigationTaxonomies from './navigationTaxonomies';
import connectedContent from './connectedContent';
import article from './article';

export default combineReducers({
  // System reducers.
  runtime,
  session,
  error,

  // Appliction's' goes below.
  bookmark,
  carousel,
  modal,
  filter,
  globalPerspectives,
  geography,
  connectedTaxonomies,
  navigationTaxonomies,
  connectedContent,
  article,
});
