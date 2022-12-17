import React from 'react';
import { Text as RNText } from 'react-native';

import * as colors from '../../utils/colors';
import { useDarkmode } from '../../hooks';
import { TextProps } from './types';

const Text: React.FC<TextProps> = ({
  center = false,
  children,
  style = {},
}) => {
  const isDarkMode = useDarkmode();
  const bgContrast = colors.getBgContrast(isDarkMode);
  const textAlign = center ? 'center' : 'auto';

  const textStyles = React.useMemo(
    () => ({
      color: bgContrast,
      textAlign,
      ...style,
    }),
    [bgContrast, style, textAlign],
  );

  return (<RNText style={textStyles}>{children}</RNText>);
};

export default React.memo(Text);
