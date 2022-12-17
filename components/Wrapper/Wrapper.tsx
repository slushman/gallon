import React from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';

import * as colors from '../../utils/colors';
import { useDarkmode } from '../../hooks';
import { WrapperProps } from './types';

const Wrapper: React.FC<WrapperProps> = ({ centerContent = false, children }) => {
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);

  const safeViewStyle: ViewStyle = React.useMemo(
    () => ({
      backgroundColor: bgColor,
      height: '100%',
      justifyContent: centerContent ? 'center' : 'flex-start',
      paddingBottom: 20,
      width: '100%',
    }),
    [bgColor, centerContent],
  );

  return (
    <SafeAreaView style={safeViewStyle}>{children}</SafeAreaView>
  );
};

export default React.memo(Wrapper);
