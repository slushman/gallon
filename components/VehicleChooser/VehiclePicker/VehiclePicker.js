import React from 'react';
import { Picker } from '@react-native-community/picker';
import { Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as R from 'ramda';

import * as colors from '../../../constants/colors';
import * as styles from '../../DatePicker/styles';

const VehiclePicker = ({
  field,
  helpers,
  options,
}) => {
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const { onChange, value } = field;
  const { setValue } = helpers;

  const getVehicleName = R.prop('vehicleName', R.find(R.propEq('vehicleId', value), options));

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
    <View style={styles.pickerWrapStyle}>
      <TouchableOpacity onPress={openPicker} style={styles.touchWrapStyle}>
        <View style={styles.labelWrapStyle}>
          <Text style={labelStyle}>Choose Vehicle</Text>
        </View>
        <View style={fieldStyle}>
          <Text style={styles.placeholderStyle}>{getVehicleName}</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={!pickerVisible}>
        <Picker
          onValueChange={handleSelection}
          selectedValue={value}
          style={{}}
        >
          {options.map(PickerItem)}
        </Picker>
      </Collapsible>
    </View>
  );
};

export default React.memo(VehiclePicker);
