import { Setting } from '../../constants/enums';

export interface FabProps {
  handPref?: Setting.LEFT | Setting.RIGHT,
  iconName: string,
  iconSize?: number,
  onPress: () => void,
  positionBottom?: number,
  rotate?: boolean,
  rotationEnd?: string,
  visible?: boolean,
};
