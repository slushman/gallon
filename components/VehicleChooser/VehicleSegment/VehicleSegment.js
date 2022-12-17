import React from 'react';
import { View } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import * as R from 'ramda';
import Text from '../../Text';
import * as uniStyles from '../../../utils/styles';
const VehicleSegment = ({ field, helpers, options, }) => {
    const { onChange, value } = field;
    const { setValue } = helpers;
    const values = R.pluck('vehicleName', options);
    const index = R.indexOf(value, values);
    const selectedIndex = index >= 0 ? index : 0;
    const handleSelect = React.useCallback((event) => {
        const segmentValue = R.path(['nativeEvent', 'value'], event);
        onChange('fillupVehicle');
        setValue(segmentValue);
    }, [onChange, setValue]);
    return (<View style={uniStyles.settingHorzWrap}>
      <Text style={uniStyles.settingLabel}>Choose Vehicle</Text>
      <SegmentedControl onChange={handleSelect} selectedIndex={selectedIndex || 0} values={values}/>
    </View>);
};
export default React.memo(VehicleSegment);
//# sourceMappingURL=VehicleSegment.js.map