import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';
import { Animated, TextInput, View } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';

import Text from '../../components/Text';
import { timingSettings } from '../../constants/animation';
import * as colors from '../../constants/colors';
import { HASERROR, ISVALID } from '../../constants/status';
import { useDarkmode } from '../../hooks/useDarkMode';
import * as styles from './styles';

const TextField = ({ fieldName, label, multiline, numberOfLines, ...props }) => {
  const [field, { error, touched }, { setTouched }] = useField(props);
  const [isFocused, setIsFocused] = React.useState(false);
  const hasMultipleLines = multiline && numberOfLines > 1;
  const toValue = isFocused ? 1 : 0;
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const gallonBlue = colors.getBlue(isDarkMode);
  const gallonRed = colors.getRed(isDarkMode);
  const bgContrast = colors.getBgContrast(isDarkMode);

  const fieldAnim = useAnimation({ toValue, ...timingSettings });

  const fieldStatus = React.useMemo(() => {
    if (touched && !error && field.value) {
      return ISVALID;
    }

    if (touched && error) {
      return HASERROR;
    }

    return null;
  }, [error, field, touched]);

  const backgroundColor = React.useMemo(() => {
    if (fieldStatus === HASERROR || fieldStatus === ISVALID) {
      return bgColor;
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.transparent, bgColor],
    });
  }, [fieldStatus, fieldAnim, bgColor]);

  const borderAndTextColor = React.useMemo(() => {
    if (fieldStatus === HASERROR) {
      return gallonRed;
    }

    if (fieldStatus === ISVALID) {
      return bgContrast;
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [bgContrast, gallonBlue],
    });
  }, [bgContrast, fieldStatus, fieldAnim, gallonBlue, gallonRed]);

  const errorTextStyle = React.useMemo(() => ({
    color: gallonRed,
    paddingHorizontal: 8,
  }), [gallonRed]);

  const fontSize = React.useMemo(() => {
    if (fieldStatus === HASERROR || fieldStatus === ISVALID) {
      return 14;
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    });
  }, [fieldStatus, fieldAnim]);

  const topPosition = React.useMemo(() => {
    if (fieldStatus === HASERROR || fieldStatus === ISVALID) {
      return -10;
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    });
  }, [fieldStatus, fieldAnim]);

  const fieldStyle = React.useMemo(
    () => ({
      borderColor: borderAndTextColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    }),
    [borderAndTextColor],
  );

  const inputStyles = React.useMemo(
    () => {
      const calcHeight = 32 * numberOfLines;

      return ({
        ...styles.inputStyle,
        alignItems: hasMultipleLines ? 'flex-start' : 'center',
        height: hasMultipleLines ? calcHeight : 'auto',
        paddingTop: hasMultipleLines ? 12 : 8,
      });
    },
    [hasMultipleLines, numberOfLines],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: borderAndTextColor,
      fontSize: fontSize,
    }),
    [borderAndTextColor, fontSize],
  );

  const labelWrapStyle = React.useMemo(
    () => ({
      backgroundColor: isDarkMode ? bgColor : backgroundColor,
      elevation: 100000,
      left: 8,
      paddingHorizontal: 2,
      position: 'absolute',
      top: topPosition,
      zIndex: 100,
    }),
    [backgroundColor, bgColor, isDarkMode, topPosition],
  );

  const wrapStyle = React.useMemo(
    () => ({
      marginBottom: 20,
      marginHorizontal: 20,
    }),
    [],
  );

  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
    setTouched(true);
  }, [setTouched]);

  const handleFocus = React.useCallback(() => setIsFocused(true), []);

  return (
    <View style={wrapStyle}>
      <Animated.View style={fieldStyle}>
        <Animated.View pointerEvents="none" style={labelWrapStyle}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
        </Animated.View>
        <TextInput
          {...props}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={handleBlur}
          onChangeText={field.onChange(fieldName)}
          onFocus={handleFocus}
          style={inputStyles}
        />
      </Animated.View>
      <ErrorMessage name={fieldName} render={msg => <Text style={errorTextStyle}>{msg}</Text>} />
    </View>
  );
};

TextField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
};

TextField.defaultProps = {
  multiline: false,
  numberOfLines: 1,
};

export default React.memo(TextField);
