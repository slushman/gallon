import { EntryProps } from '../../types';

export interface ButtonProps {
  bgColor: string,
  label: string,
  onPress?: (entry: EntryProps) => void,
  textColor?: string,
}

export interface SwipeableButtonProps extends ButtonProps {
  item: EntryProps,
  onClose: () => void,
}
