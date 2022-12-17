import { ReduxKey } from '../../constants/enums';
const initialState = {
    fabsExpanded: false,
    settingsModal: false,
};
export const modals = (state = initialState, action) => {
    switch (action.type) {
        case ReduxKey.SETTINGS_MODAL:
            return Object.assign(Object.assign({}, state), { settingsModal: action.settingsModal });
        case ReduxKey.FABS_EXPANDED:
            return Object.assign(Object.assign({}, state), { fabsExpanded: action.fabsExpanded });
        default:
            return state;
    }
};
//# sourceMappingURL=modals.js.map