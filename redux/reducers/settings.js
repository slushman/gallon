import { ReduxKey } from '../../constants/enums';
import { Setting } from '../../constants/enums';
const initialState = {
    handPreference: Setting.RIGHT,
    showGallons: false,
    showOdometer: false,
    showPrice: false,
};
export const settings = (state = initialState, action) => {
    switch (action.type) {
        case ReduxKey.HAND_PREFERENCE:
            return Object.assign(Object.assign({}, state), { handPreference: action.handPreference });
        case ReduxKey.SHOW_GALLONS:
            return Object.assign(Object.assign({}, state), { showGallons: action.showGallons });
        case ReduxKey.SHOW_ODOMETER:
            return Object.assign(Object.assign({}, state), { showOdometer: action.showOdometer });
        case ReduxKey.SHOW_PRICE:
            return Object.assign(Object.assign({}, state), { showPrice: action.showPrice });
        default:
            return state;
    }
};
//# sourceMappingURL=settings.js.map