import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';

import * as styles from './styles';
import { ScrollViewProps } from './types';

const ScrollView: React.FC<ScrollViewProps> = ({ children, noPadding = false }) => (
  <RNScrollView style={noPadding ? undefined : styles.scrollViewStyle}>{children}</RNScrollView>
);

export default React.memo(ScrollView);
