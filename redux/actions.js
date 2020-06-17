import * as reduxConsts from '../constants/redux';

export const expandFabs = fabsExpanded => ({
  fabsExpanded,
  type: reduxConsts.FABS_EXPANDED,
});

export const toggleSettingsModal = settingsModal => ({
  settingsModal,
  type: reduxConsts.SETTINGS_MODAL,
});
