import { ReduxKey } from '../constants/enums';
export const expandFabs = fabsExpanded => ({
    fabsExpanded,
    type: ReduxKey.FABS_EXPANDED,
});
export const setHandPreference = handPreference => ({
    handPreference,
    type: ReduxKey.HAND_PREFERENCE,
});
export const setShowGallons = showGallons => ({
    showGallons,
    type: ReduxKey.SHOW_GALLONS,
});
export const setShowPrice = showPrice => ({
    showPrice,
    type: ReduxKey.SHOW_PRICE,
});
export const toggleSettingsModal = settingsModal => ({
    settingsModal,
    type: ReduxKey.SETTINGS_MODAL,
});
//# sourceMappingURL=actions.js.map