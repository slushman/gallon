import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Collapsible from 'react-native-collapsible';

import Button from '../Button';
import * as colors from '../../constants/colors';
import * as styles from './styles';

const DatePicker = ({ label, ...props }) => {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [field, meta, helpers] = useField(props);
  const value = dayjs.isDayjs(field.value) ? field.value.toDate() : field.value;
  const [date, setDate] = React.useState(value);

  const closePicker = React.useCallback(() => setPickerVisible(false), []);

  const fieldStyle = React.useMemo(
    () => ({
      borderColor: pickerVisible ? colors.gallonBlue : 'black',
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    }),
    [pickerVisible],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: pickerVisible ? colors.gallonBlue : 'black',
      fontSize: 14,
      paddingHorizontal: 2,
    }),
    [pickerVisible],
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
    <View style={styles.pickerWrapStyle}>
      <TouchableOpacity onPress={openPicker} style={styles.touchWrapStyle}>
        <View style={styles.labelWrapStyle}>
          <Text style={labelStyle}>{label}</Text>
        </View>
        <View style={fieldStyle}>
          <Text style={styles.placeholderStyle}>
            {dayjs(date).format('MMMM D, YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
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
