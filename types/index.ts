import { ViewStyle } from 'react-native';
import { Animated } from 'react-native';

import { Service, ServiceType } from '../constants/enums';

export interface EntryProps {
  date: string,
  gallons?: string,
  id: number,
  odometer: string,
  previousOdometer?: string,
  services?: Service[] | undefined,
  total: string,
  type: ServiceType.FILLUP | ServiceType.SERVICE,
  vehicle: string,
}

export interface GenericStyle extends ViewStyle {
  bottom?: number,
  height?: number | Animated.AnimatedInterpolation,
}

export interface VehicleProps {
  vehicleId: number,
  vehicleMake: string,
  vehicleModel: string,
  vehicleName: string,
  vehicleOdometer: string,
  vehicleYear: string,
}
