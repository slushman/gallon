import React from 'react';
import { Picker } from '@react-native-community/picker';
import { Pressable, View, ViewStyle } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as R from 'ramda';

import Text from '../../Text';
import { Color } from '../../../constants/enums';
import * as colors from '../../../utils/colors';
import * as uniStyles from '../../../utils/styles';
import { useDarkmode } from '../../../hooks';
import { VehiclePickerProps } from './types';

const VehiclePicker: React.FC<VehiclePickerProps> = ({
  onChange,
  options,
  setValue,
  value,
}) => {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);
  const gallonBlue = colors.getBlue(isDarkMode);
  const pickerColor = pickerVisible ? gallonBlue : Color.GALLON_BLACK;

  const getVehicleName = React.useCallback(
    () => R.propOr('', 'vehicleName', R.find(R.propEq('vehicleId', value), options)),
    [options, value],
  );

  const fieldStyle: ViewStyle = React.useMemo(
    () => ({
      borderColor: pickerColor,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 1,
    }),
    [pickerColor],
  );

  const labelStyle = React.useMemo(
    () => ({
      color: pickerColor,
      fontSize: 14,
      paddingHorizontal: 2,
    }),
    [ pickerColor],
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

  const closePicker = React.useCallback(() => setPickerVisible(false), []);

  const handleSelection = React.useCallback(
    (itemValue) => {
      setValue(itemValue);
      onChange('fillupVehicle');
      closePicker();
    },
    [closePicker, onChange, setValue],
  );

  const openPicker = React.useCallback(() => setPickerVisible(true), []);

  const PickerItem = React.useCallback(
    (item, index) => (
      <Picker.Item
        key={index}
        label={R.prop('vehicleName', item)}
        value={R.prop('vehicleId', item)}
      />
    ),
    [],
  );

  return (
    <View style={uniStyles.pickerWrapStyle}>
      <Pressable onPress={openPicker} style={uniStyles.touchWrapStyle}>
        <View style={labelWrapStyle}>
          <Text style={labelStyle}>Choose Vehicle</Text>
        </View>
        <View style={fieldStyle}>
          <Text style={uniStyles.placeholderStyle}>{getVehicleName()}</Text>
        </View>
      </Pressable>
      <Collapsible collapsed={!pickerVisible}>
        <Picker
          onValueChange={handleSelection}
          selectedValue={value}
        >
          {options.map(PickerItem)}
        </Picker>
      </Collapsible>
    </View>
  );
};

export default React.memo(VehiclePicker);