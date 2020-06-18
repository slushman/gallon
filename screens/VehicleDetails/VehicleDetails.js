import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Wrapper from '../../components/Wrapper';

const VehicleDetails = ({ route }) => {
  const {
    vehicleMake,
    vehicleModel,
    vehicleName,
    vehicleYear,
  } = R.path(['params', 'vehicle'], route);

  return (
    <Wrapper centerContents>
      <View>
        <Text>{vehicleName}</Text>
        <Text>{vehicleYear}</Text>
        <Text>{vehicleMake}</Text>
        <Text>{vehicleModel}</Text>
      </View>
    </Wrapper>
  );
};

VehicleDetails.propTypes = {
  route: PropTypes.object,
};

export default React.memo(VehicleDetails);
