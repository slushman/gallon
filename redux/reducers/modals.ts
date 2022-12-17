import { ReduxKey } from '../../constants/enums';
import { modalActionsProps } from '../reduxTypes';

const initialState = {
  fabsExpanded: false,
  settingsModal: false,
};

export const modals = (state = initialState, action: modalActionsProps) => {
  switch (action.type) {
    case ReduxKey.SETTINGS_MODAL:
      return {
        ...state,
        settingsModal: action.settingsModal,
      };
    case ReduxKey.FABS_EXPANDED:
      return {
        ...state,
        fabsExpanded: action.fabsExpanded,
      };
    default:
      return state;
  }
};
