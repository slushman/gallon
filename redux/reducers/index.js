import { combineReducers } from 'redux';

import { modals } from './modals';
import { settings } from './settings';

export const rootReducer = combineReducers({
  modals,
  settings,
});
