import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import * as uniStyles from '../../utils/styles';

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
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Name:</Text>
          <Text style={uniStyles.detailsText}>{vehicleName}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Year:</Text>
          <Text style={uniStyles.detailsText}>{vehicleYear}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Make:</Text>
          <Text style={uniStyles.detailsText}>{vehicleMake}</Text>
        </View>
        <View style={uniStyles.dataRow}>
          <Text style={uniStyles.labelText}>Modal:</Text>
          <Text style={uniStyles.detailsText}>{vehicleModel}</Text>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

VehicleDetails.propTypes = {
  route: PropTypes.object,
};

export default React.memo(VehicleDetails);
