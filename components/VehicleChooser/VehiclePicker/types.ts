import { ChangeEvent } from 'react';
import { VehicleProps } from '../../../types';

export interface VehiclePickerProps {
  onChange: (e: string | ChangeEvent<any>) => void,
  options: Array<VehicleProps>,
  setValue: (value: any) => void,
  value: any,
}
