import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import * as styles from './styles';
const ScrollView = ({ children, noPadding = false }) => (<RNScrollView style={noPadding ? undefined : styles.scrollViewStyle}>{children}</RNScrollView>);
export default React.memo(ScrollView);
//# sourceMappingURL=ScrollView.js.map