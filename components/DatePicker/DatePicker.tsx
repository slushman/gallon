import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useField } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Collapsible from 'react-native-collapsible';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../Button';
import Text from '../Text';
import * as colors from '../../utils/colors';
import * as uniStyles from '../../utils/styles';
import { useDarkmode } from '../../hooks';
import * as fieldUtils from '../../utils/fields';
import { DatePickerProps } from './types';

const DatePicker: React.FC<DatePickerProps> = ({
  label = 'Date',
  mode = 'datetime',
  name,
}) => {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [field, { error, touched }, { setTouched, setValue }] = useField(name);
  const value = dayjs.isDayjs(field.value) ? field.value.toDate() : field.value;
  const [date, setDate] = React.useState(value);
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const fieldTouched = touched && date !== '';
  const fieldStatus = fieldUtils.getFieldStatus(error, field, fieldTouched);
  const borderAndTextColor = fieldUtils.getBorderAndTextColor(fieldStatus, pickerVisible);
  const statusIcon = fieldUtils.getStatusIcon(fieldStatus, pickerVisible);

  const fieldStyle: ViewStyle = React.useMemo(
    () => ({
      borderColor: borderAndTextColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    }),
    [borderAndTextColor],
  );

  const labelStyle: ViewStyle = React.useMemo(
    () => ({
      color: borderAndTextColor,
      fontSize: 14,
      paddingHorizontal: 2,
    }),
    [borderAndTextColor],
  );

  const labelWrapStyle: ViewStyle = React.useMemo(
    () => ({
      backgroundColor: bgColor,
      elevation: 100000,
      left: 28,
      position: 'absolute',
      top: -10,
      zIndex: 100,
    }),
    [bgColor],
  );

  const formattedDate = React.useMemo(
    () => {
      if (mode === 'date') {
        return dayjs(date).format('MMMM D, YYYY');
      } else if (mode === 'time') {
        return dayjs(date).format('h:mm A');
      }

      return dayjs(date).format('MMMM D, YYYY h:mm A');
    },
    [date, mode],
  );

  const closePicker = React.useCallback(() => setPickerVisible(false), []);

  const handleChange = React.useCallback(
    (_, selectedDate) => {
      if (selectedDate === undefined) return null;
      setDate(selectedDate);
      setValue(date);
      setPickerVisible(false);

      return null;
    },
    [date, setValue],
  );

  const openPicker = React.useCallback(
    () => {
      setTouched(true);
      setPickerVisible(true);
    },
    [setTouched],
  );

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
    <View style={uniStyles.pickerWrapStyle}>
      <Pressable onPress={openPicker} style={uniStyles.touchWrapStyle}>
        <View style={labelWrapStyle}>
          <Text style={labelStyle}>{label}</Text>
        </View>
        <View style={fieldStyle}>
          <Text style={uniStyles.placeholderStyle}>
            {formattedDate}
          </Text>
          {FieldIcon}
        </View>
      </Pressable>
      <Collapsible collapsed={!pickerVisible}>
        <DateTimePicker mode={mode} onChange={handleChange} value={date} />
        <Button label="Cancel" onPress={closePicker} />
      </Collapsible>
    </View>
  );
};

export default React.memo(DatePicker);
