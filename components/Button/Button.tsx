import React from 'react';
import * as R from 'ramda';
import { Pressable, ViewStyle } from 'react-native';

import { Color } from '../../constants/enums';
import * as colors from '../../utils/colors';
import { useDarkmode } from '../../hooks';
import Text from '../Text';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  label = 'Submit',
  onPress = () => {},
}) => {
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);
  const disabledColor = disabled ? Color.PERFECT_GRAY : bgContrast;

  const buttonStyles: ViewStyle = React.useMemo(
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
      if (R.is(String, label)) {
        return (
          <Text style={buttonTextStyle}>{label}</Text>
        );
      }

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

export default React.memo(Button);
