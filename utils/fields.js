import { Appearance } from 'react-native-appearance';
import * as R from 'ramda';

import * as colors from '../constants/colors';
import * as status from '../constants/status';

const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'dark';

const gallonBlue = colors.getBlue(isDarkMode);
const gallonGreen = colors.getGreen(isDarkMode);
const gallonRed = colors.getRed(isDarkMode);
const bgContrast = colors.getBgContrast(isDarkMode);

export const getBorderAndTextColor = (fieldStatus, isFocused) => {
  if (fieldStatus === status.HASERROR) return gallonRed;

  if (isFocused) return gallonBlue;

  if (fieldStatus === status.ISVALID) return gallonGreen;

  return bgContrast;
};

export const getFieldStatus = (error, field, touched) => {
  if (touched && !error && R.has('value', field)) {
    return status.ISVALID;
  }

  if (touched && error) {
    return status.HASERROR;
  }

  if (!touched && !R.propEq('value', '', field)) {
    return status.HASVALUE;
  }

  return null;
};
