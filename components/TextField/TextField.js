import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';
import { Animated, Text, TextInput, View } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';

import { animationSettings } from '../../constants/animation';
import * as colors from '../../constants/colors';
import { HASERROR, ISVALID } from '../../constants/status';
import { errorTextStyle, inputStyle } from './styles';

const TextField = ({ fieldName, label, multiline, numberOfLines, ...props }) => {
  const [field, { error, touched }, { setTouched }] = useField(props);
  const [isFocused, setIsFocused] = React.useState(false);
  const hasMultipleLines = multiline && numberOfLines > 1;
  const toValue = isFocused ? 1 : 0;

  const fieldAnim = useAnimation({ toValue, ...animationSettings });

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
      return 'white';
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    });
  }, [fieldStatus, fieldAnim]);

  const borderColor = React.useMemo(() => {
    if (fieldStatus === HASERROR) {
      return colors.gallonRed;
    }

    if (fieldStatus === ISVALID) {
      return 'black';
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', colors.gallonBlue],
    });
  }, [fieldStatus, fieldAnim]);

  const fontSize = React.useMemo(() => {
    if (fieldStatus === HASERROR || fieldStatus === ISVALID) {
      return 14;
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    });
  }, [fieldStatus, fieldAnim]);

  const textColor = React.useMemo(() => {
    if (fieldStatus === HASERROR) {
      return colors.gallonRed;
    }

    if (fieldStatus === ISVALID) {
      return 'black';
    }

    return fieldAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.gallonLightGray, colors.gallonBlue],
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
      borderColor: borderColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    }),
    [borderColor],
  );

  const inputStyles = React.useMemo(
    () => {
      const calcHeight = 32 * numberOfLines;

      return ({
        ...inputStyle,
        alignItems: hasMultipleLines ? 'flex-start' : 'center',
        height: hasMultipleLines ? calcHeight : 'auto',
        paddingTop: hasMultipleLines ? 12 : 8,
      });
    },
    [hasMultipleLines, numberOfLines],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: textColor,
      fontSize: fontSize,
    }),
    [fontSize, textColor],
  );

  const labelWrapStyle = React.useMemo(
    () => ({
      backgroundColor: backgroundColor,
      elevation: 100000,
      left: 8,
      paddingHorizontal: 2,
      position: 'absolute',
      top: topPosition,
      zIndex: 100,
    }),
    [backgroundColor, topPosition],
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
