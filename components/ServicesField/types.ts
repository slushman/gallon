import { EntryProps } from '../../types';

export type ServicesArray = Array<string>;

export interface ServicesFieldProps {
  entry?: EntryProps,
  name: string,
  navigate: (route: String) => void,
  services?: ServicesArray,
}
