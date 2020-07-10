import React from 'react';
import PropTypes from 'prop-types';
import { Switch, View } from 'react-native';

import Text from '../../components/Text';
import { LEFT, RIGHT } from '../../constants/settings';

const leftLabelStyle = {
  marginRight: 8,
};

const rightLabelStyle = {
  marginLeft: 8,
};

const wrapStyle = {
  alignItems: 'center',
  flexDirection: 'row',
};

const ToggleField = ({
  initialValue,
  label,
  labelPosition,
  onToggle,
}) => {
  const LeftLabel = React.useMemo(
    () => {
      if (!label || labelPosition !== LEFT) return null;

      return (<Text style={leftLabelStyle}>{label}</Text>);
    },
    [label, labelPosition],
  );

  const RightLabel = React.useMemo(
    () => {
      if (!label || labelPosition !== RIGHT) return null;

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

ToggleField.propTypes = {
  initialValue: PropTypes.any,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf([LEFT, RIGHT]),
  onToggle: PropTypes.func.isRequired,
};

ToggleField.defaultProps = {
  initialValue: null,
  label: '',
  labelPosition: LEFT,
};

export default React.memo(ToggleField);
