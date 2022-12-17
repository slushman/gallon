import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';
import ListItem from '../ListItem';
import Swipeable from '../Swipeable';
import * as colors from '../../utils/colors';
import { Color, Route } from '../../constants/enums';
import * as styles from './styles';
import { noop } from '../../utils';
import { useDarkmode } from '../../hooks/useDarkMode';
const VehicleList = ({ vehicleList = [] }) => {
    const { navigate } = useNavigation();
    const isDarkMode = useDarkmode();
    const green = colors.getGreen(isDarkMode);
    const red = colors.getRed(isDarkMode);
    const handleVehiclePress = React.useCallback((vehicle) => () => navigate(Route.VEHICLE_DETAILS, { vehicle }), [navigate]);
    const goToEdit = React.useCallback((vehicle) => {
        navigate(Route.VEHICLE_FORM, { vehicle });
    }, [navigate]);
    const rightActions = React.useMemo(() => {
        return [
            {
                bgColor: green,
                label: 'Edit',
                onPress: goToEdit,
                textColor: Color.GALLON_BLACK,
            },
            {
                bgColor: red,
                label: 'Delete',
                onPress: noop,
            },
        ];
    }, [goToEdit, green, red]);
    const vehicleEntry = React.useCallback((vehicle, index) => (<Swipeable item={vehicle} key={index} rightActions={rightActions}>
        <ListItem leftContent={R.prop('vehicleName', vehicle)} noPadding={true} onPress={handleVehiclePress(vehicle)} shortItem={true}/>
      </Swipeable>), [handleVehiclePress, rightActions]);
    return (<View style={styles.vehicleListWrap}>{vehicleList.map(vehicleEntry)}</View>);
};
export default React.memo(VehicleList);
//# sourceMappingURL=VehicleList.js.map