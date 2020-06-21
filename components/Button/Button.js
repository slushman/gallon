import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Text, TouchableOpacity } from 'react-native';

import * as colors from '../../constants/colors';

const Button = ({
  disabled,
  label,
  onPress,
}) => {
  const buttonStyles = React.useMemo(() => ({
    backgroundColor: 'transparent',
    borderColor: disabled ? colors.gallonLightGray : colors.gallonBlue,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: '15%',
    marginTop: 0,
    padding: 8,
  }), [disabled]);

  const buttonTextStyle = React.useMemo(() => ({
    color: disabled ? colors.gallonLightGray : colors.gallonBlue,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  }), [disabled]);

  const handlePress = React.useCallback(() => {
    onPress();
  }, [onPress]);

  const ButtonLabel = React.useMemo(
    () => {
      if (R.is(String, label)) return (<Text style={buttonTextStyle}>{label}</Text>);

      return label;
    },
    [buttonTextStyle, label],
  );

  return (
    <TouchableOpacity onPress={handlePress} style={buttonStyles}>
      {ButtonLabel}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onPress: PropTypes.func,
};

Button.defaultProps = {
  label: 'Submit',
  onPress: R.identity(),
};

export default React.memo(Button);
