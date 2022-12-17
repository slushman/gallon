import { Size } from '../../constants/enums';

export interface HeadingProps {
  center?: boolean,
  label: string,
  noPadding?: boolean,
  size?: Size.XL | Size.LG | Size.MD | Size.SM | Size.XS,
}
