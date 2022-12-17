import { TextInputProps } from 'react-native';

export interface DatePickerProps extends TextInputProps {
  label?: string,
  mode?: 'date' | 'time' | 'datetime',
  name: string,
}
