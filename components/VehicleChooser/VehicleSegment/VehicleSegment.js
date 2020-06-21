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
  const values = R.pluck('vehicleName', options);
  const index = R.indexOf(value, values);
  const selectedIndex = index >= 0 ? index : 0;

  const handleSelect = React.useCallback(
    (event) => {
      const segmentValue = R.path(['nativeEvent', 'value'], event);
      onChange('fillupVehicle');
      setValue(segmentValue);
    },
    [onChange, setValue],
  );

  return (
    <View style={styles.settingWrap}>
      <Text style={styles.settingLabel}>Choose Vehicle</Text>
      <SegmentedControl
        onChange={handleSelect}
        selectedIndex={selectedIndex || 0}
        values={values}
      />
    </View>
  );
};

export default React.memo(VehicleSegment);
