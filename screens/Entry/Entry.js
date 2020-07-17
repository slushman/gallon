import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';

const Entry = ({ route }) => {
  const { date, id, odometer, previousOdometer, total, type } = R.prop('params', route);
  return (
    <Wrapper>
      <ScrollView>
        <Text>{date}</Text>
        <Text>${total}</Text>
        <Text>{type}</Text>
      </ScrollView>
    </Wrapper>
  );
};

Entry.propTypes = {
  route: PropTypes.object,
};

export default React.memo(Entry);
