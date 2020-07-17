import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';

import * as colors from '../../constants/colors';
import { useDarkmode } from '../../hooks/useDarkMode';

const Wrapper = ({ centerContent, children }) => {
  const isDarkMode = useDarkmode();
  const bgColor = colors.getBgColor(isDarkMode);

  const safeViewStyle = React.useMemo(
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

Wrapper.PropTypes = {
  centerContent: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Wrapper.defaultProps = {
  centerContent: false,
};

export default React.memo(Wrapper);
