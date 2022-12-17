import { Appearance } from 'react-native-appearance';
import * as R from 'ramda';
import * as colors from './colors';
import { FieldStatus } from '../constants/enums';
const colorScheme = Appearance.getColorScheme();
const isDarkMode = colorScheme === 'dark';
const gallonBlue = colors.getBlue(isDarkMode);
const gallonGreen = colors.getGreen(isDarkMode);
const gallonRed = colors.getRed(isDarkMode);
const bgContrast = colors.getBgContrast(isDarkMode);
export const getBorderAndTextColor = (fieldStatus, isFocused) => {
    if (fieldStatus === FieldStatus.HASERROR)
        return gallonRed;
    if (isFocused)
        return gallonBlue;
    if (fieldStatus === FieldStatus.ISVALID)
        return gallonGreen;
    return bgContrast;
};
export const getFieldStatus = (error, field, touched) => {
    if (touched && !error && R.has('value', field)) {
        return FieldStatus.ISVALID;
    }
    if (touched && error) {
        return FieldStatus.HASERROR;
    }
    if (!touched && !R.propEq('value', '', field)) {
        return FieldStatus.HASVALUE;
    }
    return null;
};
export const getStatusIcon = (fieldStatus, isFocused) => {
    if (fieldStatus === FieldStatus.HASERROR)
        return 'close';
    if (isFocused)
        return 'arrow-left';
    if (fieldStatus === FieldStatus.ISVALID)
        return 'check';
    return '';
};
//# sourceMappingURL=fields.js.map