import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';

const Wrapper = ({ centerContent, children }) => {
  const safeViewStyle = React.useMemo(
    () => ({
      backgroundColor: 'white',
      height: '100%',
      justifyContent: centerContent ? 'center' : 'flex-start',
      paddingBottom: 20,
      width: '100%',
    }),
    [centerContent],
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
