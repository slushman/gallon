import * as R from 'ramda';

export const fabsExpandedSelector = R.pathOr(false, ['modals', 'fabsExpanded']);

export const handPreferenceSelector = R.pathOr(1, ['settings', 'handPreference']);
