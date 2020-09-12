import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import * as sizes from '../../constants/sizes';
import Text from '../../components/Text';

const Heading = ({
  center,
  label,
  noPadding,
  size,
}) => {
  const headingViewStyle = React.useMemo(
    () => {
      let style = {
        marginBottom: size,
      };
      if (center) {
        style = {
          ...style,
          alignItems: 'center',
          justifyContent: 'center',
        };
      }
      return style;
    },
    [center, size],
  );

  const headingTextStyle = React.useMemo(
    () => {
      let style = {
        fontWeight: 'bold',
        fontSize: size,
      };

      if (!noPadding) {
        style = {
          ...style,
          paddingHorizontal: 16,
        };
      }

      return style;
    },
    [noPadding, size],
  );

  return (
    <View style={headingViewStyle}>
      <Text style={headingTextStyle}>{label}</Text>
    </View>
  );
};

Heading.propTypes = {
  center: PropTypes.bool,
  label: PropTypes.string.isRequired,
  noPadding: PropTypes.bool,
  size: PropTypes.oneOf(sizes.headings),
};

Heading.defaultProps = {
  center: false,
  noPadding: false,
  size: sizes.MD,
};

export default React.memo(Heading);
