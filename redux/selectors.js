import * as R from 'ramda';

import { RIGHT } from '../constants/settings';

export const fabsExpandedSelector = R.pathOr(false, ['modals', 'fabsExpanded']);

export const handPreferenceSelector = R.pathOr(RIGHT, ['settings', 'handPreference']);

export const showGallonsSelector = R.pathOr(false, ['settings', 'showGallons']);

export const showPriceSelector = R.pathOr(false, ['settings', 'showPrice']);

export const vehicleListSelector = R.pathOr([], ['vehicles', 'vehicleList']);
