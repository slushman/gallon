import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';

import * as styles from './styles';

const ScrollView = ({ children, noPadding }) => (
  <RNScrollView style={noPadding ? undefined : styles.scrollViewStyle}>{children}</RNScrollView>
);

export default React.memo(ScrollView);
