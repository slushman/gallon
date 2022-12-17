import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { TextInput, View } from 'react-native';
import * as R from 'ramda';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '../Text';
import * as colors from '../../utils/colors';
import { useDarkmode } from '../../hooks';
import * as styles from './styles';
import * as uniStyles from '../../utils/styles';
import * as fieldUtils from '../../utils/fields';
import { TextFieldProps } from './types';

const TextField: React.FC<TextFieldProps> = ({
  label,
  multiline = false,
  name,
  numberOfLines = 1,
  ...otherProps
}) => {
  const [field, { error, touched }, { setTouched }] = useField(name);
  const [isFocused, setIsFocused] = React.useState(false);
  const hasMultipleLines = multiline && numberOfLines > 1;
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const bgContrast = colors.getBgContrast(isDarkMode);
  const gallonRed = colors.getRed(isDarkMode);

  const fieldStatus = fieldUtils.getFieldStatus(error, field, touched);
  const borderAndTextColor = fieldUtils.getBorderAndTextColor(fieldStatus, isFocused);
  const statusIcon = fieldUtils.getStatusIcon(fieldStatus, isFocused);

  const errorTextStyle = React.useMemo(() => ({
    color: gallonRed,
    paddingHorizontal: 8,
  }), [gallonRed]);

  const fieldStyle = React.useMemo(
    () => ({
      borderColor: borderAndTextColor,
      borderRadius: 5,
      borderStyle: 'solid' as 'solid',
      borderWidth: 1,
    }),
    [borderAndTextColor],
  );

  const inputStyles = React.useMemo(
    () => {
      const calcHeight = 32 * numberOfLines;

      return ({
        ...uniStyles.inputStyle,
        alignItems: hasMultipleLines ? 'flex-start' as 'flex-start' : 'center' as 'center',
        color: bgContrast,
        height: hasMultipleLines ? calcHeight : 'auto',
      });
    },
    [bgContrast, hasMultipleLines, numberOfLines],
  );

  const labelStyle = React.useMemo(
    () => ({
      ...uniStyles.inputLabelText,
      color: borderAndTextColor,
    }),
    [borderAndTextColor],
  );

  const labelWrapStyle = React.useMemo(
    () => ({
      backgroundColor: bgColor,
      elevation: 100000,
      left: 8,
      paddingHorizontal: 2,
      position: 'absolute' as 'absolute',
      top: -10,
      zIndex: 100,
    }),
    [bgColor],
  );

  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
    setTouched(true);
  }, [setTouched]);

  const handleFocus = React.useCallback(() => setIsFocused(true), []);

  const FieldIcon = React.useMemo(
    () => {
      if (statusIcon === '') return null;

      return (
        <View style={uniStyles.fieldIconStyle}>
          <MCIcon color={borderAndTextColor} name={statusIcon} size={25} />
        </View>
      );
    },
    [borderAndTextColor, statusIcon],
  );

  return (
    <View style={styles.wrapStyle}>
      <View style={fieldStyle}>
        <View pointerEvents="none" style={labelWrapStyle}>
          <Text style={labelStyle}>{label}</Text>
        </View>
        <TextInput
          {...otherProps}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={handleBlur}
          onChangeText={field.onChange(name)}
          onFocus={handleFocus}
          style={inputStyles}
          value={R.prop('value', field)}
        />
        {FieldIcon}
      </View>
      <ErrorMessage name={name} render={msg => <Text style={errorTextStyle}>{msg}</Text>} />
    </View>
  );
};

export default React.memo(TextField);
