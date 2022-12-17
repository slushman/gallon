import * as R from 'ramda';
import { Setting } from '../constants/enums';
export const fabsExpandedSelector = R.pathOr(false, ['modals', 'fabsExpanded']);
export const handPreferenceSelector = R.pathOr(Setting.RIGHT, ['settings', 'handPreference']);
export const showGallonsSelector = R.pathOr(false, ['settings', 'showGallons']);
export const showPriceSelector = R.pathOr(false, ['settings', 'showPrice']);
export const vehicleListSelector = R.pathOr([], ['vehicles', 'vehicleList']);
//# sourceMappingURL=selectors.js.map