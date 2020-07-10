import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Pressable } from 'react-native';

import Text from '../../components/Text';
import * as colors from '../../constants/colors';
import { useDarkmode } from '../../hooks/useDarkMode';

const Button = ({
  disabled,
  label,
  onPress,
}) => {
  const isDarkMode = useDarkmode();

  const buttonStyles = React.useMemo(
    () => {
      let borderColor = colors.gallonBlack;

      if (isDarkMode && disabled) {
        borderColor = colors.darkGallonBlue;
      } else if (isDarkMode && !disabled) {
        borderColor = colors.gallonLightGray;
      } else if (!isDarkMode && disabled) {
        borderColor = colors.gallonBlue;
      }

      return ({
        borderColor,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20,
        marginHorizontal: '15%',
        marginTop: 0,
        padding: 8,
      });
     },
    [disabled, isDarkMode],
  );

  const buttonTextStyle = React.useMemo(
    () => {
      let color = colors.gallonBlack;

      if (isDarkMode && disabled) {
        color = colors.darkGallonBlue;
      } else if (isDarkMode && !disabled) {
        color = colors.gallonLightGray;
      } else if (!isDarkMode && disabled) {
        color = colors.gallonBlue;
      }

      return {
        color,
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      };
    },
    [disabled, isDarkMode],
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
