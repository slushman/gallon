import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';

import ListItem from '../ListItem';
import Swipeable from '../../components/Swipeable';
import * as colors from '../../constants/colors';
import * as routes from '../../constants/routes';
import * as styles from './styles';
import * as types from '../../constants/types';
import { noop } from '../../utils';
import { useDarkmode } from '../../hooks/useDarkMode';

const VehicleList = ({ vehicleList }) => {
  const { navigate } = useNavigation();
  const isDarkMode = useDarkmode();
  const green = colors.getGreen(isDarkMode);
  const red = colors.getRed(isDarkMode);

  const handleVehiclePress = React.useCallback(
    (vehicle) => () => navigate(routes.VEHICLE_DETAILS, { vehicle }),
    [navigate],
  );

  const goToEdit = React.useCallback(
    (vehicle) => {
      navigate(routes.EDIT_VEHICLE, { vehicle });
    },
    [navigate],
  );

  const rightActions = React.useMemo(
    () => {
      return [
        {
          bgColor: green,
          label: 'Edit',
          onPress: goToEdit,
          textColor: colors.gallonBlack,
        },
        {
          bgColor: red,
          label: 'Delete',
          onPress: noop,
        },
      ];
    },
    [goToEdit, green, red],
  );

  const vehicleEntry = React.useCallback(
    (vehicle, index) => (
      <Swipeable
        item={vehicle}
        key={index}
        rightActions={rightActions}
      >
        <ListItem
          leftContent={R.prop('vehicleName', vehicle)}
          noPadding={true}
          onPress={handleVehiclePress(vehicle)}
          shortItem={true}
        />
      </Swipeable>
    ),
    [handleVehiclePress],
  );

  return (<View style={styles.vehicleListWrap}>{vehicleList.map(vehicleEntry)}</View>);
};

VehicleList.propTypes = {
  vehicleList: PropTypes.arrayOf(PropTypes.shape({
    vehicleMake: PropTypes.string,
    vehicleModel: PropTypes.string,
    vehicleName: PropTypes.string,
    vehicleYear: PropTypes.string,
  })),
};

VehicleList.defaultProps = {
  vehicleList: [],
};

export default React.memo(VehicleList);
