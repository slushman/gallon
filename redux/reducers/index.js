import { combineReducers } from 'redux';

import { modalReducers } from './modals';

export const rootReducer = combineReducers({
  modalReducers,
});
