import { Setting } from '../../constants/enums';

export interface ToggleFieldProps {
  initialValue: any,
  label?: string,
  labelPosition: Setting.LEFT | Setting.RIGHT,
  onToggle: () => void,
}
