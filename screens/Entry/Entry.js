import React from 'react';
import { Text, View } from 'react-native';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import Wrapper from '../../components/Wrapper';

const Entry = ({ route }) => {
  const { date, id, odometer, total, type } = R.prop('params', route);
  return (
    <Wrapper centerContents>
      <View>
        <Text>{date}</Text>
        <Text>${total}</Text>
        <Text>{type}</Text>
      </View>
    </Wrapper>
  );
};

Entry.propTypes = {
  route: PropTypes.object,
};

export default React.memo(Entry);
