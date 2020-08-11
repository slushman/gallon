import React from 'react';
import { Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Collapsible from 'react-native-collapsible';

import Button from '../Button';
import Text from '../../components/Text';
import * as colors from '../../constants/colors';
import * as uniStyles from '../../utils/styles';
import { useDarkmode } from '../../hooks/useDarkMode';
import * as fieldUtils from '../../utils/fields';

const DatePicker = ({ label, ...props }) => {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [field, { error, touched }, helpers] = useField(props);
  const value = dayjs.isDayjs(field.value) ? field.value.toDate() : field.value;
  const [date, setDate] = React.useState(value);
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);

  const closePicker = React.useCallback(() => setPickerVisible(false), []);

  const fieldStatus = fieldUtils.getFieldStatus(error, field, touched);
  const borderAndTextColor = fieldUtils.getBorderAndTextColor(fieldStatus, pickerVisible);

  const fieldStyle = React.useMemo(
    () => ({
      borderColor: borderAndTextColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    }),
    [borderAndTextColor],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: borderAndTextColor,
      fontSize: 14,
      paddingHorizontal: 2,
    }),
    [borderAndTextColor],
  );

  const labelWrapStyle = React.useMemo(
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

  const handleChange = React.useCallback(
    (event, selectedDate) => {
      if (selectedDate === undefined) return null;
      setDate(selectedDate);
      helpers.setValue(date);
      setPickerVisible(false);
    },
    [date, helpers],
  );

  const openPicker = React.useCallback(() => setPickerVisible(true), []);

  return (
    <View style={uniStyles.pickerWrapStyle}>
      <Pressable onPress={openPicker} style={uniStyles.touchWrapStyle}>
        <View style={labelWrapStyle}>
          <Text style={labelStyle}>{label}</Text>
        </View>
        <View style={fieldStyle}>
          <Text style={uniStyles.placeholderStyle}>
            {dayjs(date).format('MMMM D, YYYY')}
          </Text>
        </View>
      </Pressable>
      <Collapsible collapsed={!pickerVisible}>
        <DateTimePicker mode="date" onChange={handleChange} value={date} />
        <Button label="Cancel" onPress={closePicker} />
      </Collapsible>
    </View>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
};

DatePicker.defaultProps = {
  label: 'Date',
};

export default React.memo(DatePicker);
