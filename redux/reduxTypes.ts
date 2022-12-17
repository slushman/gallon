import { Setting } from '../constants/enums';
import { VehicleProps } from '../types';

export interface modalActionsProps {
  type: string,
  payload: string,
  settingsModal: boolean,
  fabsExpanded: boolean,
}

export interface settingsActionProps {
  type: string,
  payload: string,
  handPreference: Setting.LEFT | Setting.RIGHT,
  showGallons: boolean,
  showOdometer: boolean,
  showPrice: boolean,
}

export interface vehicleActionsProps {
  type: string,
  payload: string,
  vehicleList: Array<VehicleProps>,
}
