import * as R from 'ramda';

import * as reduxConsts from '../../constants/redux';
import { RIGHT, values } from '../../constants/settings';

const initialState = {
  handPreference: R.indexOf(RIGHT, values),
};

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case reduxConsts.HAND_PREFERENCE:
      return {
        ...state,
        handPreference: action.handPreference,
      };
    default:
      return state;
  }
};
