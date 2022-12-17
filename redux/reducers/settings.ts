import { ReduxKey } from '../../constants/enums';
import { Setting } from '../../constants/enums';
import { settingsActionProps } from '../reduxTypes';

const initialState = {
  handPreference: Setting.RIGHT,
  showGallons: false,
  showOdometer: false,
  showPrice: false,
};

export const settings = (state = initialState, action: settingsActionProps) => {
  switch (action.type) {
    case ReduxKey.HAND_PREFERENCE:
      return {
        ...state,
        handPreference: action.handPreference,
      };
    case ReduxKey.SHOW_GALLONS:
      return {
        ...state,
        showGallons: action.showGallons,
      };
    case ReduxKey.SHOW_ODOMETER:
      return {
        ...state,
        showOdometer: action.showOdometer,
      };
    case ReduxKey.SHOW_PRICE:
      return {
        ...state,
        showPrice: action.showPrice,
      };
    default:
      return state;
  }
};
