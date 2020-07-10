import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../components/Text';

const Heading = ({
  label,
  noPadding,
}) => {
  const headingTextStyle = React.useMemo(
    () => {
      let style = {
        fontWeight: 'bold',
      };

      if (!noPadding) {
        style = {
          ...style,
          paddingHorizontal: 16,
        };
      }

      return style;
    },
    [noPadding],
  );

  return (
    <View>
      <Text style={headingTextStyle}>{label}</Text>
    </View>
  );
};

Heading.propTypes = {
  label: PropTypes.string.isRequired,
  noPadding: PropTypes.bool,
};

Heading.defaultProps = {
  noPadding: false,
};

export default React.memo(Heading);
