import React from 'react';
import { Text, View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import * as R from 'ramda';

import * as styles from '../../../screens/Settings/styles';

const VehicleSegment = ({
  field,
  helpers,
  options,
}) => {
  const { onChange, value } = field;
  const { setValue } = helpers;
  const getVehicleName = R.pluck('vehicleName');
  const values = getVehicleName(options);

  const handleSelect = React.useCallback(
    (event) => {
      onChange('fillupVehicle');
      setValue(R.path(['nativeEvent', 'selectedSegmentIndex'], event));
    },
    [onChange, setValue],
  );

  return (
    <View style={styles.settingWrap}>
      <Text style={styles.settingLabel}>Choose Vehicle</Text>
      <SegmentedControl
        onChange={handleSelect}
        selectedIndex={value}
        values={values}
      />
    </View>
  );
};

export default React.memo(VehicleSegment);
