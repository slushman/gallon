import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';

import ListItem from '../ListItem';
import * as routes from '../../constants/routes';

const VehicleList = ({ vehicleList }) => {
  const { navigate } = useNavigation();

  const handleVehiclePress = React.useCallback(
    (vehicle) => () => navigate(routes.VEHICLE_DETAILS, { vehicle }),
    [navigate],
  );

  const vehicleEntry = React.useCallback(
    (vehicle, index) => (
      <ListItem
        key={index}
        leftContent={R.prop('vehicleName', vehicle)}
        noPadding={true}
        onPress={handleVehiclePress(vehicle)}
        shortItem={true}
      />
    ),
    [handleVehiclePress],
  );

  return (<View>{vehicleList.map(vehicleEntry)}</View>);
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
