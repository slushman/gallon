import React from 'react';
import { Switch, View, ViewStyle } from 'react-native';

import Text from '../Text';
import { Setting } from '../../constants/enums';
import { ToggleFieldProps } from './types';

const leftLabelStyle = {
  marginRight: 8,
};

const rightLabelStyle = {
  marginLeft: 8,
};

const wrapStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
};

const ToggleField: React.FC<ToggleFieldProps> = ({
  initialValue = null,
  label = '',
  labelPosition = Setting.LEFT,
  onToggle,
}) => {
  const LeftLabel = React.useMemo(
    () => {
      if (!label || labelPosition !== Setting.LEFT) return null;

      return (<Text style={leftLabelStyle}>{label}</Text>);
    },
    [label, labelPosition],
  );

  const RightLabel = React.useMemo(
    () => {
      if (!label || labelPosition !== Setting.RIGHT) return null;

      return (<Text style={rightLabelStyle}>{label}</Text>);
    },
    [label, labelPosition],
  );

  return (
    <View style={wrapStyle}>
      {LeftLabel}
      <Switch
        onValueChange={onToggle}
        value={initialValue}
      />
      {RightLabel}
    </View>
  );
};

export default React.memo(ToggleField);
