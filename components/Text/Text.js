import React from 'react';
import { Text as RNText } from 'react-native';

import * as colors from '../../constants/colors';
import { useDarkmode } from '../../hooks/useDarkMode';

const Text = ({ children, style }) => {
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);

  const textStyles = React.useMemo(
    () => ({
      color: bgContrast,
      ...style,
    }),
    [bgContrast, style],
  );

  return (<RNText style={textStyles}>{ children }</RNText>);
};

export default React.memo(Text);
