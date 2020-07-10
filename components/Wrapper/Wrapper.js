import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';
import * as colors from '../../constants/colors';
import { useDarkmode } from '../../hooks/useDarkMode';

const Wrapper = ({ centerContent, children }) => {
  const isDarkMode = useDarkmode();

  const safeViewStyle = React.useMemo(
    () => ({
      backgroundColor: isDarkMode ? colors.gallonBlack : colors.white,
      height: '100%',
      justifyContent: centerContent ? 'center' : 'flex-start',
      paddingBottom: 20,
      width: '100%',
    }),
    [centerContent, isDarkMode],
  );

  return (
    <SafeAreaView>
      <View style={safeViewStyle}>{children}</View>
    </SafeAreaView>
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
