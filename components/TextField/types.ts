import { TextInputProps } from 'react-native';

export interface TextFieldProps extends TextInputProps {
  label: string,
  multiline?: boolean,
  name: string,
  numberOfLines?: number,
}
