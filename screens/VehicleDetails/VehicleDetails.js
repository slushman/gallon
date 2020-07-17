import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';

const VehicleDetails = ({ route }) => {
  const {
    vehicleMake,
    vehicleModel,
    vehicleName,
    vehicleYear,
  } = R.path(['params', 'vehicle'], route);

  return (
    <Wrapper>
      <ScrollView>
        <Text>{vehicleName}</Text>
        <Text>{vehicleYear}</Text>
        <Text>{vehicleMake}</Text>
        <Text>{vehicleModel}</Text>
      </ScrollView>
    </Wrapper>
  );
};

VehicleDetails.propTypes = {
  route: PropTypes.object,
};

export default React.memo(VehicleDetails);
