import * as reduxConsts from '../constants/redux';

export const expandFabs = fabsExpanded => ({
  fabsExpanded,
  type: reduxConsts.FABS_EXPANDED,
});

export const setHandPreference = handPreference => ({
  handPreference,
  type: reduxConsts.HAND_PREFERENCE,
});

export const setShowGallons = showGallons => ({
  showGallons,
  type: reduxConsts.SHOW_GALLONS,
});

export const setShowPrice = showPrice => ({
  showPrice,
  type: reduxConsts.SHOW_PRICE,
});

export const toggleSettingsModal = settingsModal => ({
  settingsModal,
  type: reduxConsts.SETTINGS_MODAL,
});
