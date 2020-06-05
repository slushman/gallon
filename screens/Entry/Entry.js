import React from 'react';
import { Text, View } from 'react-native';
import * as R from 'ramda';

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

export default React.memo(Entry);
