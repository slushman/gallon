import * as R from 'ramda';

import * as reduxConsts from '../../constants/redux';
import { RIGHT } from '../../constants/settings';

const initialState = {
  handPreference: RIGHT,
  showGallons: false,
  showOdometer: false,
  showPrice: false,
};

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case reduxConsts.HAND_PREFERENCE:
      return {
        ...state,
        handPreference: action.handPreference,
      };
    case reduxConsts.SHOW_GALLONS:
      return {
        ...state,
        showGallons: action.showGallons,
      };
    case reduxConsts.SHOW_ODOMETER:
      return {
        ...state,
        showOdometer: action.showOdometer,
      };
    case reduxConsts.SHOW_PRICE:
      return {
        ...state,
        showPrice: action.showPrice,
      };
    default:
      return state;
  }
};
