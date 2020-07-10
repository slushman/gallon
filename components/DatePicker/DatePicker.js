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
import * as styles from './styles';
import { useDarkmode } from '../../hooks/useDarkMode';

const DatePicker = ({ label, ...props }) => {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [field, meta, helpers] = useField(props);
  const value = dayjs.isDayjs(field.value) ? field.value.toDate() : field.value;
  const [date, setDate] = React.useState(value);
  const isDarkMode = useDarkmode();

  const closePicker = React.useCallback(() => setPickerVisible(false), []);

  const fieldStyle = React.useMemo(
    () => {
      let borderColor = colors.gallonBlack;

      if (isDarkMode && pickerVisible) {
        borderColor = colors.darkGallonBlue;
      } else if (isDarkMode && !pickerVisible) {
        borderColor = colors.gallonLightGray;
      } else if (!isDarkMode && pickerVisible) {
        borderColor = colors.gallonBlue;
      }

      return ({
        borderColor,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
      });
    },
    [isDarkMode, pickerVisible],
  );

  const labelStyle = React.useMemo(
    () => {
      let color = colors.gallonBlack;

      if (isDarkMode && pickerVisible) {
        color = colors.darkGallonBlue;
      } else if (isDarkMode && !pickerVisible) {
        color = colors.gallonLightGray;
      } else if (!isDarkMode && pickerVisible) {
        color = colors.gallonBlue;
      }

      return ({
        color,
        fontSize: 14,
        paddingHorizontal: 2,
      });
    },
    [isDarkMode, pickerVisible],
  );

  const labelWrapStyle = React.useMemo(
    () => ({
      backgroundColor: isDarkMode ? colors.gallonBlack : colors.white,
      elevation: 100000,
      left: 28,
      position: 'absolute',
      top: -10,
      zIndex: 100,
    }),
    [isDarkMode],
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
      <Pressable onPress={openPicker} style={styles.touchWrapStyle}>
        <View style={labelWrapStyle}>
          <Text style={labelStyle}>{label}</Text>
        </View>
        <View style={fieldStyle}>
          <Text style={styles.placeholderStyle}>
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
