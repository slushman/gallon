import * as reduxConsts from '../constants/redux';

export const expandFabs = fabsExpanded => ({
  fabsExpanded,
  type: reduxConsts.FABS_EXPANDED,
});

export const setHandPreference = handPreference => ({
  handPreference,
  type: reduxConsts.HAND_PREFERENCE,
});

export const toggleSettingsModal = settingsModal => ({
  settingsModal,
  type: reduxConsts.SETTINGS_MODAL,
});
