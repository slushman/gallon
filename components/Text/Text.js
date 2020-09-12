import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import { useDarkmode } from '../../hooks/useDarkMode';

const Text = ({ center, children, style }) => {
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

Text.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Text.defaultProps = {
  center: false,
  style: {},
};

export default React.memo(Text);
