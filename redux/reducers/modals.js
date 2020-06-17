import * as reduxConsts from '../../constants/redux';

const initialState = {
  fabsExpanded: false,
  settingsModal: false,
};

export const modalReducers = (state = initialState, action) => {
  switch (action.type) {
    case reduxConsts.SETTINGS_MODAL:
      return {
        ...state,
        settingsModal: action.settingsModal,
      };
    case reduxConsts.FABS_EXPANDED:
      return {
        ...state,
        fabsExpanded: action.fabsExpanded,
      };
    default:
      return state;
  }
};
