import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../../../components/Text';
import * as styles from './styles';
import { StatProps } from './types';

const Stat: React.FC<StatProps> = ({ text }) => (
  <View style={styles.statWrap}>
    <Text style={styles.statText}>{text}</Text>
  </View>
);

Stat.propTypes = {
  text: PropTypes.string.isRequired,
};

export default React.memo(Stat);
