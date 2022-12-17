import { SwipeableProperties } from 'react-native-gesture-handler/Swipeable';

import { EntryProps } from '../../types';
import { ButtonProps } from '../SwipeableButton/types';

export interface SwipeRefProps {
  close: () => void,
}

export interface SwipeableProps extends SwipeableProperties {
  children: any,
  item: EntryProps,
  leftActions?: ButtonProps[],
  onSwipeLeft?: (item: EntryProps) => void,
  onSwipeRight?: (item: EntryProps) => void,
  rightActions?: ButtonProps[],
}
