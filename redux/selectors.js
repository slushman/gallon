import * as R from 'ramda';

export const fabsExpandedSelector = R.pathOr(false, ['modalReducers', 'fabsExpanded']);
