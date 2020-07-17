import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Pressable } from 'react-native';

import * as colors from '../../constants/colors';
import { useDarkmode } from '../../hooks/useDarkMode';
import Text from '../../components/Text';

const Button = ({
  disabled,
  label,
  onPress,
}) => {
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);
  const disabledColor = disabled ? colors.perfectGray : bgContrast;

  const buttonStyles = React.useMemo(
    () => ({
      borderColor: disabledColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: '15%',
      marginTop: 0,
      padding: 8,
    }),
    [disabledColor],
  );

  const buttonTextStyle = React.useMemo(
    () => ({
      color: disabledColor,
      fontSize: 20,
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    }),
    [disabledColor],
  );

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
    <Pressable onPress={handlePress} style={buttonStyles}>
      {ButtonLabel}
    </Pressable>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onPress: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  label: 'Submit',
  onPress: R.identity(),
};

export default React.memo(Button);
